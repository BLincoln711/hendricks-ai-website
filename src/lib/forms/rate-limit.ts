import 'server-only'

import { createHash, randomBytes } from 'node:crypto'

import { env } from '@/lib/env'
import { LEAD_RATE_LIMIT } from '@/lib/forms/limits'
import { sharedStoreIsConfigured, withSharedStore } from '@/lib/forms/shared-store'

/**
 * Fixed-window rate limiter for the form endpoints (docs/15 section 6).
 *
 * The window lives in the shared store, not in this module, because a
 * module-level counter is per instance: on a serverless fleet five instances
 * each admit the full allowance and the limit is a limit only by coincidence.
 *
 * The identifier is hashed before it is used as a key. legal/01 section 12
 * forbids retaining a full IP address to prove consent, and the same reasoning
 * applies to an anti-abuse key: it does not need to be reversible, so it is not
 * stored in a reversible form.
 *
 * `RATE_LIMIT_HASH_SECRET` is what makes the key agree across instances. A
 * per-process secret would give every instance a different key for the same
 * visitor, which is the in-memory problem wearing a hash. Rotating the secret
 * expires every key at once, which is the intended way to clear the table;
 * rotate on a documented cadence, quarterly by default.
 */

/**
 * Falls back to a per-process secret when none is configured, so a local run
 * still hashes. It also means the keys do not agree across instances, which is
 * what `rateLimitIsDistributed` reports.
 */
const HASH_SECRET = env.RATE_LIMIT_HASH_SECRET ?? randomBytes(32).toString('hex')

export function hashIdentifier(identifier: string): string {
  return createHash('sha256').update(`${HASH_SECRET}:${identifier}`).digest('hex')
}

export type RateLimitResult = { allowed: boolean; retryAfterSeconds: number }

/**
 * One bucket shared by all four forms (15 decision 14): the three lead forms
 * and /privacy-request. A submitter who has exhausted the allowance on one form
 * has exhausted it, and a per-form bucket would multiply the allowance by the
 * number of forms.
 */
const KEY_PREFIX = 'hx:rl:forms:v1:'

export async function checkRateLimit({
  identifier,
  limit = LEAD_RATE_LIMIT.limit,
  windowSeconds = LEAD_RATE_LIMIT.windowSeconds,
}: {
  identifier: string
  limit?: number
  windowSeconds?: number
}): Promise<RateLimitResult> {
  const key = `${KEY_PREFIX}${hashIdentifier(identifier)}`

  const { count, ttlMs } = await withSharedStore(
    (store) => store.increment(key, windowSeconds),
    'the rate limit',
  )

  if (count > limit) {
    return { allowed: false, retryAfterSeconds: Math.max(1, Math.ceil(ttlMs / 1000)) }
  }

  return { allowed: true, retryAfterSeconds: 0 }
}

/**
 * True only when the limit actually holds across instances: a shared store and
 * a shared secret. Either one missing leaves a per-instance window, and
 * reporting that as distributed is how the gate goes green on a limit that is
 * not there.
 */
export const rateLimitIsDistributed =
  sharedStoreIsConfigured && Boolean(env.RATE_LIMIT_HASH_SECRET)

/**
 * Best-effort client identifier from proxy headers.
 *
 * Falls back to a constant so a request without a forwarded address still lands
 * in a bucket rather than bypassing the limit entirely. The value never leaves
 * this module unhashed.
 */
export function identifierFromHeaders(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for')
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim()
    if (first) return first
  }

  return headers.get('x-real-ip') ?? 'unknown-client'
}
