import { NextResponse } from 'next/server'

import { createObservationJob } from '@/lib/observation/jobs'
import { parseObservationCreate } from '@/lib/observation/parse'

/**
 * POST /api/observe/jobs
 *
 * Creates a queued observation job and returns the pending board. No probe is
 * called. Gemini is unmeasured with reason not_probed_public_mini_v1. Form posts
 * redirect to /observe?job= so the page works without JavaScript.
 */

export const dynamic = 'force-dynamic'

function isFormContentType(contentType: string): boolean {
  return (
    contentType.includes('application/x-www-form-urlencoded') ||
    contentType.includes('multipart/form-data')
  )
}

function wantsHtml(request: Request, contentType: string): boolean {
  const accept = request.headers.get('accept') ?? ''
  if (isFormContentType(contentType)) return !accept.includes('application/json')
  return accept.includes('text/html') && !accept.includes('application/json')
}

async function readBody(request: Request): Promise<{
  raw: Record<string, unknown>
  contentType: string
  fillContextsFromCategory: boolean
}> {
  const contentType = request.headers.get('content-type') ?? ''

  if (isFormContentType(contentType)) {
    const form = await request.formData()
    const raw: Record<string, unknown> = {}
    const contexts: string[] = []

    for (const [key, value] of form.entries()) {
      if (typeof value !== 'string') continue
      if (key === 'contexts' || key === 'contexts[]') {
        if (value.trim()) contexts.push(value)
        continue
      }
      raw[key] = value
    }

    if (contexts.length > 0) raw.contexts = contexts
    return { raw, contentType, fillContextsFromCategory: true }
  }

  const body = (await request.json()) as unknown
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { raw: {}, contentType, fillContextsFromCategory: false }
  }
  return { raw: body as Record<string, unknown>, contentType, fillContextsFromCategory: false }
}

export async function POST(request: Request) {
  let parsedBody: Awaited<ReturnType<typeof readBody>>
  try {
    parsedBody = await readBody(request)
  } catch {
    return NextResponse.json({ error: 'invalid_body' }, { status: 400 })
  }

  const parsed = parseObservationCreate(parsedBody.raw, {
    fillContextsFromCategory: parsedBody.fillContextsFromCategory,
  })

  if (parsed.status === 'invalid') {
    if (wantsHtml(request, parsedBody.contentType)) {
      const retry = new URL('/observe', request.url)
      const brand = parsedBody.raw.brand_name ?? parsedBody.raw.brand
      const category = parsedBody.raw.category
      if (typeof brand === 'string') retry.searchParams.set('brand', brand)
      if (typeof category === 'string') retry.searchParams.set('category', category)
      return NextResponse.redirect(retry, 303)
    }
    return NextResponse.json({ error: 'invalid_input', fields: parsed.errors }, { status: 400 })
  }

  const job = createObservationJob(parsed.input)

  if (wantsHtml(request, parsedBody.contentType)) {
    const next = new URL('/observe', request.url)
    next.searchParams.set('job', job.job_id)
    return NextResponse.redirect(next, 303)
  }

  return NextResponse.json(job, { status: 201 })
}
