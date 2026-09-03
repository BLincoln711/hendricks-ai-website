import { cn } from '@/lib/utils/cn'

/**
 * Limitations (canvas `_canvas.css` section 16, `.limits`).
 *
 * A dashed hairline in the inferred grey, because a limitation is the boundary
 * of what the evidence supports. Never a warning box and never a fill: the
 * system has one accent border and this is it.
 *
 * D-E keeps every limitation a page carries. A limitation removed to shorten a
 * page is the one cut that changes what the page claims.
 */
export function Limitations({
  label,
  items,
  body,
  className,
}: {
  /** The mono line above the list. */
  label?: string
  items?: readonly string[]
  body?: readonly string[]
  className?: string
}) {
  return (
    <div className={cn('limits', className)}>
      {label ? <p className="text-coordinate text-ink-2">{label}</p> : null}
      {body?.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {items ? (
        <ul>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
