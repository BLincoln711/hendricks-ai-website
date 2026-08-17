'use client'

import { useActionState, useEffect, useId, useRef } from 'react'
import { useFormStatus } from 'react-dom'

import { InlineText } from '@/components/legal/inline-text'
import { Button } from '@/components/ui/button'
import {
  appeal,
  confirmation,
  errors,
  form,
  relationshipOptions,
  requestTypeOptions,
} from '@/content/legal/privacy-request'
import { cn } from '@/lib/utils/cn'

import { submitPrivacyRequest, type PrivacyRequestState } from './actions'

/**
 * Privacy request form (docs/16 §9, `21-privacy-request.md`).
 *
 * Progressive enhancement is the constraint that shapes this component. The
 * `<form action={…}>` posts to the server action without JavaScript, `startedAt`
 * is rendered by the server rather than set on mount, and no field appears or
 * disappears in response to another field. What JavaScript adds is the pending
 * state and moving focus to the error summary — improvements, not requirements.
 *
 * No CAPTCHA. `21-privacy-request.md` prohibits an inaccessible one, and the
 * honeypot plus timing floor in the action cover the same ground.
 */

const initialState: PrivacyRequestState = { status: 'idle' }

function Field({
  label,
  htmlFor,
  hint,
  error,
  required,
  children,
}: {
  label: string
  htmlFor: string
  hint?: string
  error?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    // `min-w-0` is load-bearing inside the two-column grids: a select's
    // min-content width is its longest option, and "Opt out of sale, sharing, or
    // targeted advertising" is wider than a 320px viewport.
    <div className="flex min-w-0 flex-col gap-2">
      <label htmlFor={htmlFor} className="text-[0.9375rem] font-medium text-[var(--color-navy)]">
        {label}
        {required ? (
          <span className="ml-1 text-[var(--color-slate)]" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>

      {hint ? (
        <p id={`${htmlFor}-hint`} className="text-[0.875rem] leading-relaxed text-[var(--color-slate)]">
          {hint}
        </p>
      ) : null}

      {children}

      {error ? (
        <p id={`${htmlFor}-error`} className="text-[0.875rem] font-medium text-[var(--color-amber)]">
          {error}
        </p>
      ) : null}
    </div>
  )
}

const controlClass =
  'min-h-11 w-full min-w-0 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-white px-3.5 py-2.5 text-[1rem] text-[var(--color-graphite)] transition-colors focus:border-[var(--color-blue)]'

function describedBy(id: string, hint: boolean, error: boolean): string | undefined {
  const parts = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean)
  return parts.length > 0 ? parts.join(' ') : undefined
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending}>
      {pending ? form.submitting : form.submit}
    </Button>
  )
}

export function PrivacyRequestForm({ startedAt }: { startedAt: number }) {
  const [state, action] = useActionState(submitPrivacyRequest, initialState)
  const summaryRef = useRef<HTMLDivElement>(null)
  const ids = useId()

  const fieldId = (name: string) => `${ids}-${name}`
  const errorFor = (name: string) => state.fieldErrors?.[name]
  const valueFor = (name: string) => state.values?.[name] ?? ''

  const hasSummary =
    state.status === 'invalid' || state.status === 'error' || state.status === 'rate-limited'

  useEffect(() => {
    if (hasSummary) summaryRef.current?.focus()
  }, [hasSummary, state])

  if (state.status === 'success') {
    return (
      <div
        role="status"
        className="flex flex-col gap-4 rounded-[var(--radius-panel)] border-l-2 border-[var(--color-blue)] bg-[var(--color-soft)] p-6 md:p-8"
      >
        <h2 className="text-h3 text-[var(--color-navy)]">{confirmation.title}</h2>
        <p className="text-[1rem] leading-relaxed text-[var(--color-graphite)]">
          {confirmation.body}
        </p>
        <p className="flex flex-wrap items-baseline gap-2 border-t border-[var(--color-border)] pt-4">
          <span className="text-eyebrow text-[var(--color-slate)]">
            {confirmation.referenceLabel}
          </span>
          <span className="font-mono text-[1.0625rem] text-[var(--color-navy)]">
            {state.requestId}
          </span>
        </p>
      </div>
    )
  }

  return (
    <form action={action} noValidate className="flex flex-col gap-10">
      <input type="hidden" name="startedAt" value={startedAt} />

      {/*
        Honeypot. Hidden from sight and from assistive technology, and excluded
        from tab order, so only an automated submitter reaches it.
      */}
      <div aria-hidden="true" className="absolute h-px w-px overflow-hidden opacity-0">
        <label htmlFor={fieldId('honeypot')}>Leave this field empty</label>
        <input
          id={fieldId('honeypot')}
          type="text"
          name="honeypot"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {hasSummary ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="flex flex-col gap-3 rounded-[var(--radius-card)] border-l-2 border-[var(--color-amber)] bg-[var(--color-soft)] p-5"
        >
          <h2 className="text-[1.0625rem] font-medium text-[var(--color-navy)]">
            {errors.summaryTitle}
          </h2>

          {state.status === 'invalid' && state.fieldErrors ? (
            <ul className="flex flex-col gap-1.5">
              {Object.entries(state.fieldErrors).map(([field, message]) => (
                <li key={field} className="text-[0.9375rem]">
                  <a
                    href={`#${fieldId(field)}`}
                    className="text-[var(--color-blue)] underline underline-offset-4"
                  >
                    {message}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[0.9375rem] leading-relaxed text-[var(--color-graphite)]">
              {state.status === 'rate-limited' ? errors.rateLimited : errors.server}
            </p>
          )}
        </div>
      ) : null}

      <fieldset className="flex flex-col gap-6 border-0 p-0">
        <legend className="text-eyebrow mb-2 text-[var(--color-slate)]">
          {form.legends.about}
        </legend>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label={form.labels.firstName} htmlFor={fieldId('firstName')} error={errorFor('firstName')} required>
            <input
              id={fieldId('firstName')}
              name="firstName"
              type="text"
              autoComplete="given-name"
              required
              defaultValue={valueFor('firstName')}
              aria-invalid={Boolean(errorFor('firstName'))}
              aria-describedby={describedBy(fieldId('firstName'), false, Boolean(errorFor('firstName')))}
              className={controlClass}
            />
          </Field>

          <Field label={form.labels.lastName} htmlFor={fieldId('lastName')} error={errorFor('lastName')} required>
            <input
              id={fieldId('lastName')}
              name="lastName"
              type="text"
              autoComplete="family-name"
              required
              defaultValue={valueFor('lastName')}
              aria-invalid={Boolean(errorFor('lastName'))}
              aria-describedby={describedBy(fieldId('lastName'), false, Boolean(errorFor('lastName')))}
              className={controlClass}
            />
          </Field>
        </div>

        <Field label={form.labels.email} htmlFor={fieldId('email')} error={errorFor('email')} required>
          <input
            id={fieldId('email')}
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={valueFor('email')}
            aria-invalid={Boolean(errorFor('email'))}
            aria-describedby={describedBy(fieldId('email'), false, Boolean(errorFor('email')))}
            className={controlClass}
          />
        </Field>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label={form.labels.country} htmlFor={fieldId('country')} error={errorFor('country')} required>
            <input
              id={fieldId('country')}
              name="country"
              type="text"
              autoComplete="country-name"
              required
              defaultValue={valueFor('country')}
              aria-invalid={Boolean(errorFor('country'))}
              aria-describedby={describedBy(fieldId('country'), false, Boolean(errorFor('country')))}
              className={controlClass}
            />
          </Field>

          <Field
            label={form.labels.stateOrProvince}
            htmlFor={fieldId('stateOrProvince')}
            hint={form.hints.stateOrProvince}
            error={errorFor('stateOrProvince')}
          >
            <input
              id={fieldId('stateOrProvince')}
              name="stateOrProvince"
              type="text"
              autoComplete="address-level1"
              defaultValue={valueFor('stateOrProvince')}
              aria-describedby={describedBy(
                fieldId('stateOrProvince'),
                true,
                Boolean(errorFor('stateOrProvince')),
              )}
              className={controlClass}
            />
          </Field>
        </div>

        <Field
          label={form.labels.relationship}
          htmlFor={fieldId('relationship')}
          error={errorFor('relationship')}
          required
        >
          <select
            id={fieldId('relationship')}
            name="relationship"
            required
            defaultValue={valueFor('relationship')}
            aria-invalid={Boolean(errorFor('relationship'))}
            aria-describedby={describedBy(fieldId('relationship'), false, Boolean(errorFor('relationship')))}
            className={cn(controlClass, 'appearance-none bg-white')}
          >
            <option value="">Select one</option>
            {relationshipOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
      </fieldset>

      <fieldset className="flex flex-col gap-6 border-0 p-0">
        <legend className="text-eyebrow mb-2 text-[var(--color-slate)]">
          {form.legends.request}
        </legend>

        <Field
          label={form.labels.requestType}
          htmlFor={fieldId('requestType')}
          error={errorFor('requestType')}
          required
        >
          <select
            id={fieldId('requestType')}
            name="requestType"
            required
            defaultValue={valueFor('requestType')}
            aria-invalid={Boolean(errorFor('requestType'))}
            aria-describedby={describedBy(fieldId('requestType'), false, Boolean(errorFor('requestType')))}
            className={cn(controlClass, 'appearance-none bg-white')}
          >
            <option value="">Select one</option>
            {requestTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label={form.labels.originalRequestId}
          htmlFor={fieldId('originalRequestId')}
          hint={form.hints.originalRequestId}
          error={errorFor('originalRequestId')}
        >
          <input
            id={fieldId('originalRequestId')}
            name="originalRequestId"
            type="text"
            defaultValue={valueFor('originalRequestId')}
            aria-invalid={Boolean(errorFor('originalRequestId'))}
            aria-describedby={describedBy(
              fieldId('originalRequestId'),
              true,
              Boolean(errorFor('originalRequestId')),
            )}
            className={controlClass}
          />
        </Field>

        <p className="rounded-[var(--radius-card)] border-l-2 border-[var(--color-amber)] bg-[var(--color-soft)] p-4 text-[0.875rem] leading-relaxed text-[var(--color-graphite)]">
          {form.sensitiveWarning}
        </p>

        <Field
          label={form.labels.details}
          htmlFor={fieldId('details')}
          hint={form.hints.details}
          error={errorFor('details')}
          required
        >
          <textarea
            id={fieldId('details')}
            name="details"
            rows={6}
            required
            maxLength={5000}
            defaultValue={valueFor('details')}
            aria-invalid={Boolean(errorFor('details'))}
            aria-describedby={describedBy(fieldId('details'), true, Boolean(errorFor('details')))}
            className={cn(controlClass, 'resize-y leading-relaxed')}
          />
        </Field>

        <label
          htmlFor={fieldId('isAuthorizedAgent')}
          className="flex min-h-11 cursor-pointer items-start gap-3 text-[0.9375rem] leading-relaxed text-[var(--color-graphite)]"
        >
          <input
            id={fieldId('isAuthorizedAgent')}
            name="isAuthorizedAgent"
            type="checkbox"
            defaultChecked={valueFor('isAuthorizedAgent') === 'on'}
            className="mt-0.5 size-5 shrink-0 accent-[var(--color-blue)]"
          />
          {form.labels.isAuthorizedAgent}
        </label>
      </fieldset>

      <div className="flex flex-col gap-6 border-t border-[var(--color-border)] pt-8">
        <label
          htmlFor={fieldId('attestation')}
          className="flex min-h-11 cursor-pointer items-start gap-3 text-[0.9375rem] leading-relaxed text-[var(--color-graphite)]"
        >
          <input
            id={fieldId('attestation')}
            name="attestation"
            type="checkbox"
            required
            defaultChecked={valueFor('attestation') === 'on'}
            aria-invalid={Boolean(errorFor('attestation'))}
            aria-describedby={describedBy(fieldId('attestation'), false, Boolean(errorFor('attestation')))}
            className="mt-0.5 size-5 shrink-0 accent-[var(--color-blue)]"
          />
          {form.labels.attestation}
        </label>

        {errorFor('attestation') ? (
          <p id={`${fieldId('attestation')}-error`} className="text-[0.875rem] font-medium text-[var(--color-amber)]">
            {errorFor('attestation')}
          </p>
        ) : null}

        {/* Notice at collection. Readable without opening anything (legal/01 §1). */}
        <p className="text-[0.875rem] leading-relaxed text-[var(--color-slate)]">
          <InlineText text={form.notice} />
        </p>

        <SubmitButton />
      </div>

      <div className="flex flex-col gap-3 border-t border-[var(--color-border)] pt-8">
        <h2 className="text-[1.0625rem] font-medium text-[var(--color-navy)]">{appeal.title}</h2>
        <p className="text-[0.9375rem] leading-relaxed text-[var(--color-slate)]">{appeal.body}</p>
      </div>
    </form>
  )
}
