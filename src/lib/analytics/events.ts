/**
 * Typed analytics layer (docs/07 section 1, 15 section 4).
 *
 * Components call these helpers instead of touching `window.dataLayer`, so no
 * component needs to know GTM exists. Free-text field values and personal
 * information must never appear in any parameter object (docs/07 sections 3
 * and 5): every parameter below is a category, a field name or a destination,
 * and never something a visitor typed.
 *
 * Nothing is written to `window.dataLayer` before a granted analytics decision.
 * `window.dataLayer` is also gtag.js's command queue, so a container mounted
 * later would replay every pre-consent push as though it had been consented.
 * Events raised before a decision are held in a module buffer, flushed if the
 * visitor grants in the same page load, and discarded on a denial or a Global
 * Privacy Control signal.
 */

import { canSendToGa4, sendGtagEvent } from '@/lib/analytics/gtag'
import { analyticsAllowed } from '@/lib/consent/state'
import { getSnapshot, subscribe } from '@/lib/consent/store'

export type AudienceType = 'brand' | 'agency'

/** The four approved routing choices on /contact. `contact_submit` only. */
export type ContactAudienceType = 'brand' | 'agency' | 'media' | 'other'

type FormEventBase = { form_name: string }

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
  diagnostic_start: FormEventBase & { page_name: string; audience_type?: AudienceType }
  diagnostic_submit: FormEventBase & { audience_type?: AudienceType }
  diagnostic_success: FormEventBase & { audience_type?: AudienceType; delivery_channels: string }
  diagnostic_error: FormEventBase & { error_type: FormErrorType }
  agency_partner_inquiry_start: FormEventBase & { page_name: string }
  agency_partner_inquiry_submit: FormEventBase & { delivery_channels: string }
  agency_partner_inquiry_error: FormEventBase & { error_type: FormErrorType }
  research_view: { content_slug: string; content_category?: string }
  research_related_click: { content_slug: string; destination_url: string }
  case_study_view: { case_study_slug: string }
  external_venture_click: { external_brand_name: string; destination_url: string }
  contact_submit: FormEventBase & { audience_type: ContactAudienceType; delivery_channels: string }
  contact_error: FormEventBase & { error_type: FormErrorType }
  /** `field_name` is a name, never a value. */
  form_validation_error: FormEventBase & {
    error_type: 'client' | 'server'
    field_name: string
  }
  diagnostic_cta_click: { page_path: string }
}

export type FormErrorType = 'rate_limited' | 'delivery' | 'anti_abuse' | 'unknown'

export type EventName = keyof EventMap

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

type BufferedEvent = { event: EventName; params: Record<string, unknown> }

let buffer: BufferedEvent[] = []
let watchingConsent = false

function granted(): boolean {
  return analyticsAllowed(getSnapshot().state)
}

function write(event: EventName, params: Record<string, unknown>): void {
  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push({ event, ...params })

  // First-party dataLayer writes do not leave the browser. GA4 only receives
  // the event after analytics consent and after gtag.js has actually loaded.
  if (canSendToGa4()) sendGtagEvent(event, params)
}

function flush(): void {
  const held = buffer
  buffer = []
  for (const entry of held) write(entry.event, entry.params)
}

/**
 * Watches for the decision that releases or drops the buffer.
 *
 * Registered on first use rather than at module scope so importing the typed
 * event map from a test or a server file does not subscribe to a browser store.
 */
function watchConsent(): void {
  if (watchingConsent || typeof window === 'undefined') return
  watchingConsent = true

  subscribe(() => {
    if (granted()) flush()
    else buffer = []
  })
}

export function trackEvent<T extends EventName>(event: T, params: EventMap[T]): void {
  if (typeof window === 'undefined') return

  watchConsent()

  if (!granted()) {
    buffer.push({ event, params: params as Record<string, unknown> })
    return
  }

  flush()
  write(event, params as Record<string, unknown>)
}

/** Test seam. Clears the buffer and the subscription between cases. */
export function resetEventBufferForTests(): void {
  buffer = []
  watchingConsent = false
}

/** Test seam. How many events are waiting on a decision. */
export function bufferedEventCount(): number {
  return buffer.length
}
