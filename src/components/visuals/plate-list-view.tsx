import { ILLUSTRATIVE_CAPTION, plateChrome } from '@/content/shared/chrome'
import { evidenceOf, hasGap, reaches, type ResolvedBrand, type ResolvedScenario } from '@/lib/selection-map/resolve'
import { BRAND_STAGES, type BrandStage, type SelectionMapData } from '@/lib/selection-map/schema'

/**
 * The instrument's two text equivalents.
 *
 * `PlateStates` is one line per brand in the 04 state words, always in the
 * server HTML and shown at mobile, where a 270 unit drawing cannot carry its
 * own labels. It is what a crawler and a reader without the drawing get.
 *
 * `PlateListView` is the same frame as a table, under the "View as list"
 * control. Present in the server HTML under `hidden`, so the alternative
 * exists before any script runs and the control only reveals it.
 */

/** The 04 words for one brand, in path order, as the state list reads them out. */
function wordsOf(brand: ResolvedBrand): string[] {
  const words: string[] = [brand.discovery]
  if (brand.discovery !== 'visible') return words

  words.push(brand.understanding === 'misunderstood' ? 'misunderstood' : 'accurate')
  if (hasGap(brand)) words.push('evidence missing')
  if (brand.consideration === 'not considered; exits') return [...words, brand.consideration]

  words.push('considered')
  if (brand.recommendation === 'not shortlisted; exits') return [...words, brand.recommendation]

  words.push('shortlisted')
  if (brand.selection !== '(exited)') words.push(brand.selection)
  return words
}

export function PlateStates({ resolved }: { resolved: ResolvedScenario }) {
  return (
    <ul className="plate-states">
      {resolved.rows.map((brand) => (
        <li key={brand.id}>
          <b>{brand.label}</b> {wordsOf(brand).join(', ')}
          {brand.understandingGloss ? ` (${brand.understandingGloss})` : null}
        </li>
      ))}
    </ul>
  )
}

/** One table cell. Evidence collapses to whether the lanes are complete, which is what the drawing says. */
function cellOf(brand: ResolvedBrand, stage: BrandStage): string {
  if (stage === 'evidence') {
    if (!reaches(brand, 'evidence') || evidenceOf(brand) === null) return '(exited)'
    return hasGap(brand) ? 'evidence missing' : 'sources observed'
  }
  if (stage === 'understanding' && brand.understanding === 'misunderstood' && brand.understandingGloss) {
    return `misunderstood: ${brand.understandingGloss}`
  }
  if (stage === 'impact' && brand.impact === 'outcome connected') return plateChrome.impactLedger
  return brand[stage]
}

export function PlateListView({
  data,
  resolved,
  index,
  count,
  hidden,
}: {
  data: SelectionMapData
  resolved: ResolvedScenario
  index: number
  count: number
  hidden: boolean
}) {
  const label = (stage: BrandStage) => data.stages.find((candidate) => candidate.id === stage)!.label

  return (
    <div className="plate-list" hidden={hidden}>
      <table>
        <caption className="sr-only">
          {`${plateChrome.listRegion}, question ${index} of ${count}. ${ILLUSTRATIVE_CAPTION}`}
        </caption>
        <thead>
          <tr>
            <th>{plateChrome.brandColumn}</th>
            {BRAND_STAGES.map((stage) => (
              <th key={stage}>{label(stage)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {resolved.rows.map((brand) => {
            return (
              <tr key={brand.id}>
                <th scope="row">{brand.label}</th>
                {BRAND_STAGES.map((stage) => (
                  <td key={stage}>{cellOf(brand, stage)}</td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
