import type { Metadata } from 'next'

import { Answer } from '@/components/canvas/answer'
import { Byline } from '@/components/canvas/byline'
import { ClosingStation } from '@/components/canvas/closing-station'
import { DefinitionList } from '@/components/canvas/definition-list'
import { Ledger } from '@/components/canvas/ledger'
import { Limitations } from '@/components/canvas/limitations'
import { CanvasPageHero } from '@/components/canvas/page-hero'
import { RelatedList } from '@/components/canvas/related-list'
import { RuleList } from '@/components/canvas/rule-list'
import { TableOfContents } from '@/components/canvas/table-of-contents'
import { TableRegion } from '@/components/canvas/table-region'
import { Station } from '@/components/sections/station'
import { JsonLd } from '@/components/seo/json-ld'
import { RuleLink } from '@/components/ui/cta'
import { TwoTone } from '@/components/ui/two-tone'
import { EvidenceClasses } from '@/components/visuals/evidence-classes'
import { routes } from '@/config/routes'
import { evidence } from '@/content/pages/home'
import {
  classification,
  closing,
  contents,
  contextPanels,
  evidenceClasses,
  evidenceGrades,
  hero,
  intentContext,
  limitations,
  meta,
  metrics,
  publishedSelfRun,
  related,
  relatedSection,
  reproducibility,
  sources,
  statement,
  weighting,
} from '@/content/pages/methodology'
import { evidenceRule } from '@/content/shared/evidence-rule'
import { observedSystemsSentence } from '@/content/shared/observed-systems'
import { publicationChrome } from '@/content/shared/publication-record'
import { jsonLdGraph, personAuthor, webPageSchema } from '@/lib/seo/json-ld'
import { buildMetadata } from '@/lib/seo/metadata'
import { formatLongDate } from '@/lib/utils/format-date'

/**
 * /methodology, rebuilt on the approved canvas (`07-hifi/methodology.html`)
 * station for station.
 *
 * Two things this page is held to. The limitations list renders in full and in
 * the first paint, because two of its items, that citation does not prove
 * influence and that correlation does not prove causation, are the load-bearing
 * honesty claims for the whole site. And the evidence-class legend renders here
 * as well as on the homepage, from the same content object, because this is the
 * page every solution page links to for the standard those marks encode.
 *
 * Deferred, and recorded: the design's Plate 01 impact chain and the table
 * beneath it. Both would publish an illustrative three-link chain and its
 * grades, and no approved content module holds those rows. It lands when the
 * chain is approved rather than being invented to fill a figure slot.
 */

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: routes.methodology.path,
})

export default function MethodologyPage() {
  return (
    <div className="wrap">
      <JsonLd
        data={jsonLdGraph(
          webPageSchema({
            path: routes.methodology.path,
            title: meta.title,
            description: meta.description,
            hasBreadcrumb: true,
            // Emitted only because this page renders the same date visibly in
            // its related-research station. Pages without a visible date get none.
            dateModified: sources.reviewed,
            author: personAuthor(),
          }),
        )}
      />

      {/* 1. Page hero */}
      <CanvasPageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        lead={hero.lead[0]}
        path={routes.methodology.path}
        breadcrumbs={[
          { label: routes.home.label, href: routes.home.path },
          { label: routes.methodology.label },
        ]}
        primaryCta={hero.primaryCta}
      >
        <Answer className="mt-8" label={hero.answerLabel} twoTone={hero.answerTwoTone} />
        <Byline reviewed={sources.reviewed} reviewedLabel="last-reviewed" showDates={false} />
      </CanvasPageHero>

      {/* 2. Contents */}
      <Station id="contents" ariaLabelledBy="contents-title" className="tight">
        <div className="max-w-[520px]">
          <TableOfContents items={contents} heading="Contents" headingId="contents-title" />
        </div>
      </Station>

      {/* 3. Intent context */}
      <Station id="intent-context" ariaLabelledBy="intent-title">
        <p className="text-eyebrow mb-[22px] text-ink-2">{intentContext.eyebrow}</p>
        <h2 id="intent-title" className="text-h2 text-ink">
          {intentContext.title}
        </h2>

        <figure className="fig">
          <ol className="formula" aria-label={intentContext.title}>
            {intentContext.formula.map((term) => (
              <li key={term}>{term}</li>
            ))}
            <li className="res">{intentContext.result}</li>
          </ol>
          <figcaption className="text-caption text-ink-2">{intentContext.caption}</figcaption>
        </figure>

        <p className="measure-wide mt-9 text-ink-2">{intentContext.gloss}</p>
      </Station>

      {/* 4. Context panels */}
      <Station id="context-panels" ariaLabelledBy="panels-title">
        <p className="text-eyebrow mb-[22px] text-ink-2">{contextPanels.eyebrow}</p>
        <h2 id="panels-title" className="text-h2 text-ink">
          {contextPanels.title}
        </h2>

        <Ledger
          numbered
          ariaLabel={contextPanels.ariaLabel}
          fieldLabels={{ note: contextPanels.questionLabel }}
          rows={[
            ...contextPanels.panels.map((panel) => ({
              key: panel.name,
              label: panel.name,
              value: panel.description,
              note: panel.question,
            })),
            {
              key: contextPanels.optional.name,
              label: contextPanels.optional.name,
              value: contextPanels.optional.description,
              note: contextPanels.optional.label,
            },
          ]}
        />

        <p className="text-caption mt-[18px] max-w-[74ch] text-ink-2">
          {observedSystemsSentence}
        </p>
      </Station>

      {/* 5. Outcome classification */}
      <Station id="outcome-classification" ariaLabelledBy="classification-title">
        <p className="text-eyebrow mb-[22px] text-ink-2">{classification.eyebrow}</p>
        <h2 id="classification-title" className="text-h2 text-ink">
          {classification.title}
        </h2>

        <ul className="terms" aria-label={classification.title}>
          {classification.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <p className="measure-wide mt-8 text-ink-2">{classification.closing}</p>
      </Station>

      {/* 6. Weighting */}
      <Station id="weighting" ariaLabelledBy="weighting-title">
        <div className="split">
          <div className="words">
            <p className="text-eyebrow text-ink-2">{weighting.eyebrow}</p>
            <h2 id="weighting-title" className="text-h2 text-ink">
              {weighting.title}
            </h2>
            <p className="text-lead text-ink">{weighting.lead}</p>
          </div>
          <div className="figure">
            <ul className="terms" aria-label={weighting.lead}>
              {weighting.factors.map((factor) => (
                <li key={factor}>{factor}</li>
              ))}
            </ul>
          </div>
        </div>

        <TwoTone sentence={weighting.limitationTwoTone} className="pull" />
      </Station>

      {/* 7. Evidence classes */}
      <Station id="evidence-classes" ariaLabelledBy="evidence-classes-title">
        <p className="text-eyebrow mb-[22px] text-ink-2">{evidenceClasses.eyebrow}</p>
        <h2 id="evidence-classes-title" className="text-h2 text-ink">
          {evidenceClasses.title}
        </h2>

        <EvidenceClasses classes={evidence.classes} ariaLabel={evidenceClasses.title} />
        <p className="sr-only">{evidence.alt}</p>

        <TwoTone sentence={evidence.pull} className="pull" />
      </Station>

      {/* 8. Evidence grades */}
      <Station id="evidence-grades" ariaLabelledBy="grades-title">
        <p className="text-eyebrow mb-[22px] text-ink-2">{evidenceGrades.eyebrow}</p>
        <h2 id="grades-title" className="text-h2 text-ink">
          {evidenceGrades.title}
        </h2>

        <TableRegion
          caption={evidenceGrades.caption}
          columns={evidenceGrades.columns}
          rows={evidenceGrades.rows}
        />
      </Station>

      {/* 9. Metric definitions */}
      <Station id="metrics" ariaLabelledBy="metrics-title">
        <p className="text-eyebrow mb-[22px] text-ink-2">{metrics.eyebrow}</p>
        <h2 id="metrics-title" className="text-h2 text-ink">
          {metrics.title}
        </h2>

        <DefinitionList
          className="mt-9"
          definitions={metrics.items.map((metric) => ({
            term: metric.name,
            definition: [metric.definition],
          }))}
        />
      </Station>

      {/* 10. Methodology statement */}
      <Station id="statement" ariaLabelledBy="statement-title">
        <h2 id="statement-title" className="text-h2 text-ink">
          {statement.title}
        </h2>
        <Answer className="mt-8" paragraphs={[statement.quote]} />
        <TwoTone sentence={evidenceRule} className="pull" />
      </Station>

      {/* 11. Reproducibility requirements */}
      <Station id="reproducibility" ariaLabelledBy="repro-title">
        <p className="text-eyebrow mb-[22px] text-ink-2">{reproducibility.eyebrow}</p>
        <h2 id="repro-title" className="text-h2 text-ink">
          {reproducibility.title}
        </h2>
        <p className="text-lead mt-[26px] text-ink">{reproducibility.lead}</p>

        <RuleList className="mt-6" items={reproducibility.items} ariaLabel={reproducibility.lead} />

        <p className="measure-wide mt-8 text-ink-2">{publishedSelfRun.body}</p>
        <RuleLink cta={publishedSelfRun.cta} />
      </Station>

      {/* 12. Limitations */}
      <Station id="limitations" ariaLabelledBy="limitations-title">
        <p className="text-eyebrow mb-[22px] text-ink-2">{limitations.eyebrow}</p>
        <h2 id="limitations-title" className="text-h2 text-ink">
          {limitations.title}
        </h2>
        <Limitations className="mt-9" items={limitations.items} />
      </Station>

      {/* 13. Related research */}
      <Station id="related-research" ariaLabelledBy="related-title">
        <div className="split">
          <div className="words">
            <h2 id="related-title" className="text-h2 text-ink">
              {relatedSection.title}
            </h2>
            <p className="text-caption max-w-[46ch] text-ink-2">
              {publicationChrome.sources.reviewedLabel}{' '}
              <time dateTime={sources.reviewed}>{formatLongDate(sources.reviewed)}</time>.{' '}
              {sources.basis} {publicationChrome.sources.appliedInLead}{' '}
              {sources.appliedIn.map((item, index) => (
                <span key={item.href}>
                  {index > 0 ? (index === sources.appliedIn.length - 1 ? ' and ' : ', ') : ''}
                  <a href={item.href}>{item.label}</a>
                </span>
              ))}
              .
            </p>
          </div>
          <div className="figure">
            <RelatedList entries={related} ariaLabel={relatedSection.title} />
          </div>
        </div>
      </Station>

      {/* 14. The close */}
      <ClosingStation id="closing" title={closing.title} primaryCta={closing.primaryCta} />
    </div>
  )
}
