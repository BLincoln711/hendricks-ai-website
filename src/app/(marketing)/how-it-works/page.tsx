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

/**
 * The registry label for a solution path, so a stage link names its
 * destination instead of repeating a generic phrase. Read from the registry
 * rather than restated here because the solution names are locked strings and a
 * second copy is where drift starts. Returns `undefined` for an unregistered
 * path so the caller keeps its own fallback.
 */
function registryLabel(path: string): string | undefined {
  return Object.values(routes).find((route) => route.path === path)?.label
}

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
                      ? 'text-small flex items-center gap-1.5 rounded-[var(--chip-radius)] border border-rule-strong bg-[var(--chip-bg)] px-3 py-1.5 font-medium text-[var(--chip-fg)]'
                      : 'text-small rounded-[var(--chip-radius)] border border-[var(--chip-edge)] bg-[var(--chip-bg)] px-3 py-1.5 text-[var(--chip-fg)]'
                  }
                >
                  {/*
                    The terminal node is the commercial outcome. The stronger
                    edge alone would say so only to a reader who can separate
                    it from the hairline, so the signal dot restates the marker
                    as a shape, which survives without colour.
                  */}
                  {isLast ? <SignalDot size={6} /> : null}
                  {stage}
                </li>
              )
            })}
          </ol>

          <div className="flex flex-col gap-2">
            {hero.closing.map((paragraph) => (
              <p key={paragraph} className="text-ink">
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
                  className="flex flex-col gap-3 border-t border-rule py-8"
                >
                  {/*
                    The stage label sits inside the heading rather than in a
                    sibling column. Lifted on its own, "What are customers
                    trying to accomplish?" has no subject; "Stage 1. Demand.
                    What are customers trying to accomplish?" answers for
                    itself. Both strings are the approved ones and keep their
                    own size and color, so only their DOM position changes.

                    The two-column grid went with the label. `text-h3` clamps up
                    to 2.125rem, and a full question set in it wraps to six
                    lines inside a 0.55fr column, so the row now stacks.
                  */}
                  <h3 className="text-h3 text-ink">
                    <span className="mb-2 block text-[0.8125rem] leading-normal font-normal tracking-normal">
                      <span className="font-mono text-ink-2">{stage.number}.</span>{' '}
                      <span className="font-medium">{stage.name}.</span>
                    </span>{' '}
                    {stage.question}
                  </h3>

                  <p className="measure text-[1rem] leading-relaxed text-ink-2">
                    {stage.description}
                  </p>

                  <p className="flex flex-wrap items-center gap-x-2 gap-y-1 pt-1 text-[0.9375rem]">
                    <SignalDot size={6} />
                    <span className="font-medium text-ink">
                      Output: {stage.output}
                    </span>
                    {/*
                      Six links reading "Related solution" gave a screen-reader
                      user six identical link names for six different
                      destinations. The label is read from the route registry so
                      the locked solution names are not restated here.
                    */}
                    <Link
                      href={stage.solutionHref}
                      className="text-link underline decoration-1 underline-offset-4 transition-colors hover:text-link"
                    >
                      {registryLabel(stage.solutionHref) ?? 'Related solution'}
                    </Link>
                  </p>
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
              <div className="flex flex-col gap-4 border border-rule p-6 md:p-8">
                <h3 className="text-[1.125rem] font-medium text-ink">
                  {responsibilities.agents.heading}
                </h3>
                <SignalList items={responsibilities.agents.items} />
              </div>

              <div className="flex flex-col gap-4 border border-path p-6 md:p-8">
                <h3 className="text-[1.125rem] font-medium text-ink">
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
