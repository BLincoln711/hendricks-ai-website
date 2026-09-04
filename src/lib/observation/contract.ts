import type { ObservationCategoryId } from '@/content/instruments/observation-data'

/**
 * Locked `/observe` job contract for PR1. Names stay stable for PR2.
 *
 * POST /api/observe/jobs and GET /api/observe/jobs/:job_id share this shape.
 * Fixtures and poll stubs may emit pending or unmeasured cells only. cited and
 * invisible exist on the type so PR2 can fill them from a real run. They must
 * not appear in any PR1 fixture.
 */

export const OBSERVE_JOB_STATUSES = [
  'queued',
  'running',
  'partial',
  'complete',
] as const

export type ObservationJobStatus = (typeof OBSERVE_JOB_STATUSES)[number]

export const OBSERVE_ENGINE_IDS = [
  'google_aio',
  'chat_gpt',
  'perplexity',
  'gemini',
] as const

export type ObservationEngineId = (typeof OBSERVE_ENGINE_IDS)[number]

export const PROBED_WHEN_QUEUED = [
  'google_aio',
  'chat_gpt',
  'perplexity',
] as const satisfies readonly ObservationEngineId[]

export const NOT_PROBED_IN_SAMPLE = ['gemini'] as const satisfies readonly ObservationEngineId[]

export const GEMINI_UNMEASURED_REASON = 'not_probed_public_mini_v1' as const

export type GeminiUnmeasuredReason = typeof GEMINI_UNMEASURED_REASON

/**
 * Presence vocabulary for later fills. PR1 fixtures may only use pending and
 * unmeasured.
 */
export const OBSERVE_CELL_STATES = [
  'pending',
  'unmeasured',
  'cited',
  'invisible',
] as const

export type ObservationCellState = (typeof OBSERVE_CELL_STATES)[number]

export const FIXTURE_CELL_STATES = ['pending', 'unmeasured'] as const satisfies readonly ObservationCellState[]

export type FixtureCellState = (typeof FIXTURE_CELL_STATES)[number]

export type ObservationEngineRow = {
  engine: ObservationEngineId
  state: ObservationCellState
  reason?: GeminiUnmeasuredReason
}

export type ObservationCell = {
  context: string
  engine: ObservationEngineId
  state: ObservationCellState
  reason?: GeminiUnmeasuredReason
}

export type ObservationBoard = {
  engines: readonly ObservationEngineRow[]
  cells: readonly ObservationCell[]
}

export type ObservationJob = {
  job_id: string
  status: ObservationJobStatus
  brand_name: string
  brand_host?: string
  category: ObservationCategoryId
  contexts: readonly string[]
  board: ObservationBoard
}

/** Design alias. Same object the API returns. */
export type ObservationPayload = ObservationJob

export type ObservationJobCreateInput = {
  brand_name: string
  brand_host?: string
  category: ObservationCategoryId
  contexts: readonly string[]
  email?: string
}

export type ObservationJobCreateResponse = ObservationJob

export const FIXTURE_JOB_IDS = {
  design: 'obs_fixture_design',
} as const

export function isGemini(engine: ObservationEngineId): boolean {
  return engine === 'gemini'
}

export function engineLabel(engine: ObservationEngineId): string {
  switch (engine) {
    case 'google_aio':
      return 'Google AI Overviews'
    case 'chat_gpt':
      return 'ChatGPT'
    case 'perplexity':
      return 'Perplexity'
    case 'gemini':
      return 'Gemini'
  }
}

export function isFixtureAllowedState(state: ObservationCellState): state is FixtureCellState {
  return state === 'pending' || state === 'unmeasured'
}

export function assertPayloadHonesty(payload: ObservationJob): string[] {
  const errors: string[] = []
  const gemini = payload.board.engines.find((row) => isGemini(row.engine))

  if (!gemini) {
    errors.push('board must include a gemini engine row')
  } else {
    if (gemini.state !== 'unmeasured') {
      errors.push('gemini engine row must stay unmeasured')
    }
    if (gemini.reason !== GEMINI_UNMEASURED_REASON) {
      errors.push('gemini engine row must use not_probed_public_mini_v1')
    }
  }

  for (const row of payload.board.engines) {
    if (!isFixtureAllowedState(row.state)) {
      errors.push(`${row.engine} fixture state ${row.state} is not allowed`)
    }
    if ((NOT_PROBED_IN_SAMPLE as readonly string[]).includes(row.engine) && row.state !== 'unmeasured') {
      errors.push(`${row.engine} must stay unmeasured in this sample`)
    }
    if ((PROBED_WHEN_QUEUED as readonly string[]).includes(row.engine) && row.state !== 'pending') {
      errors.push(`${row.engine} fixture must stay pending`)
    }
  }

  for (const cell of payload.board.cells) {
    if (!isFixtureAllowedState(cell.state)) {
      errors.push(`${cell.engine} cell fixture state ${cell.state} is not allowed`)
    }
    if (isGemini(cell.engine)) {
      if (cell.state !== 'unmeasured' || cell.reason !== GEMINI_UNMEASURED_REASON) {
        errors.push(`gemini/${cell.context} must stay unmeasured with not_probed_public_mini_v1`)
      }
    } else if (cell.state !== 'pending') {
      errors.push(`${cell.engine} cell fixture must stay pending`)
    }
  }

  return errors
}

export function jobIsHonest(payload: ObservationJob): boolean {
  return assertPayloadHonesty(payload).length === 0
}

export function hasForbiddenFill(payload: ObservationJob): boolean {
  const states = [
    ...payload.board.engines.map((row) => row.state),
    ...payload.board.cells.map((cell) => cell.state),
  ]
  return states.some((state) => state === 'cited' || state === 'invisible')
}
