import { cn } from '@/lib/utils/cn'

/**
 * The Demand-to-Selection System on /how-it-works (09 5.55; kept per section
 * 8). One ordered list, horizontal from 1024 px and vertical below, so the
 * four stages are a list in the DOM at every width (16 SM-06). The rail reads
 * `--ev-observed` and the connector `--guide`; the numeral is a coordinate.
 *
 * `onNavy` is a no-op kept for the homepage call site PR 7 closes (handoff
 * 5.3): every token here re-scopes under `.on-plate`.
 */
export function DemandToSelectionPath({
  steps,
  className,
}: {
  steps: readonly { number: string; name: string; description: string }[]
  /** @deprecated No-op. `.on-plate` re-scopes every token this path reads. */
  onNavy?: boolean
  className?: string
}) {
  return (
    <ol className={cn('grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6', className)}>
      {steps.map((step, index) => (
        <li key={step.number} className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            {/*
              Hidden from assistive technology because the same digit is carried
              by the `sr-only` prefix inside the heading below. Without this a
              screen reader announces the number twice per step.
            */}
            <span
              aria-hidden="true"
              className="text-coordinate inline-flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-ev-observed text-ink"
            >
              {step.number}
            </span>
            {/* Connector, desktop only. Decorative: the sequence is in the list. */}
            {index < steps.length - 1 ? (
              <span aria-hidden="true" className="hidden h-px flex-1 bg-guide lg:block" />
            ) : null}
          </div>
          <h3 className="text-h4 text-ink">
            {/*
              Carries the step number into the heading text, so the four headings
              read as an ordered path rather than four unrelated verbs once the
              list markup is stripped. Visually hidden: the number is already
              shown in the circle above.
            */}
            <span className="sr-only">Step {step.number}. </span>
            {step.name}
          </h3>
          <p className="text-small text-ink">{step.description}</p>
        </li>
      ))}
    </ol>
  )
}
