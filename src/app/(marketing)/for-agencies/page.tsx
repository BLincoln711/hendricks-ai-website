import type { Metadata } from 'next'
import Link from 'next/link'

import { Answer } from '@/components/canvas/answer'
import { FaqList } from '@/components/canvas/faq-list'
import { Ledger } from '@/components/canvas/ledger'
import { MethodList } from '@/components/canvas/method-list'
import { CanvasPageHero } from '@/components/canvas/page-hero'
import { RuleList } from '@/components/canvas/rule-list'
import { AgencyPartnershipForm } from '@/components/forms/agency-partnership-form'
import { TableOfContents } from '@/components/canvas/table-of-contents'
import { Station } from '@/components/sections/station'
import { JsonLd } from '@/components/seo/json-ld'
import { CommitmentBoundaryDrawing } from '@/components/visuals/commitment-boundary-drawing'
import { isBuilt, routes } from '@/config/routes'
import {
  capabilities,
  clientConversation,
  closing,
  commitmentBoundary,
  commitments,
  contents,
  directAnswer,
  hero,
  meta,
  models,
  PARTNERSHIP_INQUIRY_ANCHOR,
  PARTNERSHIP_INQUIRY_ID,
  related,
  relatedTitle,
} from '@/content/pages/for-agencies'
import { requestTimestamp } from '@/lib/forms/request-time'
import { resolvePreferredModel } from '@/lib/forms/lead-options'
import { jsonLdGraph, webPageSchema } from '@/lib/seo/json-ld'
import { buildMetadata } from '@/lib/seo/metadata'

/**
 * /for-agencies, rebuilt on the approved canvas (`07-hifi/for-agencies.html`)
 * station for station.
 *
 * The partnership inquiry is the closing station (15 section 5). Every
 * appearance of the locked agency CTA targets it, including the four model
 * panels, which carry `?model=` so the inquiry opens with that model already
 * selected. The server reads the value, so the preselect works with JavaScript
 * disabled, and an unrecognised value selects nothing.
 *
 * The route is dynamic because it reads the query and stamps `startedAt` for
 * the timing floor.
 */

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: routes.forAgencies.path,
})

export default async function ForAgenciesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const [{ model }, startedAt] = await Promise.all([searchParams, requestTimestamp()])
  const preselectedModel = resolvePreferredModel(typeof model === 'string' ? model : undefined)

  return (
    <div className="wrap">
      <JsonLd
        data={jsonLdGraph(
          webPageSchema({
            path: routes.forAgencies.path,
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
        path={routes.forAgencies.path}
        breadcrumbs={[
          { label: routes.home.label, href: routes.home.path },
          { label: routes.forAgencies.label },
        ]}
        primaryCta={hero.primaryCta}
      >
        <ul className="plainlist mt-5" aria-label={hero.lead[0]}>
          {hero.clientQuestions.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ul>

        <p className="two-tone mt-[26px] max-w-[62ch]">
          {hero.leadTwoTone.claim} <span className="cont">{hero.leadTwoTone.continuation}</span>
        </p>
      </CanvasPageHero>

      {/* 2. Contents, the direct answer, and the commitment boundary */}
      <Station id="answer" ariaLabelledBy="direct-answer-title" className="tight">
        <div className="railcol">
          <TableOfContents items={contents} />
          <Answer
            label={directAnswer.term}
            headingId="direct-answer-title"
            headingText={directAnswer.term}
            paragraphs={[directAnswer.answer]}
          />
        </div>

        {/* The moment of scale on this page: the boundary the whole page turns
            on, drawn at the width of the container. */}
        <figure className="plate mt-12">
          <p className="text-coordinate text-ink-2">{commitmentBoundary.number}</p>

          <div className="drawing drawing-desktop">
            <CommitmentBoundaryDrawing
              canLabel={commitmentBoundary.can.label}
              cannotLabel={commitmentBoundary.cannot.label}
              readingLabel={commitmentBoundary.readingLabel}
            />
          </div>

          <div className="cols2">
            {[commitmentBoundary.can, commitmentBoundary.cannot].map((column) => (
              <div key={column.label}>
                <p className="text-coordinate text-ink-2">{column.label}</p>
                <RuleList className="mt-3" items={column.items} ariaLabel={column.label} />
              </div>
            ))}
          </div>

          <figcaption className="plate-cap text-caption text-ink-2">
            {commitmentBoundary.caption}
          </figcaption>
        </figure>
      </Station>

      {/* 3. Partnership models */}
      <Station id="models" ariaLabelledBy="models-title">
        <p className="text-eyebrow mb-[22px] text-ink-2">{models.eyebrow}</p>
        <h2 id="models-title" className="text-h2 text-ink">
          {models.title}
        </h2>

        <MethodList
          className="mt-[34px]"
          ariaLabel={models.title}
          steps={models.items.map((item) => ({
            title: item.name,
            titleId: `model-${item.value}`,
            body: [item.description, `${models.bestForLabel} ${item.bestFor}`],
            /* Four panels carry one locked label. The panel heading gives each
               its context through `aria-describedby`, so no new agency label is
               introduced and no two link names reach different destinations
               (15 section 5; 16 SM-10). */
            link: {
              label: hero.primaryCta.label,
              href: `${routes.forAgencies.path}?model=${item.value}${PARTNERSHIP_INQUIRY_ANCHOR}`,
              describedBy: `model-${item.value}`,
            },
          }))}
        />
      </Station>

      {/* 4. Capabilities */}
      <Station id="capabilities" ariaLabelledBy="capabilities-title">
        <p className="text-eyebrow mb-[22px] text-ink-2">{capabilities.eyebrow}</p>
        <h2 id="capabilities-title" className="text-h2 text-ink">
          {capabilities.title}
        </h2>

        <ol className="olist mt-[34px]" aria-label={capabilities.title}>
          {capabilities.items.map((item, index) => (
            <li key={item}>
              <span className="n" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              {item}
            </li>
          ))}
        </ol>
      </Station>

      {/* 5. Partner commitments */}
      <Station id="partner-commitments" ariaLabelledBy="commitments-title">
        <div className="split">
          <div className="words">
            <p className="text-eyebrow text-ink-2">{commitments.eyebrow}</p>
            <h2 id="commitments-title" className="text-h2 text-ink">
              {commitments.title}
            </h2>
          </div>
          <div className="figure">
            <RuleList items={commitments.items} ariaLabel={commitments.title} />
          </div>
        </div>
      </Station>

      {/* 6. The client conversation */}
      <Station id="client-conversation" ariaLabelledBy="conversation-title">
        <p className="text-eyebrow mb-[22px] text-ink-2">{clientConversation.eyebrow}</p>
        <h2 id="conversation-title" className="text-h2 text-ink">
          {clientConversation.title}
        </h2>

        <FaqList className="mt-9" items={clientConversation.items} headingLevel={2} />
      </Station>

      {/* 7. Where to go next */}
      <Station id="next" ariaLabelledBy="next-title">
        <h2 id="next-title" className="text-h2 text-ink">
          {relatedTitle}
        </h2>

        <Ledger
          ariaLabel={relatedTitle}
          rows={related
            .filter((entry) => isBuilt(entry.href))
            .map((entry) => ({
              key: entry.href,
              label: <Link href={entry.href}>{entry.label}</Link>,
              value: entry.description,
              note: entry.href,
            }))}
        />
      </Station>

      {/* 8. The agency inquiry */}
      <Station
        id={PARTNERSHIP_INQUIRY_ID}
        ariaLabelledBy="partnership-inquiry-title"
        className="closing"
      >
        <p className="text-eyebrow mb-[22px] text-ink-2">{closing.eyebrow}</p>
        <h2 id="partnership-inquiry-title" className="text-h2 text-ink">
          {closing.title}
        </h2>

        <div className="mt-[34px]">
          <AgencyPartnershipForm startedAt={startedAt} preselectedModel={preselectedModel} />
        </div>
      </Station>
    </div>
  )
}
