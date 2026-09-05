import type { RelatedEntry } from '@/components/canvas/related-list'
import type { Cta } from '@/components/ui/cta'
import { routes } from '@/config/routes'

/**
 * Approved copy, transcribed from content/pages/15-ai-selection-problem.md.
 *
 * The H1 is the site's core problem statement, which also appears on the homepage.
 * That repetition is deliberate: this page is the canonical explanation of it, and
 * docs/03 §6 routes the homepage problem section here.
 */

export const meta = {
  title: 'The AI Selection Problem: From Discovery to Customer Choice | Hendricks',
  description:
    'Brands are losing control over the path between being discovered and being chosen as AI systems interpret needs, compare options, and shape customer shortlists.',
} as const

export const hero = {
  eyebrow: 'The AI Selection Problem',
  title: 'Brands are losing control over the path between being discovered and being chosen.',
  lead: [
    'Traditional search largely helped customers find pages.',
    'AI-mediated search can perform more of the interpretation, research, comparison, and evaluation before the customer reaches a website.',
  ],
  primaryCta: {
    label: 'Start with a Search Intelligence Diagnostic',
    href: routes.diagnostic.path,
    analytics: { location: 'asp_hero' },
  } satisfies Cta,
} as const

export const termDefinition = {
  term: 'The AI Selection Problem',
  answer:
    'The AI Selection Problem is the loss of control over the path between being discovered and being chosen.',
} as const

export const journeys = {
  eyebrow: 'Journey Comparison',
  title: 'The shape of the journey changed.',
  traditional: {
    label: 'Traditional',
    steps: ['Query', 'Search Results', 'Website', 'Conversion'],
  },
  aiMediated: {
    label: 'AI-mediated',
    steps: [
      'Need',
      'Intent Interpretation',
      'Research',
      'Evaluation',
      'Synthesis',
      'Shortlist',
      'Choice',
    ],
  },
} as const

export const consequence = {
  eyebrow: 'The Business Consequence',
  title: 'A company can have:',
  assets: [
    'A polished website',
    'Strong technical SEO',
    'Thousands of links',
    'Excellent reviews',
    'Paid visibility',
    'Recognized expertise',
    'A respected brand',
  ],
  closing: [
    'And still be absent from the options presented during an AI-assisted buying decision.',
    'The brand may lose before a website visit ever occurs.',
  ],
} as const

export const notEnough = {
  eyebrow: 'Visibility Is Not Enough',
  title: 'Each stage has to be earned separately.',
  ladder: [
    'Being seen does not guarantee being understood.',
    'Being understood does not guarantee relevance.',
    'Being relevant does not guarantee trust.',
    'Being trusted does not guarantee consideration.',
    'Being considered does not guarantee recommendation.',
    'Being recommended does not guarantee human selection.',
  ],
  pathLead: 'The actual path is:',
  path: [
    'Discoverable',
    'Understood',
    'Relevant',
    'Trusted',
    'Cited',
    'Considered',
    'Recommended',
    'Selected',
    'Revenue',
  ],
} as const

/**
 * The displacement question, and the one section on this page that observes the
 * phenomenon the rest of the page asserts.
 *
 * WHY IT IS HERE AND NOT ON /what-is-ai-mediated-search. That page now owns the
 * absence diagnosis in full: whether the answer cited anybody, and the four
 * states ruled out in order. This is the other reading of the same screen and a
 * different buyer question. Absence asks whether the brand was there.
 * Displacement asks what it means that a competitor was. docs/17 3.1 puts the
 * second in Problem register, and this page is the Problem-register owner of the
 * selection gap under docs/17 4.1. Nothing here re-enumerates those four states.
 * The section names the page that separates them and stops, which is docs/17
 * rule one in operation.
 *
 * WHY IT IS HERE AT ALL. docs/17 6.1 records this page as asserting the
 * phenomenon and never observing it, and wants one dated instance rather than
 * more prose. Wave 2.3 gated that on E1 or E3, and E3 published on 2026-08-19.
 * The `related` card added in the same change carries the pointer; this carries
 * the instance, which is the half the card comment says a related list cannot
 * make on its own.
 *
 * THE FIGURES ARE QUOTED, NEVER RECOMPUTED. The distribution figures are
 * published at /research/hendricks-selection-baseline and appear here in the
 * form that page publishes them. They are the only figures in this section, and
 * they are chosen because no other page uses them. The per-engine counts and the
 * populated-cell counts from the same run are already published on
 * /what-is-ai-mediated-search, and repeating them here would be the duplication
 * rule one exists to prevent. Two figures are deliberately absent: nothing here
 * reports run-to-run churn, because that run repeated no cell within a date and
 * therefore measured none, and nothing here reports an error rate, because one
 * checkable error across two runs is not a rate.
 *
 * THE RUN DATE IS IN THE SENTENCE ON PURPOSE. Both published runs carry
 * similar-looking distinct-domain and slot figures, so a distribution sentence
 * with no date in it leaves a reader unable to tell which run is being quoted.
 * Do not remove the date to tighten the line. The figures themselves were
 * replaced on 2026-08-19 when the study repointed at run 2026-08-19-110930; the
 * earlier ones came from a run whose result file a scheduled job overwrote in
 * place. Quote whatever that study publishes and never restore a number from
 * this file's history.
 *
 * The variance mechanism is not explained here. docs/17 4.3 assigns it to
 * /why-ai-answers-change, which is not built. This section states the
 * consequence for the reader, that one screen is one observation, and stops.
 * When that route ships it takes an inbound link from here and this copy
 * shortens rather than grows.
 *
 * The closing refuses the outcome rather than selling it. No firm controls
 * whether an AI system recommends a brand, which docs/17 3.2 assigns to
 * /solutions/search-presence-engineering. It is stated here in one line and in
 * different words, in Problem register, exactly as /diagnostic states it in its
 * not-designed-for list. Do not argue it here and do not add the seven layers.
 */
export const competitorRecommendation = {
  eyebrow: 'One Observation, Not A Ranking',
  title: 'Why does ChatGPT recommend a competitor instead of your brand?',
  lead: 'A competitor recommendation is one observation, not a ranking. It records that a competitor was named once, on one surface, on one date, under one set of conditions. Nothing in a single answer screen establishes that the same competitor is named on the next run, or that a shortlist formed and the brand lost a place on it.',
  body: [
    'Hendricks published a dated run of this measurement against its own brand. In run 2026-08-19-110930, 247 distinct domains filled 308 citation slots across the answers that cited anything, and 212 of those domains were cited exactly once.',
    'A citation set distributed that way is not a standings table with a competitor placed above a brand in it. It is a wide, shallow spread in which most sources appear once and then do not appear again. That is what a reader is looking at when a competitor is named in an answer and their own brand is not.',
  ],
  limitation: {
    label: 'Honest limitation',
    title: 'What that run does not establish.',
    body: [
      'The 2026-08-19 run covered 17 buyer questions on one date and measured 47 of its 51 cells, with nothing changed between it and the run before it and nothing held back for comparison. It records how the sources in those answers were distributed. It establishes nothing about why any source was chosen, nothing about any other brand’s category, and nothing about what a change to a website would do to a later answer.',
    ],
  },
  closing: [
    'Separating the causes behind a competitor recommendation is a different job. The What Is AI-Mediated Search page separates them in order, cheapest first. What comes before that job is the reading itself: an answer screen is one observation, and an observation is worth what its sampling is worth.',
    'No firm controls whether an AI system recommends a brand, and Hendricks does not sell that outcome. What can be established is whether a brand enters consideration, under which customer contexts, on which observed surfaces, and on which dates. A brand that has seen a competitor recommended once knows that it happened once. The What Is Selection Intelligence page states what a baseline reports instead, and why it is reported that way.',
  ],
  cta: {
    label: 'See who gets cited in AI answers',
    href: routes.researchWhoGetsCitedInAiAnswers.path,
    analytics: { location: 'asp_competitor_recommendation' },
  } satisfies Cta,
} as const

export const intelligenceGap = {
  eyebrow: 'The Intelligence Gap',
  title: 'Most businesses cannot answer:',
  questions: [
    'Was our brand considered?',
    'Was it mentioned or actually recommended?',
    'Which sources influenced the visible answer?',
    'What does the system appear to understand about us?',
    'Which competitors entered the shortlist?',
    'Under which customer contexts do we win or lose?',
    'Which claims have corroborating evidence?',
    'Where is information incomplete or contradictory?',
    'What should we change first?',
    'Did visibility affect customer behavior or pipeline?',
  ],
} as const

export const response = {
  eyebrow: 'The Hendricks Response',
  title: 'Four moves, in order.',
  items: [
    {
      number: '01',
      name: 'Measure demand',
      description: 'Determine which needs and decisions matter.',
    },
    {
      number: '02',
      name: 'Understand selection',
      description: 'Observe whether the brand enters commercially relevant consideration.',
    },
    {
      number: '03',
      name: 'Engineer the presence',
      description: 'Improve the conditions the business can control.',
    },
    {
      number: '04',
      name: 'Prove impact',
      description: 'Measure what changes and state the evidence honestly.',
    },
  ],
} as const

export const sources = {
  /*
    Re-dated from 2026-08-16 because the page now publishes figures. docs/06 15
    requires the visible review date to move when material changes, and
    tests/unit/sitemap.test.ts reads this same constant, so the sitemap entry and
    the visible <time> cannot disagree.
  */
  reviewed: '2026-08-19',
  basis:
    'This page states the Hendricks position on how AI-mediated search changes buying journeys. The figures it quotes come from a dated first-party Hendricks run, published in full with its denominators and its limits on the Hendricks Selection Baseline. No third-party research, vendor study, or external finding is claimed.',
  appliedIn: [
    { label: 'Selection Intelligence', href: routes.selectionIntelligence.path },
    { label: 'the Diagnostic', href: routes.diagnostic.path },
  ],
} as const

/**
 * `content/pages/15-ai-selection-problem.md` records no related destinations, so
 * this list is an internal-linking decision under docs/03 §6 rather than approved
 * copy.
 *
 * The AI-mediated search definition leads it deliberately. This page asserts in
 * its own hero that AI-mediated search performs more of the interpretation,
 * research, comparison, and evaluation before the customer reaches a website,
 * then spends every section after that on the consequences without once defining
 * the mechanism or naming a surface it happens on. That definition now exists,
 * and a reader who does not already accept the premise should reach it first.
 *
 * Its description carries the docs/17 §3.2 cede of "rank well and still lose the
 * shortlist" as far as this file can. The owning page states that claim beside a
 * named surface; the `consequence` section here states it without one. The claim
 * itself stays, because it is this page's H1 payload and its Problem-register
 * argument, and because `consequence.closing` is a `readonly string[]` rendered
 * as bare paragraphs with no link affordance. Routing the claim through this
 * description is the only half of the cede that lands without editing
 * `src/app/(editorial)/ai-selection-problem/page.tsx`.
 *
 * THE RESEARCH LINK, AND WHY IT SITS HERE.
 *
 * This page asserts that a brand can be absent from the options presented during
 * an AI-assisted buying decision, and until now it evidenced that with nothing.
 * docs/17 §5.4 records the page as wanting one dated observation rather than more
 * prose, and wave 2.3 gates that on E1 or E3. E3 published on 2026-08-19 as
 * `/research/hendricks-selection-baseline`. The comment on `research` in
 * `src/config/routes.ts` names the other half of the same defect: the study was
 * reachable from the footer and from `/corrections` and from no page whose
 * argument it evidences. One card carries both ends of that.
 *
 * It sits second rather than first on purpose. The AI-mediated search definition
 * still leads, for the reason stated above. A reader who does not accept the
 * premise should meet the mechanism before the measurement.
 *
 * The description quotes the study's published figures and derives nothing from
 * them. Per that page's own decision 4 the two runs used different query sets and
 * carry no cause, so nothing here may read them as a trend, as proof that a
 * tactic works, or as a statement about brands in general. This card is a
 * pointer with a number on it, and the deepening docs/17 wave 2.3 describes is a
 * separate change to the page body that this file cannot make on its own.
 */
/** The page's own outline, in the order the stations render. */
export const contents = [
  { id: 'journeys', label: 'Journey comparison' },
  { id: 'consequence', label: 'The business consequence' },
  { id: 'not-enough', label: 'Visibility is not enough' },
  { id: 'competitor', label: 'One observation, not a ranking' },
  { id: 'intelligence-gap', label: 'The intelligence gap' },
  { id: 'response', label: 'The Hendricks response' },
  { id: 'sources', label: 'Sources' },
  { id: 'change-history', label: 'Change history' },
  { id: 'related-terms', label: 'Related terms' },
  { id: 'related', label: 'Where to go next' },
] as const

export const relatedSection = {
  eyebrow: 'Where To Go Next',
  title: 'Where to go next.',
} as const

export const related: readonly RelatedEntry[] = [
  {
    href: routes.whatIsAiMediatedSearch.path,
    label: 'What Is AI-Mediated Search?',
    description:
      'Why a brand can rank #1 on Google and still not appear in AI answers, and the surfaces where that happens.',
  },
  {
    href: routes.researchHendricksSelectionBaseline.path,
    label: 'Hendricks Selection Baseline',
    description:
      'Hendricks pointed the measurement at its own brand and published the result: across 17 buyer questions and 51 answer cells on 2026-08-19, hendricks.ai was cited zero times.',
  },
  {
    href: routes.whatIsSelectionIntelligence.path,
    label: 'What Is Selection Intelligence?',
    description: 'The measurement discipline built for this problem.',
  },
  {
    href: routes.selectionIntelligence.path,
    label: 'Selection Intelligence',
    description: 'How a baseline is designed, measured, and reported.',
  },
  {
    href: routes.whatIsSearchIntelligenceEngineering.path,
    label: 'What Is Search Intelligence Engineering?',
    description: 'The system that connects demand, selection, presence, and impact.',
  },
  {
    href: routes.methodology.path,
    label: 'Methodology',
    description: 'How the contexts behind these questions are defined and measured.',
  },
  {
    href: routes.forBrands.path,
    label: 'For Brands',
    description: 'What changes for an in-house team addressing this.',
  },
]

export const closing = {
  title: 'Find where your brand is losing the shortlist.',
  primaryCta: {
    label: 'Start with a Search Intelligence Diagnostic',
    href: routes.diagnostic.path,
    analytics: { location: 'asp_closing' },
  } satisfies Cta,
} as const
