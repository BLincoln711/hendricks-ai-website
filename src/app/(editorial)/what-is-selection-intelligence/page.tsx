import type { Metadata } from 'next'

import { Container } from '@/components/layout/container'
import { PageHero } from '@/components/layout/page-hero'
import { Section } from '@/components/layout/section'
import { SectionHeading } from '@/components/layout/section-heading'
import { ClosingCta } from '@/components/sections/closing-cta'
import { DirectAnswer } from '@/components/sections/direct-answer'
import { RelatedLinks } from '@/components/sections/related-links'
import { SourcesNote } from '@/components/sections/sources-note'
import { JsonLd } from '@/components/seo/json-ld'
import { Callout } from '@/components/ui/callout'
import { SignalList } from '@/components/ui/signal-list'
import { MetricDefinitions } from '@/components/visuals/metric-definitions'
import { routes } from '@/config/routes'
import {
  closing,
  directAnswer,
  hero,
  limitation,
  meta,
  metrics,
  questions,
  related,
  sources,
  versusRankTracking,
  whyContext,
} from '@/content/pages/what-is-selection-intelligence'
import {
  definedTermSchema,
  definedTermSetSchema,
  jsonLdGraph,
  webPageSchema,
} from '@/lib/seo/json-ld'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: routes.whatIsSelectionIntelligence.path,
})

export default function WhatIsSelectionIntelligencePage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          webPageSchema({
            path: routes.whatIsSelectionIntelligence.path,
            title: meta.title,
            description: meta.description,
            // The subject of a definition page is the term it defines, not the
            // firm. Without mainEntity the graph never says what this page is about.
            mainEntityFragment: 'term',
            about: null,
            hasBreadcrumb: true,
            // Emitted only because this page renders the same date visibly in
            // its SourcesNote <time>. Pages without a visible date get none.
            dateModified: sources.reviewed,
          }),
          definedTermSetSchema([
            {
              name: 'Search Intelligence Engineering',
              path: routes.whatIsSearchIntelligenceEngineering.path,
            },
            { name: 'Selection Intelligence', path: routes.whatIsSelectionIntelligence.path },
          ]),
          definedTermSchema({
            path: routes.whatIsSelectionIntelligence.path,
            term: directAnswer.term,
            directAnswer: directAnswer.answer,
          }),
        )}
      />

      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        lead={hero.lead}
        primaryCta={hero.primaryCta}
        path={routes.whatIsSelectionIntelligence.path}
        breadcrumbs={[
          { label: routes.home.label, href: routes.home.path },
          { label: routes.whatIsSelectionIntelligence.label },
        ]}
      />

      <DirectAnswer term={directAnswer.term} answer={directAnswer.answer} />

      <Section variant="field" size="major" ariaLabelledBy="questions-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)] lg:gap-16">
            <SectionHeading
              eyebrow={questions.eyebrow}
              title={questions.title}
              id="questions-title"
              level={2}
            />
            <SignalList items={questions.items} columns={2} />
          </div>
        </Container>
      </Section>

      <Section variant="white" size="major" ariaLabelledBy="versus-title">
        <Container>
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow={versusRankTracking.eyebrow}
              title={versusRankTracking.title}
              id="versus-title"
              level={2}
            />

            <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
              {[versusRankTracking.rankTracking, versusRankTracking.selectionIntelligence].map(
                (side, index) => {
                  const isHendricks = index === 1
                  return (
                    <figure key={side.label} className="flex flex-col gap-3">
                      <figcaption
                        className={
                          isHendricks
                            ? 'text-eyebrow text-ink-2'
                            : 'text-eyebrow text-ink-2'
                        }
                      >
                        {side.label}
                      </figcaption>
                      <blockquote
                        className={
                          isHendricks
                            ? ' border-l-2 border-path p-6 md:p-8'
                            : ' border-l-2 border-rule p-6 md:p-8'
                        }
                      >
                        <p
                          className={
                            isHendricks
                              ? 'text-[1.25rem] leading-snug font-medium text-ink'
                              : 'text-[1.25rem] leading-snug text-ink-2'
                          }
                        >
                          {side.question}
                        </p>
                      </blockquote>
                    </figure>
                  )
                },
              )}
            </div>
          </div>
        </Container>
      </Section>

      <Section variant="soft" size="major" ariaLabelledBy="context-title">
        <Container>
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow={whyContext.eyebrow}
              title={whyContext.title}
              description={whyContext.lead}
              id="context-title"
              level={2}
            />

            <div className="flex flex-col gap-5">
              <p className="font-medium text-ink">{whyContext.testsLead}</p>
              <SignalList items={whyContext.tests} columns={2} />
            </div>

            <p className="text-lead measure text-ink-3">{whyContext.closing}</p>
          </div>
        </Container>
      </Section>

      <Section variant="white" size="major" ariaLabelledBy="metrics-title">
        <Container>
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow={metrics.eyebrow}
              title={metrics.title}
              id="metrics-title"
              level={2}
            />
            <MetricDefinitions metrics={metrics.items} />
          </div>
        </Container>
      </Section>

      <Section variant="field" size="standard">
        <Container>
          <Callout variant="limitation" label="Honest limitation" title={limitation.title}>
            {limitation.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Callout>
        </Container>
      </Section>

      <RelatedLinks title="Where to go next." links={related} />

      <SourcesNote
        reviewed={sources.reviewed}
        basis={sources.basis}
        appliedIn={sources.appliedIn}
      />

      <ClosingCta title={closing.title} primaryCta={closing.primaryCta} />
    </>
  )
}
