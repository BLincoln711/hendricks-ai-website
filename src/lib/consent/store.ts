import { pushConsentModeUpdate } from '@/lib/consent/google-consent-mode'
import {
  createConsentState,
  type ConsentDecision,
  type ConsentSource,
  type ConsentState,
} from '@/lib/consent/state'
import {
  detectGlobalPrivacyControl,
  readStoredConsent,
  writeStoredConsent,
} from '@/lib/consent/storage'

/**
 * External store for the consent decision, read through `useSyncExternalStore`.
 *
 * A store rather than component state because the decision lives in the browser,
 * not in React: it is in `localStorage`, it is influenced by a `navigator`
 * signal, and it has to be readable by more than one component at once. Modelling
 * it as an external system also removes the effect that would otherwise set
 * state during mount and cascade a second render.
 *
 * Snapshots are cached and only replaced when the decision actually changes,
 * because `useSyncExternalStore` compares snapshots by identity and a fresh
 * object on every read would loop.
 */

export type ConsentStatus = 'unknown' | 'undecided' | 'decided'

export type ConsentSnapshot = {
  status: ConsentStatus
  state: ConsentState | null
  gpc: boolean
}

/**
 * What the server renders and what the client renders on its first pass.
 *
 * Nothing optional may load against this snapshot and the banner must stay
 * hidden, which is what makes the markup identical on both sides and keeps
 * hydration clean.
 */
const SERVER_SNAPSHOT: ConsentSnapshot = { status: 'unknown', state: null, gpc: false }

let snapshot: ConsentSnapshot = SERVER_SNAPSHOT
let initialised = false

const listeners = new Set<() => void>()

function emit(): void {
  for (const listener of listeners) listener()
}

/**
 * Resolves the decision from the browser on first client read.
 *
 * A Global Privacy Control signal overrides a stored grant rather than losing to
 * it. The visitor may have enabled GPC after accepting, and docs/16 §5 treats the
 * signal as the current request.
 */
function initialise(): void {
  if (initialised) return
  initialised = true

  const gpc = detectGlobalPrivacyControl()

  if (gpc) {
    const denied = createConsentState({ analytics: 'denied', source: 'gpc', gpc: true })
    writeStoredConsent(denied)
    snapshot = { status: 'decided', state: denied, gpc: true }
    pushConsentModeUpdate(false)
    return
  }

  const stored = readStoredConsent()

  if (stored) {
    snapshot = { status: 'decided', state: stored, gpc: false }
    pushConsentModeUpdate(stored.analytics === 'granted')
    return
  }

  snapshot = { status: 'undecided', state: null, gpc: false }
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function getSnapshot(): ConsentSnapshot {
  initialise()
  return snapshot
}

export function getServerSnapshot(): ConsentSnapshot {
  return SERVER_SNAPSHOT
}

export function recordDecision(
  analytics: ConsentDecision,
  source: Exclude<ConsentSource, 'gpc'>,
): void {
  const next = createConsentState({ analytics, source, gpc: false })
  writeStoredConsent(next)
  snapshot = { status: 'decided', state: next, gpc: false }
  pushConsentModeUpdate(analytics === 'granted')
  emit()
}

/** Test seam. Resets module state between cases in the unit suite. */
export function resetConsentStoreForTests(): void {
  snapshot = SERVER_SNAPSHOT
  initialised = false
  listeners.clear()
}
