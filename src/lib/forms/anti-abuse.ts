import 'server-only'

/**
 * Accessible anti-abuse controls (docs/16 §15, `21-privacy-request.md`).
 *
 * An inaccessible CAPTCHA is explicitly prohibited, so the defences here are
 * ones a person never sees: a honeypot field that only an automated submitter
 * fills, and a minimum elapsed time between the form rendering and the
 * submission arriving.
 *
 * Both fail silently from the visitor's point of view — the caller reports a
 * generic error rather than naming the control, since telling a bot which check
 * it failed is how the check gets bypassed.
 */

/** Below this, the submission was not typed by a person (docs/07 §8). */
export const MINIMUM_SUBMIT_SECONDS = 3

/** Above this, `startedAt` is stale or forged rather than a real page view. */
const MAXIMUM_SUBMIT_SECONDS = 60 * 60 * 12

export type AntiAbuseResult = { ok: true } | { ok: false; reason: 'honeypot' | 'timing' }

export function checkAntiAbuse({
  honeypot,
  startedAt,
  now = Date.now(),
}: {
  honeypot: string
  startedAt: number
  now?: number
}): AntiAbuseResult {
  if (honeypot.length > 0) return { ok: false, reason: 'honeypot' }

  const elapsedSeconds = (now - startedAt) / 1000
  if (elapsedSeconds < MINIMUM_SUBMIT_SECONDS) return { ok: false, reason: 'timing' }
  if (elapsedSeconds > MAXIMUM_SUBMIT_SECONDS) return { ok: false, reason: 'timing' }

  return { ok: true }
}
