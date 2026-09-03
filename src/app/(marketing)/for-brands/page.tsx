import type { Metadata } from 'next'
import Link from 'next/link'

import { Answer } from '@/components/canvas/answer'
import { ClosingStation } from '@/components/canvas/closing-station'
import { Ledger } from '@/components/canvas/ledger'
import { CanvasPageHero } from '@/components/canvas/page-hero'
import { RuleList } from '@/components/canvas/rule-list'
import { TableOfContents } from '@/components/canvas/table-of-contents'
import { Station } from '@/components/sections/station'
import { JsonLd } from '@/components/seo/json-ld'
import { RuleLink } from '@/components/ui/cta'
import { OperatingLayerDrawing } from '@/components/visuals/operating-layer-drawing'
import { isBuilt, routes } from '@/config/routes'
import {
  changes,
  closing,
  contents,
  engagements,
  hero,
  meta,
  notReplaced,
  related,
  relatedTitle,
  signals,
} from '@/content/pages/for-brands'
import { jsonLdGraph, webPageSchema } from '@/lib/seo/json-ld'
import { buildMetadata } from '@/lib/seo/metadata'

/**
 * /for-brands, rebuilt on the approved canvas (`07-hifi/for-brands.html`)
 * station for station.
 *
 * Eight stations: the hero, the contents-and-answer band, the signs of fit, the
 * four kinds of clarity, the four engagements, the scope boundary with its
 * operating-layer figure, where to go next, and the close. Every sentence and
 * list item the light version carried is still here; the answer-first block and
 * the page's own contents are what the conversion adds.
 */

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: routes.forBrands.path,
})

export default function ForBrandsPage() {
  return (
    <div className="wrap">
      <JsonLd
        data={jsonLdGraph(
          webPageSchema({
            path: routes.forBrands.path,
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
        lead={hero.leadTwoTone}
        path={routes.forBrands.path}
        breadcrumbs={[
          { label: routes.home.label, href: routes.home.path },
          { label: routes.forBrands.label },
        ]}
        primaryCta={hero.primaryCta}
      />

      {/* 2. Contents and the direct answer */}
      <Station id="answer" ariaLabelledBy="answer-title" className="tight">
        <div className="railcol">
          <TableOfContents items={contents} />
          <Answer
            headingId="answer-title"
            headingText={hero.answerHeading}
            paragraphs={[hero.lead[2]]}
          />
        </div>
      </Station>

      {/* 3. Signs of fit */}
      <Station id="signals" ariaLabelledBy="signals-title">
        <div className="split">
          <div className="words">
            <p className="text-eyebrow text-ink-2">{signals.eyebrow}</p>
            <h2 id="signals-title" className="text-h2 text-ink">
              {signals.title}
            </h2>
            <RuleLink cta={signals.cta} />
          </div>
          <div className="figure">
            <RuleList items={signals.items} ariaLabel={signals.title} />
          </div>
        </div>
      </Station>

      {/* 4. What changes */}
      <Station id="changes" ariaLabelledBy="changes-title">
        <p className="text-eyebrow mb-[22px] text-ink-2">{changes.eyebrow}</p>
        <h2 id="changes-title" className="text-h2 text-ink">
          {changes.title}
        </h2>

        <Ledger
          ariaLabel={changes.title}
          rows={changes.items.map((item) => ({
            key: item.name,
            label: item.name,
            value: item.description,
            note: item.artifact,
          }))}
        />
      </Station>

      {/* 5. Ways to work together */}
      <Station id="engagements" ariaLabelledBy="engagements-title">
        <p className="text-eyebrow mb-[22px] text-ink-2">{engagements.eyebrow}</p>
        <h2 id="engagements-title" className="text-h2 text-ink">
          {engagements.title}
        </h2>

        <div className="classrow">
          {engagements.items.map((engagement, index) => (
            <div key={engagement.name}>
              <span className="ix" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3>{engagement.name}</h3>
              <p>{engagement.description}</p>
              <RuleLink cta={{ label: engagement.linkLabel, href: engagement.href }} />
            </div>
          ))}
        </div>
      </Station>

      {/* 6. What Hendricks does not replace */}
      <Station id="scope" ariaLabelledBy="scope-title">
        <div className="split flip">
          <div className="figure">
            <RuleList items={notReplaced.items} ariaLabel={notReplaced.lead} />
          </div>
          <div className="words">
            <p className="text-eyebrow text-ink-2">{notReplaced.eyebrow}</p>
            <h2 id="scope-title" className="text-h2 text-ink">
              {notReplaced.title}
            </h2>
            <p className="text-lead text-ink">{notReplaced.lead}</p>
            <p className="measure text-ink-2">{notReplaced.closing}</p>
          </div>
        </div>

        {/* The moment of scale on this page: three contributors and the one
            operating layer, drawn at the width of the container. */}
        <figure className="plate mt-12">
          <p className="text-coordinate text-ink-2">{notReplaced.figure.number}</p>
          <div className="drawing">
            <OperatingLayerDrawing
              participants={notReplaced.participants}
              layerName={notReplaced.layerName}
            />
          </div>

          <Ledger
            ariaLabel={notReplaced.figure.caption}
            rows={notReplaced.participants.map((participant) => ({
              key: participant.name,
              label: participant.name,
              value: participant.role,
            }))}
          />

          <div className="layer-note">
            <h3>{notReplaced.layerName}</h3>
            <p>{notReplaced.layerDescription}</p>
          </div>

          <figcaption className="plate-cap text-caption text-ink-2">
            {notReplaced.figure.caption}
          </figcaption>
        </figure>
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
              note: entry.kind,
            }))}
        />
      </Station>

      {/* 8. The close */}
      <ClosingStation
        id="close"
        title={closing.title}
        primaryCta={closing.primaryCta}
      />
    </div>
  )
}
