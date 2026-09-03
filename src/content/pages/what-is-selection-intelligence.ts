import type { RelatedEntry } from '@/components/canvas/related-list'
import type { Cta } from '@/components/ui/cta'
import { routes } from '@/config/routes'
import { metricDefinitions } from '@/content/shared/metrics'

/**
 * Approved copy, transcribed from content/pages/14-what-is-selection-intelligence.md.
 *
 * The markdown contrasts Selection Intelligence with AI rank tracking by quoting
 * the question each one asks. Both are rendered as blockquotes, which is the one
 * place on the site where that element is correct: they are attributed positions,
 * not the page's own voice.
 */

export const meta = {
  title: 'What Is Selection Intelligence? | Hendricks',
  description:
    'Selection Intelligence measures whether, where, and under what customer contexts a brand enters consideration, earns recommendation, and influences choice across search.',
} as const

export const hero = {
  eyebrow: 'Definition',
  title: 'What Is Selection Intelligence?',
  lead: [
    'The same literal prompt may not represent the same effective need. Selection Intelligence measures the decision, across the customer contexts that carry commercial value.',
  ],
  primaryCta: {
    label: 'Establish a baseline through the Diagnostic',
    href: routes.diagnostic.path,
    analytics: { location: 'wisi_hero' },
  } satisfies Cta,
} as const

export const directAnswer = {
  term: 'Selection Intelligence',
  answer:
    'Selection Intelligence is the evidence-based analysis of whether, where, and under what customer contexts a brand enters consideration, earns recommendation, and influences choice across AI-mediated and traditional search.',
} as const

export const questions = {
  eyebrow: 'Questions It Answers',
  title: 'Ten questions a baseline is built to answer.',
  items: [
    'Was the brand discoverable?',
    'Was it understood accurately?',
    'Was it relevant to the customer’s specific need?',
    'Did it enter the consideration set?',
    'Was it recommended?',
    'Which competitors were favored?',
    'Which sources and evidence appeared?',
    'How stable was the outcome?',
    'What should be tested or changed?',
    'Did any downstream business behavior change?',
  ],
} as const

export const versusRankTracking = {
  eyebrow: 'Selection Intelligence Versus AI Rank Tracking',
  title: 'The two disciplines ask different questions.',
  rankTracking: {
    label: 'AI rank tracking asks:',
    question: 'Where did the brand appear for this prompt?',
  },
  selectionIntelligence: {
    label: 'Selection Intelligence asks:',
    question:
      'Across commercially important customer contexts, under what conditions does the brand enter consideration, and what observable evidence separates winning and losing outcomes?',
  },
} as const

export const whyContext = {
  eyebrow: 'Why Context Matters',
  title: 'The same literal prompt may not represent the same effective need.',
  lead: 'Customer profile, constraints, location, prior conversation, platform, wording, and time can change the research path and result.',
  testsLead: 'Hendricks therefore tests:',
  tests: [
    'Neutral baselines',
    'Customer cohorts',
    'Multi-turn journeys',
    'Platforms',
    'Locations',
    'Repeated runs',
    'Time periods',
  ],
  closing:
    'The output is an observed distribution and stability analysis, not one universal ranking.',
} as const

/**
 * This page is the canonical location for the five metric definitions
 * (docs/17 §3.7), because a defined term belongs on the page that defines the
 * term. The strings themselves live in src/content/shared/metrics.ts so that
 * /solutions/selection-intelligence renders the same wording instead of a second
 * definition of the same measure, which docs/12 §6 forbids.
 *
 * Three of the five definitions changed wording when they moved. The solutions
 * page stated the unit, a percentage of defined test contexts, where this page
 * stated a frequency adverb. A rate a reader cannot audit is not a rate, so the
 * unit wording won.
 */
export const metrics = {
  eyebrow: 'Metrics',
  title: 'Five measures, each defined before it is reported.',
  items: metricDefinitions,
} as const

export const limitation = {
  label: 'Honest limitation',
  title: 'Selection Intelligence does not reveal a model’s private reasoning.',
  body: [
    'It analyzes controlled inputs, observable outputs, citations, sources, brand associations, interventions, and downstream outcomes.',
  ],
} as const

export const sources = {
  reviewed: '2026-08-16',
  basis:
    'This definition is maintained by Hendricks and states the firm’s own position rather than reporting third-party research.',
  appliedIn: [
    { label: 'the Selection Intelligence solution', href: routes.selectionIntelligence.path },
    { label: 'the measurement methodology', href: routes.methodology.path },
  ],
} as const

/** The page's own outline, in the order the stations render. */
export const contents = [
  { id: 'questions', label: 'The questions it answers' },
  { id: 'versus-rank-tracking', label: 'Against rank tracking' },
  { id: 'why-context', label: 'Why context decides' },
  { id: 'metric-definitions', label: 'Metric definitions' },
  { id: 'limitation', label: 'The honest limitation' },
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
    href: routes.selectionIntelligence.path,
    label: 'Explore the Selection Intelligence solution',
    description: 'What a baseline measures, produces, and costs in scope.',
  },
  {
    href: routes.methodology.path,
    label: 'Read the measurement methodology',
    description: 'Context panels, outcome classification, weighting, and evidence grades.',
  },
  {
    href: routes.whatIsSearchIntelligenceEngineering.path,
    label: 'What Is Search Intelligence Engineering?',
    description: 'The wider discipline this measurement layer belongs to.',
  },
  {
    href: routes.aiSelectionProblem.path,
    label: 'The AI Selection Problem',
    description: 'Why visibility stopped being a sufficient measure.',
  },
  /*
    Second inbound link required by docs/17 §5 artifact 5 for
    /ai-visibility-tool-or-partner. It is reciprocal: that page links here twice,
    once for the four-part model it does not restate and once for the Selection
    Intelligence versus AI rank tracking contrast this page owns in
    `versusRankTracking`.
  */
  {
    href: routes.aiVisibilityToolOrPartner.path,
    label: 'Do You Need an AI Visibility Tool or a Partner?',
    description: 'What a monitoring tool produces, and the three jobs it leaves to people.',
  },
]

export const closing = {
  title: 'Establish a baseline before making claims.',
  primaryCta: {
    label: 'Establish a baseline through the Diagnostic',
    href: routes.diagnostic.path,
    analytics: { location: 'wisi_closing' },
  } satisfies Cta,
} as const
