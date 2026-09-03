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

  // One string for the caption and the region's name (SM-08). A region named
  // more briefly than its caption tells a screen reader moving by landmark less
  // than the table tells a reader already inside it, including which of the
  // three questions is on screen and that the data is illustrative.
  const caption = `${plateChrome.listRegion}, question ${index} of ${count}. ${ILLUSTRATIVE_CAPTION}`

  return (
    <div className="plate-listview" hidden={hidden}>
      {/* It scrolls at narrow widths, so it is a named region and a keyboard
          stop. Without that a keyboard-only reader can reach the table's
          contents at 1440 and not at 320, where the table is exactly what the
          drawing is not. */}
      <div className="plate-list" role="region" aria-label={caption} tabIndex={0}>
        <table>
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr>
              <th scope="col">{plateChrome.brandColumn}</th>
              {BRAND_STAGES.map((stage) => (
                <th key={stage} scope="col">
                  {label(stage)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {resolved.rows.map((brand) => (
              <tr key={brand.id}>
                <th scope="row">{brand.label}</th>
                {BRAND_STAGES.map((stage) => (
                  <td key={stage}>{cellOf(brand, stage)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 16 SM-08. The table is wider than a phone, so the hint says so. It is
          `aria-hidden` because the scroll region is already a named keyboard
          stop that a screen reader reaches and announces on its own. */}
      <p aria-hidden="true" className="plate-list-hint">
        {plateChrome.scrollHint}
      </p>
    </div>
  )
}
