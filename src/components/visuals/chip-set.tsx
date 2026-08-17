import { cn } from '@/lib/utils/cn'

/**
 * A set of short labels rendered as chips.
 *
 * Distinct from `CompletePath`, which separates its chips with chevrons and marks
 * the last one as a terminal outcome. That treatment asserts an ordered
 * progression, so it must not be used for an unordered taxonomy — the ten outcome
 * classifications on /methodology are categories a single observation can carry
 * several of at once, not stages it passes through.
 *
 * `separator="plus"` is for the intent-context formula, where the labels really do
 * sum to something. The `+` is rendered as text rather than as a border or icon so
 * the relationship survives with styles or images unavailable.
 */
export function ChipSet({
  items,
  separator = 'none',
  className,
}: {
  items: readonly string[]
  separator?: 'none' | 'plus'
  className?: string
}) {
  return (
    <ul className={cn('flex flex-wrap items-center gap-x-2 gap-y-2', className)}>
      {items.map((item, index) => (
        <li key={item} className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-[var(--color-border)] bg-white px-3 py-1.5 text-[0.8125rem] font-medium text-[var(--color-graphite)]">
            {item}
          </span>
          {separator === 'plus' && index < items.length - 1 ? (
            <span aria-hidden="true" className="text-[0.875rem] text-[var(--color-slate)]">
              +
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  )
}
