import type { RelatedLink } from '@/components/sections/related-links'
import type { Cta } from '@/components/ui/cta'
import type { MetricDefinition } from '@/components/visuals/metric-definitions'
import { routes } from '@/config/routes'

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

export const metrics = {
  eyebrow: 'Metrics',
  title: 'Five measures, each defined before it is reported.',
  items: [
    {
      name: 'Observed Consideration Rate',
      definition:
        'How frequently the brand is presented as a legitimate candidate across defined, commercially weighted contexts.',
    },
    {
      name: 'Observed Recommendation Rate',
      definition: 'How frequently the brand is explicitly favored or shortlisted.',
    },
    {
      name: 'Selection Stability',
      definition: 'How consistently the result survives reasonable context changes.',
    },
    {
      name: 'Evidence Coverage',
      definition:
        'How much clear, current, and corroborated evidence exists for claims needed to win priority decisions.',
    },
    {
      name: 'Commercial Selection Gap',
      definition:
        'The value-weighted difference between the client’s observed position and the relevant benchmark.',
    },
  ] satisfies readonly MetricDefinition[],
} as const

export const limitation = {
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

export const related: readonly RelatedLink[] = [
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
]

export const closing = {
  title: 'Establish a baseline before making claims.',
  primaryCta: {
    label: 'Establish a baseline through the Diagnostic',
    href: routes.diagnostic.path,
    analytics: { location: 'wisi_closing' },
  } satisfies Cta,
} as const
