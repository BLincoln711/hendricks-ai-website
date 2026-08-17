'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'

import { primaryNavigation } from '@/config/navigation'
import { cn } from '@/lib/utils/cn'

/**
 * Desktop navigation.
 *
 * The Solutions group is a CSS-driven disclosure rather than a menu widget: the
 * trigger is a real link to /solutions, the panel opens on hover and on focus
 * within, and every child is a plain link. That keeps keyboard behaviour
 * predictable without adopting menu semantics that would demand arrow-key
 * handling (docs/13 §12).
 */
export function DesktopNavigation() {
  const pathname = usePathname()

  const isCurrent = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(`${href}/`))

  return (
    <nav aria-label="Primary navigation" className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {primaryNavigation.map((item) => (
          <li key={item.href} className={cn(item.children && 'group relative')}>
            <Link
              href={item.href}
              aria-current={isCurrent(item.href) ? 'page' : undefined}
              className={cn(
                'inline-flex h-10 items-center gap-1 rounded-[var(--radius-control)] px-3 text-[0.9375rem] font-medium transition-colors duration-[var(--duration-micro)]',
                isCurrent(item.href)
                  ? 'text-[var(--color-blue)]'
                  : 'text-[var(--color-navy)] hover:text-[var(--color-blue)]',
              )}
            >
              {item.label}
              {item.children ? (
                <ChevronDown
                  className="size-3.5 transition-transform duration-[var(--duration-micro)] group-hover:rotate-180 group-focus-within:rotate-180 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              ) : null}
            </Link>

            {item.children ? (
              <div
                className={cn(
                  'invisible absolute top-full left-0 z-40 w-80 pt-2 opacity-0 transition-[opacity,visibility] duration-[var(--duration-micro)]',
                  'group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100',
                )}
              >
                <ul className="flex flex-col gap-1 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-2 shadow-[0_12px_32px_-12px_rgba(7,26,43,0.22)]">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        aria-current={isCurrent(child.href) ? 'page' : undefined}
                        className="flex flex-col gap-0.5 rounded-[var(--radius-control)] px-3 py-2.5 transition-colors hover:bg-[var(--color-soft)]"
                      >
                        <span className="text-[0.9375rem] font-medium text-[var(--color-navy)]">
                          {child.label}
                        </span>
                        {child.description ? (
                          <span className="text-[0.8125rem] leading-snug text-[var(--color-slate)]">
                            {child.description}
                          </span>
                        ) : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </nav>
  )
}
