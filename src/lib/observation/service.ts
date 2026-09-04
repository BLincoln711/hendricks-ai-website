import 'server-only'

import { randomUUID } from 'node:crypto'

import { env } from '@/lib/env'
import { OBSERVE_COST_CEILING_USD_DEFAULT, estimatedRunCostUsd } from '@/lib/observation/limits'
import { pendingPayload } from '@/lib/observation/pending-fixture'
import {
  checkObserveEmailLimit,
  checkObserveIpLimit,
} from '@/lib/observation/rate-limit'
import {
  normalizeBrandHost,
  probeEngineIds,
  type ObservationCreateInput,
  type ObservationJob,
  type ObservationPayload,
  type ObservationRecord,
  type ObservationWorkerWrite,
} from '@/lib/observation/schema'
import { readObservationRecord, writeObservationRecord } from '@/lib/observation/store'
import { applyRunner, mergeWorkerWrite, startRunning } from '@/lib/observation/worker'

export type ObservationPublic = {
  job: ObservationJob
  payload: ObservationPayload
}

export type ObservationCreateResult =
  | { ok: true; job: ObservationJob; payload: ObservationPayload }
  | { ok: false; code: 'VALIDATION_ERROR'; message: string; fieldErrors?: Record<string, string> }
  | { ok: false; code: 'RATE_LIMITED'; message: string; retryAfterSeconds: number }

export type ObservationReadResult =
  | { ok: true; job: ObservationJob; payload: ObservationPayload }
  | { ok: false; code: 'NOT_FOUND'; message: string }

export type ObservationWriteResult =
  | { ok: true; job: ObservationJob; payload: ObservationPayload }
  | { ok: false; code: 'NOT_FOUND' | 'WORKER_UNAVAILABLE' | 'UNAUTHORIZED' | 'VALIDATION_ERROR'; message: string }

function costCeilingUsd(): number {
  const raw = env.OBSERVE_COST_CEILING_USD
  if (!raw) return OBSERVE_COST_CEILING_USD_DEFAULT
  const parsed = Number(raw)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : OBSERVE_COST_CEILING_USD_DEFAULT
}

function publicView(record: ObservationRecord): ObservationPublic {
  return { job: record.job, payload: record.payload }
}

export function toPublic(record: ObservationRecord): ObservationPublic {
  return publicView(record)
}

export async function createObservationJob(
  input: ObservationCreateInput,
  options?: { ip?: string },
): Promise<ObservationCreateResult> {
  const brandHost = input.brand_host ? normalizeBrandHost(input.brand_host) : undefined
  if (input.brand_host && !brandHost) {
    return {
      ok: false,
      code: 'VALIDATION_ERROR',
      message: 'Review the highlighted fields and try again.',
      fieldErrors: { brand_host: 'Enter a hostname, for example example.com.' },
    }
  }

  if (options?.ip) {
    const ipLimit = await checkObserveIpLimit(options.ip)
    if (!ipLimit.allowed) {
      return {
        ok: false,
        code: 'RATE_LIMITED',
        message: 'This observation cannot be queued again right now.',
        retryAfterSeconds: ipLimit.retryAfterSeconds,
      }
    }
  }

  if (input.email) {
    const emailLimit = await checkObserveEmailLimit(input.email)
    if (!emailLimit.allowed) {
      return {
        ok: false,
        code: 'RATE_LIMITED',
        message: 'This observation cannot be queued again right now.',
        retryAfterSeconds: emailLimit.retryAfterSeconds,
      }
    }
  }

  const job_id = randomUUID()
  const run_id = randomUUID()
  const created_at = new Date().toISOString()
  const ceiling = costCeilingUsd()
  const estimate = estimatedRunCostUsd(input.contexts.length)

  if (estimate > ceiling) {
    return {
      ok: false,
      code: 'VALIDATION_ERROR',
      message: 'This sample exceeds the cost ceiling for a public observation.',
    }
  }

  const job: ObservationJob = {
    job_id,
    created_at,
    status: 'queued',
    brand_name: input.brand_name,
    ...(brandHost ? { brand_host: brandHost } : {}),
    category: input.category,
    contexts: input.contexts,
    engines_requested: [...probeEngineIds],
    cost_ceiling_usd: ceiling,
  }

  const record: ObservationRecord = {
    job,
    payload: pendingPayload({ run_id, job_id, contexts: input.contexts }),
    estimated_spend_usd: 0,
  }

  await writeObservationRecord(record)
  return { ok: true, ...publicView(record) }
}

export async function readObservationJob(jobId: string): Promise<ObservationReadResult> {
  const record = await readObservationRecord(jobId)
  if (!record) {
    return { ok: false, code: 'NOT_FOUND', message: 'That observation job was not found.' }
  }
  return { ok: true, ...publicView(record) }
}

export async function runObservationJob(
  jobId: string,
  options?: { fixture?: boolean; treatAsProduction?: boolean; now?: Date },
): Promise<ObservationReadResult> {
  const record = await readObservationRecord(jobId)
  if (!record) {
    return { ok: false, code: 'NOT_FOUND', message: 'That observation job was not found.' }
  }

  const running = startRunning(record)
  const next = applyRunner(running, options)
  await writeObservationRecord(next)
  return { ok: true, ...publicView(next) }
}

export function workerWriteConfigured(): boolean {
  return Boolean(env.OBSERVE_WORKER_SECRET)
}

export function workerSecretMatches(header: string | null): boolean {
  const secret = env.OBSERVE_WORKER_SECRET
  if (!secret) return false
  if (!header) return false
  const token = header.startsWith('Bearer ') ? header.slice('Bearer '.length) : header
  if (token.length !== secret.length) return false
  return timingSafeEqualString(token, secret)
}

function timingSafeEqualString(left: string, right: string): boolean {
  if (left.length !== right.length) return false
  let mismatch = 0
  for (let i = 0; i < left.length; i += 1) {
    mismatch |= left.charCodeAt(i) ^ right.charCodeAt(i)
  }
  return mismatch === 0
}

export async function writeObservationCells(
  jobId: string,
  write: ObservationWorkerWrite,
): Promise<ObservationWriteResult> {
  if (!workerWriteConfigured()) {
    return {
      ok: false,
      code: 'WORKER_UNAVAILABLE',
      message: 'The observation worker is not configured.',
    }
  }

  const record = await readObservationRecord(jobId)
  if (!record) {
    return { ok: false, code: 'NOT_FOUND', message: 'That observation job was not found.' }
  }

  const next = mergeWorkerWrite(record, write)
  if (next.payload.gemini_row.reason !== 'not_probed_public_mini_v1') {
    return {
      ok: false,
      code: 'VALIDATION_ERROR',
      message: 'Gemini stays unmeasured on this public sample.',
    }
  }

  await writeObservationRecord(next)
  return { ok: true, ...publicView(next) }
}
