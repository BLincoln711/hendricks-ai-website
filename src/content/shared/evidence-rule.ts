/**
 * The evidence rule, a locked string (CANON section 2).
 *
 * "Absence is not yet a diagnosis. A single answer screen is one observation
 * under one set of conditions." The word "yet" is load-bearing: it says the
 * observation is incomplete, not that the brand is fine.
 *
 * Held here rather than on the page that first rendered it, because more than
 * one route now carries it and a locked string may exist in exactly one place.
 */
export const evidenceRule = {
  /** Not rendered as text where the station's own sentence is the answer. */
  heading: 'The evidence rule',
  claim: 'Absence is not yet a diagnosis.',
  continuation: 'A single answer screen is one observation under one set of conditions.',
} as const
