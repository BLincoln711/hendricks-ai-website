import { routes } from '@/config/routes'

/**
 * The definition routes, as a set of paths.
 *
 * A definition page's "Related terms" block is its own approved related links
 * filtered through this set, so the vocabulary a page points at is derived from
 * the route registry rather than retyped per page.
 */
export const DEFINITION_ROUTE_PATHS: ReadonlySet<string> = new Set([
  routes.whatIsSearchIntelligenceEngineering.path,
  routes.whatIsSelectionIntelligence.path,
  routes.whatIsAiMediatedSearch.path,
  routes.whatIsGenerativeEngineOptimization.path,
  routes.aiSelectionProblem.path,
])

export function isDefinitionRoute(href: string): boolean {
  return DEFINITION_ROUTE_PATHS.has(href)
}
