import { cn } from '@/lib/utils/cn'

export type ContextPanel = {
  name: string
  description: string
  question: string
}

/**
 * Four context quadrants on Selection Intelligence (09 5.55).
 *
 * Each quadrant states the question it answers, which is the point of the
 * diagram: the panels are a research design, not decoration. A quadrant grid
 * is not a plate, so it reads `--radius-tile` and the raised surface with a 1
 * px `--rule` gap.
 */
export function ContextPanelDiagram({
  panels,
  className,
}: {
  panels: readonly ContextPanel[]
  className?: string
}) {
  return (
    <ul
      className={cn(
        'grid gap-px overflow-hidden rounded-[var(--radius-tile)] border border-rule bg-rule sm:grid-cols-2',
        className,
      )}
    >
      {panels.map((panel, index) => (
        <li key={panel.name} className="flex flex-col gap-3 bg-surface-raised p-6 md:p-8">
          <span aria-hidden="true" className="text-coordinate text-ink-2">
            {String(index + 1).padStart(2, '0')}
          </span>

          <h3 className="text-h4 text-ink">{panel.name}</h3>

          <p className="text-ink-body">{panel.description}</p>

          <p className="text-small mt-auto border-t border-rule pt-3 text-ink-body">
            <span className="text-coordinate block pb-1 text-ink-2">Question answered</span>
            {panel.question}
          </p>
        </li>
      ))}
    </ul>
  )
}
