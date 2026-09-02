import { cn } from '@/lib/utils/cn'

export type EngineeringLayer = {
  number: string
  title?: string
  description: string
  workItems: readonly string[]
}

/**
 * The seven Search Presence Engineering layers as a stacked ledger (09 5.55;
 * the 5.14 tokens).
 *
 * Rendered as one ordered surface rather than seven cards: a card grid would
 * imply the layers are interchangeable packages, and content/pages/05 is
 * explicit that not every problem needs every layer.
 */
export function EngineeringLayers({
  layers,
  className,
}: {
  layers: readonly EngineeringLayer[]
  className?: string
}) {
  return (
    <ol className={cn('flex flex-col border-t-2 border-[var(--ledger-rule-top)]', className)}>
      {layers.map((layer, index) => (
        <li
          key={layer.number}
          className={cn(
            'grid gap-4 py-[var(--ledger-row-pad)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-[var(--ledger-gap)]',
            index > 0 && 'border-t border-[var(--ledger-rule)]',
          )}
        >
          <div className="grid grid-cols-[var(--ledger-index-col)_minmax(0,1fr)]">
            <span className="text-small font-mono text-[var(--ledger-index-fg)] tabular-nums">
              {layer.number}
            </span>
            <div className="flex flex-col gap-2">
              {layer.title ? <h3 className="text-h4 text-ink">{layer.title}</h3> : null}
              <p className="max-w-[var(--ledger-desc-measure)] text-ink-body">{layer.description}</p>
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
              <h4 className="text-coordinate text-ink-2">Work on {layer.title} can include</h4>
            ) : null}
            <ul className="flex flex-wrap gap-1.5">
              {layer.workItems.map((item) => (
                <li
                  key={item}
                  className="text-small rounded-[var(--radius-small)] border border-rule bg-surface-raised px-2.5 py-1 text-ink-body"
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
