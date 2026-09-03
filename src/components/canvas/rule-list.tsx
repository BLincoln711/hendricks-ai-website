import { cn } from '@/lib/utils/cn'

/**
 * The numbered rule list (`.rlist`).
 *
 * The canvas form of an enumerated set of signals, criteria or exclusions: one
 * hairline per row and a mono index in the margin, with no bullet glyph and no
 * marker colour. It replaces `ui/signal-list.tsx`, whose dot the canvas retires
 * (the signal dot is the wordmark's mark, never a list bullet).
 *
 * The index is `aria-hidden`, because an ordered list already announces its
 * position and reading "01" before every item doubles it.
 */
export function RuleList({
  items,
  ariaLabel,
  className,
}: {
  items: readonly string[]
  ariaLabel?: string
  className?: string
}) {
  return (
    <ol className={cn('rlist', className)} aria-label={ariaLabel}>
      {items.map((item, index) => (
        <li key={item}>
          <span className="n" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  )
}
