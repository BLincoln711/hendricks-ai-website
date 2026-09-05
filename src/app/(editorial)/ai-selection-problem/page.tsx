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
import { Station } from '@/components/sections/station'
import { JsonLd } from '@/components/seo/json-ld'
import { RuleLink } from '@/components/ui/cta'
import { NodePathDrawing } from '@/components/visuals/node-paths'
import { routes } from '@/config/routes'
import { siteConfig } from '@/config/site'
import {
  closing,
  competitorRecommendation,
  consequence,
  contents,
  hero,
  intelligenceGap,
  journeys,
  meta,
  notEnough,
  related,
  relatedSection,
  response,
  sources,
  termDefinition,
} from '@/content/pages/ai-selection-problem'
import { isDefinitionRoute } from '@/content/shared/definition-routes'
import { publicationChrome } from '@/content/shared/publication-record'
import { jsonLdGraph, webPageSchema } from '@/lib/seo/json-ld'
import { buildMetadata } from '@/lib/seo/metadata'

/**
 * /ai-selection-problem, rebuilt on the approved canvas
 * (`07-hifi/definition-page.html`, the template this route shares with the
 * definition pages) station for station.
 *
 * The journey comparison renders as two stage rails across one hairline rather
 * than as a drawing. The homepage's two-path plate carries a gloss, two markers
 * and a text alternative that this page's copy does not hold, and inventing
 * them to reuse the figure would be publishing words nobody approved. Both
 * journeys keep every step, in order, and the difference in length is the point
 * the section is making.
 */

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: routes.aiSelectionProblem.path,
  maxImagePreview: true,
})

const relatedTerms = related.filter((entry) => isDefinitionRoute(entry.href))
const relatedWork = related.filter((entry) => !isDefinitionRoute(entry.href))

export default function AiSelectionProblemPage() {
  return (
    <div className="wrap">
      <JsonLd
        data={jsonLdGraph(
          webPageSchema({
            path: routes.aiSelectionProblem.path,
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
        path={routes.aiSelectionProblem.path}
        breadcrumbs={[
          { label: routes.home.label, href: routes.home.path },
          { label: routes.aiSelectionProblem.label },
        ]}
        primaryCta={hero.primaryCta}
      >
        <Byline
          authorTitle={`${siteConfig.founderRole}, ${siteConfig.name}`}
          reviewed={sources.reviewed}
        />

        <Answer
          id="term-definition"
          className="answer-lead mt-[26px]"
          label={termDefinition.term}
          labelId="term-definition-label"
          paragraphs={[termDefinition.answer]}
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
          {/* 01. Journey comparison */}
          <Station id="journeys" ariaLabelledBy="journeys-title" stack>
            <p className="text-eyebrow text-ink-2">{journeys.eyebrow}</p>
            <h2 id="journeys-title" className="text-h2 text-ink">
              {journeys.title}
            </h2>

            <div className="cols2">
              {[journeys.traditional, journeys.aiMediated].map((lane) => (
                <div key={lane.label}>
                  <p className="text-coordinate text-ink-2">{lane.label}</p>
                  <ol className="pathrail mt-4" aria-label={lane.label}>
                    {lane.steps.map((step, index) => (
                      <li key={step}>
                        <span className="st" aria-hidden="true">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </Station>

          {/* 02. The business consequence */}
          <Station id="consequence" ariaLabelledBy="consequence-title" stack>
            <p className="text-eyebrow text-ink-2">{consequence.eyebrow}</p>
            <h2 id="consequence-title" className="text-h2 text-ink">
              {consequence.title}
            </h2>

            <RuleList items={consequence.assets} ariaLabel={consequence.title} />

            <div className="prose">
              {consequence.closing.map((line) => (
                <p key={line} className="text-lead text-ink-3">
                  {line}
                </p>
              ))}
            </div>
          </Station>

          {/* 03. Visibility is not enough */}
          <Station id="not-enough" ariaLabelledBy="not-enough-title" stack>
            <p className="text-eyebrow text-ink-2">{notEnough.eyebrow}</p>
            <h2 id="not-enough-title" className="text-h2 text-ink">
              {notEnough.title}
            </h2>

            <RuleList items={notEnough.ladder} ariaLabel={notEnough.title} />

            <p className="text-coordinate text-ink-2">{notEnough.pathLead}</p>
            <figure className="fig mt-0">
              <NodePathDrawing nodes={notEnough.path} />
              <ol className="sr-only" aria-label={notEnough.pathLead}>
                {notEnough.path.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <figcaption className="text-caption text-ink-2">
                {notEnough.path.join(', ')}.
              </figcaption>
            </figure>
          </Station>

          {/* 04. One observation, not a ranking */}
          <Station id="competitor" ariaLabelledBy="competitor-title" stack>
            <p className="text-eyebrow text-ink-2">{competitorRecommendation.eyebrow}</p>
            <h2 id="competitor-title" className="text-h2 text-ink">
              {competitorRecommendation.title}
            </h2>
            <p className="text-lead text-ink">{competitorRecommendation.lead}</p>

            <div className="prose">
              {competitorRecommendation.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {/*
              The qualification the figures above are only publishable with. A
              retrieval system lifting this section has to lift it too, so it
              sits between the figures and the argument that follows them.
            */}
            <Limitations
              label={competitorRecommendation.limitation.label}
              body={[
                competitorRecommendation.limitation.title,
                ...competitorRecommendation.limitation.body,
              ]}
            />

            <div className="prose">
              {competitorRecommendation.closing.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <RuleLink cta={competitorRecommendation.cta} />
          </Station>

          {/* 05. The intelligence gap */}
          <Station id="intelligence-gap" ariaLabelledBy="gap-title" stack>
            <p className="text-eyebrow text-ink-2">{intelligenceGap.eyebrow}</p>
            <h2 id="gap-title" className="text-h2 text-ink">
              {intelligenceGap.title}
            </h2>
            <RuleList items={intelligenceGap.questions} ariaLabel={intelligenceGap.title} />
          </Station>

          {/* 06. The Hendricks response */}
          <Station id="response" ariaLabelledBy="response-title" stack>
            <p className="text-eyebrow text-ink-2">{response.eyebrow}</p>
            <h2 id="response-title" className="text-h2 text-ink">
              {response.title}
            </h2>

            <Ledger
              ariaLabel={response.title}
              rows={response.items.map((item) => ({
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
          </Station>

          {/* 07. Sources */}
          <SourcesStation
            reviewed={sources.reviewed}
            basis={sources.basis}
            appliedIn={sources.appliedIn}
          />

          {/* 08. Change history */}
          <Station id="change-history" ariaLabelledBy="changes-title" stack>
            <p className="text-eyebrow text-ink-2">{publicationChrome.changeHistory.eyebrow}</p>
            <h2 id="changes-title" className="text-h2 text-ink">
              {publicationChrome.changeHistory.title}
            </h2>
            <ChangeHistory />
          </Station>

          {/* 09. Related terms */}
          <Station id="related-terms" ariaLabelledBy="terms-title" stack>
            <p className="text-eyebrow text-ink-2">{publicationChrome.relatedTerms.eyebrow}</p>
            <h2 id="terms-title" className="text-h2 text-ink">
              {publicationChrome.relatedTerms.title}
            </h2>
            <RelatedTerms terms={relatedTerms} />
          </Station>

          {/* 10. Where to go next */}
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
