'use client'

import { useEffect, useState, type ReactNode } from 'react'

import { ObservationResult } from '@/components/observation/observation-result'
import { queued } from '@/content/pages/observe'
import {
  readObservationSession,
  writeObservationSession,
  type ObservationSessionRecord,
} from '@/lib/observation/session-cache'

/**
 * Queued board when the server has the handshake job, or when this browser
 * still holds the create payload. Preview memory stores can miss the next
 * GET. Session restore does not invent cited or invisible cells.
 */

export function ObservationStation({
  jobId,
  record,
  children,
}: {
  jobId?: string
  record: ObservationSessionRecord | null
  children: ReactNode
}) {
  const [session, setSession] = useState<ObservationSessionRecord | null>(null)
  const [checked, setChecked] = useState(() => Boolean(record) || !jobId)

  useEffect(() => {
    if (record) {
      writeObservationSession(record)
      setSession(null)
      setChecked(true)
      return
    }
    if (!jobId) {
      setSession(null)
      setChecked(true)
      return
    }
    setSession(readObservationSession(jobId))
    setChecked(true)
  }, [jobId, record])

  const resolved = record ?? session

  if (resolved) {
    return (
      <>
        <h2 id="observe-form-title" className="text-h2 text-ink">
          {queued.status}
        </h2>
        <div className="mt-[34px]">
          <ObservationResult job={resolved.job} payload={resolved.payload} />
        </div>
      </>
    )
  }

  if (jobId && !checked) {
    return (
      <h2 id="observe-form-title" className="text-h2 text-ink">
        {queued.status}
      </h2>
    )
  }

  return children
}
