'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

import { ObservationResult } from '@/components/observation/observation-result'
import { queued } from '@/content/pages/observe'
import { fetchObservationJob, subscribeObservationJob } from '@/lib/observation/poll'
import {
  readObservationSession,
  writeObservationSession,
  type ObservationSessionRecord,
} from '@/lib/observation/session-cache'

/**
 * Queued board when the server has the handshake job, or when this browser
 * still holds the create payload. Preview memory stores can miss the next
 * GET. Restore does not invent cited or invisible cells.
 *
 * A live poll always runs when a job id is present so a later worker fill
 * can replace a stale server render. The latest poll wins over SSR.
 */

const ObservationQueueContext = createContext<{
  onQueued: (record: ObservationSessionRecord) => void
} | null>(null)

export function useObservationQueue() {
  return useContext(ObservationQueueContext)
}

export function ObservationStation({
  jobId,
  record,
  children,
}: {
  jobId?: string
  record: ObservationSessionRecord | null
  children: ReactNode
}) {
  const [created, setCreated] = useState<ObservationSessionRecord | null>(null)
  const [settled, setSettled] = useState(() => Boolean(record) || !jobId)

  useEffect(() => {
    if (!jobId) return undefined

    const session = readObservationSession(jobId)
    let cancelled = false

    if (!record && session) {
      setCreated(session)
      setSettled(true)
    }

    void fetchObservationJob(jobId).then((result) => {
      if (cancelled) return
      if (result) {
        writeObservationSession(result)
        setCreated(result)
      } else if (session) {
        setCreated(session)
      }
      setSettled(true)
    })

    const unsubscribe = subscribeObservationJob(jobId, (result) => {
      writeObservationSession(result)
      setCreated(result)
      setSettled(true)
    })

    return () => {
      cancelled = true
      unsubscribe()
    }
  }, [jobId, record])

  const resolved = created ?? record

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

  if (jobId && !settled) {
    return (
      <h2 id="observe-form-title" className="text-h2 text-ink">
        {queued.status}
      </h2>
    )
  }

  return (
    <ObservationQueueContext.Provider
      value={{
        onQueued: (next) => {
          writeObservationSession(next)
          setCreated(next)
          setSettled(true)
        },
      }}
    >
      {children}
    </ObservationQueueContext.Provider>
  )
}
