/**
 * The state a lead submission returns to the form (docs/15 section 3).
 *
 * A module of its own because a `'use server'` file may export nothing but
 * async functions, and both the action and the client form need this shape.
 * Every field is safe to render: field names and approved messages, never a
 * provider error and never anything derived from a delivery failure.
 */

import type { ContactAudience } from '@/lib/forms/lead-options'

export type LeadFormStatus =
  | 'idle'
  | 'success'
  | 'invalid'
  | 'rate-limited'
  | 'delivery-error'
  | 'error'

export type LeadFormState = {
  status: LeadFormStatus
  fieldErrors?: Record<string, string>
  /** Echoed so a recoverable error never costs the visitor what they typed. */
  values?: Record<string, string>
  retryAfterSeconds?: number
  /** Which destinations took it, for the success event. Never a field value. */
  deliveryChannels?: string
  /**
   * The audience category the server parsed, returned on success only.
   *
   * A category, never a field value, and the only place the chosen audience is
   * authoritative: the client knows the page's preselect, which is not the
   * same thing as the answer the visitor gave.
   */
  audienceType?: ContactAudience
}

export const initialLeadFormState: LeadFormState = { status: 'idle' }
