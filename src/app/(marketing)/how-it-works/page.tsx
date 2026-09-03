import type { Metadata } from 'next'
import Link from 'next/link'

import { Answer } from '@/components/canvas/answer'
import { ClosingStation } from '@/components/canvas/closing-station'
import { MethodList } from '@/components/canvas/method-list'
import { CanvasPageHero } from '@/components/canvas/page-hero'
import { RelatedList } from '@/components/canvas/related-list'
import { Station } from '@/components/sections/station'
import { JsonLd } from '@/components/seo/json-ld'
import { NodePathDrawing, OperatingCycleDrawing } from '@/components/visuals/node-paths'
import { routes } from '@/config/routes'
import {
  closing,
  hero,
  meta,
  operatingCycle,
  related,
  relatedSection,
  responsibilities,
  stages,
} from '@/content/pages/how-it-works'
import { jsonLdGraph, webPageSchema } from '@/lib/seo/json-ld'
import { buildMetadata } from '@/lib/seo/metadata'

/**
 * /how-it-works, rebuilt on the approved canvas (`07-hifi/how-it-works.html`)
 * station for station.
 *
 * One order change is recorded in the design and reproduced here: the ten-node
 * plate moved out of the hero into its own station immediately after it,
 * because an interior route opens with words and no instrument. Nothing else
 * moved and nothing was cut.
 */

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: routes.howItWorks.path,
})

export default function HowItWorksPage() {
  return (
    <div className="wrap">
      <JsonLd
        data={jsonLdGraph(
          webPageSchema({
            path: routes.howItWorks.path,
            title: meta.title,
            description: meta.description,
            hasBreadcrumb: true,
          }),
        )}
      />

      {/* 1. Page hero */}
      <CanvasPageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        lead={hero.lead[0]}
        path={routes.howItWorks.path}
        breadcrumbs={[
          { label: routes.home.label, href: routes.home.path },
          { label: routes.howItWorks.label },
        ]}
        primaryCta={hero.primaryCta}
      >
        <Answer
          label={hero.answerLabel}
          className="mt-[34px]"
          paragraphs={[hero.closing[0]]}
          twoTone={hero.answerTwoTone}
        />
      </CanvasPageHero>

      {/* 2. The journey */}
      <Station id="the-journey" ariaLabel={hero.plate.title} className="tight">
        <figure className="plate">
          <div className="plate-head">
            <span className="plate-no">{hero.plate.number}</span>
            <span className="plate-title">{hero.plate.title}</span>
          </div>

          <NodePathDrawing nodes={hero.journey} />

          <ol className="sr-only" aria-label={hero.plate.listLabel}>
            {hero.journey.map((node) => (
              <li key={node}>{node}</li>
            ))}
          </ol>

          <figcaption className="plate-cap text-caption text-ink-2">
            {hero.plate.caption}
          </figcaption>
        </figure>
      </Station>

      {/* 3. Six stages */}
      <Station id="six-stages" ariaLabelledBy="stages-title">
        <p className="text-eyebrow mb-[22px] text-ink-2">{stages.eyebrow}</p>
        <h2 id="stages-title" className="text-h2 text-ink">
          {stages.title}
        </h2>

        <MethodList
          className="mt-9"
          ariaLabel={stages.title}
          steps={stages.items.map((stage) => ({
            marker: stage.number,
            title: stage.name,
            body: [stage.question, stage.description],
            output: stage.output,
            link: {
              label: solutionLabel(stage.solutionHref),
              href: stage.solutionHref,
            },
          }))}
        />
      </Station>

      {/* 4. Human and agent responsibilities */}
      <Station id="responsibilities" ariaLabelledBy="responsibilities-title">
        <p className="text-eyebrow mb-[22px] text-ink-2">{responsibilities.eyebrow}</p>
        <h2 id="responsibilities-title" className="text-h2 text-ink">
          {responsibilities.title}
        </h2>

        <div className="cols2">
          {[responsibilities.agents, responsibilities.humans].map((column) => (
            <div key={column.heading}>
              <h3 className="text-h3 text-ink">{column.heading}</h3>
              <ul className="ruled mt-5" aria-label={column.heading}>
                {column.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Station>

      {/* 5. The operating cycle */}
      <Station id="operating-cycle" ariaLabelledBy="cycle-title">
        <p className="text-eyebrow mb-[22px] text-ink-2">{operatingCycle.eyebrow}</p>
        <h2 id="cycle-title" className="text-h2 text-ink">
          {operatingCycle.title}
        </h2>

        <figure className="fig">
          <OperatingCycleDrawing steps={operatingCycle.steps} />

          <ol className="sr-only" aria-label={operatingCycle.listLabel}>
            {operatingCycle.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>

          <figcaption className="text-caption text-ink-2">{operatingCycle.caption}</figcaption>
        </figure>
      </Station>

      {/* 6. Related */}
      <Station id="related" ariaLabelledBy="related-title">
        <div className="split">
          <div className="words">
            <h2 id="related-title" className="text-h2 text-ink">
              {relatedSection.title}
            </h2>
            <p className="measure-wide text-ink-2">
              {relatedSection.body.before}
              <Link href={routes.methodology.path}>{routes.methodology.label}</Link>
              {relatedSection.body.between}
              <Link href={routes.research.path}>{routes.research.label}</Link>
              {relatedSection.body.after}
            </p>
          </div>
          <div className="figure">
            <RelatedList entries={related} ariaLabel={relatedSection.title} />
          </div>
        </div>
      </Station>

      {/* 7. The close */}
      <ClosingStation id="close" title={closing.title} primaryCta={closing.primaryCta} />
    </div>
  )
}

/**
 * The label for a stage's solution link, resolved from the route registry so
 * the four solution names are never retyped on this page.
 */
function solutionLabel(href: string): string {
  const route = Object.values(routes).find((entry) => entry.path === href)
  return route ? route.label : href
}
