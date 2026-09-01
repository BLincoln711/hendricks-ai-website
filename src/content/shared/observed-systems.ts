/**
 * The observed-systems boundary, stated once (docs/17 §3.5, CONTENT_VERIFICATION
 * A1).
 *
 * Five pages state which systems Hendricks observes, and before this module they
 * stated it in five wordings: `/what-is-ai-mediated-search`,
 * `/what-is-generative-engine-optimization`, `/solutions/selection-intelligence`,
 * `/solutions/search-impact-measurement`, and
 * `/solutions/search-demand-intelligence`. Repeating the boundary is correct,
 * because a scope statement belongs adjacent to every claim it bounds. Repeating
 * it in five wordings is not, because A1 is a closed list and a wording that
 * drifts is a compliance failure rather than a style problem.
 *
 * `/what-is-ai-mediated-search` remains the canonical explanation. It is the only
 * rendering with a table and an explicit "Observed by Hendricks" column, which is
 * the most extractable form of the boundary on the site. The rows and sentences
 * below are transcribed from that page. The other four pages render a constant
 * from here and link to the table. None of them writes the boundary fresh.
 *
 * Hendricks observes exactly four systems. The list is closed under
 * CONTENT_VERIFICATION A1 and nothing here may be reworded, extended, or
 * re-derived to imply a fifth. Gemini joined the observed set on 2026-09-01,
 * Brandon decision recorded in CONTENT_VERIFICATION A1, when the Answer Index
 * corpus measured it alongside the original three; the A1 resolution log carries
 * the date. Google AI Mode and Microsoft Copilot are named as surfaces that
 * exist and are marked `'No'`, which is a factual statement about the
 * environment and never a capability claim.
 */

export type ObservedSystemRow = {
  /** Public product name, as a buyer would type it. */
  surface: string
  /** Whether the surface sits inside Google Search or in a separate product. */
  environment: string
  /** Whether Hendricks measures, tests, monitors, and reports on it. */
  observed: 'Yes' | 'No'
}

/**
 * The surfaces table from `/what-is-ai-mediated-search`, verbatim. The rows are
 * assignable to `readonly DataTableRow[]`, so a page can pass them straight to
 * `DataTable` with its own columns and caption. The compile-time guard for that
 * lives in `tests/unit/shared-content.test.ts`.
 */
export const observedSystemRows = [
  { surface: 'AI Overviews', environment: 'Inside Google Search', observed: 'Yes' },
  { surface: 'AI Mode', environment: 'Inside Google Search', observed: 'No' },
  { surface: 'ChatGPT', environment: 'Assistant product', observed: 'Yes' },
  { surface: 'Perplexity', environment: 'Assistant product', observed: 'Yes' },
  { surface: 'Gemini', environment: 'Assistant product', observed: 'Yes' },
  { surface: 'Microsoft Copilot', environment: 'Assistant product', observed: 'No' },
] as const satisfies readonly ObservedSystemRow[]

/**
 * The canonical scope sentence. Every page that names what Hendricks measures
 * renders this string rather than a paraphrase of it.
 */
export const observedSystemsSentence =
  'Hendricks observes four systems: Google AI Overviews, ChatGPT, Perplexity, and Gemini.'

/**
 * The canonical exclusion sentence, naming all three unobserved surfaces
 * explicitly. Transcribed from `/what-is-ai-mediated-search`.
 */
export const observedSystemsExclusion =
  'Hendricks does not measure, test, monitor, or report on Google AI Mode or Microsoft Copilot.'

/**
 * Optional framing for a page that has no table of its own and therefore has to
 * say why the three unobserved surfaces are named at all. Transcribed from
 * `/solutions/selection-intelligence`, which carried the only page-neutral
 * wording of it. Render it before `observedSystemsExclusion` or not at all.
 */
export const observedSystemsContext =
  'Google AI Mode and Microsoft Copilot are surfaces that exist in the same information environment, and they are named here for that reason alone.'
