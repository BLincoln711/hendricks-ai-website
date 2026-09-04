import { hostFromCitedUrl } from '@/lib/observation/citations'
import {
  GEMINI_POLICY,
  GEMINI_UNMEASURED_REASON,
  type GeminiRow,
  type ObservationGrain,
  type ProbeEngineId,
} from '@/lib/observation/schema'

/**
 * Probe outcome to cell grain.
 *
 * Error, timeout, missing source list, or a missing AI Overview block are
 * unmeasured. Invisible is only allowed when sources were observed and the
 * brand host was not among them. Gemini is not an input. Never invent a fill.
 */

export type ProbeClassifyInput = {
  engine: ProbeEngineId
  ok: boolean
  timedOut?: boolean
  error?: string
  sourceUrls?: string[]
  /** Google AI Overviews only. Absent or false means the block was not observed. */
  aioPresent?: boolean
  brandHost?: string
}

export type ProbeClassifyResult = {
  state: ObservationGrain
  error?: string
  cited_urls?: string[]
}

export function classifyProbeOutcome(input: ProbeClassifyInput): ProbeClassifyResult {
  if (input.timedOut) {
    return { state: 'unmeasured', error: input.error ?? 'probe_timeout' }
  }

  if (!input.ok || input.error) {
    return { state: 'unmeasured', error: input.error ?? 'probe_error' }
  }

  if (input.engine === 'google_aio' && input.aioPresent !== true) {
    return { state: 'unmeasured', error: 'no_aio_block' }
  }

  if (!input.sourceUrls || input.sourceUrls.length === 0) {
    return { state: 'unmeasured', error: 'no_source_list' }
  }

  const cited_urls = input.sourceUrls
  const owned = input.brandHost?.replace(/^www\./i, '').toLowerCase()
  const brandCited =
    Boolean(owned) &&
    cited_urls.some((raw) => hostFromCitedUrl(raw) === owned)

  if (brandCited) return { state: 'cited', cited_urls }
  return { state: 'invisible', cited_urls }
}

export function geminiPublicMiniRow(): GeminiRow {
  return {
    engine: 'gemini',
    state: 'unmeasured',
    reason: GEMINI_UNMEASURED_REASON,
    policy: GEMINI_POLICY,
  }
}

export function assertNeverGeminiProbe(engine: string): void {
  if (engine === 'gemini') {
    throw new Error('Gemini is not probed on the public mini.')
  }
}
