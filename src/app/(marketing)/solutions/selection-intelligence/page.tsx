import type { Metadata } from 'next'

import { Answer } from '@/components/canvas/answer'
import { ClosingStation } from '@/components/canvas/closing-station'
import { DefinitionList } from '@/components/canvas/definition-list'
import { FaqList } from '@/components/canvas/faq-list'
import { Ledger } from '@/components/canvas/ledger'
import { MethodList } from '@/components/canvas/method-list'
import { CanvasPageHero } from '@/components/canvas/page-hero'
import { RelatedList } from '@/components/canvas/related-list'
import { Station } from '@/components/sections/station'
import { JsonLd } from '@/components/seo/json-ld'
import { RuleLink } from '@/components/ui/cta'
import { TwoTone } from '@/components/ui/two-tone'
import { IllustrativeLegend } from '@/components/visuals/illustrative-legend'
import { NodePathDrawing } from '@/components/visuals/node-paths'
import { RESTING, SelectionMapFrame } from '@/components/visuals/selection-map-frame'
import { routes } from '@/config/routes'
import { selectionMapData } from '@/content/instruments/selection-map-data'
import {
  closing,
  contextPanel,
  deliverables,
  faq,
  firstStage,
  hero,
  limitation,
  measures,
  meta,
  metrics,
  related,
  relatedTitle,
} from '@/content/pages/selection-intelligence'
import { diagnosticCta } from '@/content/shared/ctas'
import {
  observedSystemsExclusion,
  observedSystemsSentence,
} from '@/content/shared/observed-systems'
import { jsonLdGraph, serviceSchema, webPageSchema } from '@/lib/seo/json-ld'
import { buildMetadata } from '@/lib/seo/metadata'

/**
 * /solutions/selection-intelligence, rebuilt on the approved canvas
 * (`07-hifi/solution-page.html`, which is drawn from this route) station for
 * station.
 *
 * Plate 01 is the Selection Map, rendered from `SelectionMapFrame` at its
 * resting state. The homepage wraps the same frame in a client island so a
 * visitor can change scenarios; here the figure is static, so this route ships
 * the whole instrument, its state list, its sources ledger and its list view as
 * server-rendered HTML and loads no JavaScript for it.
 */

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: routes.selectionIntelligence.path,
})

export default function SelectionIntelligencePage() {
  return (
    <div className="wrap">
      <JsonLd
        data={jsonLdGraph(
          webPageSchema({
            path: routes.selectionIntelligence.path,
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
            path: routes.selectionIntelligence.path,
            name: routes.selectionIntelligence.label,
            description: hero.lead.join(' '),
          }),
        )}
      />

      {/* 1. Page hero */}
      <CanvasPageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        lead={hero.lead[0]}
        path={routes.selectionIntelligence.path}
        breadcrumbs={[
          { label: routes.home.label, href: routes.home.path },
          { label: routes.solutions.label, href: routes.solutions.path },
          { label: routes.selectionIntelligence.label },
        ]}
        primaryCta={diagnosticCta('selection_intelligence_hero')}
        foot={<p className="text-caption max-w-none text-ink-2">{observedSystemsSentence}</p>}
      >
        <Answer className="mt-9" label={hero.movesBeyondLabel}>
          <p className="qline">{hero.movesBeyond}</p>
          <p className="text-coordinate mt-[18px] block text-ink-2">{hero.andAnswersLabel}</p>
          <TwoTone sentence={hero.andAnswersTwoTone} className="qline" />
        </Answer>

        {/* The page's own approved CTA label, as a tertiary link beside the
            locked button rather than as a second button (register R4). */}
        <RuleLink cta={hero.primaryCta} className="mt-3" />
      </CanvasPageHero>

      {/* 2. Beyond visibility */}
      <Station id="beyond-visibility" ariaLabelledBy="first-stage-title">
        <div className="split">
          <div className="words">
            <p className="text-eyebrow text-ink-2">{firstStage.eyebrow}</p>
            <h2 id="first-stage-title" className="text-h2 text-ink">
              {firstStage.title}
            </h2>
            <p className="text-lead text-ink">{firstStage.lead}</p>
          </div>
          <div className="figure">
            <ul className="ruled" aria-label={firstStage.statesLabel}>
              {firstStage.states.map((state) => (
                <li key={state}>{state}</li>
              ))}
            </ul>
          </div>
        </div>

        <TwoTone sentence={firstStage.closingTwoTone} className="pull" />
      </Station>

      {/* 3. The context panel */}
      <Station id="context-panel" ariaLabelledBy="context-panel-title">
        <p className="text-eyebrow mb-[22px] text-ink-2">{contextPanel.eyebrow}</p>
        <h2 id="context-panel-title" className="text-h2 text-ink">
          {contextPanel.title}
        </h2>

        <Ledger
          numbered
          ariaLabel={contextPanel.ariaLabel}
          fieldLabels={{ note: contextPanel.questionLabel }}
          rows={contextPanel.panels.map((panel) => ({
            key: panel.name,
            label: panel.name,
            value: panel.description,
            note: panel.question,
          }))}
        />

        <p className="text-caption mt-[18px] max-w-[74ch] text-ink-2">
          {observedSystemsSentence} {observedSystemsExclusion}
        </p>
      </Station>

      {/* 4. What Hendricks measures */}
      <Station id="what-hendricks-measures" ariaLabelledBy="measures-title">
        <p className="text-eyebrow mb-[22px] text-ink-2">{measures.eyebrow}</p>
        <h2 id="measures-title" className="text-h2 text-ink">
          {measures.title}
        </h2>

        <MethodList
          className="mt-9"
          ariaLabel={measures.title}
          steps={measures.items.map((item) => ({
            title: item.name,
            body: [item.description],
          }))}
        />
      </Station>

      {/* 5. Baseline outputs, and the instrument */}
      <Station id="baseline-outputs" ariaLabelledBy="deliverables-title">
        <h2 id="deliverables-title" className="text-h2 text-ink">
          {deliverables.title}
        </h2>

        <ol className="olist mt-8 max-w-[1000px]" aria-label={deliverables.title}>
          {deliverables.items.map((item, index) => (
            <li key={item}>
              <span className="n" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              {item}
            </li>
          ))}
        </ol>

        <div className="mt-14">
          <SelectionMapFrame data={selectionMapData} state={RESTING} id="plate-01" />
          <IllustrativeLegend />
        </div>
      </Station>

      {/* 6. Metric definitions */}
      <Station id="metric-definitions" ariaLabelledBy="metrics-title">
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

      {/* 7. The honest limitation */}
      <Station id="limitation" ariaLabelledBy="limitation-title">
        <div className="split">
          <div className="words">
            <h2 id="limitation-title" className="text-h2 text-ink">
              {limitation.title}
            </h2>
            {limitation.body.map((paragraph) => (
              <p key={paragraph} className="measure text-ink-2">
                {paragraph}
              </p>
            ))}
            <p className="text-ink">{limitation.observeLead}</p>
            <p className="measure text-ink-2">{limitation.closing}</p>
          </div>
          <div className="figure">
            <figure className="fig mt-0">
              <NodePathDrawing nodes={limitation.chain} />
              <ol className="sr-only" aria-label={limitation.chainListLabel}>
                {limitation.chain.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <figcaption className="text-caption text-ink-2">
                {limitation.chainCaption}
              </figcaption>
            </figure>
          </div>
        </div>
      </Station>

      {/*
        docs/14 §3 places the FAQ directly after the limitation statement and
        before Related, and that order is the argument: the questions settle a
        decision the page has already made rather than carrying the page's
        primary answer, so lifting the block higher would displace it. No
        FAQPage markup is emitted here, per docs/06 §10.
      */}
      <Station id="common-questions" ariaLabelledBy="faq-title">
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
        primaryCta={diagnosticCta('selection_intelligence_closing')}
        secondaryLink={closing.primaryCta}
      />
    </div>
  )
}
