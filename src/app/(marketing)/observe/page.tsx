import type { Metadata } from 'next'

import { CanvasPageHero } from '@/components/canvas/page-hero'
import { ObservationForm } from '@/components/observation/observation-form'
import { ObservationDisclosure } from '@/components/observation/observation-result'
import { ObservationStation } from '@/components/observation/observation-station'
import { Station } from '@/components/sections/station'
import { JsonLd } from '@/components/seo/json-ld'
import { routes } from '@/config/routes'
import { formCopy, hero, meta, queued } from '@/content/pages/observe'
import { requestTimestamp } from '@/lib/forms/request-time'
import { parseObservationJobId, parseObservationSearch } from '@/lib/observation/parse'
import { readObservationJob } from '@/lib/observation/service'
import { jsonLdGraph, webPageSchema } from '@/lib/seo/json-ld'
import { buildMetadata } from '@/lib/seo/metadata'

/**
 * `/observe`. Public observation shell.
 *
 * Brand plus category in. Create goes through observeCreatePath after a
 * real submit. A valid `?brand=&category=` query prefills the form and
 * does not enqueue a job. Poll goes through observePollPath. Gemini is
 * unmeasured from first paint. No invented map cells and no invented peers.
 *
 * The route stays noindex until Brand and QA sign the /observe copy.
 */

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: routes.observe.path,
  index: false,
})

export default async function ObservePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const [search, startedAt] = await Promise.all([searchParams, requestTimestamp()])
  const jobId = parseObservationJobId(search)
  const read = jobId ? await readObservationJob(jobId) : null
  const record = read?.ok ? { job: read.job, payload: read.payload } : null
  const parsed = parseObservationSearch(search)
  const showMissing = Boolean(jobId && !record)

  const prefill =
    parsed.status === 'queued'
      ? { brand: parsed.query.brand, category: parsed.query.category }
      : parsed.status === 'invalid'
        ? { brand: parsed.brand, category: parsed.category }
        : undefined

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
        <ObservationStation jobId={jobId} record={record}>
          <>
            <h2 id="observe-form-title" className="text-h2 text-ink">
              {formCopy.heading}
            </h2>
            {showMissing ? (
              <p className="mt-4 text-[0.9375rem] text-ink-2">{queued.jobMissing}</p>
            ) : null}
            <div className="mt-[34px]">
              <ObservationForm
                brand={prefill?.brand}
                category={prefill?.category}
                errors={parsed.status === 'invalid' ? parsed.errors : undefined}
                startedAt={startedAt}
              />
            </div>
            <div className="mt-10">
              <ObservationDisclosure />
            </div>
          </>
        </ObservationStation>
      </Station>
    </div>
  )
}
