// app/solutions/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "Solutions | The Hendricks.AI System",
  description:
    "Search Intelligence Engineering for the AI search era. Explore the Hendricks.AI subscription tiers for AI Search Visibility, technical search signals, and measurement.",
};

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Header />

      {/* Background grid feel */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(139,92,246,0.16),_transparent_55%)] opacity-80" />

      <section className="relative max-w-6xl mx-auto px-4 pt-16 pb-10">
        {/* Section label */}
        <p className="text-sm font-semibold tracking-[0.24em] uppercase text-sky-300">
          Solutions
        </p>

        {/* Hero copy */}
        <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-50">
          The Hendricks.AI System
        </h1>

        <p className="mt-4 max-w-2xl text-base md:text-lg text-slate-200">
          Search Intelligence Engineering for the AI search era. Three subscription tiers,
          one integrated intelligence system, and AI visibility that compounds over time.
        </p>

        <p className="mt-3 max-w-3xl text-sm md:text-base text-slate-300">
          Hendricks.AI is a Search Intelligence Engineering Firm specializing in AI Search
          Visibility and Measurement for B2B companies. We combine visibility engineering,
          technical search signals, and measurement integrity into one system that keeps your
          brand seen, understood, and selected across AI powered search engines including
          Google AI Overviews, Gemini, ChatGPT, Perplexity, and Bing Copilot.
        </p>

        {/* Hero CTAs */}
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-violet-500 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/30 hover:from-sky-400 hover:via-blue-400 hover:to-violet-400 transition"
          >
            Start Your AI Visibility System
          </Link>
          <Link
            href="/insights/ai-search-visibility-b2b-companies-2025"
            className="inline-flex items-center rounded-full border border-slate-700/70 bg-slate-900/60 px-6 py-2.5 text-sm font-semibold text-slate-200 hover:border-sky-400/70 hover:text-sky-300 transition"
          >
            Download the 2025 AI Search Visibility Guide
          </Link>
        </div>

        {/* Overview card */}
        <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-[0_0_40px_rgba(15,23,42,0.9)]">
          <h2 className="text-base font-semibold text-slate-50">
            The Hendricks.AI Subscription Tiers
          </h2>
          <p className="mt-3 text-sm md:text-base text-slate-300 max-w-3xl">
            Each subscription tier operates independently, and together they create a complete
            Search Intelligence system across AI visibility, technical search signals, and
            measurement integrity for B2B companies.
          </p>
        </div>
      </section>

      {/* Tiers */}
      <section className="relative max-w-6xl mx-auto px-4 pb-16 space-y-8">
        {/* Tier 1 */}
        <section id="foundation" className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 md:p-7">
          <p className="text-xs font-semibold tracking-[0.24em] uppercase text-sky-300">
            Tier 1
          </p>
          <h2 className="mt-2 text-xl md:text-2xl font-semibold text-slate-50">
            Foundation: AI Visibility and Measurement
          </h2>
          <p className="mt-1 text-sm text-slate-300">
            Starting at 5,000 dollars per month. Minimum three months.
          </p>
          <p className="mt-4 text-sm md:text-base text-slate-200 max-w-3xl">
            The Foundation tier gives B2B teams ongoing clarity into AI search visibility and
            measurement health without requiring a full Search Intelligence operation.
          </p>

          <div className="mt-5 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-slate-100">
                Monthly deliverables
              </h3>
              <ul className="mt-3 space-y-1.5 text-sm text-slate-300">
                <li>
                  AI visibility monitoring across Google AI Overviews, Gemini, ChatGPT,
                  Perplexity, and Bing Copilot for a defined set of topics.
                </li>
                <li>
                  Visibility and signal integrity scorecard that tracks presence, absence, and
                  shifts across AI surfaces.
                </li>
                <li>
                  Monthly GA4 measurement health audit focused on search and AI influenced
                  conversions.
                </li>
                <li>
                  Schema and entity integrity snapshot for core pages and properties.
                </li>
                <li>
                  Monthly insight report for CMOs and growth leaders with specific actions.
                </li>
                <li>
                  Priority recommendations for engineering, content, SEO, and paid teams.
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-100">
                Ideal for
              </h3>
              <ul className="mt-3 space-y-1.5 text-sm text-slate-300">
                <li>
                  Teams that want AI search visibility clarity without a full Search Intelligence function.
                </li>
                <li>
                  CMOs who need ongoing AI search intelligence to inform strategy and reporting.
                </li>
                <li>
                  Organizations testing AI search as a growth lever before committing to the full System tier.
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href="/solutions/foundation"
              className="inline-flex items-center text-sm font-semibold text-sky-400 hover:text-sky-300 transition"
            >
              View full Foundation details →
            </Link>
          </div>
        </section>

        {/* Tier 2 */}
        <section
          id="system"
          className="rounded-2xl border border-sky-500/40 bg-slate-900/90 p-6 md:p-7 shadow-[0_0_40px_rgba(56,189,248,0.35)]"
        >
          <p className="text-xs font-semibold tracking-[0.24em] uppercase text-sky-300">
            Tier 2
          </p>
          <h2 className="mt-2 text-xl md:text-2xl font-semibold text-slate-50">
            System: AI Search Intelligence System
          </h2>
          <p className="mt-1 text-sm text-slate-300">
            Starting at 10,000 dollars per month. Minimum three to six months.
          </p>
          <p className="mt-4 text-sm md:text-base text-slate-200 max-w-3xl">
            The System tier is the core Hendricks.AI subscription. It provides a full Search
            Intelligence layer across AI visibility, technical search signals, and measurement
            for B2B companies.
          </p>

          <div className="mt-5 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-slate-100">
                Monthly deliverables
              </h3>
              <ul className="mt-3 space-y-1.5 text-sm text-slate-300">
                <li>Everything included in the Foundation tier.</li>
                <li>
                  AI visibility engineering for priority topics and key pages, including
                  guidance for content and technical teams.
                </li>
                <li>
                  Schema and entity optimization across a defined set of assets and products.
                </li>
                <li>
                  Monthly AI surfacing opportunity analysis and prioritization in AI generated answers.
                </li>
                <li>
                  GA4 attribution and event model maintenance as channels and campaigns evolve.
                </li>
                <li>
                  BigQuery export refinement and integrity checks for search and AI data.
                </li>
                <li>
                  Maintenance and evolution of AI visibility dashboards and pipeline correlation views.
                </li>
                <li>
                  One monthly executive working session to interpret findings and choose next actions.
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-100">
                Ideal for
              </h3>
              <ul className="mt-3 space-y-1.5 text-sm text-slate-300">
                <li>
                  Growth stage SaaS and enterprise teams that want a serious AI Search Intelligence system tied to pipeline.
                </li>
                <li>
                  Leaders who want AI search visibility, schema, and measurement treated as one coherent system.
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href="/solutions/system"
              className="inline-flex items-center text-sm font-semibold text-sky-400 hover:text-sky-300 transition"
            >
              View full System details →
            </Link>
          </div>
        </section>

        {/* Tier 3 */}
        <section
          id="partnership"
          className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 md:p-7"
        >
          <p className="text-xs font-semibold tracking-[0.24em] uppercase text-sky-300">
            Tier 3
          </p>
          <h2 className="mt-2 text-xl md:text-2xl font-semibold text-slate-50">
            Partnership: Search Intelligence Engineering Partnership
          </h2>
          <p className="mt-1 text-sm text-slate-300">
            Starting at 20,000 dollars per month. Minimum six to twelve months.
          </p>
          <p className="mt-4 text-sm md:text-base text-slate-200 max-w-3xl">
            The Partnership tier operates like an embedded Search Intelligence Engineering function.
            Hendricks.AI owns the AI search visibility program, signal integrity, and Search Intelligence
            roadmap alongside your leadership team.
          </p>

          <div className="mt-5 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-slate-100">
                Monthly deliverables
              </h3>
              <ul className="mt-3 space-y-1.5 text-sm text-slate-300">
                <li>Everything included in the System tier.</li>
                <li>
                  Full AI visibility program ownership across Google AI Overviews, Gemini, ChatGPT, Perplexity, and Bing Copilot.
                </li>
                <li>
                  Deep signal engineering for schema, entities, structured data, and brand graph alignment across your footprint.
                </li>
                <li>
                  Content intelligence direction including outlines, structures, FAQ frameworks, and schema specifications.
                </li>
                <li>
                  Competitive visibility intelligence across your category and top buyer questions.
                </li>
                <li>
                  Experimentation cycles for schema variants, answer structures, and AI search journeys with learnings built into the roadmap.
                </li>
                <li>
                  Monthly leadership reporting tied directly to pipeline and revenue, ready for CMO and CFO conversations.
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-100">
                Ideal for
              </h3>
              <ul className="mt-3 space-y-1.5 text-sm text-slate-300">
                <li>
                  Mid market and enterprise companies where AI search visibility is a central growth lever.
                </li>
                <li>
                  CMOs who want a dedicated Search Intelligence Engineering function without building the full team internally.
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href="/solutions/partnership"
              className="inline-flex items-center text-sm font-semibold text-sky-400 hover:text-sky-300 transition"
            >
              View full Partnership details →
            </Link>
          </div>
        </section>

        {/* Why monthly section */}
        <section className="mt-10 mb-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 md:p-7">
          <h2 className="text-base md:text-lg font-semibold text-slate-50">
            Why Hendricks.AI works as a monthly system, not a one time project
          </h2>
          <p className="mt-3 text-sm md:text-base text-slate-300">
            AI powered search engines change weekly. Your brand&apos;s visibility, signals, schema, and measurement
            cannot remain static. They require continuous engineering.
          </p>
          <p className="mt-3 text-sm md:text-base text-slate-300">
            One time audits do not keep you visible. One time schema refreshes do not maintain entity integrity.
            One time attribution work breaks as soon as new campaigns launch. Search Intelligence Engineering
            is not a deliverable. It is an operating function.
          </p>
          <p className="mt-3 text-sm md:text-base text-slate-300">
            That is why Hendricks.AI works on a subscription model. Visibility, signals, and measurement must
            evolve with the search environment if you want to stay ahead.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-violet-500 px-6 py-2.5 text-sm font-semibold text-slate-950 hover:from-sky-400 hover:via-blue-400 hover:to-violet-400 transition"
            >
              Book Visibility Consultation
            </Link>
            <Link
              href="/insights"
              className="inline-flex items-center rounded-full border border-slate-700 px-6 py-2.5 text-sm font-semibold text-slate-200 hover:border-sky-400 hover:text-sky-300 transition"
            >
              Explore Insights
            </Link>
          </div>
        </section>
      </section>

      <Footer />
    </div>
  );
}
