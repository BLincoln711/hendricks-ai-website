import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ObservationForm } from '@/components/observation/observation-form'
import { ObservationDisclosure } from '@/components/observation/observation-result'
import { disclosure, formCopy } from '@/content/pages/observe'

describe('ObservationForm', () => {
  it('asks for a brand and a category with one primary action', () => {
    render(<ObservationForm />)

    const form = screen.getByRole('form')
    expect(form).toHaveAttribute('method', 'get')
    expect(form).toHaveAttribute('action', '/observe')

    expect(screen.getByLabelText(new RegExp(formCopy.brandLabel))).toBeRequired()
    expect(screen.getByLabelText(new RegExp(formCopy.categoryLabel))).toBeRequired()
    expect(screen.getByRole('button', { name: formCopy.submit })).toBeInTheDocument()
  })

  it('shows empty-state field errors without inventing a result', () => {
    render(<ObservationForm errors={{ brand: 'brand', category: 'category' }} />)

    expect(screen.getByText(formCopy.brandError)).toBeInTheDocument()
    expect(screen.getByText(formCopy.categoryError)).toBeInTheDocument()
    expect(screen.queryByText('shortlisted')).not.toBeInTheDocument()
  })
})

describe('ObservationDisclosure', () => {
  it('names the later queue and keeps Gemini the only unprobed engine', () => {
    render(<ObservationDisclosure />)

    expect(screen.getByText(disclosure.sample)).toBeInTheDocument()
    expect(disclosure.sample).toContain('Google AI Overviews')
    expect(disclosure.sample).toContain('ChatGPT')
    expect(disclosure.sample).toContain('Perplexity')
    expect(disclosure.sample).toContain('Gemini is not probed in this sample')
    expect(disclosure.sample).not.toMatch(/Perplexity and Gemini|Gemini and Perplexity/)
    expect(disclosure.sample).not.toContain('unmeasured')
    expect(screen.getByRole('link', { name: 'Start with a Search Intelligence Diagnostic' })).toHaveAttribute(
      'href',
      '/diagnostic',
    )
  })
})
