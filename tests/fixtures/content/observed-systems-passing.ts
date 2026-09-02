import { observedSystemsSentence } from '@/content/shared/observed-systems'

/**
 * Passing fixture for the observed-systems guard. Every boundary here is either
 * rendered from the shared module, allowlisted by exact sentence, or recorded
 * in a dated change row of kind `scope`. The guard reads this file as text.
 */
export const passing = {
  scope: [
    `${observedSystemsSentence} Those are the surfaces where Hendricks runs controlled tests.`,
    'Hendricks does not measure, test, monitor, or report on Google AI Mode or Microsoft Copilot.',
  ],
  baseline:
    'Those figures describe 17 questions, three systems, one geography, and one date. It is a baseline, not evidence that any tactic works.',
  engines: 'Seventeen questions across three engines produce 51 cells.',
  changes: [
    { date: '2026-08-19', kind: 'publication', summary: 'Published.' },
    {
      date: '2026-09-01',
      kind: 'scope',
      summary:
        'Gemini joined the observed set after this run. The run compared three systems, Google AI Overviews, ChatGPT, and Perplexity.',
    },
  ],
} as const
