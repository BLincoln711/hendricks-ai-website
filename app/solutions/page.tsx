// app/solutions/page.tsx

import type { Metadata } from "next";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "Solutions | Hendricks.AI Search Intelligence Engineering",
  description:
    "Explore the Hendricks.AI subscription tiers for AI Search Visibility, Measurement, and Search Intelligence Engineering for B2B companies.",
};

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Header />
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="mb-10">
          <p className="text-xs font-semibold tracking-widest text-emerald-400 uppercase">
            Solutions
          </p>
          <h1 className="mt-3 text-3xl md:text-4xl font-semibold text-slate-50">
            The Hendricks.AI System
          </h1>
          <p className="mt-4 text-slate-300 max-w-2xl">
            Search Intelligence Engineering for the AI search era. Three subscription tiers,
            one integrated intelligence system, and AI visibility that compounds over time.
          </p>
          <p className="mt-4 text-slate-400 max-w-xl text-sm">
            Hendricks.AI is a Search Intelligence Engineering Firm specializing in AI Search
            Visibility and Measurement for B2B companies. We combine visibility engineering,
            technical search signals, and measurement integrity into one system that keeps
            your brand seen, understood, and selected across AI powered search engines.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/contact"
              className="inline-flex items-center rounded-md bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition"
            >
              Start Your AI Visibility System
            </a>
            <a
              href="/insights/ai-search-visibility-b2b-companies-2025"
              className="inline-flex items-center rounded-md border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-200 hover:border-emerald-400 transition"
            >
              Download the 2025 AI Search Visibility Guide
            </a>
          </div>
        </div>

        {/* Tiers overview intro */}
        <div className="mt-12 border border-slate-800 rounded-xl p-6 bg-slate-900/40">
          <h2 className="text-xl font-semibold text-slate-50">
            The Hendricks.AI Subscription Tiers
          </h2>
          <p className="mt-3 text-sm text-slate-300">
            Each subscription tier operates independently, and together they create a complete
            Search Intelligence system across AI visibility, technical search signals, and
            measurement integrity for B2B companies.
          </p>
        </div>
      </section>

      {/* Tier cards */}
      <section className="max-w-5xl mx-auto px-4 pb-16 space-y-10">
        {/* Foundation Tier */}
        <div id="foundation" className="border border-slate-800 rounded-2xl bg-slate-900/60 p-6 md:p-8">
          <p className="text-xs font-semibold tracking-widest text-emerald-400 uppercase">
            Tier 1
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-50">
            Foundation: AI Visibility and Measurement
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Starting at 5,000 dollars per month. Minimum three months.
          </p>
          <p className="mt-4 text-sm text-slate-200 max-w-3xl">
            The Foundation tier gives B2B teams ongoing clarity into AI search visibility and
            measurement health without requiring a full Search Intelligence operation.
          </p>

          <h3 className="mt-6 text-sm font-semibold text-slate-100">
            Monthly deliverables
          </h3>
          <ul className="mt-3 space-y-1 text-sm text-slate-300">
            <li>
              AI visibility monitoring across Google AI Overviews, Gemini, ChatGPT,
              Perplexity, and Bing Copilot for a defined set of priority topics.
            </li>
            <li>
              Visibility and signal integrity scorecard that tracks presence and shifts
              across AI search surfaces.
            </li>
            <li>
              Monthly measurement health audit for GA4 and key conversions.
            </li>
            <li>
              Schema and entity integrity snapshot for core pages and properties.
            </li>
            <li>
              Monthly insights report for CMOs and growth leaders with clear actions.
            </li>
            <li>
              Priority recommendations for engineering, content, and search teams.
            </li>
          </ul>

          <h3 className="mt-6 text-sm font-semibold text-slate-100">
            Ideal for
          </h3>
          <ul className="mt-3 space-y-1 text-sm text-slate-300">
            <li>
              Teams who want AI visibility clarity without a full Search Intelligence
              Engineering function.
            </li>
            <li>
              CMOs who need ongoing search intelligence to guide decisions.
            </li>
            <li>
              Companies evaluating whether to move into the System tier.
            </li>
          </ul>
        </div>

        {/* System Tier */}
        <div id="system" className="border border-emerald-500/70 rounded-2xl bg-slate-900 p-6 md:p-8 shadow-[0_0_40px_rgba(16,185,129,0.28)]">
          <p className="text-xs font-semibold tracking-widest text-emerald-400 uppercase">
            Tier 2
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-50">
            System: AI Search Intelligence System
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Starting at 10,000 dollars per month. Minimum three to six months.
          </p>
          <p className="mt-4 text-sm text-slate-200 max-w-3xl">
            The System tier is the core Hendricks.AI subscription. It provides a full Search
            Intelligence layer across AI visibility, technical search signals, and measurement
            for B2B companies.
          </p>

          <h3 className="mt-6 text-sm font-semibold text-slate-100">
            Monthly deliverables
          </h3>
          <ul className="mt-3 space-y-1 text-sm text-slate-300">
            <li>Everything included in the Foundation tier.</li>
            <li>
              AI visibility engineering for priority topics and key pages, including
              surfacing recommendations.
            </li>
            <li>
              Schema and entity optimization across a defined content and asset set.
            </li>
            <li>
              Monthly surfacing opportunity analysis and prioritization for AI answers.
            </li>
            <li>
              GA4 attribution and event model maintenance as campaigns and channels evolve.
            </li>
            <li>
              BigQuery export refinement and data integrity checks for search and AI data.
            </li>
            <li>
              Maintenance of AI visibility dashboards and pipeline correlation views.
            </li>
            <li>
              One monthly executive working session to align decisions and next steps with
              marketing and revenue leaders.
            </li>
          </ul>

          <h3 className="mt-6 text-sm font-semibold text-slate-100">
            Ideal for
          </h3>
          <ul className="mt-3 space-y-1 text-sm text-slate-300">
            <li>
              Growth stage SaaS and enterprise teams that want a serious visibility and
              measurement system for AI search.
            </li>
            <li>
              Leaders who want AI search visibility tied directly to pipeline and revenue.
            </li>
          </ul>
        </div>

        {/* Partnership Tier */}
        <div id="partnership" className="border border-slate-800 rounded-2xl bg-slate-900/70 p-6 md:p-8">
          <p className="text-xs font-semibold tracking-widest text-emerald-400 uppercase">
            Tier 3
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-50">
            Partnership: Search Intelligence Engineering Partnership
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Starting at 20,000 dollars per month. Minimum six to twelve months.
          </p>
          <p className="mt-4 text-sm text-slate-200 max-w-3xl">
            The Partnership tier operates like an embedded Search Intelligence Engineering
            function. Hendricks.AI owns the AI search visibility program, signal integrity,
            and Search Intelligence roadmap alongside your leadership team.
          </p>

          <h3 className="mt-6 text-sm font-semibold text-slate-100">
            Monthly deliverables
          </h3>
          <ul className="mt-3 space-y-1 text-sm text-slate-300">
            <li>Everything included in the System tier.</li>
            <li>
              Full AI visibility program ownership across Google AI Overviews, Gemini,
              ChatGPT, Perplexity, and Bing Copilot.
            </li>
            <li>
              Deep signal engineering for schema, entities, structured data, and brand graph
              alignment across your web, docs, and key surfaces.
            </li>
            <li>
              Content intelligence direction including outlines, structures, and FAQ and
              schema specifications for AI extraction.
            </li>
            <li>
              Competitive visibility intelligence across your category and core buyer
              questions.
            </li>
            <li>
              Experimentation and learning cycles for schema variants, answer patterns,
              entity structures, and search journeys.
            </li>
            <li>
              Monthly leadership reporting tied directly to pipeline, revenue, and strategic
              decisions.
            </li>
            <li>
              Direct collaboration with product marketing, SEO, paid media, analytics, and
              engineering teams on Search Intelligence priorities.
            </li>
          </ul>

          <h3 className="mt-6 text-sm font-semibold text-slate-100">
            Ideal for
          </h3>
          <ul className="mt-3 space-y-1 text-sm text-slate-300">
            <li>
              Mid market and enterprise companies where AI search visibility is a top tier
              strategic lever.
            </li>
            <li>
              CMOs who want a dedicated Search Intelligence Engineering function without
              building the full team internally.
            </li>
          </ul>
        </div>
      </section>

      {/* Why Monthly section */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <div className="border border-slate-800 rounded-2xl bg-slate-900/40 p-6 md:p-8">
          <h2 className="text-xl font-semibold text-slate-50">
            Why Hendricks.AI works as a monthly system, not a one time project
          </h2>
          <p className="mt-4 text-sm text-slate-300">
            AI powered search engines change weekly. Your brand&apos;s visibility, signals,
            schema, and measurement cannot remain static. They require continuous engineering.
          </p>
          <p className="mt-3 text-sm text-slate-300">
            One time audits do not keep you visible. One time schema refreshes do not maintain
            entity integrity. One time attribution work breaks as soon as new channels and
            campaigns are launched. One time content adjustments lose impact when AI models
            update.
          </p>
          <p className="mt-3 text-sm text-slate-300">
            The brands that win in AI search are the brands that maintain strong signals,
            consistent entity knowledge, ongoing schema alignment, updated measurement, and
            continuous visibility monitoring with proactive adjustments.
          </p>
          <p className="mt-3 text-sm text-slate-300">
            Search Intelligence Engineering is not a deliverable. It is an operating function.
            That is why Hendricks.AI works on a subscription model. Visibility, signals, and
            measurement must evolve with the search environment if you want to stay ahead.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-4 justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-slate-50">
              Ready to engineer true AI Search Visibility
            </h3>
            <p className="mt-2 text-sm text-slate-300 max-w-xl">
              Your buyers are already using AI powered search. The question is whether you are
              visible inside the answers they trust.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
            <a
              href="/contact"
              className="inline-flex items-center rounded-md bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition"
            >
              Book a Visibility Consultation
            </a>
            <a
              href="/insights"
              className="inline-flex items-center rounded-md border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-200 hover:border-emerald-400 transition"
            >
              Explore Insights
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
