import type { Metadata } from 'next'

import { Container } from '@/components/layout/container'
import { PageHero } from '@/components/layout/page-hero'
import { Section } from '@/components/layout/section'
import { SectionHeading } from '@/components/layout/section-heading'
import { ClosingCta } from '@/components/sections/closing-cta'
import { Deliverables } from '@/components/sections/deliverables'
import { RelatedLinks } from '@/components/sections/related-links'
import { JsonLd } from '@/components/seo/json-ld'
import { Callout } from '@/components/ui/callout'
import { SignalList } from '@/components/ui/signal-list'
import { ContextPanelDiagram } from '@/components/visuals/context-panel-diagram'
import { MetricDefinitions } from '@/components/visuals/metric-definitions'
import { CompletePath } from '@/components/visuals/traditional-vs-ai-flow'
import { routes } from '@/config/routes'
import {
  closing,
  contextPanel,
  deliverables,
  firstStage,
  hero,
  limitation,
  measures,
  meta,
  metrics,
  related,
} from '@/content/pages/selection-intelligence'
import { jsonLdGraph, serviceSchema, webPageSchema } from '@/lib/seo/json-ld'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: routes.selectionIntelligence.path,
})

export default function SelectionIntelligencePage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          webPageSchema({
            path: routes.selectionIntelligence.path,
            title: meta.title,
            description: meta.description,
            mainEntityFragment: 'service',
            hasBreadcrumb: true,
          }),
          /*
            docs/06 §8 requires Service on the solution pages. `description` is
            the page's own visible hero lead verbatim rather than the meta
            description, so the markup reproduces what a reader actually sees.
          */
          serviceSchema({
            path: routes.selectionIntelligence.path,
            name: routes.selectionIntelligence.label,
            description: hero.lead.join(' '),
          }),
        )}
      />

      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        lead={hero.lead}
        primaryCta={hero.primaryCta}
        path={routes.selectionIntelligence.path}
        breadcrumbs={[
          { label: routes.home.label, href: routes.home.path },
          { label: routes.solutions.label, href: routes.solutions.path },
          { label: routes.selectionIntelligence.label },
        ]}
      >
        <dl className="flex flex-col gap-5 border-l-2 border-[var(--color-cyan)] pl-6">
          <div className="flex flex-col gap-1">
            <dt className="text-eyebrow text-[color-mix(in_srgb,var(--color-field)_60%,transparent)]">
              It moves beyond
            </dt>
            <dd className="text-[1.25rem] leading-snug text-[color-mix(in_srgb,var(--color-field)_70%,transparent)] line-through decoration-1">
              {hero.movesBeyond}
            </dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="text-eyebrow text-[var(--color-cyan)]">And answers</dt>
            <dd className="text-[1.25rem] leading-snug font-medium text-[var(--color-field)]">
              {hero.andAnswers}
            </dd>
          </div>
        </dl>
      </PageHero>

      <Section variant="field" size="major" ariaLabelledBy="first-stage-title">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
            <div className="flex flex-col gap-6">
              <SectionHeading
                eyebrow={firstStage.eyebrow}
                title={firstStage.title}
                description={firstStage.lead}
                id="first-stage-title"
              />
              <p className="text-[1.0625rem] font-medium text-[var(--color-navy)]">
                {firstStage.closing}
              </p>
            </div>

            <SignalList items={firstStage.states} />
          </div>
        </Container>
      </Section>

      <Section variant="white" size="major" ariaLabelledBy="context-panel-title">
        <Container>
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow={contextPanel.eyebrow}
              title={contextPanel.title}
              id="context-panel-title"
              maxWidth="wide"
            />
            <ContextPanelDiagram panels={contextPanel.panels} />
          </div>
        </Container>
      </Section>

      <Section variant="soft" size="major" ariaLabelledBy="measures-title">
        <Container>
          <div className="flex flex-col gap-12">
            <SectionHeading
              eyebrow={measures.eyebrow}
              title={measures.title}
              id="measures-title"
              maxWidth="wide"
            />

            <dl className="grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
              {measures.items.map((item) => (
                <div
                  key={item.name}
                  className="flex flex-col gap-2 border-t-2 border-[var(--color-blue)] pt-5"
                >
                  <dt className="text-[1.0625rem] font-medium text-[var(--color-navy)]">
                    {item.name}
                  </dt>
                  <dd className="text-[0.9375rem] leading-relaxed text-[var(--color-slate)]">
                    {item.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      <Deliverables title={deliverables.title} items={deliverables.items} />

      <Section variant="white" size="major" ariaLabelledBy="metrics-title">
        <Container>
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow={metrics.eyebrow}
              title={metrics.title}
              id="metrics-title"
              maxWidth="wide"
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
            <p className="font-medium text-[var(--color-navy)]">{limitation.observeLead}</p>
            <CompletePath steps={limitation.chain} />
            <p>{limitation.closing}</p>
          </Callout>
        </Container>
      </Section>

      <RelatedLinks title="Related solutions and research." links={related} />

      <ClosingCta title={closing.title} primaryCta={closing.primaryCta} />
    </>
  )
}
