import { keyLabels } from '@/content/shared/chrome'
import { KEY_ITEMS, type KeyItem } from '@/lib/selection-map/resolve'

/**
 * The 12 px inline mark a key row or a ledger row carries: shape first, hue
 * second, so the class survives a forced colour mode and a greyscale print.
 * Decorative, because the label beside it is the text.
 */
export function KeyMark({ kind }: { kind: KeyItem }) {
  const common = { width: 12, height: 12, viewBox: '0 0 12 12', 'aria-hidden': true, focusable: 'false' as const }
  switch (kind) {
    case 'observed':
      return (
        <svg {...common}>
          <circle cx={6} cy={6} r={5} fill="var(--ev-observed)" />
        </svg>
      )
    case 'measured':
      return (
        <svg {...common}>
          <rect x={1} y={1} width={10} height={10} rx={1} fill="var(--ev-measured)" />
        </svg>
      )
    case 'gap':
      return (
        <svg {...common}>
          <path d="M2 2L10 10M10 2L2 10" stroke="var(--ev-gap)" strokeWidth={2} strokeLinecap="round" fill="none" />
        </svg>
      )
    case 'misunderstood':
      return (
        <svg {...common}>
          <circle cx={6} cy={6} r={4.5} fill="none" stroke="var(--ev-observed)" strokeWidth={1.75} />
        </svg>
      )
    case 'exits':
      return (
        <svg {...common}>
          <circle cx={6} cy={6} r={4.5} fill="none" stroke="var(--ev-observed)" strokeWidth={1.25} />
          <path d="M2.5 9.5L9.5 2.5" stroke="var(--ev-muted)" strokeWidth={1.25} fill="none" />
        </svg>
      )
  }
}

/**
 * The instrument's legend: the classes and state marks this frame draws.
 *
 * A key never names a mark the reader cannot find on the drawing, so an item
 * this frame does not draw is hidden. It is hidden rather than dropped because
 * the key row wraps: dropping the one item Q2's intervention does not draw
 * reflowed the row and moved the caption under it every time the cycle
 * stepped. Hidden with `visibility`, so the box stays and assistive technology
 * still reads only the marks that are on the drawing.
 */
export function EvidenceKey({ items }: { items: readonly KeyItem[] }) {
  return (
    <div className="klegend">
      {KEY_ITEMS.map((item) => {
        const drawn = items.includes(item)
        return (
          <span key={item} className="kitem" {...(drawn ? null : { 'data-off': '', 'aria-hidden': true })}>
            <KeyMark kind={item} />
            {keyLabels[item]}
          </span>
        )
      })}
    </div>
  )
}
