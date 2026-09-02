'use client'

import { useConsent } from '@/components/consent/consent-provider'
import { privacyChoicesLabel } from '@/content/consent'

/**
 * Persistent footer control that reopens the preferences dialog (09 5.59;
 * legal/01 section 11).
 *
 * A real button, not a link, because it opens a dialog and changes no route.
 * Required on every route, which is why it lives in the footer rather than on
 * the legal pages, styled as its sibling legal links so the withdrawal path is
 * exactly as reachable as the links to the policies themselves. Focus returns
 * here when the dialog closes (16 KF-04).
 */
export function PrivacyChoicesButton() {
  const { isPreferencesOpen, openPreferences } = useConsent()

  return (
    <button
      type="button"
      aria-haspopup="dialog"
      aria-expanded={isPreferencesOpen}
      onClick={openPreferences}
      className="target-variance inline-flex min-h-[var(--link-min-height)] min-w-target items-center text-small text-link underline decoration-[length:var(--link-underline-width)] underline-offset-[var(--link-underline-offset)] transition-[text-decoration-thickness] duration-[var(--duration-micro)] ease-standard hover:decoration-[length:var(--link-underline-hover-width)]"
    >
      {privacyChoicesLabel}
    </button>
  )
}
