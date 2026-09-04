import { sampleIntentsByCategory, type ObservationCategoryId } from '@/content/instruments/observation-data'
import {
  FIXTURE_JOB_IDS,
  GEMINI_UNMEASURED_REASON,
  PROBED_WHEN_QUEUED,
  type ObservationBoard,
  type ObservationCell,
  type ObservationEngineRow,
  type ObservationJob,
  type ObservationJobCreateInput,
  type ObservationJobStatus,
  type ObservationPayload,
} from '@/lib/observation/contract'

/**
 * Job create and poll for the observe shell.
 *
 * Visitor jobs are self-describing queued payloads. Poll reconstructs the same
 * pending board. Fixtures may only drive pending or unmeasured cells. Gemini is
 * always unmeasured with reason not_probed_public_mini_v1. Email is accepted on
 * create and is not stored in the job id or returned.
 */

const JOB_PREFIX = 'obs_v1.'

type EncodedJob = {
  brand_name: string
  brand_host?: string
  category: ObservationCategoryId
  contexts: string[]
  createdAt: string
}

export function queuedBoard(contexts: readonly string[]): ObservationBoard {
  const engines: ObservationEngineRow[] = [
    { engine: 'google_aio', state: 'pending' },
    { engine: 'chat_gpt', state: 'pending' },
    { engine: 'perplexity', state: 'pending' },
    { engine: 'gemini', state: 'unmeasured', reason: GEMINI_UNMEASURED_REASON },
  ]

  const cells: ObservationCell[] = []
  for (const context of contexts) {
    for (const engine of PROBED_WHEN_QUEUED) {
      cells.push({ context, engine, state: 'pending' })
    }
    cells.push({
      context,
      engine: 'gemini',
      state: 'unmeasured',
      reason: GEMINI_UNMEASURED_REASON,
    })
  }

  return { engines, cells }
}

export function defaultContextsFor(category: ObservationCategoryId): string[] {
  return [...sampleIntentsByCategory[category]]
}

export function queuedJob(
  jobId: string,
  input: Omit<ObservationJobCreateInput, 'email'>,
  status: ObservationJobStatus = 'queued',
): ObservationJob {
  return {
    job_id: jobId,
    status,
    brand_name: input.brand_name,
    ...(input.brand_host ? { brand_host: input.brand_host } : {}),
    category: input.category,
    contexts: [...input.contexts],
    board: queuedBoard(input.contexts),
  }
}

export function encodeJobId(job: EncodedJob): string {
  return `${JOB_PREFIX}${Buffer.from(JSON.stringify(job), 'utf8').toString('base64url')}`
}

export function decodeJobId(jobId: string): EncodedJob | null {
  if (!jobId.startsWith(JOB_PREFIX)) return null
  try {
    const parsed = JSON.parse(Buffer.from(jobId.slice(JOB_PREFIX.length), 'base64url').toString('utf8')) as EncodedJob
    if (!parsed.brand_name || !parsed.category || !Array.isArray(parsed.contexts) || !parsed.createdAt) {
      return null
    }
    if (parsed.contexts.length < 3 || parsed.contexts.length > 4) return null
    return parsed
  } catch {
    return null
  }
}

export function createObservationJob(
  input: ObservationJobCreateInput,
  now = new Date(),
): ObservationJob {
  const createdAt = now.toISOString()
  const encoded: EncodedJob = {
    brand_name: input.brand_name,
    category: input.category,
    contexts: [...input.contexts],
    createdAt,
    ...(input.brand_host ? { brand_host: input.brand_host } : {}),
  }
  const job_id = encodeJobId(encoded)
  return queuedJob(job_id, input)
}

/**
 * Design fixture. Lets the board render without a live run. Every probed cell
 * is pending. Gemini is unmeasured. No cited or invisible cells.
 */
export const designObservationFixture: ObservationPayload = queuedJob(
  FIXTURE_JOB_IDS.design,
  {
    brand_name: 'Sample Brand',
    category: 'b2b-software',
    contexts: defaultContextsFor('b2b-software'),
  },
)

/**
 * Partial-complete chrome only. Status may read partial so Design can render
 * that enum. Cells stay pending or unmeasured. Engines do not settle to cited
 * or invisible.
 */
export const partialObservationFixture: ObservationPayload = queuedJob(
  'obs_fixture_partial',
  {
    brand_name: 'Sample Brand',
    category: 'professional-services',
    contexts: defaultContextsFor('professional-services'),
  },
  'partial',
)

export function getObservationJob(jobId: string): ObservationJob | null {
  if (jobId === FIXTURE_JOB_IDS.design) return designObservationFixture
  if (jobId === partialObservationFixture.job_id) return partialObservationFixture

  const decoded = decodeJobId(jobId)
  if (!decoded) return null
  return queuedJob(jobId, {
    brand_name: decoded.brand_name,
    category: decoded.category,
    contexts: decoded.contexts,
    ...(decoded.brand_host ? { brand_host: decoded.brand_host } : {}),
  })
}

export {
  assertPayloadHonesty,
  hasForbiddenFill,
  jobIsHonest,
} from '@/lib/observation/contract'
