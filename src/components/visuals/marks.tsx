import type { SVGProps } from 'react'

/**
 * The mark vocabulary Plate 01 draws (redesign 10 section 2), with the values
 * the approved canvas uses. Every fill and stroke is a `var()` reference, so
 * `check:tokens` can grep an SVG for a hex and fail on a hit, and a forced
 * colour mode repaints the drawing rather than erasing it. Nothing here
 * carries `forced-color-adjust`.
 *
 * A hollow mark is knocked out of the one ground with `var(--bg)`, which is
 * what the canvas does: there is no lifted surface under the instrument.
 *
 * `data-seq` marks a segment the path-draw primitive may reveal, `data-n` a
 * mark the activate primitive may pop. Both carry the index of the stage they
 * belong to in the nine-stage path, which is also the stagger order.
 */

type Point = { x: number; y: number }
type Attrs = Record<`data-${string}`, string | number | undefined>

/** A track segment: the only kind of element the path-draw primitive touches. */
export function Segment({
  d,
  stroke,
  width,
  ...attrs
}: { d: string; stroke: string; width: number } & Attrs) {
  return <path d={d} pathLength={1} stroke={stroke} strokeWidth={width} fill="none" {...attrs} />
}

/** Mark 1: a filled circle, r 5 on the customer path, r 4.5 on a muted track. */
export function ObservedNode({ x, y, r = 5, ...attrs }: Point & { r?: number } & Attrs) {
  return <circle cx={x} cy={y} r={r} fill="var(--ev-observed)" {...attrs} />
}

/** Mark 3: hollow and solid, because the system drew an outline of the brand, not the brand. */
export function MisunderstoodNode({ x, y, ...attrs }: Point & Attrs) {
  return <circle cx={x} cy={y} r={5} fill="var(--bg)" stroke="var(--ev-observed)" strokeWidth={1.75} {...attrs} />
}

/** Mark 4: a hollow ring with a 45 degree strike; the track ends here. */
export function ExitNode({ x, y, ...attrs }: Point & Attrs) {
  return (
    <g {...attrs}>
      <circle cx={x} cy={y} r={5} fill="var(--bg)" stroke="var(--ev-observed)" strokeWidth={1.5} />
      <path
        d={`M${x - 5} ${y + 5}L${x + 5} ${y - 5}`}
        stroke="var(--ev-muted)"
        strokeWidth={1.5}
        strokeLinecap="round"
        fill="none"
      />
    </g>
  )
}

/** Mark 5: the amber cross, 12 units, round caps. It never appears without the words beside it. */
export function GapMark({ x, y, ...attrs }: Point & Attrs) {
  return (
    <path
      d={`M${x - 6} ${y - 6}L${x + 6} ${y + 6}M${x + 6} ${y - 6}L${x - 6} ${y + 6}`}
      stroke="var(--ev-gap)"
      strokeWidth={2}
      strokeLinecap="round"
      fill="none"
      {...attrs}
    />
  )
}

/**
 * Mark 8: the ruled (measured) segment. Two elements, so the ticks scale with
 * the line: the line itself is a `data-seq` segment the draw primitive
 * reveals, the tick track a `data-n` mark that pops with the outcome square.
 */
export function RuledSegment({ from, to, seq, n }: { from: Point; to: Point; seq: number; n: number }) {
  const horizontal = from.y === to.y
  const ticks: string[] = []
  if (horizontal) {
    for (let x = from.x + 4; x <= to.x - 5; x += 8) ticks.push(`M${x} ${from.y + 1}V${from.y + 7}`)
  } else {
    for (let y = from.y + 4; y <= to.y - 5; y += 8) ticks.push(`M${from.x + 1} ${y}H${from.x + 7}`)
  }
  return (
    <>
      <Segment
        d={horizontal ? `M${from.x} ${from.y}H${to.x}` : `M${from.x} ${from.y}V${to.y}`}
        stroke="var(--ev-measured)"
        width={2}
        data-seq={seq}
      />
      <path d={ticks.join('')} stroke="var(--ev-measured)" strokeWidth={2} fill="none" data-n={n} />
    </>
  )
}

/** Mark 11: the filled measured square that ends the Impact segment. */
export function OutcomeSquare({ x, y, ...attrs }: Point & Attrs) {
  return <rect x={x - 9} y={y - 9} width={18} height={18} rx={1} fill="var(--ev-measured)" {...attrs} />
}

/** Mark 13: the shortlist bracket. It spans whole rows, never part of one. */
export function Bracket({ x, y, width, height, ...attrs }: Point & { width: number; height: number } & Attrs) {
  return <rect x={x} y={y} width={width} height={height} rx={4} fill="none" stroke="var(--ink)" strokeWidth={1.25} {...attrs} />
}

/** Mark 14: the chosen ring, whose outer edge fills the node zone exactly. */
export function ChosenRing({ x, y, ...attrs }: Point & Attrs) {
  return <circle cx={x} cy={y} r={9.25} fill="none" stroke="var(--ink)" strokeWidth={1.5} {...attrs} />
}

/** Mark 15: the signal dot. Inside the chosen ring it needs no field ring of its own. */
export function SignalDot({ x, y, ...attrs }: Point & Attrs) {
  return <circle cx={x} cy={y} r={7} fill="var(--signal-dot)" {...attrs} />
}

/**
 * Shared attributes for a plate drawing (10 decision 10.14): the SVG is
 * exposed as an image named by its own `<title>` and described by the figure's
 * text alternative, with the HTML label layer hidden from assistive
 * technology, so the drawing is read once and read in words.
 */
export function drawingAttributes(
  viewBox: string,
  titleId: string,
  descriptionId: string,
): SVGProps<SVGSVGElement> {
  return {
    className: 'dts',
    viewBox,
    preserveAspectRatio: 'xMinYMin meet',
    role: 'img',
    'aria-labelledby': titleId,
    'aria-describedby': descriptionId,
    focusable: 'false',
  }
}
