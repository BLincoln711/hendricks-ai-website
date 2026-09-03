import { cn } from '@/lib/utils/cn'

export type MetricDefinition = {
  name: string
  definition: string
}

/**
 * Metric definitions (09 5.55), verbatim from `metrics.ts`.
 *
 * docs/12 §6 forbids publishing a metric without a definition, so every named
 * Hendricks measure appears here with the approved wording attached. The
 * index mark is a numeral, not a dot, and is hidden from assistive
 * technology because the `dl` carries the order.
 */
export function MetricDefinitions({
  metrics,
  className,
}: {
  metrics: readonly MetricDefinition[]
  className?: string
}) {
  return (
    <dl className={cn('grid gap-x-10 gap-y-8 md:grid-cols-2', className)}>
      {metrics.map((metric, index) => (
        <div key={metric.name} className="flex flex-col gap-2 border-t border-rule pt-4">
          <dt className="text-h4 flex items-baseline gap-3 text-ink">
            <span aria-hidden="true" className="text-coordinate shrink-0 text-ink-2">
              {String(index + 1).padStart(2, '0')}
            </span>
            {metric.name}
          </dt>
          <dd className="text-ink">{metric.definition}</dd>
        </div>
      ))}
    </dl>
  )
}
