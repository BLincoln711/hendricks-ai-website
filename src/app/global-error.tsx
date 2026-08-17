'use client'

/**
 * Global error boundary. Replaces the root layout, so it must render its own
 * html and body and cannot rely on fonts or global styles.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
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
          color: '#18222D',
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
          padding: '2rem',
        }}
      >
        <main style={{ maxWidth: '32rem' }}>
          <h1 style={{ fontSize: '2rem', lineHeight: 1.1, color: '#071A2B', margin: '0 0 1rem' }}>
            The site failed to load.
          </h1>
          <p style={{ fontSize: '1.0625rem', lineHeight: 1.6, color: '#5E6C7B', margin: '0 0 1.5rem' }}>
            An unexpected error stopped the page from rendering. Reloading usually resolves it.
          </p>
          {error.digest ? (
            <p style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.8125rem', color: '#5E6C7B' }}>
              Reference: {error.digest}
            </p>
          ) : null}
          <button
            onClick={reset}
            style={{
              marginTop: '1rem',
              height: '48px',
              padding: '0 1.5rem',
              borderRadius: '10px',
              border: 'none',
              background: '#2458E6',
              color: '#fff',
              fontSize: '1rem',
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
