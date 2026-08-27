import { describe, expect, it } from 'vitest'

import { shouldLoadOptionalAnalytics } from '@/components/consent/optional-analytics'
import { banner, preferences } from '@/content/consent'
import { consentModeDefaultScript } from '@/lib/consent/google-consent-mode'
import {
  analyticsAllowed,
  createConsentState,
  parseConsentState,
  CONSENT_MAX_AGE_DAYS,
  CONSENT_VERSION,
} from '@/lib/consent/state'

/**
 * Consent rules from docs/16 and legal/01 §8–§10.
 *
 * Every case here is written as "the unsafe outcome must not happen", because
 * the failure mode that matters is analytics running when it should not.
 */

const NOW = new Date('2026-08-16T12:00:00.000Z')

describe('Consent state', () => {
  it('denies analytics when nothing is stored', () => {
    expect(analyticsAllowed(parseConsentState(null, NOW))).toBe(false)
  })

  it('denies analytics when the stored value is not JSON', () => {
    expect(analyticsAllowed(parseConsentState('not json', NOW))).toBe(false)
  })

  it('denies analytics when the stored record is from an older policy version', () => {
    const stored = JSON.stringify({
      ...createConsentState({ analytics: 'granted', source: 'banner', gpc: false, now: NOW }),
      version: '1999-01-01',
    })

    // A vendor or purpose change bumps the version, and a stale grant must not
    // survive it (docs/16 §4).
    expect(parseConsentState(stored, NOW)).toBeNull()
  })

  it('invalidates a grant recorded before the LinkedIn Insight Tag disclosure', () => {
    const stored = JSON.stringify({
      ...createConsentState({ analytics: 'granted', source: 'banner', gpc: false, now: NOW }),
      version: '2026-08-16',
    })

    expect(parseConsentState(stored, NOW)).toBeNull()
  })

  it('denies analytics once the record has expired', () => {
    const state = createConsentState({
      analytics: 'granted',
      source: 'banner',
      gpc: false,
      now: NOW,
    })
    const afterExpiry = new Date(state.expiresAt).getTime() + 1000

    expect(parseConsentState(JSON.stringify(state), new Date(afterExpiry))).toBeNull()
  })

  it('re-prompts no later than six months after the decision', () => {
    const state = createConsentState({
      analytics: 'granted',
      source: 'banner',
      gpc: false,
      now: NOW,
    })

    const days = (Date.parse(state.expiresAt) - Date.parse(state.decidedAt)) / 86_400_000
    expect(days).toBe(CONSENT_MAX_AGE_DAYS)
    expect(days).toBeLessThanOrEqual(183)
  })

  it('rejects a record claiming advertising consent', () => {
    // Advertising is denied at launch and nothing may grant it, including a
    // hand-edited storage entry (docs/16 §2).
    const tampered = JSON.stringify({
      version: CONSENT_VERSION,
      analytics: 'granted',
      advertising: 'granted',
      source: 'banner',
      gpc: false,
      decidedAt: NOW.toISOString(),
      expiresAt: new Date(NOW.getTime() + 86_400_000).toISOString(),
    })

    expect(parseConsentState(tampered, NOW)).toBeNull()
  })

  it('round-trips a valid grant', () => {
    const state = createConsentState({
      analytics: 'granted',
      source: 'banner',
      gpc: false,
      now: NOW,
    })

    expect(analyticsAllowed(parseConsentState(JSON.stringify(state), NOW))).toBe(true)
  })

  it('never records advertising as anything but denied', () => {
    for (const analytics of ['granted', 'denied'] as const) {
      expect(createConsentState({ analytics, source: 'banner', gpc: false }).advertising).toBe(
        'denied',
      )
    }
  })
})

describe('Google Consent Mode defaults', () => {
  it('denies every storage type that carries a choice', () => {
    // docs/16 §3 — the exact default state before any decision.
    expect(consentModeDefaultScript).toContain('"analytics_storage":"denied"')
    expect(consentModeDefaultScript).toContain('"ad_storage":"denied"')
    expect(consentModeDefaultScript).toContain('"ad_user_data":"denied"')
    expect(consentModeDefaultScript).toContain('"ad_personalization":"denied"')
  })

  it('leaves the two strictly necessary types granted', () => {
    expect(consentModeDefaultScript).toContain('"functionality_storage":"granted"')
    expect(consentModeDefaultScript).toContain('"security_storage":"granted"')
  })

  it('sets defaults rather than an update', () => {
    expect(consentModeDefaultScript).toContain("gtag('consent', 'default'")
    expect(consentModeDefaultScript).not.toContain("'update'")
  })

  it('loads no tag of its own', () => {
    // Basic consent mode: no Google request may be sent before acceptance.
    expect(consentModeDefaultScript).not.toContain('googletagmanager')
    expect(consentModeDefaultScript).not.toContain('<script')
  })
})

describe('Optional analytics gate', () => {
  const base = { enabled: true, analyticsGranted: true, onVercel: true }

  it('loads only when the flag, the consent, and the platform all agree', () => {
    expect(shouldLoadOptionalAnalytics(base)).toBe(true)
  })

  it('loads nothing before the visitor accepts', () => {
    // docs/16 §15 — the acceptance test that matters most. Even with the master
    // switch on and running on the platform, an undecided or refusing visitor
    // gets no vendor script.
    expect(shouldLoadOptionalAnalytics({ ...base, analyticsGranted: false })).toBe(false)
  })

  it('loads nothing while the master switch is off', () => {
    // docs/11 — the switch stays off until the consent network tests pass.
    expect(shouldLoadOptionalAnalytics({ ...base, enabled: false })).toBe(false)
  })

  it('loads nothing off-platform, where the scripts would 404', () => {
    expect(shouldLoadOptionalAnalytics({ ...base, onVercel: false })).toBe(false)
  })
})

describe('Consent copy', () => {
  it('offers reject, manage, and accept', () => {
    expect(banner.reject).toBe('Reject optional')
    expect(banner.manage).toBe('Manage choices')
    expect(banner.accept).toBe('Accept analytics')
  })

  it('never treats dismissal as consent', () => {
    // legal/01 §9 — "Continue", "Got it", and closing the banner are prohibited.
    const labels = [banner.reject, banner.manage, banner.accept, preferences.reject, preferences.accept]

    for (const label of labels) {
      expect(label.toLowerCase()).not.toContain('continue')
      expect(label.toLowerCase()).not.toContain('got it')
      expect(label.toLowerCase()).not.toContain('ok')
    }
  })

  it('states that optional analytics are off until accepted', () => {
    expect(banner.body).toContain('off until you accept')
  })

  it('describes analytics as off by default and names the vendors it may load', () => {
    const analytics = preferences.categories[1]

    expect(analytics?.status).toContain('Off by default')
    expect(analytics?.description).toContain('Google Analytics 4')
    expect(analytics?.description).toContain('Vercel Web Analytics')
    expect(analytics?.description).toContain('Vercel Speed Insights')
    expect(analytics?.description).toContain('LinkedIn Insight Tag')
  })

  it('promises that analytics carries no identifying form content', () => {
    // docs/16 §2 and legal/01 §8 — a promise the analytics layer has to keep.
    expect(preferences.categories[1]?.description).toContain('must not include form-field values')
  })

  it('tells a GPC visitor how to change the signal rather than asking them to override it', () => {
    // docs/16 §5 — the panel may be viewed, but must not pressure the visitor.
    expect(preferences.gpcNotice).toContain('Global Privacy Control')
    expect(preferences.gpcNotice).toContain('browser settings')
  })

  it('states that withdrawal does not reach back', () => {
    expect(preferences.footerStatement).toContain('withdraw consent at any time')
  })
})
