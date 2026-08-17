/**
 * Typed analytics layer (docs/07 §1).
 *
 * Components call these helpers instead of touching `window.dataLayer`, so no
 * component needs to know GTM exists. Free-text field values and personal
 * information must never appear in any parameter object (docs/07 §3, §5).
 */

export type AudienceType = 'brand' | 'agency'

type EventMap = {
  audience_path_select: { audience_type: AudienceType; cta_location: string }
  solution_view: { solution_name: string }
  primary_cta_click: {
    cta_label: string
    cta_location: string
    destination_url: string
    audience_type?: AudienceType
    solution_name?: string
  }
  diagnostic_start: { form_name: string }
  diagnostic_submit: { form_name: string; audience_type: AudienceType }
  diagnostic_success: { form_name: string; audience_type: AudienceType }
  diagnostic_error: { form_name: string; error_type: string }
  agency_partner_inquiry_start: { form_name: string }
  agency_partner_inquiry_submit: { form_name: string }
  research_view: { content_slug: string; content_category?: string }
  research_related_click: { content_slug: string; destination_url: string }
  case_study_view: { case_study_slug: string }
  external_venture_click: { external_brand_name: string; destination_url: string }
  contact_submit: { form_name: string }
  form_validation_error: { form_name: string; error_type: string }
}

export type EventName = keyof EventMap

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

export function trackEvent<T extends EventName>(event: T, params: EventMap[T]): void {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push({ event, ...params })
}
