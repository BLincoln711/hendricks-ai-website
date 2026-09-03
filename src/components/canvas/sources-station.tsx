import Link from 'next/link'

import { SourceList, type Source } from '@/components/canvas/source-list'
import { Station } from '@/components/sections/station'
import { publicationChrome } from '@/content/shared/publication-record'
import { formatLongDate } from '@/lib/utils/format-date'

/**
 * The sources station of an editorial route.
 *
 * D-E requires every interior route to keep its sources and their dates, and
 * this is where they land: the review date, the basis on which the page makes
 * its claims, where the definition is applied, and, where the page cites
 * anything external, the numbered reference list.
 *
 * A page that cites nothing renders no reference list rather than an empty one:
 * claiming sources a page does not draw on would be worse than stating none.
 */
export function SourcesStation({
  reviewed,
  basis,
  appliedIn,
  citations,
  citationsHeading = 'References',
  appliedInLead = publicationChrome.sources.appliedInLead,
  id = 'sources',
}: {
  /** ISO date the sources were last reviewed. */
  reviewed: string
  basis: string
  appliedIn: readonly { label: string; href: string }[]
  citations?: readonly Source[]
  citationsHeading?: string
  /**
   * The clause before the applied-in list. A page that reports a measurement
   * says so rather than borrowing the definition pages' wording.
   */
  appliedInLead?: string
  id?: string
}) {
  return (
    <Station id={id} ariaLabelledBy={`${id}-title`} stack>
      <p className="text-eyebrow text-ink-2">{publicationChrome.sources.eyebrow}</p>
      <h2 id={`${id}-title`} className="text-h2 text-ink">
        {publicationChrome.sources.title}
      </h2>

      <div className="prose">
        <p className="text-caption">
          {publicationChrome.sources.reviewedLabel}{' '}
          <time dateTime={reviewed} className="font-mono">
            {formatLongDate(reviewed)}
          </time>
          .
        </p>
        <p>{basis}</p>
        <p>
          {appliedInLead}{' '}
          {appliedIn.map((item, index) => (
            <span key={item.href}>
              {index > 0 ? (index === appliedIn.length - 1 ? ' and ' : ', ') : ''}
              <Link href={item.href}>{item.label}</Link>
            </span>
          ))}
          .
        </p>
      </div>

      {citations && citations.length > 0 ? (
        <div className="block">
          <h3 className="text-coordinate text-ink-2">{citationsHeading}</h3>
          <SourceList className="mt-3" sources={citations} reviewed={reviewed} />
        </div>
      ) : null}
    </Station>
  )
}
