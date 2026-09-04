import { describe, expect, it } from 'vitest'

import { POST } from '@/app/api/observe/jobs/route'
import { GET } from '@/app/api/observe/jobs/[jobId]/route'
import { GEMINI_UNMEASURED_REASON } from '@/lib/observation/contract'
import { sampleIntentsFor } from '@/lib/observation/parse'

const contexts = [...sampleIntentsFor('b2b-software')]

describe('POST /api/observe/jobs', () => {
  it('creates a queued job with the locked pending board', async () => {
    const response = await POST(
      new Request('http://localhost/api/observe/jobs', {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify({
          brand_name: 'Northwind',
          category: 'b2b-software',
          contexts,
        }),
      }),
    )

    expect(response.status).toBe(201)
    const job = (await response.json()) as {
      job_id: string
      status: string
      board: {
        engines: { engine: string; state: string; reason?: string }[]
        cells: { context: string; engine: string; state: string; reason?: string }[]
      }
    }

    expect(job.status).toBe('queued')
    expect(typeof job.job_id).toBe('string')
    expect(job.board.engines).toEqual([
      { engine: 'google_aio', state: 'pending' },
      { engine: 'chat_gpt', state: 'pending' },
      { engine: 'perplexity', state: 'pending' },
      { engine: 'gemini', state: 'unmeasured', reason: GEMINI_UNMEASURED_REASON },
    ])
    expect(job.board.cells).toHaveLength(16)
    expect(JSON.stringify(job)).not.toContain('cited')
    expect(JSON.stringify(job)).not.toContain('invisible')
  })

  it('rejects a JSON body without contexts', async () => {
    const response = await POST(
      new Request('http://localhost/api/observe/jobs', {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify({ brand_name: 'Northwind', category: 'b2b-software' }),
      }),
    )

    expect(response.status).toBe(400)
  })

  it('redirects a form post to /observe?job=', async () => {
    const body = new URLSearchParams({
      brand_name: 'Northwind',
      category: 'b2b-software',
    })

    const response = await POST(
      new Request('http://localhost/api/observe/jobs', {
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          accept: 'text/html',
        },
        body: body.toString(),
      }),
    )

    expect(response.status).toBe(303)
    const location = response.headers.get('location')
    expect(location).toMatch(/\/observe\?job=/)
  })
})

describe('GET /api/observe/jobs/:job_id', () => {
  it('returns the same pending job the create path issued', async () => {
    const created = await POST(
      new Request('http://localhost/api/observe/jobs', {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify({
          brand_name: 'Northwind',
          category: 'b2b-software',
          contexts,
        }),
      }),
    )
    const job = (await created.json()) as { job_id: string }

    const response = await GET(new Request(`http://localhost/api/observe/jobs/${job.job_id}`), {
      params: Promise.resolve({ jobId: job.job_id }),
    })

    expect(response.status).toBe(200)
    const polled = (await response.json()) as { job_id: string; status: string; board: { cells: unknown[] } }
    expect(polled.job_id).toBe(job.job_id)
    expect(polled.status).toBe('queued')
    expect(JSON.stringify(polled)).not.toContain('cited')
    expect(JSON.stringify(polled)).not.toContain('invisible')
  })

  it('returns 404 for an unknown job', async () => {
    const response = await GET(new Request('http://localhost/api/observe/jobs/obs_missing'), {
      params: Promise.resolve({ jobId: 'obs_missing' }),
    })
    expect(response.status).toBe(404)
  })
})
