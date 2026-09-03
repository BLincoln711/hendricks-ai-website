import type { Metadata } from 'next'
import Link from 'next/link'

import { Answer } from '@/components/canvas/answer'
import { Ledger } from '@/components/canvas/ledger'
import { CanvasPageHero } from '@/components/canvas/page-hero'
import { Station } from '@/components/sections/station'
import { JsonLd } from '@/components/seo/json-ld'
import { RuleLink } from '@/components/ui/cta'
import { TwoTone } from '@/components/ui/two-tone'
import { isBuilt, routes } from '@/config/routes'
import {
  expectations,
  hero,
  meta,
  promise,
  related,
  relatedTitle,
  routing,
} from '@/content/pages/contact'
import { jsonLdGraph, webPageSchema } from '@/lib/seo/json-ld'
import { buildMetadata } from '@/lib/seo/metadata'

/**
 * /contact, rebuilt on the approved canvas (`07-hifi/contact.html`).
 *
 * The general inquiry form the design carries is not built here. It needs a
 * server action, validation, rate limiting and email delivery, which is a
 * separate piece of work (handoff PR 9 and PR 10), and D-H requires that action
 * to fail closed without its delivery key. A form that accepted a submission it
 * could not deliver would be worse than the routing this page already carries,
 * so the stations are converted and no submission endpoint is advertised.
 */

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: routes.contact.path,
})

export default function ContactPage() {
  return (
    <div className="wrap">
      <JsonLd
        data={jsonLdGraph(
          webPageSchema({
            path: routes.contact.path,
            title: meta.title,
            description: meta.description,
            type: 'ContactPage',
            hasBreadcrumb: true,
          }),
        )}
      />

      {/* 1. Page hero */}
      <CanvasPageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        lead={hero.lead[0]}
        path={routes.contact.path}
        breadcrumbs={[
          { label: routes.home.label, href: routes.home.path },
          { label: routes.contact.label },
        ]}
      />

      {/* 2. The hinge: one station, one sentence. */}
      <Station id="promise" ariaLabelledBy="promise-title" className="hinge">
        <h2 id="promise-title" className="sr-only">
          {promise.heading}
        </h2>
        <TwoTone sentence={promise.sentence} />
      </Station>

      {/* 3. Routing */}
      <Station id="routing" ariaLabelledBy="routing-title">
        <p className="text-eyebrow mb-[22px] text-ink-2">{routing.eyebrow}</p>
        <h2 id="routing-title" className="text-h2 text-ink">
          {routing.title}
        </h2>

        <p className="pull">{routing.prompt}</p>

        <div className="classrow">
          {routing.choices.map((choice, index) => (
            <div key={choice.name}>
              <span className="ix" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3>{choice.name}</h3>
              <p>{choice.description}</p>
              {choice.href && choice.linkLabel ? (
                <RuleLink cta={{ label: choice.linkLabel, href: choice.href }} />
              ) : null}
            </div>
          ))}
        </div>
      </Station>

      {/* 4. What happens next */}
      <Station id="expectations" ariaLabelledBy="expectations-title">
        <div className="split">
          <div className="words">
            <p className="text-eyebrow text-ink-2">{expectations.eyebrow}</p>
            <h2 id="expectations-title" className="text-h2 text-ink">
              {expectations.title}
            </h2>
          </div>
          <div className="figure">
            <Answer paragraphs={expectations.body} />
          </div>
        </div>
      </Station>

      {/* 5. Where to go next */}
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
    </div>
  )
}
