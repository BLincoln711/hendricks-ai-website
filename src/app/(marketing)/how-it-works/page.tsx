import type { Metadata } from 'next'
import Link from 'next/link'

import { Container } from '@/components/layout/container'
import { PageHero } from '@/components/layout/page-hero'
import { Section } from '@/components/layout/section'
import { SectionHeading } from '@/components/layout/section-heading'
import { ClosingCta } from '@/components/sections/closing-cta'
import { RelatedLinks } from '@/components/sections/related-links'
import { JsonLd } from '@/components/seo/json-ld'
import { SignalList } from '@/components/ui/signal-list'
import { SignalDot } from '@/components/visuals/signal-dot'
import { CompletePath } from '@/components/visuals/traditional-vs-ai-flow'
import { routes } from '@/config/routes'
import {
  closing,
  hero,
  meta,
  operatingCycle,
  related,
  responsibilities,
  stages,
} from '@/content/pages/how-it-works'
import { itemListSchema, jsonLdGraph, webPageSchema } from '@/lib/seo/json-ld'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: routes.howItWorks.path,
})

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          webPageSchema({
            path: routes.howItWorks.path,
            title: meta.title,
            description: meta.description,
            hasBreadcrumb: true,
            mainEntityFragment: 'the-hendricks-sequence',
          }),
          /*
            ItemList, not HowTo: Google retired HowTo rich results, and these
            are stages Hendricks performs rather than steps the reader follows.
            Names and descriptions are the rendered strings verbatim.
          */
          itemListSchema({
            path: routes.howItWorks.path,
            name: 'The Hendricks sequence',
            items: stages.items.map((stage) => ({
              name: `${stage.name}: ${stage.question}`,
              description: `${stage.description} Output: ${stage.output}.`,
            })),
          }),
        )}
      />

      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        lead={hero.lead}
        primaryCta={hero.primaryCta}
        path={routes.howItWorks.path}
        breadcrumbs={[
          { label: routes.home.label, href: routes.home.path },
          { label: routes.howItWorks.label },
        ]}
      >
        <div className="flex flex-col gap-6">
          <ol className="flex flex-wrap gap-x-1.5 gap-y-2">
            {hero.journey.map((stage, index) => {
              const isLast = index === hero.journey.length - 1
              return (
                <li
                  key={stage}
                  className={
                    isLast
                      ? 'rounded-full border border-[var(--color-amber)] bg-[color-mix(in_srgb,var(--color-amber)_18%,transparent)] px-3 py-1.5 text-[0.8125rem] font-medium text-[var(--color-field)]'
                      : 'rounded-full border border-[color-mix(in_srgb,var(--color-field)_24%,transparent)] px-3 py-1.5 text-[0.8125rem] text-[color-mix(in_srgb,var(--color-field)_80%,transparent)]'
                  }
                >
                  {stage}
                </li>
              )
            })}
          </ol>

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

      <Section variant="field" size="major" ariaLabelledBy="stages-title">
        <Container>
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow={stages.eyebrow}
              title={stages.title}
              id="stages-title"
              maxWidth="wide"
            />

            <ol className="flex flex-col">
              {stages.items.map((stage) => (
                <li
                  key={stage.number}
                  className="grid gap-4 border-t border-[var(--color-border)] py-8 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,1.45fr)] lg:gap-12"
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[0.8125rem] text-[var(--color-blue)]">
                      {stage.number}
                    </span>
                    <span className="text-[1.0625rem] font-medium text-[var(--color-navy)]">
                      {stage.name}
                    </span>
                  </div>

                  <div className="flex flex-col gap-3">
                    <h3 className="text-h3 text-[var(--color-navy)]">{stage.question}</h3>
                    <p className="measure text-[1rem] leading-relaxed text-[var(--color-slate)]">
                      {stage.description}
                    </p>
                    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 pt-1 text-[0.9375rem]">
                      <SignalDot size={6} />
                      <span className="font-medium text-[var(--color-navy)]">
                        Output: {stage.output}
                      </span>
                      <Link
                        href={stage.solutionHref}
                        className="text-[var(--color-blue)] underline decoration-1 underline-offset-4 transition-colors hover:text-[var(--color-blue-hover)]"
                      >
                        Related solution
                      </Link>
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      <Section variant="white" size="major" ariaLabelledBy="responsibilities-title">
        <Container>
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow={responsibilities.eyebrow}
              title={responsibilities.title}
              id="responsibilities-title"
              maxWidth="wide"
            />

            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-soft)] p-6 md:p-8">
                <h3 className="text-[1.125rem] font-medium text-[var(--color-navy)]">
                  {responsibilities.agents.heading}
                </h3>
                <SignalList items={responsibilities.agents.items} />
              </div>

              <div className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-[var(--color-blue)] bg-white p-6 md:p-8">
                <h3 className="text-[1.125rem] font-medium text-[var(--color-navy)]">
                  {responsibilities.humans.heading}
                </h3>
                <SignalList items={responsibilities.humans.items} />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section variant="field" size="standard" ariaLabelledBy="operating-cycle-title">
        <Container>
          <div className="flex flex-col gap-8">
            <SectionHeading
              eyebrow={operatingCycle.eyebrow}
              title={operatingCycle.title}
              id="operating-cycle-title"
              maxWidth="wide"
            />
            <CompletePath steps={operatingCycle.steps} />
          </div>
        </Container>
      </Section>

      <RelatedLinks title="Where to go next." links={related} />

      <ClosingCta title={closing.title} primaryCta={closing.primaryCta} />
    </>
  )
}
