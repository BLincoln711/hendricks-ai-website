import { disclosure } from '@/lib/observation/copy'
import { geminiPublicMiniRow } from '@/lib/observation/classify'
import {
  OBSERVE_METHOD,
  probeEngineIds,
  type ObservationCell,
  type ObservationPayload,
} from '@/lib/observation/schema'

/**
 * Checked-in pending board Design can load without spend.
 *
 * pending and queued only. No cited. No invisible. Gemini stays
 * unmeasured_by_policy. A filled board is a different file and loads only
 * when OBSERVE_FIXTURE=1 on a non-production runtime.
 */

export const pendingFixtureLabel = disclosure.caption

export function pendingCellsFor(contexts: readonly string[]): ObservationCell[] {
  return contexts.flatMap((context) =>
    probeEngineIds.map((engine) => ({
      context,
      engine,
      state: 'pending' as const,
    })),
  )
}

export function pendingPayload(args: {
  run_id: string
  job_id: string
  contexts: readonly string[]
}): ObservationPayload {
  return {
    run_id: args.run_id,
    job_id: args.job_id,
    method: OBSERVE_METHOD,
    cells: pendingCellsFor(args.contexts),
    gemini_row: geminiPublicMiniRow(),
    disclaimer: disclosure.sample,
  }
}
