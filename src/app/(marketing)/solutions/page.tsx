import type { Metadata } from 'next'
import Link from 'next/link'

import { Answer } from '@/components/canvas/answer'
import { Ledger } from '@/components/canvas/ledger'
import { CanvasPageHero } from '@/components/canvas/page-hero'
import { RelatedList } from '@/components/canvas/related-list'
import { ClosingStation } from '@/components/canvas/closing-station'
import { Station } from '@/components/sections/station'
import { JsonLd } from '@/components/seo/json-ld'
import { RuleLink } from '@/components/ui/cta'
import { TwoTone } from '@/components/ui/two-tone'
import { OneSystemDrawing } from '@/components/visuals/one-system-drawing'
import { routes } from '@/config/routes'
import { siteConfig } from '@/config/site'
import {
  commercialSelectionGap,
  solutionFieldLabels,
  solutionsBridge,
  solutionsHero,
  solutionsList,
  solutionsMeta,
  solutionsResearch,
  solutionsSystem,
} from '@/content/pages/solutions'
import { researchArticles } from '@/content/research'
import { jsonLdGraph, webPageSchema } from '@/lib/seo/json-ld'
import { buildMetadata } from '@/lib/seo/metadata'

/**
 * The Solutions hub, rebuilt on the approved canvas (`07-hifi/solutions.html`)
 * station for station.
 *
 * D-G: Solutions is a plain link to this hub, not a dropdown, so the hub is
 * where the four names are taught. Each solution renders as a run of hairline
 * rows stating the business question it answers, what Hendricks examines, every
 * named output it produces, and the decision it enables. Nothing the light
 * version carried was cut, and the outputs list is the complete approved one
 * rather than the first entry of it.
 */

export const metadata: Metadata = buildMetadata({
  title: solutionsMeta.title,
  description: solutionsMeta.description,
  path: routes.solutions.path,
})

const [latestStudy] = researchArticles

export default function SolutionsPage() {
  return (
    <div className="wrap">
      <JsonLd
        data={jsonLdGraph(
          webPageSchema({
            path: routes.solutions.path,
            title: solutionsMeta.title,
            description: solutionsMeta.description,
            type: 'CollectionPage',
            mainEntityFragment: 'solutions',
            hasBreadcrumb: true,
          }),
          /*
            Each entry is a self-describing Service node rather than a bare
            `@id` reference. A bare reference to a node defined on another URL
            resolves to nothing when a crawler parses this page in isolation,
            which is how answer engines read it.
          */
          {
            '@type': 'ItemList',
            '@id': `${siteConfig.url}/solutions#solutions`,
            name: solutionsList.title,
            numberOfItems: solutionsList.items.length,
            itemListElement: solutionsList.items.map((item, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'Service',
                '@id': `${new URL(item.cta.href, siteConfig.url).toString()}#service`,
                name: item.name,
                description: item.description,
                url: new URL(item.cta.href, siteConfig.url).toString(),
                provider: { '@id': `${siteConfig.url}/#organization` },
              },
            })),
          },
        )}
      />

      {/* 1. Page hero */}
      <CanvasPageHero
        eyebrow={solutionsHero.eyebrow}
        title={solutionsHero.title}
        lead={solutionsHero.lead[0]}
        path={routes.solutions.path}
        breadcrumbs={[
          { label: routes.home.label, href: routes.home.path },
          { label: routes.solutions.label },
        ]}
        primaryCta={solutionsHero.primaryCta}
        foot={
          <p className="text-caption max-w-none text-ink-2">{solutionsHero.onThisPage}</p>
        }
      >
        <Answer
          label={solutionsHero.answerLabel}
          className="mt-[34px]"
          paragraphs={[solutionsHero.lead[1]]}
          twoTone={solutionsHero.answerTwoTone}
        />
      </CanvasPageHero>

      {/* 2. One system */}
      <Station id="one-system" ariaLabelledBy="system-title">
        <p className="text-eyebrow mb-[22px] text-ink-2">{solutionsSystem.eyebrow}</p>
        <h2 id="system-title" className="text-h2 text-ink">
          {solutionsSystem.title}
        </h2>

        <figure className="plate mt-10">
          <div className="plate-head">
            <span className="plate-no">{solutionsSystem.plate.number}</span>
            <span className="plate-title">{solutionsSystem.plate.title}</span>
          </div>

          <OneSystemDrawing stages={solutionsSystem.stages} />

          <p className="sr-only">{solutionsSystem.alt}</p>
          <figcaption className="plate-cap text-caption text-ink-2">
            {solutionsSystem.caption}
          </figcaption>
        </figure>

        <Ledger
          numbered
          ariaLabel={solutionsSystem.title}
          rows={solutionsSystem.stages.map((stage) => ({
            key: stage.name,
            label: stage.name,
            value: stage.caption,
          }))}
        />

        <p className="text-caption mt-[18px] max-w-[62ch] text-ink-2">{solutionsSystem.note}</p>
      </Station>

      {/* 3. The four solutions */}
      <Station id="the-four-solutions" ariaLabelledBy="solutions-list-title">
        <p className="text-eyebrow mb-[22px] text-ink-2">{solutionsList.eyebrow}</p>
        <h2 id="solutions-list-title" className="text-h2 text-ink">
          {solutionsList.title}
        </h2>

        <ol className="entry mt-10">
          {solutionsList.items.map((solution) => (
            <li key={solution.name}>
              {/* One wrapper so the row is two grid cells: the counter the CSS
                  generates, and everything the entry says. */}
              <div>
                <h3 className="text-ink">
                  <Link href={solution.cta.href}>{solution.name}</Link>
                </h3>
                <p className="tag">{solution.title}</p>

                <dl className="pubrec">
                  <div className="pubrec-row">
                    <dt>{solutionFieldLabels.question}</dt>
                    <dd>{solution.question}</dd>
                  </div>
                  <div className="pubrec-row">
                    <dt>{solutionFieldLabels.examines}</dt>
                    <dd>{solution.description}</dd>
                  </div>
                  <div className="pubrec-row">
                    <dt>{solutionFieldLabels.outputs}</dt>
                    <dd>
                      {solution.outputs.join(', ')}
                      {/* The one term on this page that is not self-explanatory
                          is defined where it is first used, per CANON 6. */}
                      {commercialSelectionGap &&
                      solution.outputs.includes(commercialSelectionGap.name) ? (
                        <span className="defnote">
                          {commercialSelectionGap.name}: {commercialSelectionGap.definition}
                        </span>
                      ) : null}
                    </dd>
                  </div>
                  <div className="pubrec-row">
                    <dt>{solutionFieldLabels.decision}</dt>
                    <dd>{solution.decision}</dd>
                  </div>
                </dl>

                <RuleLink cta={solution.cta} />
              </div>
            </li>
          ))}
        </ol>
      </Station>

      {/* 4. Related research */}
      <Station id="related-research" ariaLabelledBy="research-title">
        <div className="split">
          <div className="words">
            <p className="text-eyebrow text-ink-2">{solutionsResearch.eyebrow}</p>
            <h2 id="research-title" className="text-h2 text-ink">
              {solutionsResearch.title}
            </h2>
            <TwoTone sentence={solutionsResearch.lead} className="text-lead" />
          </div>
          <div className="figure">
            <RelatedList
              entries={[
                {
                  href: latestStudy.path,
                  label: latestStudy.title,
                  kind: `${solutionsResearch.latestKind} ${latestStudy.dataThroughDate}`,
                  description: latestStudy.summary,
                },
                {
                  href: routes.research.path,
                  label: solutionsResearch.hubLabel,
                  description: solutionsResearch.hubDescription,
                },
              ]}
            />
          </div>
        </div>
      </Station>

      {/* 5. The close */}
      <ClosingStation
        eyebrow={solutionsBridge.eyebrow}
        title={solutionsBridge.title}
        lead={solutionsBridge.lead}
        primaryCta={solutionsBridge.primaryCta}
      />
    </div>
  )
}
