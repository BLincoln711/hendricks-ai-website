import { Check, X } from 'lucide-react'

import { SignalDot } from '@/components/visuals/signal-dot'
import { cn } from '@/lib/utils/cn'

/**
 * Editorial list marked with the signal dot rather than a browser bullet.
 *
 * The dot is decorative, so the list keeps its `<ul>` semantics and the item
 * text is the only thing announced.
 */
export function SignalList({
  items,
  columns = 1,
  onNavy = false,
  className,
}: {
  items: readonly string[]
  columns?: 1 | 2
  onNavy?: boolean
  className?: string
}) {
  return (
    <ul
      className={cn(
        'grid gap-x-8 gap-y-3',
        columns === 2 ? 'sm:grid-cols-2' : '',
        className,
      )}
    >
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5">
          <SignalDot size={6} tone={onNavy ? 'cyan' : 'blue'} className="mt-2 shrink-0" />
          <span
            className={cn(
              'text-[0.9375rem] leading-relaxed',
              onNavy
                ? 'text-[color-mix(in_srgb,var(--color-field)_82%,transparent)]'
                : 'text-[var(--color-graphite)]',
            )}
          >
            {item}
          </span>
        </li>
      ))}
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
        <li key={item} className="flex items-start gap-2.5">
          <Icon
            aria-hidden="true"
            className={cn(
              'mt-0.5 size-4 shrink-0',
              tone === 'fit' ? 'text-[var(--color-positive)]' : 'text-[var(--color-slate)]',
            )}
          />
          <span className="text-[0.9375rem] leading-relaxed text-[var(--color-graphite)]">
            {item}
          </span>
        </li>
      ))}
    </ul>
  )
}
