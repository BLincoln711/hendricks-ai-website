import 'server-only'

import { mkdir, readFile, unlink, writeFile } from 'node:fs/promises'
import path from 'node:path'

import { env } from '@/lib/env'
import { OBSERVE_JOB_TTL_SECONDS } from '@/lib/observation/limits'
import type { ObservationRecord } from '@/lib/observation/schema'

/**
 * Job store for the public-mini queue.
 *
 * Prefers the existing Upstash REST pair (`RATE_LIMIT_REDIS_URL` plus token)
 * when both are set. Those values are in `.env.example` and are not on Vercel
 * today. Absent Redis, the store is in-memory (tests and default local) or
 * filesystem when `OBSERVE_JOB_STORE=fs`.
 *
 * Production Redis needs Brandon-approved env. This module does not require
 * Redis to build, test, or merge. It does not hold DataForSEO or Ultra keys.
 */

export type ObservationStoreKind = 'memory' | 'fs' | 'redis'

type JobStore = {
  readonly kind: ObservationStoreKind
  get(jobId: string): Promise<string | null>
  set(jobId: string, value: string, ttlSeconds: number): Promise<void>
}

const KEY_PREFIX = 'hx:observe:job:v1:'
const MAX_MEMORY_KEYS = 2_000

function jobKey(jobId: string): string {
  return `${KEY_PREFIX}${jobId}`
}

function redisConfigured(): boolean {
  return Boolean(env.RATE_LIMIT_REDIS_URL && env.RATE_LIMIT_REDIS_TOKEN)
}

function requestedKind(): ObservationStoreKind {
  if (env.OBSERVE_JOB_STORE === 'memory' || env.OBSERVE_JOB_STORE === 'fs' || env.OBSERVE_JOB_STORE === 'redis') {
    return env.OBSERVE_JOB_STORE
  }
  return redisConfigured() ? 'redis' : 'memory'
}

type PipelineReply = { result?: unknown; error?: string }

async function redisPipeline(commands: (string | number)[][]): Promise<unknown[]> {
  const url = env.RATE_LIMIT_REDIS_URL
  const token = env.RATE_LIMIT_REDIS_TOKEN
  if (!url || !token) throw new Error('Observation Redis is not configured.')

  const response = await fetch(`${url.replace(/\/$/, '')}/pipeline`, {
    method: 'POST',
    headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
    body: JSON.stringify(commands),
    cache: 'no-store',
  })

  if (!response.ok) throw new Error(`Observation Redis responded ${response.status}.`)

  const replies = (await response.json()) as PipelineReply[]
  const failed = replies.find((reply) => reply.error)
  if (failed) throw new Error('Observation Redis rejected a command.')

  return replies.map((reply) => reply.result)
}

const redisStore: JobStore = {
  kind: 'redis',

  async get(jobId) {
    const [value] = await redisPipeline([['GET', jobKey(jobId)]])
    return typeof value === 'string' ? value : null
  },

  async set(jobId, value, ttlSeconds) {
    await redisPipeline([['SET', jobKey(jobId), value, 'EX', ttlSeconds]])
  },
}

type MemoryEntry = { value: string; expiresAt: number }

function createMemoryStore(): JobStore {
  const entries = new Map<string, MemoryEntry>()

  function read(jobId: string, now: number): string | null {
    const entry = entries.get(jobId)
    if (!entry) return null
    if (entry.expiresAt <= now) {
      entries.delete(jobId)
      return null
    }
    return entry.value
  }

  return {
    kind: 'memory',

    async get(jobId) {
      return read(jobId, Date.now())
    },

    async set(jobId, value, ttlSeconds) {
      if (entries.size > MAX_MEMORY_KEYS) {
        const now = Date.now()
        for (const [key, entry] of entries) {
          if (entry.expiresAt <= now) entries.delete(key)
        }
      }
      entries.set(jobId, { value, expiresAt: Date.now() + ttlSeconds * 1000 })
    },
  }
}

const OBSERVE_FS_DIR = path.join(process.cwd(), '.data', 'observe-jobs')

function fileSafeId(jobId: string): string {
  return jobId.replace(/[^a-zA-Z0-9_-]/g, '')
}

const fsStore: JobStore = {
  kind: 'fs',

  async get(jobId) {
    const id = fileSafeId(jobId)
    if (!id) return null
    try {
      const raw = await readFile(path.join(OBSERVE_FS_DIR, `${id}.json`), 'utf8')
      const parsed = JSON.parse(raw) as { expiresAt: number; value: string }
      if (parsed.expiresAt <= Date.now()) {
        await unlink(path.join(OBSERVE_FS_DIR, `${id}.json`)).catch(() => undefined)
        return null
      }
      return parsed.value
    } catch {
      return null
    }
  },

  async set(jobId, value, ttlSeconds) {
    const id = fileSafeId(jobId)
    if (!id) throw new Error('Observation job id is not file-safe.')
    await mkdir(OBSERVE_FS_DIR, { recursive: true })
    await writeFile(
      path.join(OBSERVE_FS_DIR, `${id}.json`),
      JSON.stringify({ expiresAt: Date.now() + ttlSeconds * 1000, value }),
      'utf8',
    )
  },
}

let memoryStore = createMemoryStore()

function activeStore(): JobStore {
  const kind = requestedKind()
  if (kind === 'fs') return fsStore
  if (kind === 'redis' && redisConfigured()) return redisStore
  return memoryStore
}

export function observationStoreKind(): ObservationStoreKind {
  const kind = requestedKind()
  if (kind === 'redis' && !redisConfigured()) return 'memory'
  return kind
}

export async function readObservationRecord(jobId: string): Promise<ObservationRecord | null> {
  const store = activeStore()
  try {
    const raw = await store.get(jobId)
    if (!raw) return null
    return JSON.parse(raw) as ObservationRecord
  } catch {
    if (store.kind === 'redis') {
      console.error('[observe] Redis unavailable for read; trying this instance only.')
      const raw = await memoryStore.get(jobId)
      return raw ? (JSON.parse(raw) as ObservationRecord) : null
    }
    return null
  }
}

export async function writeObservationRecord(record: ObservationRecord): Promise<void> {
  const value = JSON.stringify(record)
  const store = activeStore()
  try {
    await store.set(record.job.job_id, value, OBSERVE_JOB_TTL_SECONDS)
  } catch {
    if (store.kind === 'redis') {
      console.error('[observe] Redis unavailable for write; using this instance only.')
      await memoryStore.set(record.job.job_id, value, OBSERVE_JOB_TTL_SECONDS)
      return
    }
    throw new Error('Observation store could not write the job.')
  }
}

/** Test seam. */
export function resetObservationStoreForTests(): void {
  memoryStore = createMemoryStore()
}
