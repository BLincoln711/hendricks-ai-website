import Link from 'next/link'
import { useId } from 'react'

import { routes } from '@/config/routes'
import { evidenceGradeRows, type EvidenceGradeRow } from '@/content/shared/evidence-grades'

/** The `/methodology` grade table, which the linked variant points at. */
export const EVIDENCE_GRADE_TABLE_HREF = `${routes.methodology.path}#grades-title`

const standardOf = (grade: EvidenceGradeRow['grade']) =>
  evidenceGradeRows.find((row) => row.grade === grade)!.evidence

/**
 * Evidence grade mark (09 5.53): one grade, A to D, wherever a tile, table
 * cell or record cites the strength of its evidence, separate from its class.
 *
 * The visible word "Grade" and the letter in a 24 px ruled square, mono 500.
 * The standard is never retyped: it is read from `evidenceGradeRows`, and the
 * accessible name is "Grade" plus the letter plus the standard. The four
 * letters are not colour-coded and the letter is never alone in a coloured
 * badge; the grade matrix itself stays a data table.
 *
 * `inline`: the standard follows as visible text. `static` (inside a
 * `figcaption`): the standard is visually hidden but still in the name.
 * `linked`: an `a` to the grade table, described by the standard.
 */
export function EvidenceGrade({
  grade,
  variant = 'inline',
}: {
  grade: EvidenceGradeRow['grade']
  variant?: 'inline' | 'static' | 'linked'
}) {
  const standardId = useId()
  const standard = standardOf(grade)

  // Explicit spaces between the inline boxes, so the name reads "Grade A" and
  // not "GradeA" once the flex layout removes the whitespace text nodes.
  const mark = (
    <>
      Grade{' '}
      <span className="inline-flex size-[var(--ev-grade-size)] shrink-0 items-center justify-center rounded-[var(--radius-mark)] border border-rule-strong font-mono font-medium tabular-nums text-ink">
        {grade}
      </span>
    </>
  )

  if (variant === 'linked') {
    return (
      <span className="text-small inline-flex flex-wrap items-center gap-2 text-ink">
        <Link
          href={EVIDENCE_GRADE_TABLE_HREF}
          aria-describedby={standardId}
          className="link link-standalone"
        >
          {mark}
        </Link>{' '}
        <span id={standardId} className="sr-only">
          {standard}
        </span>
      </span>
    )
  }

  return (
    <span className="text-small inline-flex flex-wrap items-center gap-2 text-ink">
      {mark}{' '}
      <span className={variant === 'static' ? 'sr-only' : 'text-ink-body'}>{standard}</span>
    </span>
  )
}
