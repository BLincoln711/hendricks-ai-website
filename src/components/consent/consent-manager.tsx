'use client'

import * as Dialog from '@radix-ui/react-dialog'
import Link from 'next/link'
import { X } from 'lucide-react'
import { useCallback, useId, useRef, useState } from 'react'

import { useConsent } from '@/components/consent/consent-provider'
import { useAnnounce } from '@/components/layout/live-region'
import { Button } from '@/components/ui/button'
import { banner, preferences, statusAnnouncement } from '@/content/consent'
import type { ConsentDecision, ConsentSource } from '@/lib/consent/state'

/**
 * Consent sheet and preferences dialog (09 5.6, 5.48; 16 decision 1, KF-03,
 * KF-07, MG-03; legal/01 sections 9 and 10).
 *
 * Always mounted so the footer button has something to open on every route.
 * Rules that drive the markup more than anything else:
 *
 * - The three sheet buttons are one variant, one height and one font size, and
 *   reject and accept share one-click cost. Any styling change that makes
 *   accept easier than reject is a compliance defect, not a design preference.
 * - Nothing dismisses the sheet without recording a decision. There is no close
 *   control on it, because closing must not be read as consent.
 * - The sheet is content-fit with a `min(360px, 40vh)` cap below 1024 px and a
 *   single-row bar from 1024 px. If the body outgrows the cap only the body
 *   scrolls; the title and the button row stay pinned, so no decision button
 *   ever sits below an internal scroll fold.
 * - The sheet never steals focus on mount. After a decision, focus moves to
 *   `main#main` without scrolling and the saved-choice line is announced.
 */
export function ConsentManager() {
  const { status, gpc, analyticsGranted, isPreferencesOpen, openPreferences, closePreferences, decide } =
    useConsent()
  const announce = useAnnounce()

  const [draftAnalytics, setDraftAnalytics] = useState(false)
  const analyticsToggleId = useId()
  const sheetTitleId = useId()

  /*
   * The element focused when the dialog opened. The dialog is controlled with
   * no `Dialog.Trigger`, and Radix's modal content would otherwise hand focus
   * to that missing trigger on close, so the close handler restores it here:
   * to the opener (Manage choices or the footer's Privacy Choices button), or
   * to `main` when a decision has since unmounted the sheet (11 section 4).
   */
  const opener = useRef<Element | null>(null)

  const focusMain = () => {
    document.getElementById('main')?.focus({ preventScroll: true })
  }

  const record = (analytics: ConsentDecision, source: Exclude<ConsentSource, 'gpc'>) => {
    decide(analytics, source)
    announce(analytics === 'granted' ? statusAnnouncement.granted : statusAnnouncement.denied)
    if (source === 'banner') focusMain()
  }

  /*
   * Publishes the sheet's height so `body` can reserve room for it. A ref
   * callback rather than an effect, so the reservation is released the moment
   * the sheet unmounts instead of one paint later.
   */
  const reserveBannerSpace = useCallback((node: HTMLElement | null) => {
    if (node === null) return undefined

    const observer = new ResizeObserver(([entry]) => {
      const height = entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height
      document.documentElement.style.setProperty('--consent-banner-height', `${height}px`)
    })
    observer.observe(node)

    return () => {
      observer.disconnect()
      document.documentElement.style.removeProperty('--consent-banner-height')
    }
  }, [])

  const handlePreferencesChange = (open: boolean) => {
    if (open) {
      // Reflects the recorded decision rather than defaulting to on, so the
      // panel never shows a pre-selected analytics toggle.
      setDraftAnalytics(analyticsGranted)
      openPreferences()
      return
    }
    // Escape and the close control leave the existing decision untouched.
    closePreferences()
  }

  const handleCloseAutoFocus = (event: Event) => {
    event.preventDefault()
    if (opener.current instanceof HTMLElement && opener.current.isConnected) {
      opener.current.focus()
      return
    }
    focusMain()
  }

  return (
    <>
      {status === 'undecided' ? (
        <section
          ref={reserveBannerSpace}
          aria-labelledby={sheetTitleId}
          className="consent-sheet fixed inset-x-0 bottom-0 z-[var(--z-consent)] grid max-h-[var(--consent-sheet-max)] grid-rows-[auto_minmax(0,1fr)_auto] gap-3 border-t border-[var(--consent-edge)] bg-[var(--consent-bg)] px-gutter py-4 text-[var(--consent-fg)] lg:max-h-none lg:grid-cols-[minmax(0,1fr)_auto] lg:grid-rows-none lg:items-center lg:gap-x-8 lg:gap-y-1 lg:[grid-template-areas:'title_actions'_'body_actions']"
        >
          <p id={sheetTitleId} className="text-small font-medium text-ink lg:[grid-area:title]">
            {banner.title}
          </p>

          <div className="measure overflow-y-auto lg:[grid-area:body]">
            <p className="text-small">
              {banner.body}{' '}
              <Link
                href={banner.privacyLink.href}
                className="text-link underline decoration-[length:var(--link-underline-width)] underline-offset-[var(--link-underline-offset)] hover:decoration-[length:var(--link-underline-hover-width)]"
              >
                {banner.privacyLink.label}
              </Link>
            </p>
          </div>

          <div className="grid gap-[var(--target-clearance)] sm:grid-cols-3 lg:[grid-area:actions]">
            <Button
              type="button"
              variant="secondary"
              size="small"
              className="h-auto min-h-[var(--consent-button-height)]"
              onClick={() => record('denied', 'banner')}
            >
              {banner.reject}
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="small"
              aria-haspopup="dialog"
              className="h-auto min-h-[var(--consent-button-height)]"
              onClick={() => handlePreferencesChange(true)}
            >
              {banner.manage}
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="small"
              className="h-auto min-h-[var(--consent-button-height)]"
              onClick={() => record('granted', 'banner')}
            >
              {banner.accept}
            </Button>
          </div>
        </section>
      ) : null}

      <Dialog.Root open={isPreferencesOpen} onOpenChange={handlePreferencesChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[var(--z-dialog)] bg-[color-mix(in_srgb,var(--surface-plate)_55%,transparent)]" />
          {/*
            `aria-modal` is set explicitly. Radix already hides the rest of the
            document from assistive technology and traps focus, but docs/16
            section 6 names the attribute as a requirement in its own right.
          */}
          <Dialog.Content
            aria-modal="true"
            onOpenAutoFocus={() => {
              opener.current = document.activeElement
            }}
            onCloseAutoFocus={handleCloseAutoFocus}
            className="consent-dialog fixed inset-x-0 bottom-0 z-[var(--z-dialog)] flex max-h-[90vh] w-full flex-col rounded-t-plate bg-surface-raised shadow-dialog md:inset-0 md:m-auto md:h-fit md:max-w-lg md:rounded-plate"
          >
            <div className="flex shrink-0 items-start justify-between gap-6 border-b border-rule p-6 md:p-8">
              <div className="flex flex-col gap-2">
                <Dialog.Title className="text-h3 text-ink">{preferences.title}</Dialog.Title>
                <Dialog.Description className="text-small text-ink-2">
                  {preferences.intro}
                </Dialog.Description>
              </div>
              <Dialog.Close
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-small text-ink-2 transition-colors hover:bg-surface-tint hover:text-ink"
                aria-label="Close privacy choices"
              >
                <X className="size-5" aria-hidden="true" focusable="false" />
              </Dialog.Close>
            </div>

            <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto p-6 md:p-8">
              {preferences.categories.map((category, index) => {
                const isAnalytics = index === 1

                return (
                  <div
                    key={category.name}
                    className="flex flex-col gap-3 rounded-tile border border-rule p-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                      <h3 className="text-h4 text-ink">{category.name}</h3>
                      <p className="text-coordinate text-ink-2">{category.status}</p>
                    </div>

                    <p className="text-small text-ink-body">{category.description}</p>

                    {category.examples.length > 0 ? (
                      <ul className="flex flex-col gap-1.5 text-small text-ink-body">
                        {category.examples.map((example) => (
                          <li key={example} className="flex items-start gap-2">
                            <span
                              aria-hidden="true"
                              className="mt-[0.5em] size-1.5 shrink-0 rounded-full bg-rule-strong"
                            />
                            {example}
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {isAnalytics && !gpc ? (
                      <label
                        htmlFor={analyticsToggleId}
                        className="flex min-h-11 cursor-pointer items-center gap-3 border-t border-rule pt-4 text-small font-medium text-ink"
                      >
                        <input
                          id={analyticsToggleId}
                          type="checkbox"
                          checked={draftAnalytics}
                          onChange={(event) => setDraftAnalytics(event.target.checked)}
                          className="size-6 shrink-0 accent-[var(--input-check-checked-bg)]"
                        />
                        Allow optional analytics
                      </label>
                    ) : null}
                  </div>
                )
              })}

              {gpc ? (
                <p className="rounded-tile border-l-2 border-ink bg-surface-tint p-5 text-small text-ink-body">
                  {preferences.gpcNotice}
                </p>
              ) : null}

              <p className="text-small text-ink-2">{preferences.footerStatement}</p>
            </div>

            {gpc ? null : (
              // Three secondary buttons of one height in one pinned row; the
              // tighter padding keeps all three on one line inside the 32rem panel.
              <div className="flex shrink-0 flex-col gap-3 border-t border-rule p-6 sm:flex-row sm:justify-end md:p-8">
                <Button
                  type="button"
                  variant="secondary"
                  size="small"
                  className="px-3"
                  onClick={() => record('denied', 'preferences')}
                >
                  {preferences.reject}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="small"
                  className="px-3"
                  onClick={() => record(draftAnalytics ? 'granted' : 'denied', 'preferences')}
                >
                  Save choices
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="small"
                  className="px-3"
                  onClick={() => record('granted', 'preferences')}
                >
                  {preferences.accept}
                </Button>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}
