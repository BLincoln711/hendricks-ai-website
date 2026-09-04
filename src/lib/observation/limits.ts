/**
 * Numeric contract for the public-mini queue. Free of `server-only` so tests
 * can state the figures without importing the env module.
 *
 * Estimator values match the Ultra checker notes: chat_gpt 0.070, perplexity
 * 0.006, google_aio 0.002, per context. The Next app does not call those
 * APIs and does not hold their keys. The ceiling is a hook Ultra must honour
 * when it writes cells later.
 */

export const OBSERVE_COST_CEILING_USD_DEFAULT = 2

export const OBSERVE_CELL_COST_USD = {
  google_aio: 0.002,
  chat_gpt: 0.07,
  perplexity: 0.006,
} as const

export const OBSERVE_JOB_TTL_SECONDS = 60 * 60 * 24

/** Three creates per hashed IP per hour. Conservative until Ultra is wired. */
export const OBSERVE_IP_RATE_LIMIT = { limit: 3, windowSeconds: 60 * 60 } as const

/** Two creates per hashed email per hour when an email is supplied. */
export const OBSERVE_EMAIL_RATE_LIMIT = { limit: 2, windowSeconds: 60 * 60 } as const

export function estimatedRunCostUsd(contextCount: number): number {
  const perContext =
    OBSERVE_CELL_COST_USD.google_aio +
    OBSERVE_CELL_COST_USD.chat_gpt +
    OBSERVE_CELL_COST_USD.perplexity
  return Number((perContext * contextCount).toFixed(4))
}
