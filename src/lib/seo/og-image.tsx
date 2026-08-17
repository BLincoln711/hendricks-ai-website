import { ImageResponse } from 'next/og'

import { siteConfig } from '@/config/site'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * Shared social-image composition (docs/06 §5).
 *
 * Every indexable route exports its own `opengraph-image` so the card carries
 * that page's headline instead of the site default. Kept as one renderer so the
 * treatment cannot drift between routes.
 */
export function renderOgImage({
  eyebrow,
  title,
  footnote = siteConfig.operatingLine,
}: {
  eyebrow: string
  title: string
  footnote?: string
}) {
  // Long headlines need to step down or they overflow the 1200×630 frame.
  const fontSize = title.length > 78 ? 54 : title.length > 52 ? 64 : 76

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#071A2B',
          padding: '72px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: 16, height: 16, borderRadius: 999, background: '#2458E6' }} />
          <div
            style={{
              fontSize: 22,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#00C2D8',
            }}
          >
            {eyebrow}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            fontSize,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: '#F7F9FC',
            maxWidth: '980px',
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(247,249,252,0.18)',
            paddingTop: '32px',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 24,
              color: 'rgba(247,249,252,0.72)',
              maxWidth: '780px',
            }}
          >
            {footnote}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              fontSize: 40,
              fontWeight: 700,
              color: '#F7F9FC',
            }}
          >
            Hendricks
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                background: '#2458E6',
                marginLeft: 6,
              }}
            />
          </div>
        </div>
      </div>
    ),
    size,
  )
}
