import {
  CONSENT_STORAGE_KEY,
  parseConsentState,
  type ConsentState,
} from '@/lib/consent/state'

/**
 * Browser persistence for the consent record (docs/16 §4).
 *
 * This is the only storage the site writes before a decision, and docs/16 §2
 * classifies it as strictly necessary: without it the visitor would be asked the
 * same question on every page.
 *
 * Every access is wrapped because `localStorage` throws rather than returning
 * null when a browser blocks site data. A visitor with storage disabled must
 * still get a working site, so a throw degrades to "no decision recorded".
 */

export function readStoredConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null

  try {
    return parseConsentState(window.localStorage.getItem(CONSENT_STORAGE_KEY))
  } catch {
    return null
  }
}

export function writeStoredConsent(state: ConsentState): void {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state))
  } catch {
    // A visitor who blocks storage still gets the decision applied for this
    // page view; it simply is not remembered on the next one.
  }
}

/**
 * Global Privacy Control (docs/16 §5).
 *
 * A true signal is a legally recognised request to reject optional analytics,
 * so it is read before the banner is considered and the banner is then never
 * shown — docs/16 §5 forbids an interface that pressures the visitor to
 * override it.
 */
export function detectGlobalPrivacyControl(): boolean {
  if (typeof navigator === 'undefined') return false

  return (
    (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true
  )
}
