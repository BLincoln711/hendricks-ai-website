import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Callout } from '@/components/ui/callout'
import { DataTable } from '@/components/ui/data-table'
import { EVIDENCE_GRADE_TABLE_HREF, EvidenceGrade } from '@/components/visuals/evidence-grade'
import { SignalDot } from '@/components/visuals/signal-dot'
import { evidenceGradeRows } from '@/content/shared/evidence-grades'

/**
 * The evidence primitives (09 5.20, 5.35, 5.36, 5.46, 5.53): meaning carried
 * by shape, word and mark before hue; the grade standard read from one
 * source and never retyped; tables reachable and named by their caption.
 */

describe('EvidenceGrade', () => {
  it('names the grade with the word, the letter and the standard', () => {
    render(<EvidenceGrade grade="A" />)
    expect(screen.getByText('Grade').closest('span')).toHaveTextContent(
      `Grade A ${evidenceGradeRows[0].evidence}`,
    )
  })

  it('keeps the standard in the name when it is visually hidden', () => {
    render(<EvidenceGrade grade="D" variant="static" />)
    const standard = screen.getByText(evidenceGradeRows[3].evidence)
    expect(standard).toHaveClass('sr-only')
  })

  it('links to the grade table, described by the standard', () => {
    render(<EvidenceGrade grade="B" variant="linked" />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', EVIDENCE_GRADE_TABLE_HREF)
    expect(link).toHaveAccessibleName('Grade B')
    expect(link).toHaveAccessibleDescription(evidenceGradeRows[1].evidence)
  })
})

describe('SignalDot', () => {
  it('is decorative and one colour whatever tone a legacy call site passes', () => {
    render(<SignalDot tone="amber" />)
    const dot = document.querySelector('span')!
    expect(dot).toHaveAttribute('aria-hidden', 'true')
    expect(dot).toHaveClass('bg-signal-dot')
  })
})

describe('Callout', () => {
  it.each(['insight', 'limitation', 'methodology', 'warning'] as const)(
    'shows the %s label as visible text beside its icon',
    (variant) => {
      render(
        <Callout variant={variant} title="A title">
          <p>Body.</p>
        </Callout>,
      )

      const note = screen.getByRole('note')
      expect(note.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
      expect(note.firstElementChild).toHaveTextContent(
        variant.charAt(0).toUpperCase() + variant.slice(1),
      )
    },
  )

  it('promotes the title to an h2 on request', () => {
    render(
      <Callout headingLevel={2} title="Statement" titleId="statement-title">
        <p>Body.</p>
      </Callout>,
    )
    expect(screen.getByRole('heading', { level: 2 })).toHaveAttribute('id', 'statement-title')
  })
})

describe('DataTable', () => {
  const columns = [
    { key: 'grade', header: 'Grade', rowHeader: true },
    { key: 'evidence', header: 'Evidence' },
  ]
  const rows = evidenceGradeRows.map((row) => ({ grade: row.grade, evidence: row.evidence }))

  it('names the scroll region by the caption and keeps it reachable', () => {
    render(<DataTable caption="Evidence grades." columns={columns} rows={rows} />)

    const region = screen.getByRole('region', { name: 'Evidence grades.' })
    expect(region).toHaveAttribute('tabindex', '0')
    expect(screen.getByRole('table')).toHaveAccessibleName('Evidence grades.')
  })

  it('scopes every header and hides the scroll hint', () => {
    render(<DataTable caption="Evidence grades." columns={columns} rows={rows} captionVisible />)

    expect(screen.getAllByRole('columnheader')).toHaveLength(2)
    expect(screen.getAllByRole('rowheader')).toHaveLength(4)
    for (const header of document.querySelectorAll('th')) {
      expect(header).toHaveAttribute('scope')
    }
    expect(screen.getByText('Scroll horizontally to see the full table.')).toHaveAttribute(
      'aria-hidden',
      'true',
    )
    expect(document.querySelector('caption')).not.toHaveClass('sr-only')
  })
})
