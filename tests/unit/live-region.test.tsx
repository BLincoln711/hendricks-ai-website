import { act, render, screen } from '@testing-library/react'
import { useEffect } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  ANNOUNCEMENT_CLEAR_MS,
  AnnouncerProvider,
  LiveRegion,
  useAnnounce,
} from '@/components/layout/live-region'
import { ANNOUNCE_DEBOUNCE_MS } from '@/lib/motion'

/**
 * The shared announcer (09 5.60; 11 section 7): one polite region, a 240 ms
 * debounce where the last call wins, a fresh text node for every write so an
 * identical sentence is read again, and a self-clear after five seconds.
 */

type Announce = (text: string) => void

/** Hands the hook's function back to the test through an effect, never during render. */
function Caller({ onReady }: { onReady: (announce: Announce) => void }) {
  const announce = useAnnounce()
  useEffect(() => onReady(announce), [announce, onReady])
  return null
}

function mount(): Announce {
  let announce: Announce = () => {
    throw new Error('announce read before the provider mounted')
  }
  render(
    <AnnouncerProvider>
      <LiveRegion />
      <Caller
        onReady={(ready) => {
          announce = ready
        }}
      />
    </AnnouncerProvider>,
  )
  return (text) => announce(text)
}

describe('LiveRegion', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('is one polite, atomic status region hidden with sr-only', () => {
    mount()
    const region = screen.getByRole('status')

    expect(region).toHaveAttribute('aria-live', 'polite')
    expect(region).toHaveAttribute('aria-atomic', 'true')
    expect(region).toHaveClass('sr-only')
    expect(region).toHaveTextContent('')
  })

  it('writes the sentence after the debounce, not before', () => {
    const announce = mount()

    act(() => announce('Optional analytics accepted.'))
    expect(screen.getByRole('status')).toHaveTextContent('')

    act(() => vi.advanceTimersByTime(ANNOUNCE_DEBOUNCE_MS))
    expect(screen.getByRole('status')).toHaveTextContent('Optional analytics accepted.')
  })

  it('lets the last call inside the debounce win', () => {
    const announce = mount()

    act(() => {
      announce('Question 1 of 3.')
      vi.advanceTimersByTime(ANNOUNCE_DEBOUNCE_MS / 2)
      announce('Question 2 of 3.')
      vi.advanceTimersByTime(ANNOUNCE_DEBOUNCE_MS / 2)
      announce('Question 3 of 3.')
    })
    act(() => vi.advanceTimersByTime(ANNOUNCE_DEBOUNCE_MS))

    expect(screen.getByRole('status')).toHaveTextContent('Question 3 of 3.')
  })

  it('replaces the text node so an identical sentence is announced again', () => {
    const announce = mount()
    const region = screen.getByRole('status')

    act(() => announce('Copied'))
    act(() => vi.advanceTimersByTime(ANNOUNCE_DEBOUNCE_MS))
    const first = region.firstElementChild

    act(() => announce('Copied'))
    act(() => vi.advanceTimersByTime(ANNOUNCE_DEBOUNCE_MS))
    const second = region.firstElementChild

    expect(second).toHaveTextContent('Copied')
    expect(second).not.toBe(first)
  })

  it('clears itself so a stale sentence is not re-read', () => {
    const announce = mount()

    act(() => announce('Optional analytics rejected.'))
    act(() => vi.advanceTimersByTime(ANNOUNCE_DEBOUNCE_MS))
    expect(screen.getByRole('status')).toHaveTextContent('Optional analytics rejected.')

    act(() => vi.advanceTimersByTime(ANNOUNCEMENT_CLEAR_MS - 1))
    expect(screen.getByRole('status')).toHaveTextContent('Optional analytics rejected.')

    act(() => vi.advanceTimersByTime(1))
    expect(screen.getByRole('status')).toHaveTextContent('')
  })

  it('refuses to announce outside the provider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => undefined)
    expect(() => render(<Caller onReady={() => undefined} />)).toThrow(
      'useAnnounce must be used inside AnnouncerProvider',
    )
    spy.mockRestore()
  })
})
