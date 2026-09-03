import type { Metadata } from 'next'

import { CanvasPageHero } from '@/components/canvas/page-hero'
import { InlineText } from '@/components/legal/inline-text'
import { Station } from '@/components/sections/station'
import { routes } from '@/config/routes'
import { appeal, hero, meta } from '@/content/legal/privacy-request'
import { requestTimestamp } from '@/lib/forms/request-time'
import { buildMetadata } from '@/lib/seo/metadata'

import { PrivacyRequestForm } from './privacy-request-form'

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: routes.privacyRequest.path,
  // A transactional form with no informational value in search results, and one
  // that should not compete with the Privacy Notice for the same queries.
  index: false,
})

/**
 * /privacy-request, on the approved canvas.
 *
 * The form is the page, so it takes the station under the hero and nothing
 * competes with it. Its controls are the canvas form primitives, which is the
 * one place in the system where a fill, a radius and a 1 px boundary are legal.
 */
export default async function PrivacyRequestPage() {
  const startedAt = await requestTimestamp()

  return (
    <div className="wrap">
      <CanvasPageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        path={routes.privacyRequest.path}
        /* Two levels, like every other route. A Privacy Notice crumb would put
           a second link named "Privacy Notice" on a page whose form already
           carries one, and two links with one name is what SM-10 forbids. */
        breadcrumbs={[
          { label: routes.home.label, href: routes.home.path },
          { label: routes.privacyRequest.label },
        ]}
      >
        <div className="prose mt-6 max-w-[62ch]">
          {hero.lead.map((paragraph) => (
            <p key={paragraph}>
              <InlineText text={paragraph} />
            </p>
          ))}
        </div>
      </CanvasPageHero>

      <Station id="request" ariaLabel={hero.title} className="tight">
        <PrivacyRequestForm startedAt={startedAt} />
      </Station>

      {/*
        Appeal copy sits below the form, not inside it. Inside the form it was
        lost on submission: the success state replaces the whole form, which took
        the page's only publication of the appeal address with it at exactly the
        moment a reader has a decision to appeal.
      */}
      <Station id="appeal" ariaLabelledBy="appeal-title" className="tight">
        <h2 id="appeal-title" className="text-h3 text-ink">
          {appeal.title}
        </h2>
        <p className="measure-wide mt-3 text-ink-2">{appeal.body}</p>
      </Station>
    </div>
  )
}
