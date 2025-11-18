import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

export const metadata: Metadata = {
  title: "2025 AI Search Visibility Guide | Hendricks.AI",
  description:
    "A practical playbook for B2B leaders on how to understand, measure, and engineer AI Search Visibility across Google AI Overviews, Gemini, ChatGPT, Perplexity, and Bing Copilot.",
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "@id": "https://hendricks.ai/insights/ai-search-visibility-guide#article",
  "headline": "2025 AI Search Visibility Guide",
  "description":
    "A practical playbook for understanding, measuring, and engineering AI Search Visibility across Google AI Overviews, Gemini, ChatGPT, Perplexity, and Bing Copilot.",
  "author": {
    "@type": "Person",
    "@id": "https://hendricks.ai/#brandon-hendricks",
    "name": "Brandon Lincoln Hendricks",
  },
  "publisher": {
    "@type": "Organization",
    "@id": "https://hendricks.ai/#organization",
    "name": "Hendricks.AI",
    "url": "https://hendricks.ai",
  },
  "datePublished": "2025-01-01",
  "dateModified": "2025-01-01",
  "mainEntityOfPage": "https://hendricks.ai/insights/ai-search-visibility-guide",
  "url": "https://hendricks.ai/insights/ai-search-visibility-guide",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://hendricks.ai/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Insights",
      item: "https://hendricks.ai/insights",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "2025 AI Search Visibility Guide",
      item: "https://hendricks.ai/insights/ai-search-visibility-guide",
    },
  ],
};

export default function AISearchVisibilityGuidePage() {
  return (
    <>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="min-h-screen bg-slate-950 text-slate-50">
        <Header />

        {/* background glow */}
        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(129,140,248,0.20),_transparent_60%)] opacity-80" />

        <main className="relative max-w-4xl mx-auto px-4 pt-20 pb-24">
          {/* Cover / Hero */}
          <section className="rounded-3xl bg-slate-950/90 border border-slate-800 shadow-[0_18px_40px_rgba(15,23,42,0.7)] overflow-hidden mb-10">
            <div className="relative bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.4),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(129,140,248,0.4),_transparent_60%),linear-gradient(135deg,#020617,#020617)] px-7 py-12">
              <div className="relative z-10 space-y-5">
                <span className="inline-flex items-center rounded-full border border-sky-400/60 bg-slate-950/80 px-3 py-1 text-[10px] font-semibold tracking-[0.24em] uppercase text-sky-200">
                  2025 Guide - AI Search Visibility
                </span>
                <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
                  2025 AI Search Visibility Guide
                  <br />
                  <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                    The B2B Leader&apos;s Playbook for the AI Search Era
                  </span>
                </h1>
                <p className="max-w-xl text-xs md:text-sm text-slate-100/90">
                  A practical guide for understanding, measuring, and engineering AI Search Visibility
                  across Google AI Overviews, Gemini, ChatGPT, Perplexity, and Bing Copilot.
                </p>
                <p className="text-[11px] text-slate-200">
                  By <span className="font-semibold">Brandon Lincoln Hendricks</span> - Founder and Search Intelligence Engineer, Hendricks.AI
                </p>
              </div>
            </div>

            {/* Body wrapper */}
            <div className="px-7 py-8 bg-slate-950">
              {/* Table of Contents */}
              <section className="mb-8 rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
                <h2 className="text-sm font-semibold text-slate-50 mb-2">
                  Table of Contents
                </h2>
                <ol className="ml-4 mt-1 space-y-1 text-[13px] text-slate-300">
                  <li>1. Executive Summary</li>
                  <li>2. Understanding the New Search Reality</li>
                  <li>3. The Four Components of AI Search Visibility</li>
                  <li>4. The Four Layer Framework</li>
                  <li>5. How to Measure AI Search Visibility</li>
                  <li>6. Engineering Signals: Schema, Entities and Structure</li>
                  <li>7. Building a Search Intelligence System</li>
                  <li>8. Common Pitfalls and Anti Patterns</li>
                  <li>9. 30 / 60 / 90 Day AI Visibility Action Plan</li>
                  <li>10. Conclusion and Next Steps</li>
                </ol>
              </section>

              {/* Executive Summary */}
              <section>
                <h2 className="mt-4 text-xl md:text-2xl font-semibold text-slate-50 border-b border-slate-800 pb-2">
                  1. Executive Summary
                </h2>
                <p className="mt-4 text-xs md:text-sm text-slate-200">
                  The landscape of B2B buyer research has fundamentally transformed. Your prospects
                  no longer rely on a single search engine. They use an ecosystem of AI powered tools
                  that synthesize, compare, and contextualize information in new ways.
                </p>
                <p className="mt-3 text-xs md:text-sm text-slate-200">
                  Today, B2B buyers commonly leverage engines and assistants such as Google AI
                  Overviews, Gemini, ChatGPT, Perplexity, and Bing Copilot to get answers, context,
                  and validation without ever reaching a traditional search result page.
                </p>
                <p className="mt-3 text-xs md:text-sm text-slate-200">
                  Traditional SEO and paid search reporting were not designed to capture these
                  surfaces. Most teams are effectively blind when it comes to AI Search Visibility.
                </p>
                <div className="mt-4 rounded-md border-l-4 border-sky-400 bg-sky-50/10 px-4 py-3">
                  <p className="text-[13px] text-sky-100">
                    AI Search Visibility asks a different question than classic SEO. Instead of asking
                    where you rank for a keyword, it asks:
                    <br />
                    <br />
                    <em>
                      When a buyer asks AI engines the questions that matter to our business, does our
                      brand appear in the answers and how are we represented.
                    </em>
                  </p>
                </div>
                <p className="mt-4 text-xs md:text-sm text-slate-200">
                  This guide provides B2B leaders with a clear roadmap for understanding and improving
                  AI Search Visibility using a Search Intelligence Engineering approach.
                </p>
              </section>

              {/* Understanding the New Search Reality */}
              <section>
                <h2 className="mt-8 text-xl md:text-2xl font-semibold text-slate-50 border-b border-slate-800 pb-2">
                  2. Understanding the New Search Reality
                </h2>
                <p className="mt-4 text-xs md:text-sm text-slate-200">
                  The rules of search have changed. Visibility is no longer only about positions on a
                  list of links. It is about whether you are included in synthesized, AI generated
                  answers that blend multiple sources into a single response.
                </p>
                <p className="mt-3 text-xs md:text-sm text-slate-200">
                  AI search engines:
                </p>
                <ul className="mt-2 ml-5 list-disc text-xs md:text-sm text-slate-200 space-y-1">
                  <li>Crawl your website, but also third party sites, docs, and knowledge bases.</li>
                  <li>Combine information from multiple sources into one coherent answer.</li>
                  <li>Rely on structured data and entity consistency to infer context.</li>
                  <li>Surface or ignore brands based on clarity, trust, and usefulness of signals.</li>
                </ul>
                <p className="mt-3 text-xs md:text-sm text-slate-200">
                  As a result, measurement must evolve beyond classic rankings. You need a way to see
                  how AI engines perceive your brand and how that perception influences awareness and
                  pipeline.
                </p>
              </section>

              {/* Four Components */}
              <section>
                <h2 className="mt-8 text-xl md:text-2xl font-semibold text-slate-50 border-b border-slate-800 pb-2">
                  3. The Four Components of AI Search Visibility
                </h2>
                <p className="mt-4 text-xs md:text-sm text-slate-200">
                  AI Search Visibility can be thought of as four connected components. If you break at
                  any layer, visibility fails.
                </p>
                <div className="mt-4 overflow-hidden rounded-md border border-slate-700">
                  <table className="w-full text-[13px]">
                    <thead>
                      <tr className="bg-gradient-to-r from-slate-900 to-slate-800 text-slate-50">
                        <th className="px-3 py-2 text-left font-semibold">Component</th>
                        <th className="px-3 py-2 text-left font-semibold">What It Means</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-slate-900/50 text-slate-200">
                        <td className="px-3 py-2 font-semibold">Discoverability</td>
                        <td className="px-3 py-2">
                          AI systems can find relevant information about your brand and solutions.
                        </td>
                      </tr>
                      <tr className="bg-slate-900/30 text-slate-200">
                        <td className="px-3 py-2 font-semibold">Understanding</td>
                        <td className="px-3 py-2">
                          AI systems interpret what you do, who you serve, and where you fit in the
                          ecosystem accurately.
                        </td>
                      </tr>
                      <tr className="bg-slate-900/50 text-slate-200">
                        <td className="px-3 py-2 font-semibold">Trust</td>
                        <td className="px-3 py-2">
                          Signals from your content and third party sources indicate you are safe,
                          reliable, and relevant to use.
                        </td>
                      </tr>
                      <tr className="bg-slate-900/30 text-slate-200">
                        <td className="px-3 py-2 font-semibold">Selection</td>
                        <td className="px-3 py-2">
                          Your brand is chosen and included in synthesized answers that buyers see.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 rounded-md border-l-4 border-sky-400 bg-sky-50/10 px-4 py-3 text-[13px] text-sky-100">
                  Each component builds on the previous one. You must first be discoverable, then
                  correctly understood, then trusted, before you are selected and visible inside AI
                  generated answers.
                </div>
              </section>

              {/* Four Layer Framework */}
              <section>
                <h2 className="mt-8 text-xl md:text-2xl font-semibold text-slate-50 border-b border-slate-800 pb-2">
                  4. The Four Layer Framework for AI Search Visibility
                </h2>
                <p className="mt-4 text-xs md:text-sm text-slate-200">
                  To build durable AI Search Visibility, it helps to think in terms of four
                  interconnected layers.
                </p>

                <h3 className="mt-5 text-sm md:text-base font-semibold text-slate-50">
                  Layer 1: Questions and Topics
                </h3>
                <p className="mt-2 text-xs md:text-sm text-slate-200">
                  Understand what buyers actually ask AI engines. This includes:
                </p>
                <ul className="mt-1 ml-5 list-disc text-xs md:text-sm text-slate-200 space-y-1">
                  <li>High intent questions across awareness, consideration, and decision stages.</li>
                  <li>Problem language, not just product language.</li>
                  <li>Comparisons and landscape questions that determine shortlist formation.</li>
                </ul>

                <h3 className="mt-5 text-sm md:text-base font-semibold text-slate-50">
                  Layer 2: Content and Context
                </h3>
                <p className="mt-2 text-xs md:text-sm text-slate-200">
                  Create content that AI engines can understand and reuse. That means:
                </p>
                <ul className="mt-1 ml-5 list-disc text-xs md:text-sm text-slate-200 space-y-1">
                  <li>Question first headings and structure.</li>
                  <li>Clear definitions, explanations, and examples.</li>
                  <li>Lists, frameworks, and FAQs that are easy to extract.</li>
                </ul>

                <h3 className="mt-5 text-sm md:text-base font-semibold text-slate-50">
                  Layer 3: Signals and Structure
                </h3>
                <p className="mt-2 text-xs md:text-sm text-slate-200">
                  Engineer the technical layer supporting visibility:
                </p>
                <ul className="mt-1 ml-5 list-disc text-xs md:text-sm text-slate-200 space-y-1">
                  <li>Schema markup for organization, services, FAQs, and how tos.</li>
                  <li>Entity clarity across your site and key external properties.</li>
                  <li>Technical health such as crawlability, performance, and clean URLs.</li>
                </ul>

                <h3 className="mt-5 text-sm md:text-base font-semibold text-slate-50">
                  Layer 4: Measurement and Intelligence
                </h3>
                <p className="mt-2 text-xs md:text-sm text-slate-200">
                  Make visibility measurable and understandable:
                </p>
                <ul className="mt-1 ml-5 list-disc text-xs md:text-sm text-slate-200 space-y-1">
                  <li>Baseline AI visibility for key questions and topics.</li>
                  <li>Question level tracking and periodic audits across engines.</li>
                  <li>Dashboards that include AI Search Visibility alongside traditional search.</li>
                </ul>
              </section>

              {/* Measurement */}
              <section>
                <h2 className="mt-8 text-xl md:text-2xl font-semibold text-slate-50 border-b border-slate-800 pb-2">
                  5. How to Measure AI Search Visibility
                </h2>
                <p className="mt-4 text-xs md:text-sm text-slate-200">
                  Measurement does not need to be perfect to create value. The goal is to track
                  enough to see patterns and make better decisions about where to focus.
                </p>

                <h3 className="mt-4 text-sm md:text-base font-semibold text-slate-50">
                  Core Metrics
                </h3>
                <ul className="mt-2 ml-5 list-disc text-xs md:text-sm text-slate-200 space-y-1">
                  <li>
                    <strong>Presence Rate:</strong> how often you appear for a defined set of buyer questions.
                  </li>
                  <li>
                    <strong>Context Quality:</strong> how accurately your brand, solutions, and differentiators are described.
                  </li>
                  <li>
                    <strong>Signal Health:</strong> how complete and consistent your schema, entities, and technical setup appear.
                  </li>
                  <li>
                    <strong>Assisted Impact:</strong> whether topics tied to AI visibility correlate with higher engagement or better pipeline outcomes.
                  </li>
                </ul>

                <h3 className="mt-4 text-sm md:text-base font-semibold text-slate-50">
                  Practical Measurement Loop
                </h3>
                <ol className="mt-2 ml-5 list-decimal text-xs md:text-sm text-slate-200 space-y-1">
                  <li>Define 20-50 buyer questions that matter most to your business.</li>
                  <li>Query major AI engines with these questions and record where you appear.</li>
                  <li>Note how you are framed and when competitors are favoured instead.</li>
                  <li>Track changes month over month to see trendlines.</li>
                  <li>Where possible, correlate visibility shifts with behavior in GA4 and CRM.</li>
                </ol>
              </section>

              {/* Signals */}
              <section>
                <h2 className="mt-8 text-xl md:text-2xl font-semibold text-slate-50 border-b border-slate-800 pb-2">
                  6. Engineering Signals, Schema and Structure
                </h2>
                <p className="mt-4 text-xs md:text-sm text-slate-200">
                  To AI engines, your content is only as useful as its structure and signals.
                  Search Intelligence Engineering gives significant attention to this layer.
                </p>

                <h3 className="mt-4 text-sm md:text-base font-semibold text-slate-50">
                  Key Schema Types
                </h3>
                <ul className="mt-2 ml-5 list-disc text-xs md:text-sm text-slate-200 space-y-1">
                  <li>Organization schema for your company identity.</li>
                  <li>Service schema for offerings like Foundation, System, and Partnership.</li>
                  <li>FAQPage schema for sets of questions and answers.</li>
                  <li>HowTo schema for implementation and process guides.</li>
                  <li>TechArticle schema for in depth educational content.</li>
                </ul>

                <h3 className="mt-4 text-sm md:text-base font-semibold text-slate-50">
                  Entity Consistency
                </h3>
                <ul className="mt-2 ml-5 list-disc text-xs md:text-sm text-slate-200 space-y-1">
                  <li>Use consistent naming for company, products, and strategic concepts.</li>
                  <li>Align your site, LinkedIn, Crunchbase, docs, and major listings.</li>
                  <li>Mark up founders and services where appropriate.</li>
                </ul>

                <h3 className="mt-4 text-sm md:text-base font-semibold text-slate-50">
                  Content Structure Guidelines
                </h3>
                <ul className="mt-2 ml-5 list-disc text-xs md:text-sm text-slate-200 space-y-1">
                  <li>Include a clear definition paragraph near the top.</li>
                  <li>Frame sections around questions and use cases buyers actually ask.</li>
                  <li>Use lists, frameworks, and FAQs to make extraction simpler.</li>
                  <li>End with a concise summary and recommended next steps.</li>
                </ul>
              </section>

              {/* System */}
              <section>
                <h2 className="mt-8 text-xl md:text-2xl font-semibold text-slate-50 border-b border-slate-800 pb-2">
                  7. Building a Search Intelligence System
                </h2>
                <p className="mt-4 text-xs md:text-sm text-slate-200">
                  AI Search Visibility is not a one time fix. It functions best as a system that
                  matures over time. The Hendricks.AI model uses three levels that map to
                  Foundation, System, and Partnership.
                </p>

                <h3 className="mt-5 text-sm md:text-base font-semibold text-slate-50">
                  Foundation - Visibility and Measurement
                </h3>
                <p className="mt-2 text-xs md:text-sm text-slate-200">
                  Goal: clarity.
                </p>
                <ul className="ml-5 mt-1 list-disc text-xs md:text-sm text-slate-200 space-y-1">
                  <li>Baseline AI Search Visibility across core questions.</li>
                  <li>Identify visible gaps in signals and measurement.</li>
                  <li>Establish a simple scorecard and recurring review.</li>
                </ul>

                <h3 className="mt-5 text-sm md:text-base font-semibold text-slate-50">
                  System - AI Search Intelligence System
                </h3>
                <p className="mt-2 text-xs md:text-sm text-slate-200">
                  Goal: a functioning Search Intelligence layer.
                </p>
                <ul className="ml-5 mt-1 list-disc text-xs md:text-sm text-slate-200 space-y-1">
                  <li>Implement schema and entity improvements for key surfaces.</li>
                  <li>Build the measurement layer using GA4, BigQuery, and CRM integration.</li>
                  <li>Integrate AI visibility into dashboards used by marketing and revenue teams.</li>
                </ul>

                <h3 className="mt-5 text-sm md:text-base font-semibold text-slate-50">
                  Partnership - Search Intelligence Engineering Function
                </h3>
                <p className="mt-2 text-xs md:text-sm text-slate-200">
                  Goal: continuous engineering.
                </p>
                <ul className="ml-5 mt-1 list-disc text-xs md:text-sm text-slate-200 space-y-1">
                  <li>Treat AI Search Visibility as a permanent engineering discipline.</li>
                  <li>Monitor signals, visibility, and measurement as platforms evolve.</li>
                  <li>Align Search Intelligence metrics and insights to executive reporting cycles.</li>
                  <li>Experiment with content patterns, schema variants, and entity models.</li>
                </ul>
              </section>

              {/* Pitfalls */}
              <section>
                <h2 className="mt-8 text-xl md:text-2xl font-semibold text-slate-50 border-b border-slate-800 pb-2">
                  8. Common Pitfalls and Anti Patterns
                </h2>
                <p className="mt-4 text-xs md:text-sm text-slate-200">
                  Many organizations struggle with AI Search Visibility because of a few recurring
                  patterns.
                </p>
                <ul className="mt-2 ml-5 list-disc text-xs md:text-sm text-slate-200 space-y-1">
                  <li>Assuming AI search is still too early to impact real buyers.</li>
                  <li>Relying on classic keyword rankings as the primary visibility indicator.</li>
                  <li>Treating schema markup as a one off project instead of ongoing work.</li>
                  <li>Producing content without a question and signal model.</li>
                  <li>Expecting GA4 alone to explain AI influenced journeys.</li>
                </ul>
                <p className="mt-3 text-xs md:text-sm text-slate-200">
                  The core shift is to treat Search Intelligence as a system to be engineered rather
                  than a set of disconnected tactics.
                </p>
              </section>

              {/* Action Plan */}
              <section>
                <h2 className="mt-8 text-xl md:text-2xl font-semibold text-slate-50 border-b border-slate-800 pb-2">
                  9. 30 / 60 / 90 Day AI Visibility Action Plan
                </h2>
                <p className="mt-4 text-xs md:text-sm text-slate-200">
                  You do not need to solve everything at once. This simple plan can be adapted to your
                  team and resources.
                </p>

                <div className="mt-4 space-y-4">
                  <div className="rounded-xl border border-sky-500/40 bg-sky-50/10 p-4">
                    <h3 className="text-sm md:text-base font-semibold text-sky-200">
                      First 30 Days - Clarity
                    </h3>
                    <ul className="mt-2 ml-5 list-disc text-xs md:text-sm text-slate-100 space-y-1">
                      <li>Map 20-30 core buyer questions and problem statements.</li>
                      <li>Baseline where you appear for those questions across AI engines.</li>
                      <li>Audit schema and entity coverage on core pages.</li>
                      <li>Identify obvious measurement gaps in GA4 and event tracking.</li>
                    </ul>
                  </div>

                  <div className="rounded-xl border border-indigo-500/40 bg-indigo-50/10 p-4">
                    <h3 className="text-sm md:text-base font-semibold text-indigo-100">
                      Days 31-60 - Signals
                    </h3>
                    <ul className="mt-2 ml-5 list-disc text-xs md:text-sm text-slate-100 space-y-1">
                      <li>Implement Organization and Service schema for key surfaces.</li>
                      <li>Add structured Q and A and FAQs where buyers need clarity.</li>
                      <li>Improve technical health for priority content assets.</li>
                      <li>Launch a basic AI visibility scorecard and monthly review.</li>
                    </ul>
                  </div>

                  <div className="rounded-xl border border-violet-500/40 bg-violet-50/10 p-4">
                    <h3 className="text-sm md:text-base font-semibold text-violet-100">
                      Days 61-90 - System
                    </h3>
                    <ul className="mt-2 ml-5 list-disc text-xs md:text-sm text-slate-100 space-y-1">
                      <li>Integrate AI visibility into dashboards used by leadership.</li>
                      <li>Begin correlating visibility shifts with engagement and pipeline signals.</li>
                      <li>Define ongoing ownership for Search Intelligence Engineering work.</li>
                      <li>Decide whether to build internally, externally, or via a hybrid model.</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Conclusion & CTA */}
              <section>
                <h2 className="mt-8 text-xl md:text-2xl font-semibold text-slate-50 border-b border-slate-800 pb-2">
                  10. Conclusion and Next Steps
                </h2>
                <p className="mt-4 text-xs md:text-sm text-slate-200">
                  AI Search Visibility is quickly becoming a core part of how B2B buyers learn about
                  vendors, compare solutions, and build shortlists. Many organizations have not yet
                  adapted how they measure or engineer this visibility.
                </p>
                <p className="mt-3 text-xs md:text-sm text-slate-200">
                  The organizations that treat Search Intelligence as a discipline rather than a
                  project will be better prepared for the next decade of AI influenced buying
                  behavior.
                </p>
                <p className="mt-3 text-xs md:text-sm text-slate-200">
                  You do not need a massive team to start. You do need clarity, a signal model, and
                  a commitment to treat AI Search Visibility as a system rather than an afterthought.
                </p>

                <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-900/90 p-5">
                  <h3 className="text-sm md:text-base font-semibold text-slate-50 mb-2">
                    Need a partner to build your Search Intelligence system
                  </h3>
                  <p className="text-xs md:text-sm text-slate-200">
                    Hendricks.AI focuses exclusively on Search Intelligence Engineering for B2B
                    companies. We help marketing and revenue leaders understand how AI search engines
                    see their brand, engineer the right signals and schema, and build the measurement
                    layer that connects visibility to real business outcomes.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link
                      href="/solutions"
                      className="inline-flex items-center rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-violet-500 px-5 py-2.5 text-xs font-semibold text-slate-950 shadow-lg hover:from-sky-400 hover:via-blue-400 hover:to-violet-400 transition"
                    >
                      View Subscription Tiers
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/70 px-5 py-2.5 text-xs font-semibold text-slate-200 hover:border-sky-400 hover:text-sky-300 transition"
                    >
                      Book Visibility Consultation
                    </Link>
                  </div>
                  <p className="mt-4 text-[11px] text-slate-400 italic">
                    Contact: Brandon Lincoln Hendricks - brandon@hendricks.ai - https://hendricks.ai
                  </p>
                </div>
              </section>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
