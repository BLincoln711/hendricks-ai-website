import 'server-only'

import { connection } from 'next/server'

/**
 * Request-scoped timestamp for the minimum-submit-time defence.
 *
 * `await connection()` is what makes this legitimate rather than a render-purity
 * violation: it tells Next.js the value depends on the incoming request, so the
 * route opts out of prerendering instead of baking a build-time clock into
 * static HTML. A prerendered timestamp would be hours stale on arrival and every
 * submission would be rejected as out of window.
 */
export async function requestTimestamp(): Promise<number> {
  await connection()
  return Date.now()
}
