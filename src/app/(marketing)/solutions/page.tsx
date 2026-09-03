import type { Metadata } from 'next'

import { Container } from '@/components/layout/container'
import { PageHero } from '@/components/layout/page-hero'
import { Section } from '@/components/layout/section'
import { SectionHeading } from '@/components/layout/section-heading'
import { ClosingCta } from '@/components/sections/closing-cta'
import { SolutionFeature } from '@/components/sections/solution-feature'
import { JsonLd } from '@/components/seo/json-ld'
import { SystemFlow } from '@/components/visuals/system-flow'
import { routes } from '@/config/routes'
import { siteConfig } from '@/config/site'
import {
  solutionsBridge,
  solutionsHero,
  solutionsList,
  solutionsMeta,
  solutionsSystem,
} from '@/content/pages/solutions'
import { jsonLdGraph, webPageSchema } from '@/lib/seo/json-ld'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: solutionsMeta.title,
  description: solutionsMeta.description,
  path: routes.solutions.path,
})

export default function SolutionsPage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          webPageSchema({
            path: routes.solutions.path,
            title: solutionsMeta.title,
            description: solutionsMeta.description,
            type: 'CollectionPage',
            mainEntityFragment: 'solutions',
            hasBreadcrumb: true,
          }),
          /*
            Each entry is a self-describing Service node rather than a bare
            `@id` reference. A bare reference to a node defined on another URL
            resolves to nothing when a crawler parses this page in isolation,
            which is how answer engines read it.
          */
          {
            '@type': 'ItemList',
            '@id': `${siteConfig.url}/solutions#solutions`,
            name: solutionsList.title,
            numberOfItems: solutionsList.items.length,
            itemListElement: solutionsList.items.map((item, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'Service',
                '@id': `${new URL(item.cta.href, siteConfig.url).toString()}#service`,
                name: item.name,
                description: item.description,
                url: new URL(item.cta.href, siteConfig.url).toString(),
                provider: { '@id': `${siteConfig.url}/#organization` },
              },
            })),
          },
        )}
      />

      <PageHero
        eyebrow={solutionsHero.eyebrow}
        title={solutionsHero.title}
        lead={solutionsHero.lead}
        primaryCta={solutionsHero.primaryCta}
        path={routes.solutions.path}
        breadcrumbs={[
          { label: routes.home.label, href: routes.home.path },
          { label: routes.solutions.label },
        ]}
      />

      <Section variant="field" size="standard" ariaLabelledBy="system-title">
        <Container>
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow={solutionsSystem.eyebrow}
              title={solutionsSystem.title}
              id="system-title"
              maxWidth="wide"
            />

            <SystemFlow stages={solutionsSystem.stages} />

            <p className="measure text-[0.9375rem] leading-relaxed text-ink-2">
              {solutionsSystem.note}
            </p>
          </div>
        </Container>
      </Section>

      <Section variant="white" size="major" ariaLabelledBy="solutions-list-title">
        <Container>
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow={solutionsList.eyebrow}
              title={solutionsList.title}
              id="solutions-list-title"
              maxWidth="wide"
            />

            <div className="flex flex-col">
              {solutionsList.items.map((solution, index) => (
                <SolutionFeature
                  key={solution.name}
                  solution={solution}
                  reverse={index % 2 === 1}
                />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <ClosingCta
        eyebrow={solutionsBridge.eyebrow}
        title={solutionsBridge.title}
        body={solutionsBridge.body}
        primaryCta={solutionsBridge.primaryCta}
      />
    </>
  )
}
