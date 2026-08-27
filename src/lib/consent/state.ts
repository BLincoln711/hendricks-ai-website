/**
 * Consent state contract (docs/15 §10, docs/16 §4).
 *
 * Every rule here fails closed: a missing, malformed, expired, or version-shifted
 * record means analytics is denied. Advertising is a literal `'denied'` rather
 * than a decision, because advertising storage, retargeting, and audience
 * matching remain denied even after analytics acceptance, and a type that cannot
 * express "granted" cannot be granted by accident.
 */

export type ConsentDecision = 'granted' | 'denied'

/** Which interaction produced the record. `gpc` is set without asking. */
export type ConsentSource = 'banner' | 'preferences' | 'gpc'

export type ConsentState = {
  version: string
  analytics: ConsentDecision
  advertising: 'denied'
  source: ConsentSource
  gpc: boolean
  decidedAt: string
  expiresAt: string
}

/**
 * Storage key and policy version (docs/16 §4).
 *
 * Bump the version when vendors, purposes, or categories change materially. A
 * stored record carrying an older version is treated as no record at all, which
 * re-prompts every visitor — that is the intended effect, not a side effect.
 */
export const CONSENT_STORAGE_KEY = 'hendricks_privacy_v1'
export const CONSENT_VERSION = '2026-08-27'

/** docs/16 §4 — re-prompt no later than six months after the recorded choice. */
export const CONSENT_MAX_AGE_DAYS = 180

export function createConsentState({
  analytics,
  source,
  gpc,
  now = new Date(),
}: {
  analytics: ConsentDecision
  source: ConsentSource
  gpc: boolean
  now?: Date
}): ConsentState {
  const expires = new Date(now.getTime() + CONSENT_MAX_AGE_DAYS * 24 * 60 * 60 * 1000)

  return {
    version: CONSENT_VERSION,
    analytics,
    advertising: 'denied',
    source,
    gpc,
    decidedAt: now.toISOString(),
    expiresAt: expires.toISOString(),
  }
}

function isDecision(value: unknown): value is ConsentDecision {
  return value === 'granted' || value === 'denied'
}

function isSource(value: unknown): value is ConsentSource {
  return value === 'banner' || value === 'preferences' || value === 'gpc'
}

/**
 * Parses a stored record, returning `null` for anything that cannot be trusted.
 *
 * Written by hand rather than with Zod so the consent module stays free of
 * dependencies that could be lazy-loaded — the decision has to be readable
 * before any optional script is evaluated.
 */
export function parseConsentState(raw: string | null, now: Date = new Date()): ConsentState | null {
  if (!raw) return null

  let candidate: unknown
  try {
    candidate = JSON.parse(raw)
  } catch {
    return null
  }

  if (typeof candidate !== 'object' || candidate === null) return null

  const value = candidate as Record<string, unknown>

  if (value.version !== CONSENT_VERSION) return null
  if (!isDecision(value.analytics)) return null
  if (value.advertising !== 'denied') return null
  if (!isSource(value.source)) return null
  if (typeof value.gpc !== 'boolean') return null
  if (typeof value.decidedAt !== 'string' || typeof value.expiresAt !== 'string') return null

  const expiresAt = Date.parse(value.expiresAt)
  if (Number.isNaN(expiresAt) || expiresAt <= now.getTime()) return null

  return {
    version: value.version,
    analytics: value.analytics,
    advertising: 'denied',
    source: value.source,
    gpc: value.gpc,
    decidedAt: value.decidedAt,
    expiresAt: value.expiresAt,
  }
}

/**
 * The single question the rest of the app asks. An undecided visitor is denied,
 * so the answer is safe to call before the banner has been shown.
 */
export function analyticsAllowed(state: ConsentState | null): boolean {
  return state?.analytics === 'granted'
}
