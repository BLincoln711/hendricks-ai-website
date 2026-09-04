import { beforeEach, describe, expect, it } from 'vitest'

import { POST as createJob } from '@/app/api/observe/jobs/route'
import { GET as pollJob } from '@/app/api/observe/jobs/[job_id]/route'
import {
  competitorsObservedInAnswers,
  shortlistFromObservation,
} from '@/lib/observation/citations'
import { classifyProbeOutcome, geminiPublicMiniRow } from '@/lib/observation/classify'
import { disclosure } from '@/lib/observation/copy'
import { filledCellsFor } from '@/lib/observation/filled-fixture'
import {
  observeCreatePath,
  observeDisclaimer,
  observeEnginesRequested,
  observeGeminiLock,
  observeQueueHook,
} from '@/lib/observation/handshake'
import { pendingCellsFor } from '@/lib/observation/pending-fixture'
import {
  observationCreateSchema,
  observationWorkerWriteSchema,
  type ObservationCell,
} from '@/lib/observation/schema'
import {
  createObservationJob,
  readObservationJob,
  runObservationJob,
} from '@/lib/observation/service'
import { resetObservationStoreForTests } from '@/lib/observation/store'
import { resolveRunnerMode } from '@/lib/observation/worker'
import { resetMemoryStoreForTests } from '@/lib/forms/shared-store'

import pendingFixtureJson from '@/content/instruments/observation-pending-fixture.json'

const contexts = [
  'Which platform should a mid-market operations team use in this category?',
  'Who should a buyer shortlist for this category this quarter?',
  'What should a first-time buyer compare before choosing a vendor in this category?',
]

const createInput = {
  brand_name: 'Northwind',
  brand_host: 'northwind.example',
  category: 'b2b-software',
  contexts,
  consent: true as const,
}

beforeEach(() => {
  resetObservationStoreForTests()
  resetMemoryStoreForTests()
})

describe('observation handshake', () => {
  it('locks the Site create and poll paths and the three requested engines', () => {
    expect(observeCreatePath).toBe('/api/observe/jobs')
    expect(observeQueueHook.pollPath).toBe('/api/observe/jobs/:job_id')
    expect(observeEnginesRequested).toEqual(['google_aio', 'chat_gpt', 'perplexity'])
    expect(observeEnginesRequested).not.toContain('gemini')
    expect(observeDisclaimer).toBe(disclosure.sample)
    expect(observeGeminiLock).toEqual(geminiPublicMiniRow())
  })
})

describe('create and poll', () => {
  it('returns a pending board then a terminal unmeasured board', async () => {
    const created = await createObservationJob(createInput)
    expect(created.ok).toBe(true)
    if (!created.ok) return

    expect(created.job.status).toBe('queued')
    expect(created.job.engines_requested).toEqual(['google_aio', 'chat_gpt', 'perplexity'])
    expect(created.payload.cells.every((cell) => cell.state === 'pending')).toBe(true)
    expect(created.payload.gemini_row).toEqual(geminiPublicMiniRow())
    expect(created.payload.disclaimer).toBe(disclosure.sample)

    const pending = await readObservationJob(created.job.job_id)
    expect(pending.ok).toBe(true)
    if (!pending.ok) return
    expect(pending.job.status).toBe('queued')
    expect(pending.payload.cells.every((cell) => cell.state === 'pending')).toBe(true)

    const ran = await runObservationJob(created.job.job_id)
    expect(ran.ok).toBe(true)
    if (!ran.ok) return
    expect(['complete', 'partial']).toContain(ran.job.status)
    expect(ran.payload.finished_at).toBeDefined()
    expect(ran.payload.cells.every((cell) => cell.state === 'unmeasured')).toBe(true)
    expect(ran.payload.cells.every((cell) => cell.error === 'worker_unavailable')).toBe(true)
    expect(ran.payload.cells.some((cell) => cell.state === 'cited')).toBe(false)
    expect(ran.payload.cells.some((cell) => cell.state === 'invisible')).toBe(false)
    expect(ran.payload.gemini_row.state).toBe('unmeasured')
    expect(ran.payload.gemini_row.reason).toBe('not_probed_public_mini_v1')

    const terminal = await readObservationJob(created.job.job_id)
    expect(terminal.ok).toBe(true)
    if (!terminal.ok) return
    expect(terminal.payload.finished_at).toBeDefined()
    expect(terminal.payload.cells.every((cell) => cell.state === 'unmeasured')).toBe(true)
  })

  it('keeps Gemini unmeasured_by_policy from the first paint through the runner', async () => {
    const created = await createObservationJob(createInput)
    expect(created.ok).toBe(true)
    if (!created.ok) return

    expect(created.payload.gemini_row.policy).toBe('unmeasured_by_policy')
    expect(created.payload.gemini_row.reason).toBe('not_probed_public_mini_v1')
    expect(created.payload.cells.some((cell) => cell.engine === 'gemini')).toBe(false)

    const ran = await runObservationJob(created.job.job_id, { fixture: true })
    expect(ran.ok).toBe(true)
    if (!ran.ok) return
    expect(ran.payload.gemini_row).toEqual(geminiPublicMiniRow())
    expect(ran.payload.cells.some((cell) => cell.engine === 'gemini')).toBe(false)
  })
})

describe('fixtures', () => {
  it('loads a pending fixture with no cited or invisible cells', () => {
    const cells = pendingCellsFor(contexts)
    expect(cells).toHaveLength(9)
    expect(cells.every((cell) => cell.state === 'pending')).toBe(true)
    expect(pendingFixtureJson.status).toBe('queued')
    expect(pendingFixtureJson.gemini_row.state).toBe('unmeasured')
    expect(JSON.stringify(pendingFixtureJson)).not.toMatch(/"state":"(cited|invisible)"/)
  })

  it('loads the filled fixture only on an explicit non-production FIXTURE path', async () => {
    expect(resolveRunnerMode({})).toBe('unmeasured')
    expect(resolveRunnerMode({ fixture: true, treatAsProduction: true })).toBe('unmeasured')
    expect(resolveRunnerMode({ fixture: true, treatAsProduction: false })).toBe('fixture')

    const created = await createObservationJob(createInput)
    expect(created.ok).toBe(true)
    if (!created.ok) return

    const filled = await runObservationJob(created.job.job_id, {
      fixture: true,
      treatAsProduction: false,
    })
    expect(filled.ok).toBe(true)
    if (!filled.ok) return
    expect(filled.payload.method).toBe('fixture_public_mini_v1')
    expect(filled.payload.disclaimer).toContain('Not a client result')
    expect(filled.payload.cells.some((cell) => cell.state === 'cited')).toBe(true)
    expect(filled.payload.cells.some((cell) => cell.state === 'invisible')).toBe(true)
    expect(filled.payload.gemini_row.state).toBe('unmeasured')

    const spec = filledCellsFor(contexts, 'northwind.example')
    expect(spec.some((cell) => cell.state === 'cited')).toBe(true)
  })
})

describe('classifyProbeOutcome', () => {
  it('maps error, timeout, missing sources, and a missing AIO block to unmeasured', () => {
    expect(classifyProbeOutcome({ engine: 'chat_gpt', ok: false, error: '40100' })).toEqual({
      state: 'unmeasured',
      error: '40100',
    })
    expect(classifyProbeOutcome({ engine: 'perplexity', ok: true, timedOut: true })).toEqual({
      state: 'unmeasured',
      error: 'probe_timeout',
    })
    expect(classifyProbeOutcome({ engine: 'chat_gpt', ok: true, sourceUrls: [] })).toEqual({
      state: 'unmeasured',
      error: 'no_source_list',
    })
    expect(
      classifyProbeOutcome({
        engine: 'google_aio',
        ok: true,
        aioPresent: false,
        sourceUrls: ['https://example.com'],
      }),
    ).toEqual({ state: 'unmeasured', error: 'no_aio_block' })
  })

  it('maps a successful source list without the brand to invisible, and a brand host hit to cited', () => {
    expect(
      classifyProbeOutcome({
        engine: 'chat_gpt',
        ok: true,
        sourceUrls: ['https://example.com/guide'],
        brandHost: 'northwind.example',
      }),
    ).toEqual({
      state: 'invisible',
      cited_urls: ['https://example.com/guide'],
    })

    expect(
      classifyProbeOutcome({
        engine: 'perplexity',
        ok: true,
        sourceUrls: ['https://northwind.example/page', 'https://example.com/guide'],
        brandHost: 'northwind.example',
      }),
    ).toMatchObject({ state: 'cited' })
  })
})

describe('citation does not become a shortlist', () => {
  it('exposes a helper that never promotes a citation', () => {
    const cells: ObservationCell[] = [
      {
        context: contexts[0] ?? 'context',
        engine: 'perplexity',
        state: 'cited',
        cited_urls: ['https://northwind.example/page', 'https://example.com/guide'],
      },
    ]

    expect(shortlistFromObservation(cells)).toEqual([])
    expect(competitorsObservedInAnswers(cells, 'northwind.example')).toEqual(['example.com'])
    expect(competitorsObservedInAnswers([], 'northwind.example')).toEqual([])
  })
})

describe('create schema', () => {
  it('requires consent and three to four contexts', () => {
    expect(observationCreateSchema.safeParse({ ...createInput, consent: false }).success).toBe(
      false,
    )
    expect(
      observationCreateSchema.safeParse({ ...createInput, contexts: contexts.slice(0, 2) })
        .success,
    ).toBe(false)
    expect(observationCreateSchema.safeParse(createInput).success).toBe(true)
  })

  it('rejects worker writes that name Gemini or a shortlist state', () => {
    expect(
      observationWorkerWriteSchema.safeParse({
        cells: [{ context: contexts[0], engine: 'gemini', state: 'cited' }],
      }).success,
    ).toBe(false)
    expect(
      observationWorkerWriteSchema.safeParse({
        cells: [{ context: contexts[0], engine: 'chat_gpt', state: 'shortlisted' }],
      }).success,
    ).toBe(false)
  })
})

describe('API routes', () => {
  it('creates through POST and polls the same pending payload through GET', async () => {
    const request = new Request('http://localhost/api/observe/jobs', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(createInput),
    })

    const created = await createJob(request)
    expect(created.status).toBe(201)
    const body = (await created.json()) as {
      ok: boolean
      job: { job_id: string; status: string }
      payload: { cells: ObservationCell[]; gemini_row: { state: string; reason: string } }
    }
    expect(body.ok).toBe(true)
    expect(body.job.status).toBe('queued')
    expect(body.payload.cells.every((cell) => cell.state === 'pending')).toBe(true)
    expect(body.payload.gemini_row.reason).toBe('not_probed_public_mini_v1')

    const polled = await pollJob(new Request(`http://localhost/api/observe/jobs/${body.job.job_id}`), {
      params: Promise.resolve({ job_id: body.job.job_id }),
    })
    expect(polled.status).toBe(200)
    const pollBody = (await polled.json()) as { payload: { cells: ObservationCell[] } }
    expect(pollBody.payload.cells.every((cell) => cell.state === 'pending')).toBe(true)
  })
})
