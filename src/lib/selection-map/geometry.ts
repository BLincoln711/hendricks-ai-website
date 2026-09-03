/**
 * Plate 01 geometry, verbatim from the approved canvas page
 * `07-hifi/home-v3.html` (decision D-A). One unit is one CSS pixel at scale 1.
 *
 * Two drawings, not a rotation. Each is a fixed-viewBox SVG at `width: 100%`,
 * so its box is fixed by its aspect ratio and no frame of the cycle can move
 * the page. The label layer above it is HTML on a CSS grid whose tracks are
 * the drawing's own units, which is why the templates below are `fr` values
 * equal to the unit heights they cover: a label keeps the type scale while the
 * drawing scales, and every label belongs to a cell rather than to a
 * free-floating offset.
 *
 * Conflict recorded: `10-data-visualization-system.md` decision 10.8 sets the
 * desktop drawing at a 56-unit row pitch in a 664 by 480 viewBox. The approved
 * canvas uses 10.8's stated alternative, the 44-unit pitch in 664 by 400. The
 * canvas wins, so these are the canvas values.
 */

/** Nine stages across, five brand rows down. */
export const DESKTOP = {
  viewBox: '0 0 664 400',
  width: 664,
  height: 400,
  rulerY: 56,
  needY: 96,
  guideBottom: 372,
  rowPitch: 44,
  /** Stage `i` (0 to 8): the guide's x. */
  x: (i: number) => 44 + 72 * i,
  /** Brand row `j` (0 to 4): the track's y. */
  y: (j: number) => 168 + 44 * j,

  /** Eight units of margin, nine 72-unit stage cells, eight units of margin. */
  labelColumns: 'minmax(0,8fr) repeat(9, minmax(0,72fr)) minmax(0,8fr)',
  /**
   * Two staggered ruler rows, the need band, then five brand rows as a
   * 16-unit band above the 12-unit node zone and a 16-unit band below it, then
   * the tick-label row under the guides.
   */
  labelRows:
    'minmax(0,17fr) minmax(0,18fr) minmax(0,18fr) minmax(0,21fr) minmax(0,44fr) minmax(0,28fr) repeat(5, minmax(0,16fr) minmax(0,12fr) minmax(0,16fr)) minmax(0,6fr) minmax(0,28fr)',

  /** Grid column holding stage `i`. */
  stageColumn: (i: number) => i + 2,
  /** Ruler rows alternate, so nine stage names share 664 units without touching. */
  stageRow: (i: number) => (i % 2 === 0 ? 2 : 3),
  /** Brand row `j`: the band above its track, and the band below it. */
  upperRow: (j: number) => 7 + 3 * j,
  lowerRow: (j: number) => 9 + 3 * j,
  tickRow: 23,
} as const

/** Nine stages down, five brand columns across. */
export const MOBILE = {
  viewBox: '0 0 270 720',
  width: 270,
  height: 720,
  rulerX: 4,
  guideLeft: 12,
  guideRight: 266,
  columnPitch: 52,
  /** Brand column `j` (0 to 4): the track's x. The need path runs down column 0. */
  x: (j: number) => 30 + 52 * j,
  /** Stage `i` (0 to 8): the guide's y. */
  y: (i: number) => 102 + 72 * i,

  labelColumns: 'minmax(0,4fr) repeat(5, minmax(0,52fr)) minmax(0,6fr)',
  labelRows:
    'minmax(0,11fr) minmax(0,18fr) minmax(0,18fr) minmax(0,10fr) repeat(9, minmax(0,18fr) minmax(0,54fr)) minmax(0,15fr)',

  brandColumn: (j: number) => j + 2,
  /** Brand labels alternate rows, so five names share 270 units. */
  brandRow: (j: number) => (j % 2 === 0 ? 2 : 3),
  /** The 18-unit band above stage `i`, where its name sits knocked out of the guide. */
  stageBandRow: (i: number) => 5 + 2 * i,
  fullRow: '1 / span 7',
} as const

/** The decision ticks: a 10-unit mark across the end of one stage guide. */
export const TICK_HALF = 5

/** The shortlist bracket clears the node by 14 units on the guide's axis. */
export const BRACKET_INSET = 14
/** and by 16 units on the track's axis, so it always spans a whole row. */
export const BRACKET_MARGIN = 16
