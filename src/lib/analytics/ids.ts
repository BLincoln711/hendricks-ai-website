/**
 * Public measurement IDs. Empty, missing, or malformed values fail closed so
 * production cannot load a tag until Brandon sets a real ID in Vercel.
 *
 * Do not hardcode a G- measurement ID or a LinkedIn partner ID here.
 */

const GA_MEASUREMENT_ID = /^G-[A-Z0-9]+$/
const LINKEDIN_PARTNER_ID = /^\d+$/

export function parseGaMeasurementId(value: string | undefined | null): string | undefined {
  const trimmed = value?.trim()
  if (!trimmed) return undefined
  return GA_MEASUREMENT_ID.test(trimmed) ? trimmed : undefined
}

export function parseLinkedInPartnerId(value: string | undefined | null): string | undefined {
  const trimmed = value?.trim()
  if (!trimmed) return undefined
  return LINKEDIN_PARTNER_ID.test(trimmed) ? trimmed : undefined
}

export function readGaMeasurementId(): string | undefined {
  return parseGaMeasurementId(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID)
}

export function readLinkedInPartnerId(): string | undefined {
  return parseLinkedInPartnerId(process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID)
}
