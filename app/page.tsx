// app/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

export const metadata: Metadata = {
  title: "Hendricks.AI | Search Intelligence Engineering for the AI Search Era",
  description:
    "Hendricks.AI is a Search Intelligence Engineering Firm specializing in AI Search Visibility and Measurement for B2B companies across Google AI Overviews, Gemini, ChatGPT, Perplexity, and Bing Copilot.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Header />

      {/* background glow */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(139,92,246,0.22),_transparent_60%)] opacity-80" />

      {/* HERO */}
      <section className="relative max-w-6xl mx-auto px-4 pt-20 pb-16">
        <p className="inline-flex items-center rounded-full border border-sky-500/40 bg-slate-900/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-sky-300">
          Search Intelligence Engineering
        </p>

        <h1 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
          See What AI Sees. <br />
          <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
            Engineer Visibility the Competition Can&apos;t.
          </span>
        </h1>

        <p className="mt-4 max-w-2xl text-xs md:text-sm text-slate-200">
          AI Search Visibility and Measurement for B2B companies across Google AI Overviews,
          Gemini, ChatGPT, Perplexity, and Bing Copilot.
        </p>

        {/* quick answer */}
        <div className="mt-6 max-w-3xl rounded-2xl border border-slate-800 bg-slate-900/80 p-5 text-xs md:text-sm text-slate-200">
          <p className="font-semibold text-slate-50 mb-1">Quick answer.</p>
          <p>
            Hendricks.AI is a Search Intelligence Engineering Firm specializing in AI Search
            Visibility and Measurement for B2B. We engineer the signals, schema, entities,
            and measurement systems that determine how your brand appears in AI search and
            how that visibility turns into pipeline.
          </p>
        </div>

        {/* hero CTAs */}
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/solutions"
            className="inline-flex items-center rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-violet-500 px-6 py-2.5 text-xs font-semibold text-slate-950 shadow-lg shadow-sky-500/30 hover:from-sky-400 hover:via-blue-400 hover:to-violet-400 transition"
          >
            Start Your AI Visibility System
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/70 px-6 py-2.5 text-xs font-semibold text-slate-200 hover:border-sky-400 hover:text-sky-300 transition"
          >
            Book Visibility Consultation
          </Link>
        </div>
      </section>

      {/* TIER OVERVIEW SECTION */}
      <section className="relative max-w-6xl mx-auto px-4 pb-14 space-y-8">
        <header className="max-w-3xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-sky-300">
            The Hendricks.AI System
          </p>
          <h2 className="mt-3 text-xl md:text-2xl font-semibold leading-snug">
            Three tiers. One Search Intelligence system.
          </h2>
          <p className="mt-3 text-xs md:text-sm text-slate-300">
            Start where you are. Build a continuous AI visibility and measurement function
            that keeps your brand visible, understood, and selected across AI powered search
            engines.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Foundation */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-300">
              Tier 1
            </p>
            <h3 className="mt-2 text-sm md:text-base font-semibold">Foundation</h3>
            <p className="text-xs text-slate-400">AI Visibility and Measurement</p>
            <p className="mt-3 text-[11px] text-slate-300">
              From 5,000 dollars per month. Minimum three months.
            </p>
            <p className="mt-4 text-[11px] text-slate-200">
              Ongoing AI visibility monitoring and measurement health. Continuous insight into
              how AI search engines see your brand, with clear actions for your team every
              month.
            </p>
            <div className="mt-4">
              <Link
                href="/solutions/foundation"
                className="inline-flex text-[11px] font-semibold text-sky-300 hover:text-sky-200"
              >
                Learn more →
              </Link>
            </div>
          </div>

          {/* System */}
          <div className="rounded-2xl border border-sky-500/40 bg-slate-900 p-5 shadow-[0_0_40px_rgba(56,189,248,0.35)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-300">
              Tier 2
            </p>
            <h3 className="mt-2 text-sm md:text-base font-semibold">System</h3>
            <p className="text-xs text-slate-400">AI Search Intelligence System</p>
            <p className="mt-3 text-[11px] text-slate-300">
              From 10,000 dollars per month. Minimum three to six months.
            </p>
            <p className="mt-4 text-[11px] text-slate-200">
              A full Search Intelligence layer across AI visibility, schema, entities, and
              measurement. The operating system for AI search visibility in your marketing
              and revenue engine.
            </p>
            <div className="mt-4">
              <Link
                href="/solutions/system"
                className="inline-flex text-[11px] font-semibold text-sky-300 hover:text-sky-200"
              >
                Learn more →
              </Link>
            </div>
          </div>

          {/* Partnership */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-300">
              Tier 3
            </p>
            <h3 className="mt-2 text-sm md:text-base font-semibold">Partnership</h3>
            <p className="text-xs text-slate-400">
              Search Intelligence Engineering Partnership
            </p>
            <p className="mt-3 text-[11px] text-slate-300">
              From 20,000 dollars per month. Minimum six to twelve months.
            </p>
            <p className="mt-4 text-[11px] text-slate-200">
              Your dedicated Search Intelligence Engineering function. Hendricks.AI owns your
              AI search visibility program, signal integrity, and Search Intelligence roadmap
              alongside your leadership team.
            </p>
            <div className="mt-4">
              <Link
                href="/solutions/partnership"
                className="inline-flex text-[11px] font-semibold text-sky-300 hover:text-sky-200"
              >
                Learn more →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* UNIFIED SEARCH INTELLIGENCE SECTION */}
      <section className="relative max-w-6xl mx-auto px-4 pb-16">
        <div className="rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-8 md:p-10">
          <p className="mb-3 inline-flex items-center rounded-full border border-sky-500/40 bg-slate-900/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-sky-300">
            Search Intelligence Engineering
          </p>

          <h2 className="text-2xl md:text-3xl font-semibold">
            One Market.{" "}
            <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              Infinite Engines.
            </span>{" "}
            Unified by Search Intelligence Engineering.
          </h2>

          <p className="mt-4 max-w-3xl text-xs md:text-sm text-slate-300">
            While competitors chase rankings and content volume, you engineer AI Search
            Visibility. Measure and improve how your brand appears across Google AI Overviews,
            Gemini, ChatGPT, Perplexity, and Bing Copilot as one continuous Search Intelligence
            system.
          </p>

          {/* hidden cost row */}
          <div className="mt-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-900/80 border border-slate-800 p-6 md:p-7">
            <p className="text-sm font-semibold text-slate-50 mb-4">
              The hidden cost of treating search and AI as separate problems
            </p>
            <div className="grid gap-6 md:grid-cols-3 text-xs md:text-sm text-slate-200">
              <div className="space-y-1">
                <p className="text-base font-semibold text-rose-400">
                  Fragmented signals
                </p>
                <p className="text-slate-300">
                  Visibility loss when schema, entities, and AI search signals are not
                  engineered together.
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-base font-semibold text-amber-300">
                  Disconnected analytics
                </p>
                <p className="text-slate-300">
                  Redundant and conflicting reporting when search and AI are measured in
                  separate systems.
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-base font-semibold text-emerald-400">
                  Search Intelligence gains
                </p>
                <p className="text-slate-300">
                  Clearer, more trusted ROI when AI visibility, technical signals, and
                  attribution live in one Search Intelligence layer.
                </p>
              </div>
            </div>
            <p className="mt-5 text-[11px] text-slate-500">
              Built on Google Cloud • Powered by Vertex AI • Designed for the AI Search Era.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="relative max-w-6xl mx-auto px-4 pb-24">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 md:p-10">
          <h2 className="text-xl md:text-2xl font-semibold text-slate-50">
            Ready to engineer AI Search Visibility for your team
          </h2>
          <p className="mt-3 max-w-3xl text-xs md:text-sm text-slate-300">
            Start with the Foundation tier for visibility and measurement clarity or move
            directly into the System or Partnership tiers to build a continuous Search
            Intelligence function for your organization.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/solutions"
              className="inline-flex items-center rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-violet-500 px-6 py-2.5 text-xs font-semibold text-slate-950 shadow-lg shadow-sky-500/30 hover:from-sky-400 hover:via-blue-400 hover:to-violet-400 transition"
            >
              View Subscription Tiers
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/70 px-6 py-2.5 text-xs font-semibold text-slate-200 hover:border-sky-400 hover:text-sky-300 transition"
            >
              Book Visibility Consultation
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
