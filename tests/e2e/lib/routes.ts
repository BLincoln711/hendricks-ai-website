import { routes } from '@/config/routes'

/**
 * A path no route serves, so the sweep covers the not-found state inside the
 * shell (09 5.45; consistent help holds on 404, 16 SM-07).
 */
export const NOT_FOUND_PATH = '/this-route-does-not-exist'

/**
 * Every built route in the registry, commercial, editorial and legal, plus the
 * not-found state. Read from `src/config/routes.ts` so a route joins the sweep
 * by being registered as built, never by being listed here.
 */
export const sweepRoutes: readonly string[] = [
  ...Object.values(routes)
    .filter((route) => route.built)
    .map((route) => route.path),
  NOT_FOUND_PATH,
]
