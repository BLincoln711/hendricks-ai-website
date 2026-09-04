import { STAGE_IDS } from '@/lib/selection-map/schema'

/**
 * Empty observation instance for `/observe`.
 *
 * Reuses the Selection Map stage ids so a later run can fill the same path.
 * This object is not `selectionMapData`. It carries no peers, no shortlisted
 * cells, and no intervention. Do not pass it to `SelectionMapDrawing`.
 *
 * The live board is `ObservationJob.board` from POST /api/observe/jobs. Engine
 * ids stay locked as google_aio, chat_gpt, perplexity, gemini.
 */

export const OBSERVE_BRAND_DISPLAY_LIMIT = 28

export const observationStages = STAGE_IDS

export const observationEngineIds = [
  'google_aio',
  'chat_gpt',
  'perplexity',
  'gemini',
] as const

export type ObservationEngineId = (typeof observationEngineIds)[number]

export type ObservationEngineStatus = 'pending' | 'unmeasured'

export type ObservationEngine = {
  id: ObservationEngineId
  label: string
  status: ObservationEngineStatus
}

/**
 * The four locked engines in UI chrome. The later Ultra queue probes the
 * first three. Gemini is the only engine this sample does not probe.
 */
export const observationEngines = [
  { id: 'google_aio', label: 'Google AI Overviews', status: 'pending' },
  { id: 'chat_gpt', label: 'ChatGPT', status: 'pending' },
  { id: 'perplexity', label: 'Perplexity', status: 'pending' },
  { id: 'gemini', label: 'Gemini', status: 'unmeasured' },
] as const satisfies readonly ObservationEngine[]

export const observationCategoryIds = [
  'b2b-software',
  'professional-services',
  'industrial',
  'other',
] as const

export type ObservationCategoryId = (typeof observationCategoryIds)[number]

export const observationCategories = [
  { id: 'b2b-software', label: 'B2B software' },
  { id: 'professional-services', label: 'Professional services' },
  { id: 'industrial', label: 'Industrial' },
  { id: 'other', label: 'Other' },
] as const satisfies readonly { id: ObservationCategoryId; label: string }[]

/**
 * Templated sample intents by category. Labeled as sample wherever rendered.
 * Not observed questions. Not a live prompt set. Used as default `contexts`
 * when the form posts without an explicit list.
 */
export const sampleIntentsByCategory: Record<ObservationCategoryId, readonly string[]> = {
  'b2b-software': [
    'Which platform should a mid-market operations team use in this category?',
    'Who should a buyer shortlist for this category this quarter?',
    'What should a first-time buyer compare before choosing a vendor in this category?',
    'Which option fits a team replacing a spreadsheet process in this category?',
  ],
  'professional-services': [
    'Which firm should a first-time buyer hire in this category?',
    'Who should a board compare for this category this quarter?',
    'What should a buyer ask before retaining a firm in this category?',
    'Which option belongs on a shortlist for this category?',
  ],
  industrial: [
    'Which provider should a plant manager hire in this category?',
    'Who should a maintenance lead compare for this category?',
    'What should a buyer check before awarding this category of work?',
    'Which option belongs on a shortlist for this category?',
  ],
  other: [
    'Which option should a buyer shortlist in this category?',
    'Who appears as a legitimate choice for this category?',
    'What should a first-time buyer compare in this category?',
    'Which option belongs on a shortlist for this category?',
  ],
}

/**
 * The empty run. `brands` stays empty so peers cannot be invented. `cells`
 * stays empty so no shortlist can be drawn. A later PR fills a real board
 * from Visibility Mode B, never from a fixture that looks like a win.
 */
export const emptyObservation = {
  version: 'observe-shell-1',
  status: 'queued',
  brands: [],
  cells: [],
  engines: observationEngines,
  stages: observationStages,
} as const

/**
 * PR2 hook. The shell records the create and poll paths and leaves the probe
 * unwired. No Visibility API keys, no probe client, no secrets.
 */
export const observeQueueHook = {
  wired: false,
  create: 'POST /api/observe/jobs',
  poll: 'GET /api/observe/jobs/:job_id',
  enginesWhenQueued: ['google_aio', 'chat_gpt', 'perplexity'] as const,
  notProbed: ['gemini'] as const,
  geminiReason: 'not_probed_public_mini_v1' as const,
}
