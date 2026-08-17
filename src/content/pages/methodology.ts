import type { RelatedLink } from '@/components/sections/related-links'
import type { Cta } from '@/components/ui/cta'
import type { ContextPanel } from '@/components/visuals/context-panel-diagram'
import { routes } from '@/config/routes'

/**
 * Approved copy, transcribed from content/pages/16-methodology.md.
 *
 * This is the page every solution page links to for research standards, so the
 * limitations section is rendered in full rather than summarised. Two items in it
 * — that citation does not prove influence, and that correlation does not prove
 * causation — are the load-bearing honesty claims for the whole site.
 *
 * The markdown's context panels include an optional fifth, first-party human
 * research, which is marked optional in the rendered list rather than presented as
 * standard practice.
 */

export const meta = {
  title: 'Search Intelligence Measurement Methodology | Hendricks',
  description:
    'Learn how Hendricks defines intent contexts, measures observed consideration, analyzes evidence, grades conclusions, and connects interventions to business outcomes.',
} as const

export const hero = {
  eyebrow: 'Research and Measurement Standards',
  title: 'Measure the decision—not just the prompt.',
  lead: [
    'Traditional search often centered on the keyword. Early AI-search measurement often centers on the prompt.',
    'Hendricks centers on the commercial intent context.',
  ],
  primaryCta: {
    label: 'Start with a Search Intelligence Diagnostic',
    href: routes.diagnostic.path,
    analytics: { location: 'methodology_hero' },
  } satisfies Cta,
} as const

export const intentContext = {
  eyebrow: 'Intent Context',
  title: 'What a unit of measurement is made of.',
  formula: [
    'Customer Need',
    'Customer Profile',
    'Use Case',
    'Constraints',
    'Geography',
    'Decision Stage',
    'Commercial Value',
  ],
  result: 'Intent Context',
} as const

export const contextPanels = {
  eyebrow: 'Context Panels',
  title: 'Each panel answers a different question.',
  panels: [
    {
      name: 'Neutral baseline',
      description: 'A defined question without substantial supplied customer context.',
      question: 'What happens under standardized conditions?',
    },
    {
      name: 'Customer cohort',
      description:
        'Representative industry, demographic, use-case, budget, geographic, or business constraints.',
      question: 'Which customer profiles change the outcome?',
    },
    {
      name: 'Decision journey',
      description:
        'Multi-step conversations that become progressively more specific as the customer approaches a decision.',
      question: 'Does the brand survive as the decision narrows?',
    },
    {
      name: 'Platform and time panel',
      description:
        'Repeated observations across relevant search environments and time periods.',
      question: 'How stable is the observed outcome?',
    },
  ] satisfies readonly ContextPanel[],
  optional: {
    label: 'Optional',
    name: 'First-party human research',
    description:
      'With consent, real participants may compare controlled findings with live user experiences.',
  },
} as const

export const classification = {
  eyebrow: 'Outcome Classification',
  title: 'Classify each brand outcome as one or more of:',
  items: [
    'Absent',
    'Referenced',
    'Cited',
    'Considered',
    'Compared',
    'Recommended',
    'Preferred',
    'Inaccurately represented',
    'Contradicted',
    'Uncertain',
  ],
  closing: 'Define classifier rules and human-review thresholds.',
} as const

export const weighting = {
  eyebrow: 'Weighting',
  title: 'High-value customer decisions receive more weight than low-value informational questions.',
  lead: 'A transparent weighting model can consider:',
  factors: [
    'Demand',
    'Commercial intent',
    'Expected customer value',
    'Strategic fit',
    'Eligibility',
    'Evidence confidence',
  ],
  limitation: 'No weighting model should be presented as universal.',
} as const

export const evidenceGrades = {
  eyebrow: 'Evidence Grades',
  title: 'Every conclusion carries the grade of evidence behind it.',
  caption: 'Hendricks evidence grades and the standard each one requires.',
  columns: [
    { key: 'grade', header: 'Grade', rowHeader: true, width: '16%' },
    { key: 'evidence', header: 'Evidence' },
  ],
  rows: [
    { grade: 'A', evidence: 'Controlled experiment combined with first-party CRM or revenue data' },
    {
      grade: 'B',
      evidence: 'Strong first-party exposure, behavior, and commercial time-series evidence',
    },
    {
      grade: 'C',
      evidence: 'Repeated controlled context-panel observations and consistent source patterns',
    },
    { grade: 'D', evidence: 'Directional API, synthetic, or isolated observation' },
  ],
} as const

export const statement = {
  title: 'Methodology statement',
  quote:
    'Hendricks does not claim to reverse-engineer hidden model logic. We observe the information environment, test representative customer contexts, analyze sources and evidence, engineer the conditions a brand controls, and measure what changes.',
} as const

export const reproducibility = {
  eyebrow: 'Reproducibility Requirements',
  title: 'What is stored for each run.',
  lead: 'Store for each run where legally and technically permitted:',
  items: [
    'Exact question',
    'Supplied context',
    'Platform',
    'Model or search experience',
    'Date and time',
    'Location',
    'Session type',
    'Response',
    'Cited sources',
    'Classifier output',
    'Confidence',
    'Human-review status',
  ],
} as const

export const limitations = {
  eyebrow: 'Limitations',
  title: 'What this methodology cannot do.',
  items: [
    'Personal memory cannot be reproduced universally.',
    'Model and search behavior changes over time.',
    'APIs may not reproduce consumer interfaces exactly.',
    'Not every AI impression is observable.',
    'Citation does not prove influence.',
    'Correlation does not prove causation.',
    'Offline selection may not be attributable.',
  ],
} as const

export const sources = {
  reviewed: '2026-08-16',
  basis:
    'These are the Hendricks research and measurement standards. They describe the firm’s own practice and are revised as platform behavior changes.',
  appliedIn: [
    { label: 'Selection Intelligence', href: routes.selectionIntelligence.path },
    { label: 'Search Impact Measurement', href: routes.searchImpactMeasurement.path },
    { label: 'the Diagnostic', href: routes.diagnostic.path },
  ],
} as const

export const related: readonly RelatedLink[] = [
  {
    href: routes.selectionIntelligence.path,
    label: 'Selection Intelligence',
    description: 'The baseline these standards are applied to.',
  },
  {
    href: routes.searchImpactMeasurement.path,
    label: 'Search Impact Measurement',
    description: 'How graded evidence connects to commercial outcomes.',
  },
  {
    href: routes.whatIsSelectionIntelligence.path,
    label: 'What Is Selection Intelligence?',
    description: 'The definition and the metrics these standards produce.',
  },
  {
    href: routes.howItWorks.path,
    label: 'How It Works',
    description: 'Where measurement sits in the six-stage system.',
  },
]

export const closing = {
  title: 'Establish a baseline before making claims.',
  primaryCta: {
    label: 'Start with a Search Intelligence Diagnostic',
    href: routes.diagnostic.path,
    analytics: { location: 'methodology_closing' },
  } satisfies Cta,
} as const
