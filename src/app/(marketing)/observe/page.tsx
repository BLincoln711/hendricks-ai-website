import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

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
import { createObservationJob, getObservationJob } from '@/lib/observation/jobs'
import { parseObservationJobId, parseObservationSearch, sampleIntentsFor } from '@/lib/observation/parse'
import { jsonLdGraph, webPageSchema } from '@/lib/seo/json-ld'
import { buildMetadata } from '@/lib/seo/metadata'

/**
 * `/observe`. Public observation shell.
 *
 * Brand plus category in. POST /api/observe/jobs creates a job_id and a pending
 * board. Gemini is unmeasured from first paint. No live engine pulls, no
 * invented map cells, no invented peers.
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
  const job = jobId ? getObservationJob(jobId) : null
  const parsed = parseObservationSearch(search)

  if (!jobId && parsed.status === 'queued') {
    const created = createObservationJob({
      brand_name: parsed.query.brand,
      category: parsed.query.category,
      contexts: [...sampleIntentsFor(parsed.query.category)],
    })
    redirect(`${routes.observe.path}?job=${encodeURIComponent(created.job_id)}`)
  }

  const showBoard = jobId ? Boolean(job) : false
  const showMissing = Boolean(jobId && !job)

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
        {showBoard && job ? (
          <>
            <h2 id="observe-form-title" className="text-h2 text-ink">
              {queued.status}
            </h2>
            <div className="mt-[34px]">
              <ObservationResult job={job} />
            </div>
          </>
        ) : (
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
        )}
      </Station>
    </div>
  )
}
