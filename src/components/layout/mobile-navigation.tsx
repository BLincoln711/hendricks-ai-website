'use client'

import * as Dialog from '@radix-ui/react-dialog'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

import { Wordmark } from '@/components/layout/wordmark'
import { buttonVariants } from '@/components/ui/button'
import { primaryNavigation } from '@/config/navigation'
import { primaryCta } from '@/config/site'
import { cn } from '@/lib/utils/cn'

/**
 * Mobile navigation.
 *
 * Radix Dialog provides the focus trap, Escape handling, and focus restoration
 * to the trigger. Every link is wrapped in Dialog.Close so navigating closes the
 * sheet through Radix's own lifecycle — that keeps focus restoration correct and
 * avoids resetting state from an effect on pathname change. No behaviour depends
 * on hover (docs/13 §12).
 */
export function MobileNavigation() {
  const pathname = usePathname()

  return (
    <Dialog.Root>
      <Dialog.Trigger
        className="inline-flex size-11 items-center justify-center rounded-[var(--radius-control)] text-[var(--color-navy)] transition-colors hover:bg-[var(--color-soft)] lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="size-6" aria-hidden="true" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-[color-mix(in_srgb,var(--color-navy)_45%,transparent)] lg:hidden" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex h-full w-full max-w-sm flex-col overflow-y-auto bg-white shadow-xl lg:hidden">
          <Dialog.Title className="sr-only">Site navigation</Dialog.Title>
          <Dialog.Description className="sr-only">
            Primary navigation for the Hendricks website.
          </Dialog.Description>

          <div className="flex h-16 items-center justify-between border-b border-[var(--color-border)] px-5">
            <Wordmark width={124} />
            <Dialog.Close
              className="inline-flex size-11 items-center justify-center rounded-[var(--radius-control)] text-[var(--color-navy)] transition-colors hover:bg-[var(--color-soft)]"
              aria-label="Close menu"
            >
              <X className="size-6" aria-hidden="true" />
            </Dialog.Close>
          </div>

          <nav aria-label="Primary navigation" className="flex-1 px-5 py-6">
            <ul className="flex flex-col gap-1">
              {primaryNavigation.map((item) => (
                <li key={item.href}>
                  <Dialog.Close asChild>
                    <Link
                      href={item.href}
                      aria-current={pathname === item.href ? 'page' : undefined}
                      className={cn(
                        'flex min-h-11 items-center rounded-[var(--radius-control)] px-3 text-[1.0625rem] font-medium text-[var(--color-navy)] transition-colors hover:bg-[var(--color-soft)]',
                        pathname === item.href && 'bg-[var(--color-soft)]',
                      )}
                    >
                      {item.label}
                    </Link>
                  </Dialog.Close>

                  {item.children ? (
                    <ul className="mt-1 mb-2 flex flex-col gap-0.5 border-l border-[var(--color-border)] pl-4">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Dialog.Close asChild>
                            <Link
                              href={child.href}
                              aria-current={pathname === child.href ? 'page' : undefined}
                              className="flex min-h-11 items-center rounded-[var(--radius-control)] px-3 text-[0.9375rem] text-[var(--color-slate)] transition-colors hover:bg-[var(--color-soft)] hover:text-[var(--color-navy)]"
                            >
                              {child.label}
                            </Link>
                          </Dialog.Close>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-t border-[var(--color-border)] p-5">
            <Dialog.Close asChild>
              <Link href={primaryCta.href} className={cn(buttonVariants(), 'w-full')}>
                {primaryCta.label}
              </Link>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
