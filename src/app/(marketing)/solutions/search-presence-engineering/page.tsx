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
import { EngineeringLayers } from '@/components/visuals/engineering-layers'
import { InterventionLedgerPreview } from '@/components/visuals/intervention-ledger-preview'
import { SolutionMotif } from '@/components/visuals/solution-motif'
import { routes } from '@/config/routes'
import {
  closing,
  deliverables,
  hero,
  layers,
  ledger,
  meta,
  related,
  scope,
  trust,
} from '@/content/pages/search-presence-engineering'
import { jsonLdGraph, serviceSchema, webPageSchema } from '@/lib/seo/json-ld'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: routes.searchPresenceEngineering.path,
})

export default function SearchPresenceEngineeringPage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          webPageSchema({
            path: routes.searchPresenceEngineering.path,
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
            path: routes.searchPresenceEngineering.path,
            name: routes.searchPresenceEngineering.label,
            description: hero.lead.join(' '),
          }),
        )}
      />

      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        lead={hero.lead}
        primaryCta={hero.primaryCta}
        path={routes.searchPresenceEngineering.path}
        breadcrumbs={[
          { label: routes.home.label, href: routes.home.path },
          { label: routes.solutions.label, href: routes.solutions.path },
          { label: routes.searchPresenceEngineering.label },
        ]}
        visual={
          <div className=" border border-rule-2 p-8">
            <SolutionMotif motif="presence" />
          </div>
        }
      />

      <Section variant="field" size="major" ariaLabelledBy="layers-title">
        <Container>
          <div className="flex flex-col gap-8">
            <SectionHeading
              eyebrow={layers.eyebrow}
              title={layers.title}
              id="layers-title"
              maxWidth="wide"
            />
            <EngineeringLayers layers={layers.items} />
          </div>
        </Container>
      </Section>

      <Section variant="white" size="standard">
        <Container>
          <Callout variant="insight" label="Scope" title={scope.title}>
            {scope.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Callout>
        </Container>
      </Section>

      <Deliverables title={deliverables.title} items={deliverables.items} />

      <Section variant="white" size="major" ariaLabelledBy="ledger-title">
        <Container>
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow={ledger.eyebrow}
              title={ledger.title}
              description={ledger.lead}
              id="ledger-title"
              maxWidth="wide"
            />
            <InterventionLedgerPreview fields={ledger.fields} caption={ledger.caption} />
          </div>
        </Container>
      </Section>

      <Section variant="field" size="standard">
        <Container>
          <Callout variant="limitation" label="What we control" title={trust.title}>
            {trust.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Callout>
        </Container>
      </Section>

      <RelatedLinks title="Related solutions and research." links={related} />

      <ClosingCta
        title={closing.title}
        primaryCta={closing.primaryCta}
        secondaryCta={closing.secondaryCta}
      />
    </>
  )
}
