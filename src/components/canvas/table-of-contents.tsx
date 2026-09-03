/**
 * The interior route's table of contents (canvas `_canvas.css` section 10).
 *
 * Hairline separated rows, no box, sticky from 1024 px and static below it.
 * Each row is a 44 px box carrying a mono index and the section's own words, so
 * the list reads as the page's outline rather than as decoration.
 *
 * CONFLICT RECORDED. Four of the converted pages add a `.toc-toggle` control
 * that collapses the list below 1024 px, driven by a per-page script.
 * `_canvas.css` defines no such control and gives it no styling, and the list
 * ships expanded there so a reader without JavaScript sees every entry. The
 * system file is the one that wins, so the list renders in full at every width
 * and this route loads no JavaScript for its contents.
 */
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
      <ol>
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
      </ol>
    </nav>
  )
}
