import type { ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'

export type LedgerRow = {
  /** The row's label, at full ink. */
  label: ReactNode
  /** What the label means, at the quiet ink tier. */
  value?: ReactNode
  /** The named artifact, route or coordinate the row resolves to. */
  note?: ReactNode
  /** A stable key. Falls back to the label when the label is a plain string. */
  key?: string
}

/**
 * The generic hairline separated row (canvas `_canvas.css` section 13).
 *
 * Three fields: a label, a value and a note. The ladder, the phase rail and the
 * outputs list are specialisations of it. The row's third field is information,
 * not decoration, so it is read rather than hidden.
 *
 * A ledger label is a label and never a heading: four sibling H3s inside a list
 * that has no H2 of its own inflates the document outline, which is the defect
 * the canvas conversion guide records in its worked example.
 */
export function Ledger({
  rows,
  numbered = false,
  fieldLabels,
  ariaLabel,
  className,
}: {
  rows: readonly LedgerRow[]
  /** Prints a mono index before each label and renders an ordered list. */
  numbered?: boolean
  /**
   * Names the value and note fields for assistive technology, where the page
   * they came from labelled them. A ledger has no head row, so a field whose
   * meaning is not obvious from its content keeps its name here rather than
   * losing it.
   */
  fieldLabels?: { value?: string; note?: string }
  ariaLabel?: string
  className?: string
}) {
  const List = numbered ? 'ol' : 'ul'

  return (
    <List className={cn('ledger', className)} aria-label={ariaLabel}>
      {rows.map((row, index) => (
        <li key={row.key ?? (typeof row.label === 'string' ? row.label : index)}>
          <span className="k">
            {numbered ? (
              <span className="ix" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
            ) : null}
            {row.label}
          </span>
          {row.value ? (
            <span className="v">
              {fieldLabels?.value ? (
                <span className="sr-only">{fieldLabels.value}: </span>
              ) : null}
              {row.value}
            </span>
          ) : null}
          {row.note ? (
            <span className="n">
              {fieldLabels?.note ? <span className="sr-only">{fieldLabels.note}: </span> : null}
              {row.note}
            </span>
          ) : null}
        </li>
      ))}
    </List>
  )
}
