import { fitItems, type FitAnswer, type FitItemId } from '@/content/forms/fit-tool'

/**
 * Scoring for the "Is Hendricks a fit?" tool (15 section 3, CANON R8).
 *
 * Advisory bands, never a number and never a gate. The whole point of keeping
 * this pure is that the reading can be tested exhaustively without a browser
 * and without a network, which is also the property the tool has to hold at
 * runtime: no storage, no request, no event.
 */

export type FitAnswers = Partial<Record<FitItemId, FitAnswer>>

export type FitBand = 'strong' | 'possible' | 'not-a-fit'

export type FitReading = {
  band: FitBand
  /** The approved items that carried signal, verbatim, in question order. */
  drivers: FitItemId[]
}

export const FIT_ITEM_COUNT = fitItems.length

export function answeredCount(answers: FitAnswers): number {
  return fitItems.filter((item) => answers[item.id] !== undefined).length
}

export function isComplete(answers: FitAnswers): boolean {
  return answeredCount(answers) === FIT_ITEM_COUNT
}

/**
 * Reads the answers into a band.
 *
 * G4 ("Have enough authority to implement changes") and N8 ("Recommendations
 * the organization has no authority to implement") are two sides of one
 * question. Answering Yes to both is a contradiction, and the rule resolves it
 * downward rather than letting the two cancel: N8 stays counted and G4 does
 * not, so a contradiction lowers the reading instead of disappearing from it.
 *
 * N1 is decisive alone. "Guaranteed ChatGPT citations" is the one answer that
 * ends the reading whatever else is true, because Hendricks commits to
 * producing the reading and improving the conditions the brand controls, never
 * to the citation itself.
 */
export function readFit(answers: FitAnswers): FitReading | null {
  if (!isComplete(answers)) return null

  const yes = (id: FitItemId) => answers[id] === 'yes'
  const contradiction = yes('G4') && yes('N8')

  const goodIds = fitItems.filter((item) => item.side === 'good').map((item) => item.id)
  const notIds = fitItems.filter((item) => item.side === 'not').map((item) => item.id)

  const good = goodIds.filter((id) => yes(id) && !(id === 'G4' && contradiction)).length
  const not = notIds.filter((id) => yes(id)).length

  const band: FitBand =
    good >= 5 && not === 0
      ? 'strong'
      : not >= 2 || good <= 2 || yes('N1')
        ? 'not-a-fit'
        : 'possible'

  return { band, drivers: driversFor(band, answers) }
}

/**
 * The answers that pointed at the reading.
 *
 * A strong reading is explained by what matched. A not-a-fit reading is
 * explained by what did not, because listing the matches there would read as
 * an argument against the reading the tool just gave. A possible reading is
 * explained by both, since the mixture is the reading.
 */
function driversFor(band: FitBand, answers: FitAnswers): FitItemId[] {
  return fitItems
    .filter((item) => {
      const answer = answers[item.id]

      // A "not designed for" item speaks only when the answer is Yes. Answered
      // No it is the default, and listing it would pad the explanation with
      // fourteen lines of nothing.
      if (item.side === 'not') return answer === 'yes'

      if (band === 'strong') return answer === 'yes'
      if (band === 'not-a-fit') return answer === 'no'
      return true
    })
    .map((item) => item.id)
}
