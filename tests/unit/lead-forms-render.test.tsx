import { render, screen, within } from '@testing-library/react'
import type { ReactElement } from 'react'
import { beforeEach, describe, expect, it } from 'vitest'

import { ConsentProvider } from '@/components/consent/consent-provider'
import { AgencyPartnershipForm } from '@/components/forms/agency-partnership-form'
import { ContactInquiryForm } from '@/components/forms/contact-inquiry-form'
import { DiagnosticApplicationForm } from '@/components/forms/diagnostic-application-form'
import {
  agencyClientWarning,
  agencyForm,
  contactForm,
  diagnosticForm,
  requiredMarker,
  sensitiveWarning,
} from '@/content/forms/lead-forms'
import { resetConsentStoreForTests } from '@/lib/consent/store'

const STARTED_AT = 1_756_000_000_000

function mount(element: ReactElement) {
  return render(<ConsentProvider>{element}</ConsentProvider>)
}

const forms = [
  {
    name: 'diagnostic',
    copy: diagnosticForm,
    element: <DiagnosticApplicationForm startedAt={STARTED_AT} />,
  },
  {
    name: 'agency-partnership',
    copy: agencyForm,
    element: <AgencyPartnershipForm startedAt={STARTED_AT} />,
  },
  {
    name: 'contact',
    copy: contactForm,
    element: <ContactInquiryForm startedAt={STARTED_AT} />,
  },
] as const

beforeEach(() => {
  window.localStorage.clear()
  window.sessionStorage.clear()
  resetConsentStoreForTests()
})

describe.each(forms)('$name form', ({ copy, element }) => {
  it('labels every control and marks required fields in words', () => {
    mount(element)

    const email = screen.getByLabelText<HTMLInputElement>(new RegExp(copy.labels.workEmail, 'i'))
    expect(email).toHaveAttribute('type', 'email')
    expect(email).toHaveAttribute('autocomplete', 'email')

    expect(email.labels?.[0]?.textContent).toContain(requiredMarker)
  })

  it('posts to the action without JavaScript and suppresses native bubbles', () => {
    const { container } = mount(element)
    const form = container.querySelector('form')

    expect(form).toBeInTheDocument()
    expect(form).toHaveAttribute('novalidate')
    expect(form?.querySelector('input[name="startedAt"]')).toHaveValue(String(STARTED_AT))
  })

  it('hides the honeypot from sight, from tab order and from assistive technology', () => {
    const { container } = mount(element)
    const honeypot = container.querySelector('input[name="honeypot"]')

    expect(honeypot).toHaveAttribute('tabindex', '-1')
    expect(honeypot).toHaveAttribute('autocomplete', 'off')
    expect(honeypot?.closest('[aria-hidden="true"]')).not.toBeNull()
    expect(honeypot?.closest('.hp')).not.toBeNull()
  })

  it('offers the marketing opt-in unchecked and requires no consent checkbox', () => {
    const { container } = mount(element)

    const optIn = screen.getByLabelText(copy.marketingOptIn)
    expect(optIn).not.toBeChecked()
    expect(optIn).not.toBeRequired()

    const required = container.querySelectorAll(
      'input[type="checkbox"][required], input[type="checkbox"][aria-required="true"]',
    )
    expect(required).toHaveLength(0)
  })

  it('places the notice at collection immediately above the submit button', () => {
    const { container } = mount(element)

    const notice = container.querySelector('.notice')
    const submit = screen.getByRole('button', { name: copy.submit })

    expect(notice).toBeInTheDocument()
    expect(notice?.textContent).toContain('Privacy Notice')
    expect(within(notice as HTMLElement).getByRole('link')).toHaveAttribute('href', '/privacy')

    // DOM order: nothing between the notice and the button but the row it sits in.
    const position = notice?.compareDocumentPosition(submit) ?? 0
    expect(position & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(notice?.nextElementSibling?.contains(submit)).toBe(true)
  })

  it('warns about sensitive information above the free-text field and binds it', () => {
    mount(element)

    const question = screen.getByLabelText(new RegExp(copy.labels.primaryQuestion, 'i'))
    const describedBy = question.getAttribute('aria-describedby') ?? ''
    const warning = document.getElementById(describedBy.split(' ')[0] as string)

    expect(warning?.textContent).toContain(sensitiveWarning)
  })

  it('renders no reference to a Hendricks fee', () => {
    const { container } = mount(element)
    const text = container.textContent ?? ''

    expect(text.toLowerCase()).not.toContain('starts at')
    expect(text).not.toContain('Hendricks fee')
  })
})

describe('Diagnostic application', () => {
  it('asks the audience once, with no preselect', () => {
    mount(<DiagnosticApplicationForm startedAt={STARTED_AT} />)

    const brand = screen.getByLabelText('A brand or company')
    const agency = screen.getByLabelText('An agency, on behalf of a client')

    expect(brand).not.toBeChecked()
    expect(agency).not.toBeChecked()
  })

  it('offers the investment band as the visitor spend, optional, with the hint', () => {
    mount(<DiagnosticApplicationForm startedAt={STARTED_AT} />)

    const select = screen.getByLabelText(
      new RegExp(diagnosticForm.labels.monthlySearchInvestment, 'i'),
    )
    expect(select).not.toBeRequired()
    expect(select).toHaveValue('')

    const hint = document.getElementById(`${select.id}-hint`)
    expect(hint?.textContent).toContain("Your organization's combined spend")
    expect(hint?.textContent).toContain('does not change the reply')
  })
})

describe('Agency partnership inquiry', () => {
  it('adds the client confidentiality warning and asks for a count, not a name', () => {
    mount(<AgencyPartnershipForm startedAt={STARTED_AT} />)

    const question = screen.getByLabelText(new RegExp(agencyForm.labels.primaryQuestion, 'i'))
    const warningId = (question.getAttribute('aria-describedby') ?? '').split(' ')[0] as string

    expect(document.getElementById(warningId)?.textContent).toContain(agencyClientWarning)

    const accounts = screen.getByLabelText(new RegExp(agencyForm.labels.relevantAccounts, 'i'))
    expect(accounts).not.toBeRequired()
    expect(within(accounts as HTMLSelectElement).getByText('2 to 5')).toBeInTheDocument()
  })

  it('asks no audience question, because the page is the answer', () => {
    const { container } = mount(<AgencyPartnershipForm startedAt={STARTED_AT} />)
    expect(container.querySelector('input[name="audienceType"]')).toBeNull()
  })

  it('preselects the model the panel CTA named', () => {
    mount(<AgencyPartnershipForm startedAt={STARTED_AT} preselectedModel="embedded" />)
    expect(screen.getByLabelText(new RegExp(agencyForm.labels.preferredModel, 'i'))).toHaveValue(
      'embedded',
    )
  })
})

describe('General inquiry', () => {
  it('preselects the routing choice the query named', () => {
    mount(<ContactInquiryForm startedAt={STARTED_AT} intent="agency" />)

    expect(screen.getByLabelText('Digital marketing agency')).toBeChecked()
    expect(screen.getByLabelText('Brand or company')).not.toBeChecked()
  })

  it('selects nothing when no intent was carried', () => {
    mount(<ContactInquiryForm startedAt={STARTED_AT} />)

    for (const label of ['Brand or company', 'Digital marketing agency', 'Media or speaking inquiry', 'Other']) {
      expect(screen.getByLabelText(label)).not.toBeChecked()
    }
  })

  it('always points a brand and an agency at the form that qualifies them', () => {
    mount(<ContactInquiryForm startedAt={STARTED_AT} />)

    expect(
      screen.getByRole('link', { name: 'the application on the Diagnostic page' }),
    ).toHaveAttribute('href', '/diagnostic#apply')
    expect(screen.getByRole('link', { name: 'the agency inquiry' })).toHaveAttribute(
      'href',
      '/for-agencies#partnership-inquiry',
    )
  })
})
