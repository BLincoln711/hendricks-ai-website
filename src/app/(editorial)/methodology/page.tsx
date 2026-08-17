import type { Metadata } from 'next'

import { Container } from '@/components/layout/container'
import { PageHero } from '@/components/layout/page-hero'
import { Section } from '@/components/layout/section'
import { SectionHeading } from '@/components/layout/section-heading'
import { ClosingCta } from '@/components/sections/closing-cta'
import { RelatedLinks } from '@/components/sections/related-links'
import { SourcesNote } from '@/components/sections/sources-note'
import { JsonLd } from '@/components/seo/json-ld'
import { Callout } from '@/components/ui/callout'
import { DataTable } from '@/components/ui/data-table'
import { FitList, SignalList } from '@/components/ui/signal-list'
import { ChipSet } from '@/components/visuals/chip-set'
import { ContextPanelDiagram } from '@/components/visuals/context-panel-diagram'
import { routes } from '@/config/routes'
import {
  classification,
  closing,
  contextPanels,
  evidenceGrades,
  hero,
  intentContext,
  limitations,
  meta,
  related,
  reproducibility,
  sources,
  statement,
  weighting,
} from '@/content/pages/methodology'
import { jsonLdGraph, webPageSchema } from '@/lib/seo/json-ld'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: routes.methodology.path,
})

export default function MethodologyPage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          webPageSchema({
            path: routes.methodology.path,
            title: meta.title,
            description: meta.description,
            hasBreadcrumb: true,
            // Emitted only because this page renders the same date visibly in
            // its SourcesNote <time>. Pages without a visible date get none.
            dateModified: sources.reviewed,
          }),
        )}
      />

      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        lead={hero.lead}
        primaryCta={hero.primaryCta}
        path={routes.methodology.path}
        breadcrumbs={[
          { label: routes.home.label, href: routes.home.path },
          { label: routes.methodology.label },
        ]}
      />

      <Section variant="white" size="major" ariaLabelledBy="intent-title">
        <Container>
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow={intentContext.eyebrow}
              title={intentContext.title}
              id="intent-title"
              level={2}
            />

            <div className="flex flex-col gap-5 rounded-[var(--radius-panel)] border border-[var(--color-border)] bg-[var(--color-field)] p-6 md:p-8">
              <ChipSet items={intentContext.formula} separator="plus" />
              <p className="border-t border-[var(--color-border)] pt-5 text-[1.125rem] font-medium text-[var(--color-navy)]">
                = {intentContext.result}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section variant="field" size="major" ariaLabelledBy="panels-title">
        <Container>
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow={contextPanels.eyebrow}
              title={contextPanels.title}
              id="panels-title"
              level={2}
            />

            <ContextPanelDiagram panels={contextPanels.panels} />

            <div className="flex flex-col gap-2 rounded-[var(--radius-card)] border border-dashed border-[var(--color-border)] p-6">
              <p className="text-eyebrow text-[var(--color-slate)]">{contextPanels.optional.label}</p>
              <h3 className="text-[1.0625rem] font-medium text-[var(--color-navy)]">
                {contextPanels.optional.name}
              </h3>
              <p className="text-[0.9375rem] leading-relaxed text-[var(--color-slate)]">
                {contextPanels.optional.description}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section variant="white" size="major" ariaLabelledBy="classification-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)] lg:gap-16">
            <div className="flex flex-col gap-5">
              <SectionHeading
                eyebrow={classification.eyebrow}
                title={classification.title}
                id="classification-title"
                level={2}
              />
              <p className="text-[0.9375rem] leading-relaxed text-[var(--color-slate)]">
                {classification.closing}
              </p>
            </div>

            <ChipSet items={classification.items} />
          </div>
        </Container>
      </Section>

      <Section variant="soft" size="major" ariaLabelledBy="weighting-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:gap-16">
            <div className="flex flex-col gap-5">
              <SectionHeading
                eyebrow={weighting.eyebrow}
                title={weighting.title}
                id="weighting-title"
                level={2}
              />
              <p className="text-[0.9375rem] leading-relaxed text-[var(--color-slate)]">
                {weighting.lead}
              </p>
              <SignalList items={weighting.factors} columns={2} />
            </div>

            <Callout variant="limitation" label="Constraint">
              <p>{weighting.limitation}</p>
            </Callout>
          </div>
        </Container>
      </Section>

      <Section variant="white" size="major" ariaLabelledBy="grades-title">
        <Container>
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow={evidenceGrades.eyebrow}
              title={evidenceGrades.title}
              id="grades-title"
              level={2}
            />
            <DataTable
              caption={evidenceGrades.caption}
              columns={evidenceGrades.columns}
              rows={evidenceGrades.rows}
            />
          </div>
        </Container>
      </Section>

      <Section variant="navy" size="major" ariaLabelledBy="statement-title">
        <Container width="narrow">
          <div className="flex flex-col gap-6">
            <h2 id="statement-title" className="text-eyebrow text-[var(--color-cyan)]">
              {statement.title}
            </h2>
            <blockquote className="border-l-2 border-[var(--color-cyan)] pl-6 md:pl-8">
              <p className="text-h3 text-[var(--color-field)]">{statement.quote}</p>
            </blockquote>
          </div>
        </Container>
      </Section>

      <Section variant="field" size="major" ariaLabelledBy="repro-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] lg:gap-16">
            <div className="flex flex-col gap-5">
              <SectionHeading
                eyebrow={reproducibility.eyebrow}
                title={reproducibility.title}
                id="repro-title"
                level={2}
              />
              <p className="text-[0.9375rem] leading-relaxed text-[var(--color-slate)]">
                {reproducibility.lead}
              </p>
            </div>

            <SignalList items={reproducibility.items} columns={2} />
          </div>
        </Container>
      </Section>

      <Section variant="white" size="major" ariaLabelledBy="limitations-title">
        <Container width="narrow">
          <div className="flex flex-col gap-8">
            <SectionHeading
              eyebrow={limitations.eyebrow}
              title={limitations.title}
              id="limitations-title"
              level={2}
            />
            <FitList items={limitations.items} tone="not-fit" />
          </div>
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
