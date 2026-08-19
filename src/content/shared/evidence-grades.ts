/**
 * The four evidence grades, stated once (docs/17 §3.8).
 *
 * `/methodology` publishes the table and owns it, because how much weight a
 * conclusion can hold is Method register. `/solutions/search-impact-measurement`
 * restated grades A and B in prose, and its Grade A wording differed from the
 * table by one word: "first-party CRM or revenue evidence" against the table's
 * "first-party CRM or revenue data". One word is enough to make two published
 * standards out of one standard.
 *
 * The solutions page now sources its single Grade A clause from `gradeAEvidence`
 * below and links to the table. It does not restate B, C, or D. A page that needs
 * to name a grade imports it. No page writes the standard out a second time.
 */

export type EvidenceGradeRow = {
  grade: 'A' | 'B' | 'C' | 'D'
  /** The standard a conclusion must meet to carry this grade. */
  evidence: string
}

/** The `/methodology` table, verbatim, strongest evidence first. */
export const evidenceGradeRows = [
  { grade: 'A', evidence: 'Controlled experiment combined with first-party CRM or revenue data' },
  {
    grade: 'B',
    evidence: 'Strong first-party exposure, behavior, and commercial time-series evidence',
  },
  {
    grade: 'C',
    evidence: 'Repeated controlled context-panel observations and consistent source patterns',
  },
  { grade: 'D', evidence: 'Directional API, synthetic, or isolated observation' },
] as const satisfies readonly EvidenceGradeRow[]

/**
 * What Grade A requires, for the one clause a page outside `/methodology` is
 * allowed to carry. Read off the table rather than retyped, so the two cannot
 * drift apart again.
 */
export const gradeAEvidence = evidenceGradeRows[0].evidence
