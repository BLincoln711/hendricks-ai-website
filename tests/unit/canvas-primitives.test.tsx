import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Answer } from '@/components/canvas/answer'
import { Byline, NOT_YET_RECORDED } from '@/components/canvas/byline'
import { ChangeHistory } from '@/components/canvas/change-history'
import { CiteThis } from '@/components/canvas/cite-this'
import { ClosingStation } from '@/components/canvas/closing-station'
import { DefinitionList } from '@/components/canvas/definition-list'
import { FaqList } from '@/components/canvas/faq-list'
import { Ledger } from '@/components/canvas/ledger'
import { Limitations } from '@/components/canvas/limitations'
import { MethodList } from '@/components/canvas/method-list'
import { RelatedList, RelatedRules } from '@/components/canvas/related-list'
import { RuleList } from '@/components/canvas/rule-list'
import { SourceList } from '@/components/canvas/source-list'
import { TableOfContents } from '@/components/canvas/table-of-contents'
import { TableRegion } from '@/components/canvas/table-region'
import { siteConfig } from '@/config/site'

/**
 * The canvas interior primitives.
 *
 * Three properties are load-bearing across all of them and each is easy to undo
 * by accident. Nothing is a card: separation is a hairline class, never a
 * background or a boundary. Nothing is hidden behind an interaction, because
 * D-E requires every answer to be in the first paint. And nothing is carried by
 * colour or by a mark alone: an index that repeats an ordered list's own order
 * is `aria-hidden`, and a field whose meaning is not obvious from its content
 * keeps a name for assistive technology.
 */

describe('Answer', () => {
  it('renders the label, the paragraphs and the two-tone sentence in order', () => {
    render(
      <Answer
        label="The short answer"
        paragraphs={['Search is a decision journey.']}
        twoTone={{ claim: 'Hendricks connects those fragments', continuation: 'around the decision.' }}
      />,
    )

    expect(screen.getByText('The short answer')).toBeInTheDocument()
    expect(screen.getByText('Search is a decision journey.')).toBeInTheDocument()
    expect(screen.getByText('around the decision.')).toHaveClass('cont')
  })

  it('is a hairline-marked block rather than a card', () => {
    const { container } = render(<Answer paragraphs={['One sentence.']} />)
    expect(container.firstElementChild).toHaveClass('answer')
  })

  it('names itself with a visually silent heading when one is given', () => {
    render(
      <Answer headingId="answer-title" headingText="The direct answer" paragraphs={['One.']} />,
    )

    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveTextContent('The direct answer')
    expect(heading).toHaveClass('sr-only')
  })
})

describe('TableOfContents', () => {
  it('links every section by its id and hides the repeated index', () => {
    render(
      <TableOfContents
        items={[
          { id: 'signals', label: 'Signs of fit' },
          { id: 'changes', label: 'What changes' },
        ]}
      />,
    )

    const link = screen.getByRole('link', { name: 'Signs of fit' })
    expect(link).toHaveAttribute('href', '#signals')
    expect(screen.getByText('01')).toHaveAttribute('aria-hidden', 'true')
  })
})

describe('Ledger', () => {
  it('renders the label, the value and the note as three fields of one row', () => {
    render(
      <Ledger
        rows={[{ label: 'Demand clarity', value: 'Know which decisions matter.', note: 'Demand Map' }]}
      />,
    )

    expect(screen.getByText('Demand clarity')).toHaveClass('k')
    expect(screen.getByText('Know which decisions matter.')).toBeInTheDocument()
    expect(screen.getByText('Demand Map')).toBeInTheDocument()
  })

  it('prints a hidden index and an ordered list when numbered', () => {
    const { container } = render(<Ledger numbered rows={[{ label: 'Demand' }]} />)

    expect(container.querySelector('ol')).not.toBeNull()
    expect(screen.getByText('01')).toHaveAttribute('aria-hidden', 'true')
  })

  it('names a field whose meaning its content does not carry', () => {
    render(
      <Ledger
        fieldLabels={{ note: 'Question answered' }}
        rows={[{ label: 'Neutral baseline', note: 'What happens under standard conditions?' }]}
      />,
    )

    expect(screen.getByText('Question answered:')).toHaveClass('sr-only')
  })
})

describe('RuleList', () => {
  it('is an ordered list whose printed index is not announced twice', () => {
    const { container } = render(<RuleList items={['Search influences shortlisting']} />)

    expect(container.querySelector('ol')).toHaveClass('rlist')
    expect(screen.getByText('01')).toHaveAttribute('aria-hidden', 'true')
    expect(screen.getByRole('listitem')).toHaveTextContent('Search influences shortlisting')
  })
})

describe('TableRegion', () => {
  it('is a named, keyboard reachable scroll region with a visible caption', () => {
    render(
      <TableRegion
        caption="Primary optimization target by discipline."
        columns={[
          { key: 'discipline', header: 'Discipline', rowHeader: true },
          { key: 'target', header: 'Target' },
        ]}
        rows={[{ discipline: 'SEO', target: 'Organic rankings' }]}
      />,
    )

    const region = screen.getByRole('region', { name: 'Primary optimization target by discipline.' })
    expect(region).toHaveAttribute('tabindex', '0')
    expect(within(region).getByRole('columnheader', { name: 'Discipline' })).toBeInTheDocument()
    expect(within(region).getByRole('rowheader', { name: 'SEO' })).toBeInTheDocument()
    // The caption is rendered, not only used as the region's name.
    expect(region.querySelector('caption')).toHaveTextContent(
      'Primary optimization target by discipline.',
    )
  })
})

describe('MethodList', () => {
  it('prints an approved step label in place of the generated counter', () => {
    const { container } = render(
      <MethodList steps={[{ marker: 'Stage 1', title: 'Demand', body: ['What are customers doing?'] }]} />,
    )

    expect(container.querySelector('li')).toHaveAttribute('data-marker', 'Stage 1')
  })

  it('omits the heading for a step the approved copy does not name', () => {
    render(<MethodList steps={[{ body: ['Use paid and organic search as one system.'] }]} />)
    expect(screen.queryByRole('heading')).toBeNull()
  })

  it('names the output for assistive technology, since the mark alone does not', () => {
    render(<MethodList steps={[{ title: 'Demand', body: ['One.'], output: 'Demand Map' }]} />)
    expect(screen.getByText('Output:')).toHaveClass('sr-only')
  })
})

describe('Limitations', () => {
  it('renders every limitation on one dashed hairline rather than in a warning box', () => {
    const { container } = render(
      <Limitations label="Honest limitation" items={['Citation does not prove influence.']} />,
    )

    expect(container.firstElementChild).toHaveClass('limits')
    expect(screen.getByText('Citation does not prove influence.')).toBeInTheDocument()
    expect(screen.getByText('Honest limitation')).toBeInTheDocument()
  })
})

describe('DefinitionList', () => {
  it('pairs every term with its definition', () => {
    render(
      <DefinitionList
        definitions={[{ term: 'Selection Stability', definition: ['The consistency of an outcome.'] }]}
      />,
    )

    expect(screen.getByText('Selection Stability').tagName).toBe('DT')
    expect(screen.getByText('The consistency of an outcome.').tagName).toBe('DD')
  })
})

describe('SourceList', () => {
  it('carries the publisher and the publication date of every source', () => {
    render(
      <SourceList
        sources={[
          { title: 'AI features and your website', publisher: 'Google Search Central', published: '2026-08-19' },
        ]}
      />,
    )

    expect(screen.getByText('AI features and your website')).toBeInTheDocument()
    expect(screen.getByText(/Google Search Central/)).toBeInTheDocument()
    expect(screen.getByText('August 19, 2026')).toHaveAttribute('datetime', '2026-08-19')
  })

  it('falls back to the review date where a source records no publication date', () => {
    render(
      <SourceList
        reviewed="2026-08-19"
        sources={[{ title: 'Overview of OpenAI Crawlers', publisher: 'OpenAI' }]}
      />,
    )

    expect(screen.getByText(/Read/)).toBeInTheDocument()
    expect(screen.getByText('August 19, 2026')).toBeInTheDocument()
  })

  it('announces that an external source opens in a new tab', () => {
    render(
      <SourceList
        reviewed="2026-08-19"
        sources={[{ title: 'Perplexity Crawlers', publisher: 'Perplexity', url: 'https://example.com' }]}
      />,
    )

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAccessibleName('Perplexity Crawlers(opens in a new tab)')
  })
})

describe('Byline', () => {
  it('resolves the author to the one Person node, per decision D-B', () => {
    render(<Byline showDates={false} />)

    expect(screen.getByRole('link', { name: siteConfig.founder })).toHaveAttribute(
      'href',
      siteConfig.founderPersonId,
    )
  })

  it('says a date is unrecorded rather than printing one nobody approved', () => {
    render(<Byline />)
    expect(screen.getAllByText(new RegExp(NOT_YET_RECORDED))).toHaveLength(2)
  })
})

describe('CiteThis', () => {
  it('composes the citation from the record rather than from a second copy of it', () => {
    render(
      <CiteThis
        citation={{
          author: 'Brandon Lincoln Hendricks',
          year: '2026',
          title: 'Four Engines, 480 Questions',
          publisher: 'Hendricks',
          url: 'https://hendricks.ai/research/the-answer-index',
          doi: { label: '10.5281/zenodo.22242103', href: 'https://doi.org/10.5281/zenodo.22242103' },
        }}
      />,
    )

    const citation = screen.getByText(/Brandon Lincoln Hendricks \(2026\)\./)
    expect(citation).toHaveClass('cite-str')
    expect(citation).toHaveTextContent('Four Engines, 480 Questions.')
    expect(citation).toHaveTextContent('Data DOI: 10.5281/zenodo.22242103.')
  })
})

describe('ChangeHistory', () => {
  it('says a page has not changed rather than rendering an empty table', () => {
    render(<ChangeHistory />)

    expect(screen.getByRole('rowheader', { name: NOT_YET_RECORDED })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: 'First publication of this page.' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Read the corrections policy' })).toHaveAttribute(
      'href',
      '/corrections',
    )
  })
})

describe('RelatedList and RelatedRules', () => {
  it('filters out a route that does not exist yet rather than rendering a dead link', () => {
    render(
      <RelatedList
        entries={[
          { href: '/solutions', label: 'Solutions', description: 'The four solutions.' },
          { href: '/why-ai-answers-change', label: 'Unbuilt', description: 'Not yet a route.' },
        ]}
      />,
    )

    expect(screen.getByRole('link', { name: /Solutions/ })).toBeInTheDocument()
    expect(screen.queryByText('Not yet a route.')).toBeNull()
  })

  it('renders nothing at all when no destination is built', () => {
    const { container } = render(
      <RelatedRules
        entries={[{ href: '/why-ai-answers-change', label: 'Unbuilt', description: 'Not yet.' }]}
      />,
    )

    expect(container).toBeEmptyDOMElement()
  })
})

describe('FaqList', () => {
  it('renders every question as a real heading with its answer visible beside it', () => {
    const { container } = render(
      <FaqList
        items={[
          {
            question: 'Which AI and search systems do you test?',
            answer: ['Hendricks observes four systems.', 'No result is extrapolated.'],
          },
        ]}
      />,
    )

    expect(
      screen.getByRole('heading', { level: 3, name: 'Which AI and search systems do you test?' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Hendricks observes four systems.')).toBeInTheDocument()
    // No disclosure widget: the answer is in the first paint, for a reader who
    // never clicks and for a crawler that runs no JavaScript.
    expect(container.querySelector('details')).toBeNull()
    expect(container.querySelector('button')).toBeNull()
  })
})

describe('ClosingStation', () => {
  it('is labelled by its own heading and carries the primary CTA', () => {
    render(
      <ClosingStation
        title="Find where your brand is losing consideration."
        primaryCta={{ label: 'Start with a Search Intelligence Diagnostic', href: '/diagnostic' }}
      />,
    )

    const section = screen.getByRole('region', {
      name: 'Find where your brand is losing consideration.',
    })
    expect(section).toHaveClass('closing')
    expect(
      within(section).getByRole('link', { name: /Start with a Search Intelligence Diagnostic/ }),
    ).toHaveAttribute('href', '/diagnostic')
  })

  it('renders a page-specific label as a tertiary link, not as a second button', () => {
    render(
      <ClosingStation
        title="Close"
        primaryCta={{ label: 'Start with a Search Intelligence Diagnostic', href: '/diagnostic' }}
        secondaryLink={{ label: 'Request a Selection Intelligence Baseline', href: '/diagnostic' }}
      />,
    )

    expect(
      screen.getByRole('link', { name: 'Request a Selection Intelligence Baseline' }),
    ).toHaveClass('tlink')
  })
})
