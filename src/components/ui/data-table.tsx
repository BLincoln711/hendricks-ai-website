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
 * Server-rendered table with a required caption (docs/13 §3).
 *
 * Narrow viewports get a focusable scroll region with a visible hint rather than
 * a silently clipped table. `tabIndex={0}` makes the region reachable so a
 * keyboard user can scroll it (WCAG 2.1.1).
 */
export function DataTable({
  caption,
  captionVisible = false,
  columns,
  rows,
  className,
}: {
  caption: string
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
        className="min-w-0 overflow-x-auto rounded-[var(--radius-card)] border border-[var(--color-border)]"
      >
        <table className="w-full min-w-[34rem] border-collapse text-left">
          <caption
            className={
              captionVisible
                ? 'px-4 py-3 text-left text-[0.875rem] text-[var(--color-slate)] md:px-6'
                : 'sr-only'
            }
          >
            {caption}
          </caption>
          <thead>
            <tr className="bg-[var(--color-soft)]">
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  style={column.width ? { width: column.width } : undefined}
                  className="px-4 py-3 text-[0.8125rem] font-medium tracking-wide text-[var(--color-navy)] uppercase md:px-6"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={columns[0] ? row[columns[0].key] : rowIndex}
                className={rowIndex > 0 ? 'border-t border-[var(--color-border)]' : ''}
              >
                {columns.map((column) =>
                  column.rowHeader ? (
                    <th
                      key={column.key}
                      scope="row"
                      className="px-4 py-3.5 align-top text-[0.9375rem] font-medium text-[var(--color-navy)] md:px-6"
                    >
                      {row[column.key]}
                    </th>
                  ) : (
                    <td
                      key={column.key}
                      className="px-4 py-3.5 align-top text-[0.9375rem] leading-relaxed text-[var(--color-slate)] md:px-6"
                    >
                      {row[column.key]}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p aria-hidden="true" className="text-[0.75rem] text-[var(--color-slate)] sm:hidden">
        Scroll horizontally to see the full table.
      </p>
    </div>
  )
}
