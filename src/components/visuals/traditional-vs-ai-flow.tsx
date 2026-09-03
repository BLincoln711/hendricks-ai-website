import { ChevronRight } from 'lucide-react'

import { cn } from '@/lib/utils/cn'

/**
 * Two process rows contrasting traditional ranking with the AI-mediated
 * selection journey (docs/13 §6). Stacks with clear labels on mobile.
 *
 * Built from ordered lists rather than an SVG so the sequence is conveyed by
 * markup, not only by visual arrangement.
 */
function Flow({
  label,
  steps,
  tone,
}: {
  label: string
  steps: readonly string[]
  tone: 'muted' | 'active'
}) {
  return (
    <div className="flex flex-col gap-4">
      <h3
        className={cn(
          'text-[1.0625rem] font-medium',
          tone === 'active' ? 'text-ink' : 'text-ink-2',
        )}
      >
        {label}
      </h3>
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
        {steps.map((step, index) => (
          <li key={step} className="flex items-center gap-1.5">
            <span
              className={cn(
                'inline-flex items-center rounded-[var(--radius-control)] border px-2.5 py-1.5 text-[0.8125rem] font-medium whitespace-nowrap',
                tone === 'active'
                  ? 'border-path text-ink'
                  : 'border-rule text-ink-2',
              )}
            >
              {step}
            </span>
            {index < steps.length - 1 ? (
              <>
                {/*
                  The chips carry no whitespace text node between them, so a
                  tag-stripping extractor renders the sequence as one run-together
                  word. `sr-only` is absolutely positioned and therefore not a
                  flex item, so it adds no gap and changes nothing visually.
                */}
                <span className="sr-only">, </span>
                <ChevronRight
                  className={cn(
                    'size-3.5 shrink-0',
                    tone === 'active' ? 'text-link' : 'text-ink-2',
                  )}
                  aria-hidden="true"
                />
              </>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  )
}

export function TraditionalVsAiFlow({
  traditional,
  aiMediated,
  className,
}: {
  traditional: { label: string; steps: readonly string[] }
  aiMediated: { label: string; steps: readonly string[] }
  className?: string
}) {
  return (
    <div className={cn('grid gap-8 lg:grid-cols-2 lg:gap-12', className)}>
      <Flow label={traditional.label} steps={traditional.steps} tone="muted" />
      <Flow label={aiMediated.label} steps={aiMediated.steps} tone="active" />
    </div>
  )
}

/**
 * The complete Discoverable → Revenue path. Rendered as a single wrapping
 * sequence; the amber terminal node marks the commercial outcome.
 */
export function CompletePath({ steps, className }: { steps: readonly string[]; className?: string }) {
  return (
    <ol className={cn('flex flex-wrap items-center gap-x-1.5 gap-y-2', className)}>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1
        return (
          <li key={step} className="flex items-center gap-1.5">
            <span
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[0.8125rem] font-medium whitespace-nowrap',
                isLast
                  ? 'border-ev-gap text-ink'
                  : 'border-rule text-ink-3',
              )}
            >
              {step}
            </span>
            {!isLast ? (
              <>
                {/* Same separator as `Flow` above, for the same reason. */}
                <span className="sr-only">, </span>
                <ChevronRight className="size-3.5 shrink-0 text-ink-2" aria-hidden="true" />
              </>
            ) : null}
          </li>
        )
      })}
    </ol>
  )
}
