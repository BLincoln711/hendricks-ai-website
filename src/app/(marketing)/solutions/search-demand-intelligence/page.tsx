import type { Metadata } from 'next'

import { Container } from '@/components/layout/container'
import { PageHero } from '@/components/layout/page-hero'
import { Section } from '@/components/layout/section'
import { SectionHeading } from '@/components/layout/section-heading'
import { ClosingCta } from '@/components/sections/closing-cta'
import { Deliverables } from '@/components/sections/deliverables'
import { FaqSection } from '@/components/sections/faq-section'
import { RelatedLinks } from '@/components/sections/related-links'
import { JsonLd } from '@/components/seo/json-ld'
import { Callout } from '@/components/ui/callout'
import { SignalList } from '@/components/ui/signal-list'
import { SolutionMotif } from '@/components/visuals/solution-motif'
import { routes } from '@/config/routes'
import {
  bestFit,
  closing,
  deliverables,
  faq,
  hero,
  inputs,
  intentContext,
  meta,
  problem,
  related,
  weighting,
} from '@/content/pages/search-demand-intelligence'
import { jsonLdGraph, serviceSchema, webPageSchema } from '@/lib/seo/json-ld'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: routes.searchDemandIntelligence.path,
})

export default function SearchDemandIntelligencePage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          webPageSchema({
            path: routes.searchDemandIntelligence.path,
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
            path: routes.searchDemandIntelligence.path,
            name: routes.searchDemandIntelligence.label,
            description: hero.lead.join(' '),
          }),
        )}
      />

      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        lead={hero.lead}
        primaryCta={hero.primaryCta}
        path={routes.searchDemandIntelligence.path}
        breadcrumbs={[
          { label: routes.home.label, href: routes.home.path },
          { label: routes.solutions.label, href: routes.solutions.path },
          { label: routes.searchDemandIntelligence.label },
        ]}
        visual={
          <div className=" border border-rule-2 p-8">
            <SolutionMotif motif="demand" />
          </div>
        }
      />

      <Section variant="field" size="major" ariaLabelledBy="problem-title">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
            <div className="flex flex-col gap-6">
              <SectionHeading eyebrow={problem.eyebrow} title={problem.title} id="problem-title" />
              <div className="flex flex-col gap-2">
                {problem.statements.map((statement) => (
                  <p key={statement} className="text-[1.0625rem] text-ink-3">
                    {statement}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 border border-rule p-6 md:p-8">
              <h3 className="text-[1.0625rem] font-medium text-ink">
                {problem.determinesLead}
              </h3>
              <SignalList items={problem.determines} />
            </div>
          </div>
        </Container>
      </Section>

      <Section variant="white" size="major" ariaLabelledBy="inputs-title">
        <Container>
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow={inputs.eyebrow}
              title={inputs.title}
              description={inputs.lead}
              id="inputs-title"
              maxWidth="wide"
            />

            <ul className="flex flex-wrap gap-2">
              {inputs.items.map((item) => (
                <li
                  key={item}
                  className="rounded-[var(--radius-control)] border border-rule px-3 py-1.5 text-[0.875rem] text-ink-3"
                >
                  {item}
                </li>
              ))}
            </ul>

            <p className="measure text-[1.0625rem] leading-relaxed text-ink-3">
              {inputs.closing}
            </p>
          </div>
        </Container>
      </Section>

      <Section variant="soft" size="major" ariaLabelledBy="intent-context-title">
        <Container>
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow={intentContext.eyebrow}
              title={intentContext.title}
              id="intent-context-title"
              maxWidth="wide"
            />

            <div className="grid gap-5 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
              <div className="flex flex-col gap-3 border border-rule p-6">
                <h3 className="text-eyebrow text-ink-2">
                  {intentContext.keywordLabel}
                </h3>
                <p className="font-mono text-[0.9375rem] text-ink-2">
                  {intentContext.keyword}
                </p>
              </div>

              <div className="flex flex-col gap-3 border-l-2 border-path p-6">
                <h3 className="text-eyebrow text-ink-2">
                  {intentContext.contextLabel}
                </h3>
                <p className="text-[1.0625rem] leading-relaxed text-ink-3">
                  {intentContext.context}
                </p>
              </div>
            </div>

            <p className="measure text-[1.0625rem] leading-relaxed text-ink-3">
              {intentContext.comparison}
            </p>

            <div className="flex flex-col gap-4 border-t border-rule pt-8">
              <h3 className="text-[1.0625rem] font-medium text-ink">
                {intentContext.libraryLead}
              </h3>
              <SignalList items={intentContext.libraryUses} columns={2} />
            </div>
          </div>
        </Container>
      </Section>

      <Deliverables title={deliverables.title} detailed={deliverables.items} />

      <Section variant="white" size="standard">
        <Container width="narrow">
          <Callout variant="methodology" title={weighting.title}>
            <p className="rounded-[var(--radius-control)] p-4 font-mono text-[0.875rem] leading-relaxed text-ink">
              {weighting.formula}
            </p>
            <p>{weighting.note}</p>
          </Callout>
        </Container>
      </Section>

      <Section variant="field" size="major" ariaLabelledBy="best-fit-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
            <SectionHeading
              eyebrow={bestFit.eyebrow}
              title={bestFit.title}
              description={bestFit.lead}
              id="best-fit-title"
            />
            <SignalList items={bestFit.items} />
          </div>
        </Container>
      </Section>

      {/*
        docs/14 §3 places the FAQ after the substantive sections and before
        Related, and that order is the argument: the questions settle a
        decision the page has already made rather than carrying the page's
        primary answer, so lifting the block higher would displace it.
        FaqSection supplies its own Section, surface, and aria-labelledby,
        the same way RelatedLinks and ClosingCta below it do. Its default
        white surface separates the field band above from the soft Related
        band below. No FAQPage markup is emitted here, per docs/06 §10.
      */}
      <FaqSection eyebrow={faq.eyebrow} title={faq.title} items={faq.items} />

      <RelatedLinks title="Related solutions and research." links={related} />

      <ClosingCta title={closing.title} primaryCta={closing.primaryCta} />
    </>
  )
}
