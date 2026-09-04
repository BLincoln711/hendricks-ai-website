import dynamic from 'next/dynamic'

import { RESTING, SelectionMapFrame } from '@/components/visuals/selection-map-frame'
import type { SelectionMapData } from '@/lib/selection-map/schema'

/**
 * Plate 01, the Selection Map.
 *
 * A Server Component. It resolves the default scenario and renders the whole
 * resting frame as HTML: every mark, every label, the state list, the sources
 * ledger, the list-view table under `hidden`, the text alternative, and the
 * three controls. That HTML is what a visitor with JavaScript off reads and
 * what an AI crawler is served, which is the point: the instrument's answer
 * has to survive without the script that animates it.
 *
 * The island is the page's one client bundle for this figure, split out with
 * `next/dynamic`. It server-renders too, so the resting frame is identical
 * before and after hydration, and it takes over the frame only when a visitor
 * asks for a different one or the automatic cycle steps.
 *
 * Illustrative interface. Not a client result. The locked line is the page
 * legend, not a per-plate caption; this line is here so the sample data gate
 * reads it on the component it registers.
 */
const SelectionMapIsland = dynamic(() =>
  import('@/components/visuals/selection-map-island').then((module) => module.SelectionMapIsland),
)

export function SelectionMapPlate({ data, id = 'plate-01' }: { data: SelectionMapData; id?: string }) {
  return (
    <SelectionMapIsland data={data} id={id}>
      <SelectionMapFrame data={data} state={RESTING} id={id} />
    </SelectionMapIsland>
  )
}
