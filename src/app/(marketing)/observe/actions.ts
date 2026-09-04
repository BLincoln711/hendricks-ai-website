'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { routes } from '@/config/routes'
import { guardPublicObserveCreate } from '@/lib/observation/public-abuse'
import { isObservationCategoryId, sampleIntentsFor } from '@/lib/observation/parse'
import { identifierFromHeaders } from '@/lib/observation/rate-limit'
import { observationCreateSchema } from '@/lib/observation/schema'
import { createObservationJob } from '@/lib/observation/service'

/**
 * No-JavaScript create path. The interactive form posts JSON to
 * `observeCreatePath`. This action calls the same service so a visitor
 * without script still reaches `/observe?job=`.
 */

function retryUrl(brand: string, category: string): string {
  const params = new URLSearchParams()
  if (brand) params.set('brand', brand)
  if (category) params.set('category', category)
  const query = params.toString()
  return query ? `${routes.observe.path}?${query}` : routes.observe.path
}

export async function queueObservation(formData: FormData): Promise<void> {
  const brand_name = String(formData.get('brand_name') ?? '')
  const category = String(formData.get('category') ?? '')
  const token = String(formData.get('turnstileToken') ?? '')

  if (
    !(
      await guardPublicObserveCreate({
        honeypot: String(formData.get('honeypot') ?? ''),
        startedAt: Number(formData.get('startedAt') ?? 0),
        ...(token ? { turnstileToken: token } : {}),
      })
    ).ok
  ) {
    redirect(retryUrl(brand_name, category))
  }

  const contexts = isObservationCategoryId(category) ? [...sampleIntentsFor(category)] : []

  const parsed = observationCreateSchema.safeParse({
    brand_name,
    category,
    contexts,
    consent: true,
  })

  if (!parsed.success) {
    redirect(retryUrl(brand_name, category))
  }

  const result = await createObservationJob(parsed.data, {
    ip: identifierFromHeaders(await headers()),
  })

  if (!result.ok) {
    redirect(retryUrl(brand_name, category))
  }

  redirect(`${routes.observe.path}?job=${encodeURIComponent(result.job.job_id)}`)
}
