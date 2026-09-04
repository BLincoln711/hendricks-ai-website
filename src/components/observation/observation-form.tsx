'use client'

import { useEffect } from 'react'

import { describedBy, Field } from '@/components/forms/form-parts'
import { Button } from '@/components/ui/button'
import { observationCategories } from '@/content/instruments/observation-data'
import { formCopy } from '@/content/pages/observe'
import { trackEvent } from '@/lib/analytics/events'

/**
 * Brand plus category. One primary action. GET so a visitor without JavaScript
 * still reaches the queued state. Analytics events carry no brand string.
 */

export function ObservationForm({
  brand,
  category,
  errors,
}: {
  brand?: string
  category?: string
  errors?: { brand?: string; category?: string }
}) {
  useEffect(() => {
    trackEvent('observe_start', { form_name: 'observe', page_name: 'observe' })
  }, [])

  const brandId = 'observe-brand'
  const categoryId = 'observe-category'

  return (
    <form
      method="get"
      action="/observe"
      aria-label={formCopy.heading}
      className="flex max-w-[36rem] flex-col gap-6"
      onSubmit={(event) => {
        const data = new FormData(event.currentTarget)
        const chosen = data.get('category')
        trackEvent('observe_submit', {
          form_name: 'observe',
          ...(typeof chosen === 'string' && chosen.length > 0 ? { category: chosen } : {}),
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
          name="brand"
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

      <p>
        <Button type="submit">{formCopy.submit}</Button>
      </p>
    </form>
  )
}
