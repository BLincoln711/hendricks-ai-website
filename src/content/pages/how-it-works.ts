import type { RelatedLink } from '@/components/sections/related-links'
import type { Cta } from '@/components/ui/cta'
import { routes } from '@/config/routes'

/** Approved copy, transcribed from content/pages/08-how-it-works.md. */

export const meta = {
  title: 'The Hendricks Demand-to-Selection System | How It Works',
  description:
    'See how Hendricks maps demand, measures AI and search consideration, implements priority improvements, and connects the work to commercial outcomes.',
} as const

export const hero = {
  eyebrow: 'The Hendricks Method',
  title: 'From customer need to measurable business impact.',
  lead: ['The Demand-to-Selection System connects the complete search decision journey.'],
  journey: [
    'Demand',
    'Context',
    'Discovery',
    'Understanding',
    'Relevance',
    'Trust',
    'Consideration',
    'Recommendation',
    'Human Selection',
    'Revenue',
  ],
  closing: [
    'Different stages require different evidence.',
    'Hendricks does not collapse the entire journey into a single unexplained score.',
  ],
  primaryCta: {
    label: 'Start with a Search Intelligence Diagnostic',
    href: routes.diagnostic.path,
    analytics: { location: 'how_it_works_hero' },
  } satisfies Cta,
} as const

export const stages = {
  eyebrow: 'Six Stages',
  title: 'Each stage has one question and one named output.',
  items: [
    {
      number: 'Stage 1',
      name: 'Demand',
      question: 'What are customers trying to accomplish?',
      description:
        'Inputs can include search behavior, paid-search terms, customer questions, CRM data, market activity, sales conversations, reviews, and competitor positioning.',
      output: 'Demand Map',
      solutionHref: routes.searchDemandIntelligence.path,
    },
    {
      number: 'Stage 2',
      name: 'Context',
      question: 'Who has the need, under what conditions, and at what point in the journey?',
      description:
        'Hendricks defines the relevant customer, use case, geography, constraints, priorities, and buying stage.',
      output: 'Intent Context Library',
      solutionHref: routes.searchDemandIntelligence.path,
    },
    {
      number: 'Stage 3',
      name: 'Discovery and understanding',
      question: 'Can search and AI systems find and accurately understand the brand?',
      description:
        'Hendricks evaluates technical access, entities, services, products, expertise, locations, claims, and external profiles.',
      output: 'Brand Understanding Map',
      solutionHref: routes.searchPresenceEngineering.path,
    },
    {
      number: 'Stage 4',
      name: 'Consideration and recommendation',
      question: 'Does the brand become a legitimate option—and is it actively favored?',
      description:
        'Hendricks runs controlled context panels, classifies outcomes, maps sources, and benchmarks competitors.',
      output: 'Selection Map',
      solutionHref: routes.selectionIntelligence.path,
    },
    {
      number: 'Stage 5',
      name: 'Engineering',
      question: 'What conditions should be changed?',
      description:
        'Hendricks prioritizes technical, content, evidence, authority, paid, organic, conversion, and measurement interventions.',
      output: 'Intervention Roadmap',
      solutionHref: routes.searchPresenceEngineering.path,
    },
    {
      number: 'Stage 6',
      name: 'Impact',
      question: 'Did exposure, customer behavior, pipeline, or revenue change?',
      description: 'Hendricks combines analytics, search data, CRM outcomes, and controlled tests.',
      output: 'Impact Ledger',
      solutionHref: routes.searchImpactMeasurement.path,
    },
  ],
} as const

export const responsibilities = {
  eyebrow: 'Human and Agent Responsibilities',
  title: 'Agents assist. People remain accountable.',
  agents: {
    heading: 'Agents can assist with',
    items: [
      'Monitoring',
      'Test scheduling',
      'Data collection',
      'Classification',
      'Citation normalization',
      'Anomaly detection',
      'Research preparation',
      'Change logging',
      'Draft reporting',
    ],
  },
  humans: {
    heading: 'Humans remain responsible for',
    items: [
      'Research design',
      'Commercial prioritization',
      'Causal conclusions',
      'Editorial quality',
      'Reputation',
      'Client relationships',
      'Legal and compliance decisions',
      'Final strategic recommendations',
    ],
  },
} as const

export const operatingCycle = {
  eyebrow: 'Operating Cycle',
  title: 'The system runs as a loop, not a one-time audit.',
  steps: ['Observe', 'Diagnose', 'Prioritize', 'Implement', 'Measure', 'Learn', 'Repeat'],
} as const

export const related: readonly RelatedLink[] = [
  {
    href: routes.solutions.path,
    label: 'Solutions',
    description: 'The four solutions that deliver each stage of the system.',
  },
  {
    href: routes.diagnostic.path,
    label: 'Search Intelligence Diagnostic',
    description: 'The fixed-scope engagement that runs stages one through five.',
  },
  {
    href: routes.methodology.path,
    label: 'Methodology',
    description: 'Research standards, definitions, and evidence grading.',
  },
]

export const closing = {
  title: 'Begin with the decision your organization needs to make.',
  primaryCta: {
    label: 'Start with a Search Intelligence Diagnostic',
    href: routes.diagnostic.path,
    analytics: { location: 'how_it_works_closing' },
  } satisfies Cta,
} as const
