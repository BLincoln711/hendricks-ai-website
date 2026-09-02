import { readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

/**
 * KF-04 (redesign 16 section 2): the site carries exactly two modal dialogs,
 * the mobile navigation sheet and the consent preferences dialog, both on
 * Radix so the focus trap, Escape and focus restoration are shared. A third
 * `Dialog.Root` is a new modal and needs its own KF-04 review.
 */
const SOURCE_ROOT = path.resolve(__dirname, '../../src')

function filesContaining(needle: string, dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return filesContaining(needle, full)
    if (!/\.tsx?$/.test(entry.name)) return []
    return readFileSync(full, 'utf8').includes(needle) ? [path.relative(SOURCE_ROOT, full)] : []
  })
}

describe('Modal inventory', () => {
  it('mounts Dialog.Root only in the mobile navigation and the consent manager', () => {
    expect(filesContaining('Dialog.Root', SOURCE_ROOT).sort()).toEqual([
      'components/consent/consent-manager.tsx',
      'components/layout/mobile-navigation.tsx',
    ])
  })
})
