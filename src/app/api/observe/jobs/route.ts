import { NextResponse } from 'next/server'

import { identifierFromHeaders } from '@/lib/observation/rate-limit'
import { observationCreateSchema } from '@/lib/observation/schema'
import { createObservationJob } from '@/lib/observation/service'

/**
 * POST /api/observe/jobs
 *
 * Enqueue a public-mini observation. Returns job_id plus a queued board:
 * AIO, ChatGPT, and Perplexity pending; Gemini unmeasured_by_policy.
 * Does not call a probe. Site polls GET /api/observe/jobs/:jobId.
 */

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      {
        ok: false,
        code: 'VALIDATION_ERROR',
        message: 'Send a JSON object with brand_name, category, contexts, and consent.',
      },
      { status: 400 },
    )
  }

  const parsed = observationCreateSchema.safeParse(body)
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const field = issue.path[0]
      if (typeof field === 'string' && !fieldErrors[field]) fieldErrors[field] = issue.message
    }
    return NextResponse.json(
      {
        ok: false,
        code: 'VALIDATION_ERROR',
        message: 'Review the highlighted fields and try again.',
        fieldErrors,
      },
      { status: 400 },
    )
  }

  const result = await createObservationJob(parsed.data, {
    ip: identifierFromHeaders(request.headers),
  })

  if (!result.ok && result.code === 'RATE_LIMITED') {
    return NextResponse.json(
      { ok: false, code: result.code, message: result.message },
      {
        status: 429,
        headers: { 'retry-after': String(result.retryAfterSeconds) },
      },
    )
  }

  if (!result.ok) {
    return NextResponse.json(
      {
        ok: false,
        code: result.code,
        message: result.message,
        ...(result.fieldErrors ? { fieldErrors: result.fieldErrors } : {}),
      },
      { status: 400 },
    )
  }

  return NextResponse.json(
    { ok: true, job: result.job, payload: result.payload },
    { status: 201 },
  )
}
