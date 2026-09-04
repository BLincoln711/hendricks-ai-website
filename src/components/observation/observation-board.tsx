import { TableRegion } from '@/components/canvas/table-region'
import { engines as engineCopy, queued } from '@/content/pages/observe'
import { engineLabel, isGemini, type ObservationJob } from '@/lib/observation/contract'

/**
 * Pending observation board. Engines as rows, sample contexts as columns.
 * Cells are pending or unmeasured. Gemini is unmeasured from first paint.
 * This is not a Selection Map and is never passed to SelectionMapDrawing.
 */

function cellLabel(state: 'pending' | 'unmeasured' | 'cited' | 'invisible'): string {
  if (state === 'unmeasured') return queued.cellUnmeasured
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

export function ObservationBoard({ job }: { job: ObservationJob }) {
  const columns = [
    { key: 'engine', header: queued.engineColumn, rowHeader: true },
    ...job.contexts.map((context, index) => ({
      key: `c${index}`,
      header: `${queued.sampleColumn} ${index + 1}`,
    })),
  ]

  const rows = job.board.engines.map((row) => {
    const cells: Record<string, string> = {
      engine: `${engineLabel(row.engine)}${isGemini(row.engine) ? ` (${engineCopy.notProbedNote})` : ''}`,
    }
    job.contexts.forEach((context, index) => {
      const cell = job.board.cells.find(
        (entry) => entry.engine === row.engine && entry.context === context,
      )
      cells[`c${index}`] = cellLabel(cell?.state === 'unmeasured' ? 'unmeasured' : 'pending')
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

export { statusCopy }
