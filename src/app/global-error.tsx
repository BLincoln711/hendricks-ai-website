'use client'

/**
 * Global error boundary (09 5.45). Replaces the root layout, so it must render
 * its own html and body and cannot read the stylesheet or the fonts. The
 * literals below are the canvas primitives written out, and they are the only
 * copy of those values outside `src/styles/tokens.css`, which is why this file
 * is allowlisted in `check:tokens`:
 *
 *   #060E16  --bg, the one ground
 *   #F7F9FC  --ink, Field White, 18.40:1 on the ground
 *   rgba(247, 249, 252, 0.62)  --ink-2, the quiet mono line, 7.35:1
 *   #2458E6  --btn, the button fill, with Field White on it at 5.51:1
 *
 * The button keeps the 6 px control radius and the 48 px control height. The
 * page carries no other radius, no fill and no border, because an error page is
 * still the canvas.
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
          background: '#060E16',
          color: '#F7F9FC',
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
              color: 'rgba(247, 249, 252, 0.62)',
              margin: '0 0 1rem',
            }}
          >
            Status 500, request failed
          </p>
          <h1 style={{ fontSize: '2rem', lineHeight: 1.1, color: '#F7F9FC', margin: '0 0 1rem' }}>
            The site failed to load.
          </h1>
          <p style={{ fontSize: '1.0625rem', lineHeight: 1.6, color: '#F7F9FC', margin: '0 0 1.5rem' }}>
            An unexpected error stopped the page from rendering. Reloading usually resolves it.
          </p>
          {error.digest ? (
            <p style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.875rem', color: 'rgba(247, 249, 252, 0.62)' }}>
              Reference: {error.digest}
            </p>
          ) : null}
          <button
            onClick={() => retry()}
            style={{
              marginTop: '1rem',
              minHeight: '48px',
              padding: '0 1.375rem',
              borderRadius: '6px',
              border: 'none',
              background: '#2458E6',
              color: '#F7F9FC',
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
