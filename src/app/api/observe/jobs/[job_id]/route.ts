import { NextResponse } from 'next/server'

import { readObservationJob } from '@/lib/observation/service'

/**
 * GET /api/observe/jobs/:job_id
 *
 * Read-only poll. The queued board stays pending or unmeasured until Ultra
 * writes cells or a non-production FIXTURE=1 runner is invoked. This route
 * does not advance engines on its own.
 */

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(
  _request: Request,
  context: { params: Promise<{ job_id: string }> },
) {
  const { job_id } = await context.params
  const result = await readObservationJob(job_id)

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, code: result.code, message: result.message },
      { status: 404 },
    )
  }

  return NextResponse.json({ ok: true, job: result.job, payload: result.payload })
}
