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
 * diagram: the panels are a research design, not decoration.
 *
 * The separators are a hairline lattice: the parent carries the top and left
 * rules, each cell the right and bottom. A tinted parent showing through 1 px
 * gaps needs opaque children; with transparent cells its rule colour paints the
 * whole block, which is the tinted panel the canvas forbids.
 */
export function ContextPanelDiagram({
  panels,
  className,
}: {
  panels: readonly ContextPanel[]
  className?: string
}) {
  return (
    <ul className={cn('grid border-t border-l border-rule sm:grid-cols-2', className)}>
      {panels.map((panel, index) => (
        <li
          key={panel.name}
          className="flex flex-col gap-3 border-r border-b border-rule p-6 md:p-8"
        >
          <span aria-hidden="true" className="text-coordinate text-ink-2">
            {String(index + 1).padStart(2, '0')}
          </span>

          <h3 className="text-h4 text-ink">{panel.name}</h3>

          <p className="text-ink">{panel.description}</p>

          <p className="text-small mt-auto border-t border-rule pt-3 text-ink">
            <span className="text-coordinate block pb-1 text-ink-2">Question answered</span>
            {panel.question}
          </p>
        </li>
      ))}
    </ul>
  )
}
