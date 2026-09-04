import { disclosure as observePageDisclosure } from '@/lib/observation/copy'
import {
  GEMINI_POLICY,
  GEMINI_UNMEASURED_REASON,
  OBSERVE_METHOD,
  probeEngineIds,
  type ProbeEngineId,
} from '@/lib/observation/schema'

/**
 * Site PR1 handshake. Import these constants rather than restating the board.
 *
 * Engine ids in the API are snake_case so they match the Ultra checker
 * (`google_aio`, `chat_gpt`, `perplexity`). The /observe chrome uses kebab-case
 * labels. Map at the boundary. Never add Gemini to engines_requested.
 */

export const observeCreatePath = '/api/observe/jobs'
export const observePollPath = (jobId: string) => `/api/observe/jobs/${jobId}`
export const observeWorkerWritePath = (jobId: string) => `/api/observe/jobs/${jobId}/cells`

export const observeEnginesRequested: readonly ProbeEngineId[] = probeEngineIds

export const siteEngineIds = {
  google_aio: 'google-ai-overviews',
  chat_gpt: 'chatgpt',
  perplexity: 'perplexity',
  gemini: 'gemini',
} as const

export const apiEngineFromSite = {
  'google-ai-overviews': 'google_aio',
  chatgpt: 'chat_gpt',
  perplexity: 'perplexity',
  gemini: 'gemini',
} as const

export const observeGeminiLock = {
  engine: 'gemini' as const,
  state: 'unmeasured' as const,
  reason: GEMINI_UNMEASURED_REASON,
  policy: GEMINI_POLICY,
}

export const observeDisclaimer = observePageDisclosure.sample
export const observeCaption = observePageDisclosure.caption
export const observeLimits = observePageDisclosure.limits

export const observeQueueHook = {
  wired: true,
  method: OBSERVE_METHOD,
  createPath: observeCreatePath,
  pollPath: '/api/observe/jobs/:jobId',
  enginesWhenQueued: ['Google AI Overviews', 'ChatGPT', 'Perplexity'] as const,
  notProbed: ['Gemini'] as const,
  grain: ['cited', 'invisible', 'unmeasured'] as const,
}
