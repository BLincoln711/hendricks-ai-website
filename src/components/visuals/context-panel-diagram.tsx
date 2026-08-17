import { cn } from '@/lib/utils/cn'

export type ContextPanel = {
  name: string
  description: string
  question: string
}

/**
 * Four context quadrants used on Selection Intelligence (docs/13 §6).
 *
 * Each quadrant states the question it answers, which is the point of the
 * diagram: the panels are a research design, not decoration.
 */
export function ContextPanelDiagram({
  panels,
  className,
}: {
  panels: readonly ContextPanel[]
  className?: string
}) {
  return (
    <ul className={cn('grid gap-px overflow-hidden rounded-[var(--radius-panel)] border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-2', className)}>
      {panels.map((panel, index) => (
        <li key={panel.name} className="flex flex-col gap-3 bg-white p-6 md:p-8">
          <span className="font-mono text-[0.75rem] text-[var(--color-blue)]">
            {String(index + 1).padStart(2, '0')}
          </span>

          <h3 className="text-[1.25rem] leading-snug font-medium text-[var(--color-navy)]">
            {panel.name}
          </h3>

          <p className="text-[0.9375rem] leading-relaxed text-[var(--color-slate)]">
            {panel.description}
          </p>

          <p className="mt-auto border-t border-[var(--color-border)] pt-3 text-[0.875rem] leading-relaxed text-[var(--color-graphite)]">
            <span className="text-eyebrow block pb-1 text-[var(--color-slate)]">
              Question answered
            </span>
            {panel.question}
          </p>
        </li>
      ))}
    </ul>
  )
}
