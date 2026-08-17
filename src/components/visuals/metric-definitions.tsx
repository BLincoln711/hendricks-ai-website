import { cn } from '@/lib/utils/cn'

export type MetricDefinition = {
  name: string
  definition: string
}

/**
 * Metric definitions (docs/13 §7).
 *
 * docs/12 §6 forbids publishing a metric without a definition, so every named
 * Hendricks measure appears here with the approved wording attached.
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
      {metrics.map((metric) => (
        <div key={metric.name} className="flex flex-col gap-2">
          <dt className="flex items-baseline gap-2 text-[1.0625rem] font-medium text-[var(--color-navy)]">
            <span
              aria-hidden="true"
              className="mt-2 h-1.5 w-6 shrink-0 rounded-full bg-[var(--color-blue)]"
            />
            {metric.name}
          </dt>
          <dd className="pl-8 text-[0.9375rem] leading-relaxed text-[var(--color-slate)]">
            {metric.definition}
          </dd>
        </div>
      ))}
    </dl>
  )
}
