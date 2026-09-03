import type { Metadata } from 'next'

import { Answer } from '@/components/canvas/answer'
import { ClosingStation } from '@/components/canvas/closing-station'
import { DefinitionList } from '@/components/canvas/definition-list'
import { FaqList } from '@/components/canvas/faq-list'
import { CanvasPageHero } from '@/components/canvas/page-hero'
import { RelatedList } from '@/components/canvas/related-list'
import { RuleList } from '@/components/canvas/rule-list'
import { Station } from '@/components/sections/station'
import { JsonLd } from '@/components/seo/json-ld'
import { RuleLink } from '@/components/ui/cta'
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
  relatedTitle,
  weighting,
} from '@/content/pages/search-demand-intelligence'
import { diagnosticCta } from '@/content/shared/ctas'
import { jsonLdGraph, serviceSchema, webPageSchema } from '@/lib/seo/json-ld'
import { buildMetadata } from '@/lib/seo/metadata'

/**
 * /solutions/search-demand-intelligence, rebuilt on the approved canvas
 * (`07-hifi/solution-page.html`) station for station.
 *
 * The weighting model renders as mono text on one hairline rather than in a
 * bordered methodology callout: the canvas has no box, and a formula is the one
 * place on this page where the exact characters matter, so it is selectable
 * text in the citation treatment.
 */

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: routes.searchDemandIntelligence.path,
})

export default function SearchDemandIntelligencePage() {
  return (
    <div className="wrap">
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

      {/* 1. Page hero */}
      <CanvasPageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        lead={hero.lead[0]}
        path={routes.searchDemandIntelligence.path}
        breadcrumbs={[
          { label: routes.home.label, href: routes.home.path },
          { label: routes.solutions.label, href: routes.solutions.path },
          { label: routes.searchDemandIntelligence.label },
        ]}
        primaryCta={diagnosticCta('sdi_hero')}
      >
        <Answer className="mt-9" paragraphs={[hero.lead[1]]} />
        <RuleLink cta={hero.primaryCta} className="mt-3" />
      </CanvasPageHero>

      {/* 2. The problem */}
      <Station id="problem" ariaLabelledBy="problem-title">
        <div className="split">
          <div className="words">
            <p className="text-eyebrow text-ink-2">{problem.eyebrow}</p>
            <h2 id="problem-title" className="text-h2 text-ink">
              {problem.title}
            </h2>
            {problem.statements.map((statement) => (
              <p key={statement} className="measure text-ink-3">
                {statement}
              </p>
            ))}
          </div>
          <div className="figure">
            <p className="text-coordinate text-ink-2">{problem.determinesLead}</p>
            <RuleList className="mt-3" items={problem.determines} ariaLabel={problem.determinesLead} />
          </div>
        </div>
      </Station>

      {/* 3. Inputs */}
      <Station id="inputs" ariaLabelledBy="inputs-title">
        <p className="text-eyebrow mb-[22px] text-ink-2">{inputs.eyebrow}</p>
        <h2 id="inputs-title" className="text-h2 text-ink">
          {inputs.title}
        </h2>
        <p className="text-lead mt-[22px] text-ink">{inputs.lead}</p>

        <ul className="ruled mt-6" aria-label={inputs.lead}>
          {inputs.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <p className="measure mt-6 text-ink-2">{inputs.closing}</p>
      </Station>

      {/* 4. Intent context */}
      <Station id="intent-context" ariaLabelledBy="intent-context-title">
        <p className="text-eyebrow mb-[22px] text-ink-2">{intentContext.eyebrow}</p>
        <h2 id="intent-context-title" className="text-h2 text-ink">
          {intentContext.title}
        </h2>

        <div className="cols2">
          <div>
            <p className="text-coordinate text-ink-2">{intentContext.keywordLabel}</p>
            <p className="mt-3 font-mono text-[0.9375rem] text-ink-2">{intentContext.keyword}</p>
          </div>
          <div>
            <p className="text-coordinate text-ink-2">{intentContext.contextLabel}</p>
            <p className="mt-3 text-ink-3">{intentContext.context}</p>
          </div>
        </div>

        <p className="measure mt-8 text-ink-2">{intentContext.comparison}</p>

        <div className="block">
          <p className="text-coordinate text-ink-2">{intentContext.libraryLead}</p>
          <RuleList
            className="mt-3"
            items={intentContext.libraryUses}
            ariaLabel={intentContext.libraryLead}
          />
        </div>
      </Station>

      {/* 5. What it produces */}
      <Station id="deliverables" ariaLabelledBy="deliverables-title">
        <h2 id="deliverables-title" className="text-h2 text-ink">
          {deliverables.title}
        </h2>

        <DefinitionList
          className="mt-9"
          definitions={deliverables.items.map((item) => ({
            term: item.name,
            definition: [item.description],
          }))}
        />
      </Station>

      {/* 6. The weighting model */}
      <Station id="weighting" ariaLabelledBy="weighting-title">
        <h2 id="weighting-title" className="text-h3 text-ink">
          {weighting.title}
        </h2>
        <p className="cite-str mt-5">{weighting.formula}</p>
        <p className="measure-wide mt-5 text-ink-2">{weighting.note}</p>
      </Station>

      {/* 7. Best fit */}
      <Station id="best-fit" ariaLabelledBy="best-fit-title">
        <div className="split">
          <div className="words">
            <p className="text-eyebrow text-ink-2">{bestFit.eyebrow}</p>
            <h2 id="best-fit-title" className="text-h2 text-ink">
              {bestFit.title}
            </h2>
            <p className="text-lead text-ink">{bestFit.lead}</p>
          </div>
          <div className="figure">
            <RuleList items={bestFit.items} ariaLabel={bestFit.lead} />
          </div>
        </div>
      </Station>

      {/*
        docs/14 §3 places the FAQ after the substantive sections and before
        Related, and that order is the argument: the questions settle a decision
        the page has already made rather than carrying the page's primary
        answer. No FAQPage markup is emitted here, per docs/06 §10.
      */}
      <Station id="questions" ariaLabelledBy="faq-title">
        <p className="text-eyebrow mb-[22px] text-ink-2">{faq.eyebrow}</p>
        <h2 id="faq-title" className="text-h2 text-ink">
          {faq.title}
        </h2>
        <FaqList className="mt-9" items={faq.items} />
      </Station>

      {/* 9. Related */}
      <Station id="related" ariaLabelledBy="related-title">
        <h2 id="related-title" className="text-h2 text-ink">
          {relatedTitle}
        </h2>
        <RelatedList className="mt-8" entries={related} ariaLabel={relatedTitle} />
      </Station>

      {/* 10. The close */}
      <ClosingStation
        id="closing"
        title={closing.title}
        primaryCta={diagnosticCta('sdi_closing')}
        secondaryLink={closing.primaryCta}
      />
    </div>
  )
}
