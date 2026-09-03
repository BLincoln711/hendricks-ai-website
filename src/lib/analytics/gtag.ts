import { allowlistedSearch, redactUrl as redactToAllowlist } from '@/lib/analytics/url-allowlist'
import { analyticsAllowed } from '@/lib/consent/state'
import { getSnapshot } from '@/lib/consent/store'

/**
 * GA4 helpers used after gtag.js has loaded under a granted analytics decision.
 *
 * session_start and user_engagement / engagement_time are left to GA4 automatic
 * and enhanced measurement. This module only sends consented page_view and the
 * typed events from `trackEvent`.
 */

type CampaignAttribution = {
  campaign_source?: string
  campaign_medium?: string
  campaign_name?: string
  campaign_term?: string
  campaign_content?: string
}

let lastPageLocation: string | undefined
let ga4Configured = false

export function canSendToGa4(): boolean {
  if (typeof window === 'undefined') return false
  if (!ga4Configured) return false
  if (typeof window.gtag !== 'function') return false
  return analyticsAllowed(getSnapshot().state)
}

export function sendGtagEvent(name: string, params?: object): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', name, params)
}

/**
 * The only query parameters allowed to leave the browser (15 section 4).
 *
 * `page_path`, `page_location` and `page_referrer` would otherwise carry the
 * whole query string, and three of the parameters the site uses are form
 * values: `?intent=` preselects the routing choice on /contact and `?model=`
 * preselects the partnership model on /for-agencies. Sending either to GA4
 * would put a field value on every consented page_view, which is the leak
 * CANON R8 and 16 FM-10 forbid by a different route. Click identifiers are
 * dropped for the same reason until CONTENT_VERIFICATION L7 discloses them.
 *
 * The rule lives in `url-allowlist` because the form's first-touch record and
 * the server's attribution builder apply the same one. It is re-exported here
 * so a caller reaching for the analytics query rule finds it where it reads.
 */
export { allowlistedSearch }

/**
 * Rebuilds an absolute URL with only the allowlisted query. Returns an empty
 * string where the shared helper returns undefined: a page path is a string
 * everywhere it is read here, and an absent one is the empty path.
 */
export function redactUrl(href: string): string {
  return redactToAllowlist(href) ?? ''
}

export function readCampaignAttribution(
  search: string = typeof window === 'undefined' ? '' : window.location.search,
): CampaignAttribution {
  const params = new URLSearchParams(search)
  const attribution: CampaignAttribution = {}

  const source = params.get('utm_source')
  const medium = params.get('utm_medium')
  const campaign = params.get('utm_campaign')
  const term = params.get('utm_term')
  const content = params.get('utm_content')

  if (source) attribution.campaign_source = source
  if (medium) attribution.campaign_medium = medium
  if (campaign) attribution.campaign_name = campaign
  if (term) attribution.campaign_term = term
  if (content) attribution.campaign_content = content

  return attribution
}

export function ga4ScriptSrc(measurementId: string): string {
  return `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`
}

export function configureGa4(measurementId: string): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return

  // send_page_view is false so SPA navigations do not double-count. This does
  // not disable enhanced measurement: session_start, user_engagement, and
  // engagement_time stay on GA4 automatic collection once the tag is loaded.
  window.gtag('js', new Date())
  window.gtag('config', measurementId, {
    send_page_view: false,
  })
  ga4Configured = true
}

/**
 * SPA-aware page_view. The first call uses document.referrer; later client
 * navigations use the previous page_location so pathing stays intact.
 */
export function sendGa4PageView(): void {
  if (!canSendToGa4()) return

  const pageLocation = window.location.href
  if (lastPageLocation === pageLocation) return

  const search = allowlistedSearch(window.location.search)

  sendGtagEvent('page_view', {
    page_path: `${window.location.pathname}${search}`,
    page_location: redactUrl(pageLocation),
    page_title: document.title,
    page_referrer: redactUrl(lastPageLocation ?? document.referrer),
    ...readCampaignAttribution(),
  })

  lastPageLocation = pageLocation
}

/**
 * Clears the SPA page_view cache and the configured flag. Called when the
 * consented GA4 runtime unmounts (withdraw) so a later grant can send again.
 */
export function resetGa4Runtime(): void {
  lastPageLocation = undefined
  ga4Configured = false
}

/** Test seam. */
export function resetGa4PageViewForTests(): void {
  resetGa4Runtime()
}
