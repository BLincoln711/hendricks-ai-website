import { Container } from '@/components/layout/container'
import { DesktopNavigation } from '@/components/layout/desktop-navigation'
import { MobileNavigation } from '@/components/layout/mobile-navigation'
import { HeaderCta } from '@/components/layout/nav-link'
import { WordmarkLink } from '@/components/layout/wordmark'

/**
 * Site header (09 5.1, 5.3; 11 section 4).
 *
 * Sticky with a permanent bottom hairline; nothing shrinks, tints or casts a
 * shadow on scroll. The row is `--header-height` (64 px; 76 from 48rem), the
 * one source `scroll-padding-top` also reads. From 1024 px: wordmark, the six
 * links, the button. Below: wordmark, the button, the menu control.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-[var(--z-header)] border-b border-[var(--header-edge)] bg-[var(--header-bg)]">
      <Container width="site">
        <div className="flex min-h-header items-center gap-[var(--header-gap)]">
          <WordmarkLink />
          <DesktopNavigation />
          <HeaderCta className="ml-auto lg:ml-0" />
          <MobileNavigation />
        </div>
      </Container>
    </header>
  )
}
