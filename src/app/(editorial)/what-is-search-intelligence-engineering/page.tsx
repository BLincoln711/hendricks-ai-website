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
import { TextCta } from '@/components/ui/cta'
import { DataTable } from '@/components/ui/data-table'
import { FitList, SignalList } from '@/components/ui/signal-list'
import { CompletePath } from '@/components/visuals/traditional-vs-ai-flow'
import { routes } from '@/config/routes'
import {
  closing,
  directAnswer,
  hero,
  meta,
  outcomes,
  path,
  related,
  sources,
  whatItIsNot,
  whyEngineering,
  whyItExists,
} from '@/content/pages/what-is-search-intelligence-engineering'
import { definedTermSchema, jsonLdGraph, webPageSchema } from '@/lib/seo/json-ld'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: routes.whatIsSearchIntelligenceEngineering.path,
})

export default function WhatIsSearchIntelligenceEngineeringPage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          webPageSchema({
            path: routes.whatIsSearchIntelligenceEngineering.path,
            title: meta.title,
            description: meta.description,
          }),
          definedTermSchema({
            path: routes.whatIsSearchIntelligenceEngineering.path,
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
        breadcrumbs={[
          { label: routes.home.label, href: routes.home.path },
          { label: routes.whatIsSearchIntelligenceEngineering.label },
        ]}
      />

      <DirectAnswer term={directAnswer.term} answer={directAnswer.answer} />

      <Section variant="field" size="major" ariaLabelledBy="why-exists-title">
        <Container>
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow={whyItExists.eyebrow}
              title={whyItExists.title}
              id="why-exists-title"
              level={2}
            />

            <DataTable
              caption={whyItExists.caption}
              columns={whyItExists.columns}
              rows={whyItExists.rows}
            />

            <div className="flex flex-col gap-2">
              {whyItExists.closing.map((line) => (
                <p key={line} className="text-lead measure text-[var(--color-graphite)]">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section variant="white" size="major" ariaLabelledBy="outcomes-title">
        <Container>
          <div className="flex flex-col gap-12">
            <SectionHeading
              eyebrow={outcomes.eyebrow}
              title={outcomes.title}
              id="outcomes-title"
              level={2}
            />

            <ol className="grid gap-x-10 gap-y-10 md:grid-cols-2">
              {outcomes.items.map((item) => (
                <li key={item.name} className="flex flex-col gap-2">
                  <span className="font-mono text-[0.75rem] text-[var(--color-blue)]">
                    {item.number}
                  </span>
                  <h3 className="text-[1.25rem] leading-snug font-medium text-[var(--color-navy)]">
                    {item.name}
                  </h3>
                  <p className="text-[0.9375rem] leading-relaxed text-[var(--color-slate)]">
                    {item.description}
                  </p>
                  <TextCta
                    cta={{
                      label: item.solution.label,
                      href: item.solution.href,
                      analytics: { location: 'wisie_outcomes' },
                    }}
                    className="mt-1"
                  />
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      <Section variant="soft" size="major" ariaLabelledBy="why-engineering-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-16">
            <div className="flex flex-col gap-5">
              <SectionHeading
                eyebrow={whyEngineering.eyebrow}
                title={whyEngineering.title}
                id="why-engineering-title"
                level={2}
              />
              <p className="text-[0.9375rem] leading-relaxed text-[var(--color-slate)]">
                {whyEngineering.lead}
              </p>
            </div>

            <SignalList items={whyEngineering.layers} columns={2} />
          </div>
        </Container>
      </Section>

      <Section variant="white" size="major" ariaLabelledBy="not-title">
        <Container width="narrow">
          <div className="flex flex-col gap-8">
            <SectionHeading
              eyebrow={whatItIsNot.eyebrow}
              title={whatItIsNot.title}
              id="not-title"
              level={2}
            />
            <FitList items={whatItIsNot.items} tone="not-fit" />
          </div>
        </Container>
      </Section>

      <Section variant="field" size="major" ariaLabelledBy="path-title">
        <Container>
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow={path.eyebrow}
              title={path.title}
              id="path-title"
              level={2}
            />
            <div className="rounded-[var(--radius-panel)] border border-[var(--color-border)] bg-white p-6 md:p-8">
              <CompletePath steps={path.steps} />
            </div>
          </div>
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
