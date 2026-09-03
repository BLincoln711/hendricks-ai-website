import type { ReactNode } from 'react'

import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import { Station } from '@/components/sections/station'
import { PrimaryCta } from '@/components/ui/cta'
import type { Cta } from '@/components/ui/cta'
import { TwoTone, type TwoToneSentence } from '@/components/ui/two-tone'
import type { BreadcrumbEntry } from '@/lib/seo/json-ld'

/**
 * The interior route's hero (canvas `_canvas.css` section 8, `.page-hero`).
 *
 * Breadcrumbs, one eyebrow, one H1, one lead and nothing else: no instrument,
 * no bleed, no figure. The homepage composes its own hero because it carries
 * Plate 01; every other route opens with words.
 *
 * The eyebrow is a `p` sibling of the H1 rather than part of it, so the page's
 * only level-1 heading reads as the headline alone. `children` is where the
 * answer-first block goes, between the lead and the CTA row, which is the order
 * the converted pages carry.
 */
export function CanvasPageHero({
  eyebrow,
  title,
  lead,
  breadcrumbs,
  path,
  primaryCta,
  secondaryCta,
  foot,
  children,
  id = 'hero',
}: {
  eyebrow: string
  title: string
  /** One lead sentence, either flat or in the two-tone form. */
  lead?: string | TwoToneSentence
  breadcrumbs: BreadcrumbEntry[]
  /** Current route path, so the BreadcrumbList gets a stable `@id`. */
  path: string
  primaryCta?: Cta
  secondaryCta?: Cta
  /** The one line under the hairline that closes the hero. */
  foot?: ReactNode
  children?: ReactNode
  id?: string
}) {
  return (
    <Station id={id} ariaLabelledBy="page-title" className="page-hero">
      <Breadcrumbs items={breadcrumbs} path={path} />

      <p className="text-eyebrow mb-[18px] text-ink-2">{eyebrow}</p>

      <h1 id="page-title" className="text-h1 text-ink">
        {title}
      </h1>

      {typeof lead === 'string' ? (
        <p className="text-lead mt-6 max-w-[66ch] text-ink">{lead}</p>
      ) : lead ? (
        <TwoTone sentence={lead} className="text-lead mt-6 max-w-[66ch]" />
      ) : null}

      {children}

      {primaryCta ? (
        <div className="cta-row mt-[30px]">
          <PrimaryCta cta={primaryCta} />
          {secondaryCta ? <PrimaryCta cta={secondaryCta} variant="secondary" /> : null}
        </div>
      ) : null}

      {foot ? <div className="page-hero-foot">{foot}</div> : null}
    </Station>
  )
}
