import type { Metadata } from 'next'
import Link from 'next/link'

import { Answer } from '@/components/canvas/answer'
import { Byline } from '@/components/canvas/byline'
import { ChangeHistory } from '@/components/canvas/change-history'
import { ClosingStation } from '@/components/canvas/closing-station'
import { CanvasPageHero } from '@/components/canvas/page-hero'
import { RailColumn } from '@/components/canvas/rail-column'
import { RelatedRules } from '@/components/canvas/related-list'
import { RelatedTerms } from '@/components/canvas/related-terms'
import { RuleList } from '@/components/canvas/rule-list'
import { SourcesStation } from '@/components/canvas/sources-station'
import { TableRegion } from '@/components/canvas/table-region'
import { Station } from '@/components/sections/station'
import { JsonLd } from '@/components/seo/json-ld'
import { RuleLink } from '@/components/ui/cta'
import { TwoTone } from '@/components/ui/two-tone'
import { routes } from '@/config/routes'
import { siteConfig } from '@/config/site'
import {
  closing,
  contents,
  directAnswer,
  hero,
  illustratedBy,
  meta,
  outcomes,
  path,
  related,
  relatedSection,
  sources,
  whatItIsNot,
  whyEngineering,
  whyItExists,
} from '@/content/pages/what-is-search-intelligence-engineering'
import { isDefinitionRoute } from '@/content/shared/definition-routes'
import { evidenceRule } from '@/content/shared/evidence-rule'
import { publicationChrome } from '@/content/shared/publication-record'
import {
  definedTermSchema,
  definedTermSetSchema,
  jsonLdGraph,
  personAuthor,
  webPageSchema,
} from '@/lib/seo/json-ld'
import { buildMetadata } from '@/lib/seo/metadata'

/**
 * /what-is-search-intelligence-engineering, rebuilt on the approved canvas
 * (`07-hifi/definition-page.html`, which is drawn from this route) station for
 * station.
 *
 * The definition-page shape, in order: the hero carries the term and the
 * one-sentence definition as the answer-first block, the byline resolves to the
 * one Person node (D-B), and the body sits beside a sticky table of contents.
 * The tail is what makes the page citable and is required on every interior
 * route by D-E: sources with their review date, the change history, the related
 * terms and the related work.
 */

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: routes.whatIsSearchIntelligenceEngineering.path,
  maxImagePreview: true,
})

const relatedTerms = related.filter((entry) => isDefinitionRoute(entry.href))
const relatedWork = related.filter((entry) => !isDefinitionRoute(entry.href))

export default function WhatIsSearchIntelligenceEngineeringPage() {
  return (
    <div className="wrap">
      <JsonLd
        data={jsonLdGraph(
          webPageSchema({
            path: routes.whatIsSearchIntelligenceEngineering.path,
            title: meta.title,
            description: meta.description,
            // The subject of a definition page is the term it defines, not the
            // firm. Without mainEntity the graph never says what this page is about.
            mainEntityFragment: 'term',
            about: null,
            hasBreadcrumb: true,
            // Emitted only because this page renders the same date visibly in
            // its sources station. Pages without a visible date get none.
            dateModified: sources.reviewed,
            author: personAuthor(),
          }),
          definedTermSetSchema([
            {
              name: 'Search Intelligence Engineering',
              path: routes.whatIsSearchIntelligenceEngineering.path,
            },
            { name: 'Selection Intelligence', path: routes.whatIsSelectionIntelligence.path },
          ]),
          definedTermSchema({
            path: routes.whatIsSearchIntelligenceEngineering.path,
            term: directAnswer.term,
            directAnswer: directAnswer.answer,
            sameAs: new URL(routes.researchHendricksSelectionBaseline.path, siteConfig.url).toString(),
            citation: new URL(
              routes.researchHendricksSelectionBaseline.path,
              siteConfig.url,
            ).toString(),
          }),
        )}
      />

      {/* 1. Page hero */}
      <CanvasPageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        path={routes.whatIsSearchIntelligenceEngineering.path}
        breadcrumbs={[
          { label: routes.home.label, href: routes.home.path },
          { label: routes.whatIsSearchIntelligenceEngineering.label },
        ]}
        primaryCta={hero.primaryCta}
        foot={<span className="text-caption text-ink-2">{siteConfig.categoryLine}</span>}
      >
        <Answer
          id="answer"
          className="answer-lead mt-[30px]"
          label={directAnswer.term}
          labelId="direct-answer-label"
          paragraphs={[directAnswer.answer]}
        />

        <div className="prose mt-[26px]">
          <p>{illustratedBy.body}</p>
          <RuleLink cta={illustratedBy.study} />
          <p>{illustratedBy.roleNaming.body}</p>
          <p>
            <a
              href={illustratedBy.roleNaming.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {illustratedBy.roleNaming.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </div>

        <Byline reviewed={sources.reviewed} reviewedLabel="last-reviewed" showDates={false} />

        <p className="text-lead mt-[26px] max-w-[60ch] text-ink">{hero.lead[0]}</p>
      </CanvasPageHero>

      {/* The body, beside its own contents. */}
      <div className="bodywrap">
        <RailColumn sections={contents}>
          {/* 01. Why it exists */}
          <Station id="why-it-exists" ariaLabelledBy="why-exists-title" stack>
            <p className="text-eyebrow text-ink-2">{whyItExists.eyebrow}</p>
            <h2 id="why-exists-title" className="text-h2 text-ink">
              {whyItExists.title}
            </h2>

            <TableRegion
              caption={whyItExists.caption}
              columns={whyItExists.columns}
              rows={whyItExists.rows}
            />

            <div className="prose">
              {whyItExists.closing.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </Station>

          {/* 02. Four outcomes */}
          <Station id="four-outcomes" ariaLabelledBy="outcomes-title" stack>
            <p className="text-eyebrow text-ink-2">{outcomes.eyebrow}</p>
            <h2 id="outcomes-title" className="text-h2 text-ink">
              {outcomes.title}
            </h2>

            <ol className="ledger" aria-label={outcomes.title}>
              {outcomes.items.map((item) => (
                <li key={item.name}>
                  <span className="k">
                    <span className="ix" aria-hidden="true">
                      {item.number}
                    </span>
                    {item.name}
                  </span>
                  <span className="v">{item.description}</span>
                  <span className="n">
                    <Link href={item.solution.href}>{item.solution.label}</Link>
                  </span>
                </li>
              ))}
            </ol>

            <p className="opline">{siteConfig.operatingLine}</p>
          </Station>

          {/* 03. Why engineering */}
          <Station id="why-engineering" ariaLabelledBy="why-engineering-title" stack>
            <p className="text-eyebrow text-ink-2">{whyEngineering.eyebrow}</p>
            <h2 id="why-engineering-title" className="text-h2 text-ink">
              {whyEngineering.title}
            </h2>
            <p className="text-lead text-ink">{whyEngineering.lead}</p>

            <RuleList items={whyEngineering.layers} ariaLabel={whyEngineering.lead} />
          </Station>

          {/* 04. What it is not */}
          <Station id="what-it-is-not" ariaLabelledBy="not-title" stack>
            <p className="text-eyebrow text-ink-2">{whatItIsNot.eyebrow}</p>
            <h2 id="not-title" className="text-h2 text-ink">
              {whatItIsNot.title}
            </h2>

            <ul className="plainlist" aria-label={whatItIsNot.title}>
              {whatItIsNot.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <TwoTone sentence={evidenceRule} className="pull" />
          </Station>

          {/* 05. The Demand-to-Selection path */}
          <Station id="demand-to-selection-path" ariaLabelledBy="path-title" stack>
            <p className="text-eyebrow text-ink-2">{path.eyebrow}</p>
            <h2 id="path-title" className="text-h2 text-ink">
              {path.title}
            </h2>

            <p className="fig-note">{path.note}</p>

            <ol className="pathrail" aria-label={path.title}>
              {path.steps.map((step, index) => (
                <li key={step}>
                  <span className="st" aria-hidden="true">
                    {path.stageLabel} {String(index + 1).padStart(2, '0')}
                  </span>
                  {step}
                </li>
              ))}
            </ol>

            <RuleLink cta={path.cta} />
          </Station>

          <SourcesStation
            reviewed={sources.reviewed}
            basis={sources.basis}
            appliedIn={sources.appliedIn}
          />

          {/* 07. Change history */}
          <Station id="change-history" ariaLabelledBy="changes-title" stack>
            <p className="text-eyebrow text-ink-2">{publicationChrome.changeHistory.eyebrow}</p>
            <h2 id="changes-title" className="text-h2 text-ink">
              {publicationChrome.changeHistory.title}
            </h2>
            <ChangeHistory />
          </Station>

          {/* 08. Related terms */}
          <Station id="related-terms" ariaLabelledBy="terms-title" stack>
            <p className="text-eyebrow text-ink-2">{publicationChrome.relatedTerms.eyebrow}</p>
            <h2 id="terms-title" className="text-h2 text-ink">
              {publicationChrome.relatedTerms.title}
            </h2>
            <RelatedTerms terms={relatedTerms} />
          </Station>

          {/* 09. Related solutions and methodology */}
          <Station id="related" ariaLabelledBy="related-title" stack>
            <p className="text-eyebrow text-ink-2">{relatedSection.eyebrow}</p>
            <h2 id="related-title" className="text-h2 text-ink">
              {relatedSection.title}
            </h2>

            <RelatedRules entries={relatedWork} ariaLabel={relatedSection.title} />
          </Station>
        </RailColumn>
      </div>

      {/* The close */}
      <ClosingStation
        id="close"
        eyebrow={closing.eyebrow}
        title={closing.title}
        primaryCta={closing.primaryCta}
        body={[siteConfig.categoryLine]}
      />
    </div>
  )
}
