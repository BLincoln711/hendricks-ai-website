import type { ReactNode } from 'react'

import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { CtaGroup, PrimaryCta } from '@/components/ui/cta'
import type { Cta } from '@/components/ui/cta'
import { SignalDot } from '@/components/visuals/signal-dot'
import type { BreadcrumbEntry } from '@/lib/seo/json-ld'
import { cn } from '@/lib/utils/cn'

/**
 * Commercial and form page hero (docs/13 §5, docs/14 §3).
 *
 * The homepage builds its own hero because it carries the Selection Map and a
 * two-column composition no other page needs.
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  lead,
  primaryCta,
  secondaryCta,
  breadcrumbs,
  visual,
  children,
  theme = 'navy',
}: {
  eyebrow: string
  title: string
  subtitle?: string
  lead: readonly string[]
  primaryCta?: Cta
  secondaryCta?: Cta
  breadcrumbs?: BreadcrumbEntry[]
  visual?: ReactNode
  children?: ReactNode
  theme?: 'navy' | 'field'
}) {
  const onNavy = theme === 'navy'

  return (
    <Section variant={onNavy ? 'navy' : 'field'} size="major" ariaLabelledBy="page-title">
      <Container>
        <div className="flex flex-col gap-8">
          {breadcrumbs ? <Breadcrumbs items={breadcrumbs} onNavy={onNavy} /> : null}

          <div
            className={cn(
              'grid items-start gap-10',
              visual ? 'lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-16' : '',
            )}
          >
            <div className="flex flex-col gap-6">
              <p
                className={cn(
                  'text-eyebrow flex items-center gap-2',
                  onNavy ? 'text-[var(--color-cyan)]' : 'text-[var(--color-blue)]',
                )}
              >
                <SignalDot size={6} tone={onNavy ? 'cyan' : 'blue'} />
                {eyebrow}
              </p>

              <h1
                id="page-title"
                className={cn(
                  'text-h1 max-w-[24ch]',
                  onNavy ? 'text-[var(--color-field)]' : 'text-[var(--color-navy)]',
                )}
              >
                {title}
              </h1>

              {subtitle ? (
                <p
                  className={cn(
                    'text-h3 max-w-[30ch]',
                    onNavy
                      ? 'text-[color-mix(in_srgb,var(--color-field)_88%,transparent)]'
                      : 'text-[var(--color-navy)]',
                  )}
                >
                  {subtitle}
                </p>
              ) : null}

              <div className="flex flex-col gap-4">
                {lead.map((paragraph) => (
                  <p
                    key={paragraph}
                    className={cn(
                      'text-lead measure',
                      onNavy
                        ? 'text-[color-mix(in_srgb,var(--color-field)_74%,transparent)]'
                        : 'text-[var(--color-slate)]',
                    )}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {children}

              {primaryCta ? (
                <CtaGroup className="mt-2">
                  <PrimaryCta cta={primaryCta} />
                  {secondaryCta ? (
                    <PrimaryCta
                      cta={secondaryCta}
                      variant={onNavy ? 'outlineOnNavy' : 'secondary'}
                    />
                  ) : null}
                </CtaGroup>
              ) : null}
            </div>

            {visual}
          </div>
        </div>
      </Container>
    </Section>
  )
}
