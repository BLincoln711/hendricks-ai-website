'use server'

import { headers } from 'next/headers'

import { checkAntiAbuse } from '@/lib/forms/anti-abuse'
import { privacyRequestInputSchema } from '@/lib/forms/privacy-request-schema'
import {
  buildCaseRecord,
  generateRequestId,
  recordPrivacyRequest,
} from '@/lib/forms/privacy-request-service'
import { checkRateLimit, identifierFromHeaders } from '@/lib/forms/rate-limit'

/**
 * Privacy request submission.
 *
 * A server action rather than a public API route so the form works with
 * JavaScript disabled — a rights request that requires a working script to
 * submit is a rights request some people cannot make.
 *
 * `fieldErrors` is keyed by field name so the client can render both an error
 * summary and per-field messages from one response. Submitted values are echoed
 * back in `values` because `21-privacy-request.md` requires non-sensitive values
 * to survive a validation error.
 */

export type PrivacyRequestState = {
  status: 'idle' | 'success' | 'invalid' | 'error' | 'rate-limited'
  requestId?: string
  fieldErrors?: Record<string, string>
  values?: Record<string, string>
}

/** Five submissions per hour per client. Generous for a person, costly for a bot. */
const RATE_LIMIT = { limit: 5, windowSeconds: 60 * 60 }

function readValues(formData: FormData): Record<string, string> {
  const values: Record<string, string> = {}

  for (const [key, value] of formData.entries()) {
    // Never echo the anti-abuse controls back into the rendered form.
    if (key === 'honeypot' || key === 'startedAt') continue
    if (typeof value === 'string') values[key] = value
  }

  return values
}

export async function submitPrivacyRequest(
  _previous: PrivacyRequestState,
  formData: FormData,
): Promise<PrivacyRequestState> {
  const values = readValues(formData)

  const requestHeaders = await headers()
  const rateLimit = checkRateLimit({
    identifier: identifierFromHeaders(requestHeaders),
    ...RATE_LIMIT,
  })

  if (!rateLimit.allowed) {
    return { status: 'rate-limited', values }
  }

  const parsed = privacyRequestInputSchema.safeParse({
    firstName: formData.get('firstName') ?? '',
    lastName: formData.get('lastName') ?? '',
    email: formData.get('email') ?? '',
    country: formData.get('country') ?? '',
    stateOrProvince: formData.get('stateOrProvince') || undefined,
    relationship: formData.get('relationship') ?? '',
    requestType: formData.get('requestType') ?? '',
    details: formData.get('details') ?? '',
    isAuthorizedAgent: formData.get('isAuthorizedAgent') === 'on',
    originalRequestId: formData.get('originalRequestId') || undefined,
    attestation: formData.get('attestation') === 'on',
    honeypot: formData.get('honeypot') ?? '',
    startedAt: Number(formData.get('startedAt') ?? 0),
  })

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {}

    for (const issue of parsed.error.issues) {
      const field = issue.path[0]
      if (typeof field === 'string' && !fieldErrors[field]) {
        fieldErrors[field] = issue.message
      }
    }

    // A honeypot or timing failure surfaces as a generic error rather than a
    // field message. Naming the control that rejected the submission is how the
    // control gets bypassed.
    if (fieldErrors.honeypot || fieldErrors.startedAt) {
      return { status: 'error', values }
    }

    return { status: 'invalid', fieldErrors, values }
  }

  const antiAbuse = checkAntiAbuse({
    honeypot: parsed.data.honeypot,
    startedAt: parsed.data.startedAt,
  })

  if (!antiAbuse.ok) {
    return { status: 'error', values }
  }

  try {
    const requestId = generateRequestId()
    await recordPrivacyRequest(buildCaseRecord(parsed.data, { requestId }))
    return { status: 'success', requestId }
  } catch {
    // Deliberately does not log the caught error: it may carry field values
    // from the request, and docs/15 §9 keeps request details out of general
    // telemetry.
    return { status: 'error', values }
  }
}
