import { cn } from '@/lib/utils/cn'

export type MeasurementLevel = {
  number: string
  name: string
  question: string
  signals: readonly string[]
}

/**
 * The four levels of measurement on Search Impact Measurement (docs/13 §6).
 *
 * Each level widens the left rule as the evidence gets closer to revenue, so the
 * stack reads as a progression. The rule is decorative; the ordered list and the
 * numbers carry the sequence for assistive technology.
 */
export function ImpactMeasurementStack({
  levels,
  className,
}: {
  levels: readonly MeasurementLevel[]
  className?: string
}) {
  const accents = [
    'border-l-[color-mix(in_srgb,var(--color-cyan)_60%,white)]',
    'border-l-[var(--color-cyan)]',
    'border-l-[var(--color-blue)]',
    'border-l-[var(--color-amber)]',
  ]

  return (
    <ol className={cn('flex flex-col gap-4', className)}>
      {levels.map((level, index) => (
        <li
          key={level.number}
          className={cn(
            'flex flex-col gap-4 rounded-r-[var(--radius-card)] border border-l-4 border-[var(--color-border)] bg-white p-6 md:flex-row md:items-start md:gap-10 md:p-8',
            accents[index] ?? accents[0],
          )}
        >
          <div className="flex flex-col gap-2 md:w-[19rem] md:shrink-0">
            <span className="font-mono text-[0.875rem] text-[var(--color-blue)] tabular-nums">
              {level.number}
            </span>
            {/*
              The question sits inside the heading rather than in a sibling `<p>`.
              On its own, `{level.name}` reads as a bare noun (Exposure, Behavior)
              once the surrounding markup is stripped; the question is what makes
              the level self-describing. Both strings are approved verbatim, so
              only their DOM position changes. `mt-2` reproduces the parent's
              `gap-2`, and `font-normal` undoes the heading's `font-medium`, so
              the rendered result is unchanged.
            */}
            <h3 className="text-[1.375rem] leading-snug font-medium text-[var(--color-navy)]">
              {level.name}{' '}
              <span className="mt-2 block text-[0.9375rem] leading-relaxed font-normal text-[var(--color-slate)]">
                {level.question}
              </span>
            </h3>
          </div>

          <ul className="flex flex-wrap gap-1.5 md:pt-8">
            {level.signals.map((signal) => (
              <li
                key={signal}
                className="rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-field)] px-2.5 py-1 text-[0.8125rem] text-[var(--color-graphite)]"
              >
                {signal}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  )
}
