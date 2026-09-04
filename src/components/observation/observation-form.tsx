'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { queueObservation } from '@/app/(marketing)/observe/actions'
import { describedBy, Field } from '@/components/forms/form-parts'
import { Button } from '@/components/ui/button'
import { routes } from '@/config/routes'
import {
  observationCategories,
  sampleIntentsByCategory,
  type ObservationCategoryId,
} from '@/content/instruments/observation-data'
import { formCopy } from '@/content/pages/observe'
import { trackEvent } from '@/lib/analytics/events'
import { observeCreatePath } from '@/lib/observation/handshake'
import { isObservationCategoryId } from '@/lib/observation/parse'

/**
 * Brand plus category. Posts JSON to observeCreatePath when script runs.
 * Falls back to the queueObservation server action without JavaScript.
 * Analytics events carry no brand string.
 */

type CreateResponse = {
  ok?: boolean
  job?: { job_id: string }
  fieldErrors?: Record<string, string>
  message?: string
}

export function ObservationForm({
  brand,
  category,
  errors,
}: {
  brand?: string
  category?: string
  errors?: { brand?: string; category?: string }
}) {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [queueError, setQueueError] = useState<string | undefined>()

  useEffect(() => {
    trackEvent('observe_start', { form_name: 'observe', page_name: 'observe' })
  }, [])

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
        trackEvent('observe_submit', {
          form_name: 'observe',
          ...(typeof chosen === 'string' && chosen.length > 0 ? { category: chosen } : {}),
        })

        const brand_name = String(data.get('brand_name') ?? '').trim()
        const selected = String(chosen ?? '')
        if (!brand_name || !isObservationCategoryId(selected)) return

        event.preventDefault()
        setSubmitting(true)
        setQueueError(undefined)

        const contexts = [...sampleIntentsByCategory[selected as ObservationCategoryId]]
        void fetch(observeCreatePath, {
          method: 'POST',
          headers: { 'content-type': 'application/json', accept: 'application/json' },
          body: JSON.stringify({
            brand_name,
            category: selected,
            contexts,
            consent: true,
          }),
        })
          .then(async (response) => {
            const body = (await response.json()) as CreateResponse
            if (response.ok && body.ok && body.job?.job_id) {
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
