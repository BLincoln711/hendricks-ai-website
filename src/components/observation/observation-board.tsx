import { TableRegion } from '@/components/canvas/table-region'
import { engines as engineCopy, queued } from '@/content/pages/observe'
import type {
  BoardEngineId,
  ObservationCellState,
  ObservationJob,
  ObservationPayload,
} from '@/lib/observation/schema'

/**
 * Pending observation board from the handshake payload. Probe engines come
 * from cells. Gemini comes from gemini_row and starts unmeasured. This is not
 * a Selection Map and is never passed to SelectionMapDrawing.
 */

const ENGINE_LABEL: Record<BoardEngineId, string> = {
  google_aio: 'Google AI Overviews',
  chat_gpt: 'ChatGPT',
  perplexity: 'Perplexity',
  gemini: 'Gemini',
}

const BOARD_ENGINES: readonly BoardEngineId[] = [
  'google_aio',
  'chat_gpt',
  'perplexity',
  'gemini',
]

function cellLabel(state: ObservationCellState): string {
  if (state === 'unmeasured') return queued.cellUnmeasured
  if (state === 'cited') return queued.cellCited
  if (state === 'invisible') return queued.cellInvisible
  return queued.cellPending
}

function statusCopy(status: ObservationJob['status']): string {
  switch (status) {
    case 'running':
      return queued.statusRunning
    case 'partial':
      return queued.statusPartial
    case 'complete':
      return queued.statusComplete
    default:
      return queued.statusQueued
  }
}

export function ObservationBoard({
  job,
  payload,
}: {
  job: ObservationJob
  payload: ObservationPayload
}) {
  const columns = [
    { key: 'engine', header: queued.engineColumn, rowHeader: true },
    ...job.contexts.map((context, index) => ({
      key: `c${index}`,
      header: `${queued.sampleColumn} ${index + 1}`,
    })),
  ]

  const rows = BOARD_ENGINES.map((engine) => {
    const isGemini = engine === 'gemini'
    const cells: Record<string, string> = {
      engine: `${ENGINE_LABEL[engine]}${isGemini ? ` (${engineCopy.notProbedNote})` : ''}`,
    }
    job.contexts.forEach((context, index) => {
      if (isGemini) {
        cells[`c${index}`] = cellLabel(payload.gemini_row.state)
        return
      }
      const cell = payload.cells.find((entry) => entry.engine === engine && entry.context === context)
      cells[`c${index}`] = cellLabel(cell?.state ?? 'pending')
    })
    return cells
  })

  return (
    <div className="observation-board">
      <p className="observation-status">{statusCopy(job.status)}</p>
      <TableRegion caption={queued.boardCaption} columns={columns} rows={rows} />
    </div>
  )
}
