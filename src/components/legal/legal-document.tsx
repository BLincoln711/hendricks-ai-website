import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { InlineText } from '@/components/legal/inline-text'
import { DataTable } from '@/components/ui/data-table'
import type { LegalBlock, LegalDocument as LegalDocumentContent } from '@/content/legal/types'
import { formatLongDate } from '@/lib/utils/format-date'

/**
 * Renderer for `/privacy` and `/terms`.
 *
 * A numbered contents list precedes the body because both documents are long
 * and are read by people looking for one clause. Every section carries a stable
 * `id`, so a link to a single obligation keeps working across revisions.
 *
 * Measure is constrained to the narrow container throughout — legal text is the
 * content most likely to be read end to end, and a full-width line length is
 * where that fails first.
 */
function Block({ block, index }: { block: LegalBlock; index: number }) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p className="text-[1rem] leading-relaxed text-[var(--color-graphite)]">
          <InlineText text={block.text} />
        </p>
      )

    case 'subheading':
      return (
        <h3 className="text-[1.0625rem] font-medium text-[var(--color-navy)]">{block.text}</h3>
      )

    case 'list':
      return (
        <ul className="flex flex-col gap-2.5">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-[1rem] leading-relaxed text-[var(--color-graphite)]">
              <span
                aria-hidden="true"
                className="mt-[0.65em] size-1.5 shrink-0 rounded-full bg-[var(--color-border)]"
              />
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

export function LegalDocument({ document }: { document: LegalDocumentContent }) {
  return (
    <>
      <Section variant="field" size="standard" ariaLabelledBy="legal-title">
        <Container width="narrow">
          <div className="flex flex-col gap-6">
            <p className="text-eyebrow text-[var(--color-slate)]">{document.hero.eyebrow}</p>
            <h1 className="text-h1 text-[var(--color-navy)]">{document.hero.title}</h1>

            <dl className="flex flex-wrap gap-x-8 gap-y-2 text-[0.875rem] text-[var(--color-slate)]">
              <div className="flex gap-2">
                <dt>Effective</dt>
                <dd className="font-medium text-[var(--color-graphite)]">
                  <time dateTime={document.effectiveDate}>
                    {formatLongDate(document.effectiveDate)}
                  </time>
                </dd>
              </div>
              <div className="flex gap-2">
                <dt>Last updated</dt>
                <dd className="font-medium text-[var(--color-graphite)]">
                  <time dateTime={document.lastUpdated}>
                    {formatLongDate(document.lastUpdated)}
                  </time>
                </dd>
              </div>
            </dl>

            <div className="flex flex-col gap-4 border-t border-[var(--color-border)] pt-6">
              {document.intro.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-[1.0625rem] leading-relaxed text-[var(--color-graphite)]"
                >
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
            <h2 id="contents-heading" className="text-eyebrow text-[var(--color-slate)]">
              Contents
            </h2>
            <ol className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
              {document.sections.map((section, index) => (
                <li key={section.id} className="flex gap-3 text-[0.9375rem] leading-snug">
                  <span className="font-mono text-[0.8125rem] text-[var(--color-slate)]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <a
                    href={`#${section.id}`}
                    className="text-[var(--color-blue)] underline decoration-[color-mix(in_srgb,var(--color-blue)_35%,transparent)] underline-offset-4 hover:decoration-[var(--color-blue)]"
                  >
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
                className="flex scroll-mt-24 flex-col gap-5"
              >
                <h2
                  id={`${section.id}-heading`}
                  className="text-h3 flex gap-3 text-[var(--color-navy)]"
                >
                  <span className="font-mono text-[0.875rem] leading-[1.9] text-[var(--color-slate)]">
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
