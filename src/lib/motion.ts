/**
 * Motion primitives (redesign 11 section 8; 16 MO-01 and MO-05).
 *
 * Web Animations API, no library, no `requestAnimationFrame`, no CSS
 * `@keyframes`. Two rules hold everywhere:
 *
 * 1. The rest state is the final state. Every primitive animates with
 *    `fill: 'backwards'`, so the opening keyframe applies only while the
 *    animation is pending or running and the element reverts to the value the
 *    stylesheet already gave it. Nothing a primitive does is ever the reason a
 *    mark is visible, which is why the page reads complete with the script
 *    absent, blocked, or still loading.
 * 2. Under `data-motion="reduce"` a primitive returns before calling
 *    `animate()`, so no animation object is created at all rather than one
 *    created and collapsed to a near-zero duration.
 *
 * Only `opacity` and stroke dashes are animated, so no primitive can move the
 * layout and the plate's CLS stays at zero through a whole cycle.
 */

/** The shared announcer's debounce. A constant, so it survives the reduced-motion collapse. */
export const ANNOUNCE_DEBOUNCE_MS = 240

const DRAW_MS = 340
const POP_MS = 200
const STAGGER_MS = 120
const POP_OFFSET_MS = 220
const EASE_OUT = 'cubic-bezier(.22,.61,.36,1)'

/** Stamps the reduced-motion preference on the root, the one switch every primitive reads. */
export function stampMotion(reduce: boolean): void {
  document.documentElement.setAttribute('data-motion', reduce ? 'reduce' : 'full')
}

export function reduced(): boolean {
  return document.documentElement.getAttribute('data-motion') === 'reduce'
}

/**
 * Path draw. The segment carries `pathLength="1"`, so one dash unit is its
 * whole length and an offset of 1 hides it without touching its geometry.
 */
function pathDraw(element: Element, order: number): Animation | null {
  if (reduced()) return null
  return element.animate(
    [
      { strokeDasharray: '1', strokeDashoffset: '1' },
      { strokeDasharray: '1', strokeDashoffset: '0' },
    ],
    { duration: DRAW_MS, delay: order * STAGGER_MS, easing: EASE_OUT, fill: 'backwards' },
  )
}

/** Node activate. A mark arrives after the segment that reaches it has drawn. */
function nodeActivate(element: Element, order: number): Animation | null {
  if (reduced()) return null
  return element.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: POP_MS,
    delay: order * STAGGER_MS + POP_OFFSET_MS,
    easing: 'ease',
    fill: 'backwards',
  })
}

/**
 * Draws one frame of an instrument: every `data-seq` segment and every
 * `data-n` mark inside `host`, staggered by the stage index each carries.
 * Returns the animations it created, which is none under reduced motion.
 */
export function drawInstrument(host: ParentNode): Animation[] {
  const created: Animation[] = []
  for (const element of host.querySelectorAll('[data-seq]')) {
    const animation = pathDraw(element, Number(element.getAttribute('data-seq')))
    if (animation) created.push(animation)
  }
  for (const element of host.querySelectorAll('[data-n]')) {
    const animation = nodeActivate(element, Number(element.getAttribute('data-n')))
    if (animation) created.push(animation)
  }
  return created
}

/**
 * The finished-or-zero-duration predicate (16 VZ-09 and MO-01). A strict count
 * of zero is flaky by construction, because a reduced-motion blanket collapses
 * durations rather than removing animations; this asks the question the gate
 * actually means, which is whether anything is still moving.
 */
export function settled(): boolean {
  return document
    .getAnimations()
    .every((animation) => animation.playState === 'finished' || (animation.effect?.getComputedTiming().activeDuration ?? 0) === 0)
}
