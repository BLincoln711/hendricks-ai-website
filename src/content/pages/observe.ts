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
 * peers, or engine results. No live pulls. Presence words, if used, are only
 * cited, invisible, or unmeasured. Do not imply shortlist or consideration.
 * Never name AI Mode or Copilot. Gemini stays unmeasured.
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
  notice:
    'Hendricks will use the brand and category you enter to queue this public sample and protect the form from abuse. This is not a Diagnostic application.',
  privacyLabel: 'Privacy Notice',
  queueError: 'This observation could not be queued. Check the fields and try again.',
} as const

export const queued = {
  instrumentLabel: 'Observation',
  gloss: 'A queued public sample. The board stays empty until a run is observed.',
  status: 'Run pending. This run has not been observed yet.',
  jobLabel: 'Job',
  jobMissing: 'That observation job was not found. Queue a new sample.',
  boardCaption:
    'Observation board. Empty cells are pending or unmeasured. This is not a selection map.',
  mapEmpty:
    'No selection map is drawn on this page. Empty means unmeasured or not observed in this run. Cells are not invented.',
  cellPending: 'pending',
  cellUnmeasured: 'unmeasured',
  cellCited: 'cited',
  cellInvisible: 'invisible',
  engineColumn: 'Engine',
  sampleColumn: 'Sample',
  intentsLegend: 'Sample intents',
  intentsNote:
    'Sample intents. These are templates for the category, not observed questions from this run.',
  anotherLabel: 'Queue another observation',
  statusQueued: 'Run pending. This run has not been observed yet.',
  statusRunning: 'Run in progress. Cells stay empty until a probe settles.',
  statusPartial: 'Partial. Settled engines stay unmeasured until a real fill lands.',
  statusComplete: 'Complete. Empty cells are unmeasured.',
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
  queued: 'pending',
  notProbed: 'unmeasured',
  notProbedNote: 'not probed in this sample',
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
    description: 'What observed presence means in AI-mediated search.',
  },
] as const
