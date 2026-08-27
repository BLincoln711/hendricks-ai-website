'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

import { useConsent } from '@/components/consent/consent-provider'
import {
  diagnosticCtaFromClickTarget,
  trackDiagnosticCtaClick,
} from '@/lib/analytics/diagnostic-cta'
import { shouldLoadGa4, shouldLoadLinkedInInsight } from '@/lib/analytics/gates'
import { configureGa4, ga4ScriptSrc, resetGa4Runtime, sendGa4PageView } from '@/lib/analytics/gtag'

/**
 * Consent-gated GA4 and LinkedIn Insight Tag.
 *
 * Extends the existing Privacy Choices / Consent Mode stack. It does not
 * replace the banner. Scripts stay unmounted until analytics is granted and
 * the matching public env ID is present, so an empty production env stays
 * silent.
 *
 * LinkedIn Insight loads only after analytics consent when
 * `NEXT_PUBLIC_LINKEDIN_PARTNER_ID` is set. The Privacy Notice discloses it as
 * a measurement vendor. Google advertising storage remains denied.
 */

function Ga4Runtime({ measurementId }: { measurementId: string }) {
  const pathname = usePathname()

  useEffect(() => {
    sendGa4PageView()
  }, [pathname])

  useEffect(() => {
    return () => resetGa4Runtime()
  }, [])

  return (
    <Script
      id="ga4-gtag"
      src={ga4ScriptSrc(measurementId)}
      strategy="afterInteractive"
      onReady={() => {
        configureGa4(measurementId)
        sendGa4PageView()
      }}
    />
  )
}

function LinkedInInsight({ partnerId }: { partnerId: string }) {
  return (
    <Script id="linkedin-insight" strategy="afterInteractive">
      {`
window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
window._linkedin_data_partner_ids.push(${JSON.stringify(partnerId)});
(function(l) {
  if (!l) {
    window.lintrk = function(a,b){window.lintrk.q.push([a,b]);};
    window.lintrk.q = [];
  }
  var s = document.getElementsByTagName("script")[0];
  var b = document.createElement("script");
  b.type = "text/javascript";
  b.async = true;
  b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
  s.parentNode.insertBefore(b, s);
})(window.lintrk);
`.trim()}
    </Script>
  )
}

/**
 * Capture-phase listener for same-origin /diagnostic links that are not
 * PrimaryCta / TextCta (header, mobile nav, footer, other body links).
 * Those CTA components fire diagnostic_cta_click themselves. No copy changes.
 */
export function DiagnosticCtaTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!diagnosticCtaFromClickTarget(event.target, window.location.origin)) return
      trackDiagnosticCtaClick(window.location.pathname)
    }

    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  return null
}

export function ConsentedTags({
  gaMeasurementId,
  linkedInPartnerId,
}: {
  gaMeasurementId?: string
  linkedInPartnerId?: string
}) {
  const { analyticsGranted } = useConsent()

  const loadGa4 = shouldLoadGa4({ measurementId: gaMeasurementId, analyticsGranted })
  const loadLinkedIn = shouldLoadLinkedInInsight({
    partnerId: linkedInPartnerId,
    analyticsGranted,
  })

  return (
    <>
      <DiagnosticCtaTracker />
      {loadGa4 && gaMeasurementId ? <Ga4Runtime measurementId={gaMeasurementId} /> : null}
      {loadLinkedIn && linkedInPartnerId ? <LinkedInInsight partnerId={linkedInPartnerId} /> : null}
    </>
  )
}
