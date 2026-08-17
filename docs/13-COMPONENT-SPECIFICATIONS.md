# 13 — Component Specifications

## 1. Component philosophy

Components should make the approved strategy repeatable without flattening every page into the same card grid.

- Use semantic primitives.
- Keep content and presentation separate.
- Use Server Components unless interaction requires a client boundary.
- Expose variants only when the design system defines a real use case.
- Avoid highly generic “render anything” components.

## 2. Global layout components

### `SiteHeader`

**Responsibilities**

- Render wordmark, desktop navigation, mobile menu trigger, and primary CTA.
- Become visually solid after scroll without shifting layout.
- Mark current route.

**Props**

```ts
type SiteHeaderProps = {
  navigation: NavigationItem[]
  primaryCta: Cta
  transparentOverHero?: boolean
}
```

**States**

- Default top
- Scrolled
- Mobile open
- Keyboard focus

**Accessibility**

- `aria-label="Primary navigation"`
- Menu trigger has expanded and controls states.
- Focus returns to trigger after close.

### `SiteFooter`

**Responsibilities**

- Render four approved navigation columns and legal row.
- Display category and operating line.
- Omit Results when disabled.
- Never include The Search Economy.

### `Breadcrumbs`

**Props**

```ts
type BreadcrumbItem = {
  label: string
  href?: string
}
```

Render visible breadcrumbs and matching JSON-LD from one data source.

## 3. Content primitives

### `Section`

Variants:

- `field`
- `white`
- `navy`
- `soft`

Props include `id`, `size`, and `ariaLabelledBy`.

### `SectionHeading`

```ts
type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  level?: 2 | 3
  maxWidth?: 'narrow' | 'standard' | 'wide'
}
```

Do not center long explanatory paragraphs.

### `DirectAnswer`

Used on definition and research pages. Visually distinguishes the concise answer without resembling a generic quote card.

### `Callout`

Variants:

- Insight
- Limitation
- Methodology
- Warning

A callout must have a visible label and cannot rely on color alone.

### `DataTable`

- Server-rendered table.
- Caption required.
- Mobile behavior selected per table: stacked, scrollable, or transformed.
- If scrollable, provide a focusable region and visible “Scroll horizontally” hint.

## 4. CTA components

### `PrimaryCta`

```ts
type Cta = {
  label: string
  href: string
  analytics?: {
    location: string
    audienceType?: 'brand' | 'agency'
    solutionName?: string
  }
  external?: boolean
}
```

External links render an accessible external-link indication. The Search Economy link uses this pattern on About only.

### `CtaGroup`

Maximum two CTAs. The first is visually primary.

## 5. Hero components

### `PageHero`

Variants:

- `home`
- `commercial`
- `editorial`
- `form`

Props:

```ts
type PageHeroProps = {
  eyebrow?: string
  title: string
  subtitle?: string
  lead: string
  primaryCta?: Cta
  secondaryCta?: Cta
  proofLine?: string
  visual?: ReactNode
  theme?: 'navy' | 'field' | 'white'
}
```

### `SelectionMap`

**Purpose**

Demonstrate the path from need to shortlist and impact.

**Implementation**

- Server-render the full accessible SVG/HTML structure.
- Small client component may add progressive animation after hydration.
- Use CSS variables for node states.
- Final state is visible immediately in reduced-motion mode.

**Nodes**

1. Customer need
2. Context
3. Discovery
4. Evidence
5. Candidate brands
6. Shortlist
7. Impact

**Required states**

- Default static
- Animated once on entry
- Reduced motion
- Narrow/mobile vertical layout

**Accessibility**

- `figure` with `figcaption`.
- Hidden or visible structured text summary.
- Do not expose every decorative path to assistive technology.

**Label**

Illustrative interface. Not a client result.

## 6. Problem and methodology visuals

### `TraditionalVsAiFlow`

Displays two process rows:

- Traditional: Query → Results → Website → Conversion
- AI-mediated: Need → Interpretation → Research → Comparison → Shortlist → Choice

On mobile, stack the two rows with clear labels.

### `DemandToSelectionPath`

Stages:

- Demand
- Context
- Discovery
- Understanding
- Relevance
- Trust
- Consideration
- Recommendation
- Selection
- Revenue

Allow a compact homepage version and a detailed methodology version.

### `ContextPanelDiagram`

Four quadrants:

- Neutral baseline
- Cohort context
- Journey context
- Platform/time panel

Each quadrant includes the question answered.

### `EvidenceGradeMatrix`

Accessible table for grades A–D. Do not turn it into a decorative radar chart.

## 7. Solution components

### `SolutionFeature`

Use one per solution on the homepage and overview page.

```ts
type SolutionFeatureProps = {
  number: string
  name: string
  title: string
  description: string
  outputs?: string[]
  href: string
  motif: 'demand' | 'selection' | 'presence' | 'impact'
}
```

Motifs:

- Demand: query cluster
- Selection: shortlist nodes
- Presence: connected evidence layers
- Impact: exposure-to-revenue path

Do not use four identical icons in circles.

### `EngineeringLayer`

Used on Search Presence Engineering. Supports number, title, description, and work items.

### `MetricDefinition`

Used for observed consideration, recommendation, stability, evidence coverage, and Commercial Selection Gap.

## 8. Audience components

### `AudiencePath`

Variants: brand and agency.

Includes:

- Audience label
- Core outcome
- Description
- 3–5 supporting points
- CTA

### `PartnershipModel`

Used on For Agencies. Must make white-label, embedded, co-branded, and system-builder models visually distinct.

## 9. Founder components

### `FounderFeature`

Homepage founder module:

- Portrait
- Name and role
- Short biography
- Link to About

Do not mention The Search Economy here.

### `ExternalVentureCard`

About page only.

- Label: Also founded by Brandon
- Brand: The Search Economy
- Description: independent Google Trends publication
- External link
- Visually secondary to Hendricks biography
- Never use solution-card styling

## 10. Research components

### `ArticleCard`

Fields:

- Category
- Title
- Dek
- Author
- Date
- Optional data-through date

### `ArticleHeader`

- Breadcrumbs
- Category
- H1
- Dek
- Author
- Published/updated/data-through dates
- Optional hero image

### `ResearchMetadata`

Displays methodology, sources, limitations, and corrections links consistently.

### `SourceList`

- Ordered or grouped list
- Publisher, title, date, link
- External link indication
- No raw tracking parameters

## 11. Forms

### `DiagnosticApplicationForm`

Recommended layout:

- Single page with clearly grouped fieldsets unless user testing supports multistep.
- Sticky or repeated context is not required.
- Show investment qualifier transparently.

**States**

- Idle
- Client validation errors
- Submitting
- Server validation errors
- Rate limited
- Delivery error
- Success

**Rules**

- Disable only during active submission.
- Preserve entered values after recoverable errors.
- Do not hide the form behind a modal.
- Do not automatically redirect to a calendar after success.

### `FormErrorSummary`

- Receives field errors.
- Renders links to affected controls.
- Receives focus after failed submit.

### `FormSuccess`

- Announces success.
- Explains what happens next without promising a response time.
- Provides link back to relevant content.

## 12. Navigation behavior

### Solutions dropdown

- Use accessible Navigation Menu or a simple disclosure.
- Four solution links with one-line descriptions.
- Do not add dozens of links.
- Keyboard arrow behavior must work if using menu semantics.

### Mobile menu

- Full navigation hierarchy.
- No hover-dependent behavior.
- Close on route change and Escape.

## 13. Loading and empty states

### Research

- Server-rendered loading skeleton only if needed.
- Empty category state explains no published content exists.

### Results

- Never show an empty public page. Feature flag disables route.

### Forms

- Progress state uses text such as “Submitting application…”
- Avoid spinner-only state.

## 14. Analytics integration

Components call a typed helper:

```ts
trackEvent('primary_cta_click', {
  cta_label: label,
  cta_location: location,
  destination_url: href,
})
```

No component should directly know GTM implementation details.
