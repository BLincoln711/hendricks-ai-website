/**
 * Route registry consistency gate.
 *
 * Checks the three things that can drift between `src/config/routes.ts` and the
 * filesystem, none of which a type error would catch:
 *
 * 1. Every route marked `built` has a `page.tsx`.
 * 2. Every built route other than `/` ships its own `opengraph-image.tsx` (docs/06 §3).
 * 3. Every href the navigation actually exports resolves to a built route.
 *
 * The exported navigation arrays are imported and inspected post-filter, so this
 * verifies the values the site renders rather than the source that produces them.
 * Content-object hrefs are covered by `tests/unit/commercial-content.test.ts`, and
 * the rendered link crawl lives in `tests/e2e/commercial-routes.spec.ts`.
 */
import { readdir, stat } from 'node:fs/promises'
import path from 'node:path'

import {
  footerNavigation,
  legalNavigation,
  primaryNavigation,
  type NavigationItem,
} from '../src/config/navigation'
import { isBuilt, routes } from '../src/config/routes'

const ROOT = process.cwd()
const APP = path.join(ROOT, 'src/app')

type Failure = { where: string; message: string }

async function pageDirectories(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true })

  const nested = await Promise.all(
    entries.map(async (entry) => {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) return pageDirectories(full)
      return entry.name === 'page.tsx' ? [dir] : []
    }),
  )

  return nested.flat()
}

/** Turns `src/app/(marketing)/solutions` into the `/solutions` it serves. */
function routePathFor(directory: string): string {
  const relative = path
    .relative(APP, directory)
    .split('/')
    .filter((segment) => !segment.startsWith('('))
    .join('/')

  return relative === '' ? '/' : `/${relative}`
}

async function exists(target: string): Promise<boolean> {
  try {
    await stat(target)
    return true
  } catch {
    return false
  }
}

function flatten(items: readonly NavigationItem[]): NavigationItem[] {
  return items.flatMap((item) => [item, ...flatten(item.children ?? [])])
}

async function main() {
  const failures: Failure[] = []

  const directories = await pageDirectories(APP)
  const served = new Map(directories.map((directory) => [routePathFor(directory), directory]))

  for (const route of Object.values(routes)) {
    const directory = served.get(route.path)

    if (route.built && !directory) {
      failures.push({
        where: 'src/config/routes.ts',
        message: `${route.path} is marked built but has no page.tsx`,
      })
      continue
    }

    if (!route.built && directory) {
      failures.push({
        where: path.relative(ROOT, directory),
        message: `${route.path} has a page.tsx but is marked unbuilt, so nothing links to it`,
      })
      continue
    }

    if (!directory || route.path === '/') continue

    if (!(await exists(path.join(directory, 'opengraph-image.tsx')))) {
      failures.push({
        where: path.relative(ROOT, directory),
        message: `${route.path} has no opengraph-image.tsx (docs/06 §3)`,
      })
    }
  }

  const navigationHrefs = [
    ...flatten(primaryNavigation).map((item) => ({ source: 'primaryNavigation', item })),
    ...Object.entries(footerNavigation).flatMap(([column, { items }]) =>
      items.map((item) => ({ source: `footerNavigation.${column}`, item })),
    ),
    ...legalNavigation.map((item) => ({ source: 'legalNavigation', item })),
  ]

  for (const { source, item } of navigationHrefs) {
    if (item.href.startsWith('/') && !isBuilt(item.href)) {
      failures.push({
        where: `src/config/navigation.ts (${source})`,
        message: `exports "${item.label}" pointing at unbuilt route ${item.href}`,
      })
    }
  }

  if (failures.length > 0) {
    console.error(`check:links found ${failures.length} problem(s):\n`)
    for (const failure of failures) {
      console.error(`  ${failure.where}\n    ${failure.message}`)
    }
    process.exit(1)
  }

  const builtCount = Object.values(routes).filter((route) => route.built).length
  console.log(
    `check:links passed — ${builtCount} built routes have a page and an OG image; ` +
      `${navigationHrefs.length} navigation links resolve.`,
  )
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
