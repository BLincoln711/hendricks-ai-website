'use client'

import Link from 'next/link'

import { describedBy, Field, RadioGroup, SensitiveWarning } from '@/components/forms/form-parts'
import { LeadFormShell } from '@/components/forms/lead-form-shell'
import { useLeadForm } from '@/components/forms/use-lead-form'
import {
  contactForm,
  contactRoutingPointers,
  sensitiveWarning,
  sharedLabels,
} from '@/content/forms/lead-forms'
import { submitContactInquiry } from '@/lib/forms/lead-actions'
import {
  contactAudienceOptions,
  desiredTimingOptions,
  type ContactAudience,
} from '@/lib/forms/lead-options'

/**
 * The general inquiry at /contact (15 section 6).
 *
 * The routing radio is the first field and is preselected from `?intent=` on
 * the server, so the link a visitor followed answers the first question for
 * them with or without JavaScript. `intent` is a form field value, so the query
 * allowlist in `gtag.ts` strips it from every consented page_view.
 *
 * The two pointers under "Brand or company" and "Digital marketing agency"
 * always render. A visitor who belongs on the Diagnostic application or the
 * agency inquiry reads that before typing rather than after submitting into the
 * wrong queue, which is what makes this form's redundant-entry story hold.
 */
export function ContactInquiryForm({
  startedAt,
  intent,
}: {
  startedAt: number
  intent?: ContactAudience
}) {
  const form = useLeadForm({
    formName: 'contact',
    pageName: 'contact',
    action: submitContactInquiry,
    audienceType: intent,
    deliveryError: contactForm.deliveryError,
    antiAbuseError: contactForm.antiAbuseError,
  })

  const { fieldId, errorFor, valueFor } = form
  const warningId = fieldId('sensitive')

  const pointer = (target: { text: string; label: string; href: string }) => {
    const [before, after] = target.text.split(target.label)
    return (
      <>
        {before}
        <Link href={target.href} className="link">
          {target.label}
        </Link>
        {after}
      </>
    )
  }

  return (
    <LeadFormShell controller={form} startedAt={startedAt} copy={contactForm}>
      <RadioGroup
        legend={contactForm.labels.audienceType}
        name="audienceType"
        idPrefix={fieldId('audienceType')}
        options={contactAudienceOptions}
        defaultValue={valueFor('audienceType') || intent}
        error={errorFor('audienceType')}
        required
        notes={{
          brand: pointer(contactRoutingPointers.brand),
          agency: pointer(contactRoutingPointers.agency),
        }}
      />

      <fieldset className="fset">
        <legend>{contactForm.legends.about}</legend>

        <div className="fieldpair">
          <Field
            label={contactForm.labels.firstName}
            htmlFor={fieldId('firstName')}
            error={errorFor('firstName')}
            required
          >
            <input
              id={fieldId('firstName')}
              name="firstName"
              type="text"
              autoComplete="given-name"
              required
              maxLength={80}
              defaultValue={valueFor('firstName')}
              aria-invalid={Boolean(errorFor('firstName'))}
              aria-describedby={describedBy(fieldId('firstName'), { error: Boolean(errorFor('firstName')) })}
              className="input min-w-0"
            />
          </Field>

          <Field
            label={contactForm.labels.lastName}
            htmlFor={fieldId('lastName')}
            error={errorFor('lastName')}
            required
          >
            <input
              id={fieldId('lastName')}
              name="lastName"
              type="text"
              autoComplete="family-name"
              required
              maxLength={80}
              defaultValue={valueFor('lastName')}
              aria-invalid={Boolean(errorFor('lastName'))}
              aria-describedby={describedBy(fieldId('lastName'), { error: Boolean(errorFor('lastName')) })}
              className="input min-w-0"
            />
          </Field>
        </div>

        <div className="fieldpair">
          <Field
            label={contactForm.labels.workEmail}
            htmlFor={fieldId('workEmail')}
            error={errorFor('workEmail')}
            required
          >
            <input
              id={fieldId('workEmail')}
              name="workEmail"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              defaultValue={valueFor('workEmail')}
              aria-invalid={Boolean(errorFor('workEmail'))}
              aria-describedby={describedBy(fieldId('workEmail'), { error: Boolean(errorFor('workEmail')) })}
              className="input min-w-0"
            />
          </Field>

          <Field
            label={contactForm.labels.organization}
            htmlFor={fieldId('organization')}
            error={errorFor('organization')}
            required
          >
            <input
              id={fieldId('organization')}
              name="organization"
              type="text"
              autoComplete="organization"
              required
              maxLength={160}
              defaultValue={valueFor('organization')}
              aria-invalid={Boolean(errorFor('organization'))}
              aria-describedby={describedBy(fieldId('organization'), { error: Boolean(errorFor('organization')) })}
              className="input min-w-0"
            />
          </Field>
        </div>

        <div className="fieldpair">
          <Field
            label={contactForm.labels.website}
            htmlFor={fieldId('website')}
            error={errorFor('website')}
          >
            <input
              id={fieldId('website')}
              name="website"
              type="url"
              autoComplete="url"
              maxLength={500}
              defaultValue={valueFor('website')}
              aria-invalid={Boolean(errorFor('website'))}
              aria-describedby={describedBy(fieldId('website'), { error: Boolean(errorFor('website')) })}
              className="input min-w-0"
            />
          </Field>

          <Field label={contactForm.labels.role} htmlFor={fieldId('role')} error={errorFor('role')}>
            <input
              id={fieldId('role')}
              name="role"
              type="text"
              autoComplete="organization-title"
              maxLength={160}
              defaultValue={valueFor('role')}
              aria-describedby={describedBy(fieldId('role'), { error: Boolean(errorFor('role')) })}
              className="input min-w-0"
            />
          </Field>
        </div>
      </fieldset>

      <fieldset className="fset">
        <legend>{contactForm.legends.request}</legend>

        <SensitiveWarning id={warningId} texts={[sensitiveWarning]} />

        <Field
          label={contactForm.labels.primaryQuestion}
          htmlFor={fieldId('primaryQuestion')}
          error={errorFor('primaryQuestion')}
          required
        >
          <textarea
            id={fieldId('primaryQuestion')}
            name="primaryQuestion"
            rows={5}
            required
            maxLength={3000}
            defaultValue={valueFor('primaryQuestion')}
            aria-invalid={Boolean(errorFor('primaryQuestion'))}
            aria-describedby={describedBy(fieldId('primaryQuestion'), {
              error: Boolean(errorFor('primaryQuestion')),
              warning: warningId,
            })}
            className="textarea min-w-0"
          />
        </Field>

        <div className="fieldpair">
          <Field
            label={contactForm.labels.primaryMarket}
            htmlFor={fieldId('primaryMarket')}
            error={errorFor('primaryMarket')}
          >
            <input
              id={fieldId('primaryMarket')}
              name="primaryMarket"
              type="text"
              maxLength={500}
              defaultValue={valueFor('primaryMarket')}
              aria-describedby={describedBy(fieldId('primaryMarket'), {
                error: Boolean(errorFor('primaryMarket')),
              })}
              className="input min-w-0"
            />
          </Field>

          <Field
            label={contactForm.labels.desiredTiming}
            htmlFor={fieldId('desiredTiming')}
            error={errorFor('desiredTiming')}
          >
            <select
              id={fieldId('desiredTiming')}
              name="desiredTiming"
              defaultValue={valueFor('desiredTiming')}
              aria-describedby={describedBy(fieldId('desiredTiming'), {
                error: Boolean(errorFor('desiredTiming')),
              })}
              className="select min-w-0"
            >
              <option value="">{sharedLabels.chooseOne}</option>
              {desiredTimingOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field
          label={contactForm.labels.currentStack}
          htmlFor={fieldId('currentStack')}
          error={errorFor('currentStack')}
        >
          <textarea
            id={fieldId('currentStack')}
            name="currentStack"
            rows={3}
            maxLength={2000}
            defaultValue={valueFor('currentStack')}
            aria-describedby={describedBy(fieldId('currentStack'), {
              error: Boolean(errorFor('currentStack')),
              warning: warningId,
            })}
            className="textarea min-w-0"
          />
        </Field>

        <Field
          label={contactForm.labels.additionalContext}
          htmlFor={fieldId('additionalContext')}
          error={errorFor('additionalContext')}
        >
          <textarea
            id={fieldId('additionalContext')}
            name="additionalContext"
            rows={4}
            maxLength={5000}
            defaultValue={valueFor('additionalContext')}
            aria-describedby={describedBy(fieldId('additionalContext'), {
              error: Boolean(errorFor('additionalContext')),
              warning: warningId,
            })}
            className="textarea min-w-0"
          />
        </Field>
      </fieldset>
    </LeadFormShell>
  )
}
