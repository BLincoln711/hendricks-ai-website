import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { isDiagnosticDestination, diagnosticCtaFromClickTarget } from '@/lib/analytics/diagnostic-cta'
import { resetEventBufferForTests, trackEvent } from '@/lib/analytics/events'
import { shouldLoadGa4, shouldLoadLinkedInInsight } from '@/lib/analytics/gates'
import {
  canSendToGa4,
  configureGa4,
  ga4ScriptSrc,
  readCampaignAttribution,
  resetGa4PageViewForTests,
  resetGa4Runtime,
  sendGa4PageView,
} from '@/lib/analytics/gtag'
import { parseGaMeasurementId, parseLinkedInPartnerId } from '@/lib/analytics/ids'
import { recordDecision, resetConsentStoreForTests } from '@/lib/consent/store'

const NOW = new Date('2026-08-27T12:00:00.000Z')

describe('Measurement ID parsing', () => {
  it('treats empty, missing, and whitespace as unset', () => {
    expect(parseGaMeasurementId(undefined)).toBeUndefined()
    expect(parseGaMeasurementId('')).toBeUndefined()
    expect(parseGaMeasurementId('   ')).toBeUndefined()
    expect(parseLinkedInPartnerId(undefined)).toBeUndefined()
    expect(parseLinkedInPartnerId('')).toBeUndefined()
  })

  it('rejects invented or malformed IDs', () => {
    expect(parseGaMeasurementId('GTM-ABC123')).toBeUndefined()
    expect(parseGaMeasurementId('UA-123-1')).toBeUndefined()
    expect(parseGaMeasurementId('g-ab12cd34ef')).toBeUndefined()
    expect(parseGaMeasurementId('G-')).toBeUndefined()
    expect(parseLinkedInPartnerId('partner')).toBeUndefined()
    expect(parseLinkedInPartnerId('12 34')).toBeUndefined()
  })

  it('accepts a real-looking GA4 ID and a numeric LinkedIn partner ID', () => {
    expect(parseGaMeasurementId('G-AB12CD34EF')).toBe('G-AB12CD34EF')
    expect(parseLinkedInPartnerId('123456')).toBe('123456')
  })
})

describe('Vendor load gates', () => {
  it('loads GA4 only when the env ID is present and analytics is granted', () => {
    expect(shouldLoadGa4({ measurementId: 'G-AB12CD34EF', analyticsGranted: true })).toBe(true)
    expect(shouldLoadGa4({ measurementId: 'G-AB12CD34EF', analyticsGranted: false })).toBe(false)
    expect(shouldLoadGa4({ measurementId: undefined, analyticsGranted: true })).toBe(false)
    expect(shouldLoadGa4({ measurementId: undefined, analyticsGranted: false })).toBe(false)
  })

  it('loads LinkedIn Insight only when the env ID is present and analytics is granted', () => {
    expect(shouldLoadLinkedInInsight({ partnerId: '123456', analyticsGranted: true })).toBe(true)
    expect(shouldLoadLinkedInInsight({ partnerId: '123456', analyticsGranted: false })).toBe(false)
    expect(shouldLoadLinkedInInsight({ partnerId: undefined, analyticsGranted: true })).toBe(false)
  })
})

describe('Diagnostic destination matching', () => {
  const origin = 'https://hendricks.ai'

  it('matches same-origin /diagnostic links including query and hash', () => {
    expect(isDiagnosticDestination('/diagnostic', origin)).toBe(true)
    expect(isDiagnosticDestination('/diagnostic?from=nav', origin)).toBe(true)
    expect(isDiagnosticDestination('/diagnostic#form', origin)).toBe(true)
    expect(isDiagnosticDestination('https://hendricks.ai/diagnostic', origin)).toBe(true)
  })

  it('rejects other routes and other origins', () => {
    expect(isDiagnosticDestination('/contact', origin)).toBe(false)
    expect(isDiagnosticDestination('/diagnostics', origin)).toBe(false)
    expect(isDiagnosticDestination('https://example.com/diagnostic', origin)).toBe(false)
  })

  it('reads the destination from a nested click target', () => {
    const anchor = document.createElement('a')
    anchor.setAttribute('href', '/diagnostic')
    const span = document.createElement('span')
    anchor.appendChild(span)
    document.body.appendChild(anchor)

    expect(diagnosticCtaFromClickTarget(span, origin)).toBe('/diagnostic')
    expect(diagnosticCtaFromClickTarget(document.body, origin)).toBeNull()

    anchor.remove()
  })

  it('skips PrimaryCta / TextCta links so the listener does not double-count', () => {
    const anchor = document.createElement('a')
    anchor.setAttribute('href', '/diagnostic')
    anchor.setAttribute('data-hendricks-cta', '')
    document.body.appendChild(anchor)

    expect(diagnosticCtaFromClickTarget(anchor, origin)).toBeNull()

    anchor.remove()
  })
})

describe('Campaign attribution', () => {
  it('reads every UTM field used on page_view', () => {
    expect(
      readCampaignAttribution(
        '?utm_source=linkedin&utm_medium=social&utm_campaign=diag&utm_term=sie&utm_content=hero',
      ),
    ).toEqual({
      campaign_source: 'linkedin',
      campaign_medium: 'social',
      campaign_name: 'diag',
      campaign_term: 'sie',
      campaign_content: 'hero',
    })
  })

  it('returns an empty object when no campaign params are present', () => {
    expect(readCampaignAttribution('?foo=bar')).toEqual({})
  })
})

describe('GA4 script URL', () => {
  it('loads gtag.js from googletagmanager.com with the env measurement ID', () => {
    expect(ga4ScriptSrc('G-AB12CD34EF')).toBe(
      'https://www.googletagmanager.com/gtag/js?id=G-AB12CD34EF',
    )
  })
})

describe('GA4 send gate', () => {
  const gtag = vi.fn()

  beforeEach(() => {
    resetConsentStoreForTests()
    resetGa4PageViewForTests()
    resetEventBufferForTests()
    gtag.mockReset()
    window.gtag = gtag
    window.dataLayer = []
    vi.useFakeTimers()
    vi.setSystemTime(NOW)
  })

  afterEach(() => {
    resetConsentStoreForTests()
    resetGa4PageViewForTests()
    delete window.gtag
    vi.useRealTimers()
  })

  it('does not send before gtag.js has been configured', () => {
    recordDecision('granted', 'banner')
    expect(canSendToGa4()).toBe(false)
    sendGa4PageView()
    expect(gtag).not.toHaveBeenCalledWith('event', 'page_view', expect.anything())
    expect(gtag).not.toHaveBeenCalledWith('config', expect.anything(), expect.anything())
  })

  it('does not send when analytics is denied even after configure', () => {
    recordDecision('denied', 'banner')
    configureGa4('G-AB12CD34EF')
    expect(canSendToGa4()).toBe(false)
    sendGa4PageView()
    expect(gtag).toHaveBeenCalledWith('js', expect.any(Date))
    expect(gtag).toHaveBeenCalledWith('config', 'G-AB12CD34EF', { send_page_view: false })
    expect(gtag).not.toHaveBeenCalledWith('event', 'page_view', expect.anything())
  })

  it('sends a page_view with path, location, referrer, and UTM campaign fields', () => {
    recordDecision('granted', 'banner')
    configureGa4('G-AB12CD34EF')
    expect(canSendToGa4()).toBe(true)

    window.history.pushState(
      {},
      '',
      '/?utm_source=linkedin&utm_medium=social&utm_campaign=diag&utm_term=sie&utm_content=hero',
    )

    sendGa4PageView()

    expect(gtag).toHaveBeenCalledWith(
      'event',
      'page_view',
      expect.objectContaining({
        page_path: expect.stringMatching(/^\//),
        page_location: expect.stringContaining('http'),
        page_title: expect.any(String),
        page_referrer: expect.any(String),
        campaign_source: 'linkedin',
        campaign_medium: 'social',
        campaign_name: 'diag',
        campaign_term: 'sie',
        campaign_content: 'hero',
      }),
    )
  })

  it('does not send a second page_view for the same location', () => {
    recordDecision('granted', 'banner')
    configureGa4('G-AB12CD34EF')
    sendGa4PageView()
    sendGa4PageView()

    const pageViews = gtag.mock.calls.filter((call) => call[0] === 'event' && call[1] === 'page_view')
    expect(pageViews).toHaveLength(1)
  })

  it('sends page_view again after the runtime is reset (withdraw then grant)', () => {
    recordDecision('granted', 'banner')
    configureGa4('G-AB12CD34EF')
    sendGa4PageView()
    resetGa4Runtime()
    configureGa4('G-AB12CD34EF')
    sendGa4PageView()

    const pageViews = gtag.mock.calls.filter((call) => call[0] === 'event' && call[1] === 'page_view')
    expect(pageViews).toHaveLength(2)
  })

  it('never sends a handmade session_start or user_engagement event', () => {
    recordDecision('granted', 'banner')
    configureGa4('G-AB12CD34EF')
    sendGa4PageView()

    const eventNames = gtag.mock.calls.filter((call) => call[0] === 'event').map((call) => call[1])
    expect(eventNames).toEqual(['page_view'])
    expect(gtag).toHaveBeenCalledWith('config', 'G-AB12CD34EF', { send_page_view: false })
  })

  it('forwards consented typed events to gtag and still writes the first-party dataLayer', () => {
    recordDecision('granted', 'banner')
    configureGa4('G-AB12CD34EF')

    trackEvent('diagnostic_cta_click', { page_path: '/' })

    expect(window.dataLayer).toContainEqual({ event: 'diagnostic_cta_click', page_path: '/' })
    expect(gtag).toHaveBeenCalledWith('event', 'diagnostic_cta_click', { page_path: '/' })
  })

  it('writes nothing at all when consent is denied', () => {
    // `window.dataLayer` is gtag.js's command queue as well as the first-party
    // layer, so a container mounted later would replay a pre-consent push as
    // though it had been consented (15 section 4).
    recordDecision('denied', 'banner')
    configureGa4('G-AB12CD34EF')

    trackEvent('diagnostic_cta_click', { page_path: '/' })

    expect(window.dataLayer).toEqual([])
    expect(gtag).not.toHaveBeenCalledWith('event', 'diagnostic_cta_click', expect.anything())
  })
})
