import { isBuilt, routes } from '@/config/routes'

/**
 * The category vocabulary, as one list (17 S-07).
 *
 * Before this module each definition page hand-listed the members of the
 * `DefinedTermSet` it emitted, and the four pages disagreed: one listed two
 * terms and three listed none, so a crawler reading two definition pages read
 * two different vocabularies under one `@id`. A named set whose membership
 * depends on which page you landed on is worse than no set at all, because it
 * asserts a boundary and then moves it.
 *
 * `name` is the term the page defines, not the page title. It is what the
 * `DefinedTerm` node carries and what a reader would look up.
 *
 * MEMBERSHIP IS EARNED, NOT ASSUMED. A term joins this list only when its own
 * page is the emitter of its definition, which means the page renders a visible
 * direct answer defining the term (17 S-08, S-09, L-03). `/ai-selection-problem`
 * is deliberately absent: it is a definition route in the navigation sense and
 * it renders no direct-answer definition of the term, so advertising it as a
 * vocabulary member would put a `@id` in the set that resolves to a page
 * carrying no `description`. Decision D-03 admits it the moment that answer
 * lands, and nothing else has to change here but the entry.
 */
export type VocabularyTerm = {
  /** The term as the page defines it. */
  name: string
  /** Route path of the page that owns the definition. */
  path: string
}

const VOCABULARY: readonly VocabularyTerm[] = [
  {
    name: 'Search Intelligence Engineering',
    path: routes.whatIsSearchIntelligenceEngineering.path,
  },
  { name: 'Selection Intelligence', path: routes.whatIsSelectionIntelligence.path },
  { name: 'AI-Mediated Search', path: routes.whatIsAiMediatedSearch.path },
  {
    name: 'Generative Engine Optimization',
    path: routes.whatIsGenerativeEngineOptimization.path,
  },
]

/**
 * The members every emitter passes, filtered so an unbuilt page is never
 * advertised as a defined term. Same guarantee the sitemap and llms.txt get
 * from `indexableBuiltRoutes()`: a term reaches a crawler by having a page,
 * never by being listed here.
 */
export const vocabularyTerms: readonly VocabularyTerm[] = VOCABULARY.filter((term) =>
  isBuilt(term.path),
)

/** The name of the set itself, carried by the `DefinedTermSet` node. */
export const VOCABULARY_SET_NAME = 'Search Intelligence Engineering vocabulary'

/** True when a route owns a definition in the vocabulary. */
export function isVocabularyPath(path: string): boolean {
  return vocabularyTerms.some((term) => term.path === path)
}
