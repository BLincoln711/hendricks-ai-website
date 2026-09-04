import { describe, expect, it } from 'vitest'

import {
  GEMINI_UNMEASURED_REASON,
  PROBED_WHEN_QUEUED,
  assertPayloadHonesty,
  hasForbiddenFill,
} from '@/lib/observation/contract'
import {
  createObservationJob,
  designObservationFixture,
  getObservationJob,
  partialObservationFixture,
} from '@/lib/observation/jobs'
import { parseObservationCreate, sampleIntentsFor } from '@/lib/observation/parse'

const contexts = [...sampleIntentsFor('b2b-software')]

describe('createObservationJob', () => {
  it('returns a queued job with a client-visible job_id and Gemini unmeasured from first paint', () => {
    const job = createObservationJob({
      brand_name: 'Northwind',
      category: 'b2b-software',
      contexts,
    })

    expect(job.status).toBe('queued')
    expect(job.job_id.startsWith('obs_v1.')).toBe(true)
    expect(job.brand_name).toBe('Northwind')
    expect(job.contexts).toEqual(contexts)
    expect(job.board.engines.map((row) => row.engine)).toEqual([
      'google_aio',
      'chat_gpt',
      'perplexity',
      'gemini',
    ])
    expect(job.board.engines[0]).toEqual({ engine: 'google_aio', state: 'pending' })
    expect(job.board.engines[1]).toEqual({ engine: 'chat_gpt', state: 'pending' })
    expect(job.board.engines[2]).toEqual({ engine: 'perplexity', state: 'pending' })
    expect(job.board.engines[3]).toEqual({
      engine: 'gemini',
      state: 'unmeasured',
      reason: GEMINI_UNMEASURED_REASON,
    })

    expect(job.board.cells).toHaveLength(contexts.length * 4)
    for (const context of contexts) {
      for (const engine of PROBED_WHEN_QUEUED) {
        expect(job.board.cells.find((cell) => cell.context === context && cell.engine === engine)).toEqual({
          context,
          engine,
          state: 'pending',
        })
      }
      expect(job.board.cells.find((cell) => cell.context === context && cell.engine === 'gemini')).toEqual({
        context,
        engine: 'gemini',
        state: 'unmeasured',
        reason: GEMINI_UNMEASURED_REASON,
      })
    }

    expect(job).not.toHaveProperty('email')
    expect(assertPayloadHonesty(job)).toEqual([])
    expect(hasForbiddenFill(job)).toBe(false)
  })

  it('does not persist email on the job or in the reconstructed poll payload', () => {
    const job = createObservationJob({
      brand_name: 'Northwind',
      category: 'b2b-software',
      contexts,
      email: 'person@example.com',
    })

    expect(JSON.stringify(job)).not.toContain('person@example.com')
    expect(JSON.stringify(getObservationJob(job.job_id))).not.toContain('person@example.com')
  })
})

describe('getObservationJob', () => {
  it('reconstructs the same pending board from the job_id', () => {
    const created = createObservationJob({
      brand_name: 'Northwind',
      brand_host: 'northwind.example',
      category: 'industrial',
      contexts: [...sampleIntentsFor('industrial')],
    })

    const polled = getObservationJob(created.job_id)
    expect(polled).not.toBeNull()
    if (!polled) return
    expect(polled.job_id).toBe(created.job_id)
    expect(polled.status).toBe('queued')
    expect(polled.brand_host).toBe('northwind.example')
    expect(assertPayloadHonesty(polled)).toEqual([])
  })

  it('returns null for an unknown id', () => {
    expect(getObservationJob('obs_unknown')).toBeNull()
  })
})

describe('fixtures', () => {
  it('exports a typed design payload with only pending and unmeasured cells', () => {
    expect(designObservationFixture.status).toBe('queued')
    expect(assertPayloadHonesty(designObservationFixture)).toEqual([])
    expect(hasForbiddenFill(designObservationFixture)).toBe(false)
    expect(JSON.stringify(designObservationFixture)).not.toContain('cited')
    expect(JSON.stringify(designObservationFixture)).not.toContain('invisible')
  })

  it('allows partial chrome without settling engines to cited or invisible', () => {
    expect(partialObservationFixture.status).toBe('partial')
    expect(assertPayloadHonesty(partialObservationFixture)).toEqual([])
    expect(hasForbiddenFill(partialObservationFixture)).toBe(false)
    expect(partialObservationFixture.board.engines.every((row) => row.state !== 'cited')).toBe(true)
    expect(partialObservationFixture.board.engines.every((row) => row.state !== 'invisible')).toBe(true)
  })
})

describe('parseObservationCreate', () => {
  it('requires three to four contexts on the JSON body', () => {
    const missing = parseObservationCreate({
      brand_name: 'Northwind',
      category: 'b2b-software',
    })
    expect(missing.status).toBe('invalid')

    const two = parseObservationCreate({
      brand_name: 'Northwind',
      category: 'b2b-software',
      contexts: ['one', 'two'],
    })
    expect(two.status).toBe('invalid')

    const ok = parseObservationCreate({
      brand_name: 'Northwind',
      category: 'b2b-software',
      contexts,
    })
    expect(ok.status).toBe('ok')
  })

  it('fills contexts from the category on a form post', () => {
    const parsed = parseObservationCreate(
      { brand_name: 'Northwind', category: 'b2b-software' },
      { fillContextsFromCategory: true },
    )
    expect(parsed.status).toBe('ok')
    if (parsed.status === 'ok') {
      expect(parsed.input.contexts).toEqual(contexts)
    }
  })
})
