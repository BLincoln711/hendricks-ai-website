/**
 * Visitor-facing strings for the public observation bridge.
 *
 * Kept out of `src/content/pages/` so this PR does not collide with Site PR 32
 * observe copy. Wording matches the /observe disclosure lock. No em-dashes.
 * No markdown emphasis. Not the Search Intelligence Diagnostic.
 */

export const disclosure = {
  sample:
    'This sample probes Google AI Overviews, ChatGPT, and Perplexity when the queue runs. Gemini is not probed in this sample.',
  limits:
    'This is a public sample, not the Search Intelligence Diagnostic, and not a guarantee. Empty means unmeasured or not observed in this run.',
  caption: 'Observed sample. Not a client result.',
  diagnostic:
    'The Search Intelligence Diagnostic is a fixed-scope engagement, typically three to four weeks, with a fee set by scope and unpriced here.',
} as const
