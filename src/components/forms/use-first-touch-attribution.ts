'use client'

import { useEffect } from 'react'

import { useConsent } from '@/components/consent/consent-provider'
import { clearFirstTouch, ensureFirstTouch } from '@/lib/analytics/attribution-storage'

/**
 * Keeps the form's hidden attribution field in step with the consent decision.
 *
 * The field is always rendered and always starts empty, so the form's markup
 * does not change shape when the decision does and an empty value simply means
 * the server keeps what the request itself carried. The effect writes to two
 * external systems, session storage and the input, and holds no React state of
 * its own, which is what an effect is for.
 */
export function useFirstTouchAttribution(inputId: string): void {
  const { analyticsGranted } = useConsent()

  useEffect(() => {
    const input = document.getElementById(inputId)
    const field = input instanceof HTMLInputElement ? input : null

    if (!analyticsGranted) {
      clearFirstTouch()
      if (field) field.value = ''
      return
    }

    const stored = ensureFirstTouch()
    if (field) field.value = stored ?? ''
  }, [analyticsGranted, inputId])
}
