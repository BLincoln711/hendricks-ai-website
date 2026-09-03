'use client'

import { describedBy, Field, RadioGroup, SensitiveWarning } from '@/components/forms/form-parts'
import { LeadFormShell } from '@/components/forms/lead-form-shell'
import { useLeadForm } from '@/components/forms/use-lead-form'
import { diagnosticForm, sensitiveWarning, sharedLabels } from '@/content/forms/lead-forms'
import { submitDiagnosticApplication } from '@/lib/forms/lead-actions'
import {
  desiredTimingOptions,
  diagnosticAudienceOptions,
  monthlySearchInvestmentOptions,
} from '@/lib/forms/lead-options'

/**
 * The Diagnostic application at /diagnostic#apply (15 section 4).
 *
 * One step. No confirm-email field, no page two, and nothing the fit tool above
 * it already asked, which is what WCAG 3.3.7 asks of a form that is the end of
 * a considered journey rather than a lead magnet.
 *
 * The five groups, their legends and the field order are the hi-fi's
 * (07-hifi/diagnostic.html). Only the name pair runs two-up; every other
 * control is full width, including the two selects.
 *
 * The investment select names the visitor's own combined search spend and never
 * a Hendricks fee. Its value never reaches analytics, never changes the copy on
 * screen, and never reorders or gates anything (15 section 7 rules 1 and 8).
 */
export function DiagnosticApplicationForm({ startedAt }: { startedAt: number }) {
  const form = useLeadForm({
    formName: 'diagnostic',
    pageName: 'diagnostic',
    action: submitDiagnosticApplication,
    deliveryError: diagnosticForm.deliveryError,
    antiAbuseError: diagnosticForm.antiAbuseError,
  })

  const { fieldId, errorFor, valueFor } = form

  // One warning per group that holds free text, bound to every control in it,
  // so it is read with the field rather than found after it (legal/01 § 6).
  const questionWarningId = fieldId('sensitive-question')
  const contextWarningId = fieldId('sensitive-context')

  return (
    <LeadFormShell controller={form} startedAt={startedAt} copy={diagnosticForm}>
      <RadioGroup
        legend={diagnosticForm.labels.audienceType}
        name="audienceType"
        idPrefix={fieldId('audienceType')}
        options={diagnosticAudienceOptions}
        defaultValue={valueFor('audienceType')}
        error={errorFor('audienceType')}
        required
      />

      <fieldset className="fset">
        <legend>{diagnosticForm.legends.details}</legend>

        <div className="fieldpair">
          <Field
            label={diagnosticForm.labels.firstName}
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
            label={diagnosticForm.labels.lastName}
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
          label={diagnosticForm.labels.workEmail}
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
          label={diagnosticForm.labels.role}
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
        <legend>{diagnosticForm.legends.organization}</legend>

        <Field
          label={diagnosticForm.labels.organization}
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
          label={diagnosticForm.labels.website}
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

        <Field
          label={diagnosticForm.labels.primaryMarket}
          htmlFor={fieldId('primaryMarket')}
          error={errorFor('primaryMarket')}
          required
        >
          <input
            id={fieldId('primaryMarket')}
            name="primaryMarket"
            type="text"
            required
            maxLength={500}
            defaultValue={valueFor('primaryMarket')}
            aria-invalid={Boolean(errorFor('primaryMarket'))}
            aria-describedby={describedBy(fieldId('primaryMarket'), { error: Boolean(errorFor('primaryMarket')) })}
            className="input min-w-0"
          />
        </Field>
      </fieldset>

      <fieldset className="fset">
        <legend>{diagnosticForm.legends.question}</legend>

        <SensitiveWarning id={questionWarningId} texts={[sensitiveWarning]} />

        <Field
          label={diagnosticForm.labels.primaryQuestion}
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
              warning: questionWarningId,
            })}
            className="textarea min-w-0"
          />
        </Field>

        <Field
          label={diagnosticForm.labels.currentStack}
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
              warning: questionWarningId,
            })}
            className="textarea min-w-0"
          />
        </Field>
      </fieldset>

      <fieldset className="fset">
        <legend>{diagnosticForm.legends.context}</legend>

        <SensitiveWarning id={contextWarningId} texts={[sensitiveWarning]} />

        <Field
          label={diagnosticForm.labels.monthlySearchInvestment}
          htmlFor={fieldId('monthlySearchInvestment')}
          hint={diagnosticForm.hints.monthlySearchInvestment}
          error={errorFor('monthlySearchInvestment')}
        >
          <select
            id={fieldId('monthlySearchInvestment')}
            name="monthlySearchInvestment"
            defaultValue={valueFor('monthlySearchInvestment')}
            aria-describedby={describedBy(fieldId('monthlySearchInvestment'), {
              hint: true,
              error: Boolean(errorFor('monthlySearchInvestment')),
            })}
            className="select min-w-0"
          >
            <option value="">{sharedLabels.chooseOne}</option>
            {monthlySearchInvestmentOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label={diagnosticForm.labels.desiredTiming}
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
          label={diagnosticForm.labels.additionalContext}
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
