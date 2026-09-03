'use client'

import { useEffect } from 'react'

import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'

/**
 * Segment error boundary (09 5.45). Never renders a stack trace or provider
 * detail to the visitor; the digest is the one reference shown, for support
 * correlation. Error boundaries must be client components.
 */
export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string }
  retry: () => void
}) {
  useEffect(() => {
    // Server-side telemetry is wired in Phase 7. The digest is safe to surface
    // for support correlation; the message is not.
    console.error('Route error', error.digest)
  }, [error])

  return (
    <Container>
      <div className="flex flex-col gap-6 py-section">
        <p className="text-coordinate text-ink-2">Status 500, request failed</p>
        <h1 className="text-h1 max-w-[var(--measure-h1)] text-ink">Something went wrong on our side.</h1>
        <p className="text-lead measure-wide text-ink">
          This page could not be rendered. Trying again usually resolves it. If it keeps happening,
          the reference below helps us trace it.
        </p>
        {error.digest ? (
          <p className="text-caption text-ink-2">Reference: {error.digest}</p>
        ) : null}
        <div>
          <Button onClick={() => retry()}>Try again</Button>
        </div>
      </div>
    </Container>
  )
}
