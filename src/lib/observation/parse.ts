import { z } from 'zod'

import {
  OBSERVE_BRAND_DISPLAY_LIMIT,
  observationCategories,
  observationCategoryIds,
  sampleIntentsByCategory,
  type ObservationCategoryId,
} from '@/content/instruments/observation-data'
import type { ObservationJobCreateInput } from '@/lib/observation/contract'

/**
 * Parse the `/observe` query and the POST /api/observe/jobs body.
 *
 * Brand is visitor-typed and never forwarded to analytics. Category is a closed
 * list, so a slug may be reported. Contexts are required on the JSON body and
 * filled from the category templates on a form post. No probe is invoked here.
 */

const BrandSchema = z.string().trim().min(1).max(80)

const categoryValues = [
  observationCategoryIds[0],
  ...observationCategoryIds.slice(1),
] as [ObservationCategoryId, ...ObservationCategoryId[]]

const CategorySchema = z.enum(categoryValues)

const HostSchema = z
  .string()
  .trim()
  .min(1)
  .max(253)
  .refine((value) => !value.includes('://') && !value.includes(' '), 'host')

const EmailSchema = z.string().trim().email().max(254)

const ContextSchema = z.string().trim().min(1).max(200)

const ContextsSchema = z.array(ContextSchema).min(3).max(4)

export type ObservationQuery = {
  brand: string
  category: ObservationCategoryId
}

export type ObservationParse =
  | { status: 'idle' }
  | { status: 'invalid'; brand?: string; category?: string; errors: { brand?: string; category?: string } }
  | { status: 'queued'; query: ObservationQuery }

export type ObservationCreateParse =
  | { status: 'ok'; input: ObservationJobCreateInput }
  | { status: 'invalid'; errors: Record<string, string> }

function firstString(value: string | string[] | undefined): string | undefined {
  if (typeof value === 'string') return value
  if (Array.isArray(value)) return value[0]
  return undefined
}

export function parseObservationJobId(search: {
  job?: string | string[] | undefined
}): string | undefined {
  const job = firstString(search.job)
  return job && job.length > 0 ? job : undefined
}

export function parseObservationSearch(search: {
  brand?: string | string[] | undefined
  brand_name?: string | string[] | undefined
  category?: string | string[] | undefined
}): ObservationParse {
  const brandRaw = firstString(search.brand_name) ?? firstString(search.brand)
  const categoryRaw = firstString(search.category)
  const attempted = brandRaw !== undefined || categoryRaw !== undefined

  if (!attempted) return { status: 'idle' }

  const brandResult = BrandSchema.safeParse(brandRaw ?? '')
  const categoryResult = CategorySchema.safeParse(categoryRaw ?? '')
  const errors: { brand?: string; category?: string } = {
    ...(brandResult.success ? {} : { brand: 'brand' }),
    ...(categoryResult.success ? {} : { category: 'category' }),
  }

  if (!brandResult.success || !categoryResult.success) {
    return {
      status: 'invalid',
      ...(brandRaw ? { brand: brandRaw } : {}),
      ...(categoryRaw ? { category: categoryRaw } : {}),
      errors,
    }
  }

  return {
    status: 'queued',
    query: { brand: brandResult.data, category: categoryResult.data },
  }
}

function readContexts(value: unknown): unknown {
  if (Array.isArray(value)) return value
  if (typeof value === 'string') {
    return value
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
  }
  return value
}

export function parseObservationCreate(
  raw: Record<string, unknown>,
  options?: { fillContextsFromCategory?: boolean },
): ObservationCreateParse {
  const errors: Record<string, string> = {}
  const brandResult = BrandSchema.safeParse(raw.brand_name ?? raw.brand ?? '')
  const categoryResult = CategorySchema.safeParse(raw.category ?? '')
  const hostRaw = raw.brand_host
  const emailRaw = raw.email

  if (!brandResult.success) errors.brand_name = 'brand_name'
  if (!categoryResult.success) errors.category = 'category'

  let contexts = readContexts(raw.contexts)
  if (
    options?.fillContextsFromCategory &&
    categoryResult.success &&
    (!Array.isArray(contexts) || contexts.length === 0)
  ) {
    contexts = [...sampleIntentsByCategory[categoryResult.data]]
  }

  const contextsResult = ContextsSchema.safeParse(contexts)
  if (!contextsResult.success) errors.contexts = 'contexts'

  let brand_host: string | undefined
  if (typeof hostRaw === 'string' && hostRaw.trim().length > 0) {
    const hostResult = HostSchema.safeParse(hostRaw)
    if (!hostResult.success) errors.brand_host = 'brand_host'
    else brand_host = hostResult.data
  }

  if (typeof emailRaw === 'string' && emailRaw.trim().length > 0) {
    const emailResult = EmailSchema.safeParse(emailRaw)
    if (!emailResult.success) errors.email = 'email'
  }

  if (Object.keys(errors).length > 0 || !brandResult.success || !categoryResult.success || !contextsResult.success) {
    return { status: 'invalid', errors }
  }

  return {
    status: 'ok',
    input: {
      brand_name: brandResult.data,
      category: categoryResult.data,
      contexts: contextsResult.data,
      ...(brand_host ? { brand_host } : {}),
    },
  }
}

export function displayBrand(brand: string): { display: string; full: string } {
  const full = brand.trim()
  if (full.length <= OBSERVE_BRAND_DISPLAY_LIMIT) return { display: full, full }
  return { display: `${full.slice(0, OBSERVE_BRAND_DISPLAY_LIMIT - 3)}...`, full }
}

export function categoryLabel(id: ObservationCategoryId): string {
  return observationCategories.find((category) => category.id === id)?.label ?? id
}

export function sampleIntentsFor(id: ObservationCategoryId): readonly string[] {
  return sampleIntentsByCategory[id]
}
