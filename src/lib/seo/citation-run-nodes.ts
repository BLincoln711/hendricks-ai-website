import { siteConfig } from '@/config/site'
import type { ResearchArticle } from '@/content/research'
import {
  allNoSharedPartResultsPublished,
  archiveFileExists,
  NO_SHARED_PART_RUN_IDS,
  publishedArchiveHref,
  publishedResultHref,
  resultFilenameForRunId,
} from '@/content/research/citation-runs'
import { citationDatasetSchema } from '@/lib/seo/json-ld'

/**
 * Dataset nodes for first-party citation-presence archives on a study page.
 *
 * A Dataset (and its `isBasedOn` entry) is emitted only when the archive file
 * is on disk. Copy may still name a run whose file is unpublished; schema and
 * download URLs must not.
 */
export function citationRunNodes(article: ResearchArticle) {
  const runs = article.content.citationRuns ?? []
  if (runs.length === 0) return { articleExtras: undefined, datasets: [] as object[] }

  const includeParts =
    article.slug === 'no-shared-source-across-engines' && allNoSharedPartResultsPublished()

  const datasets = runs.flatMap((run) => {
    const contentUrl = publishedArchiveHref(run.filename)
    if (!contentUrl) return []

    return [
      citationDatasetSchema({
        path: article.path,
        runId: run.runId,
        name: run.name,
        description: run.description,
        temporalCoverage: run.temporalCoverage,
        contentUrl,
        hasPart:
          includeParts && run.role === 'primary'
            ? NO_SHARED_PART_RUN_IDS.filter((runId) =>
                archiveFileExists(resultFilenameForRunId(runId)),
              ).map((runId) => ({
                '@id': `${new URL(article.path, siteConfig.url).toString()}#dataset-${runId}`,
              }))
            : undefined,
      }),
    ]
  })

  const partDatasets = includeParts
    ? NO_SHARED_PART_RUN_IDS.filter((runId) => !runs.some((run) => run.runId === runId)).flatMap(
        (runId) => {
          const contentUrl = publishedResultHref(runId)
          if (!contentUrl) return []

          return [
            citationDatasetSchema({
              path: article.path,
              runId,
              name: `Citation-presence archive ${runId}`,
              description:
                'First-party citation-presence archive. Records cited URL hosts per cell.',
              temporalCoverage: runId.slice(0, 10),
              contentUrl,
            }),
          ]
        },
      )
    : []

  const allDatasets = [...datasets, ...partDatasets]
  const primaryIds = runs.filter((run) => run.role === 'primary').map((run) => run.runId)

  return {
    articleExtras: {
      identifier: primaryIds.length === 1 ? primaryIds[0] : primaryIds,
      isBasedOn: allDatasets.map((node) => ({ '@id': (node as { '@id': string })['@id'] })),
    },
    datasets: allDatasets,
  }
}
