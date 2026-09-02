import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { FactStrip, LedgerList } from '@/components/sections/ledger'
import { DemandToSelectionPath } from '@/components/visuals/demand-to-selection-path'

/**
 * The ledger (09 5.14) and the ordered-stage rule it shares with the
 * Demand-to-Selection path (16 SM-06): order that carries meaning is an `ol`,
 * a set is a `ul`, every item is labelled in text, and the margin index is
 * hidden from assistive technology.
 */

const columns = { name: 'Phase', description: 'Question', link: 'Read', output: 'Output' }

const phases = [
  {
    name: 'Demand',
    description: 'What are customers trying to accomplish?',
    link: { label: 'Search Demand Intelligence', href: '/solutions/search-demand-intelligence' },
    output: 'Demand Map',
  },
  { name: 'Selection', description: 'Does the brand become a legitimate option?', output: 'Selection Map' },
]

describe('LedgerList', () => {
  it('renders an ordered list with one heading per row and hidden indices', () => {
    render(<LedgerList rows={phases} columns={columns} ariaLabelledBy="phases-title" />)

    const list = screen.getByRole('list')
    expect(list.tagName).toBe('OL')
    expect(list).toHaveAttribute('aria-labelledby', 'phases-title')

    const headings = screen.getAllByRole('heading', { level: 3 })
    expect(headings.map((heading) => heading.textContent)).toEqual(['Demand', 'Selection'])

    const indices = list.querySelectorAll('[aria-hidden="true"]')
    expect([...indices].map((index) => index.textContent)).toEqual(['01', '02'])
  })

  it('renders a set as an unordered list when order carries no meaning', () => {
    render(<LedgerList rows={phases} columns={columns} ordered={false} />)
    expect(screen.getByRole('list').tagName).toBe('UL')
  })

  it('draws the row link as a 44 px standalone link and the output in mono', () => {
    render(<LedgerList rows={phases} columns={columns} />)

    const link = screen.getByRole('link', { name: 'Search Demand Intelligence' })
    expect(link).toHaveClass('link-standalone')
    expect(screen.getByText('Demand Map')).toHaveClass('font-mono')
  })

  it('keeps the column heads out of the accessibility tree and labels cells inline instead', () => {
    render(<LedgerList rows={phases} columns={columns} />)

    const [row] = screen.getAllByRole('listitem')
    expect(within(row).getByText('Question')).toHaveClass('md:hidden')
    expect(screen.getByText('Phase').closest('[aria-hidden="true"]')).not.toBeNull()
  })
})

describe('FactStrip', () => {
  it('renders three terms and their values as a definition list', () => {
    render(
      <FactStrip
        cells={[
          { label: 'Scope', value: 'Fixed' },
          { label: 'Duration', value: 'Six weeks' },
          { label: 'Outputs', value: 'Four artifacts' },
        ]}
      />,
    )

    const terms = screen.getAllByRole('term')
    expect(terms.map((term) => term.textContent)).toEqual(['Scope', 'Duration', 'Outputs'])
    expect(screen.getAllByRole('definition')).toHaveLength(3)
  })
})

describe('DemandToSelectionPath', () => {
  it('renders the stages as an ordered list with the step number in each heading', () => {
    render(
      <DemandToSelectionPath
        steps={[
          { number: '1', name: 'Demand', description: 'Map the need.' },
          { number: '2', name: 'Selection', description: 'Read consideration.' },
        ]}
      />,
    )

    expect(screen.getByRole('list').tagName).toBe('OL')
    const headings = screen.getAllByRole('heading', { level: 3 })
    expect(headings[0]).toHaveTextContent('Step 1. Demand')
    expect(headings[1]).toHaveTextContent('Step 2. Selection')
  })
})
