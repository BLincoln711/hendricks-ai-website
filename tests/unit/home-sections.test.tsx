import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { FounderNote } from '@/components/sections/founder-note'
import { Station } from '@/components/sections/station'
import { TwoTone } from '@/components/ui/two-tone'
import { ArtifactPreviewDrawing } from '@/components/visuals/artifact-previews'
import { ConsiderationLadder } from '@/components/visuals/consideration-ladder'
import { EvidenceClasses } from '@/components/visuals/evidence-classes'
import { PhaseRail } from '@/components/visuals/phase-rail'
import { TwoPathsPlate } from '@/components/visuals/two-paths-plate'
import { evidence, founder, ladder, problem, system } from '@/content/pages/home'

/**
 * The homepage station components, held to the rules the redesign names for
 * each of them: the ordered-stage rule (16 SM-06), the illustrative-caption
 * rule (AGENTS.md), decision D-D on the portrait, and the rule that nothing is
 * conveyed by colour alone (16 CC-01).
 */

describe('Station', () => {
  it('is a landmark named by its own heading', () => {
    render(
      <Station id="outputs" ariaLabelledBy="outputs-title">
        <h2 id="outputs-title">Outputs</h2>
      </Station>,
    )

    const station = screen.getByRole('region', { name: 'Outputs' })
    expect(station.id).toBe('outputs')
  })

  it('takes an explicit label where its heading is visually silent', () => {
    render(
      <Station id="rule" ariaLabel="The evidence rule">
        <p>Absence is not yet a diagnosis.</p>
      </Station>,
    )

    expect(screen.getByRole('region', { name: 'The evidence rule' })).toBeInTheDocument()
  })
})

describe('TwoTone', () => {
  it('keeps both halves in one paragraph, so the sentence extracts whole', () => {
    render(<TwoTone sentence={{ claim: 'Absence is not yet a diagnosis.', continuation: 'One screen is one observation.' }} />)

    const paragraph = screen.getByText(/Absence is not yet a diagnosis/)
    expect(paragraph.tagName).toBe('P')
    expect(paragraph.textContent).toBe('Absence is not yet a diagnosis. One screen is one observation.')
  })
})

describe('PhaseRail', () => {
  it('renders an ordered list, links every phase, and hides the index numeral', () => {
    // 16 SM-06: order that carries meaning is an `ol`, and the margin index is
    // decoration because the list already carries the order.
    render(
      <>
        <h2 id="system-title">The system</h2>
        <PhaseRail
          phases={system.phases}
          returnLabel={system.returnLabel}
          ariaLabelledBy="system-title"
        />
      </>,
    )

    const list = screen.getByRole('list', { name: 'The system' })
    expect(list.tagName).toBe('OL')

    const items = within(list).getAllByRole('listitem')
    expect(items).toHaveLength(4)

    for (const phase of system.phases) {
      expect(within(list).getByRole('link', { name: phase.name })).toHaveAttribute(
        'href',
        phase.href,
      )
      // The numeral is present for a sighted reader and hidden from the
      // accessibility tree, because the `ol` already carries the order.
      expect(within(list).getByText(phase.index)).toHaveAttribute('aria-hidden', 'true')
    }

    expect(screen.getByText(system.returnLabel)).toBeInTheDocument()
  })
})

describe('ConsiderationLadder', () => {
  it('renders the approved seven rungs, with no evidence column and no unkeyed mark', () => {
    render(<ConsiderationLadder rungs={ladder.rungs} />)

    const rows = screen.getAllByRole('listitem')
    expect(rows).toHaveLength(7)
    // `toContain` compares array members by identity, so an asymmetric matcher
    // inside it would never bite. Test the strings themselves.
    expect(rows.some((row) => row.textContent?.includes('sufficiency inferred'))).toBe(false)
    // canvas.md section 2: an evidence class is never carried by a mark with no
    // word beside it, so while H10 is pending the ladder draws neither.
    expect(document.querySelectorAll('.ladder .kn')).toHaveLength(0)
    expect(document.querySelectorAll('.ladder svg')).toHaveLength(0)
    expect(screen.getByText('Did the brand appear?')).toBeInTheDocument()
  })

  it('carries the evidence class as a shape and a word, never as a hue alone', () => {
    render(
      <ConsiderationLadder
        rungs={[
          { name: 'Trust', question: 'Did evidence support it?', knows: 'sources observed; sufficiency inferred', marks: ['observed', 'inferred'] },
        ]}
      />,
    )

    // The mark strip is decorative: the class is written beside it.
    expect(screen.getByText('sources observed; sufficiency inferred')).toBeInTheDocument()
    const svg = document.querySelector('.ladder svg')
    expect(svg).toHaveAttribute('aria-hidden', 'true')
    expect(svg?.querySelectorAll('circle')).toHaveLength(2)
  })
})

describe('EvidenceClasses', () => {
  it('names all four classes in a labelled group', () => {
    render(<EvidenceClasses classes={evidence.classes} ariaLabel="The four evidence classes" />)

    const group = screen.getByRole('group', { name: 'The four evidence classes' })
    for (const item of evidence.classes) {
      expect(within(group).getByText(item.name)).toBeInTheDocument()
      expect(within(group).getByText(item.description)).toBeInTheDocument()
    }
  })
})

describe('ArtifactPreviewDrawing', () => {
  it('exposes what the drawing shows, not the name of a file', () => {
    render(<ArtifactPreviewDrawing preview="demand-map" alt="Demand Map. Customer decisions as rows." />)

    expect(
      screen.getByRole('img', { name: 'Demand Map. Customer decisions as rows.' }),
    ).toBeInTheDocument()
  })
})

describe('TwoPathsPlate', () => {
  it('carries the locked illustrative caption and one text alternative', () => {
    render(<TwoPathsPlate plate={problem.plate} />)

    expect(screen.getByText('Illustrative interface. Not a client result.')).toBeInTheDocument()
    expect(screen.getByText(problem.plate.alt)).toBeInTheDocument()
  })

  it('hides the label layer, so the drawing is read once and as a sentence', () => {
    render(<TwoPathsPlate plate={problem.plate} />)

    const labels = document.querySelector('.dts-labels')
    expect(labels).toHaveAttribute('aria-hidden', 'true')
    // Every step is still drawn, for a reader who can see the figure.
    for (const step of problem.plate.aiMediated.steps) {
      expect(within(labels as HTMLElement).getByText(step)).toBeInTheDocument()
    }
  })
})

describe('FounderNote', () => {
  it('renders the portrait in colour with its approved alt text (decision D-D)', () => {
    render(<FounderNote founder={founder} />)

    const portrait = screen.getByRole('img', { name: founder.portrait.alt })
    // D-D forbids a desaturating filter at any size, on any ground. The rule
    // lives in `.founder img`; what a component may never do is add one here.
    expect(portrait.getAttribute('style') ?? '').not.toContain('grayscale')
    expect(portrait.className).not.toContain('grayscale')
  })

  it('names Brandon Lincoln Hendricks in full and links to the biography', () => {
    render(<FounderNote founder={founder} />)

    expect(screen.getByText('Brandon Lincoln Hendricks')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'About Brandon Lincoln Hendricks' })).toHaveAttribute(
      'href',
      '/about',
    )
  })
})
