import { NextResponse } from 'next/server'

import { getObservationJob } from '@/lib/observation/jobs'

/**
 * GET /api/observe/jobs/:job_id
 *
 * Poll stub. PR1 always returns the queued pending board, or the design
 * fixture, still pending or unmeasured. No cited or invisible fills.
 */

export const dynamic = 'force-dynamic'

export async function GET(
  _request: Request,
  context: { params: Promise<{ jobId: string }> },
) {
  const { jobId } = await context.params
  const job = getObservationJob(jobId)

  if (!job) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }

  return NextResponse.json(job)
}
