import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ObservationResult } from '@/components/observation/observation-result'
import { emptyObservation, observationEngines, observeQueueHook } from '@/content/instruments/observation-data'
import { selectionMapData } from '@/content/instruments/selection-map-data'
import { disclosure, queued } from '@/content/pages/observe'
import { OBSERVE_ENGINE_IDS } from '@/lib/observation/contract'
import { createObservationJob } from '@/lib/observation/jobs'
import {
  displayBrand,
  parseObservationSearch,
  sampleIntentsFor,
} from '@/lib/observation/parse'

describe('observation data instance', () => {
  it('is empty and is not the home Selection Map data', () => {
    expect(emptyObservation.brands).toEqual([])
    expect(emptyObservation.cells).toEqual([])
    expect(emptyObservation.status).toBe('queued')
    expect(emptyObservation).not.toBe(selectionMapData)
    expect(selectionMapData.brands.map((brand) => brand.label)).toContain('Your Brand')
  })

  it('keeps Perplexity in the later queue and leaves only Gemini unmeasured', () => {
    const byId = Object.fromEntries(observationEngines.map((engine) => [engine.id, engine]))

    expect(byId.google_aio?.status).toBe('pending')
    expect(byId.chat_gpt?.status).toBe('pending')
    expect(byId.perplexity?.status).toBe('pending')
    expect(byId.gemini?.status).toBe('unmeasured')
    expect([...observationEngines.map((engine) => engine.id)]).toEqual([...OBSERVE_ENGINE_IDS])
    expect(observeQueueHook.create).toBe('POST /api/observe/jobs')
    expect(observeQueueHook.poll).toBe('GET /api/observe/jobs/:job_id')
    expect(observeQueueHook.wired).toBe(false)
  })
})

describe('parseObservationSearch', () => {
  it('stays idle when the query is empty', () => {
    expect(parseObservationSearch({})).toEqual({ status: 'idle' })
  })

  it('queues a valid brand and category without inventing peers', () => {
    const parsed = parseObservationSearch({ brand: 'Northwind', category: 'b2b-software' })

    expect(parsed).toEqual({
      status: 'queued',
      query: { brand: 'Northwind', category: 'b2b-software' },
    })
    if (parsed.status === 'queued') {
      expect(sampleIntentsFor(parsed.query.category)).toHaveLength(4)
    }
  })

  it('accepts brand_name as an alias for the GET fallback', () => {
    const parsed = parseObservationSearch({ brand_name: 'Northwind', category: 'industrial' })
    expect(parsed.status).toBe('queued')
  })

  it('returns field errors for an empty submit', () => {
    const parsed = parseObservationSearch({ brand: '', category: '' })

    expect(parsed.status).toBe('invalid')
    if (parsed.status === 'invalid') {
      expect(parsed.errors.brand).toBe('brand')
      expect(parsed.errors.category).toBe('category')
    }
  })

  it('rejects an unknown category rather than inventing one', () => {
    const parsed = parseObservationSearch({ brand: 'Northwind', category: 'real-estate' })

    expect(parsed.status).toBe('invalid')
    if (parsed.status === 'invalid') {
      expect(parsed.errors.category).toBe('category')
    }
  })
})

describe('displayBrand', () => {
  it('keeps a short brand intact and truncates a long one for display', () => {
    expect(displayBrand('Acme')).toEqual({ display: 'Acme', full: 'Acme' })

    const long = 'A Very Long Brand Name For Display Truncation'
    const shown = displayBrand(long)
    expect(shown.full).toBe(long)
    expect(shown.display.length).toBeLessThanOrEqual(28)
    expect(shown.display.endsWith('...')).toBe(true)
  })
})

describe('ObservationResult', () => {
  it('renders a pending board and does not invent shortlisted cells', () => {
    const job = createObservationJob({
      brand_name: 'Northwind Logistics Group',
      category: 'industrial',
      contexts: [...sampleIntentsFor('industrial')],
    })

    render(<ObservationResult job={job} />)

    expect(screen.getByText(queued.instrumentLabel)).toBeInTheDocument()
    expect(screen.getAllByText(queued.status).length).toBeGreaterThan(0)
    expect(screen.getByText(queued.boardCaption)).toBeInTheDocument()
    expect(screen.getByText(disclosure.sample)).toBeInTheDocument()
    expect(screen.getByLabelText('Northwind Logistics Group')).toBeInTheDocument()
    expect(screen.getByTitle(job.job_id)).toBeInTheDocument()

    expect(screen.queryByText('Brand A')).not.toBeInTheDocument()
    expect(screen.queryByText('shortlisted')).not.toBeInTheDocument()
    expect(screen.queryByText('Your Brand')).not.toBeInTheDocument()
    expect(screen.queryByText('cited')).not.toBeInTheDocument()
    expect(screen.queryByText('invisible')).not.toBeInTheDocument()

    const engineList = screen.getByRole('list', { name: 'Engines named in this sample' })
    expect(engineList).toHaveTextContent('Perplexity')
    expect(engineList).toHaveTextContent('pending')
    expect(engineList).toHaveTextContent('Gemini')
    expect(engineList).toHaveTextContent('unmeasured')
    expect(engineList).toHaveTextContent('not probed in this sample')
  })
})
