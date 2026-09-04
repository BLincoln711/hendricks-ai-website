import 'server-only'

import { checkRateLimit, hashIdentifier, identifierFromHeaders } from '@/lib/forms/rate-limit'
import { OBSERVE_EMAIL_RATE_LIMIT, OBSERVE_IP_RATE_LIMIT } from '@/lib/observation/limits'

/**
 * Create-job rate limits. Separate buckets from the lead forms so a Diagnostic
 * submitter is not locked out of a public sample, and the reverse.
 *
 * The identifier is hashed before it becomes a key, same as the form limiter.
 * Email is hashed too. Neither value is stored in the clear.
 */

export { identifierFromHeaders }

export async function checkObserveIpLimit(ip: string) {
  return checkRateLimit({
    identifier: `observe:ip:${ip}`,
    limit: OBSERVE_IP_RATE_LIMIT.limit,
    windowSeconds: OBSERVE_IP_RATE_LIMIT.windowSeconds,
  })
}

export async function checkObserveEmailLimit(email: string) {
  return checkRateLimit({
    identifier: `observe:email:${email.trim().toLowerCase()}`,
    limit: OBSERVE_EMAIL_RATE_LIMIT.limit,
    windowSeconds: OBSERVE_EMAIL_RATE_LIMIT.windowSeconds,
  })
}

export function hashedObserveEmail(email: string): string {
  return hashIdentifier(email.trim().toLowerCase())
}
