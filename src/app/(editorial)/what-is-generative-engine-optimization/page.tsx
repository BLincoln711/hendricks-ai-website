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
import { DataTable } from '@/components/ui/data-table'
import { SignalList } from '@/components/ui/signal-list'
import { routes } from '@/config/routes'
import {
  closing,
  directAnswer,
  hero,
  inPractice,
  limitation,
  meta,
  observed,
  related,
  runsOut,
  sameAsSeo,
  sources,
  versusSie,
} from '@/content/pages/what-is-generative-engine-optimization'
import {
  definedTermSchema,
  definedTermSetSchema,
  jsonLdGraph,
  webPageSchema,
} from '@/lib/seo/json-ld'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: routes.whatIsGenerativeEngineOptimization.path,
})

export default function WhatIsGenerativeEngineOptimizationPage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          webPageSchema({
            path: routes.whatIsGenerativeEngineOptimization.path,
            title: meta.title,
            description: meta.description,
            // The subject of a definition page is the term it defines, not the
            // firm. Without mainEntity the graph never says what this page is about.
            mainEntityFragment: 'term',
            about: null,
            hasBreadcrumb: true,
            // Emitted only because this page renders the same date visibly in
            // its SourcesNote <time>. Pages without a visible date get none.
            dateModified: sources.reviewed,
          }),
          /*
            The set carries this page's term alongside the two category terms.

            `definedTermSchema` hard-codes `inDefinedTermSet` at the site
            vocabulary node, so a set emitted here that omitted the term would
            leave the page's own graph contradicting itself: a DefinedTerm
            claiming membership in a set, listed on the same page, that does not
            contain it.

            Membership records that this site defines the term. It does not say
            Hendricks sells the practice, and nothing else in the graph does
            either: there is no Service node on this page, and the visible copy
            states the boundary outright. The equivalent assertion already ships
            site-wide, since `organizationSchema.knowsAbout` names both
            generative engine optimization and answer engine optimization.
          */
          definedTermSetSchema([
            {
              name: 'Search Intelligence Engineering',
              path: routes.whatIsSearchIntelligenceEngineering.path,
            },
            { name: 'Selection Intelligence', path: routes.whatIsSelectionIntelligence.path },
            {
              name: directAnswer.term,
              path: routes.whatIsGenerativeEngineOptimization.path,
            },
          ]),
          definedTermSchema({
            path: routes.whatIsGenerativeEngineOptimization.path,
            term: directAnswer.term,
            directAnswer: directAnswer.answer,
          }),
        )}
      />

      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        lead={hero.lead}
        primaryCta={hero.primaryCta}
        path={routes.whatIsGenerativeEngineOptimization.path}
        breadcrumbs={[
          { label: routes.home.label, href: routes.home.path },
          { label: routes.whatIsGenerativeEngineOptimization.label },
        ]}
      />

      <DirectAnswer term={directAnswer.term} answer={directAnswer.answer} />

      <Section variant="field" size="major" ariaLabelledBy="practice-title">
        <Container>
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow={inPractice.eyebrow}
              title={inPractice.title}
              description={inPractice.lead}
              id="practice-title"
              level={2}
            />

            <SignalList items={inPractice.items} columns={2} />

            <p className="text-lead measure text-[var(--color-graphite)]">{inPractice.closing}</p>
          </div>
        </Container>
      </Section>

      {/*
        Narrow container rather than the two-column grid used elsewhere. This
        section is the answer to the question buyers ask most often, and its
        four paragraphs have to be readable as continuous argument, so the
        measure matters more than the composition.
      */}
      <Section variant="white" size="major" ariaLabelledBy="seo-title">
        <Container width="narrow">
          <div className="flex flex-col gap-8">
            <SectionHeading
              eyebrow={sameAsSeo.eyebrow}
              title={sameAsSeo.title}
              id="seo-title"
              level={2}
            />

            <div className="flex flex-col gap-4">
              {sameAsSeo.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-[1.0625rem] leading-relaxed text-[var(--color-graphite)]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/*
        Same numbered composition as the outcomes list on
        /what-is-search-intelligence-engineering, minus the per-item link. Each
        item is a named structural limit rather than a route into a solution, so
        an item-level CTA would push the reader out of an argument that has to be
        read whole.
      */}
      <Section variant="soft" size="major" ariaLabelledBy="runs-out-title">
        <Container>
          <div className="flex flex-col gap-12">
            <SectionHeading
              eyebrow={runsOut.eyebrow}
              title={runsOut.title}
              description={runsOut.lead}
              id="runs-out-title"
              level={2}
            />

            <ol className="grid gap-x-10 gap-y-10 md:grid-cols-2">
              {runsOut.items.map((item) => (
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
          </div>
        </Container>
      </Section>

      {/*
        Scope block. It is short and it is the most consequential section on the
        page, so it gets its own band rather than being folded into the
        comparison, where a reader scanning the table would pass it.
      */}
      <Section variant="white" size="standard" ariaLabelledBy="observed-title">
        <Container width="narrow">
          <div className="flex flex-col gap-8">
            <SectionHeading
              eyebrow={observed.eyebrow}
              title={observed.title}
              id="observed-title"
              level={2}
            />

            <div className="flex flex-col gap-4">
              {observed.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-[1.0625rem] leading-relaxed text-[var(--color-graphite)]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section variant="field" size="major" ariaLabelledBy="comparison-title">
        <Container>
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow={versusSie.eyebrow}
              title={versusSie.title}
              id="comparison-title"
              level={2}
            />

            <DataTable
              caption={versusSie.caption}
              columns={versusSie.columns}
              rows={versusSie.rows}
            />

            <div className="flex flex-col gap-2">
              {versusSie.closing.map((line) => (
                <p key={line} className="text-lead measure text-[var(--color-graphite)]">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/*
        The callout title is promoted to h2 and carries the section's accessible
        name. This is the concession the argument depends on, so it is a
        section-level statement rather than a subsection aside.
      */}
      <Section variant="white" size="standard" ariaLabelledBy="limitation-title">
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

      {/*
        The reference list is rendered here, and not inside SourcesNote, because
        SourcesNote is shared with the definition pages that state a Hendricks
        position and cite nothing. This page is different: it describes the
        documented behaviour of platforms Hendricks does not control, so every
        such claim has to be checkable.

        It sits directly after SourcesNote so the block reads in the order the
        approved copy promises. `sources.basis` ends "listed below", and the two
        share a surface and a container width so they read as one band.
      */}
      <Section variant="soft" size="small" ariaLabelledBy="references-heading">
        <Container width="narrow">
          <div className="flex flex-col gap-4">
            <h2 id="references-heading" className="text-eyebrow text-[var(--color-slate)]">
              References
            </h2>

            <ul className="flex flex-col gap-3">
              {sources.references.map((reference) => (
                <li
                  key={reference.href}
                  className="text-[0.9375rem] leading-relaxed text-[var(--color-slate)]"
                >
                  <a
                    href={reference.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-blue)] underline decoration-[color-mix(in_srgb,var(--color-blue)_40%,transparent)] underline-offset-4 hover:decoration-[var(--color-blue)]"
                  >
                    {reference.title}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                  . {reference.publisher}.
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <ClosingCta title={closing.title} primaryCta={closing.primaryCta} />
    </>
  )
}
