import { routes } from '@/config/routes'
import * as hendricksSelectionBaseline from '@/content/research/hendricks-selection-baseline'
import type { ResearchArticle } from '@/content/research/types'

export * from '@/content/research/types'

/**
 * The research registry.
 *
 * A static index over version-controlled TypeScript rather than a CMS query.
 * `CONTENT_VERIFICATION.md` R5 records `/research` as blocked on Sanity
 * credentials, and `docs/17` §7 wave 2.1 answers that: the block was a
 * sequencing assumption rather than a credential. The four definition pages had
 * already shipped editorial content out of `src/content/`, and
 * `src/config/routes.ts` records why that was the right call for the category
 * vocabulary. It applies with more force here. A dated measurement with a stated
 * method is the last content on this site that should be editable without a diff
 * and a review, and `/corrections` only means something if every published
 * figure has a version history behind it.
 *
 * THREE INVARIANTS, ALL ENFORCED BY THE COMPILER RATHER THAN BY CARE.
 *
 * One entry per published article, and the entry restates nothing. `title`,
 * `summary`, the three dates, and `designation` are all read out of the article
 * module. A card and its page cannot disagree, because there is only one copy of
 * each string and the registry is a view over it rather than a second record.
 *
 * `path` is read from `src/config/routes.ts`. The route registry is what the
 * sitemap, `llms.txt`, `check:links`, and every `isBuilt`-filtered link list
 * consult, so a path typed here a second time could advertise a URL that does
 * not exist. Adding an article means adding a route entry and an entry here, in
 * that order.
 *
 * The namespace import is deliberate. Importing the module as a whole and typing
 * the entry as `ResearchArticle` makes the compiler check the article file
 * against the fifteen-item contract in `./types`. An article that ships without
 * its limitations section, or without a data-through date, fails `pnpm typecheck`
 * rather than failing review.
 *
 * ORDERING. Newest first. The hub renders the head of this array as the featured
 * study and the tail as a grid, so the order is a rendering decision as well as
 * a reading one. Do not sort at render time; the array is the order.
 */
export const researchArticles: readonly ResearchArticle[] = [
  {
    slug: 'hendricks-selection-baseline',
    path: routes.researchHendricksSelectionBaseline.path,
    /*
      AI-Mediated Search rather than Selection Intelligence, even though the slug
      and docs/17 §8.3 both frame this as the self-baseline. The article's own
      limitation 06 says it is not yet a full Selection Intelligence baseline: it
      reports citation presence and reports none of the four named Selection
      Intelligence measures. Filing it under the category it does not yet satisfy
      would be the page's one unforced overclaim, made in metadata where a reader
      would not catch it. Move it when the measures land.
    */
    category: 'AI-Mediated Search',
    title: hendricksSelectionBaseline.hero.title,
    /*
      The card summary is the article's own meta description. It already leads
      with the finding and the denominator, which is what the card has to do, and
      reusing it means the hub cannot describe the study in a second wording that
      drifts from the one search results show.
    */
    summary: hendricksSelectionBaseline.meta.description,
    publishedDate: hendricksSelectionBaseline.byline.published,
    updatedDate: hendricksSelectionBaseline.byline.updated,
    dataThroughDate: hendricksSelectionBaseline.byline.dataThrough,
    designation: hendricksSelectionBaseline.experimentLabel.label,
    /*
      Observation, not Result. docs/12 §4 reserves Result for work carrying a
      baseline, an intervention, a timeframe, a measurement source, and
      limitations. This study has four of the five and is missing the one that
      decides the classification: there was no intervention. docs/17 §8.1
      pre-committed to publishing this class of asset as an Observation for
      exactly that reason, and the article's limitation 02 says the same thing in
      visitor copy.
    */
    claimClass: 'Observation',
    relatedSolution: {
      label: routes.selectionIntelligence.label,
      href: routes.selectionIntelligence.path,
    },
    content: hendricksSelectionBaseline,
  },
]

/** The featured study on the hub, and the destination of its primary CTA. */
export const latestResearchArticle: ResearchArticle | undefined = researchArticles[0]

/** Everything after the featured study. Empty while one article is published. */
export const furtherResearchArticles: readonly ResearchArticle[] = researchArticles.slice(1)

export function findResearchArticle(slug: string): ResearchArticle | undefined {
  return researchArticles.find((entry) => entry.slug === slug)
}
