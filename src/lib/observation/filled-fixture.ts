import { disclosure } from '@/lib/observation/copy'
import { geminiPublicMiniRow } from '@/lib/observation/classify'
import {
  OBSERVE_FIXTURE_METHOD,
  type ObservationCell,
  type ObservationPayload,
  type ProbeEngineId,
} from '@/lib/observation/schema'

/**
 * Non-production filled fixture. Loaded only when OBSERVE_FIXTURE=1 and the
 * runtime is not production. Documented fake outcomes, labeled as a sample.
 * Not a client result. No Brand B-D peers.
 */

export const filledFixtureWarning =
  'Non-production fixture. Observed sample. Not a client result. Never enable OBSERVE_FIXTURE in production.'

type FilledSpec = {
  engine: ProbeEngineId
  state: 'cited' | 'invisible' | 'unmeasured'
  error?: string
  cited_urls?: string[]
}

const FILLED: readonly FilledSpec[] = [
  {
    engine: 'google_aio',
    state: 'unmeasured',
    error: 'no_aio_block',
  },
  {
    engine: 'chat_gpt',
    state: 'invisible',
    cited_urls: ['https://example.com/category-guide'],
  },
  {
    engine: 'perplexity',
    state: 'cited',
    cited_urls: ['https://example.com/observed-page'],
  },
]

export function filledCellsFor(
  contexts: readonly string[],
  brandHost?: string,
): ObservationCell[] {
  return contexts.flatMap((context) =>
    FILLED.map((spec) => {
      const cited_urls =
        spec.state === 'cited' && brandHost
          ? [`https://${brandHost}/`, ...(spec.cited_urls ?? [])]
          : spec.cited_urls
      return {
        context,
        engine: spec.engine,
        state: spec.state,
        ...(spec.error ? { error: spec.error } : {}),
        ...(cited_urls ? { cited_urls } : {}),
      }
    }),
  )
}

export function filledPayload(args: {
  run_id: string
  job_id: string
  contexts: readonly string[]
  brandHost?: string
  finished_at: string
}): ObservationPayload {
  return {
    run_id: args.run_id,
    job_id: args.job_id,
    finished_at: args.finished_at,
    method: OBSERVE_FIXTURE_METHOD,
    cells: filledCellsFor(args.contexts, args.brandHost),
    gemini_row: geminiPublicMiniRow(),
    disclaimer: `${disclosure.sample} ${filledFixtureWarning}`,
  }
}
