/**
 * Failing fixture for the observed-systems guard. Seven breaches, one per key,
 * so a regression in any rule shows up as a changed count. The guard reads
 * this file as text; nothing imports it.
 */
export const failing = {
  staleCount:
    'Hendricks observes three systems in a baseline: Google AI Overviews, ChatGPT, and Perplexity.',
  retypedCanonical:
    'Hendricks observes four systems: Google AI Overviews, ChatGPT, Perplexity, and Gemini.',
  namedInProse:
    'Hendricks measures Google AI Overviews and ChatGPT under controlled conditions.',
  negatedInLaterSentence:
    'Hendricks observes Gemini and Copilot. Hendricks does not report on AI Mode.',
  retypedFraming:
    'Google AI Mode, Gemini, and Microsoft Copilot are named here because they exist in the same information environment.',
  undatedScopeRow: { kind: 'scope', summary: 'The boundary on this page is three systems.' },
  changes: [
    { date: '2026-09-01', kind: 'update', summary: 'The boundary on this page is three systems.' },
  ],
} as const
