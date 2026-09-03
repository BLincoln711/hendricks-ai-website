import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { RESTING, SelectionMapFrame, type FrameControls, type FrameState } from '@/components/visuals/selection-map-frame'
import { ILLUSTRATIVE_CAPTION, plateChrome } from '@/content/shared/chrome'
import { selectionMapData } from '@/content/instruments/selection-map-data'

/**
 * The server-rendered plate: what a visitor with JavaScript off, and what an AI
 * crawler, is served.
 *
 * The frame is rendered to static markup and read back through the DOM parser,
 * which is the same thing the browser does with the response, so these
 * assertions are about the shipped HTML rather than about a React tree.
 */

const noop = () => {}
const CONTROLS: FrameControls = {
  selectScenario: noop,
  toggleIntervention: noop,
  toggleList: noop,
  toggleCycle: noop,
  pressLane: noop,
}

function frame(state: Partial<FrameState> = {}, controls?: FrameControls): Document {
  const markup = renderToStaticMarkup(
    SelectionMapFrame({ data: selectionMapData, state: { ...RESTING, ...state }, controls, id: 'plate-01' }),
  )
  return new DOMParser().parseFromString(`<!doctype html><body>${markup}`, 'text/html')
}

const resting = frame()
const drawings = [...resting.querySelectorAll('svg.dts')]
const plate = resting.querySelector('figure.plate')!

describe('the resting frame', () => {
  it('is one figure carrying both drawings and the plate mark', () => {
    expect(plate.getAttribute('data-scenario')).toBe('q1')
    expect(plate.getAttribute('data-intervention')).toBe('off')
    expect(plate.getAttribute('data-view')).toBe('drawing')
    expect(resting.querySelector('.plate-no')!.textContent).toBe(plateChrome.number)
    expect(resting.querySelector('.plate-title')!.textContent).toBe(plateChrome.title)
    expect(drawings).toHaveLength(2)
  })

  it('carries the locked illustrative line and the full text alternative', () => {
    const caption = resting.querySelector('figcaption.plate-cap')!
    expect(caption.querySelector('.illus')!.textContent).toBe(ILLUSTRATIVE_CAPTION)

    const alternative = caption.querySelector('#plate-01-alt')!
    expect(alternative.textContent).toBe(selectionMapData.scenarios[0].textAlternative)
    // Each drawing points at that one alternative, so it is read once.
    for (const svg of drawings) expect(svg.getAttribute('aria-describedby')).toBe('plate-01-alt')
  })

  it('names every drawing with its own title and description, as the first two children', () => {
    for (const svg of drawings) {
      expect(svg.children[0].tagName.toLowerCase()).toBe('title')
      expect(svg.children[1].tagName.toLowerCase()).toBe('desc')
      expect(svg.getAttribute('role')).toBe('img')
      expect(resting.getElementById(svg.getAttribute('aria-labelledby')!)).toBe(svg.children[0])
      expect(svg.children[1].textContent).toBe(ILLUSTRATIVE_CAPTION)
    }
  })

  it('renders the answer in words as well as in marks', () => {
    const states = [...resting.querySelectorAll('.plate-states li')].map((row) => row.textContent)
    expect(states).toHaveLength(5)
    expect(states[0]).toContain('Brand A')
    expect(states.join(' ')).toContain('not visible; exits')
    expect(states.join(' ')).toContain('evidence missing')
    expect(states.join(' ')).toContain('outcome connected')
  })

  it('ships the list view present and hidden, so the alternative exists before any script', () => {
    const list = resting.querySelector('.plate-list')!
    expect(list.hasAttribute('hidden')).toBe(true)
    expect(list.querySelectorAll('tbody tr')).toHaveLength(5)
    expect(list.querySelector('caption')!.textContent).toContain(ILLUSTRATIVE_CAPTION)
  })

  it('lists the six source types and never a publication', () => {
    const rows = [...resting.querySelectorAll('.sources li')]
    expect(rows).toHaveLength(6)
    expect(rows.map((row) => row.querySelector('.type')!.textContent)).toEqual(
      selectionMapData.sources.map((source) => source.label),
    )
    expect(resting.querySelector('.sources-h')!.textContent).toBe(plateChrome.sourcesHeading)
  })

  it('puts the pause control first in the key row, naming the action it performs', () => {
    const buttons = [...resting.querySelectorAll('.plate-key button')]
    expect(buttons[0].textContent).toBe(plateChrome.play)
    expect(buttons[0].getAttribute('aria-label')).toBe(plateChrome.playLabel)
    // A control whose label already carries the state must not also be a toggle.
    expect(buttons[0].hasAttribute('aria-pressed')).toBe(false)
    expect(buttons.map((button) => button.getAttribute('aria-pressed'))).toEqual([null, 'false', 'false'])
  })

  it('offers the three questions as radios with the question in the accessible name', () => {
    const inputs = [...resting.querySelectorAll('.picker input')]
    expect(inputs).toHaveLength(3)
    expect(inputs.map((input) => input.hasAttribute('checked'))).toEqual([true, false, false])
    expect(resting.querySelector('.picker legend')!.textContent).toBe(plateChrome.pickerLegend)
    expect(resting.querySelector('.pick .sr-only')!.textContent).toContain(selectionMapData.scenarios[0].question)
  })

  it('keys only the marks this frame draws', () => {
    const legend = [...resting.querySelectorAll('.kitem')].map((item) => item.textContent)
    expect(legend).toEqual(['Observed', 'Measured', 'evidence missing', 'misunderstood', 'exits'])
  })

  it('reserves the boxes that a frame change would otherwise move', () => {
    expect(resting.querySelector('.plate-q .q')!.textContent).toBe(selectionMapData.scenarios[0].question)
    // Present and hidden, not absent: the note holds its box while it is off.
    expect(resting.querySelector('.iv-note')!.hasAttribute('data-off')).toBe(true)
    expect(resting.querySelector('.iv-note')!.textContent).toBe(selectionMapData.scenarios[0].intervention.note)
  })

  it('leaves the live region empty and polite', () => {
    const live = resting.querySelector('.live')!
    expect(live.getAttribute('aria-live')).toBe('polite')
    expect(live.textContent).toBe('')
  })
})

describe('every mark in every drawing', () => {
  const painted = drawings.flatMap((svg) => [...svg.querySelectorAll('[fill], [stroke]')])

  it('reads a custom property and never a literal colour', () => {
    expect(painted.length).toBeGreaterThan(50)
    for (const mark of painted) {
      for (const attribute of ['fill', 'stroke'] as const) {
        const value = mark.getAttribute(attribute)
        if (value === null || value === 'none') continue
        expect(value, `${mark.tagName} ${attribute}`).toMatch(/^var\(--[a-z0-9-]+\)$/)
      }
    }
  })

  it('carries no text at all, because the words are HTML on the grid', () => {
    for (const svg of drawings) expect(svg.querySelectorAll('text, tspan')).toHaveLength(0)
  })

  it('hides the label layer from assistive technology, since the words are read elsewhere', () => {
    const layers = [...resting.querySelectorAll('.dts-labels')]
    expect(layers).toHaveLength(2)
    for (const layer of layers) expect(layer.getAttribute('aria-hidden')).toBe('true')
  })

  it('gives every drawable segment a unit path length, so a draw cannot move geometry', () => {
    for (const svg of drawings) {
      const segments = [...svg.querySelectorAll('[data-seq]')]
      expect(segments.length).toBeGreaterThan(5)
      for (const segment of segments) expect(segment.getAttribute('pathLength')).toBe('1')
    }
  })

  it('rests with no dash on any segment, so the final state is the state in the HTML', () => {
    for (const svg of drawings) {
      for (const segment of svg.querySelectorAll('[data-seq]')) {
        expect(segment.hasAttribute('stroke-dasharray')).toBe(false)
      }
    }
  })
})

describe('the frame the island renders', () => {
  it('is the resting frame again when it is idle', () => {
    // The island mounts and does nothing: the only difference between the two
    // renders is that one has handlers, which never reach the HTML.
    const server = frame().querySelector('figure.plate')!.outerHTML
    const island = frame({}, CONTROLS).querySelector('figure.plate')!.outerHTML
    expect(island).toBe(server)
  })

  it('changes exactly what the intervention claims and nothing else', () => {
    const after = frame({ intervention: true })
    expect(after.querySelector('figure.plate')!.getAttribute('data-intervention')).toBe('on')
    expect(after.querySelector('.iv-note')!.hasAttribute('data-off')).toBe(false)

    const states = [...after.querySelectorAll('.plate-states li')].map((row) => row.textContent!)
    const yourBrand = states.find((row) => row.startsWith('Your Brand'))!
    expect(yourBrand).toContain('shortlisted')
    expect(yourBrand).not.toContain('evidence missing')
    // Selection and Impact are measured, so the drawing still refuses to show them.
    expect(yourBrand).not.toContain('outcome connected')
  })

  it('reports a running cycle in the cycle control label and silences the live region', () => {
    const playing = frame({ playing: true })
    expect(playing.querySelector('.kbtn-cycle')!.textContent).toBe(plateChrome.pause)
    expect(playing.querySelector('.kbtn-cycle')!.getAttribute('aria-label')).toBe(plateChrome.pauseLabel)
    expect(playing.querySelector('.live')!.getAttribute('aria-live')).toBe('off')
  })

  it('reveals the list view without removing the drawing from the document', () => {
    const list = frame({ listView: true })
    expect(list.querySelector('.plate-list')!.hasAttribute('hidden')).toBe(false)
    expect(list.querySelector('figure.plate')!.getAttribute('data-view')).toBe('list')
    expect(list.querySelectorAll('svg.dts')).toHaveLength(2)
  })
})
