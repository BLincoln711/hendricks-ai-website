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
  absence,
  closing,
  comparison,
  diagnosis,
  directAnswer,
  hero,
  limitation,
  meta,
  related,
  sources,
  surfaces,
  upstream,
  vocabulary,
} from '@/content/pages/what-is-ai-mediated-search'
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
  path: routes.whatIsAiMediatedSearch.path,
})

export default function WhatIsAiMediatedSearchPage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          webPageSchema({
            path: routes.whatIsAiMediatedSearch.path,
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
            Each definition page lists itself in the set, which is why this one
            carries three members where the two older pages carry two. A page
            whose DefinedTerm claims membership in a vocabulary that the same
            page then describes without it contradicts itself, and this is the
            only node on the page that states what the vocabulary contains.

            /what-is-generative-engine-optimization ships in this same commit and
            belongs here too, but its term string lives in a content module this
            page does not import, so adding it is left to that page's owner
            rather than guessed at from another file.
          */
          definedTermSetSchema([
            {
              name: 'Search Intelligence Engineering',
              path: routes.whatIsSearchIntelligenceEngineering.path,
            },
            { name: 'Selection Intelligence', path: routes.whatIsSelectionIntelligence.path },
            { name: directAnswer.term, path: routes.whatIsAiMediatedSearch.path },
          ]),
          definedTermSchema({
            path: routes.whatIsAiMediatedSearch.path,
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
        path={routes.whatIsAiMediatedSearch.path}
        breadcrumbs={[
          { label: routes.home.label, href: routes.home.path },
          { label: routes.whatIsAiMediatedSearch.label },
        ]}
      />

      <DirectAnswer term={directAnswer.term} answer={directAnswer.answer} />

      <Section variant="field" size="major" ariaLabelledBy="surfaces-title">
        <Container>
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow={surfaces.eyebrow}
              title={surfaces.title}
              description={surfaces.lead}
              id="surfaces-title"
              level={2}
            />

            <div className="grid gap-8 md:grid-cols-2 md:gap-10">
              {surfaces.groups.map((group) => (
                <div key={group.name} className="flex flex-col gap-3">
                  <h3 className="text-[1.25rem] leading-snug font-medium text-ink">
                    {group.name}
                  </h3>
                  <p className="text-[0.9375rem] leading-relaxed text-ink-2">
                    {group.description}
                  </p>
                  <SignalList items={group.items} className="mt-1" />
                </div>
              ))}
            </div>

            <DataTable
              caption={surfaces.caption}
              columns={surfaces.columns}
              rows={surfaces.rows}
            />

            {/*
              The one block on the page that separates the environment from the
              engagement. Naming a public product as part of the information
              environment is a factual statement; measuring it is a capability
              claim, and the two must never blur. The table's third column says
              it per surface, this says it in one sentence, and the Callout gives
              it a panel of its own so a reader skimming the surface names cannot
              miss it.

              The heading stays an h3 under the section's h2, matching the
              approved markdown at content/pages/22-what-is-ai-mediated-search.md.
            */}
            <Callout variant="methodology" label="Observed scope" title={surfaces.observed.title}>
              {surfaces.observed.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Callout>
          </div>
        </Container>
      </Section>

      <Section variant="white" size="major" ariaLabelledBy="ranking-gap-title">
        <Container>
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow={upstream.eyebrow}
              title={upstream.title}
              description={upstream.lead}
              id="ranking-gap-title"
              level={2}
            />

            <SignalList items={upstream.items} columns={2} />

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                {upstream.closing.map((line) => (
                  <p key={line} className="text-lead measure text-ink-3">
                    {line}
                  </p>
                ))}
              </div>

              <TextCta cta={upstream.cta} />
            </div>
          </div>
        </Container>
      </Section>

      {/*
        The same question as the section above, in the words a brand-side buyer
        types. It carries the only figures on this page, and they are quoted from
        /research/hendricks-selection-baseline rather than restated in a new
        form. The body link is deliberate rather than decorative: a reader who
        wants to check a number has to be able to reach the run that produced it
        in one click, and the figures are meaningless without the denominators
        and limits that live there.
      */}
      <Section variant="soft" size="major" ariaLabelledBy="absence-title">
        <Container>
          <div className="flex flex-col gap-8">
            <SectionHeading
              eyebrow={absence.eyebrow}
              title={absence.title}
              description={absence.lead}
              id="absence-title"
              level={2}
            />

            <div className="flex flex-col gap-4">
              {absence.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-[1.0625rem] measure leading-relaxed text-ink-3"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <TextCta cta={absence.cta} />
          </div>
        </Container>
      </Section>

      {/*
        A sequence of checks and a comparison of states at once, so it renders as
        a table rather than four paragraphs. Each row states the check, what it
        settles, and why it sits at that position, which is what lets one row be
        lifted without the other three.
      */}
      <Section variant="white" size="major" ariaLabelledBy="diagnosis-title">
        <Container>
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow={diagnosis.eyebrow}
              title={diagnosis.title}
              description={diagnosis.lead}
              id="diagnosis-title"
              level={2}
            />

            <DataTable
              caption={diagnosis.caption}
              columns={diagnosis.columns}
              rows={diagnosis.rows}
            />

            <div className="flex flex-col gap-4">
              {diagnosis.closing.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-[1.0625rem] measure leading-relaxed text-ink-3"
                >
                  {paragraph}
                </p>
              ))}

              <TextCta cta={diagnosis.cta} />
            </div>
          </div>
        </Container>
      </Section>

      <Section variant="soft" size="major" ariaLabelledBy="comparison-title">
        <Container>
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow={comparison.eyebrow}
              title={comparison.title}
              description={comparison.lead}
              id="comparison-title"
              level={2}
            />

            {/*
              A real table rather than two columns of prose. Each row is a single
              dimension with both readings side by side, so one row survives being
              lifted without the rest of the page, and the house component supplies
              the caption, the focusable scroll region, and the small-screen hint
              (docs/13 §3).
            */}
            <DataTable
              caption={comparison.caption}
              columns={comparison.columns}
              rows={comparison.rows}
            />

            <p className="text-lead measure text-ink-3">{comparison.closing}</p>
          </div>
        </Container>
      </Section>

      <Section variant="white" size="major" ariaLabelledBy="vocabulary-title">
        <Container width="narrow">
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow={vocabulary.eyebrow}
              title={vocabulary.title}
              id="vocabulary-title"
              level={2}
            />

            <div className="flex flex-col gap-4">
              {vocabulary.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-[1.0625rem] leading-relaxed text-ink-3"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <TextCta cta={vocabulary.cta} />
          </div>
        </Container>
      </Section>

      {/*
        The callout title is promoted to h2 and carries the section's accessible
        name. Everything the page says about surfaces Hendricks does not control
        depends on this qualification, so it is a section-level statement rather
        than a subsection aside, and it holds its own chunk under a heading that
        states it outright.
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

      {/*
        SourcesNote carries no citation list, and correctly so: every other
        definition page states a Hendricks position and draws on nothing
        external. This page is different. It describes publicly documented
        behaviour of systems Hendricks does not control, so each of those claims
        has to be checkable, and an external claim with no citation is the one
        outcome worse than making no claim at all.

        Rendered here rather than pushed into SourcesNote so the shared component
        keeps its single shape for the pages that cite nothing. It sits directly
        after that block, on the same surface and at the same container width, so
        the two read as one band in the order the approved copy sets out. The
        treatment matches the reference list on
        /what-is-generative-engine-optimization, the other page in this set that
        cites platform documentation.
      */}
      <Section variant="soft" size="small" ariaLabelledBy="references-heading">
        <Container width="narrow">
          <div className="flex flex-col gap-4">
            <h2 id="references-heading" className="text-eyebrow text-ink-2">
              References
            </h2>

            <ul className="flex flex-col gap-3">
              {sources.citations.map((citation) => (
                <li
                  key={citation.url}
                  className="text-[0.9375rem] leading-relaxed text-ink-2"
                >
                  {citation.publisher},{' '}
                  {/*
                    Underlined rather than coloured alone, so the link is
                    distinguishable without relying on colour (WCAG 1.4.1), and
                    the new tab is announced rather than sprung (WCAG 3.2.5).
                  */}
                  <a
                    href={citation.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link underline decoration-link underline-offset-4 hover:decoration-link"
                  >
                    {citation.title}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
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
