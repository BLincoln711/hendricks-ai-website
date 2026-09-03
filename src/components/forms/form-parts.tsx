import Link from 'next/link'
import type { ReactNode } from 'react'

import { InlineText } from '@/components/legal/inline-text'
import { Button } from '@/components/ui/button'
import { errors, requiredMarker } from '@/content/forms/lead-forms'
import type { Option } from '@/lib/forms/lead-options'

/**
 * The shared parts of the three lead forms (15 sections 4 to 6, 16 FM-01 to
 * FM-09).
 *
 * These are the canvas form primitives with the accessibility contract wired
 * in, so no form can render a control that is styled correctly and labelled
 * wrongly. Every part reads a class from the token layer and adds no colour of
 * its own: a control is the one place in the canvas where a fill, a radius and
 * a boundary are legal, and nothing here is anything but a control.
 */

/** Builds the `aria-describedby` for a control from the parts it actually has. */
export function describedBy(
  id: string,
  parts: { hint?: boolean; error?: boolean; warning?: string },
): string | undefined {
  const ids = [
    parts.warning,
    parts.hint ? `${id}-hint` : undefined,
    parts.error ? `${id}-error` : undefined,
  ].filter(Boolean)

  return ids.length > 0 ? ids.join(' ') : undefined
}

export function Field({
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
  children: ReactNode
}) {
  return (
    // `min-w-0` is load-bearing inside the two-column pairs: a select's
    // min-content width is its longest option, which is wider than 320px.
    <div className="field min-w-0">
      <label htmlFor={htmlFor} className="label">
        {label}
        {required ? <span className="req"> {requiredMarker}</span> : null}
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

/**
 * A radio group. A fieldset because the question is the legend and the options
 * are the answers, which is the one grouping a screen reader announces without
 * being told to.
 *
 * The fieldset carries `idPrefix` as its own id, so the error summary's link
 * for this field resolves (16 FM-02). Pointing it at the first radio instead
 * would move focus onto one answer and read that answer rather than the
 * question, which is the wrong half of the group to land on.
 */
export function RadioGroup({
  legend,
  name,
  options,
  defaultValue,
  error,
  required,
  idPrefix,
  notes,
}: {
  legend: string
  name: string
  options: readonly Option<string>[]
  defaultValue?: string
  error?: string
  required?: boolean
  idPrefix: string
  /**
   * A permanent line under one choice. Rendered as a sibling of the label, not
   * inside it: a link inside a label steals the click that should select the
   * radio.
   */
  notes?: Partial<Record<string, ReactNode>>
}) {
  return (
    <fieldset
      id={idPrefix}
      tabIndex={-1}
      className="fset"
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${idPrefix}-error` : undefined}
    >
      <legend>
        {legend}
        {required ? <span className="req"> {requiredMarker}</span> : null}
      </legend>

      {options.map((option) => (
        <div key={option.value}>
          <label htmlFor={`${idPrefix}-${option.value}`} className="check">
            <input
              id={`${idPrefix}-${option.value}`}
              type="radio"
              name={name}
              value={option.value}
              defaultChecked={defaultValue === option.value}
            />
            <span>{option.label}</span>
          </label>
          {notes?.[option.value] ? <div className="radio-note">{notes[option.value]}</div> : null}
        </div>
      ))}

      {error ? (
        <span id={`${idPrefix}-error`} className="err">
          {error}
        </span>
      ) : null}
    </fieldset>
  )
}

/**
 * legal/01 section 6, above every free-text field that could invite
 * confidential material. Rendered once per fieldset and bound to each control
 * by `aria-describedby`, so it is read with the field rather than beside it.
 */
export function SensitiveWarning({ id, texts }: { id: string; texts: readonly string[] }) {
  return (
    <div id={id}>
      {texts.map((text) => (
        <p key={text} className="warn">
          {text}
        </p>
      ))}
    </div>
  )
}

/**
 * Hidden from sight and from assistive technology, and out of tab order, so
 * only an automated submitter reaches it (16 FM-07).
 */
export function Honeypot({ id }: { id: string }) {
  return (
    <div aria-hidden="true" className="hp">
      <label htmlFor={id}>Leave this field empty</label>
      <input id={id} type="text" name="honeypot" tabIndex={-1} autoComplete="off" />
    </div>
  )
}

/**
 * The notice at collection (16 FM-05). Body text immediately above the submit
 * button, readable without opening anything, with the Privacy Notice link
 * inline rather than in a modal. It is a notice, never a checkbox.
 */
export function NoticeAtCollection({ text }: { text: string }) {
  return (
    <div className="notice">
      <p>
        <InlineText text={text} />
      </p>
    </div>
  )
}

/**
 * The one optional checkbox on an inquiry form, unchecked and never required
 * (16 FM-06). Submission succeeds when it is left alone.
 */
export function MarketingOptIn({ id, text, checked }: { id: string; text: string; checked: boolean }) {
  return (
    <label htmlFor={id} className="check">
      <input id={id} name="marketingOptIn" type="checkbox" defaultChecked={checked} />
      <span>{text}</span>
    </label>
  )
}

export function SubmitButton({
  label,
  pendingLabel,
  pending,
}: {
  label: string
  pendingLabel: string
  pending: boolean
}) {
  return (
    <Button type="submit" disabled={pending}>
      {pending ? pendingLabel : label}
    </Button>
  )
}

/**
 * The error summary (16 FM-02, FM-08).
 *
 * A `role="alert"` region that takes focus, lists each message as a link to its
 * field, and never relies on colour: the heading says the submission was not
 * sent, and every inline message is prefixed with the word "Error" by the token
 * layer. The control that tripped an anti-abuse check is never named.
 */
export function ErrorSummary({
  id,
  fieldErrors,
  message,
  fieldId,
}: {
  id: string
  fieldErrors?: Record<string, string>
  message?: string
  fieldId: (name: string) => string
}) {
  const entries = fieldErrors ? Object.entries(fieldErrors) : []

  return (
    <div id={id} tabIndex={-1} role="alert" className="errsum">
      <h2>{errors.summaryTitle}</h2>

      {entries.length > 0 ? (
        <>
          <p className="mt-3 text-ink-2">{errors.invalidLead}</p>
          <ul>
            {entries.map(([field, text]) => (
              <li key={field}>
                <a href={`#${fieldId(field)}`}>{text}</a>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="mt-3 text-ink-2">{message}</p>
      )}
    </div>
  )
}

/**
 * The success region (16 FM-04). Replaces the form, takes focus, carries the
 * approved confirmation verbatim, promises no response time, and offers one
 * link onward rather than a redirect or a modal.
 */
export function SuccessRegion({
  id,
  title,
  body,
  link,
}: {
  id: string
  title: string
  body: string
  link: { label: string; href: string }
}) {
  return (
    <div id={id} tabIndex={-1} role="status" className="done">
      <h2>{title}</h2>
      <p>{body}</p>
      <p className="mt-6">
        {/* An in-page anchor is not a route, so it never becomes a `Link`
            whose prefetch would ask the server for a fragment. */}
        {link.href.startsWith('/') ? (
          <Link className="link" href={link.href}>
            {link.label}
          </Link>
        ) : (
          <a className="link" href={link.href}>
            {link.label}
          </a>
        )}
      </p>
    </div>
  )
}
