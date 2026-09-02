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
        <Icon className="size-4" aria-hidden="true" focusable="false" />
        {cta.external ? <span className="sr-only">(opens in a new tab)</span> : null}
      </Link>
    </Button>
  )
}

/**
 * Standalone tertiary link (09 5.11): text plus arrow in a 44 px box, ink
 * with the 1 px underline, never the arrow alone. An external destination
 * takes the arrow-up-right glyph and the sr-only note.
 *
 * `onNavy` is a no-op kept for the call sites the page PRs close (handoff
 * 5.3): `--link` re-scopes to field under `.on-plate`.
 */
export function TextCta({
  cta,
  className,
}: {
  cta: Cta
  /** @deprecated No-op. `.on-plate` re-scopes `--link`. */
  onNavy?: boolean
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
    })
  }

  return (
    <Link
      href={cta.href}
      onClick={handleClick}
      data-hendricks-cta=""
      className={cn('link link-standalone', className)}
      {...(cta.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {cta.label}
      <Icon className="link-arrow size-4 motion-reduce:transition-none" aria-hidden="true" focusable="false" />
      {cta.external ? <span className="sr-only">(opens in a new tab)</span> : null}
    </Link>
  )
}

/**
 * Maximum two CTAs; the first is visually primary (docs/13 §4).
 *
 * Buttons wrap onto their own row rather than shrinking, because the Diagnostic
 * label is long by design and compressing it breaks the phrase mid-line. They
 * must not be `whitespace-nowrap`: that sets a min-content width wider than a
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
