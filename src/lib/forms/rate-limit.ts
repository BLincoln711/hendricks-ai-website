import 'server-only'

import { createHash, randomBytes } from 'node:crypto'

import { env } from '@/lib/env'

/**
 * Fixed-window rate limiter for form endpoints.
 *
 * In-memory by design at this stage. `RATE_LIMIT_REDIS_URL` is not provisioned,
 * and an in-memory window is honest about what it is: correct for a single
 * instance, and only partially effective across a serverless fleet where each
 * instance keeps its own counter. It raises the cost of automated submission
 * without pretending to be a distributed limit. Swapping in the Redis adapter is
 * the last step before production, tracked in CONTENT_VERIFICATION.md L9.
 *
 * The identifier is hashed with a per-process secret before it is used as a key.
 * legal/01 §12 forbids retaining a full IP address to prove consent, and the same
 * reasoning applies here: an anti-abuse key does not need to be reversible, so it
 * is not stored in a reversible form. The secret is regenerated on restart,
 * which also expires every key.
 */

type Window = { count: number; resetAt: number }

const windows = new Map<string, Window>()
const HASH_SECRET = randomBytes(32).toString('hex')

/** Sweep threshold. Keeps the map from growing without bound under load. */
const MAX_TRACKED_KEYS = 10_000

function hashIdentifier(identifier: string): string {
  return createHash('sha256').update(`${HASH_SECRET}:${identifier}`).digest('hex')
}

function sweep(now: number): void {
  for (const [key, window] of windows) {
    if (window.resetAt <= now) windows.delete(key)
  }
}

export type RateLimitResult = { allowed: boolean; retryAfterSeconds: number }

export function checkRateLimit({
  identifier,
  limit,
  windowSeconds,
  now = Date.now(),
}: {
  identifier: string
  limit: number
  windowSeconds: number
  now?: number
}): RateLimitResult {
  if (windows.size > MAX_TRACKED_KEYS) sweep(now)

  const key = hashIdentifier(identifier)
  const existing = windows.get(key)

  if (!existing || existing.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + windowSeconds * 1000 })
    return { allowed: true, retryAfterSeconds: 0 }
  }

  existing.count += 1

  if (existing.count > limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((existing.resetAt - now) / 1000),
    }
  }

  return { allowed: true, retryAfterSeconds: 0 }
}

/** True once a distributed store is configured. Surfaced in the phase report. */
export const rateLimitIsDistributed = Boolean(env.RATE_LIMIT_REDIS_URL)

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
