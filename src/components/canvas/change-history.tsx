import Link from 'next/link'

import { NOT_YET_RECORDED } from '@/components/canvas/byline'
import { TableRegion } from '@/components/canvas/table-region'
import { routes } from '@/config/routes'
import {
  changeKindLabels,
  publicationChrome,
  type ChangeEntry,
} from '@/content/shared/publication-record'
import { formatLongDate } from '@/lib/utils/format-date'

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
  /*
    A page that has recorded no history still renders the table, with the one
    row it can honestly state. The date column reads "Not yet recorded" rather
    than a date nobody approved, which is the same rule the byline follows.
  */
  const rows: { date?: string; kind: string; summary: string }[] = entries?.length
    ? entries.map((entry) => ({
        date: entry.date,
        kind: changeKindLabels[entry.kind],
        summary: entry.summary,
      }))
    : [
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
