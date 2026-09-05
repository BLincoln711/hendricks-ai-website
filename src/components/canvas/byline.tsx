import { formatLongDate } from '@/lib/utils/format-date'
import { siteConfig } from '@/config/site'

/**
 * The byline (canvas `.byline`).
 *
 * The author link resolves to the one Person node at
 * `https://hendricks.ai/about#person`. jobTitle stays in JSON-LD. Visible
 * vocabulary bylines print the name and stop.
 *
 * A date the site has not recorded renders the page's own "Not yet recorded"
 * string rather than a date nobody has approved. The field stays, because a
 * reader judging whether a definition is current needs to see that the answer
 * is unknown rather than see nothing at all.
 */
export const NOT_YET_RECORDED = 'Not yet recorded'

export function Byline({
  authorName = siteConfig.founder,
  authorTitle,
  reviewed,
  published,
  updated,
  showDates = true,
  reviewedLabel = 'sources',
}: {
  authorName?: string
  authorTitle?: string
  /** ISO date the sources were last reviewed. */
  reviewed?: string
  /** ISO date, or undefined where the site has not recorded one. */
  published?: string
  updated?: string
  /**
   * Prints the publication and update fields, including where the site has
   * recorded no date. A page that is not a dated publication, such as the
   * biography, omits them rather than printing "Not yet recorded" twice.
   */
  showDates?: boolean
  /**
   * Vocabulary and decision pages use "Last reviewed". Research pages keep
   * "Sources reviewed".
   */
  reviewedLabel?: 'sources' | 'last-reviewed'
}) {
  return (
    <p className="byline">
      <span>
        By{' '}
        <a href={siteConfig.founderPersonId} rel="author">
          {authorName}
        </a>
        {authorTitle ? `, ${authorTitle}` : '.'}
      </span>

      {reviewed ? (
        <span>
          {reviewedLabel === 'last-reviewed' ? 'Last reviewed' : 'Sources reviewed'}{' '}
          <time dateTime={reviewed}>{formatLongDate(reviewed)}</time>
          {reviewedLabel === 'last-reviewed' ? '.' : null}
        </span>
      ) : null}

      {showDates ? (
        <>
          <span>
            Published{' '}
            {published ? (
              <time dateTime={published}>{formatLongDate(published)}</time>
            ) : (
              NOT_YET_RECORDED
            )}
          </span>

          <span>
            Updated{' '}
            {updated ? (
              <time dateTime={updated}>{formatLongDate(updated)}</time>
            ) : (
              NOT_YET_RECORDED
            )}
          </span>
        </>
      ) : null}
    </p>
  )
}
