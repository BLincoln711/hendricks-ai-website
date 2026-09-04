import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}))

import { ObservationForm } from '@/components/observation/observation-form'
import { ObservationDisclosure } from '@/components/observation/observation-result'
import { disclosure, formCopy } from '@/content/pages/observe'
import { observeCreatePath } from '@/lib/observation/handshake'

describe('ObservationForm', () => {
  it('asks for a brand and a category and names the handshake create path', () => {
    render(<ObservationForm />)

    expect(screen.getByRole('form')).toBeInTheDocument()
    expect(observeCreatePath).toBe('/api/observe/jobs')

    expect(screen.getByLabelText(new RegExp(formCopy.brandLabel))).toBeRequired()
    expect(screen.getByLabelText(new RegExp(formCopy.brandLabel))).toHaveAttribute('name', 'brand_name')
    expect(screen.getByLabelText(new RegExp(formCopy.categoryLabel))).toBeRequired()
    expect(screen.getByRole('button', { name: formCopy.submit })).toBeInTheDocument()
    expect(screen.getByText(formCopy.notice, { exact: false })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: formCopy.privacyLabel })).toHaveAttribute(
      'href',
      '/privacy',
    )
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
