import type { ObservationJob, ObservationPayload } from '@/lib/observation/schema'

/**
 * Browser cache of the create response. Preview and multi-isolate servers
 * can miss a just-written memory job on the next GET. The form already has
 * the handshake payload; keep it for first paint. Do not invent cited or
 * invisible cells here.
 */

export type ObservationSessionRecord = {
  job: ObservationJob
  payload: ObservationPayload
}

export function observationSessionKey(jobId: string): string {
  return `hx:observe:job:${jobId}`
}

function canUseSession(): boolean {
  return typeof sessionStorage !== 'undefined'
}

export function writeObservationSession(record: ObservationSessionRecord): void {
  if (!canUseSession()) return
  try {
    sessionStorage.setItem(observationSessionKey(record.job.job_id), JSON.stringify(record))
  } catch {
    return
  }
}

export function readObservationSession(jobId: string): ObservationSessionRecord | null {
  if (!canUseSession() || jobId.length === 0) return null
  try {
    const raw = sessionStorage.getItem(observationSessionKey(jobId))
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<ObservationSessionRecord>
    if (!parsed.job || parsed.job.job_id !== jobId) return null
    if (!parsed.payload || parsed.payload.job_id !== jobId) return null
    if (parsed.payload.gemini_row?.state !== 'unmeasured') return null
    if (parsed.payload.gemini_row.reason !== 'not_probed_public_mini_v1') return null
    return { job: parsed.job, payload: parsed.payload }
  } catch {
    return null
  }
}
