import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "../components/site/PageIntro";
import { SiteChrome } from "../components/site/SiteChrome";

export const metadata: Metadata = {
  title: "Insights",
  description: "Notes on search intelligence engineering, retrieval, and citation.",
};

const FEATURED = {
  slug: "what-is-search-intelligence-engineer",
  title: "What is a Search Intelligence Engineer?",
};

const ARCHIVE = [
  { slug: "what-is-search-intelligence-engineer", title: "What is a Search Intelligence Engineer?" },
  { slug: "what-is-ai-search-visibility-measurement", title: "What is AI Search Visibility Measurement?" },
  { slug: "how-to-measure-chatgpt-visibility", title: "How to Measure Your Visibility in ChatGPT" },
  { slug: "how-to-appear-in-google-ai-overviews", title: "How to Appear in Google AI Overviews" },
  { slug: "search-agency-vs-search-intelligence-firm", title: "Search Agency vs Search Intelligence Firm" },
  { slug: "what-is-visibility-audit", title: "What is a Visibility Audit?" },
  { slug: "why-measure-visibility-across-ai-search-engines", title: "Why Measure Visibility Across AI Search Engines" },
  { slug: "chatgpt-vs-perplexity-vs-gemini", title: "ChatGPT vs Perplexity vs Gemini" },
  { slug: "how-gemini-3-ai-mode-changes-ai-search-visibility", title: "How Gemini 3 AI Mode Changes AI Search Visibility" },
  { slug: "what-third-party-platforms-gemini-cites", title: "What Third-Party Platforms Gemini Cites" },
  { slug: "press-coverage-ai-visibility", title: "Press Coverage and AI Visibility" },
  { slug: "ai-search-visibility-guide", title: "AI Search Visibility Guide" },
  { slug: "ai-search-visibility-revenue-impact", title: "AI Search Visibility and Revenue Impact" },
  { slug: "b2b-ai-visibility-companies", title: "B2B Companies and AI Visibility" },
  { slug: "ai-visibility-metrics-gemini", title: "Gemini AI Visibility Metrics" },
  { slug: "what-is-unified-search-execution", title: "What is Unified Search Execution?" },
  { slug: "how-to-prove-search-roi-to-cfo", title: "How to Prove Search ROI to a CFO" },
  { slug: "google-ai-revolution-search-marketing", title: "Google's AI Revolution and Search Marketing" },
  { slug: "death-of-keywords-ai-max-search", title: "AI Max for Search" },
  { slug: "b2b-marketing-funnel-is-dead", title: "The B2B Marketing Funnel is Dead" },
  { slug: "google-meridian-mmm-predictive-ai", title: "Google Meridian MMM and Predictive AI" },
  { slug: "ai-marketing-beyond-smart-bidding", title: "AI Marketing Beyond Smart Bidding" },
];

export default function InsightsPage() {
  return (
    <SiteChrome>
      <article className="product">
        <PageIntro title="Insights" />
        <section className="product-section panel">
          <h2>
            <Link href={`/insights/${FEATURED.slug}`}>{FEATURED.title}</Link>
          </h2>
        </section>
        <section className="product-section">
          <ul className="archive-list">
            {ARCHIVE.map((item) => (
              <li key={item.slug}>
                <Link href={`/insights/${item.slug}`}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </SiteChrome>
  );
}
