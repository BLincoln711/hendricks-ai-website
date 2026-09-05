import type { RelatedEntry } from '@/components/canvas/related-list'
import type { Cta } from '@/components/ui/cta'
import { routes } from '@/config/routes'
import { evidenceGradeRows } from '@/content/shared/evidence-grades'
import { metricDefinitions } from '@/content/shared/metrics'

/**
 * One controlled condition and the question it answers.
 *
 * The type moved here from `visuals/context-panel-diagram.tsx` when the canvas
 * conversion deleted that component. `/solutions/selection-intelligence` reads
 * it from here, because both pages describe the same research design.
 */
export type ContextPanel = {
  name: string
  description: string
  question: string
}

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
  title: 'Measure the decision, not just the prompt.',
  lead: [
    'Traditional search often centered on the keyword. Early AI-search measurement often centers on the prompt.',
    'Hendricks centers on the commercial intent context.',
  ],
  primaryCta: {
    label: 'Start with a Search Intelligence Diagnostic',
    href: routes.diagnostic.path,
    analytics: { location: 'methodology_hero' },
  } satisfies Cta,
  /* The second approved lead sentence, as the answer-first block: it is the one
     claim the whole page is an argument for. */
  answerLabel: 'The unit of measurement',
  answerTwoTone: {
    claim: 'Hendricks centers',
    continuation: 'on the commercial intent context.',
  },
} as const

/** The page's own outline, in the order the stations render. */
export const contents = [
  { id: 'intent-context', label: 'Intent context' },
  { id: 'context-panels', label: 'Context panels' },
  { id: 'outcome-classification', label: 'Outcome classification' },
  { id: 'weighting', label: 'Weighting' },
  { id: 'evidence-classes', label: 'Evidence classes' },
  { id: 'evidence-grades', label: 'Evidence grades' },
  { id: 'metrics', label: 'Metric definitions' },
  { id: 'statement', label: 'Methodology statement' },
  { id: 'reproducibility', label: 'Reproducibility requirements' },
  { id: 'limitations', label: 'Limitations' },
  { id: 'related-research', label: 'Related research' },
] as const

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
  caption: 'The intent context formula: seven terms, one unit of measurement.',
  gloss:
    'An intent context is a realistic customer situation: the need, who has it, their constraints, location, decision stage, and what the decision is worth.',
} as const

export const contextPanels = {
  eyebrow: 'Context Panels',
  title: 'Each panel answers a different question.',
  ariaLabel: 'The five context panels',
  questionLabel: 'Question answered',
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
  limitationTwoTone: {
    claim: 'No weighting model',
    continuation: 'should be presented as universal.',
  },
} as const

/**
 * The four evidence classes, rendered here as well as on the homepage. The
 * classes themselves live in `home.ts` and are read from there rather than
 * copied: this page is where the standard those marks encode is published, and
 * two renderings of one legend must not drift.
 */
export const evidenceClasses = {
  eyebrow: 'Proof Without False Precision',
  title: 'We separate what is observed, inferred, measured, and proven.',
} as const

/**
 * The five measures, read from the shared constant. Every page that names a
 * Hendricks measure renders this wording rather than a second definition of the
 * same measure, which docs/12 section 6 forbids.
 */
export const metrics = {
  eyebrow: 'Metrics',
  title: 'Five measures, each defined before it is reported.',
  items: metricDefinitions,
} as const

/**
 * This page owns the four-grade table (docs/17 §3.8). The rows are the shared
 * constant rather than a local copy, so the standard cannot be edited here and
 * left stale on a page that names a grade. `/solutions/search-impact-measurement`
 * carries the Grade A clause only, read off the same constant.
 *
 * Columns and caption stay page-owned. They are presentation, not the standard.
 */
export const evidenceGrades = {
  eyebrow: 'Evidence Grades',
  title: 'Every conclusion carries the grade of evidence behind it.',
  caption: 'Hendricks evidence grades and the standard each one requires.',
  columns: [
    { key: 'grade', header: 'Grade', rowHeader: true, width: '16%' },
    { key: 'evidence', header: 'Evidence' },
  ],
  rows: evidenceGradeRows,
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

/**
 * The research link leads this list, and the reason is a gap on this page rather
 * than a promotion of that one.
 *
 * docs/17 §6.1 records the defect plainly: this page publishes a posture and
 * calls it a protocol. It lists ten outcome states and instructs that classifier
 * rules and human-review thresholds be defined without saying what any of them
 * are, and it lists twelve fields to store for each run without ever showing a
 * run. `/research/hendricks-selection-baseline` is this methodology carried
 * through to a published number, with the query set, the cell counts, the error
 * count, and the limits on the page. It is the worked example the standards
 * section has never had, so it goes first.
 *
 * The description quotes the study's own denominators and derives nothing from
 * them. It states what the reader will find, not what the numbers prove: two
 * runs with no intervention and no control prove nothing about any tactic, and
 * no sentence on this page may suggest otherwise.
 *
 * The 2026-08-19 denominators here were replaced on 2026-08-19 when the study
 * repointed at run 2026-08-19-110930. The earlier ones came from a run whose
 * result file a scheduled job overwrote in place. Quote whatever that study
 * publishes; never carry a figure forward from this file's history.
 */
export const relatedSection = {
  title: 'Related research',
} as const

export const publishedSelfRun = {
  body: 'The published Hendricks self-run, 2026-08-19-110930, measured citation presence only. It is not a full Selection Intelligence baseline. Read the run on the Hendricks Selection Baseline.',
  cta: {
    label: 'Read the Hendricks Selection Baseline',
    href: routes.researchHendricksSelectionBaseline.path,
    analytics: { location: 'methodology_self_run' },
  } satisfies Cta,
} as const

export const related: readonly RelatedEntry[] = [
  {
    href: routes.researchHendricksSelectionBaseline.path,
    label: 'Hendricks Selection Baseline',
    description:
      'Published self-run 2026-08-19-110930 measured citation presence only, with its denominators published: 47 of 51 cells measured, 20 of them citing at least one source.',
  },
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
