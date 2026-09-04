import { NextResponse } from 'next/server'

import { observationWorkerWriteSchema } from '@/lib/observation/schema'
import {
  workerSecretMatches,
  workerWriteConfigured,
  writeObservationCells,
} from '@/lib/observation/service'

/**
 * POST /api/observe/jobs/:jobId/cells
 *
 * Ultra write path. The Next app does not hold DataForSEO keys. Ultra probes
 * off-box and posts grain-only cell updates. Absent OBSERVE_WORKER_SECRET,
 * this route refuses. Gemini cannot be written as cited or invisible.
 */

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(
  request: Request,
  context: { params: Promise<{ jobId: string }> },
) {
  if (!workerWriteConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        code: 'WORKER_UNAVAILABLE',
        message: 'The observation worker is not configured.',
      },
      { status: 503 },
    )
  }

  if (!workerSecretMatches(request.headers.get('authorization'))) {
    return NextResponse.json(
      { ok: false, code: 'UNAUTHORIZED', message: 'Worker authorization failed.' },
      { status: 401 },
    )
  }

  const { jobId } = await context.params

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { ok: false, code: 'VALIDATION_ERROR', message: 'Send a JSON object of cell updates.' },
      { status: 400 },
    )
  }

  const parsed = observationWorkerWriteSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        code: 'VALIDATION_ERROR',
        message: 'Cell updates must use cited, invisible, unmeasured, pending, or reading.',
      },
      { status: 400 },
    )
  }

  const result = await writeObservationCells(jobId, parsed.data)
  if (!result.ok) {
    const status =
      result.code === 'NOT_FOUND' ? 404 : result.code === 'WORKER_UNAVAILABLE' ? 503 : 400
    return NextResponse.json(
      { ok: false, code: result.code, message: result.message },
      { status },
    )
  }

  return NextResponse.json({ ok: true, job: result.job, payload: result.payload })
}
