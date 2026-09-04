import { z } from 'zod'

/**
 * Public-mini observation contract.
 *
 * Site PR 32 owns `/observe` chrome (brand plus category form, queued board).
 * This module owns the job payload both PRs import. Cell grain is only
 * cited | invisible | unmeasured. pending and reading are job states, never
 * a selection reading. Gemini is unmeasured_by_policy on this public sample.
 */

export const OBSERVE_METHOD = 'public_mini_v1'
export const OBSERVE_FIXTURE_METHOD = 'fixture_public_mini_v1'
export const OBSERVE_WORKER_METHOD = 'ultra_worker_v1'

export const GEMINI_UNMEASURED_REASON = 'not_probed_public_mini_v1'
export const GEMINI_POLICY = 'unmeasured_by_policy'

export const probeEngineIds = ['google_aio', 'chat_gpt', 'perplexity'] as const
export type ProbeEngineId = (typeof probeEngineIds)[number]

export const boardEngineIds = [...probeEngineIds, 'gemini'] as const
export type BoardEngineId = (typeof boardEngineIds)[number]

/** Terminal observation grain. Never shortlist, consideration, or recommendation. */
export const observationGrainStates = ['cited', 'invisible', 'unmeasured'] as const
export type ObservationGrain = (typeof observationGrainStates)[number]

/** Job-time cell states. pending and reading are not observations. */
export const observationCellStates = [
  'pending',
  'reading',
  ...observationGrainStates,
] as const
export type ObservationCellState = (typeof observationCellStates)[number]

export const observationJobStatuses = [
  'queued',
  'running',
  'partial',
  'complete',
  'refused',
] as const
export type ObservationJobStatus = (typeof observationJobStatuses)[number]

export type ObservationCell = {
  context: string
  engine: BoardEngineId
  state: ObservationCellState
  error?: string
  cited_urls?: string[]
}

export type GeminiRow = {
  engine: 'gemini'
  state: 'unmeasured'
  reason: typeof GEMINI_UNMEASURED_REASON
  policy: typeof GEMINI_POLICY
}

export type ObservationJob = {
  job_id: string
  created_at: string
  status: ObservationJobStatus
  brand_name: string
  brand_host?: string
  category: string
  contexts: string[]
  engines_requested: ProbeEngineId[]
  cost_ceiling_usd: number
}

export type ObservationPayload = {
  run_id: string
  job_id: string
  finished_at?: string
  method: string
  cells: ObservationCell[]
  gemini_row: GeminiRow
  disclaimer: string
}

export type ObservationRecord = {
  job: ObservationJob
  payload: ObservationPayload
  estimated_spend_usd: number
}

export const observationCreateSchema = z.object({
  brand_name: z.string().trim().min(1, 'Enter a brand name.').max(80),
  brand_host: z
    .string()
    .trim()
    .max(253)
    .optional()
    .transform((value) => (value && value.length > 0 ? value : undefined)),
  category: z.string().trim().min(1, 'Choose a category.').max(80),
  contexts: z
    .array(z.string().trim().min(1).max(500))
    .min(3, 'Provide three or four contexts.')
    .max(4, 'Provide three or four contexts.'),
  email: z
    .email('Enter a valid email.')
    .max(254)
    .optional()
    .or(z.literal('').transform(() => undefined)),
  /**
   * Notice-at-collection acknowledgement for this public sample, not a
   * required Privacy Notice checkbox and not marketing permission.
   */
  consent: z.boolean().refine((value) => value === true, {
    error: 'Acknowledge the observation notice to queue a public sample.',
  }),
})

export type ObservationCreateInput = z.infer<typeof observationCreateSchema>

export const observationCellWriteSchema = z.object({
  context: z.string().trim().min(1).max(500),
  engine: z.enum(probeEngineIds),
  state: z.enum(observationCellStates),
  error: z.string().trim().max(500).optional(),
  cited_urls: z.array(z.string().trim().max(2000)).max(50).optional(),
})

export const observationWorkerWriteSchema = z.object({
  cells: z.array(observationCellWriteSchema).min(1).max(16),
  status: z.enum(['running', 'partial', 'complete', 'refused']).optional(),
  finished_at: z.string().trim().max(40).optional(),
  method: z.string().trim().max(80).optional(),
  estimated_spend_usd: z.number().min(0).max(100).optional(),
})

export type ObservationWorkerWrite = z.infer<typeof observationWorkerWriteSchema>

export function isObservationGrain(state: ObservationCellState): state is ObservationGrain {
  return (observationGrainStates as readonly string[]).includes(state)
}

export function isProbeEngine(engine: string): engine is ProbeEngineId {
  return (probeEngineIds as readonly string[]).includes(engine)
}

export function normalizeBrandHost(raw: string | undefined): string | undefined {
  if (!raw) return undefined
  const trimmed = raw.trim()
  if (trimmed.length === 0) return undefined

  try {
    const url = trimmed.includes('://') ? new URL(trimmed) : new URL(`https://${trimmed}`)
    const host = url.hostname.replace(/^www\./i, '').toLowerCase()
    return host.length > 0 ? host : undefined
  } catch {
    return undefined
  }
}
