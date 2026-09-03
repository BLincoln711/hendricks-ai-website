import { cn } from '@/lib/utils/cn'
import { formatLongDate } from '@/lib/utils/format-date'

export type Source = {
  title: string
  /** Named `url` to match the citation shape the content modules already hold. */
  url?: string
  publisher: string
  /**
   * ISO publication date. Living platform documentation carries none, and
   * inventing one would be worse than stating the date Hendricks read it, so a
   * source without this falls back to the page's own review date.
   */
  published?: string
}

/**
 * Sources with publication dates (canvas `_canvas.css` section 16, `.srclist`).
 *
 * Numbered by a CSS counter so body text can cite [1] and resolve here. Every
 * entry carries its publisher and a date, because a source without a date
 * cannot be judged current, and D-E keeps both on the page.
 *
 * An external link opens in a new tab and says so, rather than springing one
 * (WCAG 3.2.5).
 */
export function SourceList({
  sources,
  reviewed,
  className,
}: {
  sources: readonly Source[]
  /** The page's own review date, used where a source records no publication date. */
  reviewed?: string
  className?: string
}) {
  return (
    <ol className={cn('srclist', className)}>
      {sources.map((source) => (
        <li key={source.title}>
          <div>
            {source.url ? (
              <a
                className="s-title"
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {source.title}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : (
              <span className="s-title">{source.title}</span>
            )}
            <span className="s-meta">
              {source.publisher}.{' '}
              {source.published ? (
                <>
                  Published{' '}
                  <time dateTime={source.published}>{formatLongDate(source.published)}</time>.
                </>
              ) : reviewed ? (
                <>
                  Read <time dateTime={reviewed}>{formatLongDate(reviewed)}</time>.
                </>
              ) : null}
            </span>
          </div>
        </li>
      ))}
    </ol>
  )
}
