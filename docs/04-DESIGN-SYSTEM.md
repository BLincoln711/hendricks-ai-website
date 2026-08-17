# 04 — Hendricks Design System

## 1. Creative direction

### Design concept

**Instrument-Grade Search Intelligence**

The website should feel like a premium intelligence instrument: precise, controlled, editorial, technically credible, and commercially serious.

It should not feel like:

- A generic AI startup
- A cyberpunk product
- A conventional SEO agency
- A crypto brand
- A content mill
- A sales-led SaaS template
- A consulting site filled with stock photography

## 2. Brand character

- Intelligent
- Direct
- Calm
- Authoritative
- Evidence-led
- Modern without being trendy
- Technical without being inaccessible
- Premium without feeling exclusive or ornamental

## 3. Wordmark and signal dot

### Visual wordmark

`Hendricks.`

The period is the **signal dot**.

It represents:

- A query
- A data point
- A checkpoint
- A decision
- A resolved recommendation

### Usage

- Use the period in the visual wordmark.
- Do not force the period into normal prose or SEO metadata.
- The dot can animate subtly in diagrams and status indicators.
- Do not scatter decorative dots across every section.

## 4. Color tokens

### Core palette

| Token | Hex | Role |
|---|---:|---|
| Intelligence Navy | `#071A2B` | Primary dark surface, authority, headings |
| Deep Navy | `#0B253A` | Alternate dark surface |
| Signal Blue | `#2458E6` | Primary action, active state, links |
| Signal Blue Hover | `#1946C8` | Primary hover |
| Insight Cyan | `#00C2D8` | Discovery, connecting paths, secondary accent |
| Decision Amber | `#F3A712` | Decision points, selected nodes, controlled warnings |
| Field White | `#F7F9FC` | Main light background |
| Pure White | `#FFFFFF` | Cards and high-contrast surfaces |
| Graphite | `#18222D` | Body text |
| Slate | `#5E6C7B` | Secondary text |
| Instrument Gray | `#D9E1E8` | Borders, grids, disabled states |
| Soft Gray | `#EDF2F6` | Light section separation |
| Positive | `#15856A` | Verified success or positive movement |
| Destructive | `#B42318` | Errors only |

### Color rules

- Use Navy text on Cyan and Amber backgrounds.
- Do not use white text on Amber for small text.
- Signal Blue is the default CTA color.
- Cyan is a supporting path or discovery accent, not the primary CTA.
- Amber is used sparingly for final decision nodes or important gaps.
- Avoid gradients as default backgrounds. If a gradient is used, keep it subtle and tonal.
- Maintain WCAG AA contrast for all text and controls.

## 5. CSS token example

```css
:root {
  --color-navy: #071a2b;
  --color-navy-2: #0b253a;
  --color-blue: #2458e6;
  --color-blue-hover: #1946c8;
  --color-cyan: #00c2d8;
  --color-amber: #f3a712;
  --color-field: #f7f9fc;
  --color-white: #ffffff;
  --color-graphite: #18222d;
  --color-slate: #5e6c7b;
  --color-border: #d9e1e8;
  --color-soft: #edf2f6;
  --color-positive: #15856a;
  --color-destructive: #b42318;
}
```

Map these to shadcn semantic tokens such as `background`, `foreground`, `primary`, `muted`, `border`, and `destructive`.

## 6. Typography

### Families

- **Geist Sans:** navigation, headings, body, forms, buttons, tables
- **Geist Mono:** query examples, metrics, dates, source labels, model names, technical annotations

Do not introduce another body or display family at launch.

### Type scale

Use fluid `clamp()` values.

| Style | Desktop target | Mobile target | Notes |
|---|---:|---:|---|
| Display | 80–104px | 48–58px | Rare, short phrases only |
| H1 | 64–84px | 42–52px | Tight tracking, 1.0–1.08 line height |
| H2 | 42–56px | 32–40px | Primary section headings |
| H3 | 26–34px | 24–28px | Cards and subsections |
| Lead | 20–24px | 18–20px | Max 68–72 characters per line |
| Body | 17–18px | 16–17px | 1.6–1.75 line height |
| Small | 14–15px | 14px | Metadata and supporting text |
| Eyebrow | 12–13px | 12px | Uppercase, mono or sans, tracked |

### Typographic rules

- Headlines are concise and declarative.
- Use restrained weights: 500–650 is preferred over making every heading 800.
- Use tight negative tracking on large headlines.
- Keep paragraphs readable; avoid walls of centered text.
- Use centered copy only for short hero or CTA text.
- Use mono typography for data and query examples, not long paragraphs.

## 7. Layout system

### Container widths

- Site max: `1440px`
- Standard content: `1280px`
- Narrow editorial: `760px`
- Wide data/table: `1200px`

### Gutters

- Mobile: `20–24px`
- Tablet: `32–40px`
- Desktop: `48–64px`

### Vertical rhythm

- Small section: `64px` desktop / `48px` mobile
- Standard section: `96px` desktop / `64px` mobile
- Major section: `128px` desktop / `80px` mobile

### Grid

- 12-column desktop grid
- 6-column tablet grid
- 4-column mobile grid
- Use asymmetric layouts where they improve hierarchy.
- Avoid a page made entirely of equal four-card grids.

## 8. Radius and borders

- Small control radius: `8px`
- Button/input radius: `10px`
- Card radius: `16px`
- Large visual-panel radius: `20px`
- Pills only for tags, not every button.
- Standard border: `1px solid var(--color-border)`
- Use borders and spacing more than heavy shadows.

## 9. Shadows

Use restrained shadows:

- Card resting: very subtle or none
- Raised interactive panel: light diffusion
- Dialog: stronger but still clean
- No neon glow
- No permanent blue outer glow around cards

## 10. Buttons

### Primary

- Signal Blue background
- White label
- Height 48–52px
- Medium weight
- Clear focus ring
- Hover darkens, not scales dramatically

### Secondary

- Transparent or white background
- Navy/Graphite label
- Visible border

### Tertiary link

- Text plus arrow
- Underline or color/focus change
- Never rely on arrow alone

### CTA copy

Good:

- Start with a Diagnostic
- Explore Selection Intelligence
- See How It Works
- Discuss an Agency Partnership

Avoid:

- Learn More
- Click Here
- Get Started when the action is unclear
- Book a Demo

## 11. Header

### Desktop

- Height around 76–84px
- Wordmark left
- Navigation centered/right
- Primary CTA at far right
- Transparent over hero only if contrast remains strong
- Becomes solid/sticky after scroll with minimal shadow or border

### Mobile

- Height around 64–72px
- Wordmark left
- Accessible menu trigger right
- Menu opens as a full-height or near-full-height sheet
- Focus is trapped and restored properly

## 12. Hero design

### Composition

- Dark navy or high-contrast light hero
- Strong H1 and lead
- Two CTAs maximum
- Selection Map visual adjacent or below
- Operating line as a compact proof strip

### Selection Map visual

The visual should show:

1. A customer need enters.
2. Context modifies the need.
3. Several brands become candidates.
4. Evidence/source pathways strengthen or weaken candidates.
5. A shortlist resolves.
6. Impact measurement appears after selection.

Use accessible SVG and HTML labels. Provide a text summary. Reduced motion shows the final state immediately.

Required label:

**Illustrative interface. Not a client result.**

## 13. Section patterns

### Problem statement

Large editorial copy with a compact traditional-versus-AI journey diagram.

### Four solutions

Use a staggered or two-by-two system with distinct visual motifs, not four identical SaaS cards.

### Methodology

Use a horizontal path on desktop and vertical timeline on mobile.

### Metrics and evidence

Use a table or structured matrix. Avoid unexplained gauge charts.

### Audience split

Two strong columns: For Brands and For Agencies. Each must feel like a distinct path.

### Founder section

Use a real portrait and editorial biography. Avoid a giant client-logo wall.

### Final CTA

High-contrast section with one primary action and one supporting link.

## 14. Motion

### Principles

- Motion explains relationships.
- Motion never delays access to content.
- Motion never causes layout shift.
- Motion stops or simplifies under `prefers-reduced-motion`.

### Timing

- Micro interaction: 140–200ms
- Standard transition: 200–280ms
- Diagram sequence: 600–1000ms total

### Allowed

- Signal dot following a path
- Node activation
- Underline or arrow movement
- Subtle card elevation
- Fade/translate on first entry with content already present

### Avoid

- Scroll-jacking
- Auto-playing carousels
- Infinite text marquees
- Dramatic 3D effects
- Constant pulsing everywhere
- Cursor-following effects
- Motion that makes diagrams impossible to read

## 15. Imagery

### Use

- Real portraits of Brandon
- Original research charts
- Search-demand maps
- Source networks
- Query clusters
- Decision paths
- Workshops or speaking photography when real
- Screenshots of real systems only with permission and redaction

### Do not use

- Robot heads
- AI brains
- Floating cubes
- Glowing circuit boards
- Generic handshakes
- Fake dashboards
- Fabricated result screenshots
- Unlicensed customer logos

## 16. Icons

Use Lucide icons sparingly.

- Standard stroke width
- Do not use icons as decoration in every card
- Pair unfamiliar icons with labels
- Avoid mixing icon families

## 17. Responsive behavior

- No horizontal page overflow at 320px width.
- Tables use a deliberate mobile pattern: stacked rows, scroll region with label, or reformatted cards.
- Diagrams become vertical without losing relationships.
- Touch targets are at least 44×44px.
- Primary CTA remains easy to reach without becoming a persistent intrusive bar.
- Long headings wrap intentionally; no orphaned single words where avoidable.

## 18. Design QA checklist

- The page does not look like a stock template.
- The hero communicates the category before the visual impresses.
- Every diagram teaches a concept.
- The four solutions are visually distinct but belong to one system.
- No fake data appears.
- The Search Economy appears only on the About page in the founder context.
- Mobile feels designed, not collapsed.
- Focus states are visually consistent.
- Motion can be disabled without losing content.
