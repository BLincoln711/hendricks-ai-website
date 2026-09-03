/**
 * The publication chrome an editorial route carries: the byline labels, the
 * change-history table and the "on this page" heading.
 *
 * Held in one place because every editorial route says the same thing, and a
 * page that spells one of these differently reads as a different kind of
 * record. Where the site has recorded no date, the field prints
 * "Not yet recorded" rather than a date nobody has approved (D-C).
 */
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
