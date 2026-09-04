'use client'

import { useEffect, useState } from 'react'

import type { ObservationJobStatus } from '@/lib/observation/schema'
import { subscribeObservationJob } from '@/lib/observation/poll'

/**
 * Poll stub island. First paint is the server board. Polls observePollPath.
 * Does not invent cited or invisible cells.
 */

export function ObservationJobPoll({
  jobId,
  status,
}: {
  jobId: string
  status: ObservationJobStatus
}) {
  const [polled, setPolled] = useState(status)

  useEffect(() => {
    return subscribeObservationJob(jobId, (result) => {
      setPolled(result.job.status)
    })
  }, [jobId])

  return (
    <span className="sr-only" data-observe-poll={polled}>
      Poll status {polled}
    </span>
  )
}
