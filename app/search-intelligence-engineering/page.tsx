import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Database, BarChart3, Cpu, Globe } from "lucide-react";

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
          "Search Intelligence Engineering is the discipline of designing and maintaining the visibility, signal, and measurement systems that govern how your brand appears across AI and traditional search engines.",
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
    <div className="bg-black text-white min-h-screen font-sans selection:bg-blue-500/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 border-b border-zinc-800 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent opacity-50" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-medium tracking-[0.18em] uppercase mb-6">
            <Cpu size={14} />
            <span>The New Discipline</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400">
            What is Search Intelligence Engineering?
          </h1>
          <p className="text-sm md:text-base text-zinc-300 leading-relaxed max-w-3xl">
            <strong className="text-white">
              Search Intelligence Engineering is the discipline of designing and maintaining
              the visibility, signal, and measurement systems
            </strong>{" "}
            that govern how your brand appears across AI powered and traditional search engines.
            It treats search as an integrated system to be engineered, rather than a single
            channel to be optimized.
          </p>
        </div>
      </section>

      {/* The Problem / Shift */}
      <section className="py-24 px-6 border-b border-zinc-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            The Shift from Optimization to Engineering
          </h2>
          <p className="text-sm md:text-base text-zinc-400 mb-8">
            Search used to mean "10 blue links and a ranking." In the AI era, search now
            includes AI Overviews, Gemini, ChatGPT, Perplexity, and other assistants that
            synthesize answers, run tools, and reason over your data. That requires a different
            discipline.
          </p>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                <h3 className="text-lg font-semibold mb-4 text-zinc-300">Traditional SEO</h3>
                <ul className="space-y-3 text-zinc-500 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">×</span>
                    <span>Optimizes for rankings and individual keywords.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">×</span>
                    <span>Focuses on one engine at a time, usually Google only.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">×</span>
                    <span>Responds to algorithm changes reactively.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">×</span>
                    <span>Often isolated from product, data, and measurement teams.</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="space-y-6">
              <div className="relative p-6 rounded-2xl bg-zinc-900/50 border border-blue-500/20 overflow-hidden">
                <div className="absolute inset-0 bg-blue-500/5 pointer-events-none" />
                <h3 className="text-lg font-semibold mb-4 text-blue-400">
                  Search Intelligence Engineering
                </h3>
                <ul className="space-y-3 text-zinc-300 text-sm relative z-10">
                  <li className="flex items-start gap-3">
                    <Check size={16} className="text-blue-400 mt-1" />
                    <span>Engineers entities, schema, and knowledge graphs for AI systems.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check size={16} className="text-blue-400 mt-1" />
                    <span>
                      Optimizes for how AI engines answer questions, not just where links rank.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check size={16} className="text-blue-400 mt-1" />
                    <span>
                      Designs resilient signal systems that support visibility across multiple AI
                      and search surfaces.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check size={16} className="text-blue-400 mt-1" />
                    <span>
                      Operates alongside product, engineering, and data teams as an ongoing
                      function, not a campaign.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 3 Pillars */}
      <section className="py-24 px-6 border-b border-zinc-800 bg-zinc-900/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">The Three Pillars</h2>
            <p className="text-sm md:text-base text-zinc-400">
              Search Intelligence Engineering unifies three critical layers into one operating
              system.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="group p-8 rounded-2xl bg-black border border-zinc-800 hover:border-blue-500/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-105 transition-transform">
                <Globe size={24} />
              </div>
              <h3 className="text-lg font-bold mb-3">AI Search Visibility</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Ensuring your brand appears and is correctly represented across AI Overviews,
                Gemini, ChatGPT, Perplexity, Bing Copilot, and traditional results. The focus
                is not only presence, but how you are framed inside answers.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="group p-8 rounded-2xl bg-black border border-zinc-800 hover:border-purple-500/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-105 transition-transform">
                <Database size={24} />
              </div>
              <h3 className="text-lg font-bold mb-3">Signals & Schema</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Structuring your data into schema and entities that AI systems can understand
                and trust. This includes Organization, Service, TechArticle, FAQPage, and
                HowTo schema, as well as entity consistency across your web footprint.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="group p-8 rounded-2xl bg-black border border-zinc-800 hover:border-emerald-500/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-105 transition-transform">
                <BarChart3 size={24} />
              </div>
              <h3 className="text-lg font-bold mb-3">Unified Measurement</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Connecting visibility to pipeline and revenue. This includes AI visibility
                metrics, GA4 and BigQuery based tracking, and attribution models that reflect
                how AI and search influence B2B buyer journeys.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section (on-page) */}
      <section className="py-24 px-6 border-b border-zinc-800">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-10">Frequently Asked Questions</h2>
          <div className="space-y-8 text-sm md:text-base">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-white">Why "Engineering"?</h3>
              <p className="text-zinc-400 leading-relaxed">
                Optimization suggests tweaking an existing system. In the AI era, search
                requires new systems. Search Intelligence Engineering designs the data
                structures, schema, and measurement pipelines that AI engines rely on. It is
                closer to software and data engineering than it is to campaign management.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-white">
                Is this just technical SEO rebranded?
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                No. Technical SEO is an input. Search Intelligence Engineering includes AI
                Search Visibility strategy, entity modeling, schema architecture, and
                measurement. It sits at the intersection of marketing, engineering, and data
                science, with the goal of making search performance explainable and
                defensible at the executive level.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-white">How do we get started?</h3>
              <p className="text-zinc-400 leading-relaxed">
                A practical starting point is to audit how AI engines currently understand
                your brand and solutions. From there, you can prioritize schema improvements,
                entity consistency, and basic AI Search Visibility measurement before
                expanding into a full Search Intelligence Engineering system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Treat Search as an Engineering Problem?
          </h2>
          <p className="text-sm md:text-base text-zinc-400 mb-10">
            If you want your brand to be visible, correctly understood, and measurable across
            AI search, you need a Search Intelligence system, not another campaign.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-black text-sm font-semibold hover:bg-zinc-200 transition-colors"
            >
              Book a Consultation
            </Link>
            <Link
              href="/solutions"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-zinc-900 border border-zinc-800 text-sm font-medium text-white hover:bg-zinc-800 transition-colors"
            >
              Explore the Hendricks.AI System{" "}
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
