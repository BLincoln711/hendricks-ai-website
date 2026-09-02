import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import { Eyebrow } from '@/components/layout/eyebrow'
import { PageHero } from '@/components/layout/page-hero'
import { SectionHeading } from '@/components/layout/section-heading'
import { ClosingBand } from '@/components/sections/closing-band'
import { DirectAnswer } from '@/components/sections/direct-answer'

/**
 * The heading primitives (09 5.7, 5.8, 5.41, 5.43, 5.49, 5.50): eyebrows are
 * `p` siblings outside every heading's accessible name (16 SM-02), the margin
 * index is hidden from assistive technology, sections are labelled by their
 * heading, and the closing band is light.
 */

describe('Eyebrow', () => {
  it('is a paragraph carrying the coordinate role', () => {
    render(<Eyebrow id="eb">The Hendricks Method</Eyebrow>)
    const eyebrow = document.getElementById('eb')!

    expect(eyebrow.tagName).toBe('P')
    expect(eyebrow).toHaveAttribute('data-eyebrow')
    expect(eyebrow).toHaveClass('text-coordinate')
  })
})

describe('SectionHeading', () => {
  it('keeps the eyebrow outside the heading and its accessible name', () => {
    render(<SectionHeading eyebrow="Selection Map" title="Where consideration is lost" id="h" />)

    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveAccessibleName('Where consideration is lost')
    expect(heading.querySelector('[data-eyebrow]')).toBeNull()
    expect(heading.previousElementSibling).toHaveAttribute('data-eyebrow')
  })

  it('renders the requested level', () => {
    render(<SectionHeading title="Third level" level={3} />)
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Third level')
  })

  it('hides the margin index and coordinate from assistive technology', () => {
    render(<SectionHeading title="Demand" index="02" coordinate="Demand Map" />)

    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveAccessibleName('Demand')

    const margin = screen.getByText('02').closest('[aria-hidden="true"]')
    expect(margin).not.toBeNull()
    expect(margin).toHaveTextContent('Demand Map')
    expect(margin!.tagName).toBe('P')
  })

  it('renders the lead at the lead role', () => {
    render(<SectionHeading title="Demand" description="What are customers trying to accomplish?" />)
    expect(screen.getByText('What are customers trying to accomplish?')).toHaveClass('text-lead')
  })
})

describe('PageHero', () => {
  const hero = {
    eyebrow: 'Selection Intelligence',
    title: 'Understand whether the brand enters consideration.',
    lead: ['One lead paragraph.'],
    primaryCta: { label: 'Start with a Search Intelligence Diagnostic', href: '/diagnostic' },
    secondaryCta: { label: 'Discuss an Agency Partnership', href: '/for-agencies' },
  }

  it('labels the section by an H1 whose name is the title alone', () => {
    render(<PageHero {...hero} />)

    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toHaveAttribute('id', 'page-title')
    expect(h1).toHaveAccessibleName(hero.title)
    expect(screen.getByRole('region')).toHaveAttribute('aria-labelledby', 'page-title')
    expect(h1.previousElementSibling).toHaveTextContent(hero.eyebrow)
    expect(h1.previousElementSibling).toHaveAttribute('data-eyebrow')
  })

  it('renders both CTAs as links, the second as the secondary variant', () => {
    render(<PageHero {...hero} />)

    expect(screen.getByRole('link', { name: hero.primaryCta.label })).toHaveAttribute('href', '/diagnostic')
    expect(screen.getByRole('link', { name: hero.secondaryCta.label })).toHaveClass(
      'border-[var(--button-secondary-edge)]',
    )
  })

  it('renders an optional subtitle as a paragraph, never a heading', () => {
    render(<PageHero {...hero} subtitle="A fixed-scope engagement." />)
    expect(screen.getAllByRole('heading')).toHaveLength(1)
    expect(screen.getByText('A fixed-scope engagement.').tagName).toBe('P')
  })
})

describe('Breadcrumbs', () => {
  it('names the trail, marks the current page and boxes every link', () => {
    render(
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Solutions', href: '/solutions' },
          { label: 'Selection Intelligence' },
        ]}
        path="/solutions/selection-intelligence"
      />,
    )

    const nav = screen.getByRole('navigation', { name: 'Breadcrumb' })
    expect(nav.querySelector('ol')).not.toBeNull()
    expect(screen.getByText('Selection Intelligence')).toHaveAttribute('aria-current', 'page')
    for (const link of screen.getAllByRole('link')) {
      expect(link).toHaveClass('link-standalone')
    }
    expect(screen.getAllByRole('link')).toHaveLength(2)
  })
})

describe('ClosingBand', () => {
  it('is a light section labelled by its H2 with the two locked CTAs', () => {
    render(
      <ClosingBand
        eyebrow="Find the Gap"
        title="What decision can your current search system not answer?"
        primaryCta={{ label: 'Start with a Search Intelligence Diagnostic', href: '/diagnostic' }}
        secondaryCta={{ label: 'Discuss an Agency Partnership', href: '/for-agencies' }}
      />,
    )

    const region = screen.getByRole('region')
    expect(region).not.toHaveClass('on-plate')
    expect(region).toHaveAttribute('aria-labelledby', 'closing-band-title')
    expect(screen.getByRole('heading', { level: 2 })).toHaveAccessibleName(
      'What decision can your current search system not answer?',
    )
    expect(screen.getAllByRole('link')).toHaveLength(2)
  })
})

describe('DirectAnswer', () => {
  it('labels the section by the term and states the answer as a paragraph', () => {
    render(<DirectAnswer term="Search Intelligence Engineering" answer="A one-sentence definition." />)

    expect(screen.getByRole('region')).toHaveAttribute('aria-labelledby', 'direct-answer-label')
    expect(document.getElementById('direct-answer-label')?.tagName).toBe('P')
    expect(screen.getByText('A one-sentence definition.').tagName).toBe('P')
    expect(screen.queryByRole('heading')).toBeNull()
  })
})
