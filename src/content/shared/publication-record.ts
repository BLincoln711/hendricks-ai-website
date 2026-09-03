/**
 * The publication chrome an editorial route carries: the byline labels, the
 * change-history table and the "on this page" heading.
 *
 * Held in one place because every editorial route says the same thing, and a
 * page that spells one of these differently reads as a different kind of
 * record. Where the site has recorded no date, the field prints
 * "Not yet recorded" rather than a date nobody has approved (D-C).
 */
/**
 * What a change-history row records (17 RC-10, RC-19).
 *
 * The union is closed on purpose. "Corrected", "updated" and "rescoped" are
 * three different admissions, and a free-string kind lets a page describe a
 * withdrawn figure as an update. `publication` is reserved for the first row.
 */
export type ChangeKind = 'publication' | 'correction' | 'update' | 'scope'

export type ChangeEntry = {
  /** ISO date. Ascending; the last entry is what the updated date reads. */
  date: string
  kind: ChangeKind
  /** One sentence, transcribed from the page's own corrections prose. */
  summary: string
}

/** The visible label per kind. The stored value stays machine-readable. */
export const changeKindLabels: Record<ChangeKind, string> = {
  publication: 'Publication',
  correction: 'Correction',
  update: 'Update',
  scope: 'Scope',
}

export const publicationChrome = {
  changeHistory: {
    eyebrow: 'Change History',
    title: 'Change history',
    caption: 'Change history of this page',
    columns: { date: 'Date', kind: 'Kind', summary: 'Summary' },
    firstPublication: {
      kind: 'Publication',
      summary: 'First publication of this page.',
    },
    correctionsLabel: 'Read the corrections policy',
  },
  relatedTerms: {
    eyebrow: 'Related Terms',
    title: 'Related terms',
    kind: 'Definition',
  },
  cite: {
    eyebrow: 'Cite This Study',
    label: 'Cite this study',
    dataDoi: 'Data DOI',
    latestVersion: 'Latest version',
  },
  record: {
    eyebrow: 'Publication Record',
    title: 'Publication record',
    labels: {
      author: 'Author',
      studyType: 'Study type',
      claimClass: 'Claim class',
      category: 'Category',
      published: 'Published',
      updated: 'Last updated',
      dataThrough: 'Data through',
      relatedSolution: 'Related solution',
      corrections: 'Corrections',
    },
  },
  sources: {
    eyebrow: 'Sources',
    title: 'Sources',
    reviewedLabel: 'Last reviewed',
    appliedInLead: 'This definition is applied in',
    /* A measurement is not a definition, and a page that reports one should not
       say it defines anything. */
    measurementAppliedInLead: 'This measurement is applied in',
  },
} as const

/*
 * The updated date is derived, never typed.
 *
 * A study used to carry `byline.updated` as a hand-written string beside its
 * change history, so the two could disagree: a correction could be logged and
 * the date left stale, or the date moved with no entry explaining what changed.
 * `17` RC-19 and `12` RT-19 settle it by making the change history the only
 * record and the date a reading of it. The entries are ascending, so the last
 * one is the reading, and a study cannot compile without at least one entry.
 */
export function latestChangeDate(entries: readonly [ChangeEntry, ...ChangeEntry[]]): string {
  return entries[entries.length - 1]!.date
}
