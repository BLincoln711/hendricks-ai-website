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

  const pagePath = `${window.location.pathname}${window.location.search}`
  const pageReferrer = lastPageLocation ?? document.referrer

  sendGtagEvent('page_view', {
    page_path: pagePath,
    page_location: pageLocation,
    page_title: document.title,
    page_referrer: pageReferrer,
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
