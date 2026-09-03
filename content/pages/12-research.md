# Research Hub

## Route

`/research`

## SEO

**Title:** Search Intelligence Research and Methodology | Hendricks

**Description:** Research on search demand, AI visibility, Selection Intelligence, paid and organic acquisition, measurement, data engineering, and the changing customer decision journey.

**H1:** Research for the AI Search Era.

## Hero

**Eyebrow:** HENDRICKS RESEARCH

# Research for the AI Search Era.

Practical, source-supported research on how people search, how brands enter consideration, how AI-mediated discovery changes the buying journey, and how organizations can measure the commercial result.

**Primary CTA:** Explore the Latest Research

## Important distinction

Hendricks Research supports the firm’s professional methodology and category education.

It is not The Search Economy. Do not import The Search Economy content or branding into this section.

## Categories

- Search Intelligence Engineering
- The AI Selection Problem
- Selection Intelligence
- Search Demand
- AI-Mediated Search
- Search Presence Engineering
- Measurement and Attribution
- Data and Systems

## Featured foundational pages

- What Is Search Intelligence Engineering?
- What Is Selection Intelligence?
- The AI Selection Problem
- Why One AI Prompt Does Not Have One Universal Ranking
- How to Connect AI Search Visibility With Pipeline and Revenue
- Search Presence Engineering: The Seven Layers

## Card requirements

Every card shows:

- Category
- Title
- Short summary
- Author
- Published or meaningfully updated date
- Reading time only if accurately calculated

Do not show fake popularity metrics.

## Publication standards

Every substantial research page should include:

- A direct executive answer
- Key findings
- Definitions
- Data or primary evidence
- Methodology
- Sample and date range
- Assumptions
- Limitations
- Author
- Published date
- Meaningful updated date
- Data-through date
- Source list
- Corrections link
- Related solution
- Related research

## Empty-state rule

Do not launch a research index with no meaningful content. Publish at least the three category foundation pages before linking Research in the primary navigation.

---

## Rendered section copy (authored, pending editorial review)

Provenance note, recorded here rather than assumed. Everything above this line is
approved copy. Everything below it was authored alongside `src/content/research/hub.ts`
when the hub was built, because the approved file specifies the hero, the categories,
the card requirements, and the publication standards, and specifies no headings for the
sections that render them. It is mirrored here so the two files stay in step and so
`check:content` sees the same strings the page renders. Treat it like rows A3 and A4 in
`CONTENT_VERIFICATION.md`: authored, corroborated by its twin, not yet approved.

### Latest study section

**Eyebrow:** PUBLISHED

**Title:** The latest study.

The section renders the newest published study as a full-width panel and any further
studies as a grid beneath it. With one study the grid does not render at all, so the
section is complete rather than sparse. Each card carries category, the research-experiment
label, title, summary, author, published date, and data-through date. No reading time,
because nothing in the repository counts the words of a rendered page and the approved
card requirements allow reading time only if accurately calculated. No popularity metric
of any kind.

### Coverage section

**Eyebrow:** COVERAGE

**Title:** What this section covers.

**Description:** Hendricks Research supports the firm’s professional methodology and category education.

Renders the nine approved categories as the subject areas the section covers. They are
not filters and they carry no counts, because a count of zero against eight of nine
categories describes the publication schedule rather than the scope.

### Foundations section

**Eyebrow:** FOUNDATIONS

**Title:** Start with the category pages.

**Description:** The vocabulary the studies are written in, defined on pages of their own.

Renders the approved "Featured foundational pages" list, filtered to the entries whose
routes exist. Two are held back. "How to Connect AI Search Visibility With Pipeline and
Revenue" has no owning URL, and inventing one here would record a link no decision
supports. "Why One AI Prompt Does Not Have One Universal Ranking" has an owning URL in
`docs/17` section 3.2 and appears automatically once that route is built.

Card descriptions, in list order:

- What Is Search Intelligence Engineering? The category, defined before anything is sold under it.
- What Is Selection Intelligence? The measures a consideration baseline reports, defined before they are reported.
- The AI Selection Problem. Why being discovered and being chosen came apart.
- Search Presence Engineering. The seven engineering layers, and what each one is accountable for.
- Why One AI Prompt Does Not Have One Universal Ranking. Why the same question returns different brands to different people.

### Publication standards section

**Eyebrow:** PUBLICATION STANDARDS

**Title:** What every research page carries.

**Description:** A study that cannot be checked is an assertion. Every substantial page in this section publishes the material a reader needs in order to check it.

Renders the sixteen approved publication standards verbatim, in their approved order.
Publishing the standard is what makes it checkable: a reader who can see the list can
see whether the article in front of them carries all of it.

### Related

- Methodology. Context panels, classification, weighting, evidence grades, and the stated limits.
- Selection Intelligence. What a consideration and recommendation baseline covers, produces, and reports.
- What Is AI-Mediated Search? The surfaces this research samples, and which of them Hendricks observes.

### Closing

**Title:** Read the method before the finding, and the limitations before either.

**Primary CTA:** Review the Demand-to-Selection methodology

**Secondary CTA:** Establish a baseline through the Diagnostic

### Navigation

Research is not added to primary navigation. The empty-state rule above gates that on
three published category foundation pages, and the section publishes one study. The hub
is reachable from the footer research column, which renders on every route, and from
contextual links. The entry to restore in `src/config/navigation.ts`, and the condition
that restores it, are recorded in a comment at the position it occupied.

## Canvas conversion, 2026-09-03

**Answer label:** What this section is

**Supporting studies:** The studies behind it.

Each study names its relation to the flagship in the flagship’s own words.

**Relation label:** Relation to the flagship:

**Coverage label:** Eight categories

**Closing eyebrow:** Read in order

**Series, decision D-C:** The Answer Index. Edition 1, September 2026. Package v2026.09.1. Quarterly.
