import { cn } from '@/lib/utils/cn'

export type Definition = {
  term: string
  /** The definition, one paragraph per entry. */
  definition: readonly string[]
}

/**
 * The definition list (canvas `_canvas.css` section 16, `.deflist`).
 *
 * CANON section 6 requires every Hendricks term to be defined on first use on
 * a page. This is where that lands: hairline separated rows, the term at full
 * ink and the definition at the quiet tier, and no box around either.
 */
export function DefinitionList({
  definitions,
  className,
}: {
  definitions: readonly Definition[]
  className?: string
}) {
  return (
    <dl className={cn('deflist', className)}>
      {definitions.map((entry) => (
        <div key={entry.term}>
          <dt>{entry.term}</dt>
          {entry.definition.map((paragraph) => (
            <dd key={paragraph}>{paragraph}</dd>
          ))}
        </div>
      ))}
    </dl>
  )
}
