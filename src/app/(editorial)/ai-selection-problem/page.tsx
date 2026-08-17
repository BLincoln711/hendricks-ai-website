import type { Metadata } from 'next'

import { Container } from '@/components/layout/container'
import { PageHero } from '@/components/layout/page-hero'
import { Section } from '@/components/layout/section'
import { SectionHeading } from '@/components/layout/section-heading'
import { ClosingCta } from '@/components/sections/closing-cta'
import { RelatedLinks } from '@/components/sections/related-links'
import { SourcesNote } from '@/components/sections/sources-note'
import { JsonLd } from '@/components/seo/json-ld'
import { SignalList } from '@/components/ui/signal-list'
import { NegationLadder } from '@/components/visuals/negation-ladder'
import { CompletePath, TraditionalVsAiFlow } from '@/components/visuals/traditional-vs-ai-flow'
import { routes } from '@/config/routes'
import {
  closing,
  consequence,
  hero,
  intelligenceGap,
  journeys,
  meta,
  notEnough,
  related,
  response,
  sources,
} from '@/content/pages/ai-selection-problem'
import { jsonLdGraph, webPageSchema } from '@/lib/seo/json-ld'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: routes.aiSelectionProblem.path,
})

export default function AiSelectionProblemPage() {
  return (
    <>
      {/* No DefinedTerm node: this page explains a problem rather than defining a
          term, so the markup would not reproduce visible content (docs/06 §8). */}
      <JsonLd
        data={jsonLdGraph(
          webPageSchema({
            path: routes.aiSelectionProblem.path,
            title: meta.title,
            description: meta.description,
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
          { label: routes.aiSelectionProblem.label },
        ]}
      />

      <Section variant="white" size="major" ariaLabelledBy="journeys-title">
        <Container>
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow={journeys.eyebrow}
              title={journeys.title}
              id="journeys-title"
              level={2}
            />
            <TraditionalVsAiFlow
              traditional={journeys.traditional}
              aiMediated={journeys.aiMediated}
            />
          </div>
        </Container>
      </Section>

      <Section variant="field" size="major" ariaLabelledBy="consequence-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-16">
            <SectionHeading
              eyebrow={consequence.eyebrow}
              title={consequence.title}
              id="consequence-title"
              level={2}
            />

            <div className="flex flex-col gap-8">
              <SignalList items={consequence.assets} columns={2} />

              <div className="flex flex-col gap-3 border-t border-[var(--color-border)] pt-6">
                {consequence.closing.map((line) => (
                  <p key={line} className="text-lead text-[var(--color-graphite)]">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section variant="white" size="major" ariaLabelledBy="not-enough-title">
        <Container width="narrow">
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow={notEnough.eyebrow}
              title={notEnough.title}
              id="not-enough-title"
              level={2}
            />

            <NegationLadder steps={notEnough.ladder} />

            <div className="flex flex-col gap-4">
              <p className="font-medium text-[var(--color-navy)]">{notEnough.pathLead}</p>
              <div className="rounded-[var(--radius-panel)] border border-[var(--color-border)] bg-[var(--color-field)] p-6">
                <CompletePath steps={notEnough.path} />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section variant="soft" size="major" ariaLabelledBy="gap-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] lg:gap-16">
            <SectionHeading
              eyebrow={intelligenceGap.eyebrow}
              title={intelligenceGap.title}
              id="gap-title"
              level={2}
            />
            <SignalList items={intelligenceGap.questions} columns={2} />
          </div>
        </Container>
      </Section>

      <Section variant="navy" size="major" ariaLabelledBy="response-title">
        <Container>
          <div className="flex flex-col gap-12">
            <SectionHeading
              eyebrow={response.eyebrow}
              title={response.title}
              id="response-title"
              level={2}
              onNavy
            />

            <ol className="grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
              {response.items.map((item) => (
                <li key={item.name} className="flex flex-col gap-2">
                  <span className="font-mono text-[0.75rem] text-[var(--color-cyan)]">
                    {item.number}
                  </span>
                  <h3 className="text-[1.125rem] leading-snug font-medium text-[var(--color-field)]">
                    {item.name}
                  </h3>
                  <p className="text-[0.9375rem] leading-relaxed text-[color-mix(in_srgb,var(--color-field)_74%,transparent)]">
                    {item.description}
                  </p>
                </li>
              ))}
            </ol>
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
