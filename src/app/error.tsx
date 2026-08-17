'use client'

import { useEffect } from 'react'

import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { SignalDot } from '@/components/visuals/signal-dot'

/**
 * Segment error boundary. Never renders a stack trace or provider detail to the
 * visitor (docs/02 §11).
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Server-side telemetry is wired in Phase 7. The digest is safe to surface
    // for support correlation; the message is not.
    console.error('Route error', error.digest)
  }, [error])

  return (
    <Container>
      <div className="flex flex-col gap-6 py-24 md:py-36">
        <p className="text-eyebrow flex items-center gap-2 text-[var(--color-amber)]">
          <SignalDot size={6} tone="amber" />
          Status 500 — request failed
        </p>
        <h1 className="text-h1 measure-tight">Something went wrong on our side.</h1>
        <p className="text-lead measure">
          This page could not be rendered. Trying again usually resolves it. If it keeps happening,
          the reference below helps us trace it.
        </p>
        {error.digest ? (
          <p className="font-mono text-[0.8125rem] text-[var(--color-slate)]">
            Reference: {error.digest}
          </p>
        ) : null}
        <div>
          <Button onClick={reset}>Try again</Button>
        </div>
      </div>
    </Container>
  )
}
