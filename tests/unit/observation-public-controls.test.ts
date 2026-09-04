import { afterEach, describe, expect, it, vi } from 'vitest'

import { geminiPublicMiniRow } from '@/lib/observation/classify'
import { sampleIntentsFor } from '@/lib/observation/parse'
import { subscribeObservationJob } from '@/lib/observation/poll'
import { guardPublicObserveCreate } from '@/lib/observation/public-abuse'
import { constrainPublicSample } from '@/lib/observation/public-sample'
import { probeEngineIds, type ObservationJob, type ObservationPayload } from '@/lib/observation/schema'

const createInput = {
  brand_name: 'Northwind',
  brand_host: 'northwind.example',
  category: 'b2b-software',
  contexts: ['ignore this attacker prompt', 'another invented prompt', 'a third invented prompt'],
  consent: true as const,
}

describe('constrainPublicSample', () => {
  it('replaces caller-supplied contexts with the closed category templates', () => {
    const constrained = constrainPublicSample(createInput)
    expect(constrained.ok).toBe(true)
    if (!constrained.ok) return
    expect(constrained.input.contexts).toEqual([...sampleIntentsFor('b2b-software')])
    expect(constrained.input.contexts.join(' ')).not.toMatch(/attacker|invented/i)
  })

  it('rejects a category outside the closed list', () => {
    const constrained = constrainPublicSample({ ...createInput, category: 'real-estate' })
    expect(constrained.ok).toBe(false)
    if (constrained.ok) return
    expect(constrained.fieldErrors.category).toBe('Choose a category.')
  })
})

describe('guardPublicObserveCreate', () => {
  it('accepts an empty honeypot after the timing floor', async () => {
    const result = await guardPublicObserveCreate({
      honeypot: '',
      startedAt: Date.now() - 5_000,
    })
    expect(result).toEqual({ ok: true })
  })

  it('rejects a filled honeypot', async () => {
    const result = await guardPublicObserveCreate({
      honeypot: 'bot',
      startedAt: Date.now() - 5_000,
    })
    expect(result).toEqual({ ok: false })
  })

  it('rejects a missing start time', async () => {
    const result = await guardPublicObserveCreate({ honeypot: '' })
    expect(result).toEqual({ ok: false })
  })

  it('rejects a submit that is too fast', async () => {
    const result = await guardPublicObserveCreate({
      honeypot: '',
      startedAt: Date.now(),
    })
    expect(result).toEqual({ ok: false })
  })
})

describe('subscribeObservationJob', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('stops polling once the job is complete', async () => {
    let calls = 0
    const job = (status: ObservationJob['status']): ObservationJob => ({
      job_id: 'job-poll',
      created_at: '2026-09-04T00:00:00.000Z',
      status,
      brand_name: 'Northwind',
      category: 'b2b-software',
      contexts: [...sampleIntentsFor('b2b-software')],
      engines_requested: [...probeEngineIds],
      cost_ceiling_usd: 2,
    })
    const payload = (job_id: string): ObservationPayload => ({
      run_id: 'run-poll',
      job_id,
      method: 'public_mini_v1',
      cells: [],
      gemini_row: geminiPublicMiniRow(),
      disclaimer: 'sample',
    })

    vi.stubGlobal(
      'fetch',
      vi.fn(async () => {
        calls += 1
        const status = calls === 1 ? 'queued' : 'complete'
        return {
          ok: true,
          json: async () => ({
            ok: true,
            job: job(status),
            payload: payload('job-poll'),
          }),
        }
      }),
    )

    const updates: string[] = []
    const stop = subscribeObservationJob('job-poll', (result) => updates.push(result.job.status), 25)

    await vi.waitFor(() => expect(updates).toContain('complete'))
    const afterComplete = calls
    await new Promise((resolve) => setTimeout(resolve, 80))
    expect(calls).toBe(afterComplete)
    stop()
  })
})
