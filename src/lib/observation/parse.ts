import { z } from 'zod'

import {
  OBSERVE_BRAND_DISPLAY_LIMIT,
  observationCategories,
  observationCategoryIds,
  sampleIntentsByCategory,
  type ObservationCategoryId,
} from '@/content/instruments/observation-data'

/**
 * Parse the `/observe` query. GET so the queued state works without JavaScript.
 *
 * Brand is visitor-typed and never forwarded to analytics. Category is a closed
 * list, so a slug may be reported. No probe is invoked here.
 */

const BrandSchema = z
  .string()
  .trim()
  .min(1)
  .max(80)

const categoryValues = [
  observationCategoryIds[0],
  ...observationCategoryIds.slice(1),
] as [ObservationCategoryId, ...ObservationCategoryId[]]

const CategorySchema = z.enum(categoryValues)

export type ObservationQuery = {
  brand: string
  category: ObservationCategoryId
}

export type ObservationParse =
  | { status: 'idle' }
  | { status: 'invalid'; brand?: string; category?: string; errors: { brand?: string; category?: string } }
  | { status: 'queued'; query: ObservationQuery }

function firstString(value: string | string[] | undefined): string | undefined {
  if (typeof value === 'string') return value
  if (Array.isArray(value)) return value[0]
  return undefined
}

export function parseObservationSearch(search: {
  brand?: string | string[] | undefined
  category?: string | string[] | undefined
}): ObservationParse {
  const brandRaw = firstString(search.brand)
  const categoryRaw = firstString(search.category)
  const attempted = brandRaw !== undefined || categoryRaw !== undefined

  if (!attempted) return { status: 'idle' }

  const brandResult = BrandSchema.safeParse(brandRaw ?? '')
  const categoryResult = CategorySchema.safeParse(categoryRaw ?? '')
  const errors: { brand?: string; category?: string } = {}

  if (!brandResult.success) errors.brand = 'brand'
  if (!categoryResult.success) errors.category = 'category'

  if (errors.brand || errors.category) {
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
