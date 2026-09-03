'use client'

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react'

import { RESTING, SelectionMapFrame, type FrameControls, type FrameState } from '@/components/visuals/selection-map-frame'
import { plateChrome } from '@/content/shared/chrome'
import { ANNOUNCE_DEBOUNCE_MS, drawInstrument, reduced, stampMotion } from '@/lib/motion'
import type { SelectionMapData, SourceId } from '@/lib/selection-map/schema'

/**
 * The instrument's one client island.
 *
 * Through hydration it renders `children`, which is the server component's
 * resting frame, so the markup React reconciles against is the markup the
 * crawler was served. It then takes the frame over with the same
 * `SelectionMapFrame`, rendered from client state and wired to handlers. There
 * is one renderer, not a server copy and a client copy that can drift, and the
 * two renders are asserted identical in `plate-render.test.ts` and again in
 * the browser in `instrument.spec.ts`.
 *
 * The cycle is a demonstration, not a carousel. It runs only while the plate
 * is on screen, never under reduced motion, never in the list view, and it
 * hands control over for good on any deliberate interaction. Its 44 px Pause
 * and Play control is first in the key row and names the action it will
 * perform, so the label alone carries the state and the button is not also a
 * pressed toggle saying the opposite.
 */

const HOLD_SCENARIO_MS = 2200
const HOLD_INTERVENTION_MS = 2600
const SEQUENCE_MS = 1400
const ANNOUNCE_CLEAR_MS = 5000
/**
 * The cycle runs while a quarter of the figure, or half a screen's worth of
 * it, is visible. The second half of that rule is what makes it work on a
 * phone, where the instrument is several screens tall and a quarter of it is
 * never on screen at once. The thresholds are stepped so the callback fires as
 * the visible fraction grows, rather than only at a single crossing.
 */
const IN_VIEW_RATIO = 0.25
const IN_VIEW_SCREEN_FRACTION = 0.5
const IN_VIEW_THRESHOLDS = [0, 0.1, 0.2, IN_VIEW_RATIO, IN_VIEW_SCREEN_FRACTION]

/**
 * False through the server render and the hydration render, true afterwards.
 * A state hook set from an effect would do the same thing one render later and
 * one lint suppression worse.
 */
const subscribeNever = () => () => {}

export function SelectionMapIsland({
  data,
  id,
  children,
}: {
  data: SelectionMapData
  id: string
  children: ReactNode
}) {
  const hydrated = useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false,
  )
  const [state, setState] = useState<FrameState>(RESTING)
  const [playing, setPlaying] = useState(false)
  const mountRef = useRef<HTMLDivElement>(null)
  /** Set once the visitor takes control, and never cleared by the observer: the cycle does not resume behind them. */
  const handedOver = useRef(false)
  const timers = useRef<number[]>([])

  const count = data.scenarios.length

  const update = useCallback((next: Partial<FrameState>) => {
    setState((previous) => ({ ...previous, ...next }))
  }, [])

  const announce = useCallback(
    (message: string) => {
      timers.current.forEach(window.clearTimeout)
      timers.current = [
        window.setTimeout(() => {
          update({ announcement: message })
          timers.current.push(window.setTimeout(() => update({ announcement: '' }), ANNOUNCE_CLEAR_MS))
        }, ANNOUNCE_DEBOUNCE_MS),
      ]
    },
    [update],
  )

  /** Any deliberate interaction leaves the visitor on the frame they chose. */
  const takeControl = useCallback(() => {
    handedOver.current = true
    setPlaying(false)
  }, [])

  const controls: FrameControls = {
    selectScenario: (index) => {
      takeControl()
      update({ scenario: index, intervention: false, activeLane: null })
      announce(data.scenarios[index].announce.resting)
    },
    toggleIntervention: () => {
      takeControl()
      const next = !state.intervention
      update({ intervention: next })
      const lines = data.scenarios[state.scenario].announce
      announce(next ? lines.interventionOn : lines.interventionOff)
    },
    toggleList: () => {
      takeControl()
      const next = !state.listView
      update({ listView: next })
      announce(next ? plateChrome.listViewOn(state.scenario + 1, count) : plateChrome.listViewOff)
    },
    toggleCycle: () => {
      if (playing) {
        takeControl()
        return
      }
      handedOver.current = false
      setPlaying(true)
    },
    pressLane: (lane: SourceId) => {
      takeControl()
      update({ activeLane: state.activeLane === lane ? null : lane })
    },
  }

  /* The reduced-motion switch every primitive reads, kept in sync with the query. */
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => {
      stampMotion(query.matches)
      if (query.matches) setPlaying(false)
    }
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  /* The cycle runs only while the plate is on screen, and never starts behind a handover. */
  useEffect(() => {
    const mount = mountRef.current
    if (!mount || !('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const onScreen =
          entry.intersectionRatio >= IN_VIEW_RATIO ||
          entry.intersectionRect.height >= window.innerHeight * IN_VIEW_SCREEN_FRACTION
        setPlaying(onScreen && !handedOver.current && !reduced() && !state.listView)
      },
      { threshold: IN_VIEW_THRESHOLDS },
    )
    observer.observe(mount)
    return () => observer.disconnect()
  }, [state.listView])

  /* One step per tick: the scenario, then its intervention, then the next scenario. */
  useEffect(() => {
    if (!playing) return
    const showingIntervention = state.intervention
    const timer = window.setTimeout(
      () =>
        showingIntervention
          ? update({ scenario: (state.scenario + 1) % count, intervention: false })
          : update({ intervention: true }),
      SEQUENCE_MS + (showingIntervention ? HOLD_INTERVENTION_MS : HOLD_SCENARIO_MS),
    )
    return () => window.clearTimeout(timer)
  }, [playing, state.scenario, state.intervention, count, update])

  /*
   * Reveal a frame the visitor has not seen yet. Every mark is already in the
   * DOM before this runs, and the frame on arrival is never animated: motion
   * that plays itself at load is decoration.
   */
  const frameKey = `${state.scenario}-${state.intervention}`
  const drawn = useRef(frameKey)
  useEffect(() => {
    if (drawn.current === frameKey) return
    drawn.current = frameKey
    if (mountRef.current) drawInstrument(mountRef.current)
  }, [frameKey])

  useEffect(() => () => timers.current.forEach(window.clearTimeout), [])

  return (
    <div className="plate-mount" ref={mountRef}>
      {hydrated ? <SelectionMapFrame data={data} state={{ ...state, playing }} controls={controls} id={id} /> : children}
    </div>
  )
}
