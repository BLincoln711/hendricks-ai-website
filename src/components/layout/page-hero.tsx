import type { ReactNode } from 'react'

import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import { Container } from '@/components/layout/container'
import { Eyebrow } from '@/components/layout/eyebrow'
import { Grid } from '@/components/layout/grid'
import { Section } from '@/components/layout/section'
import { CtaGroup, PrimaryCta } from '@/components/ui/cta'
import type { Cta } from '@/components/ui/cta'
import type { BreadcrumbEntry } from '@/lib/seo/json-ld'

/**
 * Interior page hero (09 5.49): every route but the homepage, light only.
 *
 * Breadcrumbs, then the eyebrow as a `p` sibling of the H1 so the page's only
 * level-1 heading reads as the headline alone (16 SM-02; the proper noun
 * moves into the H1 sentence, D12), an optional subtitle at the H3 size, the
 * lead paragraphs, the CTA row and an optional visual. From 1024 px the copy
 * takes columns 1 to 7 and the visual 8 to 12; below, one column with the
 * visual after the CTA row. The `section` is labelled by `#page-title`.
 *
 * The homepage composes its own hero (09 5.47) because it carries Plate 01.
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  lead,
  primaryCta,
  secondaryCta,
  breadcrumbs,
  path,
  visual,
  children,
}: {
  eyebrow: string
  title: string
  subtitle?: string
  lead: readonly string[]
  primaryCta?: Cta
  secondaryCta?: Cta
  breadcrumbs?: BreadcrumbEntry[]
  /** Current route path, so the BreadcrumbList gets an `@id` the page's
   *  WebPage node can point at through `breadcrumb`. */
  path?: string
  visual?: ReactNode
  children?: ReactNode
}) {
  return (
    <Section variant="field" size="major" ariaLabelledBy="page-title">
      <Container>
        <div className="flex flex-col gap-8">
          {breadcrumbs ? <Breadcrumbs items={breadcrumbs} path={path} /> : null}

          <Grid className="gap-y-10">
            <div className={visual ? 'col-span-full flex flex-col gap-6 lg:col-[1/8]' : 'col-span-full flex flex-col gap-6'}>
              <Eyebrow>{eyebrow}</Eyebrow>

              <h1 id="page-title" className="text-h1 max-w-[var(--measure-h1)] text-ink">
                {title}
              </h1>

              {subtitle ? <p className="text-h3 max-w-[var(--measure-h2)] text-ink">{subtitle}</p> : null}

              <div className="flex flex-col gap-4">
                {lead.map((paragraph) => (
                  <p key={paragraph} className="text-lead measure-wide text-ink">
                    {paragraph}
                  </p>
                ))}
              </div>

              {children}

              {primaryCta ? (
                <CtaGroup className="mt-2">
                  <PrimaryCta cta={primaryCta} />
                  {secondaryCta ? <PrimaryCta cta={secondaryCta} variant="secondary" /> : null}
                </CtaGroup>
              ) : null}
            </div>

            {visual ? <div className="col-span-full min-w-0 lg:col-[8/13]">{visual}</div> : null}
          </Grid>
        </div>
      </Container>
    </Section>
  )
}
