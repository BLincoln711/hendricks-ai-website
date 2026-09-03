import { publicationChrome } from '@/content/shared/publication-record'
import { cn } from '@/lib/utils/cn'

export type Citation = {
  /** The author, as the study's own byline names them. */
  author: string
  /** Four-digit year, taken from the publication date. */
  year: string
  title: string
  /** The series and edition, where the study belongs to one. */
  series?: string
  publisher: string
  url: string
  /** The data DOI, where the study publishes one. */
  doi?: { label: string; href: string }
  /** The concept DOI, which always resolves to the latest version. */
  latestVersionDoi?: { label: string; href: string }
}

/**
 * Cite this study (canvas `_canvas.css` section 16, `.cite`).
 *
 * The citation string is selectable mono text on one hairline. It is composed
 * from the study's own record rather than authored, so a citation and the page
 * it cites cannot disagree about the title, the author or the date, and a
 * change to the record changes the citation with it.
 *
 * It is not a code block and carries no fill: the system has no box, and a
 * reader selecting a citation needs the characters, not a frame around them.
 */
export function CiteThis({
  citation,
  id,
  className,
}: {
  citation: Citation
  id?: string
  className?: string
}) {
  const parts = [
    `${citation.author} (${citation.year}).`,
    `${citation.title}.`,
    citation.series ? `${citation.series}.` : null,
    `${citation.publisher}.`,
    citation.url,
    citation.doi ? `Data DOI: ${citation.doi.label}.` : null,
  ].filter(Boolean)

  return (
    <div className={cn('cite', className)} id={id}>
      <p className="text-coordinate mb-[10px] text-ink-2">{publicationChrome.cite.label}</p>
      <p className="cite-str">{parts.join(' ')}</p>

      {citation.doi || citation.latestVersionDoi ? (
        <div className="cite-row">
          {citation.doi ? (
            <span className="text-caption text-ink-2">
              {publicationChrome.cite.dataDoi} <a href={citation.doi.href}>{citation.doi.label}</a>
            </span>
          ) : null}
          {citation.latestVersionDoi ? (
            <span className="text-caption text-ink-2">
              {publicationChrome.cite.latestVersion}{' '}
              <a href={citation.latestVersionDoi.href}>{citation.latestVersionDoi.label}</a>
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
