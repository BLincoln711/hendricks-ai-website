'use client'

import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { useConsent } from '@/components/consent/consent-provider'
import { optionalAnalyticsEnabled } from '@/config/feature-flags'
import { redactUrl } from '@/lib/analytics/gtag'

/**
 * The only place an optional analytics vendor may mount (docs/16 §2, §15).
 *
 * Vercel Web Analytics and Speed Insights are classified as optional analytics
 * even though the vendor describes them as cookie-free, because legal/01 §8
 * chose the more conservative treatment. Both therefore stay unmounted until the
 * visitor accepts — including under a Global Privacy Control signal, which the
 * provider records as a denial.
 *
 * Rendering nothing is what enforces the rule. There is no request to suppress
 * later because the script tag never enters the document.
 */
export function shouldLoadOptionalAnalytics({
  enabled,
  analyticsGranted,
  onVercel,
}: {
  enabled: boolean
  analyticsGranted: boolean
  /**
   * Both scripts are served by the platform at `/_vercel/*`. Mounting them
   * elsewhere produces 404s and MIME-type console errors on every page.
   */
  onVercel: boolean
}): boolean {
  return enabled && analyticsGranted && onVercel
}

export function OptionalAnalytics({ onVercel }: { onVercel: boolean }) {
  const { analyticsGranted } = useConsent()

  if (
    !shouldLoadOptionalAnalytics({
      enabled: optionalAnalyticsEnabled,
      analyticsGranted,
      onVercel,
    })
  ) {
    return null
  }

  return (
    <>
      {/*
        Query redaction, the same allowlist GA4 gets (docs/16 section 10, 15
        section 4). `?intent=` and `?model=` are form values, so a pageview URL
        carrying either would report what a visitor selected before submitting.
      */}
      <Analytics beforeSend={(event) => ({ ...event, url: redactUrl(event.url) })} />
      <SpeedInsights />
    </>
  )
}
