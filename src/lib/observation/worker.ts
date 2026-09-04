import 'server-only'

import { env, isProduction } from '@/lib/env'
import { filledPayload } from '@/lib/observation/filled-fixture'
import {
  GEMINI_UNMEASURED_REASON,
  OBSERVE_METHOD,
  isObservationGrain,
  type ObservationCell,
  type ObservationJobStatus,
  type ObservationRecord,
  type ObservationWorkerWrite,
} from '@/lib/observation/schema'
import { geminiPublicMiniRow } from '@/lib/observation/classify'

/**
 * Server-side runner stub.
 *
 * Later Ultra writes cells through the worker write path. This app does not
 * call DataForSEO and does not hold Ultra or DataForSEO keys. Default path:
 * pending probe cells become unmeasured with worker_unavailable. Gemini is
 * never touched. FIXTURE=1 on a non-production runtime loads the labeled
 * filled fixture. Production ignores FIXTURE.
 */

export type RunnerMode = 'unmeasured' | 'fixture'

export function resolveRunnerMode(options?: {
  fixture?: boolean
  treatAsProduction?: boolean
}): RunnerMode {
  const production = options?.treatAsProduction ?? isProduction
  const requested =
    options?.fixture === true || env.OBSERVE_FIXTURE === '1' || env.OBSERVE_FIXTURE === 'true'
  if (requested && !production) return 'fixture'
  return 'unmeasured'
}

export function unmeasuredProbeCells(cells: readonly ObservationCell[]): ObservationCell[] {
  return cells.map((cell) => {
    if (cell.engine === 'gemini') {
      return {
        context: cell.context,
        engine: 'gemini',
        state: 'unmeasured',
        error: GEMINI_UNMEASURED_REASON,
      }
    }
    if (isObservationGrain(cell.state) && cell.state !== 'unmeasured') {
      return { ...cell, state: 'unmeasured', error: 'worker_unavailable', cited_urls: undefined }
    }
    return {
      context: cell.context,
      engine: cell.engine,
      state: 'unmeasured',
      error: 'worker_unavailable',
    }
  })
}

export function applyRunner(
  record: ObservationRecord,
  options?: { fixture?: boolean; treatAsProduction?: boolean; now?: Date },
): ObservationRecord {
  const now = (options?.now ?? new Date()).toISOString()
  const mode = resolveRunnerMode(options)
  const gemini_row = geminiPublicMiniRow()

  if (mode === 'fixture') {
    return {
      ...record,
      job: { ...record.job, status: 'complete' },
      payload: filledPayload({
        run_id: record.payload.run_id,
        job_id: record.job.job_id,
        contexts: record.job.contexts,
        brandHost: record.job.brand_host,
        finished_at: now,
      }),
    }
  }

  return {
    ...record,
    job: { ...record.job, status: 'complete' },
    payload: {
      ...record.payload,
      finished_at: now,
      method: OBSERVE_METHOD,
      cells: unmeasuredProbeCells(record.payload.cells),
      gemini_row,
    },
  }
}

export function mergeWorkerWrite(
  record: ObservationRecord,
  write: ObservationWorkerWrite,
  now = new Date(),
): ObservationRecord {
  const nextCells = record.payload.cells.map((cell) => {
    const update = write.cells.find(
      (incoming) => incoming.context === cell.context && incoming.engine === cell.engine,
    )
    if (!update) return cell
    return {
      context: cell.context,
      engine: cell.engine,
      state: update.state,
      ...(update.error ? { error: update.error } : {}),
      ...(update.cited_urls ? { cited_urls: update.cited_urls } : {}),
    }
  })

  const status = write.status ?? inferStatus(nextCells, write.status)
  const finished =
    write.finished_at ??
    (status === 'complete' || status === 'refused' || status === 'partial'
      ? now.toISOString()
      : record.payload.finished_at)

  return {
    ...record,
    job: { ...record.job, status },
    estimated_spend_usd: write.estimated_spend_usd ?? record.estimated_spend_usd,
    payload: {
      ...record.payload,
      finished_at: finished,
      method: write.method ?? record.payload.method,
      cells: nextCells,
      gemini_row: geminiPublicMiniRow(),
    },
  }
}

function inferStatus(
  cells: readonly ObservationCell[],
  explicit?: ObservationJobStatus,
): ObservationJobStatus {
  if (explicit) return explicit
  const probe = cells.filter((cell) => cell.engine !== 'gemini')
  const pending = probe.some((cell) => cell.state === 'pending' || cell.state === 'reading')
  if (pending) return 'running'
  const unmeasured = probe.some((cell) => cell.state === 'unmeasured')
  return unmeasured ? 'partial' : 'complete'
}

export function startRunning(record: ObservationRecord): ObservationRecord {
  if (record.job.status !== 'queued') return record
  return {
    ...record,
    job: { ...record.job, status: 'running' },
    payload: {
      ...record.payload,
      cells: record.payload.cells.map((cell) =>
        cell.state === 'pending' && cell.engine !== 'gemini'
          ? { ...cell, state: 'reading' }
          : cell,
      ),
    },
  }
}
