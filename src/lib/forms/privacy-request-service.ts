import 'server-only'

import { randomInt } from 'node:crypto'

import { integrationStatus } from '@/lib/env'
import type { PrivacyRequestInput } from '@/lib/forms/privacy-request-schema'

/**
 * Case intake for privacy-rights requests (docs/16 §9).
 *
 * Delivery is stubbed: `RESEND_API_KEY` and the restricted case system are not
 * provisioned, so nothing is transmitted yet. What is implemented now is the
 * part that must not be retrofitted — the case record's shape, the statutory due
 * date, and the rule that request contents never leave this module.
 */

/** Statutory response window used to set the due date (docs/16 §9). */
const RESPONSE_WINDOW_DAYS = 45

/**
 * Non-sequential confirmation number (`21-privacy-request.md`).
 *
 * Sequential IDs leak request volume and let one requester guess another's
 * reference, so the suffix is drawn from a cryptographic source rather than a
 * counter. The year prefix keeps it legible for a person reading it back over
 * the phone.
 */
export function generateRequestId(now: Date = new Date()): string {
  const suffix = String(randomInt(0, 1_000_000)).padStart(6, '0')
  return `PRIV-${now.getUTCFullYear()}-${suffix}`
}

export type PrivacyCaseRecord = {
  requestId: string
  requestType: PrivacyRequestInput['requestType']
  relationship: PrivacyRequestInput['relationship']
  receivedAt: string
  dueAt: string
  jurisdictionClaimed: string
  verificationStatus: 'unverified'
  isAuthorizedAgent: boolean
  originalRequestId?: string
  appealStatus: 'not-an-appeal' | 'open'
}

export function buildCaseRecord(
  input: PrivacyRequestInput,
  { requestId, now = new Date() }: { requestId: string; now?: Date },
): PrivacyCaseRecord {
  const dueAt = new Date(now.getTime() + RESPONSE_WINDOW_DAYS * 24 * 60 * 60 * 1000)

  return {
    requestId,
    requestType: input.requestType,
    relationship: input.relationship,
    receivedAt: now.toISOString(),
    dueAt: dueAt.toISOString(),
    jurisdictionClaimed: [input.stateOrProvince, input.country].filter(Boolean).join(', '),
    verificationStatus: 'unverified',
    isAuthorizedAgent: input.isAuthorizedAgent,
    ...(input.originalRequestId ? { originalRequestId: input.originalRequestId } : {}),
    appealStatus: input.requestType === 'appeal' ? 'open' : 'not-an-appeal',
  }
}

/**
 * Records the request.
 *
 * The unconfigured path logs the case metadata only — never the requester's
 * name, email, or request text. docs/15 §9 forbids sending request details to a
 * broad distribution, and an application log is exactly that: widely readable,
 * long retained, and outside the restricted system the request belongs in.
 */
export async function recordPrivacyRequest(record: PrivacyCaseRecord): Promise<void> {
  if (!integrationStatus.email) {
    console.info(
      `[privacy-request] received ${record.requestId} (${record.requestType}) — due ${record.dueAt}. ` +
        'Delivery is not configured; no notification was sent.',
    )
    return
  }

  // Delivery adapter lands with the Resend credential. Until then, refusing to
  // silently succeed is more useful than a no-op: an unrouted rights request is
  // a missed statutory deadline.
  console.info(
    `[privacy-request] received ${record.requestId} (${record.requestType}) — due ${record.dueAt}. ` +
      'Delivery adapter is not implemented.',
  )
}
