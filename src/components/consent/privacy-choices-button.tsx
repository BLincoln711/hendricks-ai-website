'use client'

import { useConsent } from '@/components/consent/consent-provider'
import { privacyChoicesLabel } from '@/content/consent'

/**
 * Persistent footer control that reopens the consent manager (legal/01 §11).
 *
 * Required on every route, which is why it lives in the footer rather than on
 * the legal pages. Styled to match the sibling legal links so the withdrawal
 * path is exactly as reachable as the links to the policies themselves.
 */
export function PrivacyChoicesButton() {
  const { openPreferences } = useConsent()

  return (
    <button
      type="button"
      onClick={openPreferences}
      className="text-[0.8125rem] text-[color-mix(in_srgb,var(--color-field)_70%,transparent)] underline underline-offset-4 transition-colors hover:text-[var(--color-cyan)]"
    >
      {privacyChoicesLabel}
    </button>
  )
}
