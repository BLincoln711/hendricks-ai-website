import { ChevronRight } from 'lucide-react'

import { cn } from '@/lib/utils/cn'

export type SystemFlowStage = {
  name: string
  caption: string
}

/**
 * `Demand → Selection → Presence → Impact` (content/pages/02-solutions.md).
 *
 * An ordered list rather than an SVG: the sequence is the meaning, so it should
 * be carried by markup and survive with styles disabled.
 */
export function SystemFlow({
  stages,
  onNavy = false,
  className,
}: {
  stages: readonly SystemFlowStage[]
  onNavy?: boolean
  className?: string
}) {
  return (
    <ol className={cn('grid gap-3 sm:grid-cols-2 lg:flex lg:items-stretch', className)}>
      {stages.map((stage, index) => {
        const isLast = index === stages.length - 1
        return (
          <li key={stage.name} className="flex flex-1 items-stretch gap-3">
            <div
              className={cn(
                'flex flex-1 flex-col gap-2 rounded-[var(--radius-card)] border p-5',
                onNavy
                  ? 'border-[color-mix(in_srgb,var(--color-field)_20%,transparent)] bg-[var(--color-navy-2)]'
                  : 'border-[var(--color-border)] bg-white',
              )}
            >
              <span
                className={cn(
                  'font-mono text-[0.75rem]',
                  onNavy ? 'text-[var(--color-cyan)]' : 'text-[var(--color-blue)]',
                )}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <span
                className={cn(
                  'text-[1.0625rem] leading-snug font-medium',
                  onNavy ? 'text-[var(--color-field)]' : 'text-[var(--color-navy)]',
                )}
              >
                {stage.name}
              </span>
              <span
                className={cn(
                  'text-[0.875rem] leading-relaxed',
                  onNavy
                    ? 'text-[color-mix(in_srgb,var(--color-field)_66%,transparent)]'
                    : 'text-[var(--color-slate)]',
                )}
              >
                {stage.caption}
              </span>
            </div>

            {!isLast ? (
              <ChevronRight
                aria-hidden="true"
                className={cn(
                  'hidden size-4 shrink-0 self-center lg:block',
                  onNavy ? 'text-[var(--color-cyan)]' : 'text-[var(--color-border)]',
                )}
              />
            ) : null}
          </li>
        )
      })}
    </ol>
  )
}
