import type { RelatedLink } from '@/components/sections/related-links'
import type { Cta } from '@/components/ui/cta'
import type { MeasurementLevel } from '@/components/visuals/impact-measurement-stack'
import { routes } from '@/config/routes'

/**
 * Approved copy, transcribed from content/pages/06-search-impact-measurement.md.
 *
 * The markdown's "FAQ topics" list is not rendered — questions without approved
 * answers. Tracked in CONTENT_VERIFICATION.md as Q3.
 */

export const meta = {
  title: 'AI Search, SEO, and Revenue Impact Measurement | Hendricks',
  description:
    'Connect search and AI visibility with branded demand, referrals, customer behavior, CRM opportunities, pipeline, revenue, and controlled evidence.',
} as const

export const hero = {
  eyebrow: 'Search Impact Measurement',
  title: 'Prove what changed, and how much confidence the business should place in it.',
  lead: [
    'A higher AI mention rate is not automatically a business result.',
    'A citation is not revenue.',
    'A branded search increase is not always caused by one campaign.',
    'Hendricks builds an evidence system that connects market exposure, customer behavior, commercial outcomes, and controlled tests without pretending attribution is perfect.',
  ],
  primaryCta: {
    label: 'Review Your Measurement System',
    href: routes.diagnostic.path,
    analytics: { location: 'sim_hero', solutionName: 'Search Impact Measurement' },
  } satisfies Cta,
} as const

export const levels = {
  eyebrow: 'Four Levels of Measurement',
  title: 'Each level answers a different question and carries different weight.',
  items: [
    {
      number: '01',
      name: 'Exposure',
      question: 'What changed in the information environment?',
      signals: [
        'Search impressions',
        'Generative-AI visibility where measurable',
        'Citations',
        'Cited URLs',
        'Consideration',
        'Recommendation',
        'Rankings',
        'SERP coverage',
        'Brand mentions',
      ],
    },
    {
      number: '02',
      name: 'Behavior',
      question: 'What changed in customer behavior?',
      signals: [
        'AI-assistant referrals',
        'Organic visits',
        'Branded search',
        'Direct visits',
        'Returning users',
        'Decision-content engagement',
        'Comparison-page use',
        'Form starts',
        'Appointment activity',
      ],
    },
    {
      number: '03',
      name: 'Commercial outcomes',
      question: 'What changed in the business?',
      signals: [
        'Qualified leads',
        'Appointments',
        'Sales-accepted opportunities',
        'Pipeline',
        'Win rate',
        'Closed revenue',
        'Customer quality',
        'Partner-sourced revenue',
      ],
    },
    {
      number: '04',
      name: 'Causal evidence',
      question: 'What evidence suggests the intervention contributed to the change?',
      signals: [
        'Baseline comparisons',
        'Staggered rollouts',
        'Matched demand clusters',
        'Geographic comparisons',
        'Segment holdouts',
        'Landing-page experiments',
        'Paid-search validation',
        'Interrupted time-series analysis',
      ],
    },
  ] satisfies readonly MeasurementLevel[],
} as const

export const evidenceGrades = {
  eyebrow: 'Evidence Grades',
  title: 'Every executive conclusion states its evidence grade.',
  caption: 'Hendricks evidence grades and the standard each one requires.',
  rows: [
    {
      grade: 'A',
      standard: 'Controlled experiment combined with first-party CRM or revenue evidence',
    },
    {
      grade: 'B',
      standard: 'Strong first-party exposure, behavioral, and commercial time-series evidence',
    },
    {
      grade: 'C',
      standard: 'Repeated controlled context observations and consistent source patterns',
    },
    { grade: 'D', standard: 'Directional synthetic, API, or isolated observation' },
  ],
} as const

export const deliverables = {
  title: 'What Search Impact Measurement produces.',
  items: [
    'Measurement-readiness audit',
    'Event and conversion taxonomy',
    'Search and AI channel rules',
    'Search Console and analytics integration',
    'CRM and pipeline mapping',
    'BigQuery or equivalent data model',
    'Branded-demand tracking',
    'AI-referral analysis',
    'Impact dashboard',
    'Experiment plan',
    'Evidence-graded executive brief',
    'Impact Ledger',
  ],
} as const

export const impactContract = {
  eyebrow: 'Impact Contract',
  title: 'What gets agreed before any work begins.',
  lead: 'At the start of an engagement, Hendricks and the client agree on:',
  items: [
    'Primary commercial outcome',
    'Leading indicators',
    'Baseline period',
    'Target customer or segment',
    'Data sources',
    'Known limitations',
    'Planned interventions',
    'Available controls or comparisons',
  ],
} as const

export const limitation = {
  title: 'What Hendricks does not promise.',
  body: [
    'We do not promise that every AI interaction can be traced to an individual buyer.',
    'We do not classify every direct visit as AI influenced.',
    'We do not claim causation from a simple before-and-after chart.',
  ],
  closing:
    'We combine direct measurement, leading indicators, customer-source information, commercial data, and controlled tests to create a more defensible body of evidence.',
} as const

export const related: readonly RelatedLink[] = [
  {
    href: routes.searchPresenceEngineering.path,
    label: 'Search Presence Engineering',
    description: 'The interventions this measurement system is designed to evaluate.',
  },
  {
    href: routes.selectionIntelligence.path,
    label: 'Selection Intelligence',
    description: 'The exposure baseline that impact measurement builds on.',
  },
  {
    href: routes.methodology.path,
    label: 'Methodology',
    description: 'How evidence grades are assigned and what each one permits.',
  },
  {
    href: routes.howItWorks.path,
    label: 'How It Works',
    description: 'Where measurement closes the Demand-to-Selection loop.',
  },
  {
    href: routes.whatIsSelectionIntelligence.path,
    label: 'What Is Selection Intelligence?',
    description: 'Definitions for the observed rates this solution reports against revenue.',
  },
]

export const closing = {
  title: 'Make the work accountable to a business outcome.',
  primaryCta: {
    label: 'Build Your Search Impact Baseline',
    href: routes.diagnostic.path,
    analytics: { location: 'sim_closing', solutionName: 'Search Impact Measurement' },
  } satisfies Cta,
} as const
