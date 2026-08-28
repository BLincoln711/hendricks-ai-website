import { cn } from '@/lib/utils/cn'

export type EngineeringLayer = {
  number: string
  title?: string
  description: string
  workItems: readonly string[]
}

/**
 * The seven Search Presence Engineering layers (docs/13 §7).
 *
 * Rendered as a stacked ledger rather than seven cards: the layers are a single
 * ordered surface, and a card grid would imply they are interchangeable
 * packages. content/pages/05 is explicit that not every problem needs every
 * layer.
 */
export function EngineeringLayers({
  layers,
  className,
}: {
  layers: readonly EngineeringLayer[]
  className?: string
}) {
  return (
    <ol className={cn('flex flex-col', className)}>
      {layers.map((layer) => (
        <li
          key={layer.number}
          className="grid gap-4 border-t border-[var(--color-border)] py-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12"
        >
          <div className="flex gap-4">
            <span className="font-mono text-[0.875rem] text-[var(--color-blue)] tabular-nums">
              {layer.number}
            </span>
            <div className="flex flex-col gap-2">
              {layer.title ? (
                <h3 className="text-[1.375rem] leading-snug font-medium text-[var(--color-navy)]">
                  {layer.title}
                </h3>
              ) : null}
              <p className="text-[0.9375rem] leading-relaxed text-[var(--color-slate)]">
                {layer.description}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 lg:pt-1">
            {/*
              Composed from `layer.title` rather than a fixed label. Seven layers
              render on one route, so a hardcoded string shipped seven identical
              H4s in the document outline. The title is approved copy already
              printed in the H3 above, so no new string is authored here. A layer
              with no title omits the heading rather than inventing a replacement.
            */}
            {layer.title ? (
              <h4 className="text-eyebrow text-[var(--color-slate)]">
                Work on {layer.title} can include
              </h4>
            ) : null}
            <ul className="flex flex-wrap gap-1.5">
              {layer.workItems.map((item) => (
                <li
                  key={item}
                  className="rounded-[var(--radius-control)] border border-[var(--color-border)] bg-white px-2.5 py-1 text-[0.8125rem] text-[var(--color-graphite)]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  )
}
