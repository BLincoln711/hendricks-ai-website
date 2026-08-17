/**
 * Structure for the long-form legal documents (`/privacy`, `/terms`).
 *
 * Modelled as blocks rather than a markdown string so the renderer produces real
 * headings, lists, and tables. A legal notice has to survive being read with a
 * screen reader and being quoted section by section, and a wall of prose cannot
 * do either.
 *
 * Paragraph text supports two inline forms only: `[label](/path)` links and
 * `**bold**`. Anything richer belongs in a block type.
 */

export type LegalBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'subheading'; text: string }
  | { type: 'list'; items: readonly string[] }
  | {
      type: 'table'
      caption: string
      columns: readonly string[]
      rows: readonly (readonly string[])[]
    }

export type LegalSection = {
  /** Stable anchor. Used by the contents list and by external citation. */
  id: string
  title: string
  blocks: readonly LegalBlock[]
}

export type LegalDocument = {
  meta: { title: string; description: string }
  hero: { eyebrow: string; title: string }
  /** ISO dates. Rendered through `<time>` so they are machine readable. */
  effectiveDate: string
  lastUpdated: string
  intro: readonly string[]
  sections: readonly LegalSection[]
}
