'use client'

import { useSyncExternalStore } from 'react'

/** Never emits. Hydration happens once, so there is nothing to subscribe to. */
const subscribe = () => () => {}

/**
 * False on the server and on the first client pass, true afterwards.
 *
 * The pattern for progressive enhancement that keeps hydration honest: the
 * markup React renders on the client's first pass is identical to the markup
 * the server sent, so a component can render its no-JavaScript form and then
 * swap without a mismatch. An effect that sets state would do the same thing
 * one cascading render later.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )
}
