'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'

import { ANNOUNCE_DEBOUNCE_MS } from '@/lib/motion'

/**
 * The shared announcer (09 5.60; 11 section 7).
 *
 * Every off-screen announcement on the site goes through one `role="status"`
 * region, so politeness, debounce and clearing never diverge between the
 * consent sheet, the plate controls, the copy control and the forms. Rules:
 * one sentence per call; the last call inside the debounce wins; the region is
 * emptied before each write so an identical sentence is read again; the text
 * clears itself after `ANNOUNCEMENT_CLEAR_MS` so a stale sentence is not
 * re-read on the next focus change. Nothing here is assertive.
 *
 * `SiteShell` provides the context and mounts the region directly after
 * `main`; callers take `useAnnounce()`.
 */

/** How long an announced sentence stays in the region before it clears. */
export const ANNOUNCEMENT_CLEAR_MS = 5000

type Announcement = { id: number; text: string }

type AnnouncerContextValue = {
  announcement: Announcement
  announce: (text: string) => void
}

const AnnouncerContext = createContext<AnnouncerContextValue | null>(null)

const EMPTY: Announcement = { id: 0, text: '' }

export function AnnouncerProvider({ children }: { children: ReactNode }) {
  const [announcement, setAnnouncement] = useState<Announcement>(EMPTY)
  const debounce = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const clear = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const announce = useCallback((text: string) => {
    clearTimeout(debounce.current)
    debounce.current = setTimeout(() => {
      clearTimeout(clear.current)
      // A new id replaces the text node even when the sentence is unchanged,
      // which is the mutation assistive technology reads.
      setAnnouncement((previous) => ({ id: previous.id + 1, text }))
      clear.current = setTimeout(() => {
        setAnnouncement((previous) => ({ id: previous.id + 1, text: '' }))
      }, ANNOUNCEMENT_CLEAR_MS)
    }, ANNOUNCE_DEBOUNCE_MS)
  }, [])

  useEffect(
    () => () => {
      clearTimeout(debounce.current)
      clearTimeout(clear.current)
    },
    [],
  )

  const value = useMemo(() => ({ announcement, announce }), [announcement, announce])

  return <AnnouncerContext.Provider value={value}>{children}</AnnouncerContext.Provider>
}

function useAnnouncer(): AnnouncerContextValue {
  const context = useContext(AnnouncerContext)
  if (!context) {
    throw new Error('useAnnounce must be used inside AnnouncerProvider')
  }
  return context
}

/** The one polite region. Hidden with `sr-only`, never `display: none`, which silences it. */
export function LiveRegion() {
  const { announcement } = useAnnouncer()

  return (
    <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
      <span key={announcement.id}>{announcement.text}</span>
    </div>
  )
}

export function useAnnounce(): (text: string) => void {
  return useAnnouncer().announce
}
