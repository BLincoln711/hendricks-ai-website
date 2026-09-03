import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import { Container } from '@/components/layout/container'
import { Eyebrow } from '@/components/layout/eyebrow'
import { Section } from '@/components/layout/section'
import { InlineText } from '@/components/legal/inline-text'
import { DataTable } from '@/components/ui/data-table'
import { routes } from '@/config/routes'
import type { LegalBlock, LegalDocument as LegalDocumentContent } from '@/content/legal/types'
import { formatLongDate } from '@/lib/utils/format-date'

/**
 * Renderer for `/privacy` and `/terms` (09 5.55).
 *
 * A numbered contents list precedes the body because both documents are long
 * and are read by people looking for one clause. Every section carries a stable
 * `id`, so a link to a single obligation keeps working across revisions; the
 * landing offset comes from the `scroll-padding-top` every fragment inherits
 * from `html`, so no per-section margin is added (16 KF-07). Contents links
 * are described by the list heading, since a section title such as "Contact"
 * also names a footer link to a different destination (16 SM-10).
 *
 * Measure is constrained to the narrow container throughout: legal text is the
 * content most likely to be read end to end, and a full-width line length is
 * where that fails first.
 */
function Block({ block, index }: { block: LegalBlock; index: number }) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p className="text-ink">
          <InlineText text={block.text} />
        </p>
      )

    case 'subheading':
      return <h3 className="text-h4 text-ink">{block.text}</h3>

    case 'list':
      return (
        <ul className="flex flex-col gap-2.5">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-ink">
              <span aria-hidden="true" className="mt-[0.65em] size-1.5 shrink-0 rounded-full bg-rule-strong" />
              <span>
                <InlineText text={item} />
              </span>
            </li>
          ))}
        </ul>
      )

    case 'table':
      return (
        <DataTable
          caption={block.caption}
          columns={block.columns.map((header, columnIndex) => ({
            key: `column-${columnIndex}`,
            header,
            rowHeader: columnIndex === 0,
          }))}
          rows={block.rows.map((row) =>
            Object.fromEntries(row.map((cell, columnIndex) => [`column-${columnIndex}`, cell])),
          )}
          className={index === 0 ? undefined : 'mt-1'}
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
  path?: string
  label?: string
}) {
  return (
    <>
      <Section variant="field" size="standard" ariaLabelledBy="legal-title">
        <Container width="narrow">
          <div className="flex flex-col gap-6">
            {path && label ? (
              <Breadcrumbs
                items={[{ label: routes.home.label, href: routes.home.path }, { label }]}
                path={path}
              />
            ) : null}

            <Eyebrow>{document.hero.eyebrow}</Eyebrow>
            <h1 id="legal-title" className="text-h1 text-ink">
              {document.hero.title}
            </h1>

            <dl className="text-small flex flex-wrap gap-x-8 gap-y-2 text-ink-2">
              <div className="flex gap-2">
                <dt>Effective</dt>
                <dd className="font-medium text-ink">
                  <time dateTime={document.effectiveDate}>{formatLongDate(document.effectiveDate)}</time>
                </dd>
              </div>
              <div className="flex gap-2">
                <dt>Last updated</dt>
                <dd className="font-medium text-ink">
                  <time dateTime={document.lastUpdated}>{formatLongDate(document.lastUpdated)}</time>
                </dd>
              </div>
            </dl>

            <div className="flex flex-col gap-4 border-t border-rule pt-6">
              {document.intro.map((paragraph) => (
                <p key={paragraph} className="text-ink">
                  <InlineText text={paragraph} />
                </p>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section variant="white" size="small" ariaLabelledBy="contents-heading">
        <Container width="narrow">
          <nav aria-labelledby="contents-heading" className="flex flex-col gap-4">
            <h2 id="contents-heading" className="text-coordinate text-ink-2">
              Contents
            </h2>
            <ol className="grid gap-x-8 gap-y-1 sm:grid-cols-2">
              {document.sections.map((section, index) => (
                <li key={section.id} className="text-small flex gap-3">
                  <span aria-hidden="true" className="text-coordinate mt-[0.9em] text-ink-2">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <a href={`#${section.id}`} aria-describedby="contents-heading" className="link link-standalone">
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </Container>
      </Section>

      <Section variant="white" size="standard">
        <Container width="narrow">
          <div className="flex flex-col gap-14">
            {document.sections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                aria-labelledby={`${section.id}-heading`}
                className="flex flex-col gap-5"
              >
                <h2 id={`${section.id}-heading`} className="text-h3 flex gap-3 text-ink">
                  <span aria-hidden="true" className="text-coordinate mt-[0.55em] text-ink-2">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {section.title}
                </h2>

                {section.blocks.map((block, blockIndex) => (
                  <Block key={blockIndex} block={block} index={blockIndex} />
                ))}
              </section>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
