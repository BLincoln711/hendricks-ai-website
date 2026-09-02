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
 * Each level widens the left rule as the evidence gets closer to revenue, so
 * the stack reads as a progression: width carries it, never colour. The rule
 * is decorative; the ordered list and the numbers carry the sequence for
 * assistive technology.
 */
const ruleWidths = ['border-l-2', 'border-l-4', 'border-l-[6px]', 'border-l-8'] as const

export function ImpactMeasurementStack({
  levels,
  className,
}: {
  levels: readonly MeasurementLevel[]
  className?: string
}) {
  return (
    <ol className={cn('flex flex-col gap-4', className)}>
      {levels.map((level, index) => (
        <li
          key={level.number}
          className={cn(
            'flex flex-col gap-4 rounded-r-[var(--radius-small)] border border-l-rule-strong border-rule bg-surface-raised p-6 md:flex-row md:items-start md:gap-[var(--ledger-gap)] md:p-8',
            ruleWidths[index] ?? ruleWidths[0],
          )}
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
              <span className="text-small mt-2 block font-normal tracking-normal text-ink-body">
                {level.question}
              </span>
            </h3>
          </div>

          <ul className="flex flex-wrap gap-1.5 md:pt-8">
            {level.signals.map((signal) => (
              <li
                key={signal}
                className="text-small rounded-[var(--radius-small)] border border-rule bg-surface px-2.5 py-1 text-ink-body"
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
