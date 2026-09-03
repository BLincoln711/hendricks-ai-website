import type { Metadata } from 'next'

import { Answer } from '@/components/canvas/answer'
import { ClosingStation } from '@/components/canvas/closing-station'
import { CanvasPageHero } from '@/components/canvas/page-hero'
import { RelatedList } from '@/components/canvas/related-list'
import { RuleList } from '@/components/canvas/rule-list'
import { Limitations } from '@/components/canvas/limitations'
import { Station } from '@/components/sections/station'
import { JsonLd } from '@/components/seo/json-ld'
import { RuleLink } from '@/components/ui/cta'
import { routes } from '@/config/routes'
import {
  closing,
  deliverables,
  hero,
  layers,
  ledger,
  meta,
  related,
  relatedTitle,
  scope,
  trust,
} from '@/content/pages/search-presence-engineering'
import { diagnosticCta } from '@/content/shared/ctas'
import { jsonLdGraph, serviceSchema, webPageSchema } from '@/lib/seo/json-ld'
import { buildMetadata } from '@/lib/seo/metadata'

/**
 * /solutions/search-presence-engineering, rebuilt on the approved canvas
 * (`07-hifi/solution-page.html`) station for station.
 *
 * The seven engineering layers render as the numbered method list, with each
 * layer's work items as a rule list under it, so a reader can see both what the
 * layer is for and what the work actually is. The control boundary keeps the
 * limitation treatment: one dashed hairline, no warning box.
 */

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: routes.searchPresenceEngineering.path,
})

export default function SearchPresenceEngineeringPage() {
  return (
    <div className="wrap">
      <JsonLd
        data={jsonLdGraph(
          webPageSchema({
            path: routes.searchPresenceEngineering.path,
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
            path: routes.searchPresenceEngineering.path,
            name: routes.searchPresenceEngineering.label,
            description: hero.lead.join(' '),
          }),
        )}
      />

      {/* 1. Page hero */}
      <CanvasPageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        lead={hero.lead[0]}
        path={routes.searchPresenceEngineering.path}
        breadcrumbs={[
          { label: routes.home.label, href: routes.home.path },
          { label: routes.solutions.label, href: routes.solutions.path },
          { label: routes.searchPresenceEngineering.label },
        ]}
        primaryCta={diagnosticCta('spe_hero')}
      >
        <Answer className="mt-9" paragraphs={hero.lead.slice(1)} />
        <RuleLink cta={hero.primaryCta} className="mt-3" />
      </CanvasPageHero>

      {/* 2. Seven engineering layers */}
      <Station id="layers" ariaLabelledBy="layers-title">
        <p className="text-eyebrow mb-[22px] text-ink-2">{layers.eyebrow}</p>
        <h2 id="layers-title" className="text-h2 text-ink">
          {layers.title}
        </h2>

        <ol className="method mt-9" aria-label={layers.title}>
          {layers.items.map((layer) => (
            <li key={layer.number} data-marker={layer.number}>
              <div>
                {/* Layer 06 has no name in the approved markdown; the heading
                    is omitted rather than invented. */}
                {layer.title ? <h3>{layer.title}</h3> : null}
                <p>{layer.description}</p>
                {/* The approved lead-in above each list, which also names the
                    list for assistive technology so the name is the words on
                    the page rather than a second reading of the heading. */}
                <p id={`layer-${layer.number}-work`} className="mt-4 text-ink-2">
                  {layers.workLeadIn}
                </p>
                <RuleList
                  className="mt-2"
                  items={layer.workItems}
                  ariaLabelledBy={`layer-${layer.number}-work`}
                />
              </div>
            </li>
          ))}
        </ol>
      </Station>

      {/* 3. Scope */}
      <Station id="scope" ariaLabelledBy="scope-title">
        <h2 id="scope-title" className="text-h3 text-ink">
          {scope.title}
        </h2>
        {scope.body.map((paragraph) => (
          <p key={paragraph} className="measure-wide mt-4 text-ink-2">
            {paragraph}
          </p>
        ))}
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

      {/* 5. The Intervention Ledger */}
      <Station id="intervention-ledger" ariaLabelledBy="ledger-title">
        <div className="split">
          <div className="words">
            <p className="text-eyebrow text-ink-2">{ledger.eyebrow}</p>
            <h2 id="ledger-title" className="text-h2 text-ink">
              {ledger.title}
            </h2>
            <p className="text-lead text-ink">{ledger.lead}</p>
            <p className="text-caption text-ink-2">{ledger.caption}</p>
          </div>
          <div className="figure">
            <RuleList items={ledger.fields} ariaLabel={ledger.lead} />
          </div>
        </div>
      </Station>

      {/* 6. What Hendricks can and cannot control */}
      <Station id="control-boundary" ariaLabelledBy="trust-title">
        <h2 id="trust-title" className="text-h2 text-ink">
          {trust.title}
        </h2>
        <Limitations className="mt-7" label={trust.label} body={trust.body} />
      </Station>

      {/* 7. Related */}
      <Station id="related" ariaLabelledBy="related-title">
        <h2 id="related-title" className="text-h2 text-ink">
          {relatedTitle}
        </h2>
        <RelatedList className="mt-8" entries={related} ariaLabel={relatedTitle} />
      </Station>

      {/* 8. The close */}
      <ClosingStation
        id="closing"
        title={closing.title}
        primaryCta={closing.secondaryCta}
        secondaryLink={closing.primaryCta}
      />
    </div>
  )
}
