import { CanvasPageHero } from '@/components/canvas/page-hero'
import { RailColumn } from '@/components/canvas/rail-column'
import { TableRegion } from '@/components/canvas/table-region'
import { InlineText } from '@/components/legal/inline-text'
import { Station } from '@/components/sections/station'
import { routes } from '@/config/routes'
import type { LegalBlock, LegalDocument as LegalDocumentContent } from '@/content/legal/types'
import { formatLongDate } from '@/lib/utils/format-date'

/**
 * Renderer for `/privacy` and `/terms`, on the approved canvas.
 *
 * Both documents are long and are read by people looking for one clause, so the
 * contents list is the sticky rail every interior route carries, and every
 * section keeps a stable `id`: a link to a single obligation has to keep working
 * across revisions. The landing offset comes from the `scroll-margin-top` every
 * anchor target inherits, so no per-section margin is added.
 *
 * Measure stays at the reading column throughout. Legal text is the content most
 * likely to be read end to end, and a full-width line length is where that fails
 * first.
 */
function Block({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p>
          <InlineText text={block.text} />
        </p>
      )

    case 'subheading':
      return <h3 className="text-h4 text-ink">{block.text}</h3>

    case 'list':
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}>
              <InlineText text={item} />
            </li>
          ))}
        </ul>
      )

    case 'table':
      return (
        <TableRegion
          caption={block.caption}
          columns={block.columns.map((header, columnIndex) => ({
            key: `column-${columnIndex}`,
            header,
            rowHeader: columnIndex === 0,
          }))}
          rows={block.rows.map((row) =>
            Object.fromEntries(row.map((cell, columnIndex) => [`column-${columnIndex}`, cell])),
          )}
        />
      )
  }
}

export function LegalDocument({
  document,
  path,
  label,
}: {
  document: LegalDocumentContent
  /** Route path, for the breadcrumb trail and its `@id`. */
  path: string
  label: string
}) {
  return (
    <div className="wrap">
      <CanvasPageHero
        eyebrow={document.hero.eyebrow}
        title={document.hero.title}
        path={path}
        breadcrumbs={[{ label: routes.home.label, href: routes.home.path }, { label }]}
      >
        {/*
          The two dates are the record a reader checks before relying on the
          document, so they sit in the byline strip rather than under the fold.
          `Byline` is not used here: this document has no author node, and a
          legal notice is the firm's, not one person's.
        */}
        <p className="byline">
          <span>
            {legalChrome.effective}{' '}
            <time dateTime={document.effectiveDate}>
              {formatLongDate(document.effectiveDate)}
            </time>
          </span>
          <span>
            {legalChrome.lastUpdated}{' '}
            <time dateTime={document.lastUpdated}>{formatLongDate(document.lastUpdated)}</time>
          </span>
        </p>

        <div className="prose mt-8 max-w-[62ch]">
          {document.intro.map((paragraph) => (
            <p key={paragraph}>
              <InlineText text={paragraph} />
            </p>
          ))}
        </div>
      </CanvasPageHero>

      <div className="bodywrap">
        <RailColumn
          heading={legalChrome.contents}
          sections={document.sections.map((section) => ({
            id: section.id,
            label: section.title,
          }))}
        >
          {document.sections.map((section) => (
            <Station
              key={section.id}
              id={section.id}
              ariaLabelledBy={`${section.id}-heading`}
              stack
            >
              <h2 id={`${section.id}-heading`} className="text-h2 text-ink">
                {section.title}
              </h2>

              <div className="prose">
                {section.blocks.map((block, blockIndex) => (
                  <Block key={blockIndex} block={block} />
                ))}
              </div>
            </Station>
          ))}
        </RailColumn>
      </div>
    </div>
  )
}

/** The three labels both legal documents share. */
const legalChrome = {
  effective: 'Effective',
  lastUpdated: 'Last updated',
  contents: 'Contents',
} as const
