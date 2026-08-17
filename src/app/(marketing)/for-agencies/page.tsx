import type { Metadata } from 'next'

import { Container } from '@/components/layout/container'
import { PageHero } from '@/components/layout/page-hero'
import { Section } from '@/components/layout/section'
import { SectionHeading } from '@/components/layout/section-heading'
import { ClosingCta } from '@/components/sections/closing-cta'
import { RelatedLinks } from '@/components/sections/related-links'
import { JsonLd } from '@/components/seo/json-ld'
import { SignalList } from '@/components/ui/signal-list'
import { PartnershipModels } from '@/components/visuals/partnership-models'
import { routes } from '@/config/routes'
import {
  capabilities,
  closing,
  commitments,
  hero,
  meta,
  models,
  related,
} from '@/content/pages/for-agencies'
import { jsonLdGraph, webPageSchema } from '@/lib/seo/json-ld'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: routes.forAgencies.path,
})

export default function ForAgenciesPage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          webPageSchema({
            path: routes.forAgencies.path,
            title: meta.title,
            description: meta.description,
            hasBreadcrumb: true,
          }),
        )}
      />

      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        lead={hero.lead}
        primaryCta={hero.primaryCta}
        path={routes.forAgencies.path}
        breadcrumbs={[
          { label: routes.home.label, href: routes.home.path },
          { label: routes.forAgencies.label },
        ]}
      >
        <div className="flex flex-col gap-6">
          <ul className="flex flex-col gap-3 border-l-2 border-[var(--color-cyan)] pl-6">
            {hero.clientQuestions.map((question) => (
              <li
                key={question}
                className="text-[1.0625rem] leading-relaxed text-[color-mix(in_srgb,var(--color-field)_86%,transparent)]"
              >
                {question}
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-2">
            {hero.closing.map((paragraph) => (
              <p
                key={paragraph}
                className="text-[1.0625rem] leading-relaxed text-[color-mix(in_srgb,var(--color-field)_74%,transparent)]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </PageHero>

      <Section variant="field" size="major" ariaLabelledBy="models-title">
        <Container>
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow={models.eyebrow}
              title={models.title}
              id="models-title"
              maxWidth="wide"
            />
            <PartnershipModels models={models.items} />
          </div>
        </Container>
      </Section>

      <Section variant="white" size="major" ariaLabelledBy="capabilities-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
            <SectionHeading
              eyebrow={capabilities.eyebrow}
              title={capabilities.title}
              id="capabilities-title"
            />
            <SignalList items={capabilities.items} columns={2} />
          </div>
        </Container>
      </Section>

      <Section variant="soft" size="major" ariaLabelledBy="commitments-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
            <SectionHeading
              eyebrow={commitments.eyebrow}
              title={commitments.title}
              id="commitments-title"
            />
            <SignalList items={commitments.items} />
          </div>
        </Container>
      </Section>

      <RelatedLinks title="Where to go next." links={related} />

      <ClosingCta title={closing.title} primaryCta={closing.primaryCta} />
    </>
  )
}
