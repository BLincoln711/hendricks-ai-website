import type { RelatedEntry } from '@/components/canvas/related-list'
import { routes } from '@/config/routes'
import { researchCategories } from '@/content/research/types'

/**
 * Approved copy for the research hub, transcribed from
 * `content/pages/12-research.md`.
 *
 * Three transcription decisions are load-bearing.
 *
 * 1. THE SEPARATION LINE IS NOT RENDERED. The approved file's "Important
 *    distinction" section carries two statements. The first, that Hendricks
 *    Research supports the firm's professional methodology and category
 *    education, is visitor copy and renders below as `coverage.description`.
 *    The second names Brandon's independent publication in order to tell the
 *    builder not to import it here. That is an instruction, not page copy, and
 *    rendering it would break the rule it states: `docs/10` §2 and
 *    `docs/12` §8 confine that publication to the founder biography on /about,
 *    and `scripts/validate-content.ts` fails the build on the name appearing
 *    anywhere else in `src/`. The instruction is honoured by obeying it. No
 *    content from that publication, and no reference to it, appears in this
 *    section.
 *
 * 2. NO READING TIME. The approved card requirements allow it "only if
 *    accurately calculated". Nothing in this repository counts the words of a
 *    rendered article, so the honest reading of that condition is to omit it
 *    rather than to publish an estimate shaped like a measurement. The same
 *    line forbids fake popularity metrics, and an invented reading time is the
 *    same error in a smaller font.
 *
 * 3. THE HUB IS NOT IN PRIMARY NAVIGATION. The approved file's empty-state rule
 *    gates that on three published category foundation pages. See the note on
 *    `routes.research` in `src/config/routes.ts`.
 */

export const meta = {
  title: 'Search Intelligence Research and Methodology | Hendricks',
  description:
    'Research on search demand, AI visibility, Selection Intelligence, paid and organic acquisition, measurement, data engineering, and the changing customer decision journey.',
} as const

export const hero = {
  eyebrow: 'Hendricks Research',
  title: 'Research for the AI Search Era.',
  lead: [
    'Practical, source-supported research on how people search, how brands enter consideration, how AI-mediated discovery changes the buying journey, and how organizations can measure the commercial result.',
  ],
  /**
   * The approved primary CTA. The destination is not written here because it is
   * the newest published study, which the registry already knows. The page
   * resolves it, so adding an article never requires editing this file.
   */
  primaryCtaLabel: 'Explore the Latest Research',
  answerLabel: 'What this section is',
} as const

/**
 * The supporting-studies tier. Each study names its relation to the flagship in
 * the flagship's own words, read from `the-answer-index.ts` rather than
 * restated, so one relation sentence exists per pair of studies.
 */
export const supporting = {
  eyebrow: 'Supporting studies',
  title: 'The studies behind it.',
  lead: 'Each study names its relation to the flagship in the flagship\u2019s own words.',
  relationLabel: 'Relation to the flagship:',
  authorLabel: 'Author',
  publishedLabel: 'Published',
  updatedLabel: 'Updated',
  dataThroughLabel: 'Data through',
} as const

export const coverage = {
  eyebrow: 'Coverage',
  title: 'What this section covers.',
  description:
    'Hendricks Research supports the firm’s professional methodology and category education.',
  categoriesLabel: 'Eight categories',
  categories: researchCategories,
} as const

export const latest = {
  eyebrow: 'Published',
  title: 'The latest study.',
} as const

export const foundationsSection = {
  eyebrow: 'Foundations',
  title: 'Start with the category pages.',
  description: 'The vocabulary the studies are written in, defined on pages of their own.',
} as const

/**
 * The approved "Featured foundational pages" list.
 *
 * Two of the six are omitted rather than linked. "How to Connect AI Search
 * Visibility With Pipeline and Revenue" has no owning URL yet: `docs/17` §4
 * records the answer as an extension of an existing page rather than a route,
 * and inventing a path here would put a link in the registry that no decision
 * supports. "Why One AI Prompt Does Not Have One Universal Ranking" does have an
 * owning URL, `/why-ai-answers-change` in `docs/17` §3.2, so it is listed and
 * filtered out until that route is built.
 *
 * The seven-layers entry points at the solution page, which is where the layers
 * are rendered, and carries the route's own label rather than the approved
 * heading, because a foundation link that promises a research page and delivers
 * a solution page misdescribes its destination.
 */
export const foundations: readonly RelatedEntry[] = [
  {
    href: routes.whatIsSearchIntelligenceEngineering.path,
    label: 'What Is Search Intelligence Engineering?',
    description: 'The category, defined before anything is sold under it.',
  },
  {
    href: routes.whatIsSelectionIntelligence.path,
    label: 'What Is Selection Intelligence?',
    description: 'The measures a consideration baseline reports, defined before they are reported.',
  },
  {
    href: routes.aiSelectionProblem.path,
    label: 'The AI Selection Problem',
    description: 'Why being discovered and being chosen came apart.',
  },
  {
    href: routes.searchPresenceEngineering.path,
    label: 'Search Presence Engineering',
    description: 'The seven engineering layers, and what each one is accountable for.',
  },
  {
    // Registered in docs/17 §3.2 and not yet built. Filtered until it is.
    href: '/why-ai-answers-change',
    label: 'Why One AI Prompt Does Not Have One Universal Ranking',
    description: 'Why the same question returns different brands to different people.',
  },
]

/**
 * The publication standard every article on this hub is held to, published
 * rather than kept internal.
 *
 * `docs/06` §12 lists these as a requirement on the writer. Showing them to the
 * reader is what makes the requirement checkable: a reader who can see the list
 * can see whether the article in front of them carries all of it. The list is
 * transcribed from `content/pages/12-research.md` §"Publication standards" in
 * its own order.
 */
export const standards = {
  eyebrow: 'Publication Standards',
  title: 'What every research page carries.',
  description:
    'A study that cannot be checked is an assertion. Every substantial page in this section publishes the material a reader needs in order to check it.',
  descriptionTwoTone: {
    claim: 'A study that cannot be checked is an assertion.',
    continuation:
      'Every substantial page in this section publishes the material a reader needs in order to check it.',
  },
  items: [
    'A direct executive answer',
    'Key findings',
    'Definitions',
    'Data or primary evidence',
    'Methodology',
    'Sample and date range',
    'Assumptions',
    'Limitations',
    'Author',
    'Published date',
    'Meaningful updated date',
    'Data-through date',
    'Source list',
    'Corrections link',
    'Related solution',
    'Related research',
  ],
} as const

export const relatedSection = {
  title: 'Related',
} as const

export const related: readonly RelatedEntry[] = [
  {
    href: routes.methodology.path,
    label: 'Methodology',
    description: 'Context panels, classification, weighting, evidence grades, and the stated limits.',
  },
  {
    href: routes.selectionIntelligence.path,
    label: 'Selection Intelligence',
    description: 'What a consideration and recommendation baseline covers, produces, and reports.',
  },
  {
    href: routes.whatIsAiMediatedSearch.path,
    label: 'What Is AI-Mediated Search?',
    description: 'The surfaces this research samples, and which of them Hendricks observes.',
  },
]

export const closing = {
  eyebrow: 'Read in order',
  title: 'Read the method before the finding, and the limitations before either.',
  primaryCta: {
    label: 'Review the Demand-to-Selection methodology',
    href: routes.methodology.path,
    analytics: { location: 'research_hub_closing' },
  },
  /*
    Every built route carries a path to the Diagnostic or to Contact, and an
    e2e sweep asserts it. A research index is the page a reader arrives at with
    the question already formed, so leaving it without one would make the
    section a dead end reachable from the footer of every other page.
  */
  secondaryCta: {
    label: 'Establish a baseline through the Diagnostic',
    href: routes.diagnostic.path,
    analytics: { location: 'research_hub_closing_secondary' },
  },
} as const
