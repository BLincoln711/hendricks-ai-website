import type { Metadata } from 'next'

import { CanvasPageHero } from '@/components/canvas/page-hero'
import { ObservationForm } from '@/components/observation/observation-form'
import {
  ObservationDisclosure,
  ObservationResult,
} from '@/components/observation/observation-result'
import { Station } from '@/components/sections/station'
import { JsonLd } from '@/components/seo/json-ld'
import { routes } from '@/config/routes'
import { formCopy, hero, meta, queued } from '@/content/pages/observe'
import { parseObservationSearch } from '@/lib/observation/parse'
import { jsonLdGraph, webPageSchema } from '@/lib/seo/json-ld'
import { buildMetadata } from '@/lib/seo/metadata'

/**
 * `/observe`. Public observation shell.
 *
 * Brand plus category in. Queued confirmation out. No live engine pulls, no
 * invented map cells, no invented peers. Gemini is named as not probed in
 * this sample. Perplexity is in the later queue, not grouped with Gemini.
 */

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: routes.observe.path,
})

export default async function ObservePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const search = await searchParams
  const parsed = parseObservationSearch(search)

  return (
    <div className="wrap">
      <JsonLd
        data={jsonLdGraph(
          webPageSchema({
            path: routes.observe.path,
            title: meta.title,
            description: meta.description,
            hasBreadcrumb: true,
          }),
        )}
      />

      <CanvasPageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        lead={hero.lead}
        path={routes.observe.path}
        breadcrumbs={[
          { label: routes.home.label, href: routes.home.path },
          { label: routes.observe.label },
        ]}
      />

      <Station id="observe-form" ariaLabelledBy="observe-form-title">
        {parsed.status === 'queued' ? (
          <>
            <h2 id="observe-form-title" className="text-h2 text-ink">
              {queued.status}
            </h2>
            <div className="mt-[34px]">
              <ObservationResult query={parsed.query} />
            </div>
          </>
        ) : (
          <>
            <h2 id="observe-form-title" className="text-h2 text-ink">
              {formCopy.heading}
            </h2>
            <div className="mt-[34px]">
              <ObservationForm
                brand={parsed.status === 'invalid' ? parsed.brand : undefined}
                category={parsed.status === 'invalid' ? parsed.category : undefined}
                errors={parsed.status === 'invalid' ? parsed.errors : undefined}
              />
            </div>
            <div className="mt-10">
              <ObservationDisclosure />
            </div>
          </>
        )}
      </Station>
    </div>
  )
}
