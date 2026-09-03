/**
 * Instrument chrome: the labels, headings and connectives Plate 01 renders
 * that are neither claims nor CTAs. Transcribed once, so the copy gate has one
 * string per row and no two components can spell the same label differently.
 *
 * Every string below is verbatim from the approved canvas page
 * `07-hifi/home-v3.html`, checked word for word and case for case, except the
 * list-view caption, which uses the locked illustrative line in place of the
 * canvas's shortened variant of it.
 *
 * Two pieces of the instrument's copy are deliberately not here. The six
 * source labels are data, not chrome, and live in
 * `src/content/instruments/selection-map-data.ts` in the canvas's own lower
 * case. The order the ledger names brands in is derived, and the one
 * departure from the 04 appendix is recorded in `ledgerRowsOf`.
 */

/** The locked illustrative caption (CANON section 2). */
export const ILLUSTRATIVE_CAPTION = 'Illustrative interface. Not a client result.'

export const plateChrome = {
  number: 'Plate 01',
  title: 'Selection Map',
  gloss: 'Where a brand enters or leaves the shortlist, for an illustrative question.',
  pickerLegend: 'Choose an illustrative customer question',
  questionLabel: (index: number) => `Question ${index}`,
  sourcesHeading: 'Sources cited at Evidence',
  notCited: 'not cited in this scenario',
  missingFor: 'missing for',
  impactLedger: 'Impact Ledger',
  listRegion: 'Brand states by stage',
  brandColumn: 'Brand',
  /** The three key-row controls. The cycle control names the action it performs. */
  play: 'Play',
  pause: 'Pause',
  playLabel: 'Play the automatic cycle',
  pauseLabel: 'Pause the automatic cycle',
  interventionToggle: 'Show an illustrative intervention',
  listToggle: 'View as list',
  drawingToggle: 'View as drawing',
  /* Live-region sentences (10 decision 10.6). The scenario and intervention lines are per question, in the data. */
  listViewOn: (index: number, count: number) =>
    `List view on. Brand states by stage for question ${index} of ${count}.`,
  listViewOff: 'List view off. The drawing is shown.',
} as const

/** Key-row words: the classes, then the state marks. */
export const keyLabels = {
  observed: 'Observed',
  measured: 'Measured',
  gap: 'evidence missing',
  misunderstood: 'misunderstood',
  exits: 'exits',
} as const
