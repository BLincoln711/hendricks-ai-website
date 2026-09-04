import { hasForbiddenFill, jobIsHonest, type ObservationJob } from '@/lib/observation/contract'

/**
 * Client poll/subscribe stub for GET /api/observe/jobs/:job_id.
 *
 * PR1 payloads stay queued with pending or unmeasured cells. A payload that
 * emits cited or invisible is ignored so a fixture cannot paint a fill.
 */

export async function fetchObservationJob(jobId: string): Promise<ObservationJob | null> {
  const response = await fetch(`/api/observe/jobs/${encodeURIComponent(jobId)}`, {
    headers: { accept: 'application/json' },
    cache: 'no-store',
  })
  if (!response.ok) return null
  return (await response.json()) as ObservationJob
}

export function subscribeObservationJob(
  jobId: string,
  onUpdate: (job: ObservationJob) => void,
  intervalMs = 15000,
): () => void {
  let cancelled = false

  const pull = async () => {
    try {
      const job = await fetchObservationJob(jobId)
      if (cancelled || !job) return
      if (hasForbiddenFill(job) || !jobIsHonest(job)) return
      onUpdate(job)
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
