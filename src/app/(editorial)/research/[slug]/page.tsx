import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'

import { Container } from '@/components/layout/container'
import { PageHero } from '@/components/layout/page-hero'
import { Section } from '@/components/layout/section'
import { SectionHeading } from '@/components/layout/section-heading'
import { ClosingCta } from '@/components/sections/closing-cta'
import { DirectAnswer } from '@/components/sections/direct-answer'
import { RelatedLinks } from '@/components/sections/related-links'
import { JsonLd } from '@/components/seo/json-ld'
import { Callout } from '@/components/ui/callout'
import { TextCta } from '@/components/ui/cta'
import { DataTable } from '@/components/ui/data-table'
import { SignalList } from '@/components/ui/signal-list'
import { MetricDefinitions } from '@/components/visuals/metric-definitions'
import { ctaHref, isBuilt, routes } from '@/config/routes'
import { siteConfig } from '@/config/site'
import {
  findResearchArticle,
  researchArticles,
  type ResearchArticle,
  type ResearchNumberedItem,
} from '@/content/research'
import { jsonLdGraph, webPageSchema } from '@/lib/seo/json-ld'
import { buildMetadata } from '@/lib/seo/metadata'
import { formatLongDate } from '@/lib/utils/format-date'

/**
 * The article template for `/research/<slug>`.
 *
 * Every published slug comes from the registry in `src/content/research`, and
 * `dynamicParams = false` makes anything else a 404 rather than a page rendered
 * from a URL a visitor invented. The registry is also what `src/config/routes.ts`
 * registers by concrete path, so the sitemap, `llms.txt`, and `check:links` see
 * the same set of articles this file will render.
 *
 * The render order is the one the article module documents, which is the
 * fifteen-item research format in `docs/06` §12 with the publication record
 * placed after the limitations and before the corrections policy. That ordering
 * is deliberate and is not a template default: the finding, its evidence, and
 * its limits come first, and the provenance block sits at the point where a
 * reader who has read the study wants to know who produced it and when.
 *
 * One rule governs every optional section below. A section is rendered only when
 * the article carries it, and nothing is stubbed. `docs/06` §12 makes the other
 * fourteen required at the type level, so the only things that can be missing
 * here are genuinely optional: the checked half of the evidence, the numbered
 * method steps, and the trailing CTAs.
 */

export const dynamicParams = false

export function generateStaticParams() {
  return researchArticles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = findResearchArticle(slug)
  if (!article) return {}

  return buildMetadata({
    title: article.content.meta.title,
    description: article.content.meta.description,
    path: article.path,
    type: 'article',
    publishedTime: article.publishedDate,
    modifiedTime: article.updatedDate,
    authors: [article.content.byline.author],
  })
}

/**
 * The `Article` node for a study (`docs/06` §8).
 *
 * `Article` rather than `ScholarlyArticle` or `Report`. `ScholarlyArticle`
 * implies academic publication and peer review, neither of which happened here,
 * and `docs/06` §8 asks for a more specific subtype only "when accurate".
 * Overstating a genre in markup is the same error as overstating it in copy, and
 * this page exists to demonstrate the opposite habit.
 *
 * The author is a reference, not a declaration. The `Person` node for Brandon
 * Lincoln Hendricks is emitted once, on `/about`, and every other page points at
 * its `@id`. Declaring a second Person here would give the graph two people with
 * one name and split the site's authorship between them.
 *
 * No `image`. Google recommends one on an `Article`, and the route does emit an
 * Open Graph image, but its published URL carries a build-time hash this module
 * cannot construct. A property pointing at nothing is worse than an absent one.
 *
 * Colocated with its only caller rather than added to `src/lib/seo/json-ld.ts`.
 * Move it there when a second template needs it.
 */
function researchArticleSchema(article: ResearchArticle) {
  const url = new URL(article.path, siteConfig.url).toString()

  return {
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: article.title,
    description: article.summary,
    url,
    articleSection: article.category,
    datePublished: article.publishedDate,
    dateModified: article.updatedDate,
    author: { '@id': `${siteConfig.url}/about#person` },
    publisher: { '@id': `${siteConfig.url}/#organization` },
    isPartOf: { '@id': `${siteConfig.url}/#website` },
    mainEntityOfPage: { '@id': `${url}#webpage` },
    inLanguage: 'en-US',
  }
}

/** Numbered composition shared by findings, checks, method steps, and limits. */
function NumberedList({ items }: { items: readonly ResearchNumberedItem[] }) {
  return (
    <ol className="flex flex-col gap-10">
      {items.map((item) => (
        <li key={item.number} className="flex flex-col gap-2">
          <span className="font-mono text-[0.75rem] text-[var(--color-blue)]">{item.number}</span>
          <h3 className="text-[1.25rem] leading-snug font-medium text-[var(--color-navy)]">
            {item.name}
          </h3>
          <p className="measure text-[0.9375rem] leading-relaxed text-[var(--color-slate)]">
            {item.description}
          </p>
        </li>
      ))}
    </ol>
  )
}

function RecordRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1 border-t border-[var(--color-border)] pt-3">
      <dt className="text-eyebrow text-[var(--color-slate)]">{label}</dt>
      <dd className="text-[0.9375rem] leading-relaxed text-[var(--color-graphite)]">{children}</dd>
    </div>
  )
}

const inlineLinkClassName =
  'text-[var(--color-blue)] underline decoration-[color-mix(in_srgb,var(--color-blue)_40%,transparent)] underline-offset-4 hover:decoration-[var(--color-blue)]'

export default async function ResearchArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = findResearchArticle(slug)
  if (!article) notFound()

  const content = article.content

  /*
    Item 14. The article records its canonical corrections destination and the
    fallback to use while that route is unbuilt, and `ctaHref` picks between
    them. The link repoints itself the moment `/corrections` is marked built, and
    the article never needs an edit for it.
  */
  const correctionsHref = ctaHref(content.corrections.href, content.corrections.fallbackHref)

  /*
    The breadcrumb crumb is the route registry's short label rather than the
    article headline, which is a full sentence. Every published article is
    registered by its concrete path, so the lookup resolves; the fallback keeps a
    registry entry that has not yet been given a route from rendering a crumb
    reading "undefined".
  */
  const breadcrumbLabel =
    Object.values(routes).find((route) => route.path === article.path)?.label ?? article.title

  const appliedIn = content.sources.appliedIn.filter((item) => isBuilt(item.href))

  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          researchArticleSchema(article),
          webPageSchema({
            path: article.path,
            title: content.meta.title,
            description: content.meta.description,
            mainEntityFragment: 'article',
            hasBreadcrumb: true,
            datePublished: article.publishedDate,
            dateModified: article.updatedDate,
          }),
        )}
      />

      <PageHero
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        lead={content.hero.lead}
        primaryCta={content.hero.primaryCta}
        path={article.path}
        breadcrumbs={[
          { label: routes.home.label, href: routes.home.path },
          { label: routes.research.label, href: routes.research.path },
          { label: breadcrumbLabel },
        ]}
      />

      {/*
        The Results gate, in visible copy, immediately under the hero and above
        the finding. CONTENT_VERIFICATION.md counts a research experiment toward
        the gate only if it is clearly labeled, so the label is a section with its
        own h2 rather than a badge. Do not move it below the fold and do not
        reduce it to a chip.
      */}
      <Section variant="field" size="standard" ariaLabelledBy="experiment-label-title">
        <Container>
          <Callout
            variant="methodology"
            label={content.experimentLabel.label}
            title={content.experimentLabel.title}
            titleId="experiment-label-title"
            headingLevel={2}
          >
            {content.experimentLabel.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Callout>
        </Container>
      </Section>

      {/* Item 1a. */}
      <DirectAnswer term={content.directAnswer.term} answer={content.directAnswer.answer} />

      {/* Item 1b. */}
      <Section variant="soft" size="major" ariaLabelledBy="summary-title">
        <Container width="narrow">
          <div className="flex flex-col gap-8">
            <SectionHeading
              eyebrow={content.executiveSummary.eyebrow}
              title={content.executiveSummary.title}
              id="summary-title"
              level={2}
            />
            <div className="flex flex-col gap-4">
              {content.executiveSummary.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-[1.0625rem] leading-relaxed text-[var(--color-graphite)]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Item 2. */}
      <Section variant="white" size="major" ariaLabelledBy="findings-title">
        <Container>
          <div className="flex flex-col gap-12">
            <SectionHeading
              eyebrow={content.keyFindings.eyebrow}
              title={content.keyFindings.title}
              description={content.keyFindings.lead}
              id="findings-title"
              level={2}
            />

            <NumberedList items={content.keyFindings.items} />

            {content.keyFindings.closing ? (
              <div className="flex flex-col gap-3">
                {content.keyFindings.closing.map((line) => (
                  <p key={line} className="text-lead measure text-[var(--color-graphite)]">
                    {line}
                  </p>
                ))}
              </div>
            ) : null}
          </div>
        </Container>
      </Section>

      {/* Item 3. */}
      <Section variant="field" size="major" ariaLabelledBy="definitions-title">
        <Container>
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow={content.definitions.eyebrow}
              title={content.definitions.title}
              description={content.definitions.lead}
              id="definitions-title"
              level={2}
            />
            <MetricDefinitions metrics={content.definitions.items} />
          </div>
        </Container>
      </Section>

      {/* Item 4, the counted half. Every table carries a visible caption (docs/06 §14). */}
      <Section variant="white" size="major" ariaLabelledBy="data-title">
        <Container>
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow={content.data.eyebrow}
              title={content.data.title}
              description={content.data.lead}
              id="data-title"
              level={2}
            />

            <div className="flex flex-col gap-12">
              {content.data.tables.map((table) => (
                <div key={table.id} className="flex min-w-0 flex-col gap-3">
                  <DataTable
                    caption={table.caption}
                    captionVisible
                    columns={table.columns}
                    rows={table.rows}
                  />
                  {table.summary ? (
                    <p className="measure text-[0.9375rem] leading-relaxed text-[var(--color-slate)]">
                      {table.summary}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>

            {content.data.note ? (
              <div className="flex flex-col gap-3 border-t border-[var(--color-border)] pt-6">
                {content.data.note.map((line) => (
                  <p
                    key={line}
                    className="measure text-[0.9375rem] leading-relaxed text-[var(--color-slate)]"
                  >
                    {line}
                  </p>
                ))}
              </div>
            ) : null}
          </div>
        </Container>
      </Section>

      {/* Item 4, the checked half. Rendered only when the study ran checks. */}
      {content.errorsFound ? (
        <Section variant="soft" size="major" ariaLabelledBy="errors-title">
          <Container>
            <div className="flex flex-col gap-12">
              <SectionHeading
                eyebrow={content.errorsFound.eyebrow}
                title={content.errorsFound.title}
                description={content.errorsFound.lead}
                id="errors-title"
                level={2}
              />

              <NumberedList items={content.errorsFound.items} />

              {content.errorsFound.closing ? (
                <div className="flex flex-col gap-3">
                  {content.errorsFound.closing.map((line) => (
                    <p key={line} className="text-lead measure text-[var(--color-graphite)]">
                      {line}
                    </p>
                  ))}
                </div>
              ) : null}
            </div>
          </Container>
        </Section>
      ) : null}

      {/* Item 5. */}
      <Section variant="white" size="major" ariaLabelledBy="methodology-title">
        <Container>
          <div className="flex flex-col gap-12">
            <SectionHeading
              eyebrow={content.methodology.eyebrow}
              title={content.methodology.title}
              description={content.methodology.lead}
              id="methodology-title"
              level={2}
            />

            {content.methodology.items ? (
              <NumberedList items={content.methodology.items} />
            ) : null}

            <div className="flex flex-col gap-4">
              {content.methodology.closing ? (
                <div className="flex flex-col gap-3">
                  {content.methodology.closing.map((line) => (
                    <p
                      key={line}
                      className="measure text-[1.0625rem] leading-relaxed text-[var(--color-graphite)]"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              ) : null}

              {content.methodology.cta ? <TextCta cta={content.methodology.cta} /> : null}
            </div>
          </div>
        </Container>
      </Section>

      {/* Item 6. */}
      <Section variant="field" size="major" ariaLabelledBy="sample-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] lg:gap-16">
            <SectionHeading
              eyebrow={content.sample.eyebrow}
              title={content.sample.title}
              id="sample-title"
              level={2}
            />

            <div className="flex flex-col gap-6">
              <SignalList items={content.sample.items} />

              {content.sample.note
                ? content.sample.note.map((line) => (
                    <p
                      key={line}
                      className="text-[0.9375rem] leading-relaxed text-[var(--color-slate)]"
                    >
                      {line}
                    </p>
                  ))
                : null}
            </div>
          </div>
        </Container>
      </Section>

      {/* Item 7. */}
      <Section variant="soft" size="major" ariaLabelledBy="assumptions-title">
        <Container>
          <div className="flex flex-col gap-12">
            <SectionHeading
              eyebrow={content.assumptions.eyebrow}
              title={content.assumptions.title}
              description={content.assumptions.lead}
              id="assumptions-title"
              level={2}
            />
            <NumberedList items={content.assumptions.items} />
          </div>
        </Container>
      </Section>

      {/*
        Item 8, a full section rather than an aside. On a page whose whole claim
        is that the firm reports its own numbers straight, the limits of the
        numbers are section-level content, and the lead paragraph carries the
        limitation treatment so a skimming reader cannot mistake this for a
        summary.
      */}
      <Section variant="white" size="major" ariaLabelledBy="limitations-title">
        <Container>
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow={content.limitations.eyebrow}
              title={content.limitations.title}
              id="limitations-title"
              level={2}
            />

            {content.limitations.lead ? (
              <Callout variant="limitation">
                <p>{content.limitations.lead}</p>
              </Callout>
            ) : null}

            <NumberedList items={content.limitations.items} />
          </div>
        </Container>
      </Section>

      {/* Items 10 to 15, as one extractable block. */}
      <Section variant="field" size="standard" ariaLabelledBy="record-title">
        <Container>
          <div className="flex flex-col gap-6">
            <h2 id="record-title" className="text-eyebrow text-[var(--color-slate)]">
              Publication record
            </h2>

            <dl className="grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
              <RecordRow label="Author">
                <Link href={content.byline.authorHref} className={inlineLinkClassName}>
                  {content.byline.author}
                </Link>
                , {content.byline.authorRole}
              </RecordRow>
              <RecordRow label="Study type">{article.designation}</RecordRow>
              <RecordRow label="Claim class">{article.claimClass}</RecordRow>
              <RecordRow label="Category">{article.category}</RecordRow>
              <RecordRow label="Published">
                <time dateTime={article.publishedDate}>
                  {formatLongDate(article.publishedDate)}
                </time>
              </RecordRow>
              <RecordRow label="Last updated">
                <time dateTime={article.updatedDate}>{formatLongDate(article.updatedDate)}</time>
              </RecordRow>
              <RecordRow label="Data through">
                <time dateTime={article.dataThroughDate}>
                  {formatLongDate(article.dataThroughDate)}
                </time>
              </RecordRow>
              <RecordRow label="Related solution">
                <Link href={article.relatedSolution.href} className={inlineLinkClassName}>
                  {article.relatedSolution.label}
                </Link>
              </RecordRow>
              <RecordRow label="Corrections">
                <Link href={correctionsHref} className={inlineLinkClassName}>
                  {content.corrections.label}
                </Link>
              </RecordRow>
            </dl>

            {content.byline.note ? (
              <p className="measure text-[0.9375rem] leading-relaxed text-[var(--color-slate)]">
                {content.byline.note}
              </p>
            ) : null}
          </div>
        </Container>
      </Section>

      {/* Item 14, as a section. */}
      <Section variant="white" size="standard" ariaLabelledBy="corrections-title">
        <Container width="narrow">
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow={content.corrections.eyebrow}
              title={content.corrections.title}
              id="corrections-title"
              level={2}
            />

            <div className="flex flex-col gap-4">
              {content.corrections.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-[1.0625rem] leading-relaxed text-[var(--color-graphite)]"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <TextCta cta={{ label: content.corrections.label, href: correctionsHref }} />
          </div>
        </Container>
      </Section>

      {/* Item 15, as a section. */}
      <Section variant="navy" size="major" ariaLabelledBy="related-solution-title">
        <Container>
          <div className="flex flex-col gap-8">
            <SectionHeading
              eyebrow={content.relatedSolution.eyebrow}
              title={content.relatedSolution.title}
              id="related-solution-title"
              level={2}
              onNavy
            />

            <div className="flex flex-col gap-4">
              {content.relatedSolution.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="measure text-[1.0625rem] leading-relaxed text-[color-mix(in_srgb,var(--color-field)_78%,transparent)]"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {content.relatedSolution.ctas ? (
              <div className="flex flex-col gap-3">
                {content.relatedSolution.ctas.map((cta) => (
                  <TextCta key={cta.href} cta={cta} onNavy />
                ))}
              </div>
            ) : null}
          </div>
        </Container>
      </Section>

      <RelatedLinks title="Where to go next." links={content.related} />

      {/*
        Item 9. Rendered here rather than through `SourcesNote`, whose fixed
        sentence reads "This definition is applied in": correct on a definition
        page and wrong on a measurement. Everything else matches that component,
        including the ISO `dateTime` on the visible review date, which is what
        lets `src/app/sitemap.ts` advertise the same date the reader can see.
      */}
      <Section variant="field" size="small" ariaLabelledBy="sources-heading">
        <Container width="narrow">
          <div className="flex flex-col gap-4">
            <h2 id="sources-heading" className="text-eyebrow text-[var(--color-slate)]">
              Sources and updates
            </h2>

            <p className="text-[0.9375rem] leading-relaxed text-[var(--color-slate)]">
              {content.sources.basis} Last reviewed{' '}
              <time dateTime={content.sources.reviewed} className="text-[var(--color-graphite)]">
                {formatLongDate(content.sources.reviewed)}
              </time>
              .
            </p>

            {appliedIn.length > 0 ? (
              <p className="text-[0.9375rem] leading-relaxed text-[var(--color-slate)]">
                This measurement is applied in{' '}
                {appliedIn.map((item, index) => (
                  <span key={item.href}>
                    {index > 0 ? (index === appliedIn.length - 1 ? ' and ' : ', ') : ''}
                    <Link href={item.href} className={inlineLinkClassName}>
                      {item.label}
                    </Link>
                  </span>
                ))}
                .
              </p>
            ) : null}
          </div>
        </Container>
      </Section>

      <ClosingCta title={content.closing.title} primaryCta={content.closing.primaryCta} />
    </>
  )
}
