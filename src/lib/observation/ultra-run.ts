import { classifyProbeOutcome, type ProbeClassifyResult } from '@/lib/observation/classify'
import { filledCellsFor } from '@/lib/observation/filled-fixture'
import { OBSERVE_CELL_COST_USD } from '@/lib/observation/limits'
import {
  OBSERVE_FIXTURE_METHOD,
  OBSERVE_METHOD,
  OBSERVE_WORKER_METHOD,
  probeEngineIds,
  type ObservationCell,
  type ObservationWorkerWrite,
  type ProbeEngineId,
} from '@/lib/observation/schema'

/**
 * Off-box Ultra run planner.
 *
 * Builds the grain-only write body the worker POSTs. It does not call
 * DataForSEO and it never emits a Gemini cell. Live probe results are passed
 * in after the script talks to DataForSEO.
 */

export type UltraRunMode = 'simulate' | 'fixture' | 'live'

export type UltraProbeCell = Omit<ObservationCell, 'engine'> & { engine: ProbeEngineId }

export type UltraPlanItem = {
  context: string
  engine: ProbeEngineId
  costUsd: number
}

export type UltraCellPlan = {
  context: string
  engine: ProbeEngineId
  costUsd: number
  allowed: boolean
}

export function planProbeCells(contexts: readonly string[]): UltraPlanItem[] {
  return contexts.flatMap((context) =>
    probeEngineIds.map((engine) => ({
      context,
      engine,
      costUsd: OBSERVE_CELL_COST_USD[engine],
    })),
  )
}

export function applyCostCeiling(
  plan: readonly UltraPlanItem[],
  costCeilingUsd: number,
): UltraCellPlan[] {
  let spend = 0
  return plan.map((item) => {
    const allowed = spend + item.costUsd <= costCeilingUsd
    if (allowed) spend += item.costUsd
    return { ...item, allowed }
  })
}

export function liveResultKey(context: string, engine: ProbeEngineId): string {
  return `${engine}::${context}`
}

export function cellsFromUltraRun(args: {
  mode: UltraRunMode
  contexts: readonly string[]
  brandHost?: string
  costCeilingUsd: number
  liveResults?: ReadonlyMap<string, ProbeClassifyResult>
}): { cells: UltraProbeCell[]; estimated_spend_usd: number; method: string } {
  if (args.mode === 'fixture') {
    return {
      cells: filledCellsFor(args.contexts, args.brandHost),
      estimated_spend_usd: 0,
      method: OBSERVE_FIXTURE_METHOD,
    }
  }

  const planned = applyCostCeiling(planProbeCells(args.contexts), args.costCeilingUsd)
  let estimated_spend_usd = 0
  const cells: UltraProbeCell[] = planned.map((item) => {

    if (!item.allowed) {
      return {
        context: item.context,
        engine: item.engine,
        state: 'unmeasured',
        error: 'cost_ceiling',
      }
    }

    if (args.mode === 'simulate') {
      return {
        context: item.context,
        engine: item.engine,
        state: 'unmeasured',
        error: 'worker_unavailable',
      }
    }

    const live = args.liveResults?.get(liveResultKey(item.context, item.engine))
    const classified =
      live ??
      classifyProbeOutcome({
        engine: item.engine,
        ok: false,
        error: 'probe_error',
      })
    estimated_spend_usd += item.costUsd
    return {
      context: item.context,
      engine: item.engine,
      state: classified.state,
      ...(classified.error ? { error: classified.error } : {}),
      ...(classified.cited_urls ? { cited_urls: classified.cited_urls } : {}),
    }
  })

  return {
    cells,
    estimated_spend_usd: Number(estimated_spend_usd.toFixed(4)),
    method: args.mode === 'live' ? OBSERVE_WORKER_METHOD : OBSERVE_METHOD,
  }
}

export function ultraWriteBody(args: {
  mode: UltraRunMode
  contexts: readonly string[]
  brandHost?: string
  costCeilingUsd: number
  liveResults?: ReadonlyMap<string, ProbeClassifyResult>
  finishedAt?: string
}): ObservationWorkerWrite {
  const built = cellsFromUltraRun(args)

  const grains = built.cells.filter(
    (cell) => cell.state === 'cited' || cell.state === 'invisible' || cell.state === 'unmeasured',
  )
  const allTerminal = grains.length === built.cells.length
  const anyUnmeasured = built.cells.some((cell) => cell.state === 'unmeasured')

  return {
    cells: built.cells,
    status: allTerminal ? (anyUnmeasured ? 'partial' : 'complete') : 'running',
    finished_at: args.finishedAt ?? new Date().toISOString(),
    method: built.method,
    estimated_spend_usd: built.estimated_spend_usd,
  }
}
