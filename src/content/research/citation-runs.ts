import { existsSync } from 'node:fs'
import path from 'node:path'

import { CITATION_PROBE_MEASUREMENT_TECHNIQUE } from '@/content/research/citation-run-constants'

/**
 * Public citation-presence archives.
 *
 * Files are served from `public/history/runs/` at `/history/runs/<filename>`.
 * The bytes themselves are the immutable first-party probe archives. This
 * module names those files and the run ids they belong to. It does not invent
 * cell data.
 *
 * measurementTechnique is locked. Do not reword it, and do not fold vendor or
 * product names into it.
 */

export { CITATION_PROBE_MEASUREMENT_TECHNIQUE }

export const HISTORY_RUNS_PATH = '/history/runs'

/**
 * Stable public filename for the 2026-08-18 self-run.
 *
 * On-page copy previously called this "the 2026-08-18 result file, unchanged".
 * No HHMMSS archive timestamp is recorded in this repo, so the public name is
 * the date alone rather than a fabricated clock time.
 */
export const RUN_2026_08_18_ID = '2026-08-18'
export const RUN_2026_08_18_FILENAME = 'hendricks-2026-08-18.json'

export const REQUIRED_RESULT_FILES = [
  'hendricks-2026-08-19-110930.json',
  'hendricks-2026-08-19-181155.json',
  'hendricks-2026-08-20-060002.json',
  'hendricks-2026-08-20-104059.json',
  'hendricks-2026-08-20-105338.json',
  'hendricks-2026-08-20-110653.json',
] as const

export const REQUIRED_MANIFEST_FILES = [
  'manifest-2026-08-19-110930.json',
  'manifest-2026-08-19-181155.json',
  'manifest-2026-08-20-110653.json',
] as const

/** Other 2026-08-20 manifests, published only when the file is actually on disk. */
export const OPTIONAL_AUG20_MANIFEST_FILES = [
  'manifest-2026-08-20-060002.json',
  'manifest-2026-08-20-104059.json',
  'manifest-2026-08-20-105338.json',
] as const

export const RUN_ID_110930 = '2026-08-19-110930'
export const RUN_ID_181155 = '2026-08-19-181155'
export const RUN_ID_060002 = '2026-08-20-060002'
export const RUN_ID_104059 = '2026-08-20-104059'
export const RUN_ID_105338 = '2026-08-20-105338'
export const RUN_ID_110653 = '2026-08-20-110653'

export const NO_SHARED_PART_RUN_IDS = [
  RUN_ID_110930,
  RUN_ID_181155,
  RUN_ID_060002,
  RUN_ID_104059,
  RUN_ID_105338,
  RUN_ID_110653,
] as const

export function historyRunsHref(filename: string): string {
  return `${HISTORY_RUNS_PATH}/${filename}`
}

export function resultFilenameForRunId(runId: string): string {
  if (runId === RUN_2026_08_18_ID) return RUN_2026_08_18_FILENAME
  return `hendricks-${runId}.json`
}

export function manifestFilenameForRunId(runId: string): string {
  return `manifest-${runId}.json`
}

export function publicHistoryRunsDir(): string {
  return path.join(process.cwd(), 'public', 'history', 'runs')
}

export function archiveFileExists(filename: string): boolean {
  return existsSync(path.join(publicHistoryRunsDir(), filename))
}

export function publishedArchiveHref(filename: string): string | null {
  return archiveFileExists(filename) ? historyRunsHref(filename) : null
}

export function publishedResultHref(runId: string): string | null {
  return publishedArchiveHref(resultFilenameForRunId(runId))
}

export function allNoSharedPartResultsPublished(): boolean {
  return NO_SHARED_PART_RUN_IDS.every((runId) => archiveFileExists(resultFilenameForRunId(runId)))
}

export type ExpectedArchiveFile = {
  filename: string
  kind: 'result' | 'manifest'
  required: boolean
  present: boolean
}

export function expectedArchiveFiles(): readonly ExpectedArchiveFile[] {
  return [
    {
      filename: RUN_2026_08_18_FILENAME,
      kind: 'result',
      required: false,
      present: archiveFileExists(RUN_2026_08_18_FILENAME),
    },
    ...REQUIRED_RESULT_FILES.map((filename) => ({
      filename,
      kind: 'result' as const,
      required: true,
      present: archiveFileExists(filename),
    })),
    ...REQUIRED_MANIFEST_FILES.map((filename) => ({
      filename,
      kind: 'manifest' as const,
      required: true,
      present: archiveFileExists(filename),
    })),
    ...OPTIONAL_AUG20_MANIFEST_FILES.map((filename) => ({
      filename,
      kind: 'manifest' as const,
      required: false,
      present: archiveFileExists(filename),
    })),
  ]
}
