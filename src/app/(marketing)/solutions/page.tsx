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
          }),
        )}
      />

      <PageHero
        eyebrow={solutionsHero.eyebrow}
        title={solutionsHero.title}
        lead={solutionsHero.lead}
        primaryCta={solutionsHero.primaryCta}
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

            <p className="measure text-[0.9375rem] leading-relaxed text-[var(--color-slate)]">
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
