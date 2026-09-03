import { HeaderCta } from '@/components/layout/nav-link'
import { PrimaryNav } from '@/components/layout/primary-nav'
import { WordmarkLink } from '@/components/layout/wordmark'

/**
 * The masthead (canvas `_canvas.html`; `_canvas.css` section 5).
 *
 * A 62 px bar, sticky, translucent over the one ground with a hairline under
 * it. Nothing shrinks, tints or casts a shadow on scroll. The row is the
 * wordmark, then the six routes, then the button; below 900 px the routes
 * collapse into the Menu disclosure that `PrimaryNav` owns, and the button
 * stays in the bar.
 *
 * `--header-height` is the single source: `globals.css` reads it for
 * `scroll-padding-top` and `--stick` steps above it for `scroll-margin-top`.
 * Below 360 px the canvas gives the bar its own vertical padding and lets its
 * content set the box, because the locked D-F button label wraps there and
 * neither the label nor the link may go. Tailwind's `max-*` variant is
 * exclusive, so 22.5rem is the 359 px band the token file writes as
 * `max-width: 22.4375rem`.
 */
export function SiteHeader() {
  return (
    <header
      className="sticky top-0 z-[var(--z-header)] border-b border-[var(--header-edge)] bg-[color-mix(in_srgb,var(--header-bg)_var(--header-veil),transparent)] [backdrop-filter:var(--header-blur)]"
    >
      <div className="mx-auto flex h-header max-w-site items-center gap-[var(--header-gap)] pr-pad pl-rail max-[22.5rem]:h-auto max-[22.5rem]:min-h-header max-[22.5rem]:py-[9px]">
        <WordmarkLink />
        <PrimaryNav />
        <HeaderCta />
      </div>
    </header>
  )
}
