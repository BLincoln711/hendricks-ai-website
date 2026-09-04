import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ObservationResult } from '@/components/observation/observation-result'
import { emptyObservation, observationEngines } from '@/content/instruments/observation-data'
import { selectionMapData } from '@/content/instruments/selection-map-data'
import { disclosure, queued } from '@/content/pages/observe'
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

  it('keeps Perplexity in the later queue and leaves only Gemini unprobed', () => {
    const byId = Object.fromEntries(observationEngines.map((engine) => [engine.id, engine]))

    expect(byId['google-ai-overviews']?.status).toBe('queued')
    expect(byId.chatgpt?.status).toBe('queued')
    expect(byId.perplexity?.status).toBe('queued')
    expect(byId.gemini?.status).toBe('not_probed')
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
  it('renders a queued empty map and does not invent shortlisted cells', () => {
    render(
      <ObservationResult
        query={{ brand: 'Northwind Logistics Group', category: 'industrial' }}
      />,
    )

    expect(screen.getByText(queued.instrumentLabel)).toBeInTheDocument()
    expect(screen.getByText(queued.status)).toBeInTheDocument()
    expect(screen.getByText(queued.mapEmpty)).toBeInTheDocument()
    expect(screen.getByText(disclosure.sample)).toBeInTheDocument()
    expect(screen.getByLabelText('Northwind Logistics Group')).toBeInTheDocument()

    expect(screen.queryByText('Brand A')).not.toBeInTheDocument()
    expect(screen.queryByText('shortlisted')).not.toBeInTheDocument()
    expect(screen.queryByText('Your Brand')).not.toBeInTheDocument()

    expect(screen.getByText('Perplexity').closest('li')).toHaveTextContent('queued')
    expect(screen.getByText('Gemini').closest('li')).toHaveTextContent(
      'not probed in this sample',
    )
  })
})
