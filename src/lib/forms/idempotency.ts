import 'server-only'

import { createHash } from 'node:crypto'

import { IDEMPOTENCY_WINDOW_SECONDS } from '@/lib/forms/limits'
import type { LeadFormName } from '@/lib/forms/lead-schema'
import { hashIdentifier } from '@/lib/forms/rate-limit'
import { withSharedStore } from '@/lib/forms/shared-store'

/**
 * Short-lived duplicate suppression for lead submissions (docs/15 section 5).
 *
 * A double click, a retried request, or a back-and-resubmit inside the bucket
 * gets the same success and sends nothing a second time. The bucket has to live
 * in the shared store for the same reason the rate limit does: two instances
 * with separate memory would each decide the submission was new and each send
 * it.
 *
 * The key is derived from hashes, never from the address itself, so the store
 * holds no readable contact detail (docs/15 section 5: do not expose hashes in
 * analytics, and there is no reason to hold the plain value either).
 */

function digest(value: string): string {
  return createHash('sha256').update(value.trim().toLowerCase()).digest('hex').slice(0, 32)
}

export function idempotencyKey({
  formName,
  workEmail,
  organization,
  now = Date.now(),
}: {
  formName: LeadFormName
  workEmail: string
  organization: string
  now?: number
}): string {
  const bucket = Math.floor(now / (IDEMPOTENCY_WINDOW_SECONDS * 1000))
  const parts = [formName, digest(workEmail), digest(organization), String(bucket)].join(':')
  return `hx:idem:leads:v1:${hashIdentifier(parts)}`
}

export type IdempotencyClaim = { firstSubmission: boolean }

/**
 * Claims the bucket. `firstSubmission` false means an identical submission
 * already succeeded inside the window, so the caller returns the same success
 * region and delivers nothing.
 */
export async function claimSubmission(key: string): Promise<IdempotencyClaim> {
  const { claimed } = await withSharedStore(
    (store) => store.claim(key, 'sent', IDEMPOTENCY_WINDOW_SECONDS),
    'the idempotency bucket',
  )

  return { firstSubmission: claimed }
}

/**
 * Releases the claim after a failed delivery.
 *
 * Without this a submission that reached no destination would hold the bucket
 * for ten minutes and every retry inside it would be answered with the same
 * success, which is the exact failure the bucket exists to prevent, inverted.
 */
export async function releaseSubmission(key: string): Promise<void> {
  await withSharedStore((store) => store.release(key), 'the idempotency bucket')
}
