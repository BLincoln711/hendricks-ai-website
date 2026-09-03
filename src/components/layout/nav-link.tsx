'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ComponentPropsWithRef } from 'react'

import { buttonVariants } from '@/components/ui/button'
import { headerCtaHref, isCurrentRoute } from '@/config/navigation'
import { primaryCta } from '@/config/site'
import { cn } from '@/lib/utils/cn'

/**
 * The two links whose markup depends on the current route.
 *
 * `aria-current="page"` has to be set on the header, sheet and footer links
 * of the current route (16 KF-10), and the header button's href changes on
 * /diagnostic (14 DX-05). Both need `usePathname`, which only a client
 * component can read, so this file is the one client boundary the footer
 * touches; the footer itself stays a server component.
 */

type NavLinkProps = Omit<ComponentPropsWithRef<typeof Link>, 'href' | 'aria-current'> & {
  href: string
}

export function NavLink({ href, ...props }: NavLinkProps) {
  const pathname = usePathname()

  return (
    <Link href={href} aria-current={isCurrentRoute(pathname, href) ? 'page' : undefined} {...props} />
  )
}

type HeaderCtaLinkProps = Omit<ComponentPropsWithRef<'a'>, 'href' | 'children'>

/**
 * The masthead button's link (09 5.3). It stays in the bar at every width, so
 * there is one of it. On /diagnostic the destination is a fragment and the
 * element is a plain anchor: next/link handles a same-page hash itself and
 * leaves focus on the link, whereas the browser's own fragment navigation
 * moves focus to the `tabIndex={-1}` target (14 DX-25; 16 KF-07). `ref` and
 * handlers pass through so a `Slot` can wrap it.
 */
export function HeaderCtaLink(props: HeaderCtaLinkProps) {
  const href = headerCtaHref(usePathname())

  if (href.startsWith('#')) {
    return (
      <a href={href} {...props}>
        {primaryCta.label}
      </a>
    )
  }

  return (
    <Link href={href} {...props}>
      {primaryCta.label}
    </Link>
  )
}

/**
 * The masthead button (09 5.3; `_canvas.css` section 5). The label never varies
 * by route. `--button-height-masthead` is the masthead's own height role: the
 * canvas sets `.masthead .btn` shorter than the rest, and the token is where
 * that exception lives rather than in the shared compact size, which every
 * other small button reads.
 *
 * At the narrowest widths the canvas shrinks the label to 13.5 px in 12 px of
 * inline padding, because the label is locked and the link may not be hidden.
 * This takes that rule one step earlier, at 375 rather than the canvas's 360,
 * because the bitmap wordmark is wider than the canvas text mark and runs the
 * row out sooner. Tailwind's `max-*` variant is exclusive, so 23.5rem is the
 * 375 px band the token file writes as `max-width: 23.4375rem`.
 *
 * From there to 900 px the button takes whatever width the row leaves and
 * wraps inside the bar, exactly as the canvas does; the cap this replaces made
 * it narrower than the canvas between 400 and 480 px for no reason the design
 * gives. From 900 px the six route links join the row and the label holds one
 * line, which is the canvas bar at every width above that.
 */
export function HeaderCta({ className }: { className?: string }) {
  return (
    <HeaderCtaLink
      className={cn(
        buttonVariants({ size: 'small' }),
        'h-auto min-h-[var(--button-height-masthead)] max-[23.5rem]:px-3 max-[23.5rem]:py-[7px] max-[23.5rem]:text-[13.5px] max-[23.5rem]:leading-[1.2] min-[56.25rem]:whitespace-nowrap',
        className,
      )}
    />
  )
}
