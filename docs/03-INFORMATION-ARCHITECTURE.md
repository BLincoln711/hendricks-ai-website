# 03 — Information Architecture

## 1. Navigation goals

The navigation must answer three questions:

1. What does Hendricks solve?
2. How does the methodology work?
3. How can this visitor engage?

Do not organize the site around internal technical disciplines such as SEO, PPC, schema, analytics, AI agents, data engineering, and content. Those are delivery capabilities inside the solutions.

## 2. Primary navigation

### Desktop

- **Solutions**
  - Search Demand Intelligence
  - Selection Intelligence
  - Search Presence Engineering
  - Search Impact Measurement
- **How It Works**
- **For Brands**
- **For Agencies**
- **Research**
- **About**
- Button: **Start with a Diagnostic**

### Mobile

Use an accessible sheet/dialog menu with the same hierarchy. The CTA appears as a full-width button after the links.

### Conditional navigation

- **Results** appears only when `showResults` is true.
- No The Search Economy navigation item.
- No Platform navigation item at launch.
- No pricing navigation item at launch.

## 3. Route inventory

| Route | Purpose | Primary audience | Primary CTA | Indexable | Launch status |
|---|---|---|---|---:|---|
| `/` | Explain category, problem, system, and entry offer | Brands + agencies | Start with a Diagnostic | Yes | Required |
| `/solutions` | Orient visitors to four solutions | Brands + agencies | Start with a Diagnostic | Yes | Required |
| `/solutions/search-demand-intelligence` | Explain demand mapping and intent contexts | Brands + agencies | Map Your Search Demand | Yes | Required |
| `/solutions/selection-intelligence` | Explain consideration and recommendation measurement | Brands + agencies | Establish Your Selection Baseline | Yes | Required |
| `/solutions/search-presence-engineering` | Explain implementation layers | Brands + agencies | Discuss a 90-Day Program | Yes | Required |
| `/solutions/search-impact-measurement` | Explain impact and evidence measurement | Brands + agencies | Build Your Impact Baseline | Yes | Required |
| `/diagnostic` | Sell and qualify the paid entry engagement | Brands | Apply for a Diagnostic | Yes | Required |
| `/how-it-works` | Explain Demand-to-Selection System | Brands + agencies | Start with a Diagnostic | Yes | Required |
| `/for-brands` | Explain direct-client model | Brands | Start with a Diagnostic | Yes | Required |
| `/for-agencies` | Explain partner models and protections | Agencies | Discuss a Partnership | Yes | Required |
| `/results` | Verified case studies only | Brands + agencies | Start with a Diagnostic | Conditional | Build hidden |
| `/research` | Editorial index for Hendricks methodology and findings | All | Read research | Yes | Required |
| `/research/[slug]` | Article template | All | Related solution | Yes | Required |
| `/what-is-search-intelligence-engineering` | Own category definition | All | Explore solutions | Yes | Required |
| `/what-is-selection-intelligence` | Own core methodology term | All | Explore Selection Intelligence | Yes | Required |
| `/ai-selection-problem` | Manifesto/problem page | All | Start with a Diagnostic | Yes | Required |
| `/methodology` | Research and measurement standards | Technical buyers | Start with a Diagnostic | Yes | Required |
| `/about` | Founder credibility and company principles | All | Start with a Diagnostic | Yes | Required |
| `/contact` | General routing and qualification | All | Submit inquiry | Yes | Required |
| `/privacy` | Privacy notice | All | None | Yes | Legal review |
| `/terms` | Website terms | All | None | Yes | Legal review |
| `/corrections` | Editorial corrections policy | Research readers | Submit correction | Yes | Required with research |
| `/studio/[[...tool]]` | Sanity Studio | Editors | None | No | Required |

## 4. Homepage journey

The homepage sequence is deliberate:

1. **Category and immediate value**
2. **The AI Selection Problem**
3. **What Hendricks actually does**
4. **Four solutions**
5. **Selection Intelligence distinction**
6. **Demand-to-Selection methodology**
7. **Tangible outputs**
8. **Measurement and honesty**
9. **Brands versus agencies**
10. **Diagnostic entry point**
11. **Proof, when verified**
12. **Founder authority**
13. **Final CTA**

Do not lead with founder biography, tool logos, technology, or a long service list.

## 5. Audience journeys

### Brand journey

```text
Homepage
→ For Brands
→ Relevant solution
→ How It Works / Methodology
→ Diagnostic
→ Application
```

### Agency journey

```text
Homepage
→ For Agencies
→ Partnership model
→ Relevant specialist capability
→ Agency inquiry
```

### Research journey

```text
Organic entrance to definition/article
→ Direct answer
→ Supporting framework
→ Related solution
→ Diagnostic or agency CTA
```

### Founder credibility journey

```text
Homepage founder section
→ About
→ Experience and principles
→ Diagnostic
```

## 6. Internal-linking rules

- Every solution page links to the Diagnostic and at least two relevant research pages.
- Every research page links to one relevant solution and one methodology page.
- Category definitions link to all four solutions where relevant.
- The AI Selection Problem page links to Selection Intelligence and the Diagnostic.
- For Brands links to each engagement type.
- For Agencies links to relevant capabilities but preserves the partnership CTA.
- About links to the Diagnostic and may include the sole Hendricks-site reference to The Search Economy in Brandon's biography.
- Do not use repetitive keyword-rich footer links solely for SEO.

## 7. Breadcrumbs

Use visible breadcrumbs on all routes deeper than one level, including:

- Solution detail pages
- Research articles
- Definition pages where useful
- Case studies

Example:

`Home / Solutions / Selection Intelligence`

Do not display breadcrumbs on the homepage.

## 8. Footer architecture

### Column 1: Solutions

- Search Demand Intelligence
- Selection Intelligence
- Search Presence Engineering
- Search Impact Measurement
- Search Intelligence Diagnostic

### Column 2: Who We Help

- For Brands
- For Agencies

### Column 3: Company

- How It Works
- About
- Contact
- Results only when enabled

### Column 4: Research

- Research Hub
- What Is Search Intelligence Engineering?
- What Is Selection Intelligence?
- The AI Selection Problem
- Methodology

### Legal row

- Privacy
- Terms
- Corrections
- Copyright

Do not place The Search Economy in the footer.

## 9. Page-template families

### Commercial landing pages

- Hero
- Problem/context
- Explanation
- Deliverables or layers
- Process
- Best fit
- Trust/limitations
- CTA

### Definition pages

- Direct answer near top
- Why the concept exists
- What it includes
- What it does not mean
- Comparison table
- Methodology/measurement
- Related solutions
- Sources and update information

### Research articles

- Editorial metadata
- Direct executive answer
- Key findings
- Body with charts/tables
- Methodology
- Limitations
- Sources
- Author
- Related content
- Contextual commercial CTA

### Case studies

- Verified status
- Client context
- Baseline
- Intervention
- Timeframe
- Results
- Measurement source
- Evidence grade
- Limitations
- Related solution

## 10. Feature-flag behavior

### Results

When `showResults` is false:

- Omit Results from navigation and footer.
- Route may return `notFound()` in production.
- Preview may render with `noindex` for internal review.

When true:

- Require at least two approved entries.
- Every entry must pass content verification.

### Newsletter

Do not display newsletter forms until a provider, consent language, and data-handling policy are approved.
