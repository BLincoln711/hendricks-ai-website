/**
 * Route registry consistency gate.
 *
 * Checks the three things that can drift between `src/config/routes.ts` and the
 * filesystem, none of which a type error would catch:
 *
 * 1. Every route marked `built` has a `page.tsx`.
 * 2. Every built route other than `/` ships its own `opengraph-image.tsx` or
 *    `opengraph-image.png` (docs/06 §3).
 * 3. Every href the navigation actually exports resolves to a built route.
 *
 * Checks 1 and 2 resolve a registry path against dynamic segment directories as
 * well as literal ones, so `/research/<slug>` is satisfied by
 * `src/app/(editorial)/research/[slug]`. Research articles are registered by
 * concrete path on purpose: the registry is what the sitemap and `llms.txt` read,
 * and a dynamic pattern registered there would advertise a literal `[slug]` URL
 * to crawlers. Check 3 and the unbuilt-but-served check below stay on exact
 * matches, because a registered-but-unbuilt article served by an existing
 * dynamic segment is not a defect: `generateStaticParams` reads the same
 * registry, so it is simply not generated.
 *
 * The exported navigation arrays are imported and inspected post-filter, so this
 * verifies the values the site renders rather than the source that produces them.
 * Content-object hrefs are covered by `tests/unit/commercial-content.test.ts`, and
 * the rendered link crawl lives in `tests/e2e/commercial-routes.spec.ts`.
 */
import { readdir, stat } from 'node:fs/promises'
import path from 'node:path'

import { footerNavigation, legalNavigation, primaryNavigation } from '../src/config/navigation'
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

/**
 * Resolves a registry path to the directory that serves it.
 *
 * Exact match first, which is every static route. A path with no directory of
 * its own then falls back to a same-depth directory whose differing segments are
 * all dynamic, so `/research/hendricks-selection-baseline` resolves to
 * `research/[slug]`. Without this the registry could not describe a dynamic
 * route at all, and a published article would have to choose between being in
 * the sitemap and passing this check.
 */
function resolveDirectory(served: Map<string, string>, routePath: string): string | undefined {
  const segments = routePath.split('/')

  for (const [servedPath, directory] of served) {
    const servedSegments = servedPath.split('/')
    if (servedSegments.length !== segments.length) continue

    const matches = servedSegments.every(
      (segment, index) => segment === segments[index] || /^\[.+\]$/.test(segment),
    )
    if (matches) return directory
  }

  return undefined
}

async function exists(target: string): Promise<boolean> {
  try {
    await stat(target)
    return true
  } catch {
    return false
  }
}

async function main() {
  const failures: Failure[] = []

  const directories = await pageDirectories(APP)
  const served = new Map(directories.map((directory) => [routePathFor(directory), directory]))

  for (const route of Object.values(routes)) {
    const exactDirectory = served.get(route.path)
    const directory = exactDirectory ?? resolveDirectory(served, route.path)

    if (route.built && !directory) {
      failures.push({
        where: 'src/config/routes.ts',
        message: `${route.path} is marked built but has no page.tsx`,
      })
      continue
    }

    if (!route.built && exactDirectory) {
      failures.push({
        where: path.relative(ROOT, exactDirectory),
        message: `${route.path} has a page.tsx but is marked unbuilt, so nothing links to it`,
      })
      continue
    }

    if (!directory || route.path === '/') continue

    const hasGeneratedOg = await exists(path.join(directory, 'opengraph-image.tsx'))
    const hasStaticOg = await exists(path.join(directory, 'opengraph-image.png'))
    if (!hasGeneratedOg && !hasStaticOg) {
      failures.push({
        where: path.relative(ROOT, directory),
        message: `${route.path} has no opengraph-image.tsx or opengraph-image.png (docs/06 §3)`,
      })
    }
  }

  const navigationHrefs = [
    ...primaryNavigation.map((item) => ({ source: 'primaryNavigation', item })),
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
