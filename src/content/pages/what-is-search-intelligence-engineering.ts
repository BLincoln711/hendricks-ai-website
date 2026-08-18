import type { RelatedLink } from '@/components/sections/related-links'
import type { Cta } from '@/components/ui/cta'
import { routes } from '@/config/routes'

/**
 * Approved copy, transcribed from
 * content/pages/13-what-is-search-intelligence-engineering.md.
 *
 * The markdown's "Related CTAs" section lists three destinations without
 * specifying which is primary. The Diagnostic is used as the primary action to
 * match every other page on the site, and the other two become related links.
 */

export const meta = {
  title: 'What Is Search Intelligence Engineering? | Hendricks',
  description:
    'Search Intelligence Engineering connects customer demand, traditional and AI-mediated search visibility, brand evidence, implementation, analytics, and business outcomes.',
} as const

export const hero = {
  eyebrow: 'Definition',
  title: 'What Is Search Intelligence Engineering?',
  lead: [
    'Traditional search disciplines often optimize one part of the journey. Search Intelligence Engineering provides the system that connects them.',
  ],
  primaryCta: {
    label: 'Start with a Search Intelligence Diagnostic',
    href: routes.diagnostic.path,
    analytics: { location: 'wisie_hero' },
  } satisfies Cta,
} as const

export const directAnswer = {
  term: 'Search Intelligence Engineering',
  answer:
    'Search Intelligence Engineering is the discipline of designing systems that connect customer search demand, traditional and AI-mediated visibility, brand evidence, paid and organic acquisition, analytics, and business outcomes so organizations can understand where they are losing consideration and act on evidence.',
} as const

export const whyItExists = {
  eyebrow: 'Why It Exists',
  title: 'Traditional search disciplines often optimize one part of the journey.',
  caption: 'Primary optimization target by discipline.',
  columns: [
    { key: 'discipline', header: 'Discipline', rowHeader: true, width: '38%' },
    { key: 'target', header: 'Primary optimization target' },
  ],
  rows: [
    { discipline: 'SEO', target: 'Organic rankings and traffic' },
    { discipline: 'Paid search', target: 'Paid visibility and conversions' },
    { discipline: 'Content marketing', target: 'Audience engagement and demand' },
    { discipline: 'Digital PR', target: 'Authority and reputation' },
    { discipline: 'GEO/AEO', target: 'AI mentions and citations' },
    { discipline: 'Analytics', target: 'Customer behavior and attribution' },
    {
      discipline: 'Search Intelligence Engineering',
      target: 'The complete path from demand to selection and business impact',
    },
  ],
  closing: [
    'Search Intelligence Engineering does not eliminate those disciplines.',
    'It provides the system that connects them.',
  ],
} as const

/**
 * The four outcomes map one-to-one onto the four solutions, so each carries the
 * link to the solution that delivers it. This is what satisfies the rule in
 * docs/03 §6 that a category definition links to all four solutions.
 */
export const outcomes = {
  eyebrow: 'Four Outcomes',
  title: 'What the discipline is accountable for.',
  items: [
    {
      number: '01',
      name: 'Measure demand',
      description:
        'Understand the commercially important needs, questions, comparisons, and buying contexts in the market.',
      solution: {
        label: 'Search Demand Intelligence',
        href: routes.searchDemandIntelligence.path,
      },
    },
    {
      number: '02',
      name: 'Understand AI visibility and selection',
      description:
        'Observe whether a brand is found, understood, considered, cited, and recommended across defined customer contexts.',
      solution: { label: 'Selection Intelligence', href: routes.selectionIntelligence.path },
    },
    {
      number: '03',
      name: 'Engineer the search presence',
      description:
        'Improve technical access, entity clarity, content, evidence, authority, acquisition, and conversion conditions.',
      solution: {
        label: 'Search Presence Engineering',
        href: routes.searchPresenceEngineering.path,
      },
    },
    {
      number: '04',
      name: 'Prove business impact',
      description:
        'Connect exposure with behavior, qualified demand, opportunities, pipeline, and revenue using the strongest available evidence.',
      solution: {
        label: 'Search Impact Measurement',
        href: routes.searchImpactMeasurement.path,
      },
    },
  ],
} as const

export const whyEngineering = {
  eyebrow: 'Why “Engineering”',
  title: 'The work is not only analysis or content production.',
  lead: 'It involves designing an operating system across:',
  layers: [
    'Data',
    'Research',
    'Search platforms',
    'Website architecture',
    'Content systems',
    'Brand and entity information',
    'Third-party evidence',
    'Paid and organic acquisition',
    'Analytics',
    'CRM',
    'Experimentation',
    'Human workflows',
  ],
} as const

export const whatItIsNot = {
  eyebrow: 'What It Is Not',
  title: 'Search Intelligence Engineering is not:',
  items: [
    'A guarantee that an AI system will cite or recommend a brand',
    'A replacement for strong SEO fundamentals',
    'A prompt-tracking dashboard alone',
    'A generic content-generation service',
    'A claim to reverse-engineer hidden model logic',
    'An attribution system with perfect visibility into every buyer interaction',
  ],
} as const

export const path = {
  eyebrow: 'The Demand-to-Selection Path',
  title: 'The full sequence the discipline is designed around.',
  steps: [
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
} as const

export const sources = {
  reviewed: '2026-08-16',
  basis:
    'This definition is maintained by Hendricks and states the firm’s own position rather than reporting third-party research.',
  appliedIn: [
    { label: 'the four solutions', href: routes.solutions.path },
    { label: 'the delivery system', href: routes.howItWorks.path },
  ],
} as const

/**
 * The first two entries are the destinations the approved markdown names under
 * "Related CTAs". Everything after them is an internal-linking decision under
 * docs/03 §6 rather than approved copy, which is the established pattern on this
 * page and on /ai-selection-problem.
 *
 * The two entry-vocabulary pages sit third and fourth on purpose. This page
 * carries the only GEO/AEO row on the site, in the `whyItExists` table, and a
 * reader who arrived on that vocabulary needs somewhere to go with it. The table
 * itself cannot carry the link: `DataTableRow` is `Record<string, string>`, so a
 * cell holds text and nothing else, and putting a link in one would mean
 * changing a shared component to serve a single row. The related block does the
 * job without that.
 */
export const related: readonly RelatedLink[] = [
  {
    href: routes.solutions.path,
    label: 'Explore the four solutions',
    description: 'How the discipline is delivered as demand, selection, presence, and impact.',
  },
  {
    href: routes.howItWorks.path,
    label: 'See how the system works',
    description: 'The six stages, who owns what, and the operating cycle.',
  },
  {
    href: routes.whatIsGenerativeEngineOptimization.path,
    label: 'What Is Generative Engine Optimization?',
    description: 'What generative engine optimization covers, and where the framing runs out.',
  },
  {
    href: routes.whatIsAiMediatedSearch.path,
    label: 'What Is AI-Mediated Search?',
    description: 'Where AI-mediated search happens, and which systems Hendricks observes.',
  },
  {
    href: routes.whatIsSelectionIntelligence.path,
    label: 'What Is Selection Intelligence?',
    description: 'The measurement layer that shows where consideration is lost.',
  },
  {
    href: routes.aiSelectionProblem.path,
    label: 'The AI Selection Problem',
    description: 'Why being discovered no longer means being chosen.',
  },
  {
    href: routes.methodology.path,
    label: 'Methodology',
    description: 'How contexts are defined, classified, weighted, and graded.',
  },
]

export const closing = {
  title: 'Find where your brand is losing consideration.',
  primaryCta: {
    label: 'Start with a Search Intelligence Diagnostic',
    href: routes.diagnostic.path,
    analytics: { location: 'wisie_closing' },
  } satisfies Cta,
} as const
