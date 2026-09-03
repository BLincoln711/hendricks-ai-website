import 'server-only'

import { redactUrl } from '@/lib/analytics/url-allowlist'
import { attributionInputSchema, type AttributionInput } from '@/lib/forms/lead-schema'

/**
 * Attribution stored with a lead (docs/07 section 6, 15 section 4).
 *
 * Two sources, merged server-side. The request itself always carries the
 * current page and its query, because a server action posts to the page the
 * form is on and the `Referer` header names it. First-touch values reach the
 * server only when the visitor has granted analytics, as a bounded JSON field
 * the client fills from `hx_attr_v1`.
 *
 * Click identifiers are deliberately not captured. docs/07 section 6 says
 * "when available and permitted", and permitted means the Privacy Notice
 * discloses click-identifier attribution (CONTENT_VERIFICATION L7, 15 decision
 * 17). Until that row closes, `gclid` and `msclkid` are read from no source.
 * Advertising storage stays denied either way.
 */
export const CAPTURE_CLICK_IDENTIFIERS = false

export type LeadAttribution = AttributionInput & { currentPage?: string }

function trim(value: string | null, max: number): string | undefined {
  if (!value) return undefined
  const trimmed = value.trim()
  if (trimmed.length === 0) return undefined
  return trimmed.slice(0, max)
}

/** Reads the five UTM fields off whatever URL the request carries. */
export function utmFromUrl(url: string | undefined): AttributionInput {
  if (!url) return {}

  let params: URLSearchParams
  try {
    params = new URL(url).searchParams
  } catch {
    return {}
  }

  return {
    utmSource: trim(params.get('utm_source'), 200),
    utmMedium: trim(params.get('utm_medium'), 200),
    utmCampaign: trim(params.get('utm_campaign'), 300),
    utmTerm: trim(params.get('utm_term'), 300),
    utmContent: trim(params.get('utm_content'), 300),
  }
}

/** Drops the keys whose value is undefined so a merge cannot blank a value. */
function defined(source: AttributionInput): AttributionInput {
  return Object.fromEntries(
    Object.entries(source).filter(([, value]) => value !== undefined),
  ) as AttributionInput
}

/**
 * Re-applies the allowlist to the two URLs the browser contributed.
 *
 * The client already filters them, and this filters them again. The stored
 * blob is a client-supplied string like any other form value: a forged
 * `landingPage` is the one route by which a click identifier could still reach
 * the record and the CRM webhook, and it costs one parse to close it.
 */
function redactStoredUrls(input: AttributionInput): AttributionInput {
  return defined({
    ...input,
    landingPage: redactUrl(input.landingPage),
    referrer: redactUrl(input.referrer),
  })
}

/**
 * Parses the client-supplied first-touch field. Anything malformed is dropped
 * rather than rejected: attribution is a nice-to-have on a lead, and failing a
 * submission over it would trade a real inquiry for a marketing field.
 */
export function parseStoredAttribution(raw: string | null): AttributionInput {
  if (!raw) return {}

  try {
    const parsed = attributionInputSchema.safeParse(JSON.parse(raw))
    return parsed.success ? redactStoredUrls(defined(parsed.data)) : {}
  } catch {
    return {}
  }
}

export function buildAttribution({
  storedRaw,
  referer,
}: {
  storedRaw: string | null
  referer: string | null
}): LeadAttribution {
  const stored = parseStoredAttribution(storedRaw)
  const currentPage = redactUrl(trim(referer, 1000))

  return {
    // The request wins on the current page, which it observed; the stored
    // record wins on first touch, which the request cannot know.
    ...utmFromUrl(currentPage),
    ...stored,
    ...(currentPage ? { currentPage } : {}),
  }
}
