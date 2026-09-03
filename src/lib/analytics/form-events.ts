import {
  trackEvent,
  type ContactAudienceType,
  type FormErrorType,
} from '@/lib/analytics/events'
import type { LeadFormName } from '@/lib/forms/lead-schema'

/**
 * The event vocabulary of the three lead forms (15 sections 4 to 6).
 *
 * One module so no component decides for itself what a form reports. Nothing
 * here accepts a field value: the parameters are the form name, the page name,
 * an audience category, a delivery channel, an error category, and the name of
 * an invalid field. The investment band, the preferred model and the routing
 * intent are deliberately absent, and the query allowlist in `gtag.ts` keeps
 * the last two off `page_path` as well.
 */

/**
 * `diagnostic_start` and `agency_partner_inquiry_start` fire once per session
 * per form (the analytics CSV rule, audit CF-08). A module-level set survives
 * client navigations, so leaving the page and returning does not re-fire and
 * the start-per-session ratio divides like with like.
 */
const started = new Set<LeadFormName>()

export function trackFormStart({
  formName,
  pageName,
  audienceType,
}: {
  formName: LeadFormName
  pageName: string
  audienceType?: 'brand' | 'agency'
}): void {
  if (started.has(formName)) return
  started.add(formName)

  if (formName === 'diagnostic') {
    trackEvent('diagnostic_start', {
      form_name: formName,
      page_name: pageName,
      ...(audienceType ? { audience_type: audienceType } : {}),
    })
    return
  }

  if (formName === 'agency-partnership') {
    trackEvent('agency_partner_inquiry_start', { form_name: formName, page_name: pageName })
  }

  // /contact has no start event: the analytics CSV defines the contact funnel
  // from the submit onward, and inventing one here would put a row in GA4 that
  // docs/07 section 4 does not describe.
}

/** One event per invalid field, each carrying a single field name. */
export function trackValidationErrors({
  formName,
  source,
  fieldNames,
}: {
  formName: LeadFormName
  source: 'client' | 'server'
  fieldNames: readonly string[]
}): void {
  for (const fieldName of fieldNames) {
    trackEvent('form_validation_error', {
      form_name: formName,
      error_type: source,
      field_name: fieldName,
    })
  }
}

/** Fires when client validation passed and the action was invoked. */
export function trackFormSubmit({
  formName,
  audienceType,
}: {
  formName: LeadFormName
  audienceType?: 'brand' | 'agency'
}): void {
  if (formName !== 'diagnostic') return

  trackEvent('diagnostic_submit', {
    form_name: formName,
    ...(audienceType ? { audience_type: audienceType } : {}),
  })
}

export function trackFormSuccess({
  formName,
  audienceType,
  deliveryChannels,
}: {
  formName: LeadFormName
  audienceType?: ContactAudienceType
  deliveryChannels: string
}): void {
  if (formName === 'diagnostic') {
    trackEvent('diagnostic_success', {
      form_name: formName,
      ...(audienceType === 'brand' || audienceType === 'agency'
        ? { audience_type: audienceType }
        : {}),
      delivery_channels: deliveryChannels,
    })
    return
  }

  if (formName === 'agency-partnership') {
    trackEvent('agency_partner_inquiry_submit', {
      form_name: formName,
      delivery_channels: deliveryChannels,
    })
    return
  }

  trackEvent('contact_submit', {
    form_name: formName,
    audience_type: audienceType ?? 'other',
    delivery_channels: deliveryChannels,
  })
}

export function trackFormError({
  formName,
  errorType,
}: {
  formName: LeadFormName
  errorType: FormErrorType
}): void {
  if (formName === 'diagnostic') {
    trackEvent('diagnostic_error', { form_name: formName, error_type: errorType })
    return
  }

  if (formName === 'agency-partnership') {
    trackEvent('agency_partner_inquiry_error', { form_name: formName, error_type: errorType })
    return
  }

  trackEvent('contact_error', { form_name: formName, error_type: errorType })
}

/** Test seam. Clears the once-per-session start flags. */
export function resetFormStartsForTests(): void {
  started.clear()
}
