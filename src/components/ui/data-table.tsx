import { cn } from '@/lib/utils/cn'

export type DataTableColumn = {
  key: string
  header: string
  /** Renders as a row header rather than a cell. Use for the identifying column. */
  rowHeader?: boolean
  width?: string
}

export type DataTableRow = Record<string, string>

/**
 * Data table (09 5.35): a required caption, `th scope` on every header, and a
 * labelled scroll region so a narrow viewport gets a focusable region rather
 * than a silently clipped table (16 SM-08; WCAG 2.1.1). The region's name is
 * the caption, the head reads the tint ground with mono coordinate labels,
 * and numerals are tabular.
 */
export function DataTable({
  caption,
  captionVisible = false,
  columns,
  rows,
  className,
}: {
  caption: string
  /** Visible on research and methodology pages; sr-only elsewhere. */
  captionVisible?: boolean
  columns: readonly DataTableColumn[]
  rows: readonly DataTableRow[]
  className?: string
}) {
  return (
    // `min-w-0` is load-bearing: without it the wrapper's min-content width is
    // the table's `min-w-[34rem]`, which pushes an implicit grid column wider
    // than the viewport instead of letting the scroll region take over.
    <div className={cn('flex min-w-0 flex-col gap-2', className)}>
      <div
        tabIndex={0}
        role="region"
        aria-label={caption}
        className="min-w-0 overflow-x-auto rounded-[var(--radius-control)] border border-rule-strong"
      >
        <table className="text-small w-full min-w-[34rem] border-collapse text-left tabular-nums">
          <caption className={captionVisible ? 'px-4 py-3 text-left text-ink-2 md:px-6' : 'sr-only'}>
            {caption}
          </caption>
          <thead>
            <tr className="">
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  style={column.width ? { width: column.width } : undefined}
                  className="text-coordinate px-4 py-3 text-ink-2 md:px-6"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={columns[0] ? row[columns[0].key] : rowIndex} className={rowIndex > 0 ? 'border-t border-rule' : ''}>
                {columns.map((column) =>
                  column.rowHeader ? (
                    <th key={column.key} scope="row" className="px-4 py-3.5 align-top font-medium text-ink md:px-6">
                      {row[column.key]}
                    </th>
                  ) : (
                    <td key={column.key} className="px-4 py-3.5 align-top text-ink md:px-6">
                      {row[column.key]}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p aria-hidden="true" className="text-caption text-ink-2 sm:hidden">
        Scroll horizontally to see the full table.
      </p>
    </div>
  )
}
