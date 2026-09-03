import type { Metadata } from 'next'

import { Container } from '@/components/layout/container'
import { PageHero } from '@/components/layout/page-hero'
import { Section } from '@/components/layout/section'
import { SectionHeading } from '@/components/layout/section-heading'
import { FitTool } from '@/components/diagnostic/fit-tool'
import { DiagnosticApplicationForm } from '@/components/forms/diagnostic-application-form'
import { Deliverables } from '@/components/sections/deliverables'
import { RelatedLinks } from '@/components/sections/related-links'
import { JsonLd } from '@/components/seo/json-ld'
import { FitList, SignalList } from '@/components/ui/signal-list'
import { SignalDot } from '@/components/visuals/signal-dot'
import {
  DIAGNOSTIC_APPLY_ANCHOR,
  DIAGNOSTIC_APPLY_ID,
  DIAGNOSTIC_FIT_ID,
} from '@/config/navigation'
import { routes } from '@/config/routes'
import { fitTool } from '@/content/forms/fit-tool'
import {
  closing,
  deliverables,
  fit,
  hero,
  investment,
  meta,
  phases,
  questions,
  related,
  scope,
} from '@/content/pages/diagnostic'
import { requestTimestamp } from '@/lib/forms/request-time'
import { itemListSchema, jsonLdGraph, webPageSchema } from '@/lib/seo/json-ld'
import { buildMetadata } from '@/lib/seo/metadata'

/**
 * /diagnostic.
 *
 * The last two sections are the fit check and the application, in that order
 * (15 section 2). Where to go next moves above them so the page ends on the two
 * things a decided visitor came for.
 *
 * The fit check is advisory and never a gate: the application below it is not
 * disabled, hidden or reordered by any reading, and both approved lists stay on
 * the page whether or not anyone answers a question (D-E).
 *
 * The route is dynamic because it stamps `startedAt` for the timing floor.
 */

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: routes.diagnostic.path,
})

export default async function DiagnosticPage() {
  const startedAt = await requestTimestamp()

  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          webPageSchema({
            path: routes.diagnostic.path,
            title: meta.title,
            description: meta.description,
            hasBreadcrumb: true,
            mainEntityFragment: 'diagnostic-phases',
          }),
          /*
            The five phases render as a visible ordered list with a named
            output per phase. ItemList reproduces that exactly.
          */
          itemListSchema({
            path: routes.diagnostic.path,
            name: 'Diagnostic phases',
            items: phases.items.map((phase) => ({
              name: phase.name,
              description: `${phase.description} Output: ${phase.output}.`,
            })),
          }),
        )}
      />

      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        lead={hero.lead}
        primaryCta={hero.primaryCta}
        path={routes.diagnostic.path}
        breadcrumbs={[
          { label: routes.home.label, href: routes.home.path },
          { label: routes.diagnostic.label },
        ]}
      />

      <Section variant="field" size="major" ariaLabelledBy="questions-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <SectionHeading
              eyebrow={questions.eyebrow}
              title={questions.title}
              id="questions-title"
            />
            <SignalList items={questions.items} columns={2} />
          </div>
        </Container>
      </Section>

      <Section variant="white" size="major" ariaLabelledBy="scope-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
            <div className="flex flex-col gap-6">
              <SectionHeading
                eyebrow={scope.eyebrow}
                title={scope.title}
                description={scope.lead}
                id="scope-title"
              />
              <p className="text-[0.9375rem] leading-relaxed text-ink-2">
                {scope.closing}
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <SignalList items={scope.items} />
              <p className=" border border-rule p-5 text-[0.9375rem] leading-relaxed text-ink-3">
                {scope.timing}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section variant="soft" size="major" ariaLabelledBy="phases-title">
        <Container>
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow={phases.eyebrow}
              title={phases.title}
              id="phases-title"
              maxWidth="wide"
            />

            <ol className="flex flex-col">
              {phases.items.map((phase) => (
                <li
                  key={phase.number}
                  className="grid gap-4 border-t border-rule py-8 lg:grid-cols-[minmax(0,0.5fr)_minmax(0,1.5fr)] lg:gap-12"
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[0.8125rem] text-ink-2">
                      {phase.number}
                    </span>
                    <h3 className="text-[1.25rem] leading-snug font-medium text-ink">
                      {phase.name}
                    </h3>
                  </div>

                  <div className="flex flex-col gap-3">
                    <p className="measure text-[1rem] leading-relaxed text-ink-2">
                      {phase.description}
                    </p>
                    <p className="flex items-center gap-2 text-[0.9375rem] font-medium text-ink">
                      <SignalDot size={6} />
                      Output: {phase.output}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      <Deliverables title={deliverables.title} items={deliverables.items} />

      <Section variant="white" size="major" ariaLabelledBy="investment-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
            <SectionHeading
              eyebrow={investment.eyebrow}
              title={investment.title}
              description={investment.lead}
              id="investment-title"
            />
            <SignalList items={investment.items} columns={2} />
          </div>
        </Container>
      </Section>

      <RelatedLinks title="Where to go next." links={related} />

      {/*
        The header button's target on this route (14 DX-05, DX-25). The landing
        offset comes from `scroll-padding-top` on `html`, which every fragment
        jump already inherits (16 KF-07); a scroll margin here would add to it,
        not replace it.
      */}
      <Section
        variant="field"
        size="major"
        id={DIAGNOSTIC_FIT_ID}
        tabIndex={-1}
        ariaLabelledBy="fit-title"
      >
        <Container>
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow={fit.eyebrow}
              title={fitTool.heading}
              description={fitTool.listsIntro}
              id="fit-title"
              maxWidth="wide"
            />

            {/* Before the lists, so a visitor who has already decided is one
                key away from the form rather than fourteen. */}
            <p>
              <a className="link" href={DIAGNOSTIC_APPLY_ANCHOR}>
                {fitTool.skipLabel}
              </a>
            </p>

            <div className="cols2">
              <div>
                <h3 className="text-[1.0625rem] font-medium text-ink">
                  {fit.goodFit.heading}
                </h3>
                <FitList className="mt-4" items={fit.goodFit.items} tone="fit" />
              </div>

              <div>
                <h3 className="text-[1.0625rem] font-medium text-ink">
                  {fit.notFit.heading}
                </h3>
                <FitList className="mt-4" items={fit.notFit.items} tone="not-fit" />
              </div>
            </div>

            <FitTool applyHref={DIAGNOSTIC_APPLY_ANCHOR} />
          </div>
        </Container>
      </Section>

      <Section
        variant="field"
        size="major"
        id={DIAGNOSTIC_APPLY_ID}
        tabIndex={-1}
        ariaLabelledBy="apply-title"
      >
        <Container>
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow={closing.eyebrow}
              title={closing.title}
              description={closing.body[0]}
              id="apply-title"
              maxWidth="wide"
            />

            <DiagnosticApplicationForm startedAt={startedAt} />
          </div>
        </Container>
      </Section>
    </>
  )
}
