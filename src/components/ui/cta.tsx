'use client'

import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'

import { Button, type ButtonProps } from '@/components/ui/button'
import { isDiagnosticDestination, trackDiagnosticCtaClick } from '@/lib/analytics/diagnostic-cta'
import { trackEvent, type AudienceType } from '@/lib/analytics/events'
import { cn } from '@/lib/utils/cn'

export type Cta = {
  label: string
  href: string
  external?: boolean
  analytics?: {
    location: string
    audienceType?: AudienceType
    solutionName?: string
  }
}

/**
 * Client boundary exists only to dispatch the analytics event on click. The
 * anchor itself is a real link and navigates without JavaScript.
 */
export function PrimaryCta({
  cta,
  variant = 'primary',
  size,
  className,
}: {
  cta: Cta
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
  className?: string
}) {
  const Icon = cta.external ? ArrowUpRight : ArrowRight

  const handleClick = () => {
    if (typeof window !== 'undefined' && isDiagnosticDestination(cta.href, window.location.origin)) {
      trackDiagnosticCtaClick(window.location.pathname)
    }
    if (!cta.analytics) return
    trackEvent('primary_cta_click', {
      cta_label: cta.label,
      cta_location: cta.analytics.location,
      destination_url: cta.href,
      ...(cta.analytics.audienceType ? { audience_type: cta.analytics.audienceType } : {}),
      ...(cta.analytics.solutionName ? { solution_name: cta.analytics.solutionName } : {}),
    })
  }

  return (
    <Button asChild variant={variant} size={size} className={className}>
      <Link
        href={cta.href}
        onClick={handleClick}
        data-hendricks-cta=""
        {...(cta.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {cta.label}
        <Icon className="size-4" aria-hidden="true" />
        {cta.external ? <span className="sr-only">(opens in a new tab)</span> : null}
      </Link>
    </Button>
  )
}

/** Tertiary text link. Never relies on the arrow alone (docs/04 §10). */
export function TextCta({
  cta,
  onNavy = false,
  className,
}: {
  cta: Cta
  onNavy?: boolean
  className?: string
}) {
  const handleClick = () => {
    if (typeof window !== 'undefined' && isDiagnosticDestination(cta.href, window.location.origin)) {
      trackDiagnosticCtaClick(window.location.pathname)
    }
    if (!cta.analytics) return
    trackEvent('primary_cta_click', {
      cta_label: cta.label,
      cta_location: cta.analytics.location,
      destination_url: cta.href,
    })
  }

  return (
    <Link
      href={cta.href}
      onClick={handleClick}
      data-hendricks-cta=""
      className={cn(
        'group inline-flex items-center gap-1.5 font-medium underline decoration-1 underline-offset-4 transition-colors duration-[var(--duration-micro)]',
        onNavy
          ? 'text-[var(--color-cyan)] hover:text-[var(--color-field)]'
          : 'text-[var(--color-blue)] hover:text-[var(--color-blue-hover)]',
        className,
      )}
    >
      {cta.label}
      <ArrowRight
        className="size-4 transition-transform duration-[var(--duration-micro)] group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
        aria-hidden="true"
      />
    </Link>
  )
}

/**
 * Maximum two CTAs; the first is visually primary (docs/13 §4).
 *
 * Buttons wrap onto their own row rather than shrinking, because the Diagnostic
 * label is long by design and compressing it breaks the phrase mid-line. They
 * must not be `whitespace-nowrap` — that sets a min-content width wider than a
 * 320px viewport and pushes the whole column into horizontal overflow.
 */
export function CtaGroup({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'flex flex-col flex-wrap items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4 sm:[&>*]:shrink-0',
        className,
      )}
    >
      {children}
    </div>
  )
}
