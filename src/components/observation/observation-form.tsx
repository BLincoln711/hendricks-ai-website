'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { queueObservation } from '@/app/(marketing)/observe/actions'
import { describedBy, Field, Honeypot } from '@/components/forms/form-parts'
import { useObservationQueue } from '@/components/observation/observation-station'
import { Button } from '@/components/ui/button'
import { routes } from '@/config/routes'
import {
  observationCategories,
  sampleIntentsByCategory,
  type ObservationCategoryId,
} from '@/content/instruments/observation-data'
import { formCopy } from '@/content/pages/observe'
import { observeCreatePath } from '@/lib/observation/handshake'
import { isObservationCategoryId } from '@/lib/observation/parse'
import {
  observationCreateSchema,
  type ObservationJob,
  type ObservationPayload,
} from '@/lib/observation/schema'

/**
 * Brand plus category. Posts JSON to observeCreatePath when script runs.
 * Falls back to the queueObservation server action without JavaScript.
 * Honeypot and startedAt travel with the create body. No analytics events
 * until those names are approved.
 */

type CreateResponse = {
  ok?: boolean
  job?: ObservationJob
  payload?: ObservationPayload
  fieldErrors?: Record<string, string>
  message?: string
}

function abuseFields(data: FormData) {
  const token = String(data.get('turnstileToken') ?? '')
  return {
    honeypot: String(data.get('honeypot') ?? ''),
    startedAt: Number(data.get('startedAt') ?? 0),
    ...(token ? { turnstileToken: token } : {}),
  }
}

export function ObservationForm({
  brand,
  category,
  errors,
  startedAt,
}: {
  brand?: string
  category?: string
  errors?: { brand?: string; category?: string }
  startedAt: number
}) {
  const router = useRouter()
  const queue = useObservationQueue()
  const [submitting, setSubmitting] = useState(false)
  const [queueError, setQueueError] = useState<string | undefined>()

  const brandId = 'observe-brand'
  const categoryId = 'observe-category'

  return (
    <form
      action={queueObservation}
      aria-label={formCopy.heading}
      className="flex max-w-[36rem] flex-col gap-6"
      onSubmit={(event) => {
        const form = event.currentTarget
        const data = new FormData(form)
        const chosen = data.get('category')

        const brand_name = String(data.get('brand_name') ?? '').trim()
        const selected = String(chosen ?? '')
        if (!brand_name || !isObservationCategoryId(selected)) return

        event.preventDefault()
        setSubmitting(true)
        setQueueError(undefined)

        const parsed = observationCreateSchema.safeParse({
          brand_name,
          category: selected,
          contexts: [...sampleIntentsByCategory[selected as ObservationCategoryId]],
          consent: true,
        })
        if (!parsed.success) {
          setQueueError(formCopy.queueError)
          setSubmitting(false)
          return
        }

        void fetch(observeCreatePath, {
          method: 'POST',
          headers: { 'content-type': 'application/json', accept: 'application/json' },
          body: JSON.stringify({ ...parsed.data, ...abuseFields(data) }),
        })
          .then(async (response) => {
            const body = (await response.json()) as CreateResponse
            if (response.ok && body.ok && body.job?.job_id && body.payload) {
              queue?.onQueued({ job: body.job, payload: body.payload })
              router.push(`/observe?job=${encodeURIComponent(body.job.job_id)}`)
              return
            }
            setQueueError(body.message ?? formCopy.queueError)
            setSubmitting(false)
          })
          .catch(() => {
            setQueueError(formCopy.queueError)
            setSubmitting(false)
          })
      }}
    >
      <input type="hidden" name="startedAt" value={startedAt} />
      <Honeypot id="observe-honeypot" />

      <Field
        label={formCopy.brandLabel}
        htmlFor={brandId}
        hint={formCopy.brandHint}
        error={errors?.brand ? formCopy.brandError : undefined}
        required
      >
        <input
          id={brandId}
          name="brand_name"
          type="text"
          autoComplete="organization"
          required
          maxLength={80}
          defaultValue={brand ?? ''}
          aria-invalid={Boolean(errors?.brand)}
          aria-describedby={describedBy(brandId, {
            hint: true,
            error: Boolean(errors?.brand),
          })}
          className="input min-w-0"
        />
      </Field>

      <Field
        label={formCopy.categoryLabel}
        htmlFor={categoryId}
        hint={formCopy.categoryHint}
        error={errors?.category ? formCopy.categoryError : undefined}
        required
      >
        <select
          id={categoryId}
          name="category"
          required
          defaultValue={category ?? ''}
          aria-invalid={Boolean(errors?.category)}
          aria-describedby={describedBy(categoryId, {
            hint: true,
            error: Boolean(errors?.category),
          })}
          className="select min-w-0"
        >
          <option value="">{formCopy.categoryPrompt}</option>
          {observationCategories.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </Field>

      <p className="text-caption text-ink-2">
        {formCopy.notice}{' '}
        <Link href={routes.privacy.path} className="link">
          {formCopy.privacyLabel}
        </Link>
        .
      </p>

      {queueError ? <p className="err">{queueError}</p> : null}

      <p>
        <Button type="submit" disabled={submitting}>
          {submitting ? formCopy.submitting : formCopy.submit}
        </Button>
      </p>
    </form>
  )
}
