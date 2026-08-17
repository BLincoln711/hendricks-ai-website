import { cn } from '@/lib/utils/cn'

/**
 * The Demand-to-Selection System (docs/13 §6).
 *
 * Horizontal path on desktop, vertical stack on mobile (docs/04 §13) — one
 * ordered list, two layouts, no duplicated content.
 */
export function DemandToSelectionPath({
  steps,
  onNavy = false,
  className,
}: {
  steps: readonly { number: string; name: string; description: string }[]
  onNavy?: boolean
  className?: string
}) {
  return (
    <ol className={cn('grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6', className)}>
      {steps.map((step, index) => (
        <li key={step.number} className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span
              className={cn(
                'inline-flex size-9 shrink-0 items-center justify-center rounded-full border font-mono text-[0.875rem] font-medium',
                onNavy
                  ? 'border-[var(--color-cyan)] text-[var(--color-cyan)]'
                  : 'border-[var(--color-blue)] bg-[color-mix(in_srgb,var(--color-blue)_10%,white)] text-[var(--color-blue)]',
              )}
            >
              {step.number}
            </span>
            {/* Connector, desktop only. Decorative — sequence is in the list. */}
            {index < steps.length - 1 ? (
              <span
                aria-hidden="true"
                className={cn(
                  'hidden h-px flex-1 lg:block',
                  onNavy
                    ? 'bg-[color-mix(in_srgb,var(--color-field)_22%,transparent)]'
                    : 'bg-[var(--color-border)]',
                )}
              />
            ) : null}
          </div>
          <h3
            className={cn(
              'text-[1.125rem] font-medium',
              onNavy ? 'text-[var(--color-field)]' : 'text-[var(--color-navy)]',
            )}
          >
            {step.name}
          </h3>
          <p
            className={cn(
              'text-[0.9375rem] leading-relaxed',
              onNavy
                ? 'text-[color-mix(in_srgb,var(--color-field)_70%,transparent)]'
                : 'text-[var(--color-slate)]',
            )}
          >
            {step.description}
          </p>
        </li>
      ))}
    </ol>
  )
}
