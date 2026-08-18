import type { RelatedLink } from '@/components/sections/related-links'
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
  reviewed: '2026-08-16',
  basis:
    'This page states the Hendricks position on how AI-mediated search changes buying journeys. It does not report a study, and no external finding is claimed.',
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
 */
export const related: readonly RelatedLink[] = [
  {
    href: routes.whatIsAiMediatedSearch.path,
    label: 'What Is AI-Mediated Search?',
    description:
      'Why a brand can rank well and still lose the shortlist, and the surfaces where that happens.',
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
