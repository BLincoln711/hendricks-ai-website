import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Container } from '@/components/layout/container'
import { PageHero } from '@/components/layout/page-hero'
import { Section } from '@/components/layout/section'
import { SectionHeading } from '@/components/layout/section-heading'
import { ClosingCta } from '@/components/sections/closing-cta'
import { RelatedLinks } from '@/components/sections/related-links'
import { JsonLd } from '@/components/seo/json-ld'
import { SignalList } from '@/components/ui/signal-list'
import { SignalDot } from '@/components/visuals/signal-dot'
import { isBuilt, routes } from '@/config/routes'
import { siteConfig } from '@/config/site'
import {
  closing,
  coverage,
  foundations,
  foundationsSection,
  hero,
  latest,
  meta,
  related,
  standards,
} from '@/content/research/hub'
import {
  furtherResearchArticles,
  latestResearchArticle,
  type ResearchArticle,
} from '@/content/research'
import { itemListSchema, jsonLdGraph, webPageSchema } from '@/lib/seo/json-ld'
import { buildMetadata } from '@/lib/seo/metadata'
import { formatLongDate } from '@/lib/utils/format-date'

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: routes.research.path,
})

/**
 * A published study, rendered at the size the hub currently needs.
 *
 * `featured` is not decoration. The approved empty-state rule forbids launching
 * an index with no meaningful content, and the failure mode with one article is
 * not an empty page but a three-column grid holding a single lonely card, which
 * reads as an index that lost its contents. The newest study therefore renders
 * as a full-width panel that is complete on its own terms, and the grid appears
 * only once there is something to put in it.
 *
 * Every field the approved card requirements name is present: category, title,
 * short summary, author, and dates. Reading time is absent on purpose, because
 * the approved copy allows it "only if accurately calculated" and nothing here
 * counts the words of a rendered page. No popularity metric appears at all.
 */
function ArticleCard({ article, featured = false }: { article: ResearchArticle; featured?: boolean }) {
  const titleId = `research-${article.slug}-title`

  return (
    <article
      className={
        featured
          ? 'flex flex-col gap-6 border border-rule p-6 md:p-10'
          : 'flex h-full flex-col gap-4 border border-rule p-5'
      }
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="text-eyebrow flex items-center gap-2 text-ink-2">
          <SignalDot size={6} tone="blue" />
          {article.category}
        </span>
        {/* The Results-gate label, on the card as well as on the article. */}
        <span className="text-eyebrow rounded-full border border-rule px-3 py-1 text-ink-2">
          {article.designation}
        </span>
      </div>

      <h3
        id={titleId}
        className={
          featured
            ? 'text-h3 max-w-[26ch] text-ink'
            : 'text-[1.125rem] leading-snug font-medium text-ink'
        }
      >
        <Link
          href={article.path}
          className="underline decoration-ink-2 underline-offset-4 transition-colors hover:text-link hover:decoration-link"
        >
          {article.title}
        </Link>
      </h3>

      <p
        className={
          featured
            ? 'text-lead measure text-ink-3'
            : 'text-[0.9375rem] leading-relaxed text-ink-2'
        }
      >
        {article.summary}
      </p>

      <dl className="flex flex-col gap-2 border-t border-rule pt-4 text-[0.875rem] text-ink-2 sm:flex-row sm:flex-wrap sm:gap-x-8">
        <div className="flex gap-2">
          <dt className="text-ink-2">Author</dt>
          {/* Read from the article's own byline, so the card and the page cannot
              credit the study to two differently worded authors. */}
          <dd className="text-ink-3">{article.content.byline.author}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="text-ink-2">Published</dt>
          <dd className="text-ink-3">
            <time dateTime={article.publishedDate}>{formatLongDate(article.publishedDate)}</time>
          </dd>
        </div>
        <div className="flex gap-2">
          <dt className="text-ink-2">Data through</dt>
          <dd className="text-ink-3">
            <time dateTime={article.dataThroughDate}>
              {formatLongDate(article.dataThroughDate)}
            </time>
          </dd>
        </div>
      </dl>

      {/*
        The card title above is already the link to the study, so this repeated
        label is qualified by the title through `aria-describedby`; otherwise
        five links would share one accessible name for five destinations
        (16 SM-10).
      */}
      <Link
        href={article.path}
        aria-describedby={titleId}
        className="group inline-flex items-center gap-1.5 font-medium text-link underline decoration-1 underline-offset-4 transition-colors hover:text-link"
      >
        Read the study
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-[var(--duration-micro)] group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
        />
      </Link>
    </article>
  )
}

export default function ResearchHubPage() {
  // Only the foundation pages whose routes exist. An unbuilt entry reappears on
  // its own the moment its route is marked built, with no edit to the content.
  const availableFoundations = foundations.filter((link) => isBuilt(link.href))

  const researchUrl = new URL(routes.research.path, siteConfig.url).toString()

  return (
    <>
      {/*
        CollectionPage rather than WebPage, and an ItemList of what is actually
        published rather than of what the section intends to publish. The list is
        built from the registry, so it cannot advertise a study that does not
        exist. No Article node is emitted here: each article declares its own on
        its own URL, and restating them on the hub would put two nodes with
        different `@id`s behind one headline.
      */}
      <JsonLd
        data={jsonLdGraph(
          webPageSchema({
            path: routes.research.path,
            title: meta.title,
            description: meta.description,
            type: 'CollectionPage',
            hasBreadcrumb: true,
            mainEntity: { '@id': `${researchUrl}#published-research` },
          }),
          itemListSchema({
            path: routes.research.path,
            name: 'Published research',
            items: [latestResearchArticle, ...furtherResearchArticles]
              .filter((article) => article !== undefined)
              .map((article) => ({ name: article.title, description: article.summary })),
          }),
        )}
      />

      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        lead={hero.lead}
        primaryCta={
          latestResearchArticle
            ? {
                label: hero.primaryCtaLabel,
                href: latestResearchArticle.path,
                analytics: { location: 'research_hub_hero' },
              }
            : undefined
        }
        path={routes.research.path}
        breadcrumbs={[
          { label: routes.home.label, href: routes.home.path },
          { label: routes.research.label },
        ]}
      />

      {latestResearchArticle ? (
        <Section variant="white" size="major" ariaLabelledBy="latest-title">
          <Container>
            <div className="flex flex-col gap-10">
              <SectionHeading
                eyebrow={latest.eyebrow}
                title={latest.title}
                id="latest-title"
                level={2}
              />

              <ArticleCard article={latestResearchArticle} featured />

              {furtherResearchArticles.length > 0 ? (
                <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {furtherResearchArticles.map((article) => (
                    <li key={article.slug}>
                      <ArticleCard article={article} />
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </Container>
        </Section>
      ) : null}

      <Section variant="field" size="major" ariaLabelledBy="coverage-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-16">
            <SectionHeading
              eyebrow={coverage.eyebrow}
              title={coverage.title}
              description={coverage.description}
              id="coverage-title"
              level={2}
            />
            <SignalList items={coverage.categories} columns={2} />
          </div>
        </Container>
      </Section>

      {availableFoundations.length > 0 ? (
        <Section variant="white" size="major" ariaLabelledBy="foundations-title">
          <Container>
            <div className="flex flex-col gap-10">
              <SectionHeading
                eyebrow={foundationsSection.eyebrow}
                title={foundationsSection.title}
                description={foundationsSection.description}
                id="foundations-title"
                level={2}
              />

              <ul className="grid gap-4 md:grid-cols-2">
                {availableFoundations.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex h-full flex-col gap-2 border border-rule p-5 transition-colors hover:border-path"
                    >
                      <span className="flex items-center gap-1.5 text-[1.0625rem] font-medium text-ink">
                        {link.label}
                        <ArrowRight
                          aria-hidden="true"
                          className="size-4 shrink-0 text-link transition-transform duration-[var(--duration-micro)] group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                        />
                      </span>
                      <span className="text-[0.875rem] leading-relaxed text-ink-2">
                        {link.description}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </Section>
      ) : null}

      <Section variant="soft" size="major" ariaLabelledBy="standards-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-16">
            <SectionHeading
              eyebrow={standards.eyebrow}
              title={standards.title}
              description={standards.description}
              id="standards-title"
              level={2}
            />
            <SignalList items={standards.items} columns={2} />
          </div>
        </Container>
      </Section>

      <RelatedLinks title="Where to go next." links={related} />

      <ClosingCta
        title={closing.title}
        primaryCta={closing.primaryCta}
        secondaryCta={closing.secondaryCta}
      />
    </>
  )
}
