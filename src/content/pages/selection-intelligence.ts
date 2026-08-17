import type { RelatedLink } from '@/components/sections/related-links'
import type { Cta } from '@/components/ui/cta'
import type { ContextPanel } from '@/components/visuals/context-panel-diagram'
import type { MetricDefinition } from '@/components/visuals/metric-definitions'
import { routes } from '@/config/routes'

/**
 * Approved copy, transcribed from content/pages/04-selection-intelligence.md.
 *
 * The markdown's "FAQ topics" list is not rendered — questions without approved
 * answers. Tracked in CONTENT_VERIFICATION.md as Q2.
 */

export const meta = {
  title: 'Selection Intelligence for AI and Search Visibility | Hendricks',
  description:
    'Measure when your brand is absent, referenced, considered, or recommended across AI-mediated and traditional search, and understand the evidence associated with competitor wins.',
} as const

export const hero = {
  eyebrow: 'Selection Intelligence',
  title: 'Know when your brand enters the shortlist, and when it disappears.',
  lead: [
    'Selection Intelligence is the evidence-based analysis of whether, where, and under what customer contexts a brand is discovered, understood, considered, and recommended across search and AI-mediated buying journeys.',
  ],
  movesBeyond: 'Were we mentioned?',
  andAnswers: 'Did we become a legitimate option for a commercially valuable need?',
  primaryCta: {
    label: 'Establish Your Selection Baseline',
    href: routes.diagnostic.path,
    analytics: { location: 'si_hero', solutionName: 'Selection Intelligence' },
  } satisfies Cta,
} as const

export const firstStage = {
  eyebrow: 'Beyond Visibility',
  title: 'Visibility is only the first stage.',
  lead: 'A brand can be:',
  states: [
    'Mentioned but represented inaccurately',
    'Cited but not recommended',
    'Recommended only for a low-value use case',
    'Strong for one customer cohort and absent for another',
    'Visible on one platform and unstable everywhere else',
    'Favored in a neutral test but removed after the customer adds important constraints',
  ],
  closing: 'Selection Intelligence measures those differences.',
} as const

export const contextPanel = {
  eyebrow: 'Context Panel',
  title: 'Four controlled conditions, each answering a different question.',
  panels: [
    {
      name: 'Neutral baseline',
      description:
        'Controlled tests without meaningful customer history or supplied personalization.',
      question: 'What happens under standardized conditions?',
    },
    {
      name: 'Cohort context',
      description:
        'Tests that explicitly include relevant characteristics such as company size, use case, geography, budget, priorities, and constraints.',
      question: 'Which customer profiles cause the brand to enter or leave consideration?',
    },
    {
      name: 'Journey context',
      description: 'Multi-step research and comparison journeys that become more specific over time.',
      question: 'Does the brand survive as the customer moves from exploration to a shortlist?',
    },
    {
      name: 'Time and platform panel',
      description:
        'Repeated tests across relevant search and AI experiences, dates, models, and locations.',
      question: 'How stable is the observed outcome?',
    },
  ] satisfies readonly ContextPanel[],
} as const

export const measures = {
  eyebrow: 'What Hendricks Measures',
  title: 'Eight observations, not one unexplained score.',
  items: [
    { name: 'Observed visibility', description: 'Did the brand appear?' },
    {
      name: 'Brand understanding',
      description:
        'Was the company, product, service, location, or expertise represented accurately?',
    },
    {
      name: 'Relevance',
      description: 'Was the brand connected to the customer’s specific need?',
    },
    { name: 'Consideration', description: 'Was the brand treated as a legitimate candidate?' },
    {
      name: 'Recommendation',
      description:
        'Was the brand explicitly favored, shortlisted, or presented as a preferred option?',
    },
    {
      name: 'Citation and source patterns',
      description:
        'Which domains, pages, reviews, databases, publications, and owned properties appeared with the result?',
    },
    {
      name: 'Competitor performance',
      description: 'Which competitors won, under which contexts, and with what recurring evidence?',
    },
    {
      name: 'Selection Stability',
      description:
        'How consistently did the outcome survive reasonable changes in wording, context, platform, location, and time?',
    },
  ],
} as const

export const deliverables = {
  title: 'What a Selection Intelligence baseline produces.',
  items: [
    'Selection Map',
    'Observed Consideration Rate',
    'Observed Recommendation Rate',
    'Selection Stability analysis',
    'Competitor Selection Matrix',
    'Source and Evidence Graph',
    'Brand accuracy report',
    'Topic and service association map',
    'Commercial Selection Gap',
    'Prioritized hypotheses for intervention',
    'Baseline dataset for future experiments',
  ],
} as const

export const metrics = {
  eyebrow: 'Metric Definitions',
  title: 'Every Hendricks measure is defined before it is reported.',
  items: [
    {
      name: 'Observed Consideration Rate',
      definition:
        'The commercially weighted percentage of defined test contexts in which the brand is presented as a legitimate option.',
    },
    {
      name: 'Observed Recommendation Rate',
      definition:
        'The commercially weighted percentage of defined test contexts in which the brand is explicitly favored or recommended.',
    },
    {
      name: 'Selection Stability',
      definition:
        'The consistency of consideration or recommendation across reasonable variations in context, wording, platform, location, and time.',
    },
    {
      name: 'Commercial Selection Gap',
      definition:
        'The value-weighted difference between the client’s observed position and the relevant benchmark.',
    },
  ] satisfies readonly MetricDefinition[],
} as const

export const limitation = {
  title: 'Hendricks does not claim to inspect hidden model reasoning.',
  body: [
    'We do not assign invented weights to backlinks, schema, reviews, or individual sources.',
  ],
  observeLead: 'We observe:',
  chain: [
    'Inputs',
    'Outputs',
    'Citations',
    'Sources',
    'Interventions',
    'Changes',
    'Business Outcomes',
  ],
  closing:
    'Then we identify patterns, test hypotheses, and state the evidence level behind each conclusion.',
} as const

export const related: readonly RelatedLink[] = [
  {
    href: routes.searchPresenceEngineering.path,
    label: 'Search Presence Engineering',
    description: 'Turn the gaps a baseline reveals into prioritized implementation.',
  },
  {
    href: routes.searchDemandIntelligence.path,
    label: 'Search Demand Intelligence',
    description: 'Define which customer decisions the baseline should measure.',
  },
  {
    href: routes.methodology.path,
    label: 'Methodology',
    description: 'Read how contexts are designed, classified, and graded.',
  },
  {
    href: routes.whatIsSelectionIntelligence.path,
    label: 'What Is Selection Intelligence?',
    description: 'The full definition, including what the term does not mean.',
  },
  {
    href: routes.aiSelectionProblem.path,
    label: 'The AI Selection Problem',
    description: 'Why being seen no longer means being chosen.',
  },
]

export const closing = {
  title: 'Find the part of the consideration set your current reporting cannot see.',
  primaryCta: {
    label: 'Request a Selection Intelligence Baseline',
    href: routes.diagnostic.path,
    analytics: { location: 'si_closing', solutionName: 'Selection Intelligence' },
  } satisfies Cta,
} as const
