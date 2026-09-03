import type { Metadata } from 'next'

import { Answer } from '@/components/canvas/answer'
import { Byline } from '@/components/canvas/byline'
import { ChangeHistory } from '@/components/canvas/change-history'
import { ClosingStation } from '@/components/canvas/closing-station'
import { Ledger } from '@/components/canvas/ledger'
import { Limitations } from '@/components/canvas/limitations'
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
import { routes } from '@/config/routes'
import { siteConfig } from '@/config/site'
import {
  afterDashboard,
  buildOrBuy,
  closing,
  contents,
  directAnswer,
  gap,
  hero,
  limitation,
  meta,
  monitoringVsMeasurement,
  position,
  produces,
  related,
  relatedSection,
  sources,
} from '@/content/pages/ai-visibility-tool-or-partner'
import { isDefinitionRoute } from '@/content/shared/definition-routes'
import { publicationChrome } from '@/content/shared/publication-record'
import { jsonLdGraph, webPageSchema } from '@/lib/seo/json-ld'
import { buildMetadata } from '@/lib/seo/metadata'

/**
 * /ai-visibility-tool-or-partner, rebuilt on the approved canvas
 * (`07-hifi/definition-page.html`, the template this route shares with the
 * definition pages) station for station.
 *
 * This route defines no term and emits no `DefinedTerm` node: it settles a
 * buyer's decision rather than naming a concept, which is why its path names a
 * decision rather than a comparison.
 */

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: routes.aiVisibilityToolOrPartner.path,
})

const relatedTerms = related.filter((entry) => isDefinitionRoute(entry.href))
const relatedWork = related.filter((entry) => !isDefinitionRoute(entry.href))

export default function AiVisibilityToolOrPartnerPage() {
  return (
    <div className="wrap">
      <JsonLd
        data={jsonLdGraph(
          webPageSchema({
            path: routes.aiVisibilityToolOrPartner.path,
            title: meta.title,
            description: meta.description,
            hasBreadcrumb: true,
            dateModified: sources.reviewed,
          }),
        )}
      />

      {/* 1. Page hero */}
      <CanvasPageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        path={routes.aiVisibilityToolOrPartner.path}
        breadcrumbs={[
          { label: routes.home.label, href: routes.home.path },
          { label: routes.aiVisibilityToolOrPartner.label },
        ]}
        primaryCta={hero.primaryCta}
      >
        <Answer
          id="answer"
          className="answer-lead mt-[30px]"
          label={directAnswer.term}
          labelId="direct-answer-label"
          paragraphs={[directAnswer.answer]}
        />

        <Byline
          authorTitle={`${siteConfig.founderRole}, ${siteConfig.name}`}
          reviewed={sources.reviewed}
        />

        <div className="mt-[26px] max-w-[60ch]">
          {hero.lead.map((paragraph) => (
            <p key={paragraph} className="text-lead mt-3 text-ink">
              {paragraph}
            </p>
          ))}
        </div>
      </CanvasPageHero>

      <div className="bodywrap">
        <RailColumn sections={contents}>
          {/* 01. What a monitoring feed produces */}
          <Station id="produces" ariaLabelledBy="produces-title" stack>
            <p className="text-eyebrow text-ink-2">{produces.eyebrow}</p>
            <h2 id="produces-title" className="text-h2 text-ink">
              {produces.title}
            </h2>
            <p className="text-lead text-ink">{produces.lead}</p>

            <RuleList items={produces.items} ariaLabel={produces.title} />

            <div className="prose">
              {produces.closing.map((line) => (
                <p key={line} className="text-lead text-ink-3">
                  {line}
                </p>
              ))}
            </div>

            <RuleLink cta={produces.cta} />
          </Station>

          {/* 02. What it leaves undone */}
          <Station id="gap" ariaLabelledBy="gap-title" stack>
            <p className="text-eyebrow text-ink-2">{gap.eyebrow}</p>
            <h2 id="gap-title" className="text-h2 text-ink">
              {gap.title}
            </h2>
            <p className="text-lead text-ink">{gap.lead}</p>

            <Ledger
              ariaLabel={gap.title}
              rows={gap.items.map((item) => ({
                key: item.name,
                label: (
                  <>
                    <span className="ix" aria-hidden="true">
                      {item.number}
                    </span>
                    {item.name}
                  </>
                ),
                value: item.description,
              }))}
            />

            <p className="text-lead measure text-ink-3">{gap.closing}</p>

            <RuleLink cta={gap.cta} />
          </Station>

          {/* 03. Monitoring against measurement */}
          <Station id="monitoring" ariaLabelledBy="monitoring-title" stack>
            <p className="text-eyebrow text-ink-2">{monitoringVsMeasurement.eyebrow}</p>
            <h2 id="monitoring-title" className="text-h2 text-ink">
              {monitoringVsMeasurement.title}
            </h2>
            <p className="text-lead text-ink">{monitoringVsMeasurement.lead}</p>

            <TableRegion
              caption={monitoringVsMeasurement.caption}
              columns={monitoringVsMeasurement.columns}
              rows={monitoringVsMeasurement.rows}
            />

            <div className="prose">
              {monitoringVsMeasurement.closing.map((line) => (
                <p key={line} className="text-lead text-ink-3">
                  {line}
                </p>
              ))}
            </div>

            <div className="prose">
              {monitoringVsMeasurement.ctas.map((cta) => (
                <RuleLink key={cta.href} cta={cta} />
              ))}
            </div>
          </Station>

          {/*
            04. Build, buy or contract. The concession sits above the table
            rather than below it: it is the argument a reader arrives holding,
            and refuting it before the decision grid is what makes the grid
            readable rather than glib.
          */}
          <Station id="build-or-buy" ariaLabelledBy="build-or-buy-title" stack>
            <p className="text-eyebrow text-ink-2">{buildOrBuy.eyebrow}</p>
            <h2 id="build-or-buy-title" className="text-h2 text-ink">
              {buildOrBuy.title}
            </h2>
            <p className="text-lead text-ink">{buildOrBuy.lead}</p>

            <p className="text-lead measure text-ink-3">{buildOrBuy.concession}</p>

            <TableRegion
              caption={buildOrBuy.caption}
              columns={buildOrBuy.columns}
              rows={buildOrBuy.rows}
            />

            <div className="prose">
              {buildOrBuy.closing.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>

            <RuleLink cta={buildOrBuy.cta} />
          </Station>

          {/* 05. After the dashboard */}
          <Station id="after-dashboard" ariaLabelledBy="after-dashboard-title" stack>
            <p className="text-eyebrow text-ink-2">{afterDashboard.eyebrow}</p>
            <h2 id="after-dashboard-title" className="text-h2 text-ink">
              {afterDashboard.title}
            </h2>
            <p className="text-lead text-ink">{afterDashboard.lead}</p>

            <Ledger
              ariaLabel={afterDashboard.title}
              rows={afterDashboard.items.map((item) => ({
                key: item.name,
                label: (
                  <>
                    <span className="ix" aria-hidden="true">
                      {item.number}
                    </span>
                    {item.name}
                  </>
                ),
                value: item.description,
              }))}
            />

            <div className="prose">
              {afterDashboard.closing.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>

            <div className="prose">
              {afterDashboard.ctas.map((cta) => (
                <RuleLink key={cta.href} cta={cta} />
              ))}
            </div>
          </Station>

          {/* 06. Where Hendricks sits */}
          <Station id="position" ariaLabelledBy="position-title" stack>
            <p className="text-eyebrow text-ink-2">{position.eyebrow}</p>
            <h2 id="position-title" className="text-h2 text-ink">
              {position.title}
            </h2>

            <div className="prose">
              {position.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <RuleLink cta={position.cta} />
          </Station>

          {/*
            07. The honest limitation. On a page that tells a buyer what to
            interrogate, the page's own evidential standing is a section-level
            statement rather than an aside.
          */}
          <Station id="limitation" ariaLabelledBy="limitation-title" stack>
            <h2 id="limitation-title" className="text-h2 text-ink">
              {limitation.title}
            </h2>
            <Limitations label={limitation.label} items={limitation.body} />
          </Station>

          {/* 08. Sources */}
          <SourcesStation
            reviewed={sources.reviewed}
            basis={sources.basis}
            appliedIn={sources.appliedIn}
          />

          {/* 09. Change history */}
          <Station id="change-history" ariaLabelledBy="changes-title" stack>
            <p className="text-eyebrow text-ink-2">{publicationChrome.changeHistory.eyebrow}</p>
            <h2 id="changes-title" className="text-h2 text-ink">
              {publicationChrome.changeHistory.title}
            </h2>
            <ChangeHistory />
          </Station>

          {/* 10. Related terms */}
          <Station id="related-terms" ariaLabelledBy="terms-title" stack>
            <p className="text-eyebrow text-ink-2">{publicationChrome.relatedTerms.eyebrow}</p>
            <h2 id="terms-title" className="text-h2 text-ink">
              {publicationChrome.relatedTerms.title}
            </h2>
            <RelatedTerms terms={relatedTerms} />
          </Station>

          {/* 11. Where to go next */}
          <Station id="related" ariaLabelledBy="related-title" stack>
            <p className="text-eyebrow text-ink-2">{relatedSection.eyebrow}</p>
            <h2 id="related-title" className="text-h2 text-ink">
              {relatedSection.title}
            </h2>
            <RelatedRules entries={relatedWork} ariaLabel={relatedSection.title} />
          </Station>
        </RailColumn>
      </div>

      <ClosingStation id="close" title={closing.title} primaryCta={closing.primaryCta} />
    </div>
  )
}
