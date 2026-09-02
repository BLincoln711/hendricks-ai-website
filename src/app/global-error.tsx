'use client'

/**
 * Global error boundary (09 5.45). Replaces the root layout, so it must render
 * its own html and body and cannot read the stylesheet or the fonts: the
 * literals below are the token file's primitives (page ground, body ink,
 * heading ink, ink-2, Signal Blue), allowlisted in `check:tokens`.
 */
export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string }
  retry: () => void
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F7F9FC',
          color: '#0B253A',
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
          padding: '2rem',
        }}
      >
        <main style={{ maxWidth: '32rem' }}>
          <p
            style={{
              fontFamily: 'ui-monospace, monospace',
              fontSize: '0.8125rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#5E6C7B',
              margin: '0 0 1rem',
            }}
          >
            Status 500, request failed
          </p>
          <h1 style={{ fontSize: '2rem', lineHeight: 1.1, color: '#071A2B', margin: '0 0 1rem' }}>
            The site failed to load.
          </h1>
          <p style={{ fontSize: '1.0625rem', lineHeight: 1.6, color: '#0B253A', margin: '0 0 1.5rem' }}>
            An unexpected error stopped the page from rendering. Reloading usually resolves it.
          </p>
          {error.digest ? (
            <p style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.875rem', color: '#5E6C7B' }}>
              Reference: {error.digest}
            </p>
          ) : null}
          <button
            onClick={() => retry()}
            style={{
              marginTop: '1rem',
              minHeight: '48px',
              padding: '0 1.375rem',
              borderRadius: '10px',
              border: 'none',
              background: '#2458E6',
              color: '#FFFFFF',
              fontSize: '0.9375rem',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  )
}
