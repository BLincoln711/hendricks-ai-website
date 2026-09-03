import type { ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'

/**
 * Ledger row and ledger list (09 5.14): the replacement for card grids.
 *
 * A tint head row with mono column labels, rows with a 44 px index column, a
 * name at the H4 role, a description at 52ch, an optional link and a mono
 * output column; hairline separators; an optional 2 px ink top rule. Each
 * cell carries its column label: visible below 768 px, where the head row
 * hides and the row stacks, and screen-reader only from 768 px, so the label
 * reaches assistive technology at every width (16 TY-03). The head row is
 * decorative because the cells already name their columns. Order that
 * carries meaning is an `ol` (SM-06); never `table` semantics unless the data
 * is tabular (5.35).
 *
 * Content comes from the typed content objects; the fact strip carries the
 * three approved cells and no fee figure.
 */

export type LedgerColumns = {
  name: string
  description?: string
  link?: string
  output?: string
}

export type LedgerLink = { label: string; href: string }

export type LedgerRowData = {
  /** The margin index ("01"); omitted rows take their position in the list. */
  index?: string
  name: string
  description?: string
  link?: LedgerLink
  /** The named output, set in mono ("Demand Map"). */
  output?: string
}

const cell = 'flex flex-col gap-1 md:contents'
const inlineLabel = 'text-coordinate text-ink-2 md:sr-only'

function LedgerHead({ columns }: { columns: LedgerColumns }) {
  return (
    <div
      aria-hidden="true"
      className="text-coordinate hidden grid-cols-[var(--ledger-index-col)_minmax(0,1.2fr)_minmax(0,1.6fr)_auto_auto] items-center gap-x-[var(--ledger-gap)] bg-[var(--ledger-head-bg)] px-3 py-2 tracking-[var(--ledger-head-tracking)] text-[var(--ledger-head-fg)] md:grid"
    >
      <span />
      <span>{columns.name}</span>
      <span>{columns.description}</span>
      <span>{columns.link}</span>
      <span className="text-right">{columns.output}</span>
    </div>
  )
}

export function LedgerRow({
  row,
  position,
  columns,
  headingLevel = 3,
  renderLink,
}: {
  row: LedgerRowData
  position: number
  columns: LedgerColumns
  headingLevel?: 3 | 4
  /** Draws the row link; the default is a plain 44 px standalone link. */
  renderLink?: (link: LedgerLink) => ReactNode
}) {
  const Heading = `h${headingLevel}` as 'h3' | 'h4'
  const index = row.index ?? String(position).padStart(2, '0')

  return (
    <li className="grid grid-cols-[var(--ledger-index-col)_minmax(0,1fr)] gap-y-3 border-t border-[var(--ledger-rule)] px-3 py-[var(--ledger-row-pad)] md:grid-cols-[var(--ledger-index-col)_minmax(0,1.2fr)_minmax(0,1.6fr)_auto_auto] md:items-baseline md:gap-x-[var(--ledger-gap)]">
      <span aria-hidden="true" className="text-small font-mono text-[var(--ledger-index-fg)] tabular-nums">
        {index}
      </span>
      <Heading className="text-h4 text-ink">{row.name}</Heading>
      {row.description ? (
        <div className={cn(cell, 'col-start-2')}>
          <span className={inlineLabel}>{columns.description}</span>
          <p className="max-w-[var(--ledger-desc-measure)] text-ink">{row.description}</p>
        </div>
      ) : (
        <span className="hidden md:block" />
      )}
      {row.link ? (
        <div className={cn(cell, 'col-start-2')}>
          {renderLink ? (
            renderLink(row.link)
          ) : (
            <a href={row.link.href} className="link link-standalone text-small">
              {row.link.label}
            </a>
          )}
        </div>
      ) : (
        <span className="hidden md:block" />
      )}
      {row.output ? (
        <div className={cn(cell, 'col-start-2 md:text-right')}>
          <span className={inlineLabel}>{columns.output}</span>
          <span className="text-small font-mono text-ink">{row.output}</span>
        </div>
      ) : (
        <span className="hidden md:block" />
      )}
    </li>
  )
}

export function LedgerList({
  rows,
  columns,
  ordered = true,
  topRule = false,
  headingLevel,
  renderLink,
  ariaLabelledBy,
  className,
}: {
  rows: readonly LedgerRowData[]
  columns: LedgerColumns
  /** `ol` where order carries meaning (phases), `ul` for a set (definitions). */
  ordered?: boolean
  /** The 2 px ink rule above the head row, for the evidence ledger. */
  topRule?: boolean
  headingLevel?: 3 | 4
  renderLink?: (link: LedgerLink) => ReactNode
  ariaLabelledBy?: string
  className?: string
}) {
  const List = ordered ? 'ol' : 'ul'

  return (
    <div className={cn(topRule && 'border-t-2 border-[var(--ledger-rule-top)]', className)}>
      <LedgerHead columns={columns} />
      <List aria-labelledby={ariaLabelledBy} className="border-b border-[var(--ledger-rule)]">
        {rows.map((row, index) => (
          <LedgerRow
            key={row.name}
            row={row}
            position={index + 1}
            columns={columns}
            headingLevel={headingLevel}
            renderLink={renderLink}
          />
        ))}
      </List>
    </div>
  )
}

/**
 * The fact strip: three cells, each a coordinate label over a value at the H4
 * role, ruled above and below. A `dl`, since each cell is a term and its
 * value.
 */
export function FactStrip({
  cells,
  className,
}: {
  cells: readonly { label: string; value: string }[]
  className?: string
}) {
  return (
    <dl
      className={cn(
        'grid gap-y-6 border-y-2 border-[var(--ledger-rule-top)] py-[var(--ledger-row-pad)] sm:grid-cols-3 sm:gap-x-[var(--ledger-gap)]',
        className,
      )}
    >
      {cells.map((item) => (
        <div key={item.label} className="flex flex-col gap-2">
          <dt className="text-coordinate text-ink-2">{item.label}</dt>
          <dd className="text-h4 text-ink">{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}
