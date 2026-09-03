'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { ChevronDown, Menu, X } from 'lucide-react'
import { useId, useState } from 'react'

import { HeaderCtaLink, NavLink } from '@/components/layout/nav-link'
import { Wordmark } from '@/components/layout/wordmark'
import { buttonVariants } from '@/components/ui/button'
import { primaryNavigation } from '@/config/navigation'
import { cn } from '@/lib/utils/cn'

/**
 * Mobile sheet (09 5.2), rendered below 1024 px only.
 *
 * Radix Dialog provides the focus trap, Escape handling and focus restoration
 * to the menu button (16 KF-04); on open, focus lands on the close control,
 * the first focusable element. Every link is wrapped in Dialog.Close so
 * navigating closes the sheet through Radix's own lifecycle. The six entries
 * keep header order, Solutions as a disclosure, and the button is the seventh
 * entry, full width after the links. The disclosure state lives in
 * `SheetNavigation`, mounted inside `Dialog.Content`, so it resets every time
 * the sheet closes.
 */

const CONTROL_CLASS =
  'inline-flex size-11 shrink-0 items-center justify-center rounded-small border border-rule-strong text-ink'

const ITEM_CLASS =
  'flex min-h-control w-full items-center rounded-small px-1 font-medium text-link aria-[current=page]:underline aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-[6px]'

export function MobileNavigation() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className={cn(CONTROL_CLASS, 'lg:hidden')} aria-label="Open menu">
        <Menu className="size-5" aria-hidden="true" focusable="false" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="mobile-sheet-overlay fixed inset-0 z-[var(--z-dialog)] bg-[color-mix(in_srgb,var(--bg)_72%,transparent)] lg:hidden" />
        <Dialog.Content className="mobile-sheet fixed inset-y-0 right-0 z-[var(--z-dialog)] flex w-full flex-col overflow-y-auto px-gutter pt-3 pb-6 shadow-dialog min-[30rem]:max-w-96 lg:hidden">
          <Dialog.Title className="sr-only">Site navigation</Dialog.Title>
          <Dialog.Description className="sr-only">
            Primary navigation for the Hendricks website.
          </Dialog.Description>

          <div className="flex min-h-header items-center justify-between">
            <Wordmark decorative />
            <Dialog.Close className={CONTROL_CLASS} aria-label="Close menu">
              <X className="size-4" aria-hidden="true" focusable="false" />
            </Dialog.Close>
          </div>

          <SheetNavigation />

          <Dialog.Close asChild>
            <HeaderCtaLink className={cn(buttonVariants(), 'mt-6 w-full')} />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function SheetNavigation() {
  const subListId = useId()
  const [solutionsOpen, setSolutionsOpen] = useState(false)

  return (
    <nav aria-label="Primary navigation" className="flex-1">
      <ul className="grid">
        {primaryNavigation.map((item) => (
          <li key={item.href} className="border-t border-rule last:border-b">
            {item.children ? (
              <>
                <div className="flex items-center gap-[var(--target-clearance)]">
                  <Dialog.Close asChild>
                    <NavLink href={item.href} className={cn(ITEM_CLASS, 'flex-1')}>
                      {item.label}
                    </NavLink>
                  </Dialog.Close>
                  <button
                    type="button"
                    aria-expanded={solutionsOpen}
                    aria-controls={subListId}
                    aria-label="Show the four solutions"
                    onClick={() => setSolutionsOpen((value) => !value)}
                    className="inline-flex size-11 shrink-0 items-center justify-center rounded-small text-ink"
                  >
                    <ChevronDown
                      className={cn(
                        'size-3.5 transition-transform duration-[var(--duration-micro)] ease-standard',
                        solutionsOpen && 'rotate-180',
                      )}
                      aria-hidden="true"
                      focusable="false"
                    />
                  </button>
                </div>
                <ul id={subListId} hidden={!solutionsOpen} className="grid pb-2 pl-4">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Dialog.Close asChild>
                        <NavLink href={child.href} className={cn(ITEM_CLASS, 'min-h-target text-small')}>
                          {child.label}
                        </NavLink>
                      </Dialog.Close>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <Dialog.Close asChild>
                <NavLink href={item.href} className={ITEM_CLASS}>
                  {item.label}
                </NavLink>
              </Dialog.Close>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
