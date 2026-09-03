import { Check, X } from 'lucide-react'
import Link from 'next/link'

import { SignalDot } from '@/components/visuals/signal-dot'
import { cn } from '@/lib/utils/cn'

/**
 * Editorial list marked with the signal dot rather than a browser bullet.
 *
 * Retired by 09 section 8 (lists take index numerals or hairlines, 5.14) and
 * deleted with its last consumer in PR 13; retokened until then. The dot is
 * decorative, so the list keeps its `<ul>` semantics and the item text is the
 * only thing announced. `onNavy` is a no-op: every token re-scopes under
 * `.on-plate` (handoff 5.3).
 */
export function SignalList({
  items,
  columns = 1,
  hrefs,
  className,
}: {
  items: readonly string[]
  columns?: 1 | 2
  /**
   * Optional item text to destination map. An item with an entry renders as a
   * link, every other item keeps the bare span, so a caller that passes nothing
   * renders exactly what it rendered before. Keyed by the item string rather
   * than by index so reordering the list cannot silently repoint a link.
   */
  hrefs?: Record<string, string>
  /** @deprecated No-op. `.on-plate` re-scopes every token this list reads. */
  onNavy?: boolean
  className?: string
}) {
  return (
    <ul
      className={cn('grid gap-x-8 gap-y-3', columns === 2 ? 'sm:grid-cols-2' : '', className)}
    >
      {items.map((item) => {
        const href = hrefs?.[item]

        return (
          <li key={item} className="flex items-start gap-2.5 text-ink">
            <SignalDot size={6} className="mt-2.5 shrink-0" />
            {href ? (
              <Link href={href} className="link">
                {item}
              </Link>
            ) : (
              <span>{item}</span>
            )}
          </li>
        )
      })}
    </ul>
  )
}

/**
 * Fit / not-fit list. The icon is paired with a text heading above the list, so
 * the distinction never rests on icon shape or colour alone.
 */
export function FitList({
  items,
  tone,
  className,
}: {
  items: readonly string[]
  tone: 'fit' | 'not-fit'
  className?: string
}) {
  const Icon = tone === 'fit' ? Check : X

  return (
    <ul className={cn('flex flex-col gap-3', className)}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-ink">
          <Icon
            aria-hidden="true"
            focusable="false"
            className={cn('mt-1.5 size-4 shrink-0', tone === 'fit' ? 'text-ok' : 'text-ink-2')}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
