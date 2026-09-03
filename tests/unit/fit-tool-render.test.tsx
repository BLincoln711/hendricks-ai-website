import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { FitTool } from '@/components/diagnostic/fit-tool'
import { fitItems, fitTool } from '@/content/forms/fit-tool'

/**
 * The tool's promises are behavioural, so they are asserted behaviourally:
 * nothing is stored, nothing is sent, and no analytics event is raised by any
 * control or link inside it (CANON R8, 16 FM-10).
 */

const APPLY = '#apply'

/**
 * Answers all fourteen by position. The radios render in `fitItems` order, and
 * selecting them directly keeps the pass under a second where fourteen
 * accessible-name queries against fourteen nested fieldsets took six.
 */
function answerAll(pattern: (id: string) => 'Yes' | 'No') {
  const radios = (value: 'yes' | 'no') =>
    Array.from(document.querySelectorAll<HTMLInputElement>(`input[type="radio"][value="${value}"]`))

  const yes = radios('yes')
  const no = radios('no')

  fitItems.forEach((item, index) => {
    const target = pattern(item.id) === 'Yes' ? yes[index] : no[index]
    if (target) fireEvent.click(target)
  })
}

function radioFor(question: string, label: 'Yes' | 'No'): HTMLElement {
  const group = screen.getByRole('group', { name: question })
  const input = Array.from(group.querySelectorAll('input[type="radio"]')).find(
    (radio) => (radio as HTMLInputElement).value === label.toLowerCase(),
  )
  return input as HTMLElement
}

beforeEach(() => {
  window.sessionStorage.clear()
  window.localStorage.clear()
  window.dataLayer = []
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('Fit tool', () => {
  it('asks the fourteen approved questions in two named groups', () => {
    render(<FitTool applyHref={APPLY} />)

    expect(screen.getByRole('group', { name: fitTool.goodLegend })).toBeInTheDocument()
    expect(screen.getByRole('group', { name: fitTool.notLegend })).toBeInTheDocument()

    for (const item of fitItems) {
      expect(screen.getByRole('group', { name: item.question })).toBeInTheDocument()
    }
  })

  it('reports progress until all fourteen are answered', () => {
    render(<FitTool applyHref={APPLY} />)

    const region = screen.getByRole('status')
    expect(region).toHaveTextContent(fitTool.progress(0))

    fireEvent.click(radioFor(fitItems[0]!.question, 'Yes'))
    expect(region).toHaveTextContent(fitTool.progress(1))
  })

  it('offers the application to a strong reading and explains itself', () => {
    render(<FitTool applyHref={APPLY} />)
    answerAll((id) => (id.startsWith('G') ? 'Yes' : 'No'))

    expect(screen.getByRole('status')).toHaveTextContent(fitTool.results.strong.heading)
    expect(screen.getByRole('status')).toHaveTextContent(fitTool.driversHeading)
    expect(screen.getByRole('link', { name: fitTool.continueLabel })).toHaveAttribute(
      'href',
      APPLY,
    )
  })

  it('keeps the application open on a not-a-fit reading and names the alternatives', () => {
    render(<FitTool applyHref={APPLY} />)
    answerAll(() => 'Yes')

    const region = screen.getByRole('status')
    expect(region).toHaveTextContent(fitTool.results.notAFit.heading)
    expect(region).toHaveTextContent(fitTool.results.notAFit.closing)

    for (const link of fitTool.results.notAFit.links) {
      expect(screen.getByRole('link', { name: link.label })).toHaveAttribute('href', link.href)
    }
  })

  it('stores nothing anywhere', () => {
    render(<FitTool applyHref={APPLY} />)
    answerAll(() => 'Yes')

    expect(window.sessionStorage.length).toBe(0)
    expect(window.localStorage.length).toBe(0)
    expect(document.cookie).toBe('')
  })

  it('makes no network request and raises no analytics event', () => {
    const fetchSpy = vi.fn()
    vi.stubGlobal('fetch', fetchSpy)
    vi.stubGlobal('sendBeacon', vi.fn())

    render(<FitTool applyHref={APPLY} />)
    answerAll((id) => (id.startsWith('G') ? 'Yes' : 'No'))
    fireEvent.click(screen.getByRole('link', { name: fitTool.continueLabel }))

    expect(fetchSpy).not.toHaveBeenCalled()
    expect(window.dataLayer).toEqual([])
  })

  it('never gates: the reading changes nothing outside the result region', () => {
    const { container } = render(<FitTool applyHref={APPLY} />)
    const before = container.querySelectorAll('input[type="radio"]').length

    answerAll(() => 'Yes')

    expect(container.querySelectorAll('input[type="radio"]')).toHaveLength(before)
    expect(container.querySelector('[disabled]')).toBeNull()
  })

  it('carries the storage note under the result region', () => {
    render(<FitTool applyHref={APPLY} />)
    expect(screen.getByText(fitTool.storageNote)).toBeInTheDocument()
  })
})
