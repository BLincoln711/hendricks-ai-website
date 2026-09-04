import { classifyProbeOutcome, type ProbeClassifyResult } from '../../src/lib/observation/classify'
import type { ProbeEngineId } from '../../src/lib/observation/schema'

/**
 * DataForSEO live probes for the public-mini worker.
 *
 * Lives under scripts/ so the Next app never imports it and never holds the
 * login. Gemini has an endpoint in this API. This module does not call it.
 */

const DATAFORSEO_BASE = 'https://api.dataforseo.com/v3'
const PROBE_TIMEOUT_MS = 45_000

const ENDPOINTS: Record<ProbeEngineId, string> = {
  google_aio: '/serp/google/organic/live/advanced',
  chat_gpt: '/ai_optimization/chat_gpt/llm_responses/live',
  perplexity: '/ai_optimization/perplexity/llm_responses/live',
}

const FORBIDDEN_PATHS = [
  '/ai_optimization/gemini/',
  '/serp/google/ai_mode/',
]

export function dataforseoCredentialsPresent(): boolean {
  return Boolean(process.env.DATAFORSEO_LOGIN && process.env.DATAFORSEO_PASSWORD)
}

function basicAuth(): string {
  const login = process.env.DATAFORSEO_LOGIN
  const password = process.env.DATAFORSEO_PASSWORD
  if (!login || !password) throw new Error('DataForSEO credentials are not set.')
  return Buffer.from(`${login}:${password}`).toString('base64')
}

function collectUrls(value: unknown, into: Set<string>): void {
  if (typeof value === 'string') {
    if (/^https?:\/\//i.test(value)) into.add(value)
    return
  }
  if (Array.isArray(value)) {
    for (const item of value) collectUrls(item, into)
    return
  }
  if (value && typeof value === 'object') {
    for (const [key, nested] of Object.entries(value)) {
      if (key === 'url' || key === 'source_url' || key === 'link') collectUrls(nested, into)
      else collectUrls(nested, into)
    }
  }
}

function aioPresent(value: unknown): boolean {
  if (!value || typeof value !== 'object') return false
  const record = value as { type?: unknown; items?: unknown }
  if (record.type === 'ai_overview') return true
  if (Array.isArray(record.items)) return record.items.some((item) => aioPresent(item))
  return Object.values(record).some((nested) => aioPresent(nested))
}

function taskPayload(engine: ProbeEngineId, context: string): Record<string, unknown> {
  if (engine === 'google_aio') {
    return {
      keyword: context,
      location_code: 2840,
      language_code: 'en',
      load_async_ai_overview: true,
    }
  }
  return {
    user_prompt: context,
    web_search: true,
  }
}

export async function probeDataForSeo(args: {
  engine: ProbeEngineId
  context: string
  brandHost?: string
  timeoutMs?: number
}): Promise<ProbeClassifyResult> {
  const path = ENDPOINTS[args.engine]
  if (FORBIDDEN_PATHS.some((forbidden) => path.includes(forbidden))) {
    throw new Error('Forbidden DataForSEO path.')
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), args.timeoutMs ?? PROBE_TIMEOUT_MS)

  try {
    const response = await fetch(`${DATAFORSEO_BASE}${path}`, {
      method: 'POST',
      headers: {
        authorization: `Basic ${basicAuth()}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify([taskPayload(args.engine, args.context)]),
      signal: controller.signal,
      cache: 'no-store',
    })

    if (!response.ok) {
      return classifyProbeOutcome({
        engine: args.engine,
        ok: false,
        error: `probe_error_${response.status}`,
      })
    }

    const json: unknown = await response.json()
    const urls = new Set<string>()
    collectUrls(json, urls)

    return classifyProbeOutcome({
      engine: args.engine,
      ok: true,
      sourceUrls: [...urls],
      aioPresent: args.engine === 'google_aio' ? aioPresent(json) : undefined,
      brandHost: args.brandHost,
    })
  } catch (error) {
    const timedOut = error instanceof Error && error.name === 'AbortError'
    return classifyProbeOutcome({
      engine: args.engine,
      ok: false,
      timedOut,
      error: timedOut ? 'probe_timeout' : 'probe_error',
    })
  } finally {
    clearTimeout(timer)
  }
}
