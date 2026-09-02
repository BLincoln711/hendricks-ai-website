/**
 * Motion primitives (redesign 11 section 8).
 *
 * Today this module carries the announcer debounce only. The three animation
 * primitives (`pathDraw`, `nodeActivate`, `dotAlongPath`), `stampMotion`,
 * `reduced`, `sequence` and `settled` land with the plate island (handoff PR
 * 6), which is also when `check:tokens` starts measuring this file against its
 * 3 KB compressed budget.
 */

/**
 * The shared announcer's debounce. A constant rather than
 * `--duration-standard`, which collapses to 0.01 ms under reduced motion and
 * would otherwise announce every intermediate scenario of an arrow run (11
 * section 7; 09 5.60).
 */
export const ANNOUNCE_DEBOUNCE_MS = 240
