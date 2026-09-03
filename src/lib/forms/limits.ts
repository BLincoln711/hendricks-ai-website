/**
 * The numeric contract behind the anti-abuse controls (docs/15 section 6,
 * docs/07 section 9, 15 decision 14).
 *
 * Separate from the modules that enforce them, and free of the `server-only`
 * marker, so a test can state the rule it is checking rather than restating the
 * number. The enforcement stays on the server; only the figures are shared.
 */

/** Below this, the submission was not typed by a person. */
export const MINIMUM_SUBMIT_SECONDS = 3

/** Above this, `startedAt` is stale or forged rather than a real page view. */
export const MAXIMUM_SUBMIT_SECONDS = 60 * 60 * 12

/**
 * Five attempts per hashed identifier per fifteen minutes, in one bucket shared
 * by the three lead forms and /privacy-request. A per-form bucket would
 * multiply the allowance by the number of forms.
 */
export const LEAD_RATE_LIMIT = { limit: 5, windowSeconds: 15 * 60 } as const

/** The duplicate-suppression window (docs/15 section 5). */
export const IDEMPOTENCY_WINDOW_SECONDS = 10 * 60
