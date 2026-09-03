import { cn } from '@/lib/utils/cn'

export type MeasurementLevel = {
  number: string
  name: string
  question: string
  signals: readonly string[]
}

/**
 * The four levels of measurement on Search Impact Measurement (09 5.55).
 *
 * Every level carries the same 1.5 px left rule, which is the one accent border
 * the canvas has. An earlier version widened the rule from 2 px to 8 px down the
 * stack to carry the progression; 8 px is not a hairline, and the ordered list,
 * the level numbers and the level names already carry the sequence in text.
 */
export function ImpactMeasurementStack({
  levels,
  className,
}: {
  levels: readonly MeasurementLevel[]
  className?: string
}) {
  return (
    <ol className={cn('flex flex-col gap-8', className)}>
      {levels.map((level) => (
        <li
          key={level.number}
          className="flex flex-col gap-4 border-l-[length:var(--ev-accent-width)] border-l-rule-strong py-2 pl-5 md:flex-row md:items-start md:gap-[var(--ledger-gap)]"
        >
          <div className="flex flex-col gap-2 md:w-[19rem] md:shrink-0">
            <span className="text-small font-mono text-[var(--ledger-index-fg)] tabular-nums">
              {level.number}
            </span>
            {/*
              The question sits inside the heading rather than in a sibling `<p>`.
              On its own, `{level.name}` reads as a bare noun (Exposure, Behavior)
              once the surrounding markup is stripped; the question is what makes
              the level self-describing. Both strings are approved verbatim, so
              only their DOM position changes.
            */}
            <h3 className="text-h4 text-ink">
              {level.name}{' '}
              <span className="text-small mt-2 block font-normal tracking-normal text-ink">
                {level.question}
              </span>
            </h3>
          </div>

          <ul className="flex flex-wrap gap-1.5">
            {level.signals.map((signal) => (
              <li
                key={signal}
                className="text-small border border-rule px-2.5 py-1 text-ink"
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
