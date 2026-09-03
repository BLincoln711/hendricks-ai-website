'use client'

import { useActionState, useEffect, useId, useRef } from 'react'

import { errors } from '@/content/forms/lead-forms'
import {
  trackFormError,
  trackFormStart,
  trackFormSuccess,
  trackValidationErrors,
} from '@/lib/analytics/form-events'
import type { ContactAudienceType } from '@/lib/analytics/events'
import { initialLeadFormState, type LeadFormState } from '@/lib/forms/lead-form-state'
import type { LeadFormName } from '@/lib/forms/lead-schema'

/**
 * The behaviour the three lead forms share (15 sections 4 to 6).
 *
 * Field markup is written out per form rather than generated from a spec: the
 * three ask different questions of different audiences, and a table-driven
 * renderer would hide that behind a config object. What is genuinely shared is
 * everything below: the action state, id generation, focus movement after a
 * result, and the analytics dispatch, none of which any form should decide for
 * itself.
 *
 * Nothing here reads a field value. The analytics helpers take categories only.
 */

export type LeadFormController = {
  state: LeadFormState
  action: (formData: FormData) => void
  pending: boolean
  fieldId: (name: string) => string
  errorFor: (name: string) => string | undefined
  valueFor: (name: string) => string
  hasSummary: boolean
  summaryMessage: string | undefined
  /**
   * Ids rather than refs. The focus move happens in an effect, so the element
   * is looked up there; handing a ref out through the controller object would
   * make every read of that object a ref read during render.
   */
  summaryId: string
  successId: string
  attributionId: string
  onFirstFocus: () => void
}

function minutesFrom(seconds: number | undefined): number {
  return Math.max(1, Math.ceil((seconds ?? 60) / 60))
}

export function useLeadForm({
  formName,
  pageName,
  action: serverAction,
  audienceType,
  deliveryError,
  antiAbuseError,
}: {
  formName: LeadFormName
  pageName: string
  action: (previous: LeadFormState, formData: FormData) => Promise<LeadFormState>
  /** Known before submission only where the page implies it. */
  audienceType?: ContactAudienceType
  deliveryError: string
  antiAbuseError: string
}): LeadFormController {
  const [state, action, pending] = useActionState(serverAction, initialLeadFormState)
  const ids = useId()
  const reported = useRef<LeadFormState | null>(null)

  const summaryId = `${ids}-error-summary`
  const successId = `${ids}-success`

  const hasSummary =
    state.status === 'invalid' ||
    state.status === 'error' ||
    state.status === 'rate-limited' ||
    state.status === 'delivery-error'

  useEffect(() => {
    const target = hasSummary ? summaryId : state.status === 'success' ? successId : null
    if (target) document.getElementById(target)?.focus()
  }, [hasSummary, state, summaryId, successId])

  useEffect(() => {
    // One dispatch per action result. `state` is a fresh object on every
    // result, so identity is the right guard; a status comparison would drop
    // the second of two identical outcomes.
    if (reported.current === state || state.status === 'idle') return
    reported.current = state

    if (state.status === 'success') {
      trackFormSuccess({
        formName,
        audienceType,
        deliveryChannels: state.deliveryChannels ?? 'unknown',
      })
      return
    }

    if (state.status === 'invalid') {
      trackValidationErrors({
        formName,
        source: 'server',
        fieldNames: Object.keys(state.fieldErrors ?? {}),
      })
      return
    }

    trackFormError({
      formName,
      errorType:
        state.status === 'rate-limited'
          ? 'rate_limited'
          : state.status === 'delivery-error'
            ? 'delivery'
            : 'anti_abuse',
    })
  }, [state, formName, audienceType])

  const summaryMessage =
    state.status === 'rate-limited'
      ? errors.rateLimited(minutesFrom(state.retryAfterSeconds))
      : state.status === 'delivery-error'
        ? deliveryError
        : state.status === 'error'
          ? antiAbuseError
          : undefined

  return {
    state,
    action,
    pending,
    fieldId: (name) => `${ids}-${name}`,
    errorFor: (name) => state.fieldErrors?.[name],
    valueFor: (name) => state.values?.[name] ?? '',
    hasSummary,
    summaryMessage,
    summaryId,
    successId,
    attributionId: `${ids}-attribution`,
    onFirstFocus: () =>
      trackFormStart({
        formName,
        pageName,
        ...(audienceType === 'brand' || audienceType === 'agency'
          ? { audienceType }
          : {}),
      }),
  }
}
