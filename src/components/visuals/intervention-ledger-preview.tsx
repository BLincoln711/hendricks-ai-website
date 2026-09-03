import { cn } from '@/lib/utils/cn'

/**
 * The fields recorded for every intervention (content/pages/05 §Intervention
 * Ledger preview).
 *
 * Deliberately a field list and not a populated dashboard. docs/12 §6 forbids
 * presenting a mockup as real data, and inventing plausible ledger rows would do
 * exactly that.
 */
export function InterventionLedgerPreview({
  fields,
  caption,
  className,
}: {
  fields: readonly string[]
  caption: string
  className?: string
}) {
  return (
    <figure
      className={cn(
        'flex flex-col gap-5 border border-rule p-6 md:p-8',
        className,
      )}
    >
      <ol className="grid gap-px overflow-hidden border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
        {fields.map((field, index) => (
          <li key={field} className="flex items-baseline gap-3 px-4 py-3">
            <span className="font-mono text-[0.75rem] text-ink-2 tabular-nums">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="text-[0.9375rem] text-ink-3">{field}</span>
          </li>
        ))}
      </ol>

      <figcaption className="text-[0.875rem] leading-relaxed text-ink-2">
        {caption}
      </figcaption>
    </figure>
  )
}
