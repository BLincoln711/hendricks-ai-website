import type { Metadata } from 'next'

import { Answer } from '@/components/canvas/answer'
import { ClosingStation } from '@/components/canvas/closing-station'
import { FaqList } from '@/components/canvas/faq-list'
import { Limitations } from '@/components/canvas/limitations'
import { CanvasPageHero } from '@/components/canvas/page-hero'
import { RelatedList } from '@/components/canvas/related-list'
import { RuleList } from '@/components/canvas/rule-list'
import { TableRegion } from '@/components/canvas/table-region'
import { Station } from '@/components/sections/station'
import { JsonLd } from '@/components/seo/json-ld'
import { RuleLink } from '@/components/ui/cta'
import { routes } from '@/config/routes'
import {
  closing,
  deliverables,
  evidenceGrades,
  faq,
  hero,
  impactContract,
  levels,
  limitation,
  meta,
  related,
  relatedTitle,
} from '@/content/pages/search-impact-measurement'
import { diagnosticCta } from '@/content/shared/ctas'
import { jsonLdGraph, serviceSchema, webPageSchema } from '@/lib/seo/json-ld'
import { buildMetadata } from '@/lib/seo/metadata'

/**
 * /solutions/search-impact-measurement, rebuilt on the approved canvas
 * (`07-hifi/solution-page.html`) station for station.
 *
 * The four levels render as the numbered method list, each carrying its own
 * question and the signals it reads. The evidence grades stay a real table
 * inside a named, keyboard reachable scroll region, because a grade and the
 * standard it requires are a two-column record and reading one without the
 * other is what the table exists to prevent.
 */

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: routes.searchImpactMeasurement.path,
})

export default function SearchImpactMeasurementPage() {
  return (
    <div className="wrap">
      <JsonLd
        data={jsonLdGraph(
          webPageSchema({
            path: routes.searchImpactMeasurement.path,
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
            path: routes.searchImpactMeasurement.path,
            name: routes.searchImpactMeasurement.label,
            description: hero.lead.join(' '),
          }),
        )}
      />

      {/* 1. Page hero */}
      <CanvasPageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        lead={hero.lead[0]}
        path={routes.searchImpactMeasurement.path}
        breadcrumbs={[
          { label: routes.home.label, href: routes.home.path },
          { label: routes.solutions.label, href: routes.solutions.path },
          { label: routes.searchImpactMeasurement.label },
        ]}
        primaryCta={diagnosticCta('sim_hero')}
      >
        <Answer className="mt-9" paragraphs={hero.lead.slice(1)} />
        <RuleLink cta={hero.primaryCta} className="mt-3" />
      </CanvasPageHero>

      {/* 2. Four levels of measurement */}
      <Station id="levels" ariaLabelledBy="levels-title">
        <p className="text-eyebrow mb-[22px] text-ink-2">{levels.eyebrow}</p>
        <h2 id="levels-title" className="text-h2 text-ink">
          {levels.title}
        </h2>

        <ol className="method mt-9" aria-label={levels.title}>
          {levels.items.map((level) => (
            <li key={level.name} data-marker={level.number}>
              <div>
                <h3>{level.name}</h3>
                <p>{level.question}</p>
                <RuleList className="mt-4" items={level.signals} ariaLabel={level.name} />
              </div>
            </li>
          ))}
        </ol>
      </Station>

      {/* 3. Evidence grades */}
      <Station id="evidence-grades" ariaLabelledBy="evidence-grades-title">
        <div className="split">
          <div className="words">
            <p className="text-eyebrow text-ink-2">{evidenceGrades.eyebrow}</p>
            <h2 id="evidence-grades-title" className="text-h2 text-ink">
              {evidenceGrades.title}
            </h2>
          </div>
          <div className="figure">
            <TableRegion
              caption={evidenceGrades.caption}
              columns={[
                { key: 'grade', header: 'Grade', rowHeader: true },
                { key: 'standard', header: 'Standard' },
              ]}
              rows={evidenceGrades.rows}
            />
          </div>
        </div>
      </Station>

      {/* 4. What it produces */}
      <Station id="deliverables" ariaLabelledBy="deliverables-title">
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
      </Station>

      {/* 5. The impact contract */}
      <Station id="impact-contract" ariaLabelledBy="impact-contract-title">
        <div className="split">
          <div className="words">
            <p className="text-eyebrow text-ink-2">{impactContract.eyebrow}</p>
            <h2 id="impact-contract-title" className="text-h2 text-ink">
              {impactContract.title}
            </h2>
            <p className="text-lead text-ink">{impactContract.lead}</p>
          </div>
          <div className="figure">
            <RuleList items={impactContract.items} ariaLabel={impactContract.lead} />
          </div>
        </div>
      </Station>

      {/* 6. What Hendricks does not promise */}
      <Station id="limitation" ariaLabelledBy="limitation-title">
        <h2 id="limitation-title" className="text-h2 text-ink">
          {limitation.title}
        </h2>
        <Limitations className="mt-7" label={limitation.label} items={limitation.body} />
        <p className="measure-wide mt-7 text-ink">{limitation.closing}</p>
      </Station>

      {/*
        docs/14 §3 places the FAQ directly after the limitation statement and
        before Related, and that order is the argument: the questions settle a
        decision the page has already made rather than carrying the page's
        primary answer. No FAQPage markup is emitted here, per docs/06 §10.
      */}
      <Station id="measurement-questions" ariaLabelledBy="faq-title">
        <p className="text-eyebrow mb-[22px] text-ink-2">{faq.eyebrow}</p>
        <h2 id="faq-title" className="text-h2 text-ink">
          {faq.title}
        </h2>
        <FaqList className="mt-9" items={faq.items} />
      </Station>

      {/* 8. Related */}
      <Station id="related" ariaLabelledBy="related-title">
        <h2 id="related-title" className="text-h2 text-ink">
          {relatedTitle}
        </h2>
        <RelatedList className="mt-8" entries={related} ariaLabel={relatedTitle} />
      </Station>

      {/* 9. The close */}
      <ClosingStation
        id="closing"
        title={closing.title}
        primaryCta={diagnosticCta('sim_closing')}
        secondaryLink={closing.primaryCta}
      />
    </div>
  )
}
