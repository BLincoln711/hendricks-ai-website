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

  it('carries the full text alternative without a visible locked caption', () => {
    const caption = resting.querySelector('figcaption')!
    expect(caption.id).toBe('plate-01-alt')
    expect(caption.classList.contains('sr-only')).toBe(true)
    expect(caption.textContent).toBe(selectionMapData.scenarios[0].textAlternative)
    expect(caption.querySelector('.illus')).toBeNull()
    // Each drawing points at that one alternative, so it is read once.
    for (const svg of drawings) expect(svg.getAttribute('aria-describedby')).toBe('plate-01-alt')
  })

  it('names every drawing with its own title as the first child', () => {
    for (const svg of drawings) {
      expect(svg.children[0].tagName.toLowerCase()).toBe('title')
      expect(svg.getAttribute('role')).toBe('img')
      expect(resting.getElementById(svg.getAttribute('aria-labelledby')!)).toBe(svg.children[0])
    }
  })

  it('does not put the locked illustrative line inside the plate or each drawing', () => {
    // Two drawings ship at once, one per breakpoint, so a `desc` carrying the
    // disclaimer would put it into the accessibility tree twice. The page
    // legend carries the locked line once, outside this frame.
    for (const svg of drawings) expect(svg.querySelector('desc')).toBeNull()

    const spoken = [...resting.querySelectorAll('.illus')].filter(
      (node) => node.textContent === ILLUSTRATIVE_CAPTION,
    )
    expect(spoken).toHaveLength(0)
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
    // The whole view is hidden, the scroll region and its hint together, so the
    // hint never advertises a table nobody can see.
    const view = resting.querySelector('.plate-listview')!
    expect(view.hasAttribute('hidden')).toBe(true)
    expect(view.querySelectorAll('tbody tr')).toHaveLength(5)
    expect(view.querySelector('caption')!.textContent).toContain('Illustrative.')
    expect(view.querySelector('caption')!.textContent).not.toContain(ILLUSTRATIVE_CAPTION)
  })

  it('makes the table’s scroll region a named keyboard stop', () => {
    // It scrolls at narrow widths, so a keyboard-only reader has to be able to
    // reach it. axe reports this one as serious, and only at 320.
    const list = resting.querySelector('.plate-list')!
    expect(list.getAttribute('role')).toBe('region')
    expect(list.getAttribute('tabindex')).toBe('0')
    // 16 SM-08: the region carries the caption, not a shorter label, so moving
    // by landmark tells a reader as much as reading the table does.
    expect(list.getAttribute('aria-label')).toBe(
      resting.querySelector('.plate-list caption')!.textContent,
    )
    expect(list.getAttribute('aria-label')).toContain(plateChrome.listRegion)
  })

  it('offers the scroll hint outside the region, so it does not scroll away', () => {
    const hint = resting.querySelector('.plate-list-hint')!
    expect(hint.getAttribute('aria-hidden')).toBe('true')
    expect(hint.textContent).toBe(plateChrome.scrollHint)
    expect(hint.closest('.plate-list')).toBeNull()
  })

  it('lists the six source types and never a publication', () => {
    const rows = [...resting.querySelectorAll('.sources li')]
    expect(rows).toHaveLength(6)
    expect(rows.map((row) => row.querySelector('.type')!.textContent)).toEqual(
      selectionMapData.sources.map((source) => source.label),
    )
    expect(resting.querySelector('.sources-h')!.textContent).toBe(plateChrome.sourcesHeading)
  })

  it('names the brands in a lane in drawing order, as the approved canvas renders them', () => {
    // Top to bottom as the tracks are stacked, so a reader can cross-read a
    // row against the figure. The 04 appendix orders them alphabetically with
    // Your Brand last; the canvas wins.
    const rows = [...resting.querySelectorAll('.sources li')]
    expect(rows[2].querySelector('.who')!.textContent).toBe('Brand A, Your Brand, Brand B, Brand C')
    expect(rows[0].querySelector('.miss')!.textContent).toBe(`${plateChrome.missingFor} Your Brand, Brand C`)
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

  it('keys only the marks this frame draws, and keeps the box of the ones it does not', () => {
    const legend = [...resting.querySelectorAll('.kitem')]
    expect(legend.map((item) => item.textContent)).toEqual([
      'Observed',
      'Measured',
      'evidence missing',
      'misunderstood',
      'exits',
    ])
    // Q1 draws all five, so nothing is hidden here.
    expect(legend.filter((item) => item.hasAttribute('data-off'))).toHaveLength(0)

    // Q2's intervention clears the one misunderstanding, so that mark leaves
    // the drawing. It keeps its box and gives up its ink, and it is hidden
    // from assistive technology with it.
    const cleared = [...frame({ scenario: 1, intervention: true }).querySelectorAll('.kitem')]
    expect(cleared).toHaveLength(5)
    const off = cleared.filter((item) => item.hasAttribute('data-off'))
    expect(off.map((item) => item.textContent)).toEqual(['misunderstood'])
    expect(off[0].getAttribute('aria-hidden')).toBe('true')
  })

  it('reserves the boxes that a frame change would otherwise move', () => {
    // Every question is in the slot and one is shown, so the slot is as tall
    // as the longest question at this width and changing question moves
    // nothing beneath it.
    const questions = [...resting.querySelectorAll('.plate-q > p')]
    expect(questions.map((line) => line.querySelector('.q')!.textContent)).toEqual(
      selectionMapData.scenarios.map((scenario) => scenario.question),
    )
    const shown = questions.filter((line) => !line.hasAttribute('data-off'))
    expect(shown).toHaveLength(1)
    expect(shown[0].querySelector('.q')!.textContent).toBe(selectionMapData.scenarios[0].question)
    expect(shown[0].querySelector('.c')!.textContent).toBe(selectionMapData.scenarios[0].context)
    for (const hidden of questions.filter((line) => line.hasAttribute('data-off'))) {
      expect(hidden.getAttribute('aria-hidden')).toBe('true')
    }

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
