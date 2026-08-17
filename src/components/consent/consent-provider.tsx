'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react'

import { analyticsAllowed, type ConsentDecision, type ConsentSource } from '@/lib/consent/state'
import {
  getServerSnapshot,
  getSnapshot,
  recordDecision,
  subscribe,
  type ConsentSnapshot,
} from '@/lib/consent/store'

/**
 * Consent context (docs/16 §4–§6).
 *
 * The decision itself comes from the external store; the only thing this
 * provider owns is whether the preferences modal is open, which is genuinely
 * React state.
 *
 * `status` distinguishes three situations a boolean cannot:
 *
 * - `unknown`   — the server snapshot. Nothing optional may load and the banner
 *                 stays hidden, so the markup matches on both sides of
 *                 hydration.
 * - `undecided` — the browser holds no usable record. Show the banner.
 * - `decided`   — a record exists. `state.analytics` is authoritative.
 */
type ConsentContextValue = ConsentSnapshot & {
  analyticsGranted: boolean
  isPreferencesOpen: boolean
  openPreferences: () => void
  closePreferences: () => void
  decide: (analytics: ConsentDecision, source: Exclude<ConsentSource, 'gpc'>) => void
}

const ConsentContext = createContext<ConsentContextValue | null>(null)

export function ConsentProvider({ children }: { children: ReactNode }) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const [isPreferencesOpen, setPreferencesOpen] = useState(false)

  const decide = useCallback(
    (analytics: ConsentDecision, source: Exclude<ConsentSource, 'gpc'>) => {
      recordDecision(analytics, source)
      setPreferencesOpen(false)
    },
    [],
  )

  const openPreferences = useCallback(() => setPreferencesOpen(true), [])
  const closePreferences = useCallback(() => setPreferencesOpen(false), [])

  const value = useMemo<ConsentContextValue>(
    () => ({
      ...snapshot,
      analyticsGranted: analyticsAllowed(snapshot.state),
      isPreferencesOpen,
      openPreferences,
      closePreferences,
      decide,
    }),
    [snapshot, isPreferencesOpen, openPreferences, closePreferences, decide],
  )

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
}

export function useConsent(): ConsentContextValue {
  const context = useContext(ConsentContext)
  if (!context) {
    throw new Error('useConsent must be used inside ConsentProvider')
  }
  return context
}
