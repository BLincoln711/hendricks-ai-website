'use client'

import { useConsent } from '@/components/consent/consent-provider'
import { privacyChoicesLabel } from '@/content/consent'

/**
 * Persistent footer control that reopens the preferences dialog (09 5.59;
 * legal/01 section 11).
 *
 * A real button, not a link, because it opens a dialog and changes no route.
 * Required on every route, which is why it lives in the footer rather than on
 * the legal pages. It carries no class of its own: the `.foot-legal` rule in
 * globals.css styles the row's links and this button together, so the
 * withdrawal path cannot drift out of parity with the links to the policies
 * beside it. Focus returns here when the dialog closes (16 KF-04).
 */
export function PrivacyChoicesButton() {
  const { isPreferencesOpen, openPreferences } = useConsent()

  return (
    <button
      type="button"
      aria-haspopup="dialog"
      aria-expanded={isPreferencesOpen}
      onClick={openPreferences}
    >
      {privacyChoicesLabel}
    </button>
  )
}
