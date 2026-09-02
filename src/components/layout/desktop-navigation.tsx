'use client'

import { ChevronDown } from 'lucide-react'
import { useId, useState, type FocusEvent, type KeyboardEvent } from 'react'

import { NavLink } from '@/components/layout/nav-link'
import { primaryNavigation, type NavigationItem } from '@/config/navigation'

/**
 * Desktop navigation (09 5.1; 16 KF-08).
 *
 * Solutions keeps its link and gains a 44 px `aria-expanded` chevron button
 * with 8 px clearance. The panel is a plain list of links, not a menu widget,
 * so there are no arrow-key semantics. Because it appears on hover and on
 * focus, 1.4.13 applies and all three conditions hold: dismissible (Escape
 * closes it without moving focus), hoverable (the pointer can travel from the
 * trigger onto the panel) and persistent (it stays open until hover and focus
 * have both left the group or Escape is pressed; no timer closes it).
 */

const LINK_CLASS =
  'target-variance inline-flex min-h-target items-center rounded-t-small border-b-2 border-transparent px-[var(--header-nav-pad-x)] text-[length:var(--header-nav-size)] font-medium whitespace-nowrap text-[var(--header-nav-fg)] transition-[border-color] duration-[var(--duration-micro)] ease-standard hover:border-[var(--header-nav-current-edge)] aria-[current=page]:border-[var(--header-nav-current-edge)]'

export function DesktopNavigation() {
  return (
    <nav aria-label="Primary navigation" className="hidden lg:ml-auto lg:block">
      <ul className="flex items-center gap-1">
        {primaryNavigation.map((item) => (
          <li key={item.href}>
            {item.children ? (
              <DisclosureGroup item={item} items={item.children} />
            ) : (
              <NavLink href={item.href} className={LINK_CLASS}>
                {item.label}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

function DisclosureGroup({ item, items }: { item: NavigationItem; items: NavigationItem[] }) {
  const panelId = useId()
  const [pressed, setPressed] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  // Set by Escape; lifted when the pointer leaves or focus leaves the group,
  // so the next hover or focus opens the panel again.
  const [dismissed, setDismissed] = useState(false)

  const open = !dismissed && (pressed || hovered || focused)

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (event.currentTarget.contains(event.relatedTarget)) return
    setFocused(false)
    setPressed(false)
    setDismissed(false)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Escape' || !open) return
    event.preventDefault()
    setPressed(false)
    setDismissed(true)
  }

  const handleToggle = () => {
    if (pressed) {
      setPressed(false)
      setDismissed(true)
      return
    }
    setPressed(true)
    setDismissed(false)
  }

  return (
    <div
      className="relative flex items-center gap-[var(--target-clearance)]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false)
        setDismissed(false)
      }}
      onFocus={() => setFocused(true)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      <NavLink href={item.href} className={LINK_CLASS}>
        {item.label}
      </NavLink>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label="Show the four solutions"
        onClick={handleToggle}
        className="group inline-flex size-11 shrink-0 items-center justify-center rounded-small text-ink hover:bg-surface-tint"
      >
        <ChevronDown
          className="size-3.5 transition-transform duration-[var(--duration-micro)] ease-standard group-aria-expanded:rotate-180"
          aria-hidden="true"
          focusable="false"
        />
      </button>

      <ul
        id={panelId}
        hidden={!open}
        className="nav-panel absolute top-full left-0 z-[var(--z-header)] min-w-[var(--disclosure-width)] rounded-[var(--disclosure-radius)] border border-[var(--disclosure-edge)] bg-[var(--disclosure-bg)] p-2"
      >
        {items.map((child) => (
          <li key={child.href}>
            <NavLink
              href={child.href}
              className="flex min-h-target items-center rounded-small px-3 text-small font-medium whitespace-nowrap text-link hover:bg-surface-tint"
            >
              {child.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}
