import { routes } from '@/config/routes'
import * as answerStabilityTwoRuns from '@/content/research/answer-stability-two-runs'
import * as theAnswerIndex from '@/content/research/the-answer-index'
import * as noSharedSourceAcrossEngines from '@/content/research/no-shared-source-across-engines'
import * as hendricksSelectionBaseline from '@/content/research/hendricks-selection-baseline'
import * as whoGetsCitedInAiAnswers from '@/content/research/who-gets-cited-in-ai-answers'
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
 *
 * The first three articles all carry 2026-08-19, so "newest first" did not
 * discriminate between them and their relative order is a reading order: the
 * self-baseline sits ahead of the other two because it introduces the
 * instrument, the run-id discipline, and the vocabulary they read from, and
 * because it carries the corrections.
 *
 * The cross-engine study carries 2026-08-21 and therefore takes the head, which
 * is the rule this comment previously stated in advance. Its own run is also the
 * first in the section to measure every cell it sent, and it is the first to
 * publish an errorsFound section, so featuring it does not cost the section the
 * introduction the self-baseline provides: the two link to each other.
 */
export const researchArticles: readonly ResearchArticle[] = [
  {
    slug: 'the-answer-index',
    path: routes.researchTheAnswerIndex.path,
    /*
      AI-Mediated Search rather than Measurement and Attribution. The subject is
      how four answer surfaces retrieve and cite, and the measurement-discipline
      argument on the page is carried by the evidence rather than being the
      subject. It takes the head of the array under the newest-first rule:
      dataThrough 2026-09-01 against 2026-08-20 for the cross-engine study,
      which stays the natural next read and is first in `related`.
    */
    category: 'AI-Mediated Search',
    title: theAnswerIndex.hero.title,
    summary: theAnswerIndex.meta.description,
    publishedDate: theAnswerIndex.byline.published,
    updatedDate: theAnswerIndex.byline.updated,
    dataThroughDate: theAnswerIndex.byline.dataThrough,
    designation: theAnswerIndex.experimentLabel.label,
    /*
      Observation, not Result. docs/12 §4 reserves Result for work carrying a
      baseline, an intervention, a timeframe, a measurement source, and
      limitations. Nothing was changed and nothing was held back here: the
      repeat round is repeated measurement of an unchanged condition, and the
      refutation pass is verification of readings, not an intervention in the
      thing being read.
    */
    claimClass: 'Observation',
    relatedSolution: {
      label: routes.selectionIntelligence.label,
      href: routes.selectionIntelligence.path,
    },
    content: theAnswerIndex,
  },
  {
    slug: 'no-shared-source-across-engines',
    path: routes.researchNoSharedSourceAcrossEngines.path,
    /*
      Measurement and Attribution rather than AI-Mediated Search. The subject is
      not what the answers cited, it is whether a number averaged across engines
      can describe anything, which is a question about the measurement rather
      than about the surfaces. The citation counts on the page are the evidence
      for that argument rather than the argument itself. Selection Intelligence
      would overclaim in metadata for the same reason it does on the two studies
      before it: limitation 08 says in visitor copy that this reports none of the
      four Selection Intelligence measures.
    */
    category: 'Measurement and Attribution',
    title: noSharedSourceAcrossEngines.hero.title,
    summary: noSharedSourceAcrossEngines.meta.description,
    publishedDate: noSharedSourceAcrossEngines.byline.published,
    updatedDate: noSharedSourceAcrossEngines.byline.updated,
    dataThroughDate: noSharedSourceAcrossEngines.byline.dataThrough,
    designation: noSharedSourceAcrossEngines.experimentLabel.label,
    /*
      Observation, not Result. docs/12 §4 reserves Result for work carrying a
      baseline, an intervention, a timeframe, a measurement source, and
      limitations. There was no intervention here and nothing was held back. The
      six-run ChatGPT count is repeated measurement of an unchanged condition,
      which is still observation: nothing was done to the engine between runs.
    */
    claimClass: 'Observation',
    relatedSolution: {
      label: routes.selectionIntelligence.label,
      href: routes.selectionIntelligence.path,
    },
    content: noSharedSourceAcrossEngines,
  },
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
  {
    slug: 'answer-stability-two-runs',
    path: routes.researchAnswerStabilityTwoRuns.path,
    /*
      Measurement and Attribution rather than Selection Intelligence or
      AI-Mediated Search. The study's subject is not what the answers said, it is
      how much a single reading of an answer can be trusted, which is a question
      about the instrument. Filing it under Selection Intelligence would also
      overclaim in metadata: the article's limitation 08 says in visitor copy
      that it is not a Selection Stability measurement and reports none of the
      four Selection Intelligence measures.
    */
    category: 'Measurement and Attribution',
    title: answerStabilityTwoRuns.hero.title,
    summary: answerStabilityTwoRuns.meta.description,
    publishedDate: answerStabilityTwoRuns.byline.published,
    updatedDate: answerStabilityTwoRuns.byline.updated,
    dataThroughDate: answerStabilityTwoRuns.byline.dataThrough,
    designation: answerStabilityTwoRuns.experimentLabel.label,
    /*
      Observation, not Result. docs/12 §4 reserves Result for work carrying a
      baseline, an intervention, a timeframe, a measurement source, and
      limitations. There was no intervention here and nothing was held back, and
      the article's own limitation 01 says so in visitor copy.
    */
    claimClass: 'Observation',
    relatedSolution: {
      label: routes.selectionIntelligence.label,
      href: routes.selectionIntelligence.path,
    },
    content: answerStabilityTwoRuns,
  },
  {
    slug: 'who-gets-cited-in-ai-answers',
    path: routes.researchWhoGetsCitedInAiAnswers.path,
    /*
      AI-Mediated Search rather than Measurement and Attribution. The subject is
      what the answers cited, not how the instrument behaves, so it files beside
      the self-baseline it shares a run of record with. Selection Intelligence
      would overclaim in metadata for the same reason it does on that study: the
      article's limitation 08 says in visitor copy that it counts citation rather
      than consideration and reports none of the four Selection Intelligence
      measures.
    */
    category: 'AI-Mediated Search',
    title: whoGetsCitedInAiAnswers.hero.title,
    summary: whoGetsCitedInAiAnswers.meta.description,
    publishedDate: whoGetsCitedInAiAnswers.byline.published,
    updatedDate: whoGetsCitedInAiAnswers.byline.updated,
    dataThroughDate: whoGetsCitedInAiAnswers.byline.dataThrough,
    designation: whoGetsCitedInAiAnswers.experimentLabel.label,
    /*
      Observation, not Result. docs/12 §4 reserves Result for work carrying a
      baseline, an intervention, a timeframe, a measurement source, and
      limitations. This study describes one reading of one citation set with no
      intervention and no holdout, and its limitations lead paragraph says so in
      visitor copy. docs/17 §8.1 pre-committed E1 to publishing as an Observation
      for exactly that reason.
    */
    claimClass: 'Observation',
    relatedSolution: {
      label: routes.selectionIntelligence.label,
      href: routes.selectionIntelligence.path,
    },
    content: whoGetsCitedInAiAnswers,
  },
]

/** The featured study on the hub, and the destination of its primary CTA. */
export const latestResearchArticle: ResearchArticle | undefined = researchArticles[0]

/** Everything after the featured study, rendered as the hub grid. */
export const furtherResearchArticles: readonly ResearchArticle[] = researchArticles.slice(1)

export function findResearchArticle(slug: string): ResearchArticle | undefined {
  return researchArticles.find((entry) => entry.slug === slug)
}
