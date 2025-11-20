import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Database, BarChart3, Cpu, Globe, Users } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "What is Search Intelligence Engineering? | Hendricks.AI",
  description:
    "Search Intelligence Engineering is the discipline of designing and maintaining the visibility, signal, and measurement systems that govern how your brand appears across AI and traditional search engines.",
};

export default function SearchIntelligenceEngineeringPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": "https://hendricks.ai/search-intelligence-engineering#article",
        "headline": "What is Search Intelligence Engineering?",
        "description":
          "Search Intelligence Engineering is the discipline of designing and maintaining the visibility, signal, and measurement systems that govern how your brand appears and is evaluated across AI powered and traditional search engines.",
        "author": {
          "@type": "Person",
          "@id": "https://hendricks.ai/#brandon-hendricks",
          "name": "Brandon Lincoln Hendricks",
          "url": "https://hendricks.ai/about",
        },
        "publisher": {
          "@type": "Organization",
          "@id": "https://hendricks.ai/#organization",
          "name": "Hendricks.AI",
          "url": "https://hendricks.ai",
          "logo": {
            "@type": "ImageObject",
            "url": "https://hendricks.ai/logo/hendricks-logo.png",
          },
        },
        "datePublished": "2025-11-19",
        "dateModified": "2025-11-19",
        "mainEntityOfPage": "https://hendricks.ai/search-intelligence-engineering",
        "url": "https://hendricks.ai/search-intelligence-engineering",
      },
      {
        "@type": "FAQPage",
        "@id": "https://hendricks.ai/search-intelligence-engineering#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is Search Intelligence Engineering?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Search Intelligence Engineering is the discipline of designing and maintaining the visibility, signal, and measurement systems that govern how your brand appears and is evaluated across AI powered and traditional search engines. Unlike traditional SEO, which focuses on ranking pages for keywords, Search Intelligence Engineering focuses on the underlying entities, schema, and signals that AI models and search engines use to understand and surface your brand.",
            },
          },
          {
            "@type": "Question",
            "name": "How is Search Intelligence Engineering different from SEO?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "SEO is primarily concerned with optimizing web pages to rank for specific keywords and drive traffic. Search Intelligence Engineering is broader. It unifies technical schema, entity management, AI Search Visibility, and measurement so that your brand is correctly understood and recommended by AI models such as Gemini, ChatGPT, and Perplexity, as well as traditional search engines like Google and Bing.",
            },
          },
          {
            "@type": "Question",
            "name": "Why do B2B companies need Search Intelligence Engineering?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "As search shifts from a list of links to AI generated answers and interactive experiences, B2B buyers are using AI tools to research vendors and evaluate options. If your brand's entities and signals are not engineered for these systems, you risk being invisible at key decision points. Search Intelligence Engineering ensures that your brand is part of the AI conversation across AI Overviews, Gemini, ChatGPT, Perplexity, and other engines.",
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Background gradient */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(139,92,246,0.16),_transparent_55%)] opacity-80" />

      {/* Hero Section */}
      <section className="relative pt-16 pb-12 px-4 max-w-4xl mx-auto">
        <p className="text-sm font-semibold tracking-[0.24em] uppercase text-sky-300">
          Search Intelligence Engineering
        </p>
        <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-50">
          What is Search Intelligence Engineering?
        </h1>
        <p className="mt-4 text-sm md:text-base text-slate-200 max-w-3xl">
          <strong className="text-slate-50">
            Search Intelligence Engineering is the discipline of designing and maintaining
            the visibility, signal, and measurement systems
          </strong>{" "}
          that govern how your brand appears across AI powered and traditional search engines.
          It treats search as an integrated system to be engineered, not just a channel to be
          optimized.
        </p>
      </section>

      {/* The Shift */}
      <section className="relative py-12 px-4 max-w-4xl mx-auto">
        <h2 className="text-xl md:text-2xl font-semibold text-slate-50 mb-4">
          The Shift from Optimization to Engineering
        </h2>
        <p className="text-sm md:text-base text-slate-300 mb-4">
          Search used to mean "10 blue links" and a ranking. Today, your buyers are seeing AI
          Overviews, interactive answers in Gemini, conversational results in ChatGPT and
          Perplexity, and classic search side by side. These systems do not just rank pages.
          They interpret entities, relationships, and signals and then compose answers.
        </p>
        <p className="text-sm md:text-base text-slate-300 mb-6">
          Traditional SEO is still necessary, but it was not designed for this environment.
          Search Intelligence Engineering is the response to this shift. It sits at the
          intersection of marketing, engineering, and data science and focuses on:
        </p>
        <ul className="ml-5 list-disc text-sm md:text-base text-slate-200 space-y-1">
          <li>how AI engines see your brand</li>
          <li>how signals and schema are structured across your surfaces</li>
          <li>how visibility connects to pipeline and revenue</li>
        </ul>
      </section>

      {/* Why now */}
      <section className="relative py-12 px-4">
        <div className="max-w-4xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/70 p-6 md:p-7">
          <h2 className="text-xl md:text-2xl font-semibold text-slate-50 mb-4">
            Why B2B Companies Need It Now
          </h2>
          <p className="text-sm md:text-base text-slate-300 mb-4">
            B2B buyers increasingly turn to AI powered search experiences to research problems,
            explore approaches, and evaluate vendors before they ever reach a website. Those
            experiences synthesize information from your content, your competitors, and
            third-party sources.
          </p>
          <p className="text-sm md:text-base text-slate-300 mb-4">
            If your brand is not properly represented in the underlying data and signals, you
            risk being excluded from:
          </p>
          <ul className="ml-5 list-disc text-sm md:text-base text-slate-200 space-y-1">
            <li>AI Overviews that define your category</li>
            <li>Gemini and ChatGPT answers comparing vendors</li>
            <li>Perplexity citations and research flows</li>
            <li>Internal tools using AI search on top of the web</li>
          </ul>
          <p className="mt-4 text-sm md:text-base text-slate-300">
            Search Intelligence Engineering exists to make sure that when AI systems answer
            questions in your market, your brand is visible, correctly understood, and
            measurable.
          </p>
        </div>
      </section>

      {/* The Three Pillars */}
      <section className="relative py-12 px-4 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-xl md:text-2xl font-semibold text-slate-50 mb-3">The Three Pillars</h2>
          <p className="text-sm md:text-base text-slate-300">
            Search Intelligence Engineering unifies three critical layers into one operating
            system.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Pillar 1 */}
          <div className="group p-6 rounded-2xl border border-slate-800 bg-slate-900/70 hover:border-sky-500/50 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400 mb-4 group-hover:scale-105 transition-transform">
              <Globe size={20} />
            </div>
            <h3 className="text-base font-semibold text-slate-50 mb-2">AI Search Visibility</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Ensuring your brand appears and is correctly represented across AI Overviews,
              Gemini, ChatGPT, Perplexity, Bing Copilot, and traditional search. The focus
              is on your presence and how you are framed inside the answers, not just your
              rank.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="group p-6 rounded-2xl border border-slate-800 bg-slate-900/70 hover:border-violet-500/50 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400 mb-4 group-hover:scale-105 transition-transform">
              <Database size={20} />
            </div>
            <h3 className="text-base font-semibold text-slate-50 mb-2">Signals & Schema</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Structuring your data into schema and entities that AI systems can understand
              and trust. This includes Organization, Service, TechArticle, FAQPage, and
              HowTo schema, plus entity consistency across your site and key platforms like
              LinkedIn, docs, and knowledge bases.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="group p-6 rounded-2xl border border-slate-800 bg-slate-900/70 hover:border-emerald-500/50 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-105 transition-transform">
              <BarChart3 size={20} />
            </div>
            <h3 className="text-base font-semibold text-slate-50 mb-2">Unified Measurement</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Connecting AI and search visibility to pipeline and revenue. This includes
              AI visibility metrics, GA4 and BigQuery measurement, and attribution models
              that reflect how AI and search influence complex B2B journeys.
            </p>
          </div>
        </div>
      </section>

      {/* Where it lives in the org */}
      <section className="relative py-12 px-4 max-w-4xl mx-auto">
        <h2 className="text-xl md:text-2xl font-semibold text-slate-50 mb-4">
          Where Search Intelligence Engineering Lives in Your Org
        </h2>
        <p className="text-sm md:text-base text-slate-300 mb-6">
          Search Intelligence Engineering is not a replacement for marketing, SEO, or data
          teams. It is a function that coordinates across them.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/70">
            <div className="flex items-center gap-3 mb-3">
              <Users size={16} className="text-sky-400" />
              <h3 className="text-sm font-semibold text-slate-100">
                Typical reporting line
              </h3>
            </div>
            <p className="text-sm text-slate-300">
              In most B2B organizations, Search Intelligence Engineering reports into
              marketing or growth leadership but works closely with analytics, product,
              and engineering teams.
            </p>
          </div>
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/70">
            <h3 className="text-sm font-semibold text-slate-100 mb-3">
              Core collaborators
            </h3>
            <ul className="text-sm text-slate-300 space-y-1">
              <li>Marketing and demand teams (questions, content, campaigns)</li>
              <li>SEO teams (on page and technical fundamentals)</li>
              <li>Data and analytics teams (measurement and attribution)</li>
              <li>Product and docs teams (entities and structured content)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* How Hendricks structures it */}
      <section className="relative py-12 px-4">
        <div className="max-w-4xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/70 p-6 md:p-7">
          <h2 className="text-xl md:text-2xl font-semibold text-slate-50 mb-4">
            How Hendricks.AI Structures Search Intelligence Engineering
          </h2>
          <p className="text-sm md:text-base text-slate-300 mb-4">
            At Hendricks.AI, Search Intelligence Engineering is delivered through a three tier
            subscription model. Each tier reflects a different level of maturity.
          </p>
          <ul className="text-sm md:text-base text-slate-200 space-y-3 ml-1">
            <li>
              <strong className="text-slate-50">Foundation</strong> – baselines AI Search
              Visibility and measurement, identifies critical signal gaps, and sets a cadence
              for visibility and performance reviews.
            </li>
            <li>
              <strong className="text-slate-50">System</strong> – builds out the full Search
              Intelligence layer across AI visibility, schema, entities, and measurement,
              integrating it into dashboards and executive reporting.
            </li>
            <li>
              <strong className="text-slate-50">Partnership</strong> – operates as your ongoing
              Search Intelligence Engineering function, maintaining signals, running
              experiments, and supporting strategic decisions at the leadership level.
            </li>
          </ul>
        </div>
      </section>

      {/* 4-Step Operating Loop */}
      <section className="relative py-12 px-4 max-w-5xl mx-auto">
        <h2 className="text-xl md:text-2xl font-semibold text-slate-50 mb-4">
          The Search Intelligence Engineering Loop
        </h2>
        <p className="text-sm md:text-base text-slate-300 mb-6">
          Search Intelligence Engineering does not operate as a one time project. It runs
          as a continuous loop, typically in four steps.
        </p>
        <div className="grid md:grid-cols-4 gap-4 text-sm">
          <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900/70">
            <p className="text-xs font-semibold text-sky-300 mb-1">Step 1</p>
            <h3 className="text-sm font-semibold mb-2 text-slate-50">
              Baseline & Questions
            </h3>
            <p className="text-slate-300">
              Map the questions that matter, baseline visibility across AI and search
              engines, and understand how you are currently represented.
            </p>
          </div>
          <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900/70">
            <p className="text-xs font-semibold text-sky-300 mb-1">Step 2</p>
            <h3 className="text-sm font-semibold mb-2 text-slate-50">
              Engineer Signals
            </h3>
            <p className="text-slate-300">
              Implement schema, entities, and structural improvements across key pages and
              properties to improve how AI engines understand your brand.
            </p>
          </div>
          <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900/70">
            <p className="text-xs font-semibold text-sky-300 mb-1">Step 3</p>
            <h3 className="text-sm font-semibold mb-2 text-slate-50">
              Integrate Measurement
            </h3>
            <p className="text-slate-300">
              Connect AI and search visibility into GA4, BigQuery, and executive dashboards
              so changes in visibility can be tied to engagement and pipeline.
            </p>
          </div>
          <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900/70">
            <p className="text-xs font-semibold text-sky-300 mb-1">Step 4</p>
            <h3 className="text-sm font-semibold mb-2 text-slate-50">
              Operate & Evolve
            </h3>
            <p className="text-slate-300">
              Maintain signals, monitor AI Search Visibility, run experiments, and evolve
              the system as AI engines and buyer behavior change.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section (on-page) */}
      <section className="relative py-12 px-4 max-w-3xl mx-auto">
        <h2 className="text-xl md:text-2xl font-semibold text-slate-50 mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6 text-sm md:text-base">
          <div>
            <h3 className="text-base font-semibold mb-2 text-slate-50">Why "Engineering"?</h3>
            <p className="text-slate-300 leading-relaxed">
              Optimization suggests tweaking an existing system. In the AI era, search
              requires new systems. Search Intelligence Engineering designs the data
              structures, schema, and measurement pipelines that AI engines rely on. It is
              closer to software and data engineering than it is to campaign management.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold mb-2 text-slate-50">
              Is this just technical SEO rebranded?
            </h3>
            <p className="text-slate-300 leading-relaxed">
              No. Technical SEO is an input. Search Intelligence Engineering includes AI
              Search Visibility strategy, entity modeling, schema architecture, and
              measurement. It sits at the intersection of marketing, engineering, and
              data, with the goal of making search performance explainable and defensible
              at the executive level.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold mb-2 text-slate-50">
              When is a B2B company ready for this?
            </h3>
            <p className="text-slate-300 leading-relaxed">
              You are ready when search is a meaningful driver of demand, AI search is
              clearly part of your buyers' research process, and leadership is asking
              harder questions than "what did we rank for this month." At that point,
              treating search as an engineering problem becomes the only sustainable path.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-50 mb-4">
            Ready to Treat Search as an Engineering Problem?
          </h2>
          <p className="text-sm md:text-base text-slate-300 mb-8">
            If you want your brand to be visible, correctly understood, and measurable across
            AI search, you need a Search Intelligence system, not another campaign.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-violet-500 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/30 hover:from-sky-400 hover:via-blue-400 hover:to-violet-400 transition"
            >
              Book a Consultation
            </Link>
            <Link
              href="/solutions"
              className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/60 px-6 py-2.5 text-sm font-semibold text-slate-200 hover:border-sky-400 hover:text-sky-300 transition"
            >
              Explore the Hendricks.AI System{" "}
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
