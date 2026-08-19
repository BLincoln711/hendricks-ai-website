All 42 distinct documents fetched and every quote checked against source text. Writing the ledger.

# Source Ledger: Adversarial Verification

## Verdict

**51 proposed entries, covering 42 distinct documents. 33 documents survived. 9 rejected.**

Every URL was fetched independently with a browser user-agent, saved, converted to text, and searched for each quoted string with punctuation and ligature normalisation. Six PDFs were downloaded and read directly. One source was opened in a headless browser after it refused both curl and WebFetch.

The honest quality of what survived is **good but uneven, and it is not evenly distributed across the claims that matter**.

- The platform-documentation layer is genuinely strong. Google, OpenAI and Perplexity say most of what the methodology limitations need, in their own words, and it checked out almost line for line.
- The peer-reviewed layer is real and better than expected. Four venue-accepted papers (KDD 2024, NeurIPS 2025 D&B, KDD 2026, SIGIR 2026) plus two EMNLP papers all verified, including the numbers in their tables.
- **The premise layer is the weak one.** The claim the whole site rests on, that a limited named set of options changes how buyers shortlist, has no rigorous public evidence behind it. Nothing in 42 documents closes that gap.

Two things a reviewer should know before reading further.

**Ten approved sources cannot be published as proposed.** They carry a misquote, a truncation that widens the meaning, a spliced quote, a wrong URL, or a section misattribution. Each is listed with the exact correction. Two of these are the kind of error that would have cost the site more than publishing nothing: a G2 "quote" that exists nowhere in the document, and an Ahrefs quote that silently converts a mathematical symbol into words.

**Three researcher fetch reports were wrong in a way that matters.** Two URLs reported as "no redirect" do redirect. One document reported as unfetchable fetches fine. If the fetch notes were wrong, the ledger cannot be trusted to self-report, which is why every line below was re-derived rather than reviewed.

One finding is worth more than any single citation: **Google's own optimization guide states the llms.txt and special-markup point outright, at a URL nobody proposed it from.** It closes a gap two researchers went looking for in vendor research, and it costs no disclosure.

---

## Approved sources, by page

### /methodology — limitations

#### Claim: "APIs may not reproduce consumer interfaces exactly."

**Perplexity, "Frequently Asked Questions"** · https://docs.perplexity.ai/docs/resources/faq
Fetched HTTP 200, no redirect. No publication or last-updated date anywhere on the page. Retrieved 2026-08-18.

> Why Are the Results from the API Different from the UI? The API uses the same search system as the UI with differences in configuration—so their outputs may differ. The underlying AI model might differ between the API and the UI for a given query.

> Yes, the API offers exactly the same internet data access as Perplexity's web platform.

Tier: primary-platform-doc. **Strongest source in the entire ledger.** The platform states the Hendricks claim in its own words.

The em-dash is in the source. Quote it intact. The no-em-dash rule governs Hendricks prose, not quoted material.

Does not support: any stronger reading. Perplexity is explicit that the search system and internet data access are the same and attributes the difference to configuration and model selection. It does not say API observations are invalid or systematically different. Perplexity only. Silent on AI Overviews and ChatGPT.

---

#### Claim: "Not every AI impression is observable."

**Google Search Console Help, "Generative AI performance report (Search)"** · https://support.google.com/webmasters/answer/16984139?hl=en
HTTP 200, no redirect. No last-updated date on page. Feature announced 2026-06-03. Retrieved 2026-08-18.

> Not all properties have access to the report, as we're rolling out over time.

> Note: Search Console doesn't include data from experiments in Search Labs, as these experiments are still in active development.

> Impressions are how many times links to your site were shown to a user in a generative AI feature on Google Search.

**CORRECTION REQUIRED.** The aggregation quote was proposed truncated. The document says:

> Aggregation: Data on the chart is aggregated by property. For example, if two results from the same site appeared in a generative AI search results feature, they count as a single impression **in the chart total.** If you add a URL filter, the chart data is aggregated by URL.

Dropping "in the chart total" turns a charting rule into a universal counting rule. Publish the full sentence or drop the passage.

Also correct: the capability list renders as bullets, not a comma list. The document reads "AI Overviews / AI Mode", not "AI Overviews, AI Mode".

**Independently verified:** the word "click" appears **zero times** on this page. The report is impressions-only. That verification is correct and is the single most useful fact in this section.

Tier: primary-platform-doc.

Does not support: any AI click, CTR or traffic figure. Does not separate AI Overviews from AI Mode; the two are pooled, so no AI-Overviews-specific number can come from it. Silent on ChatGPT and Perplexity.

---

**Google Search Console Help, "What are impressions, position, and clicks?"** · https://support.google.com/webmasters/answer/7042828?hl=en
HTTP 200, no redirect. No date on page. Retrieved 2026-08-18.

> AI Overviews show an overview with links to web resources that support the information.

> Standard impression rules apply. To be counted as an impression, the link must be scrolled or expanded into view.

> An AI Overview occupies a single position in search results, and all links in the AI Overview are assigned that same position.

> Clicking a link to an external page in the AI Overview counts as a click.

Tier: primary-platform-doc. All verbatim.

Does not support: any share or percentage. It does not say how often links go unscrolled. The single-position rule is a Search Console reporting convention, not a statement about prominence.

**Drop the AI Mode passage.** It verified verbatim, but AI Mode is marked "No" in the observed table. Quoting AI Mode counting rules on a Hendricks page invites the reading that Hendricks reports on it.

---

**Google Search Central Blog, "Introducing Search Generative AI performance reports in Search Console"** · https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports
HTTP 200, no redirect. June 3, 2026. Hillel Maoz and Moshe Samet, both confirmed on page.

> The new Search Console reports are designed to give you dedicated views of your impressions within generative AI features on Search, such as AI Overviews and AI Mode, as well as generative AI features in Discover.

> We are rolling these reports out to a subset of websites, allowing us to thoroughly test them and receive feedback before making them widely available.

**CORRECTION TO THE FETCH NOTE.** Both researchers reported that this URL returns only the blog archive shell. It does not. A plain HTTP client with a browser user-agent returns the full article, and every quoted sentence verified against it. The article body is client-rendered, so LLM-based fetch tools mis-extract it. The URL is sound. Whitelist it in any link checker rather than treating it as suspect.

Tier: primary-platform-doc.

Does not support: any rollout percentage, completion date, or coverage figure. Bundles Search with Discover and AI Overviews with AI Mode.

---

#### Claim: "Model and search behavior changes over time."

**Google Search Central, "Google Search's core updates and your website"**
**URL CORRECTION REQUIRED.** Proposed as https://developers.google.com/search/updates/core-updates. That address **301s** to https://developers.google.com/search/docs/appearance/core-updates. Cite the destination. Last updated 2025-12-10 UTC, shown on page.

> Several times a year, Google makes significant, broad changes to our search algorithms and systems.

> positions in Google Search results aren't static or fixed in place. Google's search results are dynamic in nature because user expectations evolve and the open web itself is constantly changing with new and updated content. This constant change can cause both gains and drops in organic Search traffic.

Tier: primary-platform-doc.

**This page also contains the sentence that breaks the site's current wording.** Immediately after the first quote, Google writes: "we give notice when they happen on our list of Google Search ranking updates." The site says these surfaces "change without notice." Google's own page contradicts that for core updates, and OpenAI's deprecations policy contradicts it for the API. Fix the wording before citing either.

Suggested replacement, no em-dashes: *These surfaces change on the platform's schedule rather than the observer's, and consumer-facing changes are rarely announced, so a result observed on one date may not reproduce on the next.*

---

**Google, Search Status Dashboard, Ranking updates history** · https://status.search.google.com/products/rGHU1u87FJnkP6W2GwMi/history
HTTP 200, no redirect at this address. Live dashboard. Entries observed 2026-08-18.

> This page provides status information on the services that are part of Google Search.

Dated entries verified exactly as reported: June 2026 spam update, 24 Jun 2026, 2 days 1 hour. May 2026 core update, 21 May 2026, 11 days 21 hours. March 2026 core update, 27 Mar 2026, 12 days 4 hours.

The reported 301 from developers.google.com/search/updates/ranking is real and confirmed. Cite the status.search.google.com address so the page does not depend on a redirect.

Tier: primary-platform-doc. Use as a dated backup, not as a quotable statement. The dashboard carries almost no prose.

---

**OpenAI, "Deprecations"** · https://developers.openai.com/api/docs/deprecations
HTTP 200, no redirect. Live page. Entries confirmed: 2026-07-20 legacy audio/realtime/transcription, shutdown January 20, 2027. 2026-06-11 GPT-5 and o3 snapshots, shutdown December 11, 2026.

> As we launch safer and more capable models, we regularly retire older models. Software relying on OpenAI models may need occasional updates to keep working.

> Unless safety or compliance concerns require a faster timeline, we provide the following minimum notice periods before model retirement: Generally available models: At least 6 months. Specialized variants of generally available models: At least 3 months.

Tier: primary-platform-doc. All verbatim.

Does not support: any claim about the ChatGPT consumer product, which is the surface Hendricks observes. This is API model lifecycle only. Use for "changes over time", never for "without notice".

---

**Perplexity, "Changelog"** · https://docs.perplexity.ai/docs/resources/changelog
HTTP 200, no redirect. Entries span April 2024 to August 2026.

> `google/gemini-3.1-flash-lite-preview` has been retired: Google removed the underlying preview model from its API. Requests for this id now return a `model not supported` error.

> The Agent API and Router API now support `google/gemini-3.7-flash` at launch pricing of $0.375 per million input tokens

Tier: primary-platform-doc. All verbatim. The alternate address docs.perplexity.ai/changelog/changelog 301s here; cite this one.

Does not support: any change to the Perplexity consumer product. This is the API changelog.

---

#### Claim: "Personal memory cannot be reproduced universally."

**Google Search Help, "Why your Google Search results differ from others"**
**URL CORRECTION REQUIRED.** Proposed as answer/15510750, reported as "no redirect". It **redirects** to https://support.google.com/websearch/answer/12412910?hl=en, which serves the same document under a different answer ID and resolves directly at HTTP 200. Cite 12412910. No date on page; it carries a notice that the content is being updated. Retrieved 2026-08-18.

> With personalization, you get Google Search results tailored for you based on info in your Google Account, like your Search Services History.

> Time may be one of the biggest reasons why results vary between people.

> Location: If you search pizza in a particular city, you get results relevant to that location.

> Personalization doesn't affect all search results.

**MISQUOTE CORRECTION REQUIRED.** The fourth proposed quote was rendered as "take time for these to fully roll out to all our data centers." The document says:

> When we make an improvement to our ranking systems, **it takes** time for these to fully roll out to all our data centers.

Publish the corrected sentence or drop it.

Tier: primary-platform-doc.

Does not support: anything about AI Overviews, AI Mode, or any generative surface. This is Google Search results generally. It quantifies nothing, and Google states on the same page that personalization does not affect all results. Silent on ChatGPT and Perplexity.

---

**Google Search Help, "Personalization & Google Search results"** · https://support.google.com/websearch/answer/12410098?hl=en
HTTP 200, no redirect. No date on page. Retrieved 2026-08-18. All three quotes verified verbatim.

> Sometimes, personalization changes the order of the search results. The results that Google thinks you like best are at the top.

> Search results may vary between people for reasons other than personalization, such as language settings or localized results.

Tier: primary-platform-doc. Low value. Google describes personalization here as reordering, not as changing which brands appear. Supplement only.

**Note the coverage asymmetry, and state it on the page.** Every source for the personalization and observability limitations is Google. OpenAI's consumer-side memory documentation is behind a bot wall, and neither OpenAI nor Perplexity publishes any site-owner reporting of brand appearances. Hendricks can say that in its own voice more defensibly than it can cite it: *reporting of AI-feature appearances exists on Google and is partial, and does not exist at all for ChatGPT or Perplexity.*

---

### /what-is-generative-engine-optimization

#### Claim, sameAsSeo: "no special markup, AI text file, or structured data to add for them"

**Google Search Central, "Google's Guide to Optimizing for Generative AI Features on Google Search"** · https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
HTTP 200, no redirect. Last updated 2026-07-10 UTC, shown on page.

> LLMS.txt files and other "special" markup: You don't need to create new machine readable files, AI text files, markup, or Markdown to appear in Google Search (including its generative AI capabilities), as Google Search itself doesn't use them.

> Prioritize effective SEO strategies over "AEO/GEO hacks": For Google Search, you can ignore tactics like "chunking" content, creating unnecessary AI text files (like llms.txt), or pursuing inauthentic mentions.

> Just because a page meets all requirements, best practices, and complies with the policies, doesn't mean that Google will crawl, index, or serve its content. Indexing and serving aren't guaranteed.

> Query fan-out: A set of concurrent, related queries generated by the model to request more information and fetch additional relevant search results to address the user's query.

Tier: primary-platform-doc. All verbatim.

**This is the most valuable single find in the exercise, and it was nearly missed.** One researcher assumed this language lived inside the already-cited "AI features and your website" doc and skipped it on non-duplication grounds. That assumption is wrong. These are two different documents at two different URLs with two different last-updated dates. The already-cited doc (2025-12-10) says "You don't need to create new machine readable files, AI text files, or markup to appear in these features." This one (2026-07-10) is newer, adds "or Markdown", adds "as Google Search itself doesn't use them", and names llms.txt explicitly.

Consequence: **the site does not need vendor llms.txt research.** Google states the practical conclusion itself, more recently, at no disclosure cost.

Does not support: "Google confirms nobody can see inside." The guarantee language says Google does not guarantee serving. Those are adjacent, not identical. The query fan-out definition supports the point that the typed query is not the only query run, but supports nothing about how many fan-out queries run or whether they can be recovered.

---

#### Claim, runsOut 01: optimizing a surface is not knowing whether the brand enters consideration

**Puerto, Gubri, Green, Oh, Yun, "C-SEO Bench: Does Conversational SEO Work?"** · NeurIPS 2025, Datasets and Benchmarks Track
https://proceedings.neurips.cc/paper_files/paper/2025/hash/27aa3aeff0f8460a7b43d30fa6c5c032-Abstract-Datasets_and_Benchmarks_Track.html
HTTP 200, no redirect. Venue string on page: "Advances in Neural Information Processing Systems 38 Main Conference (NeurIPS 2025) Datasets and Benchmarks Track". arXiv 2506.11097 confirms "Accepted at NeurIPS Datasets & Benchmarks 2025".

> Our experiments reveal that most current C-SEO methods are not only largely ineffective but also frequently have a negative impact on document ranking, which is opposite to what is expected. Instead, traditional SEO strategies, those aiming to improve the ranking of the source in the LLM context, are significantly more effective. We also observe that as we increase the number of C-SEO adopters, the overall gains decrease, depicting a congested and zero-sum nature of the problem.

> We consider two search tasks, question answering and product recommendation, with three domains each. We also formalize a new evaluation protocol with varying adoption rates among involved actors.

Tier: peer-reviewed. All verbatim. **The strongest negative result available, and the best evidence for the runsOut argument.**

Does not support: any claim about Google AI Overviews, ChatGPT or Perplexity as products. Does not measure traffic, leads, or human selection. The claim that traditional SEO is "significantly more effective" is about position within the LLM context window, not Google organic ranking as a business outcome.

Caution: the annotation figures "nine methods" and "1,921 queries" are not on the abstract page and were not verified. Do not publish them without opening the PDF.

---

**Kim, Jeong, Kim, Lee, Lee, "SAGEO Arena: A Realistic Environment for Evaluating Search-Augmented Generative Engine Optimization"** · KDD 2026, DOI 10.1145/3770855.3818146
https://arxiv.org/abs/2602.12187 · arXiv v2 dated 7 Aug 2026 on the PDF face.

> Our findings reveal that existing approaches remain largely impractical, often degrading visibility in retrieval and reranking. Leveraging structural information helps mitigate these limitations, yet effective SAGEO requires tailoring optimization to each pipeline stage.

> As shown in Table 2 (Left), optimizing body text alone consistently degrades visibility across all stages.

> In generative search, only top-ranked documents are passed to the generator, and a document falling below this threshold is excluded entirely, making it invisible at the generation stage regardless of its content quality.

> Schema/JSON-LD. Structured data markup that explicitly defines entities, attributes, and relationships in a machine-readable format.

Table 2 averages, verified digit for digit: body text only, H@20 -9%, H@10 at reranking -16%, Citation -6%. Structural information only, H@20 +22%, H@10 -17%, Citation +2%.
Corpus verified: "we sample 300 queries from each dataset, yielding 2,700 unique queries in total"; "the final corpus contains 171,003 unique web documents".

Tier: peer-reviewed. All quotes verbatim **in the PDF**.

**MANDATORY PUBLISHING NOTE.** The arXiv abstract page carries **different wording** from the PDF. The abs page reads "remain largely impractical under realistic conditions and often degrade performance" and "We also find that structural information helps mitigate". A reviewer who checks the abs page will not find the quoted sentence and will reasonably conclude it was fabricated. Cite the PDF explicitly, or quote the abs-page wording instead. Do not cite the abs page URL beside the PDF wording.

**Correction:** the paper evaluates **10** optimization strategies, not nine. "We evaluate 10 LLM-based optimization strategies derived from prior research."

Does not support: what any live commercial engine does. The pipeline is BM25 plus Qwen3-Reranker-4B plus GPT-5-mini. It does not show schema increases citations; the structural gain is concentrated at retrieval (+22%), reranking still fell 17%, and the generation-stage gain was +2%.

---

#### Claim, runsOut 01 and the limitation block: a brand can be cited and still be described inaccurately

**Liu, Zhang, Liang, "Evaluating Verifiability in Generative Search Engines"** · Findings of EMNLP 2023, pages 7001-7025 · https://aclanthology.org/2023.findings-emnlp.467/
HTTP 200, no redirect. PDF downloaded and read.

> We conduct human evaluation to audit four popular generative search engines—Bing Chat, NeevaAI, perplexity.ai, and YouChat—across a diverse set of queries from a variety of sources

> on average, a mere 51.5% of generated sentences are fully supported by citations and only 74.5% of citations support their associated sentence. We believe that these results are concerningly low for systems that may serve as a primary tool for information-seeking users, especially given their facade of trustworthiness.

> Each system is evaluated on 1450 queries—150 randomly-sampled queries from each of AllSouls, davinci-debate, ELI5 (KILT / Live), and WikiHowKeywords, and 100 randomly-sampled queries for each of the seven NaturalQuestions subdistributions.

> This work would not be possible without the 34 annotators who performed human evaluation

Tier: peer-reviewed. All verbatim.

Does not support: anything current. Data is early 2023. NeevaAI and YouChat no longer exist; Bing Chat is now Copilot. Only perplexity.ai overlaps with what Hendricks observes. Measures whether a citation supports its sentence, not whether a cited brand was recommended. **Do not present 51.5% or 74.5% as current figures.**

---

**Pfrommer, Bai, Gautam, Sojoudi, "Ranking Manipulation for Conversational Search Engines"** · EMNLP 2024, pages 9523-9552 · https://aclanthology.org/2024.emnlp-main.534/
HTTP 200, no redirect. Full abstract verified verbatim, including:

> Importantly, these attacks transfer effectively to state-of-the-art conversational search engines such as perplexity.ai.

Tier: peer-reviewed.

Use only for the narrow point that position in a conversational answer is sensitive to injected document text and is therefore a weak quality signal. This is an adversarial security paper. Hendricks must never imply the technique is something it uses or recommends. No percentage exists in the abstract; do not manufacture one.

---

#### Claim, sameAsSeo: independent test of whether structured data lifts AI citation

**Ahrefs, "We Tracked 1,885 Pages Adding Schema. AI Citations Barely Moved."** · Louise Linehan, data by Xibeijia Guan, reviewed by Ryan Law · https://ahrefs.com/blog/schema-ai-citations/
HTTP 200, no redirect. May 11, 2026, shown on page.

> Comparing two groups of pages that were getting cited at the same rate before, where the only main difference was that one group added schema, made it easier to isolate what schema actually did.

> There's one important thing you need to know about this data: we studied pages that were already being cited heavily by AI. Every page in the dataset had 100+ AI Overview citations in February 2025, before any schema was added.

> If a page is already getting picked up, our data suggests that adding schema isn't going to push it higher.

Sample verified: 1,885 pages that added JSON-LD between August 2025 and March 2026, matched against **4,000 control pages**.

Tier: disclosed-method-study.

**CORRECTION REQUIRED to how the results were presented.** The three figures were proposed bare as "-4.6%; +2.4%; +2.2%". Ahrefs labels them in its own results table, and the labels change the meaning:
- Google AIO −4.6%: "Small but statistically significant decline relative to matched controls; (both groups were declining together, but treated pages fell slightly faster)"
- Google AI Mode +2.4%: "Statistically indistinguishable from zero"
- ChatGPT +2.2%: "Statistically indistinguishable from zero"

Publishing the three numbers without those labels overstates two of them. Publish the labels or publish only the AIO figure with its qualifier.

Does not support: that schema is useless generally. The sample is pages already cited heavily, which is exactly the stage where SAGEO Arena also found schema does nothing. It is a matched difference-in-differences on the vendor's own tool data, not a randomised experiment. Does not test Perplexity. Does not measure traffic or revenue.

**DISCLOSURE REQUIRED. See the disclosure section.**

---

### /ai-selection-problem

#### Claim: AI-mediated search performs more of the interpretation and comparison before the customer reaches a website

**OpenAI Help Center, "Using shopping research in ChatGPT"** · https://help.openai.com/en/articles/12911370-using-shopping-research-in-chatgpt
**Fetch status matters here.** HTTP 403 to curl with a full browser user-agent, and HTTP 403 to WebFetch. I opened it in a headless browser, where it renders normally as "Using shopping research in ChatGPT | OpenAI Help Center", and verified every quote against the live page. The page shows only "Updated: 3 days ago". No absolute date exists. Record a retrieval date of 2026-08-18, never a publication date.

> Shopping research helps you explore and compare products in ChatGPT through an interactive discovery experience. It is designed for decisions that involve comparisons, trade-offs, or multiple constraints.

> A small set of top picks, each with a rationale explaining why it matches your needs, key strengths, tradeoffs, and links to merchants who currently sell it.

> A scrollable list of additional products that also matched your criteria so you can explore beyond the top recommendations.

Tier: primary-platform-doc. **Best available support for the "limited set of named options" claim, from the platform that builds it.**

Approved with a standing warning: any automated link checker will flag this URL as dead. Whitelist it, and expect a reviewer using curl to see a 403 before they see the document.

Does not support: usage, adoption, or outcomes. It describes product design. It does not establish that any buyer's shortlist changed. The "scrollable list" line means "a small set" is the highlighted tier, not the whole output. Copy must not imply the answer shows three to five brands and nothing else.

---

#### Claim: the surfaces are materially used, at scale

**Google, "Google I/O 2026: Sundar Pichai's opening keynote"** · https://blog.google/innovation-and-ai/sundar-pichai-io-2026/
HTTP 200, no redirect. May 19, 2026.

> AI Overviews now has over 2.5 billion monthly active users. And AI Mode has been a revelation, our biggest upgrade to Search ever. People love it, and in just a year, it's already surpassed 1 billion monthly active users.

Tier: primary-platform-doc, but read the caveat. This is corporate communication, not technical documentation. Google discloses no measurement method and no definition of "monthly active user".

Does not support: commercial or buying-related use of either surface. Nothing about consideration, shortlists, or brand inclusion. Do not derive a per-query or per-session figure.

---

**Pew Research Center, "Americans and AI 2026: Chatbots, Smart Devices and Views on Impact"** · Gottfried, Bishop, Anderson, Faverio, Park, McClain · https://www.pewresearch.org/internet/2026/06/17/americans-and-ai-2026-chatbots-smart-devices-and-views-on-impact/
HTTP 200, no redirect. June 17, 2026.

> Six-in-ten U.S. adults say they read AI search engine summaries.

> We surveyed 5,119 U.S. adults from Feb. 17 to 23, 2026. Everyone who took part in this survey is a member of the Center's American Trends Panel (ATP).

Tier: disclosed-method-study. All verbatim.

**Independently verified, and this is the important part:** the report contains **zero** occurrences of "shopping", "purchase" or "buy". The caveat that it carries no commercial finding is correct. This source establishes readership and nothing about buying. It cannot support "six in ten people research purchases in AI", and it says nothing about ChatGPT or Perplexity specifically.

---

**Chatterji, Cunningham, Deming, Hitzig, Ong, Shan, Wadman, "How People Use ChatGPT"** · NBER Working Paper 34255, September 2025 · https://www.nber.org/papers/w34255
HTTP 200. PDF at /system/files/working_papers/w34255/w34255.pdf downloaded and read.

> Seeking Information includes searching for information about people, current events, products, and recipes, and appears to be a very close substitute for web search.

> Daily counts of work and non-work related messages are estimated by classifying a random sample of conversations from that day. Sampling is done to exclude users who opt-out of sharing their messages for model training, users who self-report their age as under 18, logged-out users, deleted conversations, and accounts which have been deactivated or banned

Tier: disclosed-method-study, working paper, not peer reviewed.

**Independently verified:** "Purchasable Products" appears **only** as a leaf in the classification taxonomy, with no percentage attached anywhere. No commercial share can be quoted from this paper.

Source-interest note: authored by OpenAI's own economic research team with an academic co-author. First-party data about a first-party product.

---

#### Claim: the set of sources an AI answer names is selected by a mechanism distinct from ranking

**Xu, Iqbal, Montgomery, "Measuring Google AI Overviews: Activation, Source Quality, Claim Fidelity, and Publisher Impact"** · https://arxiv.org/abs/2605.14021
HTTP 200. arXiv comment field reads "Under Review". Preprint, 2026-05-13.

> We present a large-scale longitudinal measurement study, issuing 55,393 trending queries across 19 topical categories over a 40-day window (March 13 - April 21, 2026). We report four main findings. First, overall AIO activation is 13.7%, rising to 64.7% for question-form queries, while politically sensitive topics see markedly lower rates. Second, AIO-cited domains are more credible than co-displayed first-page results, yet nearly 30% do not appear in those results at all, indicating a source selection mechanism distinct from Google's ranking algorithm.

Tier: disclosed-method-study. Verbatim, correctly tiered as a preprint rather than peer-reviewed.

Does not support: the mirror claim. The 30% runs "cited but not ranked". It does not measure how many well-ranked brands are omitted from the answer, which is what /ai-selection-problem actually asserts. Written carelessly, a citation here inverts the finding. Queries were trending queries, not commercial buying queries, so 13.7% is not an activation rate for commercial intent.

---

#### Claim: "The brand may lose before a website visit ever occurs."

**Pew Research Center, "Google users are less likely to click on links when an AI summary appears in the results"** · Chapekis and Lieb · https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/
HTTP 200, no redirect. July 22, 2025. Proposed independently by two researchers; one entry.

> Users who encountered an AI summary clicked on a traditional search result link in 8% of all visits.

> Google users who encountered an AI summary also rarely clicked on a link in the summary itself. This occurred in just 1% of all visits to pages with such a summary.

> This analysis uses the web browsing data of 900 U.S. adults who are members of KnowledgePanel Digital

> Due to technical limitations in our ability to identify AI-generated summaries on other search engines, this analysis includes only Google searches.

Sample verified: 68,879 unique Google searches, 12,593 producing an AI summary.

Tier: disclosed-method-study. All verbatim.

Does not support: causation. Descriptive comparison; queries that trigger AI summaries differ systematically from those that do not. **The 1% figure is scoped by Pew to visits to pages that had a summary, not to all searches.** Quote it with that scope or it is wrong. March 2025 data, now over a year old, and Google has publicly disputed the study.

---

**Khosravi and Yoganarasimhan, "Impact of AI Search Summaries on Website Traffic: Evidence from Google AI Overviews and Wikipedia"** · https://arxiv.org/abs/2602.18455
HTTP 200. Preprint, v4, no journal reference.

> Using a difference-in-differences design, we compare English Wikipedia articles exposed to AIO to the same underlying articles in language editions (Hindi, Indonesian, Japanese, and Portuguese) that were not exposed to AIO during the observation period. Across 161,382 matched article-language pairs, AIO exposure reduces daily traffic to English articles by approximately 15%.

Tier: disclosed-method-study. Verbatim. Strongest identification strategy in the set.

Does not support: transfer to a brand site. Wikipedia is an informational publisher with no commercial funnel. Quoting this as "AI Overviews cut brand traffic 15%" would be a serious misuse.

---

#### Claim: being cited is a separate outcome from being absent

**Seer Interactive, "AIO Impact on Google CTR: 2026 Update"** · McDonald, Cooley, Williams · https://www.seerinteractive.com/insights/aio-impact-on-google-ctr-2026-update
HTTP 200, no redirect.

**Date correction:** the page states "Analysis Published: April 2026; Data range: January 2025 to February 2026 (actuals); March 2026 (projections)". It gives no day. Cite "April 2026", not 2026-04-24.

> Being cited in the AIO delivers +120% more organic clicks per impression versus when you are not cited. But it still underperforms No AIO by -38%.

> We cannot claim causation. Higher-authority brands are also more likely to be cited.

Sample verified: 53 brands, 5.47M tracked queries, 2.43 billion organic impressions.

Tier: disclosed-method-study.

Does not support: causation, by the publisher's own statement. Sample is Seer's own client book, not representative. Measures clicks per impression, not consideration or pipeline.

**Publisher-interest disclosure required.** Seer Interactive is a competing search agency analysing its own client accounts. Name it as agency research, not independent research, on the same page.

---

#### Claim: buyers report AI influences the shortlisting stage

**G2, "2026 Buyer Behavior Report"** · https://sell.g2.com/2026-buyer-behavior-report
HTTP 200, no redirect. Fieldwork June 2026, confirmed on page. n=1,038 B2B decision-makers plus 55 qualitative interviews, confirmed.

**THE PROPOSED QUOTE DOES NOT EXIST AND MUST NOT BE PUBLISHED.** The proposal read: "Eight in ten buyers sourced software recommendations from an AI chatbot in the last two years. Among those buyers, half say AI had the greatest influence during shortlisting and evaluation."

The document contains **two different statements of this finding, in two places, and they disagree**:

> More than 80% of buyers sourced software recommendations from an AI chatbot in the last two years. Among those buyers, half say AI had the greatest influence during shortlisting and evaluation.

> Eight in ten buyers used AI chatbots to source software recommendations in the last 24 months, and for those buyers, **nearly half** said AI had its greatest influence during shortlisting and evaluation.

The proposed quote splices the opening of the second with the body of the first. Neither sentence exists as written. This is exactly the failure the exercise exists to catch.

Approved only on these terms: publish one of the two sentences verbatim, prefer the "nearly half" wording as the conservative reading, and note in the annotation that the source states the figure two ways.

Tier: disclosed-method-study.

Does not support: observed behaviour. Self-reported attribution, and buyers are poor witnesses to what influenced them. B2B software buyers only, so it does not transfer to mid-market service categories.

**Publisher-interest disclosure required.** G2 is a software review marketplace sitting inside the buying process it measures, and it sells an AI research product.

---

#### Prior art

**EY, "EY report: AI is reshaping consumer products selection, accelerating brand consideration risk"** · https://www.ey.com/en_gl/newsroom/2026/05/ey-report-ai-is-reshaping-consumer-products-selection-accelerating-brand-consideration-risk
HTTP 200, no redirect. Page header confirms "Press release 11 May 2026 | London, United Kingdom".

> Nearly half (47%) of surveyed consumer products executives believe that being able to influence these recommendations will be essential for remaining competitive over the next five years.

> While 47% of surveyed executives say influencing algorithmic product recommendations will be critical within five years, only 21% of respondents believe they can deliver this today.

> All references to the EY Consumer Products Dynamics Research relate to an online survey conducted by Oxford Economics between 28 January and 18 February 2026. The survey captured responses from more than 850 senior executives across consumer products companies globally.

Minor correction: the first quote was proposed with the leading "Nearly half (" stripped. Restore it or start the quote at "47% of surveyed".

Tier: disclosed-method-study, method disclosed via Oxford Economics.

Does not support: buyer behaviour. It surveys what executives believe about the future. Consumer products only, at companies from US$250m to over US$20bn. It is enterprise CPG, not a Hendricks client profile. Prior art only.

---

### /solutions/search-impact-measurement — "Can GA4 identify all AI traffic?"

**Google Analytics Help, "[GA4] Default channel group"** · https://support.google.com/analytics/answer/9756891?hl=en
HTTP 200, no redirect. No date on page. Retrieved 2026-08-18. All five passages verified verbatim.

> Organic Search is the channel by which users arrive at your site/app via non-ad links in organic-search results, including Google's AI Overviews and AI Mode.

> AI Assistants is the channel by which users arrive at your site from sources like ChatGPT, Gemini, Deepseek, Copilot, or Grok. It excludes Google's AI Overviews and AI Mode.

> The medium is set to "ai-assistant" and the campaign is set to "(ai-assistant)" if the referrer matches a list of AI Assistants.

> These definitions reflect Analytics' current view of what constitutes each channel. The following definitions are provided for your reference and may evolve as the market changes. Channel definitions aren't case sensitive and can't be edited.

> It's not possible to edit the Google Analytics default channel group because Google maintains a universal default for all users that can be kept current, accurate, and serve as a reference for the life of every property.

Tier: primary-platform-doc. **Independently verified: the word "Perplexity" appears zero times on this page.**

Does not support: which assistants are in or out. "Sources like" is illustrative, not a closed list. This is **not** a basis for saying Perplexity is excluded from the channel.

---

**Google Analytics Help, "GA4 Source Categories" spreadsheet** · linked from the page above · https://storage.googleapis.com/support-kms-prod/qn1xhBu8MVcZPIZ2WZMNdI40FtZXFPGYxj2K
HTTP 200, application/pdf, 126,019 bytes, 27 pages. Downloaded and parsed.

**Independently reproduced, exactly:** 819 source rows. Four category values only, counted as SOCIAL 592, SEARCH 129, SHOPPING 52, VIDEO 46, totalling 819. Zero occurrences of perplexity, chatgpt, openai, gemini, copilot, grok, deepseek, claude or assistant.

Tier: primary-platform-doc, cited as a negative finding.

What it establishes: Google does not publish the AI Assistants referrer list. What it does **not** establish: that the list is empty, or anything at all about Perplexity. The AI Assistants rule keys on a separate internal list, not this table.

**Do not deep-link this URL.** It is an opaque storage key that can rotate silently. Cite the parent help page and describe the download.

---

**Google Analytics Help, "[GA4] Custom channel groups"** · https://support.google.com/analytics/answer/13051316?hl=en
HTTP 200, no redirect. All quotes verbatim.

> Examples of some popular assistants are: ChatGPT, Gemini, Microsoft Copilot, Claude, Perplexity

> You should update your regex expression if URLs or the list of assistants you wish to measure change.

Tier: primary-platform-doc. Quote the maintenance note, which is the defensible part.

Does not support: that Perplexity is absent from the default channel. Naming it in a custom-channel example is suggestive, not dispositive. **Do not reproduce the regex on hendricks.ai.** It is a configuration recipe for a property Hendricks has not measured, and Google itself says it needs ongoing maintenance.

---

**Google Analytics Help, "[GA4] What's new in Google Analytics"**, entry dated May 13, 2026 · https://support.google.com/analytics/answer/9164320?hl=en
HTTP 200, no redirect. Entry and date verified.

> Google Analytics now provides a dedicated way to measure and analyze traffic originating from popular AI assistants. You can now identify how users are discovering your site through chatbots like ChatGPT, Gemini, and Claude via a new AI Assistant channel in your Default Channel Group reports.

The page also carries, unproposed and worth using: "Medium: A new 'ai-assistant' value is automatically assigned when the referrer matches a recognized AI Assistant".

Tier: primary-platform-doc.

The naming inconsistency is real and verified. This entry and the matching-conditions table say "AI Assistant" singular; the channel description table says "AI Assistants" plural. This entry names ChatGPT, Gemini and Claude; the channel page names ChatGPT, Gemini, Deepseek, Copilot and Grok. Neither names Perplexity. Two non-matching lists is fair evidence that neither is authoritative.

**Accept the pushback on the three-system framing.** The documentation does not show that the three surfaces Hendricks observes are the ones analytics handles worst. ChatGPT is explicitly named in the AI Assistants channel and is therefore the best handled of the three. The defensible version is three surfaces with three different failure modes: ChatGPT named and classified, AI Overviews documented as excluded from that channel and folded into Organic Search, Perplexity undeterminable from Google's documentation. That version is fully sourced and survives a skeptic.

---

## Rejected, and why

**1. OpenAI, "Web search (API guide)"** · https://developers.openai.com/api/docs/guides/tools-web-search
Fetches 200. The quoted passages are verbatim. Rejected anyway, on two grounds.

The annotation asserted "the page makes no reference to ChatGPT search at all." That is false. The page mentions ChatGPT 19 times, and one is substantive body text that points the opposite way from the claim it was proposed for:

> Using the Chat Completions API, you can directly access the fine-tuned models and tool used by Search in ChatGPT.

That is a statement of **sameness** between an API surface and the ChatGPT consumer product, sitting on a page proposed to support "APIs may not reproduce consumer interfaces exactly." A skeptic who opens the source finds the counter-argument. The Perplexity FAQ states the claim directly and costs nothing; use it alone.

**2. Ahrefs, "An Analysis of AI Overview Brand Visibility Factors (75K Brands Studied)"** · https://ahrefs.com/blog/ai-overview-brand-correlation/
Fetches 200. Rejected on four independent grounds, any one sufficient.

- **Misquote.** The proposal quoted "I should emphasize that correlation is not causation." The page says "I should emphasize that correlation **≠** causation." A symbol was silently expanded into words inside quotation marks.
- **Unverifiable quote elements.** The proposed coefficient list included "URL rating 0.18" and "number of site pages 0.17". Neither appears in the page text. The extractable coefficients are exactly nine: 0.664, 0.527, 0.392, 0.326, 0.295, 0.274, 0.218, 0.216, 0.215. The methodology claims "Domain Rating above 40" and "millions of AI Overview responses" are also not in the page text.
- **Superseded.** Ahrefs published a follow-up on December 12, 2025 (https://ahrefs.com/blog/ai-brand-visibility-correlations/, fetched 200) covering ChatGPT and AI Mode with different lead findings. Citing the May 2025 version when the same publisher has moved on is a free hit.
- **No claim to support.** The site does not publish the 3x figure anywhere. Carrying a vendor citation plus an advisory-board disclosure solely to correct a claim Hendricks never made is a net loss.

Keep the correction as internal guidance. The verification stands and is valuable: "3x" and "three times" appear **zero** times in both the May and December posts. The ratio is a third-party artefact of dividing 0.664 by 0.218, which is not a valid effect-size comparison. Note that Ahrefs does make the qualitative claim in its own words, "Web mentions (0.664) correlate much more strongly than backlinks (0.218)", so the correction is about the multiple, not the direction.

**3. Ahrefs, "We Analyzed 137K Sites: 97% of llms.txt Files Never Get Read"** · https://ahrefs.com/blog/llmstxt-study/
Fetches 200 and the headline caveat is verbatim. Rejected on relevance and redundancy. The site makes no claim about whether llms.txt is consumed, so nothing here needs support. Google's own optimization guide, dated 2026-07-10, states the practical conclusion from the platform itself and triggers no disclosure. Carrying a vendor study plus an Ahrefs disclosure to support a claim the site does not make is the wrong trade.

Also correct a figure before it travels: the proposal said "38,360 domains". The page says "~38,000 domains with a valid file". The precise number is not in the source.

**4. Google, "How AI Mode is changing the way people search in the U.S."** · https://blog.google/products-and-platforms/products/search/ai-mode-us-insights/
Fetches 200, May 19, 2026, and the quote is verbatim. Rejected on scope. AI Mode is marked "No" in the observed table on /what-is-ai-mediated-search, and an AI Mode citation in a reference list reads as coverage. The finding it carries, that AI Mode queries are three times longer, is query length, not commercial intent, and buys little. The scope rule is worth more than the sentence.

**5. Victorious, "Quarterly Search Report, Q2 2026"** · https://victorious.com/quarterly-search-report/
Fetches 200. Rejected because the disclosed sample is not actually disclosed, it is contradicted.

The report page states "150 brands and 5 industry verticals" and "4 of 150". The same firm's companion podcast page for the same report (https://victorious.com/podcast/q2-2026-quarterly-search-report/, fetched 200, dated July 21, 2026) states "This quarter we tested 175 brands across five industries." A study that states its own cohort size two different ways in the same week fails a disclosed-sample standard on its face. The report page also carries no date of its own, publishes no data-collection window, and names no brands.

The proposed quote is also misworded. The page says "96% of brands were accurately described when AI was asked directly", not "accurately described by AI when asked directly".

Publisher interest compounds it: Victorious is a competing SEO agency selling the remedy for the problem its study reports, and the trade coverage of the study is authored by Victorious's own CEO rather than by newsroom staff.

**6. Spatharioti, Rothschild, Goldstein, Hofman, "Comparing Traditional and LLM-based Search for Consumer Choice"** · https://arxiv.org/abs/2307.03744
Fetches 200 and every quote, including both recruitment sentences, verified verbatim in the PDF. Rejected on relevance and staleness. It measures speed and factual accuracy on a vehicle cargo-space task. No brand entered or left a consideration set in it. Samples of 90 and 120 MTurk workers, GPT-3.5-era tooling in 2023, with the tool deliberately prompted to behave as a non-conversational search engine. Citing it for brand consideration in 2026 is the adjacent-topic stretch the brief names.

**7, 8, 9. Three documents already cited on the site.**
- Google Search Central, "AI features and your website" (https://developers.google.com/search/docs/appearance/ai-features)
- OpenAI, "Overview of OpenAI Crawlers" (https://developers.openai.com/api/docs/bots)
- Perplexity, "Perplexity Crawlers" (https://docs.perplexity.ai/docs/resources/perplexity-crawlers)

All three fetch 200 and all proposed quotes verify. They are rejected as ledger additions because /what-is-ai-mediated-search and /what-is-generative-engine-optimization already carry them.

Two notes survive the rejection and should be acted on:

- The crawler docs were proposed for their **silence** on referrers. I confirmed the silence: zero occurrences of "referr" and zero of "utm_" in both. Citing a document for what it does not say is not a citation. State the absence in Hendricks' own voice instead. Practically, this means the widely repeated `utm_source=chatgpt.com` behaviour has **no verified first-party source in this ledger** and must not appear on the site.
- "AI features and your website" is stamped Last updated 2025-12-10 and states that AI features traffic is "reported on in the Performance report, within the 'Web' search type." That predates the June 3, 2026 launch of a separate generative AI impressions view. It is arguably stale on that point. Where the site relies on it for measurement language, pair it with the June 2026 blog post and the report help article.

---

## Claims with no source

These are the site's assertions that survived the search unsupported. Brandon should know which is which, because two of them are load-bearing.

**1. The central premise of /ai-selection-problem is not established by public research.** No study observes real buyers, varies whether an AI answer contains or omits a brand, and measures the resulting shortlist. What exists is four weaker things: platform documentation of the output shape (real, but design not behaviour), machine-side audits of which brands appear (real, but no human observed), buyer self-report (real, but attribution by memory), and vendor assertion (discarded). Nothing in 42 documents closes this.

The nearest randomised evidence is a 2023 MTurk study about car cargo space, which I rejected. The nearest strong quasi-experiment (SSRN 5297194, "Generative Search: Evidence from a Large-Scale Field Experiment") returns HTTP 403 to every automated client I tried, so it cannot enter the ledger under the fetch rule. One manual browser attempt is worth someone's time; it is a Chinese local-services platform, so even if it verifies it will not transfer cleanly.

**2. "Citation does not prove influence."** No first-party source exists and none is coming. No platform can observe whether a citation changed a human decision either. The closest material is Google's Search Console counting rules, which record an appearance and a click as separate events. That supports "an appearance is not a click", not "a citation is not influence". Leave it uncited and label it explicitly as Hendricks reasoning. The methodology page's own comment block calls this one of the two load-bearing honesty claims for the site; a stretched citation here would damage the exact thing the claim exists to protect.

**3. "Correlation does not prove causation."** A principle of inference, not an empirical claim about a platform. Cite nothing. A footnote on a logical axiom reads as citation theatre.

**4. "Offline selection may not be attributable."** No first-party source. The nearest candidate, Google Ads Help on offline conversion imports, is scoped to a paid ad click or call, while the Hendricks claim concerns selection that produces no click at all. Correctly not proposed. Leave as practitioner observation.

**5. "Some visits arrive with no referrer at all and are recorded as direct."** Currently on /solutions/search-impact-measurement and currently unsourced. Google's Direct definition reads "Direct is the channel by which users arrive at your site/app via a saved link or by entering your URL", with matching conditions on source "(direct)" and medium "(not set)" or "(none)". It does not mention an absent referrer. The sentence is almost certainly true as standard analytics behaviour, but no Google page states it. Either leave it unfootnoted or reword toward what the docs do support.

**6. No published commercial share of AI queries exists.** Nobody publishes what fraction of AI-mediated queries are commercial research. The NBER paper has the classifier category and no percentage. Pew 2026 has no shopping findings. Google publishes user counts and query length. No draft may say "most", "a growing share", or a percentage here.

**7. Nothing covers mid-market service businesses.** Every usable finding is consumer, B2B software, enterprise CPG, news publishing, or Wikipedia. Nothing found covers law firms, accounting firms, healthcare practices, agencies, professional services, consulting, or multi-location services. Any sentence implying the evidence applies to a Hendricks client's category is unsupported.

**8. No study measures whether AI citation drives revenue or pipeline.** This is the largest gap in the literature and it is a strength, because it is the gap Search Impact Measurement is positioned against. Hendricks can make that argument in its own voice without citing anyone.

**9. The journey diagram and the nine-stage ladder are Hendricks constructs.** Nothing validates either as a model of real behaviour. `sources.basis` already marks them as the Hendricks position. Attach no citation.

**10. No first-party source for ChatGPT memory or personalization.** OpenAI's consumer-side help pages sit behind a bot wall. The personalization limitation is currently supported by Google documentation only. Do not cite OpenAI memory pages from search snippets.

---

## Disclosure obligations

**Ahrefs Customer Advisory Board.** Brandon Lincoln Hendricks has served on the Ahrefs Customer Advisory Board since March 2025 and the seat is current. Exactly one Ahrefs source survived: the schema study. If it ships, the page carrying it must carry the relationship, in visible body text next to or beneath the citation, not in a footer and not on a separate page. Both facts together or neither.

Suggested wording, no em-dashes:

> Brandon Lincoln Hendricks has served on the Ahrefs Customer Advisory Board since March 2025. That relationship is current. This study is cited because its method is disclosed and its finding runs against the publisher's commercial interest, and readers should weigh the relationship when reading it.

Rejecting the other two Ahrefs sources reduces this from three disclosures to one, which is the difference between a disclosure and a pattern.

**Seer Interactive.** Competing search agency publishing analysis of its own client accounts. Not a Brandon relationship, but a publisher interest that belongs on the same page:

> Seer Interactive is a search agency and this analysis is drawn from its own client accounts. It is agency research, not independent research.

**G2.** Software review marketplace measuring the buying process it participates in, and it now sells an AI research product. Same treatment, same page.

**NBER working paper 34255.** Authored by OpenAI's own economic research team. First-party data about a first-party product, presented through an academic channel. Name the affiliation where the paper is cited.

**Google concentration, for Brandon to decide rather than have decided for him.** Roughly two thirds of the approved ledger is Google's own documentation, and Hendricks builds on Google Cloud and manages Google Ads spend for clients. My read is that no disclosure is required, because these are factual statements by a platform operator about how its own product behaves, not favourable research findings from an aligned party, and every sentence is verifiable at the source. But on a page whose whole argument is evidence quality, it is Brandon's call.

---

## Honest assessment

The evidence base in this field is thinner than the category pretends, and the thinness is not evenly spread. It is concentrated precisely where Hendricks makes its strongest claim.

Three layers came out of this differently.

**The platform layer is genuinely solid and better than the site currently uses.** Google, OpenAI and Perplexity document more of the Hendricks limitations than expected, in their own words, and it survived line-by-line checking. Perplexity states the API-versus-interface claim almost verbatim. Google's generative AI report documents three separate observability gaps in one page and, verified independently, contains no click metric at all. Google's own optimization guide states the llms.txt point that two researchers went hunting for in vendor studies. This layer is publishable now, and it is the part where Hendricks can be maximally confident.

**The peer-reviewed layer is real, and the useful finding is negative.** The best available research does not say GEO tactics work. C-SEO Bench found most methods ineffective or harmful and the gains zero-sum as adoption rises. SAGEO Arena found body-text optimization drops retrieval presence 9%, reranking presence 16%, and citation 6%. Both are venue-accepted, and both support the Hendricks argument that the surface is not the unit of value. That is a genuinely strong position and almost nobody in the category is holding it.

But the field's founding paper is weaker than its reputation, and the appendix proves it. The GEO paper's headline is a relative lift in a metric the authors invented, scored by GPT-3.5, on a generative engine they built themselves. Its own Table 1 and Table 6 report the same keyword-stuffing experiment as 17.7 against a 19.3 baseline and as 19.8(±0.5) against a 19.8(±0.6) baseline. Those cannot both be right, and the second is parity. The one deployed-engine test bypassed retrieval by uploading source text as files. This is worth saying out loud on the site, because it is true, it is checkable, and it is the opposite of what the market repeats.

**The premise layer does not hold up, and that is the finding.** /ai-selection-problem asserts that AI systems shape shortlists before the click. Every component of that has support except the one that matters. The output shape is documented by OpenAI. The selection mechanism is measurably distinct from ranking, per a preprint. Click-through effects are well established by Pew and a Wikipedia difference-in-differences. But no public research observes buyers, manipulates brand presence in an answer, and measures the shortlist that results. The two studies that come closest are a 2023 MTurk experiment about car cargo space and a vendor paper that withholds its sample size as commercially sensitive. Neither belongs on the site.

So the honest position is narrower than the category's, and stronger for it: **the shape of the answer is documented by the platforms, the selection mechanism is measurably distinct from ranking, and the effect on human shortlisting is not yet established by public research. Hendricks measures the part that is observable and does not claim the part that is not.**

Two more things, said plainly because they are the reason this pass was worth running.

The failure rate on quotes was not zero, and it was not trivial. Nine of 42 documents were rejected, and ten more cannot be published as proposed. The two worst were a G2 quote spliced from two sentences that contradict each other in the same document, and an Ahrefs quote that converted "≠" into "is not" inside quotation marks. Both were produced by careful researchers working in good faith. On a site that sells measurement rigour, either one, found by a skeptic, costs more than the citation was ever worth. Whatever process ships these to production needs a verbatim check that is mechanical rather than remembered.

And Hendricks should notice that the strongest single sentence available for the sourcing conversation is a negative one: no study anywhere connects AI citation to revenue. That is not a gap to paper over. It is the argument.