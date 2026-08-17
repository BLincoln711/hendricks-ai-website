# 05 — CMS and Content Model

## 1. CMS strategy

Use Sanity for content that benefits from editorial workflow and repeated publishing:

- Research articles
- Authors
- Categories
- Methodology documents
- Verified case studies
- Optional source records

Keep approved commercial page copy in version control at launch. Do not build a generic page builder for the full site.

## 2. Why the hybrid model

It provides:

- Version-controlled commercial messaging
- Predictable custom layouts
- Lower page-builder complexity
- Editorial flexibility for research
- Structured case-study proof
- A clean future migration path if more page content needs CMS editing

## 3. Sanity document types

### `author`

Fields:

- `name` — required string
- `slug` — required slug
- `role` — string
- `shortBio` — text
- `fullBio` — Portable Text
- `headshot` — image with alt text
- `credentials` — array of strings
- `socialLinks` — array of verified URL objects
- `isFounder` — boolean
- `externalVentures` — array; The Search Economy can appear here for Brandon

Validation:

- Headshot alt text required when image exists.
- Social links require label and valid URL.
- Do not publish unverified credentials.

### `category`

Fields:

- `title`
- `slug`
- `description`
- `colorToken`

Approved categories:

- Search Intelligence Engineering
- AI Selection Problem
- Selection Intelligence
- Search Demand
- AI-Mediated Search
- Search Presence Engineering
- Total Search
- Measurement and Attribution
- Data and Systems

Do not create a The Search Economy category.

### `article`

Fields:

- `title`
- `slug`
- `dek`
- `directAnswer`
- `keyFindings[]`
- `body` Portable Text
- `author` reference
- `categories[]`
- `heroImage`
- `heroImageAlt`
- `publishedAt`
- `updatedAt`
- `dataThroughDate`
- `methodology` Portable Text
- `limitations` Portable Text
- `sources[]`
- `relatedArticles[]`
- `relatedSolution`
- `seoTitle`
- `seoDescription`
- `canonicalOverride`
- `noIndex`
- `featured`

Source object fields:

- `title`
- `publisher`
- `url`
- `publishedAt`
- `accessedAt`
- `sourceType`
- `notes`

Validation:

- Published articles require author, direct answer, published date, SEO title, SEO description, and at least one category.
- Data-driven articles require methodology and limitations.
- Do not set `updatedAt` for cosmetic changes only.

### `caseStudy`

Fields:

- `title`
- `slug`
- `status` — named-approved / anonymized-verified / research-experiment
- `clientName` — optional
- `clientLogo` — optional and permission-gated
- `industry`
- `businessProblem`
- `baseline`
- `intervention`
- `timeframe`
- `results[]`
- `businessOutcome`
- `measurementSources[]`
- `evidenceGrade` — A/B/C/D
- `limitations`
- `clientQuote` — optional and permission-gated
- `relatedSolutions[]`
- `publishedAt`
- `seoTitle`
- `seoDescription`
- `approvedForPublicUse` — required boolean
- `permissionRecord` — internal text/reference

Validation:

- Cannot publish unless `approvedForPublicUse` is true.
- Named client requires explicit permission record.
- Every result requires baseline, final value, unit, timeframe, and source.
- Limitations are mandatory.
- No client logo without permission.

### `methodologyDocument`

Fields:

- `title`
- `slug`
- `summary`
- `version`
- `effectiveDate`
- `body`
- `definitions[]`
- `evidenceGrades[]`
- `changeLog[]`
- `author`
- `seoTitle`
- `seoDescription`

## 4. Portable Text blocks

Support only needed blocks:

- Paragraph
- H2/H3/H4
- Bulleted and numbered lists
- Quote
- Callout
- Data table
- Figure/chart
- Code or query example
- Source note
- Methodology note
- Limitations note
- CTA link

Avoid unrestricted embedded HTML.

## 5. Studio structure

Organize Sanity Studio:

1. Research
   - Articles
   - Categories
   - Methodology
2. Results
   - Approved case studies
   - Draft case studies
3. People
   - Authors
4. Site operations
   - Redirect records if managed in CMS
   - Editorial settings

Use desk structure to make proof status visible.

## 6. Editorial workflow

Suggested statuses:

1. Draft
2. Evidence review
3. Editorial review
4. Legal/client permission review when needed
5. Approved
6. Published
7. Correction required
8. Archived

Do not equate a Sanity published state with business approval. Use explicit approval fields for case studies.

## 7. Content queries

Use `defineQuery` and Sanity TypeGen.

Required queries:

- Research index with pagination
- Featured research
- Article by slug
- Related articles
- Author by slug
- Approved case studies
- Case study by slug
- Methodology by slug

Fetch only required fields. Avoid passing large Portable Text documents to client components.

## 8. Caching and revalidation

- Use stable cached queries for published content.
- Use tags for articles, authors, categories, and case studies.
- Revalidate on Sanity webhook after publish/update.
- Draft mode uses uncached draft perspective and is protected by a secret.
- Never expose read tokens to the browser.

## 9. Visual editing

Optional for CMS-managed content:

- Enable Sanity Presentation Tool.
- Support click-to-edit overlays on research and case studies.
- Do not create editable overlays for version-controlled marketing copy.
- Ensure preview routes are noindex.

## 10. Seeding content

Create a seed script or import file for:

- Brandon author record
- Approved research categories
- Methodology document shell
- Initial category-definition articles

Do not seed fake case studies.

## 11. The Search Economy data rule

In Brandon's `externalVentures` field, use:

- Name: The Search Economy
- URL: `https://thesearcheconomy.com`
- Description: Independent publication summarizing and contextualizing Google Trends data.

Do not ingest or syndicate The Search Economy content into Hendricks.ai unless a separate future decision explicitly authorizes it.
