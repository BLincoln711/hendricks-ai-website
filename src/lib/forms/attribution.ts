import 'server-only'

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

export const UTM_PARAMETERS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
] as const

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

/**
 * Rebuilds a URL with only the allowlisted query.
 *
 * The `Referer` header carries whatever was on the page URL, which on a paid
 * landing includes `gclid` and `msclkid`. Storing it raw would capture the
 * click identifiers by the back door, which decision 17 holds until
 * CONTENT_VERIFICATION L7 discloses them. A URL that will not parse is dropped
 * rather than passed through, because an unparseable value is the one that has
 * not been redacted.
 */
function redact(url: string | undefined): string | undefined {
  if (!url) return undefined

  try {
    const parsed = new URL(url)
    const kept = new URLSearchParams()

    for (const name of UTM_PARAMETERS) {
      const value = parsed.searchParams.get(name)
      if (value) kept.append(name, value)
    }

    const query = kept.toString()
    return `${parsed.origin}${parsed.pathname}${query.length > 0 ? `?${query}` : ''}`
  } catch {
    return undefined
  }
}

/** Drops the keys whose value is undefined so a merge cannot blank a value. */
function defined(source: AttributionInput): AttributionInput {
  return Object.fromEntries(
    Object.entries(source).filter(([, value]) => value !== undefined),
  ) as AttributionInput
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
    return parsed.success ? defined(parsed.data) : {}
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
  const currentPage = redact(trim(referer, 1000))

  return {
    // The request wins on the current page, which it observed; the stored
    // record wins on first touch, which the request cannot know.
    ...utmFromUrl(currentPage),
    ...stored,
    ...(currentPage ? { currentPage } : {}),
  }
}
