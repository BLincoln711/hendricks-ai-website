/**
 * First-touch attribution held in the browser (docs/07 section 6, 15 section 4).
 *
 * Session storage rather than a cookie, and only under a granted analytics
 * decision. Without consent the server keeps what the request itself carries,
 * which needs no storage and therefore no permission.
 *
 * The two URLs written here go through the same allowlist the server applies
 * to the `Referer` header. The landing page of a paid session carries `gclid`
 * and `msclkid`, and storing it raw would capture the click identifiers by the
 * front door while the header was being redacted at the back (15 decision 17,
 * CONTENT_VERIFICATION L7). The referrer is filtered for the same reason.
 *
 * The key is versioned, so a change to the stored shape retires the old record
 * instead of misreading it, and it is removed the moment the decision is
 * withdrawn or a Global Privacy Control signal appears, so no optional
 * processing continues after the decision (docs/16 section 15).
 */

import { redactUrl } from '@/lib/analytics/url-allowlist'

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

/**
 * Takes `{ href }` rather than `Location` so the allowlist can be exercised
 * against a real URL in a test without a browser standing behind it.
 */
export function readFirstTouch(location: { href: string }, referrer: string): FirstTouchAttribution {
  const attribution: FirstTouchAttribution = {}

  const landingPage = redactUrl(location.href)
  if (landingPage) attribution.landingPage = landingPage

  let params = new URLSearchParams()
  try {
    params = new URL(location.href).searchParams
  } catch {
    // An unparseable location leaves the UTM fields unread. There is nothing
    // to recover from it, and a raw substring is the value that is not filtered.
  }

  for (const [param, field] of UTM_FIELDS) {
    const value = params.get(param)
    if (value) attribution[field] = value.slice(0, 300)
  }

  const referrerUrl = redactUrl(referrer)
  if (referrerUrl) attribution.referrer = referrerUrl

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
