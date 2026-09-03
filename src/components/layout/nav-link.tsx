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
 * The masthead button (09 5.3). The label never varies by route; below 480 px it
 * gives up its width and wraps to two lines inside `--button-height-masthead`
 * so the row fits 320 px beside the wordmark and the menu control. That token
 * is the masthead's own height role: the canvas sets `.masthead .btn` shorter
 * than the rest, and the token is where that exception lives rather than in the
 * shared compact size, which every other small button reads.
 */
export function HeaderCta({ className }: { className?: string }) {
  return (
    <HeaderCtaLink
      className={cn(
        buttonVariants({ size: 'small' }),
        'h-auto min-h-[var(--button-height-masthead)] max-[29.9375rem]:max-w-[10em] max-[29.9375rem]:px-2.5 max-[29.9375rem]:py-1.5 max-[29.9375rem]:leading-[1.15] min-[30rem]:shrink-0 min-[30rem]:whitespace-nowrap',
        className,
      )}
    />
  )
}
