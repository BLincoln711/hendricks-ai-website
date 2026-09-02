import Link from 'next/link'

import { DesktopNavigation } from '@/components/layout/desktop-navigation'
import { MobileNavigation } from '@/components/layout/mobile-navigation'
import { WordmarkLink } from '@/components/layout/wordmark'
import { Container } from '@/components/layout/container'
import { buttonVariants } from '@/components/ui/button'
import { primaryCta } from '@/config/site'
import { cn } from '@/lib/utils/cn'

/**
 * Site header (docs/04 §11).
 *
 * Sticky and always solid. A transparent-over-hero treatment was considered and
 * rejected: the homepage hero is navy while inner pages are light, so a
 * transparent header would need to swap wordmark tone on scroll — motion that
 * buys nothing and risks a contrast failure mid-transition.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[color-mix(in_srgb,white_88%,transparent)] backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between gap-6 md:h-[4.75rem]">
          <WordmarkLink priority />

          <div className="flex items-center gap-2">
            <DesktopNavigation />

            <Link
              href={primaryCta.href}
              className={cn(buttonVariants({ size: 'small' }), 'hidden lg:inline-flex')}
            >
              {primaryCta.label}
            </Link>

            <MobileNavigation />
          </div>
        </div>
      </Container>
    </header>
  )
}
