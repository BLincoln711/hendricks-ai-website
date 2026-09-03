import { TocDisclosure } from '@/components/canvas/toc-disclosure'

/**
 * The interior route's table of contents (canvas `_canvas.css` section 10, plus
 * the `toc-toggle` control in the converted pages' own style block).
 *
 * Hairline separated rows, no box, sticky from 1024 px and static below it.
 * Each row is a 44 px box carrying a mono index and the section's own words, so
 * the list reads as the page's outline rather than as decoration.
 *
 * Below 1024 px the visible heading gives way to the control that carries the
 * same words, which is what the design's own per-page sheet does.
 */

/** One table of contents per route, so the design's fixed id is safe to reuse. */
const LIST_ID = 'toc-list'

export function TableOfContents({
  items,
  heading = 'On this page',
  headingId,
}: {
  items: readonly { id: string; label: string }[]
  heading?: string
  /** Set when the nav is labelled by its own visible heading. */
  headingId?: string
}) {
  return (
    <nav
      className="toc"
      aria-label={headingId ? undefined : heading}
      aria-labelledby={headingId}
    >
      <h2 id={headingId} className="text-coordinate mb-[10px] text-ink-2">
        {heading}
      </h2>

      <TocDisclosure label={heading} listId={LIST_ID}>
        {items.map((item, index) => (
          <li key={item.id}>
            <a href={`#${item.id}`}>
              <span className="n" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              {item.label}
            </a>
          </li>
        ))}
      </TocDisclosure>
    </nav>
  )
}
