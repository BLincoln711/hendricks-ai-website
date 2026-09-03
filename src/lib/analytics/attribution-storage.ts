/**
 * First-touch attribution held in the browser (docs/07 section 6, 15 section 4).
 *
 * Session storage rather than a cookie, and only under a granted analytics
 * decision. Without consent the server keeps what the request itself carries,
 * which needs no storage and therefore no permission.
 *
 * The key is versioned, so a change to the stored shape retires the old record
 * instead of misreading it, and it is removed the moment the decision is
 * withdrawn or a Global Privacy Control signal appears, so no optional
 * processing continues after the decision (docs/16 section 15).
 */

export const ATTRIBUTION_STORAGE_KEY = 'hx_attr_v1'

export type FirstTouchAttribution = {
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmTerm?: string
  utmContent?: string
  landingPage?: string
  referrer?: string
}

const UTM_FIELDS = [
  ['utm_source', 'utmSource'],
  ['utm_medium', 'utmMedium'],
  ['utm_campaign', 'utmCampaign'],
  ['utm_term', 'utmTerm'],
  ['utm_content', 'utmContent'],
] as const

export function readFirstTouch(location: Location, referrer: string): FirstTouchAttribution {
  const params = new URLSearchParams(location.search)
  const attribution: FirstTouchAttribution = {
    landingPage: `${location.origin}${location.pathname}${location.search}`,
  }

  for (const [param, field] of UTM_FIELDS) {
    const value = params.get(param)
    if (value) attribution[field] = value.slice(0, 300)
  }

  if (referrer) attribution.referrer = referrer.slice(0, 1000)

  return attribution
}

/**
 * Returns the stored first touch, writing it on the first consented page.
 *
 * Every access is wrapped: session storage throws outright in some privacy
 * modes, and losing a marketing field is not a reason to fail a form.
 */
export function ensureFirstTouch(): string | null {
  if (typeof window === 'undefined') return null

  try {
    const existing = window.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY)
    if (existing) return existing

    const serialized = JSON.stringify(readFirstTouch(window.location, document.referrer))
    window.sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, serialized)
    return serialized
  } catch {
    return null
  }
}

export function clearFirstTouch(): void {
  if (typeof window === 'undefined') return

  try {
    window.sessionStorage.removeItem(ATTRIBUTION_STORAGE_KEY)
  } catch {
    // Nothing to do. There is no state to reconcile if the store is unreadable.
  }
}
