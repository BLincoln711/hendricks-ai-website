'use client'

import * as Dialog from '@radix-ui/react-dialog'
import Link from 'next/link'
import { X } from 'lucide-react'
import { useCallback, useId, useState } from 'react'

import { useConsent } from '@/components/consent/consent-provider'
import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { banner, preferences, statusAnnouncement } from '@/content/consent'
import type { ConsentDecision } from '@/lib/consent/state'

/**
 * Consent banner and Privacy Choices modal (docs/16 §6, legal/01 §9–§10).
 *
 * Always mounted so the live region survives the banner being dismissed and the
 * footer button has something to open on every route.
 *
 * Two rules drive the markup more than anything else:
 *
 * - Reject and accept use the same variant, the same size, and one click each.
 *   Any styling change that makes accept easier than reject is a compliance
 *   defect, not a design preference (docs/16 §6).
 * - Nothing dismisses the banner without recording a decision. There is no close
 *   control on it, because closing must not be read as consent (legal/01 §9).
 */
export function ConsentManager() {
  const { status, gpc, analyticsGranted, isPreferencesOpen, openPreferences, closePreferences, decide } =
    useConsent()

  const [announcement, setAnnouncement] = useState('')
  const [draftAnalytics, setDraftAnalytics] = useState(false)
  const analyticsToggleId = useId()

  const record = (analytics: ConsentDecision, source: 'banner' | 'preferences') => {
    decide(analytics, source)
    setAnnouncement(
      analytics === 'granted' ? statusAnnouncement.granted : statusAnnouncement.denied,
    )
  }

  /*
   * Publishes the banner's height so `body` can reserve room for it. A ref
   * callback rather than an effect, so the reservation is released the moment
   * the banner unmounts instead of one paint later.
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

  return (
    <>
      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>

      {status === 'undecided' ? (
        <section
          ref={reserveBannerSpace}
          aria-labelledby="consent-banner-title"
          className="on-navy fixed inset-x-0 bottom-0 z-40 border-t border-[color-mix(in_srgb,var(--color-field)_18%,transparent)] bg-[var(--color-navy)] text-[var(--color-field)] shadow-[0_-8px_32px_rgba(7,26,43,0.24)]"
        >
          <Container>
            <div className="flex flex-col gap-5 py-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
              <div className="flex flex-col gap-2 lg:max-w-2xl">
                <h2 id="consent-banner-title" className="text-[1.0625rem] font-medium">
                  {banner.title}
                </h2>
                <p className="text-[0.875rem] leading-relaxed text-[color-mix(in_srgb,var(--color-field)_78%,transparent)]">
                  {banner.body}
                </p>
                <Link
                  href={banner.privacyLink.href}
                  className="w-fit text-[0.875rem] font-medium text-[var(--color-cyan)] underline underline-offset-4 hover:text-[var(--color-field)]"
                >
                  {banner.privacyLink.label}
                </Link>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:shrink-0">
                <Button
                  type="button"
                  variant="outlineOnNavy"
                  size="small"
                  onClick={() => record('denied', 'banner')}
                >
                  {banner.reject}
                </Button>
                <Button
                  type="button"
                  variant="outlineOnNavy"
                  size="small"
                  onClick={() => handlePreferencesChange(true)}
                >
                  {banner.manage}
                </Button>
                <Button
                  type="button"
                  variant="outlineOnNavy"
                  size="small"
                  onClick={() => record('granted', 'banner')}
                >
                  {banner.accept}
                </Button>
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      <Dialog.Root open={isPreferencesOpen} onOpenChange={handlePreferencesChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-[color-mix(in_srgb,var(--color-navy)_55%,transparent)]" />
          {/*
            `aria-modal` is set explicitly. Radix already hides the rest of the
            document from assistive technology and traps focus, but docs/16 §6
            names the attribute as a requirement in its own right.
          */}
          <Dialog.Content
            aria-modal="true"
            className="fixed inset-x-0 bottom-0 z-50 flex max-h-[90vh] w-full flex-col overflow-y-auto rounded-t-[var(--radius-panel)] bg-white shadow-xl sm:inset-0 sm:m-auto sm:h-fit sm:max-w-2xl sm:rounded-[var(--radius-panel)]"
          >
            <div className="flex items-start justify-between gap-6 border-b border-[var(--color-border)] p-6 md:p-8">
              <div className="flex flex-col gap-2">
                <Dialog.Title className="text-h3 text-[var(--color-navy)]">
                  {preferences.title}
                </Dialog.Title>
                <Dialog.Description className="text-[0.9375rem] leading-relaxed text-[var(--color-slate)]">
                  {preferences.intro}
                </Dialog.Description>
              </div>
              <Dialog.Close
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-[var(--radius-control)] text-[var(--color-slate)] transition-colors hover:bg-[var(--color-soft)] hover:text-[var(--color-navy)]"
                aria-label="Close privacy choices"
              >
                <X className="size-5" aria-hidden="true" />
              </Dialog.Close>
            </div>

            <div className="flex flex-col gap-6 p-6 md:p-8">
              {preferences.categories.map((category, index) => {
                const isAnalytics = index === 1

                return (
                  <div
                    key={category.name}
                    className="flex flex-col gap-3 rounded-[var(--radius-card)] border border-[var(--color-border)] p-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                      <h3 className="text-[1.0625rem] font-medium text-[var(--color-navy)]">
                        {category.name}
                      </h3>
                      <p className="text-eyebrow text-[var(--color-slate)]">{category.status}</p>
                    </div>

                    <p className="text-[0.9375rem] leading-relaxed text-[var(--color-slate)]">
                      {category.description}
                    </p>

                    {category.examples.length > 0 ? (
                      <ul className="flex flex-col gap-1.5 text-[0.875rem] text-[var(--color-slate)]">
                        {category.examples.map((example) => (
                          <li key={example} className="flex items-start gap-2">
                            <span
                              aria-hidden="true"
                              className="mt-[0.5em] size-1.5 shrink-0 rounded-full bg-[var(--color-border)]"
                            />
                            {example}
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {isAnalytics && !gpc ? (
                      <label
                        htmlFor={analyticsToggleId}
                        className="flex min-h-11 cursor-pointer items-center gap-3 border-t border-[var(--color-border)] pt-4 text-[0.9375rem] font-medium text-[var(--color-navy)]"
                      >
                        <input
                          id={analyticsToggleId}
                          type="checkbox"
                          checked={draftAnalytics}
                          onChange={(event) => setDraftAnalytics(event.target.checked)}
                          className="size-5 shrink-0 accent-[var(--color-blue)]"
                        />
                        Allow optional analytics
                      </label>
                    ) : null}
                  </div>
                )
              })}

              {gpc ? (
                <p className="rounded-[var(--radius-card)] border-l-2 border-[var(--color-blue)] bg-[var(--color-soft)] p-5 text-[0.9375rem] leading-relaxed text-[var(--color-graphite)]">
                  {preferences.gpcNotice}
                </p>
              ) : null}

              <p className="text-[0.875rem] leading-relaxed text-[var(--color-slate)]">
                {preferences.footerStatement}
              </p>
            </div>

            {gpc ? null : (
              <div className="flex flex-col gap-3 border-t border-[var(--color-border)] p-6 sm:flex-row sm:justify-end md:p-8">
                <Button
                  type="button"
                  variant="secondary"
                  size="small"
                  onClick={() => record('denied', 'preferences')}
                >
                  {preferences.reject}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="small"
                  onClick={() => record(draftAnalytics ? 'granted' : 'denied', 'preferences')}
                >
                  Save choices
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="small"
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
