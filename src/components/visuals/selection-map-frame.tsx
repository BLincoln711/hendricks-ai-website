import { EvidenceKey } from '@/components/visuals/evidence-key'
import { PlateListView, PlateStates } from '@/components/visuals/plate-list-view'
import { SelectionMapDrawing } from '@/components/visuals/selection-map-drawing'
import { SourcesLedger } from '@/components/visuals/sources-ledger'
import { ILLUSTRATIVE_CAPTION, plateChrome } from '@/content/shared/chrome'
import { keyItemsOf, resolveScenario } from '@/lib/selection-map/resolve'
import type { SelectionMapData, SourceId } from '@/lib/selection-map/schema'

/**
 * One frame of Plate 01: the whole figure, derived from the data and a plain
 * state object.
 *
 * This module is deliberately not marked `'use client'`. The server renders
 * the resting frame from it and the island renders every later frame from the
 * same code, so a frame a visitor asks for cannot drift from the frame a
 * crawler was served, and there is one renderer to review rather than two.
 *
 * `controls` is the only difference between the two renders. The server passes
 * none, so the figure emits as static HTML with no event handlers in the RSC
 * payload; the island passes handlers and the same elements become live. The
 * controls are in the DOM either way, which is why the no-JavaScript page is
 * complete rather than degraded: it shows the resting frame, its state list
 * and its sources, and only the frame changes are unavailable.
 */

export type FrameState = {
  /** Zero-based index into `data.scenarios`. */
  scenario: number
  intervention: boolean
  listView: boolean
  /** True while the automatic cycle is running, which is what the control's label reports. */
  playing: boolean
  activeLane: SourceId | null
  /** The live region's text. Empty at rest, and empty in the server frame. */
  announcement: string
}

export const RESTING: FrameState = {
  scenario: 0,
  intervention: false,
  listView: false,
  playing: false,
  activeLane: null,
  announcement: '',
}

export type FrameControls = {
  selectScenario: (index: number) => void
  toggleIntervention: () => void
  toggleList: () => void
  toggleCycle: () => void
  pressLane: (lane: SourceId) => void
}

export function SelectionMapFrame({
  data,
  state,
  controls,
  id,
}: {
  data: SelectionMapData
  state: FrameState
  controls?: FrameControls
  id: string
}) {
  const scenario = data.scenarios[state.scenario]
  const resolved = resolveScenario(data, scenario, state.intervention)
  const count = data.scenarios.length
  const index = state.scenario + 1
  const altId = `${id}-alt`

  return (
    <figure
      className="plate"
      id={id}
      data-scenario={scenario.id}
      data-intervention={state.intervention ? 'on' : 'off'}
      data-view={state.listView ? 'list' : 'drawing'}
    >
      <div className="plate-head">
        <span className="plate-no">{plateChrome.number}</span>
        <span className="plate-title">{plateChrome.title}</span>
      </div>
      <p className="plate-gloss">{plateChrome.gloss}</p>

      <fieldset className="picker">
        <legend>{plateChrome.pickerLegend}</legend>
        <div className="picker-items">
          {data.scenarios.map((candidate, i) => (
            <label key={candidate.id} className="pick">
              <input
                type="radio"
                name={`${id}-question`}
                value={candidate.id}
                {...(controls
                  ? { checked: i === state.scenario, onChange: () => controls.selectScenario(i) }
                  : { defaultChecked: i === state.scenario })}
              />
              <span>
                {plateChrome.questionLabel(i + 1)}
                {/* One expression, so the served HTML carries no text separators inside the name. */}
                <span className="sr-only">{` of ${count}. ${candidate.question}`}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Reserved slot: the question line holds its box at every question. */}
      <p className="plate-q">
        <span className="q">{scenario.question}</span>
        <span className="c">{scenario.context}</span>
      </p>

      {/* Reserved slot: the note keeps its box while it is off, so turning it on shifts nothing. */}
      <p className="iv-note" {...(state.intervention ? null : { 'data-off': '' })}>
        {scenario.intervention.note}
      </p>

      <div className="plate-grid">
        <div className="plate-main">
          <SelectionMapDrawing
            resolved={resolved}
            stages={data.stages}
            index={index}
            count={count}
            idPrefix={id}
            descriptionId={altId}
          />
          <PlateStates resolved={resolved} />
          <PlateListView data={data} resolved={resolved} index={index} count={count} hidden={!state.listView} />
        </div>
        <div className="plate-side">
          <SourcesLedger
            data={data}
            resolved={resolved}
            activeLane={state.activeLane}
            {...(controls ? { onPressLane: controls.pressLane } : null)}
          />
        </div>
      </div>

      <div className="plate-key">
        <button
          type="button"
          className="kbtn kbtn-cycle"
          id={`${id}-cycle`}
          aria-label={state.playing ? plateChrome.pauseLabel : plateChrome.playLabel}
          {...(controls ? { onClick: controls.toggleCycle } : null)}
        >
          {state.playing ? plateChrome.pause : plateChrome.play}
        </button>
        <button
          type="button"
          className="kbtn"
          aria-pressed={state.intervention}
          {...(controls ? { onClick: controls.toggleIntervention } : null)}
        >
          {plateChrome.interventionToggle}
        </button>
        <button
          type="button"
          className="kbtn"
          aria-pressed={state.listView}
          {...(controls ? { onClick: controls.toggleList } : null)}
        >
          {state.listView ? plateChrome.drawingToggle : plateChrome.listToggle}
        </button>
        <EvidenceKey items={keyItemsOf(resolved)} />
      </div>

      <figcaption className="plate-cap">
        <span className="illus">{ILLUSTRATIVE_CAPTION}</span>
        <span className="sr-only" id={altId}>
          {scenario.textAlternative}
        </span>
      </figcaption>

      {/* Silent while the cycle runs: an automatic frame change is not an announcement. */}
      <p className="live" role="status" aria-live={state.playing ? 'off' : 'polite'}>
        {state.announcement}
      </p>
    </figure>
  )
}
