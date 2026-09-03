'use client'

import { useActionState, useEffect, useId, useRef } from 'react'
import { useFormStatus } from 'react-dom'

import { InlineText } from '@/components/legal/inline-text'
import { Button } from '@/components/ui/button'
import {
  confirmation,
  errors,
  form,
  relationshipOptions,
  requestTypeOptions,
} from '@/content/legal/privacy-request'

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
 *
 * Nothing a reader still needs after submitting belongs in this component. The
 * success state replaces the whole form, so anything rendered here is gone once
 * the request is filed. The appeal copy lives on the page below the form for
 * that reason.
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
    // `min-w-0` is load-bearing inside the two-column pairs: a select's
    // min-content width is its longest option, and "Opt out of sale, sharing, or
    // targeted advertising" is wider than a 320px viewport.
    <div className="field min-w-0">
      <label htmlFor={htmlFor} className="label">
        {label}
        {required ? (
          <span className="req" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>

      {hint ? (
        <span id={`${htmlFor}-hint`} className="hint">
          {hint}
        </span>
      ) : null}

      {children}

      {error ? (
        <span id={`${htmlFor}-error`} className="err">
          {error}
        </span>
      ) : null}
    </div>
  )
}

/** The canvas control classes. A control is the one place a fill and a radius
 *  are legal, and `--edge` is the 3.41:1 boundary WCAG 1.4.11 asks for. */
const controlClass = 'input min-w-0'
const selectClass = 'select min-w-0'
const textareaClass = 'textarea min-w-0'

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
      <div role="status" className="done">
        <h2>{confirmation.title}</h2>
        <p>{confirmation.body}</p>
        <p className="cite-row">
          <span className="text-coordinate text-ink-2">{confirmation.referenceLabel}</span>
          <span className="font-mono text-[1.0625rem] text-ink">{state.requestId}</span>
        </p>
      </div>
    )
  }

  return (
    <form action={action} noValidate className="form">
      <input type="hidden" name="startedAt" value={startedAt} />

      {/*
        Honeypot. Hidden from sight and from assistive technology, and excluded
        from tab order, so only an automated submitter reaches it.
      */}
      <div aria-hidden="true" className="hp">
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
        <div ref={summaryRef} tabIndex={-1} role="alert" className="errsum">
          <h2>{errors.summaryTitle}</h2>

          {state.status === 'invalid' && state.fieldErrors ? (
            <ul>
              {Object.entries(state.fieldErrors).map(([field, message]) => (
                <li key={field}>
                  <a href={`#${fieldId(field)}`}>{message}</a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-ink-2">
              {state.status === 'rate-limited' ? errors.rateLimited : errors.server}
            </p>
          )}
        </div>
      ) : null}

      <fieldset className="fset">
        <legend>{form.legends.about}</legend>

        <div className="fieldpair">
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

        <div className="fieldpair">
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
            className={selectClass}
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

      <fieldset className="fset">
        <legend>{form.legends.request}</legend>

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
            className={selectClass}
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

        <p className="warn">{form.sensitiveWarning}</p>

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
            className={textareaClass}
          />
        </Field>

        <label htmlFor={fieldId('isAuthorizedAgent')} className="check">
          <input
            id={fieldId('isAuthorizedAgent')}
            name="isAuthorizedAgent"
            type="checkbox"
            defaultChecked={valueFor('isAuthorizedAgent') === 'on'}
          />
          <span>{form.labels.isAuthorizedAgent}</span>
        </label>
      </fieldset>

      <div className="field border-t border-rule pt-8">
        <label htmlFor={fieldId('attestation')} className="check">
          <input
            id={fieldId('attestation')}
            name="attestation"
            type="checkbox"
            required
            defaultChecked={valueFor('attestation') === 'on'}
            aria-invalid={Boolean(errorFor('attestation'))}
            aria-describedby={describedBy(fieldId('attestation'), false, Boolean(errorFor('attestation')))}
          />
          <span>{form.labels.attestation}</span>
        </label>

        {errorFor('attestation') ? (
          <span id={`${fieldId('attestation')}-error`} className="err">
            {errorFor('attestation')}
          </span>
        ) : null}

        {/* Notice at collection. Readable without opening anything (legal/01 §1). */}
        <div className="notice mt-6">
          <p>
            <InlineText text={form.notice} />
          </p>
        </div>

        <div className="cta-row mt-6">
          <SubmitButton />
        </div>
      </div>
    </form>
  )
}
