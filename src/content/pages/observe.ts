import type { Cta } from '@/components/ui/cta'
import { routes } from '@/config/routes'
import { diagnosticCta } from '@/content/shared/ctas'

/**
 * Public copy for `/observe`.
 *
 * Brand/QA: every visitor-facing sentence in this file is new and needs review
 * before merge. None of it is approved homepage or Diagnostic copy. Prefer the
 * locked Diagnostic CTA and the locked category names. Do not treat this page
 * as the Search Intelligence Diagnostic.
 *
 * This is a public sample shell. It queues. It does not invent a selection map,
 * peers, or engine results.
 */

export const meta = {
  title: 'Public Observation | Hendricks',
  description:
    'Queue a public observation of one brand and category. This sample is not the Search Intelligence Diagnostic and does not invent a selection map.',
} as const

export const hero = {
  eyebrow: 'Observation',
  title: 'A public observation of one brand and category.',
  lead: 'Enter a brand and a category. This page queues a public sample. It is not the Search Intelligence Diagnostic.',
} as const

export const formCopy = {
  heading: 'Queue a public sample.',
  brandLabel: 'Brand',
  brandHint: 'The brand name you want observed. Use the public name, not a legal entity string.',
  brandError: 'Enter a brand name.',
  categoryLabel: 'Category',
  categoryHint: 'The category sets the sample intent templates. Those templates are not observed questions.',
  categoryError: 'Choose a category.',
  categoryPrompt: 'Select one',
  submit: 'Queue observation',
  submitting: 'Queuing observation...',
} as const

export const queued = {
  instrumentLabel: 'Observation',
  gloss: 'A queued public sample. No selection map is drawn until a run is observed.',
  status: 'Queued. This run has not been observed yet.',
  mapEmpty:
    'No selection map is drawn on this page. Empty means unmeasured or not observed in this run. Cells are not invented.',
  intentsLegend: 'Sample intents',
  intentsNote:
    'Sample intents. These are templates for the category, not observed questions from this run.',
  anotherLabel: 'Queue another observation',
} as const

/**
 * Probe disclosure for this public sample. Names the engines the later queue
 * will probe, and names Gemini as the one engine this sample does not probe.
 * Do not group Perplexity with Gemini. Do not describe the interactive checker
 * harness here.
 *
 * Brand/QA: new public sentences.
 */
export const disclosure = {
  sample:
    'This sample probes Google AI Overviews, ChatGPT, and Perplexity when the queue runs. Gemini is not probed in this sample.',
  limits:
    'This is a public sample, not the Search Intelligence Diagnostic, and not a guarantee. Empty means unmeasured or not observed in this run.',
  diagnostic:
    'The Search Intelligence Diagnostic is a fixed-scope engagement, typically three to four weeks, with a fee set by scope and unpriced here.',
} as const

export const engines = {
  legend: 'Engines named in this sample',
  queued: 'queued',
  notProbed: 'not probed in this sample',
} as const

export const diagnosticDoor = {
  note: 'A public observation is a sample. It is not the Diagnostic.',
  cta: diagnosticCta('observe_result') satisfies Cta,
} as const

export const related = [
  {
    href: routes.diagnostic.path,
    label: 'Search Intelligence Diagnostic',
    description: 'The fixed-scope engagement this sample is not.',
  },
  {
    href: routes.whatIsSelectionIntelligence.path,
    label: 'What Is Selection Intelligence?',
    description: 'What consideration and recommendation mean when they are observed.',
  },
] as const
