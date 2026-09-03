import { Fragment, type ReactNode } from 'react'

import {
  Bracket,
  ChosenRing,
  ExitNode,
  GapMark,
  MisunderstoodNode,
  ObservedNode,
  OutcomeSquare,
  RuledSegment,
  Segment,
  SignalDot,
  drawingAttributes,
} from '@/components/visuals/marks'
import { ILLUSTRATIVE_CAPTION, plateChrome } from '@/content/shared/chrome'
import { DESKTOP, MOBILE, TICK_HALF, BRACKET_INSET, BRACKET_MARGIN } from '@/lib/selection-map/geometry'
import { drawnWord, hasGap, type ResolvedBrand, type ResolvedScenario } from '@/lib/selection-map/resolve'
import type { Stage } from '@/lib/selection-map/schema'

/**
 * Plate 01's drawing, in the geometry and markup of the approved canvas.
 *
 * Two layers per variant. The geometry layer is a fixed-viewBox SVG holding
 * guides, tracks, nodes, ticks, brackets and squares and no text at all. The
 * label layer is HTML on a grid whose tracks are the SVG's own columns and
 * rows, hidden from assistive technology because the words are read once, from
 * the text alternative and the state list.
 *
 * Two drawings, not a rotation: 664 by 400 with the stages across, 270 by 720
 * with the stages down. CSS shows one at a time at 900 px.
 *
 * Pure and shared: the server renders the resting frame from these components
 * and the island renders every later frame from the same ones, so a frame the
 * visitor asks for cannot drift from the frame the crawler was served.
 */

/** Stage indices on the nine-stage path, which are also the stagger order. */
const NEED = 0
const CONTEXT = 1
const DISCOVERY = 2
const UNDERSTANDING = 3
const EVIDENCE = 4
const CONSIDERATION = 5
const RECOMMENDATION = 6
const SELECTION = 7
const IMPACT = 8

/** A brand's track: the customer path for Your Brand, a muted line for the rest. */
function trackOf(brand: ResolvedBrand) {
  return brand.yourBrand
    ? { stroke: 'var(--path)', width: 2.5, r: 5 }
    : { stroke: 'var(--ev-muted)', width: 1.25, r: 4.5 }
}

/** The last stage the track runs to. The chosen brand's Impact segment is drawn separately. */
function lastStageOf(brand: ResolvedBrand) {
  return brand.chosen ? SELECTION : brand.reach + DISCOVERY
}

function bracketRowsOf(resolved: ResolvedScenario): [number, number] | null {
  const shortlisted = resolved.rows.filter((brand) => brand.recommendation === 'shortlisted')
  if (shortlisted.length === 0) return null
  const rows = shortlisted.map((brand) => brand.row)
  return [Math.min(...rows), Math.max(...rows)]
}

function Caption({ titleId, index, count }: { titleId: string; index: number; count: number }) {
  return (
    <>
      <title id={titleId}>{`${plateChrome.title}, question ${index} of ${count}`}</title>
      <desc>{ILLUSTRATIVE_CAPTION}</desc>
    </>
  )
}

/* ---- Desktop, the stages across ------------------------------------------ */

function DesktopSvg({ resolved, index, count, titleId, descriptionId }: FrameProps) {
  const { x, y, rulerY, needY, guideBottom } = DESKTOP
  const stages = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  const bracket = bracketRowsOf(resolved)

  return (
    <svg {...drawingAttributes(DESKTOP.viewBox, titleId, descriptionId)}>
      <Caption titleId={titleId} index={index} count={count} />
      <path d={`M8 ${rulerY}H656`} stroke="var(--rule-strong)" strokeWidth={1} fill="none" />
      <path d={stages.map((i) => `M${x(i)} ${rulerY - 8}V${rulerY}`).join('')} stroke="var(--rule-strong)" strokeWidth={1} fill="none" />
      <path
        d={stages.map((i) => `M${x(i)} ${rulerY}V${guideBottom}`).join('')}
        stroke="var(--guide)"
        strokeWidth={1}
        strokeDasharray="2 6"
        fill="none"
      />
      {/* The two decision points: the evidence gate and the shortlist. */}
      <path
        d={[EVIDENCE, RECOMMENDATION].map((i) => `M${x(i) - TICK_HALF} ${guideBottom}H${x(i) + TICK_HALF}`).join('')}
        stroke="var(--ink)"
        strokeWidth={2}
        fill="none"
      />

      <Segment d={`M8 ${needY}H${x(CONTEXT)}`} stroke="var(--path)" width={2} data-seq={NEED} />
      <circle cx={x(NEED)} cy={needY} r={5} fill="var(--path)" data-n={NEED} />
      <circle cx={x(CONTEXT)} cy={needY} r={5} fill="var(--path)" data-n={NEED} />

      {resolved.rows.map((brand) => {
        const track = trackOf(brand)
        const row = y(brand.row)
        const last = lastStageOf(brand)
        const segments = stages.slice(DISCOVERY, last)

        return (
          <g key={brand.id} data-brand={brand.id}>
            <Segment
              d={`M${x(CONTEXT)} ${needY}C${x(CONTEXT) + 48} ${needY} ${x(DISCOVERY) - 48} ${row} ${x(DISCOVERY)} ${row}`}
              stroke={track.stroke}
              width={track.width}
              data-seq={CONTEXT}
            />
            {segments.map((i) => (
              <Segment key={i} d={`M${x(i)} ${row}H${x(i + 1)}`} stroke={track.stroke} width={track.width} data-seq={i} />
            ))}
            <DesktopNodes brand={brand} row={row} r={track.r} />
          </g>
        )
      })}

      {bracket ? (
        <Bracket
          x={x(RECOMMENDATION) - BRACKET_INSET}
          y={y(bracket[0]) - BRACKET_MARGIN}
          width={BRACKET_INSET * 2}
          height={DESKTOP.rowPitch * (bracket[1] - bracket[0]) + BRACKET_MARGIN * 2}
          data-n={RECOMMENDATION}
        />
      ) : null}
    </svg>
  )
}

function DesktopNodes({ brand, row, r }: { brand: ResolvedBrand; row: number; r: number }) {
  const { x } = DESKTOP
  if (brand.discovery !== 'visible') return <ExitNode x={x(DISCOVERY)} y={row} data-n={DISCOVERY} />

  const last = lastStageOf(brand)
  return (
    <>
      <ObservedNode x={x(DISCOVERY)} y={row} r={r} data-n={DISCOVERY} />
      {brand.understanding === 'misunderstood' ? (
        <MisunderstoodNode x={x(UNDERSTANDING)} y={row} data-n={UNDERSTANDING} />
      ) : (
        <ObservedNode x={x(UNDERSTANDING)} y={row} r={r} data-n={UNDERSTANDING} />
      )}
      {last >= EVIDENCE ? (
        <>
          <ObservedNode x={x(EVIDENCE)} y={row} r={r} data-n={EVIDENCE} />
          {hasGap(brand) ? <GapMark x={x(EVIDENCE) + 14} y={row} data-n={EVIDENCE} /> : null}
        </>
      ) : null}
      {brand.consideration === 'not considered; exits' ? (
        <ExitNode x={x(CONSIDERATION)} y={row} data-n={CONSIDERATION} />
      ) : last >= CONSIDERATION ? (
        <ObservedNode x={x(CONSIDERATION)} y={row} r={r} data-n={CONSIDERATION} />
      ) : null}
      {brand.recommendation === 'not shortlisted; exits' ? (
        <ExitNode x={x(RECOMMENDATION)} y={row} data-n={RECOMMENDATION} />
      ) : brand.recommendation === 'shortlisted' ? (
        <ObservedNode x={x(RECOMMENDATION)} y={row} r={r} data-n={RECOMMENDATION} />
      ) : null}
      {brand.chosen ? (
        <>
          <ChosenRing x={x(SELECTION)} y={row} data-n={SELECTION} />
          <SignalDot x={x(SELECTION)} y={row} data-n={SELECTION} />
          <RuledSegment
            from={{ x: x(SELECTION) + 10, y: row }}
            to={{ x: x(IMPACT) - 9, y: row }}
            seq={IMPACT}
            n={IMPACT}
          />
          <OutcomeSquare x={x(IMPACT)} y={row} data-n={IMPACT} />
        </>
      ) : null}
    </>
  )
}

function DesktopLabels({ resolved, stages }: { resolved: ResolvedScenario; stages: readonly Stage[] }) {
  const { stageColumn, stageRow, upperRow, lowerRow, tickRow } = DESKTOP

  return (
    <div
      className="dts-labels dts-labels-d"
      aria-hidden="true"
      style={{ gridTemplateColumns: DESKTOP.labelColumns, gridTemplateRows: DESKTOP.labelRows }}
    >
      {resolved.rows.map((brand) => {
        const up = upperRow(brand.row)
        const lo = lowerRow(brand.row)
        return (
          <Fragment key={brand.id}>
            <Label className={`lb-brand${brand.yourBrand ? ' you' : ''}`} column={stageColumn(CONTEXT)} row={`${up} / span 3`}>
              {brand.label}
            </Label>
            <Label className="lb-state lo disc" column={stageColumn(DISCOVERY)} row={lo}>
              {brand.discovery}
            </Label>
            {drawnWord(brand, 'understanding') ? (
              <Label className="lb-state up" column={stageColumn(UNDERSTANDING)} row={up}>
                misunderstood
              </Label>
            ) : null}
            {drawnWord(brand, 'evidence') ? (
              <Label className="lb-state up gap" column={stageColumn(EVIDENCE)} row={up}>
                evidence missing
              </Label>
            ) : null}
            {drawnWord(brand, 'consideration') ? (
              <Label className="lb-state lo before" column={stageColumn(CONSIDERATION)} row={lo}>
                {brand.consideration}
              </Label>
            ) : null}
            {drawnWord(brand, 'recommendation') ? (
              <Label className="lb-state up" column={stageColumn(RECOMMENDATION)} row={up}>
                {brand.recommendation}
              </Label>
            ) : null}
            {brand.chosen ? (
              <Label className="lb-out" column={stageColumn(IMPACT)} row={`${lo} / span 3`}>
                outcome
                <br />
                connected
              </Label>
            ) : null}
          </Fragment>
        )
      })}

      {stages.map((stage, i) => (
        <Label key={stage.id} className={`lb-stage${i === NEED ? ' start' : ''}`} column={stageColumn(i)} row={stageRow(i)}>
          {stage.label}
        </Label>
      ))}
      <Label className="lb-tick" column={stageColumn(EVIDENCE)} row={tickRow}>
        evidence gate
      </Label>
      <Label className="lb-tick" column={stageColumn(RECOMMENDATION)} row={tickRow}>
        shortlist
      </Label>
    </div>
  )
}

/* ---- Mobile, the stages down --------------------------------------------- */

function MobileSvg({ resolved, index, count, titleId, descriptionId }: FrameProps) {
  const { x, y, rulerX, guideLeft, guideRight } = MOBILE
  const stages = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  const bracket = bracketRowsOf(resolved)
  const need = x(0)

  return (
    <svg {...drawingAttributes(MOBILE.viewBox, titleId, descriptionId)}>
      <Caption titleId={titleId} index={index} count={count} />
      <path d={`M${rulerX} ${y(NEED) - 12}V${y(IMPACT) + 12}`} stroke="var(--rule-strong)" strokeWidth={1} fill="none" />
      <path d={stages.map((i) => `M${rulerX} ${y(i)}H${guideLeft}`).join('')} stroke="var(--rule-strong)" strokeWidth={1} fill="none" />
      <path
        d={stages.map((i) => `M${guideLeft} ${y(i)}H${guideRight}`).join('')}
        stroke="var(--guide)"
        strokeWidth={1}
        strokeDasharray="2 6"
        fill="none"
      />
      <path
        d={[EVIDENCE, RECOMMENDATION].map((i) => `M${guideRight} ${y(i) - TICK_HALF}V${y(i) + TICK_HALF}`).join('')}
        stroke="var(--ink)"
        strokeWidth={2}
        fill="none"
      />

      <Segment d={`M${need} ${y(NEED)}V${y(CONTEXT)}`} stroke="var(--path)" width={2} data-seq={NEED} />
      <circle cx={need} cy={y(NEED)} r={5} fill="var(--path)" data-n={NEED} />
      <circle cx={need} cy={y(CONTEXT)} r={5} fill="var(--path)" data-n={NEED} />

      {resolved.rows.map((brand) => {
        const track = trackOf(brand)
        const column = x(brand.row)
        const last = lastStageOf(brand)
        const segments = stages.slice(DISCOVERY, last)

        return (
          <g key={brand.id} data-brand={brand.id}>
            <Segment
              d={`M${need} ${y(CONTEXT)}C${need} ${y(CONTEXT) + 38} ${column} ${y(DISCOVERY) - 38} ${column} ${y(DISCOVERY)}`}
              stroke={track.stroke}
              width={track.width}
              data-seq={CONTEXT}
            />
            {segments.map((i) => (
              <Segment key={i} d={`M${column} ${y(i)}V${y(i + 1)}`} stroke={track.stroke} width={track.width} data-seq={i} />
            ))}
            <MobileNodes brand={brand} column={column} r={track.r} />
          </g>
        )
      })}

      {bracket ? (
        <Bracket
          x={x(bracket[0]) - BRACKET_MARGIN}
          y={y(RECOMMENDATION) - BRACKET_INSET}
          width={MOBILE.columnPitch * (bracket[1] - bracket[0]) + BRACKET_MARGIN * 2}
          height={BRACKET_INSET * 2}
          data-n={RECOMMENDATION}
        />
      ) : null}
    </svg>
  )
}

function MobileNodes({ brand, column, r }: { brand: ResolvedBrand; column: number; r: number }) {
  const { y } = MOBILE
  if (brand.discovery !== 'visible') return <ExitNode x={column} y={y(DISCOVERY)} data-n={DISCOVERY} />

  const last = lastStageOf(brand)
  return (
    <>
      <ObservedNode x={column} y={y(DISCOVERY)} r={r} data-n={DISCOVERY} />
      {brand.understanding === 'misunderstood' ? (
        <MisunderstoodNode x={column} y={y(UNDERSTANDING)} data-n={UNDERSTANDING} />
      ) : (
        <ObservedNode x={column} y={y(UNDERSTANDING)} r={r} data-n={UNDERSTANDING} />
      )}
      {last >= EVIDENCE ? (
        <>
          <ObservedNode x={column} y={y(EVIDENCE)} r={r} data-n={EVIDENCE} />
          {hasGap(brand) ? <GapMark x={column} y={y(EVIDENCE) + 12} data-n={EVIDENCE} /> : null}
        </>
      ) : null}
      {brand.consideration === 'not considered; exits' ? (
        <ExitNode x={column} y={y(CONSIDERATION)} data-n={CONSIDERATION} />
      ) : last >= CONSIDERATION ? (
        <ObservedNode x={column} y={y(CONSIDERATION)} r={r} data-n={CONSIDERATION} />
      ) : null}
      {brand.recommendation === 'not shortlisted; exits' ? (
        <ExitNode x={column} y={y(RECOMMENDATION)} data-n={RECOMMENDATION} />
      ) : brand.recommendation === 'shortlisted' ? (
        <ObservedNode x={column} y={y(RECOMMENDATION)} r={r} data-n={RECOMMENDATION} />
      ) : null}
      {brand.chosen ? (
        <>
          <ChosenRing x={column} y={y(SELECTION)} data-n={SELECTION} />
          <SignalDot x={column} y={y(SELECTION)} data-n={SELECTION} />
          {/* The vertical ruled segment stops 8 units short of the square, as the reference draws it. */}
          <RuledSegment
            from={{ x: column, y: y(SELECTION) + 10 }}
            to={{ x: column, y: y(IMPACT) - 17 }}
            seq={IMPACT}
            n={IMPACT}
          />
          <OutcomeSquare x={column} y={y(IMPACT)} data-n={IMPACT} />
        </>
      ) : null}
    </>
  )
}

function MobileLabels({ resolved, stages }: { resolved: ResolvedScenario; stages: readonly Stage[] }) {
  return (
    <div
      className="dts-labels dts-labels-m"
      aria-hidden="true"
      style={{ gridTemplateColumns: MOBILE.labelColumns, gridTemplateRows: MOBILE.labelRows }}
    >
      {resolved.rows.map((brand) => (
        <Label
          key={brand.id}
          className={`lb-brand${brand.yourBrand ? ' you' : ''}`}
          column={MOBILE.brandColumn(brand.row)}
          row={MOBILE.brandRow(brand.row)}
        >
          {brand.label}
        </Label>
      ))}
      {stages.map((stage, i) => (
        <span key={stage.id} className="lb lb-band" style={{ gridColumn: MOBILE.fullRow, gridRow: MOBILE.stageBandRow(i) }}>
          <span className="lb-stage-m">{stage.label}</span>
        </span>
      ))}
    </div>
  )
}

/* ---- Shared -------------------------------------------------------------- */

function Label({
  className,
  column,
  row,
  children,
}: {
  className: string
  column: number | string
  row: number | string
  children: ReactNode
}) {
  return (
    <span className={`lb ${className}`} style={{ gridColumn: column, gridRow: row }}>
      {children}
    </span>
  )
}

type FrameProps = {
  resolved: ResolvedScenario
  index: number
  count: number
  titleId: string
  descriptionId: string
}

/**
 * Both drawings for one frame. `index` is the question's 1-based position, so
 * each SVG names the question it is showing rather than the instrument alone.
 */
export function SelectionMapDrawing({
  resolved,
  stages,
  index,
  count,
  idPrefix,
  descriptionId,
}: {
  resolved: ResolvedScenario
  stages: readonly Stage[]
  index: number
  count: number
  idPrefix: string
  descriptionId: string
}) {
  return (
    <>
      <div className="drawing drawing-desktop">
        <DesktopSvg resolved={resolved} index={index} count={count} titleId={`${idPrefix}-title-d`} descriptionId={descriptionId} />
        <DesktopLabels resolved={resolved} stages={stages} />
      </div>
      <div className="drawing drawing-mobile">
        <MobileSvg resolved={resolved} index={index} count={count} titleId={`${idPrefix}-title-m`} descriptionId={descriptionId} />
        <MobileLabels resolved={resolved} stages={stages} />
      </div>
    </>
  )
}
