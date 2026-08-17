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
import { DataTable } from '@/components/ui/data-table'
import { SignalList } from '@/components/ui/signal-list'
import { ImpactMeasurementStack } from '@/components/visuals/impact-measurement-stack'
import { routes } from '@/config/routes'
import {
  closing,
  deliverables,
  evidenceGrades,
  hero,
  impactContract,
  levels,
  limitation,
  meta,
  related,
} from '@/content/pages/search-impact-measurement'
import { jsonLdGraph, serviceSchema, webPageSchema } from '@/lib/seo/json-ld'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: routes.searchImpactMeasurement.path,
})

export default function SearchImpactMeasurementPage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          webPageSchema({
            path: routes.searchImpactMeasurement.path,
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
            path: routes.searchImpactMeasurement.path,
            name: routes.searchImpactMeasurement.label,
            description: hero.lead.join(' '),
          }),
        )}
      />

      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        lead={hero.lead}
        primaryCta={hero.primaryCta}
        path={routes.searchImpactMeasurement.path}
        breadcrumbs={[
          { label: routes.home.label, href: routes.home.path },
          { label: routes.solutions.label, href: routes.solutions.path },
          { label: routes.searchImpactMeasurement.label },
        ]}
      />

      <Section variant="field" size="major" ariaLabelledBy="levels-title">
        <Container>
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow={levels.eyebrow}
              title={levels.title}
              id="levels-title"
              maxWidth="wide"
            />
            <ImpactMeasurementStack levels={levels.items} />
          </div>
        </Container>
      </Section>

      <Section variant="white" size="major" ariaLabelledBy="evidence-grades-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
            <SectionHeading
              eyebrow={evidenceGrades.eyebrow}
              title={evidenceGrades.title}
              id="evidence-grades-title"
            />

            <DataTable
              caption={evidenceGrades.caption}
              columns={[
                { key: 'grade', header: 'Grade', rowHeader: true, width: '5.5rem' },
                { key: 'standard', header: 'Standard' },
              ]}
              rows={evidenceGrades.rows}
            />
          </div>
        </Container>
      </Section>

      <Deliverables title={deliverables.title} items={deliverables.items} />

      <Section variant="white" size="major" ariaLabelledBy="impact-contract-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
            <SectionHeading
              eyebrow={impactContract.eyebrow}
              title={impactContract.title}
              description={impactContract.lead}
              id="impact-contract-title"
            />
            <SignalList items={impactContract.items} columns={2} />
          </div>
        </Container>
      </Section>

      <Section variant="field" size="standard">
        <Container>
          <Callout variant="limitation" label="What we do not promise" title={limitation.title}>
            {limitation.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p className="font-medium text-[var(--color-navy)]">{limitation.closing}</p>
          </Callout>
        </Container>
      </Section>

      <RelatedLinks title="Related solutions and research." links={related} />

      <ClosingCta title={closing.title} primaryCta={closing.primaryCta} />
    </>
  )
}
