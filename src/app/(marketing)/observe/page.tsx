import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { CanvasPageHero } from '@/components/canvas/page-hero'
import { ObservationForm } from '@/components/observation/observation-form'
import { ObservationDisclosure } from '@/components/observation/observation-result'
import { ObservationStation } from '@/components/observation/observation-station'
import { Station } from '@/components/sections/station'
import { JsonLd } from '@/components/seo/json-ld'
import { routes } from '@/config/routes'
import { formCopy, hero, meta, queued } from '@/content/pages/observe'
import { parseObservationJobId, parseObservationSearch, sampleIntentsFor } from '@/lib/observation/parse'
import { createObservationJob, readObservationJob } from '@/lib/observation/service'
import { jsonLdGraph, webPageSchema } from '@/lib/seo/json-ld'
import { buildMetadata } from '@/lib/seo/metadata'

/**
 * `/observe`. Public observation shell.
 *
 * Brand plus category in. Create goes through observeCreatePath /
 * createObservationJob. Poll goes through observePollPath /
 * readObservationJob. Gemini is unmeasured from first paint. No invented
 * map cells and no invented peers.
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
  const jobId = parseObservationJobId(search)
  const read = jobId ? await readObservationJob(jobId) : null
  const record = read?.ok ? { job: read.job, payload: read.payload } : null
  const parsed = parseObservationSearch(search)

  if (!jobId && parsed.status === 'queued') {
    const created = await createObservationJob({
      brand_name: parsed.query.brand,
      brand_host: undefined,
      category: parsed.query.category,
      contexts: [...sampleIntentsFor(parsed.query.category)],
      consent: true,
    })
    if (created.ok) {
      redirect(`${routes.observe.path}?job=${encodeURIComponent(created.job.job_id)}`)
    }
  }

  const showMissing = Boolean(jobId && !record)

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
                brand={parsed.status === 'invalid' ? parsed.brand : undefined}
                category={parsed.status === 'invalid' ? parsed.category : undefined}
                errors={parsed.status === 'invalid' ? parsed.errors : undefined}
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
