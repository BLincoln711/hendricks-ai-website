import { observePollPath } from '@/lib/observation/handshake'
import type { ObservationJob, ObservationPayload } from '@/lib/observation/schema'

/**
 * Client poll stub for GET /api/observe/jobs/:job_id via observePollPath.
 *
 * PR1 create and pending fixtures stay queued with pending or unmeasured cells.
 * Real cited or invisible fills from a later worker are accepted when they
 * arrive. This helper does not invent them.
 */

export type ObservationPollResult = {
  job: ObservationJob
  payload: ObservationPayload
}

export async function fetchObservationJob(jobId: string): Promise<ObservationPollResult | null> {
  const response = await fetch(observePollPath(jobId), {
    headers: { accept: 'application/json' },
    cache: 'no-store',
  })
  if (!response.ok) return null
  const body = (await response.json()) as {
    ok?: boolean
    job?: ObservationJob
    payload?: ObservationPayload
  }
  if (!body.ok || !body.job || !body.payload) return null
  return { job: body.job, payload: body.payload }
}

export function subscribeObservationJob(
  jobId: string,
  onUpdate: (result: ObservationPollResult) => void,
  intervalMs = 15000,
): () => void {
  let cancelled = false

  const pull = async () => {
    try {
      const result = await fetchObservationJob(jobId)
      if (cancelled || !result) return
      onUpdate(result)
    } catch {
      return
    }
  }

  void pull()
  const timer = setInterval(() => {
    void pull()
  }, intervalMs)

  return () => {
    cancelled = true
    clearInterval(timer)
  }
}
