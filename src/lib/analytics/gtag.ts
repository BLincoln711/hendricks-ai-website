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

export function configureGa4(measurementId: string): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return

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

/** Test seam. */
export function resetGa4PageViewForTests(): void {
  lastPageLocation = undefined
  ga4Configured = false
}
