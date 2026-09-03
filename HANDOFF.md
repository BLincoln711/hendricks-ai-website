# Handoff: hendricks.ai canvas redesign

Written 2026-09-03 for whoever picks this up next, in Cursor or elsewhere, on this machine. Read this file, then `AGENTS.md`, then start at section 4.

## 1. Where you are

Repo `~/dev/hendricks-ai`, branch `redesign-2026-09`, cut from `main` at `f2006e8`. Twenty commits, working tree clean, nothing pushed. `main` is untouched and hendricks.ai still serves the previous site.

The design is approved and settled. It is not yours to reinterpret. Its source is the design package at `~/claudecode/hendricks-redesign-2026-09/`, which is read-only input: never edit anything inside it.

- `07-hifi/home-v3.html` is the approved homepage, exactly as the client signed off.
- `07-hifi/_canvas.css` is the design system, `07-hifi/_canvas.html` the shared chrome, `07-hifi/canvas.md` the conversion guide. Read `canvas.md` first.
- `07-hifi/*.html` are the thirteen converted interior pages, one per route.
- `_inputs/decisions-recorded.md` holds the client's eight recorded decisions, D-A to D-H. These are binding.
- `_inputs/CANON.md` section 2 holds the locked strings, verbatim, never paraphrased.
- `17-technical-seo-ai-crawler-spec.md` is the citation contract, 97 numbered requirements with a test each.
- `12-research-page-template.md` is the research page contract.
- `18-developer-handoff.md` is the original build plan; sections 4.7 and 9 still apply, its PR order has been superseded by what is already committed.

You can browse the approved design at `https://hendricks-stage.vercel.app` (Vercel login required) or serve the package locally.

## 2. The decision that outranks everything else

Decision D-E, in the client's words: being cited by AI and LLM search engines is the most important thing. The operative rule is that where a design choice would remove text that answers a question, the text stays and the design accommodates it. The homepage is the only exemption, because it is a conversion surface. Every interior page keeps every sentence, source, date, definition and limitation it carries. If you find yourself cutting content from a research or definition page for visual reasons, stop.

## 3. What is done, and where it lives

| Step | State | Notes |
|---|---|---|
| Token layer re-aimed at the canvas | done | `src/styles/`, with `check:tokens` and `check:contrast` in `verify` |
| Shell: masthead, six route links, mobile menu, footer sitemap, breadcrumbs | done | Solutions is a plain link to the hub per D-G |
| Instrument: server-rendered plate plus one client island, self-playing with a Pause control | done | data in `src/content/instruments/`, motion in `src/lib/motion.ts` |
| Homepage on the canvas | done | budget assertions in `tests/e2e/homepage.spec.ts` |
| Every interior route converted | done | text diffed against the previous copy, nothing lost |
| Three lead forms and the fit check | done | delivery to `brandon@hendricks.ai` per D-H |
| Change history and the derived updated date | done | `latestChangeDate` in `src/content/shared/publication-record.ts` |
| Citation layer | PARTLY DONE, this is your task | see section 4 |
| Full `pnpm verify` | NOT RUN since the forms landed | see section 5 |
| Push and preview | not done | see section 6 |

Green as of the last commit: `pnpm typecheck`, `pnpm lint`, `pnpm test` (672 tests, 34 files), `pnpm check:content` (261 files). Not run since: `pnpm build` and `pnpm test:e2e`.

Already landed inside the citation layer, so do not rebuild it: the change-history type and components, the derived updated date, `src/components/canvas/cite-this.tsx`, `src/components/canvas/table-of-contents.tsx` and `toc-disclosure.tsx`, `src/content/shared/vocabulary.ts`, `site.ts` `founderPersonId` set to `https://brandonlincolnhendricks.com/#person` and referenced twice in the JSON-LD graph, and The Answer Index carrying `edition: 'Edition 1, September 2026'`, `packageVersion: 'v2026.09.1'`, the quarterly cadence and its two Zenodo DOIs.

## 4. Start here: finish the citation layer

Four things are missing. Each has an acceptance test, and the test is the deliverable as much as the feature, because the client's concern is that a future visual change silently drops this work.

**4.1 Dataset and Article nodes in `src/lib/seo/json-ld.ts`.** The graph currently emits Organization, WebSite, Person, Service, DefinedTerm, DefinedTermSet, BreadcrumbList, ItemList, ImageObject and Thing. Add, per `17` section 3:

- `Article` per study: `author` as an `@id` reference to the Person node, never a repeated person object; `datePublished` from the byline; `dateModified` from `latestChangeDate(changes)`; the claim class carried as `about` or a `DefinedTerm` reference.
- `Dataset` for any study publishing a data package: the DOI as `identifier` and `sameAs`, the licence read from the study's own published licence line and never invented, `distribution` entries for the PDF and the zip with their real `contentUrl` and `encodingFormat`, and `temporalCoverage` from the data-through date.
- Never emit `FAQPage`, `Review`, `Rating` or `Offer`. Google retired FAQ rich results in May 2026 and `AGENTS.md` forbids the rest.

**4.2 `scripts/check-jsonld.ts`, registered as `check:jsonld` and added to the `verify` chain.** For every indexable route it must assert: every `@type` and property is one schema.org defines; no FAQPage, Review, Rating or Offer appears anywhere; the Person `@id` equals `siteConfig.founderPersonId`; every Article has an author reference and both dates; every Dataset has a DOI and at least one distribution; and every literal string in the graph also appears in that route's rendered visible text, allowing for whitespace and HTML entity differences. That last assertion is the one that matters most, because it is what stops the graph and the page from drifting apart.

**4.3 `tests/unit/route-metadata.test.ts`.** Walk the route registry in `src/config/routes.ts` and assert every indexable route has a unique title, a description, exactly one canonical and exactly one H1. Add the `max-image-preview:large` directive to research and definition routes only, and assert it is absent elsewhere.

**4.4 `tests/unit/research-contract.test.ts`.** Assert every study in `src/content/research/index.ts` carries a byline with three dates, at least one change entry, sources each with a publication date, a methodology section, a limitations section and a data-through date. The contract in `src/content/research/types.ts` already requires most of this at the type level; the test covers what types cannot, which is that the content is non-empty and the dates are real ISO dates in ascending order.

Also confirm, and fix if not true: `src/app/llms.txt/route.ts` covers every route the redesign added, still derived from the registry, with no `llms-full.txt`.

## 5. Then run the full gate

```
pnpm exec playwright install   # once, if browsers are missing
pnpm verify
```

`verify` is `lint && typecheck && check:content && check:tokens && check:contrast && check:links && test && build && test:e2e`, plus `check:jsonld` once you register it. The e2e suite builds and serves the production output on port 3100 itself, so make sure nothing else holds that port.

Never delete or skip a test to make the gate pass. If a test is genuinely wrong, fix the test and say why in the commit body.

Four things to confirm explicitly, because they are the client's acceptance criteria:

1. Every route renders on the canvas design at 1440, 1024, 390 and 320 with zero console errors.
2. The homepage meets its three budget assertions: at most 8,100 px tall at 1440 by 900, at most 13,500 px at 390 by 844, at most 1,200 visible words in `main`.
3. `check:jsonld`, `route-metadata` and `research-contract` are all in the verify chain and green.
4. All three lead forms reach their server action in the e2e run.

## 6. Then push for a preview

```
git push -u origin redesign-2026-09
```

This is a feature branch on a private repo. Vercel builds production only from `main`, so a branch push cannot affect hendricks.ai. Do not push to `main`. Do not open a pull request or merge: the client decides when the live site changes, and he has asked to see the preview first.

The Vercel project is `hendricks-ai-website`, `prj_s7hPSmLdd45Dfrq3uXSBImxFjtpM`, on team `brandon-lincolns-projects`, `team_wBXTZLgppXh6MVDz2r1mFNa9`. The team protects every non-production deployment with Vercel Authentication, so the preview URL asks for a login. That is expected; do not disable it.

Before the forms can deliver a lead, these must exist in the Vercel environment. Brandon sets them; never commit or print a value.

- `RESEND_API_KEY`
- `LEAD_NOTIFICATION_EMAIL` set to `brandon@hendricks.ai` per D-H
- `LEAD_FROM_EMAIL` stays `Hendricks Website <website@hendricks.ai>`
- `RATE_LIMIT_HASH_SECRET`

Without the key the action fails closed with a visible error, which is deliberate: better than accepting a submission it cannot deliver.

## 7. House rules that will bite you

- pnpm only. An `npm` or `npx` invocation leaves a lockfile that flips Vercel's package manager. Use `pnpm exec`.
- This MacBook is the only head for this repo. Never move it by Syncthing; it moves by git.
- Next.js 16 differs from most training data. Read the relevant guide under `node_modules/next/dist/docs/` before touching routing, metadata, images, fonts or server actions.
- No em-dash in any string, comment, test or fixture, anywhere.
- Locked strings verbatim from `CANON.md` section 2, including the period in "Search Intelligence Engineering for the AI Era." and the word "yet" in the evidence rule.
- The four observed systems are exactly Google AI Overviews, ChatGPT, Perplexity and Gemini. The list is closed: no "including", no "such as".
- No fee, price band or "starts at" anywhere under `src/content`. Fees are disclosed in conversation, per the client's decision of 2026-08-16.
- Every image of Brandon Lincoln Hendricks renders in colour. No greyscale filter, per D-D.
- New or variant copy renders its approved fallback until its row in `CONTENT_VERIFICATION.md` is approved. The mechanism is in `18-developer-handoff.md` section 4.7 rule 9.
- Edit the typed content object under `src/content` and mirror its markdown in `content/pages/` in the same commit, or `check:content` fails.

## 8. First message to paste into Cursor

> Read `HANDOFF.md` at the repo root, then `AGENTS.md`, then `~/claudecode/hendricks-redesign-2026-09/07-hifi/canvas.md` and `~/claudecode/hendricks-redesign-2026-09/_inputs/decisions-recorded.md`. You are on branch `redesign-2026-09` with a clean tree and twenty commits. Start at HANDOFF section 4 and finish the citation layer: the Dataset and Article nodes, `scripts/check-jsonld.ts` registered as `check:jsonld` and added to `verify`, `tests/unit/route-metadata.test.ts`, and `tests/unit/research-contract.test.ts`. Do not rebuild what section 3 lists as already landed. Run the fast gate (`pnpm typecheck && pnpm lint && pnpm test && pnpm check:content`) before committing, and commit with a conventional message and no em-dash. Then run `pnpm verify` in full and report the four acceptance criteria in HANDOFF section 5. Do not push, do not merge, and do not edit anything under `~/claudecode/hendricks-redesign-2026-09/`.
