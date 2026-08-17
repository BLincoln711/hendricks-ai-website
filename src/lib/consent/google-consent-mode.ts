/**
 * Basic Google Consent Mode v2 (docs/16 §3).
 *
 * "Basic" is the deliberate choice over "advanced": the Google tag is not loaded
 * and no measurement request — including a cookieless ping — is sent before the
 * visitor accepts analytics. The default command below therefore runs against an
 * empty `dataLayer` and is queued for whenever the tag does load.
 *
 * Advertising states stay denied in both the default and the update. Nothing in
 * the launch configuration can grant them (docs/16 §2).
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

const DENIED_DEFAULTS = {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  functionality_storage: 'granted',
  security_storage: 'granted',
} as const

/**
 * Inline script that must run before any Google tag is evaluated.
 *
 * Defined as a string rather than a module function because it has to execute
 * synchronously in document order, ahead of hydration. It also publishes `gtag`
 * on `window` so the update below can use the documented command API instead of
 * guessing at the shape GTM expects on the queue.
 */
export const consentModeDefaultScript = `
window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', ${JSON.stringify(DENIED_DEFAULTS)});
`.trim()

export function pushConsentModeUpdate(analyticsGranted: boolean): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return

  window.gtag('consent', 'update', {
    analytics_storage: analyticsGranted ? 'granted' : 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
}
