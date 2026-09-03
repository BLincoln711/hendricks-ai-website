'use client'

import { describedBy, Field, SensitiveWarning } from '@/components/forms/form-parts'
import { LeadFormShell } from '@/components/forms/lead-form-shell'
import { useLeadForm } from '@/components/forms/use-lead-form'
import {
  agencyClientWarning,
  agencyForm,
  sensitiveWarning,
  sharedLabels,
} from '@/content/forms/lead-forms'
import { submitAgencyPartnershipInquiry } from '@/lib/forms/lead-actions'
import {
  desiredTimingOptions,
  preferredModelOptions,
  relevantAccountsOptions,
  type PreferredModel,
} from '@/lib/forms/lead-options'

/**
 * The agency partnership inquiry at /for-agencies#partnership-inquiry
 * (15 section 5).
 *
 * No audience field: the page is the answer, and asking again would be
 * redundant entry. No investment select either, because the qualifier here is
 * the field set itself.
 *
 * The four groups, their legends and the field order are the hi-fi's
 * (07-hifi/for-agencies.html). Only the name pair runs two-up.
 *
 * Both legal/01 section 6 warnings sit above every free-text field, so "do not
 * identify a client" is read before an agency writes about an account rather
 * than after. "Number of relevant accounts" is a count for the same reason.
 *
 * `preselectedModel` comes from `?model=` on the server, so the four model
 * panels above preselect without JavaScript. The value is a form field value,
 * so the query allowlist in `gtag.ts` strips it before any consented page_view.
 */
export function AgencyPartnershipForm({
  startedAt,
  preselectedModel,
}: {
  startedAt: number
  preselectedModel?: PreferredModel
}) {
  const form = useLeadForm({
    formName: 'agency-partnership',
    pageName: 'for-agencies',
    action: submitAgencyPartnershipInquiry,
    audienceType: 'agency',
    deliveryError: agencyForm.deliveryError,
    antiAbuseError: agencyForm.antiAbuseError,
  })

  const { fieldId, errorFor, valueFor } = form

  const opportunityWarningId = fieldId('sensitive-opportunity')
  const contextWarningId = fieldId('sensitive-context')

  return (
    <LeadFormShell controller={form} startedAt={startedAt} copy={agencyForm}>
      <fieldset className="fset">
        <legend>{agencyForm.legends.agency}</legend>

        <Field
          label={agencyForm.labels.organization}
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

        <Field
          label={agencyForm.labels.website}
          htmlFor={fieldId('website')}
          error={errorFor('website')}
          required
        >
          <input
            id={fieldId('website')}
            name="website"
            type="url"
            autoComplete="url"
            required
            maxLength={500}
            defaultValue={valueFor('website')}
            aria-invalid={Boolean(errorFor('website'))}
            aria-describedby={describedBy(fieldId('website'), { error: Boolean(errorFor('website')) })}
            className="input min-w-0"
          />
        </Field>
      </fieldset>

      <fieldset className="fset">
        <legend>{agencyForm.legends.contact}</legend>

        <div className="fieldpair">
          <Field
            label={agencyForm.labels.firstName}
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
            label={agencyForm.labels.lastName}
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

        <Field
          label={agencyForm.labels.workEmail}
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
          label={agencyForm.labels.role}
          htmlFor={fieldId('role')}
          error={errorFor('role')}
          required
        >
          <input
            id={fieldId('role')}
            name="role"
            type="text"
            autoComplete="organization-title"
            required
            maxLength={160}
            defaultValue={valueFor('role')}
            aria-invalid={Boolean(errorFor('role'))}
            aria-describedby={describedBy(fieldId('role'), { error: Boolean(errorFor('role')) })}
            className="input min-w-0"
          />
        </Field>
      </fieldset>

      <fieldset className="fset">
        <legend>{agencyForm.legends.opportunity}</legend>

        <Field
          label={agencyForm.labels.primaryMarket}
          htmlFor={fieldId('primaryMarket')}
          error={errorFor('primaryMarket')}
          required
        >
          <input
            id={fieldId('primaryMarket')}
            name="primaryMarket"
            type="text"
            required
            maxLength={300}
            defaultValue={valueFor('primaryMarket')}
            aria-invalid={Boolean(errorFor('primaryMarket'))}
            aria-describedby={describedBy(fieldId('primaryMarket'), { error: Boolean(errorFor('primaryMarket')) })}
            className="input min-w-0"
          />
        </Field>

        <Field
          label={agencyForm.labels.relevantAccounts}
          htmlFor={fieldId('relevantAccounts')}
          hint={agencyForm.hints.relevantAccounts}
          error={errorFor('relevantAccounts')}
        >
          <select
            id={fieldId('relevantAccounts')}
            name="relevantAccounts"
            defaultValue={valueFor('relevantAccounts')}
            aria-describedby={describedBy(fieldId('relevantAccounts'), {
              hint: true,
              error: Boolean(errorFor('relevantAccounts')),
            })}
            className="select min-w-0"
          >
            <option value="">{sharedLabels.chooseOne}</option>
            {relevantAccountsOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>

        <SensitiveWarning
          id={opportunityWarningId}
          texts={[sensitiveWarning, agencyClientWarning]}
        />

        <Field
          label={agencyForm.labels.primaryQuestion}
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
              warning: opportunityWarningId,
            })}
            className="textarea min-w-0"
          />
        </Field>

        <Field
          label={agencyForm.labels.preferredModel}
          htmlFor={fieldId('preferredModel')}
          error={errorFor('preferredModel')}
        >
          <select
            id={fieldId('preferredModel')}
            name="preferredModel"
            defaultValue={valueFor('preferredModel') || (preselectedModel ?? '')}
            aria-describedby={describedBy(fieldId('preferredModel'), {
              error: Boolean(errorFor('preferredModel')),
            })}
            className="select min-w-0"
          >
            <option value="">{sharedLabels.chooseOne}</option>
            {preferredModelOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
      </fieldset>

      <fieldset className="fset">
        <legend>{agencyForm.legends.context}</legend>

        <SensitiveWarning id={contextWarningId} texts={[sensitiveWarning, agencyClientWarning]} />

        <Field
          label={agencyForm.labels.currentStack}
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
              warning: contextWarningId,
            })}
            className="textarea min-w-0"
          />
        </Field>

        <Field
          label={agencyForm.labels.desiredTiming}
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

        <Field
          label={agencyForm.labels.additionalContext}
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
              warning: contextWarningId,
            })}
            className="textarea min-w-0"
          />
        </Field>
      </fieldset>
    </LeadFormShell>
  )
}
