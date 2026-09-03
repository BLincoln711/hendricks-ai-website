import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  bufferedEventCount,
  resetEventBufferForTests,
  trackEvent,
} from '@/lib/analytics/events'
import {
  resetFormStartsForTests,
  trackFormError,
  trackFormStart,
  trackFormSubmit,
  trackFormSuccess,
  trackValidationErrors,
} from '@/lib/analytics/form-events'
import { allowlistedSearch, redactUrl } from '@/lib/analytics/gtag'
import { recordDecision, resetConsentStoreForTests } from '@/lib/consent/store'

const NOW = new Date('2026-09-03T12:00:00.000Z')

function layer(): Record<string, unknown>[] {
  return window.dataLayer ?? []
}

describe('Query allowlist', () => {
  it('keeps the five UTM parameters and drops everything else', () => {
    expect(allowlistedSearch('?utm_source=linkedin&utm_medium=social')).toBe(
      '?utm_source=linkedin&utm_medium=social',
    )
    expect(allowlistedSearch('?intent=brand')).toBe('')
    expect(allowlistedSearch('?model=white-label')).toBe('')
    expect(allowlistedSearch('?gclid=abc&msclkid=def')).toBe('')
    expect(allowlistedSearch('')).toBe('')
  })

  it('strips a form value from a page URL before it can reach a vendor', () => {
    expect(redactUrl('https://hendricks.ai/contact?intent=brand&utm_source=linkedin')).toBe(
      'https://hendricks.ai/contact?utm_source=linkedin',
    )
    expect(redactUrl('https://hendricks.ai/for-agencies?model=embedded#partnership-inquiry')).toBe(
      'https://hendricks.ai/for-agencies',
    )
    expect(redactUrl('not a url')).toBe('')
    expect(redactUrl('')).toBe('')
  })
})

describe('Consent gate on the event layer', () => {
  beforeEach(() => {
    // The store reads a decision back out of `localStorage`, so clearing the
    // module is not enough to return a test to the undecided state.
    window.localStorage.clear()
    resetConsentStoreForTests()
    resetEventBufferForTests()
    resetFormStartsForTests()
    window.dataLayer = []
    vi.useFakeTimers()
    vi.setSystemTime(NOW)
  })

  afterEach(() => {
    resetConsentStoreForTests()
    resetEventBufferForTests()
    vi.useRealTimers()
  })

  it('writes nothing before a decision and holds the event', () => {
    trackEvent('diagnostic_cta_click', { page_path: '/diagnostic' })

    expect(layer()).toEqual([])
    expect(bufferedEventCount()).toBe(1)
  })

  it('flushes what it held when the visitor grants in the same page load', () => {
    trackEvent('diagnostic_cta_click', { page_path: '/diagnostic' })
    recordDecision('granted', 'banner')

    expect(bufferedEventCount()).toBe(0)
    expect(layer()).toContainEqual({ event: 'diagnostic_cta_click', page_path: '/diagnostic' })
  })

  it('discards what it held when the visitor declines', () => {
    trackEvent('diagnostic_cta_click', { page_path: '/diagnostic' })
    recordDecision('denied', 'banner')

    expect(bufferedEventCount()).toBe(0)
    expect(layer()).toEqual([])
  })
})

describe('Lead form events', () => {
  beforeEach(() => {
    window.localStorage.clear()
    resetConsentStoreForTests()
    resetEventBufferForTests()
    resetFormStartsForTests()
    window.dataLayer = []
    vi.useFakeTimers()
    vi.setSystemTime(NOW)
    recordDecision('granted', 'banner')
  })

  afterEach(() => {
    resetConsentStoreForTests()
    resetEventBufferForTests()
    vi.useRealTimers()
  })

  it('fires the start event once per session per form', () => {
    trackFormStart({ formName: 'diagnostic', pageName: 'diagnostic' })
    trackFormStart({ formName: 'diagnostic', pageName: 'diagnostic' })
    trackFormStart({ formName: 'agency-partnership', pageName: 'for-agencies' })

    const names = layer().map((entry) => entry.event)
    expect(names.filter((name) => name === 'diagnostic_start')).toHaveLength(1)
    expect(names.filter((name) => name === 'agency_partner_inquiry_start')).toHaveLength(1)
  })

  it('raises no start event on /contact, which the taxonomy does not define', () => {
    trackFormStart({ formName: 'contact', pageName: 'contact' })
    expect(layer()).toEqual([])
  })

  it('raises one validation event per invalid field, carrying names only', () => {
    trackValidationErrors({
      formName: 'diagnostic',
      source: 'server',
      fieldNames: ['workEmail', 'website'],
    })

    expect(layer()).toEqual([
      {
        event: 'form_validation_error',
        form_name: 'diagnostic',
        error_type: 'server',
        field_name: 'workEmail',
      },
      {
        event: 'form_validation_error',
        form_name: 'diagnostic',
        error_type: 'server',
        field_name: 'website',
      },
    ])
  })

  it('uses the success event of each form', () => {
    trackFormSuccess({ formName: 'diagnostic', audienceType: 'brand', deliveryChannels: 'email' })
    trackFormSuccess({ formName: 'agency-partnership', deliveryChannels: 'email' })
    trackFormSuccess({ formName: 'contact', audienceType: 'media', deliveryChannels: 'email' })

    expect(layer().map((entry) => entry.event)).toEqual([
      'diagnostic_success',
      'agency_partner_inquiry_submit',
      'contact_submit',
    ])
    expect(layer()[2]).toMatchObject({ audience_type: 'media' })
  })

  it('uses the error event of each form, with a category and no detail', () => {
    trackFormError({ formName: 'diagnostic', errorType: 'rate_limited' })
    trackFormError({ formName: 'agency-partnership', errorType: 'delivery' })
    trackFormError({ formName: 'contact', errorType: 'anti_abuse' })

    expect(layer().map((entry) => entry.event)).toEqual([
      'diagnostic_error',
      'agency_partner_inquiry_error',
      'contact_error',
    ])
  })

  it('raises a submit event on the Diagnostic only, and only with an audience', () => {
    trackFormSubmit({ formName: 'diagnostic', audienceType: 'brand' })
    trackFormSubmit({ formName: 'contact' })
    // The CSV makes audience_type required, so a submission with the required
    // radio unanswered raises nothing rather than an event missing a parameter.
    trackFormSubmit({ formName: 'diagnostic' })

    expect(layer().map((entry) => entry.event)).toEqual(['diagnostic_submit'])
    expect(layer()[0]).toMatchObject({ audience_type: 'brand' })
  })

  it('omits an unknown audience rather than reporting it as "other"', () => {
    trackFormSuccess({ formName: 'contact', deliveryChannels: 'email' })

    expect(layer()[0]).toEqual({
      event: 'contact_submit',
      form_name: 'contact',
      delivery_channels: 'email',
    })
  })

  it('omits the delivery channels on a repeat that sent to nothing', () => {
    trackFormSuccess({ formName: 'diagnostic', audienceType: 'brand' })

    expect(layer()[0]).toEqual({
      event: 'diagnostic_success',
      form_name: 'diagnostic',
      audience_type: 'brand',
    })
  })

  it('never carries a field value in any parameter', () => {
    trackFormStart({ formName: 'diagnostic', pageName: 'diagnostic', audienceType: 'brand' })
    trackFormSubmit({ formName: 'diagnostic', audienceType: 'brand' })
    trackValidationErrors({
      formName: 'diagnostic',
      source: 'server',
      fieldNames: ['monthlySearchInvestment'],
    })
    trackFormSuccess({ formName: 'diagnostic', audienceType: 'brand', deliveryChannels: 'email' })

    const payload = JSON.stringify(layer())

    // The three field values the spec singles out: the investment band, the
    // preferred model and the routing intent. None is ever a parameter.
    expect(payload).not.toMatch(/\$\s?\d/)
    expect(payload).not.toContain('25k-50k')
    expect(payload).not.toContain('white-label')
    expect(payload).not.toContain('@')
  })
})
