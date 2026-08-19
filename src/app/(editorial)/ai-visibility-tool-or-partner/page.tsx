import type { Metadata } from 'next'

import { Container } from '@/components/layout/container'
import { PageHero } from '@/components/layout/page-hero'
import { Section } from '@/components/layout/section'
import { SectionHeading } from '@/components/layout/section-heading'
import { ClosingCta } from '@/components/sections/closing-cta'
import { DirectAnswer } from '@/components/sections/direct-answer'
import { RelatedLinks } from '@/components/sections/related-links'
import { SourcesNote } from '@/components/sections/sources-note'
import { JsonLd } from '@/components/seo/json-ld'
import { Callout } from '@/components/ui/callout'
import { TextCta } from '@/components/ui/cta'
import { DataTable } from '@/components/ui/data-table'
import { SignalList } from '@/components/ui/signal-list'
import { routes } from '@/config/routes'
import {
  afterDashboard,
  buildOrBuy,
  closing,
  directAnswer,
  gap,
  hero,
  limitation,
  meta,
  monitoringVsMeasurement,
  position,
  produces,
  related,
  sources,
} from '@/content/pages/ai-visibility-tool-or-partner'
import { jsonLdGraph, webPageSchema } from '@/lib/seo/json-ld'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: routes.aiVisibilityToolOrPartner.path,
})

export default function AiVisibilityToolOrPartnerPage() {
  return (
    <>
      {/*
        WebPage with a breadcrumb and a modified date, and nothing else.

        The four definition pages in this route group emit `DefinedTerm` and
        list themselves in `definedTermSetSchema` because each one defines a
        term. This page defines nothing. It answers a purchase decision, and a
        `DefinedTerm` node whose name is "Tool or partner" would state in
        structured data a claim the page does not make. `DirectAnswer` still
        takes a `term` prop, which renders as the eyebrow above the answer, and
        the presence of that prop must not pull a `DefinedTerm` node in behind
        it.

        `dateModified` is emitted only because SourcesNote renders the same
        constant in a visible <time>, which is the rule the other editorial
        routes follow.
      */}
      <JsonLd
        data={jsonLdGraph(
          webPageSchema({
            path: routes.aiVisibilityToolOrPartner.path,
            title: meta.title,
            description: meta.description,
            about: null,
            hasBreadcrumb: true,
            dateModified: sources.reviewed,
          }),
        )}
      />

      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        lead={hero.lead}
        primaryCta={hero.primaryCta}
        path={routes.aiVisibilityToolOrPartner.path}
        breadcrumbs={[
          { label: routes.home.label, href: routes.home.path },
          { label: routes.aiVisibilityToolOrPartner.label },
        ]}
      />

      <DirectAnswer term={directAnswer.term} answer={directAnswer.answer} />

      <Section variant="field" size="major" ariaLabelledBy="produces-title">
        <Container>
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow={produces.eyebrow}
              title={produces.title}
              description={produces.lead}
              id="produces-title"
              level={2}
            />

            <SignalList items={produces.items} columns={2} />

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                {produces.closing.map((line) => (
                  <p key={line} className="text-lead measure text-[var(--color-graphite)]">
                    {line}
                  </p>
                ))}
              </div>

              <TextCta cta={produces.cta} />
            </div>
          </div>
        </Container>
      </Section>

      {/*
        Numbered composition, matching the "where the framing runs out" list on
        /what-is-generative-engine-optimization. Three items rather than five, so
        the grid stays single-column: a three-item two-column grid orphans the
        last item, and each item here is a full argument rather than a label.
      */}
      <Section variant="white" size="major" ariaLabelledBy="gap-title">
        <Container>
          <div className="flex flex-col gap-12">
            <SectionHeading
              eyebrow={gap.eyebrow}
              title={gap.title}
              description={gap.lead}
              id="gap-title"
              level={2}
            />

            <ol className="flex flex-col gap-10">
              {gap.items.map((item) => (
                <li key={item.name} className="flex flex-col gap-2">
                  <span className="font-mono text-[0.75rem] text-[var(--color-blue)]">
                    {item.number}
                  </span>
                  <h3 className="text-[1.25rem] leading-snug font-medium text-[var(--color-navy)]">
                    {item.name}
                  </h3>
                  <p className="measure text-[0.9375rem] leading-relaxed text-[var(--color-slate)]">
                    {item.description}
                  </p>
                </li>
              ))}
            </ol>

            <div className="flex flex-col gap-4">
              <p className="text-lead measure text-[var(--color-graphite)]">{gap.closing}</p>

              <TextCta cta={gap.cta} />
            </div>
          </div>
        </Container>
      </Section>

      <Section variant="soft" size="major" ariaLabelledBy="monitoring-title">
        <Container>
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow={monitoringVsMeasurement.eyebrow}
              title={monitoringVsMeasurement.title}
              description={monitoringVsMeasurement.lead}
              id="monitoring-title"
              level={2}
            />

            <DataTable
              caption={monitoringVsMeasurement.caption}
              columns={monitoringVsMeasurement.columns}
              rows={monitoringVsMeasurement.rows}
            />

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                {monitoringVsMeasurement.closing.map((line) => (
                  <p key={line} className="text-lead measure text-[var(--color-graphite)]">
                    {line}
                  </p>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                {monitoringVsMeasurement.ctas.map((cta) => (
                  <TextCta key={cta.href} cta={cta} />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/*
        The concession sits above the table rather than below it. It is the
        argument a reader arrives holding, and refuting it before the decision
        grid is what makes the grid readable rather than glib.
      */}
      <Section variant="white" size="major" ariaLabelledBy="build-or-buy-title">
        <Container>
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow={buildOrBuy.eyebrow}
              title={buildOrBuy.title}
              description={buildOrBuy.lead}
              id="build-or-buy-title"
              level={2}
            />

            <p className="text-lead measure text-[var(--color-graphite)]">
              {buildOrBuy.concession}
            </p>

            <DataTable
              caption={buildOrBuy.caption}
              columns={buildOrBuy.columns}
              rows={buildOrBuy.rows}
            />

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                {buildOrBuy.closing.map((line) => (
                  <p key={line} className="measure text-[1.0625rem] leading-relaxed text-[var(--color-graphite)]">
                    {line}
                  </p>
                ))}
              </div>

              <TextCta cta={buildOrBuy.cta} />
            </div>
          </div>
        </Container>
      </Section>

      <Section variant="field" size="major" ariaLabelledBy="after-dashboard-title">
        <Container>
          <div className="flex flex-col gap-12">
            <SectionHeading
              eyebrow={afterDashboard.eyebrow}
              title={afterDashboard.title}
              description={afterDashboard.lead}
              id="after-dashboard-title"
              level={2}
            />

            <ol className="grid gap-x-10 gap-y-10 md:grid-cols-2">
              {afterDashboard.items.map((item) => (
                <li key={item.name} className="flex flex-col gap-2">
                  <span className="font-mono text-[0.75rem] text-[var(--color-blue)]">
                    {item.number}
                  </span>
                  <h3 className="text-[1.25rem] leading-snug font-medium text-[var(--color-navy)]">
                    {item.name}
                  </h3>
                  <p className="text-[0.9375rem] leading-relaxed text-[var(--color-slate)]">
                    {item.description}
                  </p>
                </li>
              ))}
            </ol>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                {afterDashboard.closing.map((line) => (
                  <p key={line} className="measure text-[1.0625rem] leading-relaxed text-[var(--color-graphite)]">
                    {line}
                  </p>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                {afterDashboard.ctas.map((cta) => (
                  <TextCta key={cta.href} cta={cta} />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section variant="white" size="standard" ariaLabelledBy="position-title">
        <Container width="narrow">
          <div className="flex flex-col gap-8">
            <SectionHeading
              eyebrow={position.eyebrow}
              title={position.title}
              id="position-title"
              level={2}
            />

            <div className="flex flex-col gap-4">
              {position.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-[1.0625rem] leading-relaxed text-[var(--color-graphite)]"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <TextCta cta={position.cta} />
          </div>
        </Container>
      </Section>

      {/*
        The limitation title is promoted to h2 and names the section, matching
        /what-is-ai-mediated-search. On a page that tells a buyer what to
        interrogate, the page's own evidential standing is a section-level
        statement rather than an aside.
      */}
      <Section variant="field" size="standard" ariaLabelledBy="limitation-title">
        <Container>
          <Callout
            variant="limitation"
            label="Honest limitation"
            title={limitation.title}
            titleId="limitation-title"
            headingLevel={2}
          >
            {limitation.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Callout>
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
