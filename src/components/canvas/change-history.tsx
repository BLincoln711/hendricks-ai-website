import Link from 'next/link'

import { NOT_YET_RECORDED } from '@/components/canvas/byline'
import { TableRegion } from '@/components/canvas/table-region'
import { routes } from '@/config/routes'
import { publicationChrome } from '@/content/shared/publication-record'
import { formatLongDate } from '@/lib/utils/format-date'

export type ChangeEntry = {
  /** ISO date, or undefined where the site has recorded none. */
  date?: string
  kind: string
  summary: string
}

/**
 * The change history of a page (canvas `_canvas.css` section 16).
 *
 * A page that changes says so, and a page that has never changed says that
 * too. The table renders as a real table inside a named scroll region rather
 * than as a list, because a date, a kind and a summary are a three-column
 * record and a reader comparing two rows needs the columns to line up.
 *
 * The corrections policy is linked from here rather than from the footer alone:
 * a reader who is checking whether a page changed is the reader who wants to
 * know how a correction is made.
 */
export function ChangeHistory({ entries }: { entries?: readonly ChangeEntry[] }) {
  const rows = entries ?? [
    {
      kind: publicationChrome.changeHistory.firstPublication.kind,
      summary: publicationChrome.changeHistory.firstPublication.summary,
    },
  ]

  return (
    <>
      <TableRegion
        caption={publicationChrome.changeHistory.caption}
        columns={[
          { key: 'date', header: publicationChrome.changeHistory.columns.date, rowHeader: true },
          { key: 'kind', header: publicationChrome.changeHistory.columns.kind },
          { key: 'summary', header: publicationChrome.changeHistory.columns.summary },
        ]}
        rows={rows.map((entry) => ({
          date: entry.date ? (
            <time dateTime={entry.date}>{formatLongDate(entry.date)}</time>
          ) : (
            NOT_YET_RECORDED
          ),
          kind: entry.kind,
          summary: entry.summary,
        }))}
      />

      <p className="mt-[18px]">
        <Link className="tlink" href={routes.corrections.path}>
          {publicationChrome.changeHistory.correctionsLabel}
        </Link>
      </p>
    </>
  )
}
