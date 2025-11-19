"use client";

import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Header />

      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(96, 165, 250, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(96, 165, 250, 0.12) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* HERO */}
      <main className="relative z-10">
        <section className="min-h-[80vh] flex items-center pt-24 pb-20">
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left column */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-950/60 border border-blue-700/60 mb-6">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <span className="text-sm font-medium tracking-[0.18em] text-blue-300 uppercase">
                    Search Intelligence Engineering
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight mb-5">
                  <span className="block text-white">
                    See What AI Sees.
                  </span>
                  <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    Engineer Visibility the Competition Can&apos;t.
                  </span>
                </h1>

                <p className="text-base md:text-lg text-gray-300 max-w-xl mb-6">
                  AI Search Visibility and Measurement for B2B companies across Google AI
                  Overviews, Gemini, ChatGPT, Perplexity, and Bing Copilot.
                </p>

                <div className="bg-blue-950/40 border border-blue-800/70 rounded-xl p-4 mb-6">
                  <p className="text-sm md:text-base text-gray-200">
                    <span className="font-semibold text-white">Quick answer.</span> Hendricks.AI is a Search Intelligence Engineering Firm specializing in AI Search Visibility and Measurement for B2B. We engineer the signals, schema, entities, and measurement systems that determine how your brand appears in AI search and how that visibility turns into pipeline.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 mb-3">
                  <Link
                    href="/insights/ai-search-visibility-guide"
                    className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 text-sm md:text-base font-semibold text-white hover:scale-[1.02] transition-transform hover:shadow-[0_0_24px_rgba(96,165,250,0.6)]"
                  >
                    Download the 2025 AI Search Visibility Guide →
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-7 py-3 rounded-full border border-cyan-400/40 text-sm md:text-base font-semibold text-gray-200 hover:border-cyan-400 hover:text-white transition"
                  >
                    Book Visibility Consultation →
                  </Link>
                </div>

                <p className="text-xs text-gray-400">
                  Or{" "}
                  <Link
                    href="/solutions"
                    className="text-cyan-300 hover:text-cyan-200 underline underline-offset-2"
                  >
                    view our subscription tiers
                  </Link>
                  .
                </p>
              </div>

              {/* Right column: simple, premium system card */}
              <div className="hidden lg:flex justify-end">
                <div className="w-full max-w-md rounded-2xl bg-black/70 border border-slate-800/80 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.8)]">
                  <p className="text-xs font-medium tracking-[0.18em] text-slate-400 uppercase mb-3">
                    Unified AI Search Visibility
                  </p>
                  <h3 className="text-xl font-semibold mb-2">
                    One Search Intelligence System.
                  </h3>
                  <p className="text-sm text-gray-300 mb-4">
                    See how your brand appears across AI Overviews, Gemini, ChatGPT, Perplexity, and Bing Copilot in one coherent view.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg border border-slate-700/80 bg-slate-900/80 p-3">
                      <p className="text-sm font-semibold text-sky-300 mb-1">
                        AI Engines
                      </p>
                      <p className="text-xs text-gray-300">
                        Google AI Overviews, Gemini, ChatGPT, Perplexity, Bing Copilot.
                      </p>
                    </div>
                    <div className="rounded-lg border border-slate-700/80 bg-slate-900/80 p-3">
                      <p className="text-sm font-semibold text-purple-300 mb-1">
                        Signals
                      </p>
                      <p className="text-xs text-gray-300">
                        Schema, entities, technical health, and AI surfacing behavior.
                      </p>
                    </div>
                    <div className="rounded-lg border border-slate-700/80 bg-slate-900/80 p-3">
                      <p className="text-sm font-semibold text-emerald-300 mb-1">
                        Measurement
                      </p>
                      <p className="text-xs text-gray-300">
                        GA4, BigQuery, and dashboards that connect visibility to pipeline.
                      </p>
                    </div>
                    <div className="rounded-lg border border-slate-700/80 bg-slate-900/80 p-3">
                      <p className="text-sm font-semibold text-gray-200 mb-1">
                        Outcome
                      </p>
                      <p className="text-xs text-gray-300">
                        A Search Intelligence layer your CMO and CFO can trust.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TIER OVERVIEW */}
        <section className="relative py-20 bg-black/70 border-t border-slate-900/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/80 border border-slate-700/80 rounded-full text-xs text-slate-300 mb-5 tracking-[0.18em] uppercase">
                <span>The Hendricks.AI System</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-semibold mb-3">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Three tiers. One Search Intelligence system.
                </span>
              </h2>
              <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
                Start where you are. Build a continuous AI visibility and measurement function
                that keeps your brand visible, understood, and selected across AI powered search
                engines.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Foundation */}
              <div className="rounded-2xl bg-slate-950/80 border border-slate-800/80 p-6 flex flex-col">
                <p className="text-xs font-medium text-blue-300 tracking-[0.18em] uppercase mb-2">
                  Tier One
                </p>
                <h3 className="text-xl font-semibold mb-1">Foundation</h3>
                <p className="text-sm text-blue-200 mb-3">
                  AI Visibility and Measurement
                </p>
                <p className="text-sm text-gray-300 mb-4">
                  Ongoing AI visibility monitoring and measurement health. Continuous insight
                  into how AI search engines see your brand, with clear actions for your team
                  every month.
                </p>
                <div className="mt-auto mb-4">
                  <p className="text-sm text-gray-200 font-semibold">
                    From $5,000/month
                  </p>
                  <p className="text-xs text-gray-500">
                    Minimum 3 months
                  </p>
                </div>
                <Link
                  href="/solutions/foundation"
                  className="inline-flex items-center justify-center rounded-lg border border-blue-400/50 text-sm font-semibold text-blue-100 px-4 py-2 hover:bg-blue-500/10 transition"
                >
                  Learn more →
                </Link>
              </div>

              {/* System */}
              <div className="rounded-2xl bg-slate-950 border border-purple-500/60 p-6 flex flex-col shadow-[0_0_32px_rgba(168,85,247,0.4)]">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-medium text-purple-300 tracking-[0.18em] uppercase">
                    Tier Two
                  </p>
                  <span className="text-xs px-2 py-1 rounded-full bg-purple-500 text-white font-semibold">
                    Popular
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-1">System</h3>
                <p className="text-sm text-purple-200 mb-3">
                  AI Search Intelligence System
                </p>
                <p className="text-sm text-gray-300 mb-4">
                  A full Search Intelligence layer across AI visibility, schema, entities, and
                  measurement. The operating system for AI search visibility in your marketing
                  and revenue engine.
                </p>
                <div className="mt-auto mb-4">
                  <p className="text-sm text-gray-200 font-semibold">
                    From $10,000/month
                  </p>
                  <p className="text-xs text-gray-500">
                    Minimum 3–6 months
                  </p>
                </div>
                <Link
                  href="/solutions/system"
                  className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-semibold text-white px-4 py-2 hover:shadow-lg hover:shadow-purple-500/40 transition"
                >
                  Learn more →
                </Link>
              </div>

              {/* Partnership */}
              <div className="rounded-2xl bg-slate-950/80 border border-slate-800/80 p-6 flex flex-col">
                <p className="text-xs font-medium text-cyan-300 tracking-[0.18em] uppercase mb-2">
                  Tier Three
                </p>
                <h3 className="text-xl font-semibold mb-1">Partnership</h3>
                <p className="text-sm text-cyan-200 mb-3">
                  Search Intelligence Engineering Partnership
                </p>
                <p className="text-sm text-gray-300 mb-4">
                  Your dedicated Search Intelligence Engineering function. Hendricks.AI owns
                  your AI search visibility program, signal integrity, and Search Intelligence
                  roadmap alongside your leadership team.
                </p>
                <div className="mt-auto mb-4">
                  <p className="text-sm text-gray-200 font-semibold">
                    From $20,000/month
                  </p>
                  <p className="text-xs text-gray-500">
                    Minimum 6–12 months
                  </p>
                </div>
                <Link
                  href="/solutions/partnership"
                  className="inline-flex items-center justify-center rounded-lg border border-cyan-400/50 text-sm font-semibold text-cyan-100 px-4 py-2 hover:bg-cyan-500/10 transition"
                >
                  Learn more →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT IS SEARCH INTELLIGENCE ENGINEERING */}
        <section className="relative py-16 bg-black/80 border-t border-slate-900/60">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-semibold mb-4">
              What is{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Search Intelligence Engineering
              </span>
              ?
            </h2>
            <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto">
              Search Intelligence Engineering is the discipline of designing and maintaining
              the visibility, signal, and measurement systems that govern how your brand
              appears and is evaluated across AI powered and traditional search engines.
              Instead of optimizing channels in isolation, it unifies AI Search Visibility,
              schema and entities, and measurement into one operating layer for B2B growth.
            </p>
          </div>
        </section>

        {/* UNIFIED SEARCH INTELLIGENCE SECTION */}
        <section className="relative py-20 bg-gradient-to-b from-black via-slate-950 to-black">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-slate-950/80 rounded-2xl p-8 border border-slate-800">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-700 rounded-full text-xs text-slate-300 mb-6 tracking-[0.18em] uppercase">
                <span>Search Intelligence Engineering</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                <span className="text-white">One Market. </span>
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Infinite Engines.
                </span>{" "}
                <span className="text-white">
                  Unified by Search Intelligence Engineering.
                </span>
              </h2>

              <p className="text-base md:text-lg text-gray-300 max-w-3xl mb-10">
                While competitors chase rankings and content volume, you engineer AI Search
                Visibility. Measure and improve how your brand appears across Google AI
                Overviews, Gemini, ChatGPT, Perplexity, and Bing Copilot as one continuous
                Search Intelligence system.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-black/70 rounded-xl p-5 border border-rose-500/30">
                  <p className="text-base font-semibold text-rose-300 mb-2">
                    Fragmented signals
                  </p>
                  <p className="text-sm text-gray-300">
                    Visibility loss when schema, entities, and AI search signals are not
                    engineered together.
                  </p>
                </div>
                <div className="bg-black/70 rounded-xl p-5 border border-amber-500/30">
                  <p className="text-base font-semibold text-amber-300 mb-2">
                    Disconnected analytics
                  </p>
                  <p className="text-sm text-gray-300">
                    Redundant and conflicting reporting when search and AI are measured in
                    separate systems.
                  </p>
                </div>
                <div className="bg-black/70 rounded-xl p-5 border border-emerald-500/30">
                  <p className="text-base font-semibold text-emerald-300 mb-2">
                    Search Intelligence gains
                  </p>
                  <p className="text-sm text-gray-300">
                    Clearer, more trusted ROI when AI visibility, technical signals, and
                    attribution live in one Search Intelligence layer.
                  </p>
                </div>
              </div>

              <p className="mt-8 text-xs text-gray-500">
                Built on Google Cloud • Powered by Vertex AI • Designed for the AI Search Era
              </p>
            </div>
          </div>
        </section>

        {/* FOUNDER STRIP */}
        <section className="py-16 bg-black/80 border-t border-slate-900/60">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <img
              src="/brandon-lincoln-hendricks.jpg"
              alt="Brandon Lincoln Hendricks"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="text-sm md:text-base text-gray-300">
              <p className="font-semibold text-white">
                Brandon Lincoln Hendricks
              </p>
              <p>Founder, Hendricks.AI · Search Intelligence Engineer</p>
              <p className="text-gray-400">
                Former Director of Search at SolarWinds · Former Global Search Director at
                Merkle &amp; Dentsu · 15+ years in B2B search and measurement
              </p>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-24 relative bg-gradient-to-br from-[#020617] via-[#0b1f32] to-[#1b0034] overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 left-0 w-64 h-64 bg-blue-600/25 rounded-full blur-3xl" />
            <div
              className="absolute bottom-10 right-0 w-80 h-80 bg-purple-600/25 rounded-full blur-3xl"
              style={{ animationDelay: "1s" }}
            />
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-6 leading-tight">
              <span className="text-white">
                Ready to Engineer AI Search Visibility{" "}
              </span>
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                for Your Team?
              </span>
            </h2>
            <p className="text-base md:text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
              Start with the Foundation tier for visibility and measurement clarity or move
              directly into the System or Partnership tiers to build a continuous Search
              Intelligence function for your organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/solutions"
                className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 text-sm md:text-base font-semibold text-white hover:scale-[1.02] transition-transform hover:shadow-[0_0_26px_rgba(96,165,250,0.6)]"
              >
                View Subscription Tiers →
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 rounded-full border border-cyan-400/40 text-sm md:text-base font-semibold text-gray-200 hover:border-cyan-400 hover:text-white transition"
              >
                Book Visibility Consultation →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx global>{`
        @keyframes gridMove {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(80px);
          }
        }
        @keyframes gradientShift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </div>
  );
}
