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

      {/* AI Grid Background with Dynamic Gradient */}
      <div className="fixed inset-0 z-0">
        {/* Dynamic AI gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-70"></div>

        {/* Animated grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(96, 165, 250, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(96, 165, 250, 0.15) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            animation: "gridMove 30s linear infinite",
          }}
        ></div>

        {/* Radial grid with glow */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
          `,
            backgroundSize: "60px 60px, 120px 120px",
            backgroundPosition: "0 0, 30px 30px",
          }}
        ></div>
      </div>

      {/* AI Particle Network */}
      <div className="fixed inset-0 overflow-hidden opacity-40 z-0">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g filter="url(#glow)">
            {mounted &&
              [...Array(25)].map((_, i) => (
                <circle
                  key={i}
                  cx={Math.random() * 1000}
                  cy={Math.random() * 1000}
                  r="3"
                  fill={
                    i % 2 === 0
                      ? "rgba(96, 165, 250, 0.8)"
                      : "rgba(139, 92, 246, 0.6)"
                  }
                  className="animate-pulse"
                  style={{
                    animationDelay: `${i * 0.15}s`,
                    animationDuration: "3s",
                  }}
                />
              ))}
          </g>
        </svg>
      </div>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Content */}
            <div>
              {/* Category Badge */}
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-blue-950/50 backdrop-blur-xl border border-blue-800/50 rounded-full mb-8 animate-fade-in-1">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-blue-400">
                    SEARCH INTELLIGENCE ENGINEERING
                  </span>
                </div>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-[1.1] tracking-tight animate-fade-in-2">
                <span className="block text-white">See What AI Sees.</span>
                <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                  Engineer Visibility the Competition Can&apos;t.
                </span>
              </h1>

              {/* Tagline */}
              <div className="mb-8 animate-fade-in-3">
                <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                  AI Search Visibility and Measurement for B2B companies across Google AI
                  Overviews, Gemini, ChatGPT, Perplexity, and Bing Copilot.
                </p>
              </div>

              {/* Quick Answer Box */}
              <div className="bg-blue-950/30 backdrop-blur-xl border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg animate-fade-in-4">
                <p className="text-gray-300">
                  <strong className="text-white">Quick answer.</strong> Hendricks.AI is a
                  Search Intelligence Engineering Firm specializing in AI Search Visibility
                  and Measurement for B2B. We engineer the signals, schema, entities, and
                  measurement systems that determine how your brand appears in AI search and
                  how that visibility turns into pipeline.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mt-6 animate-scale-in">
                <Link
                  href="/solutions"
                  className="bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 text-white px-8 py-4 rounded-full font-semibold hover:scale-[1.03] transition-transform inline-flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(120,180,255,0.5)]"
                >
                  Start Your AI Visibility System →
                </Link>
                <Link
                  href="/contact"
                  className="border border-cyan-400/30 text-gray-300 px-8 py-4 rounded-full font-semibold hover:border-cyan-400 hover:text-white transition inline-flex items-center justify-center gap-2"
                >
                  Book Visibility Consultation →
                </Link>
              </div>

              {/* Guide link */}
              <p className="mt-4 text-xs text-gray-400 animate-fade-in-4">
                Or{" "}
                <Link
                  href="/insights/ai-search-visibility-guide"
                  className="text-cyan-300 hover:text-cyan-200 underline underline-offset-2"
                >
                  download the 2025 AI Search Visibility Guide
                </Link>
                .
              </p>
            </div>

            {/* Right Column: AI Intelligence Node */}
            <div className="relative lg:block hidden">
              <div className="relative w-full h-96 flex items-center justify-center">
                {/* Ambient glow orbs */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-600/30 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
                <div
                  className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-600/30 to-violet-400/20 rounded-full blur-3xl animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>

                {/* Central AI Intelligence Node */}
                <div
                  className="relative rounded-2xl p-8 backdrop-blur-2xl border transition-all duration-700 hover:scale-[1.03] animate-float-slow"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 0%, rgba(80,80,255,0.25), rgba(0,0,40,0.9))",
                    borderColor: "rgba(140,140,255,0.2)",
                    boxShadow:
                      "0 0 16px rgba(120,120,255,0.2), 0 0 32px rgba(120,120,255,0.1)",
                  }}
                >
                  <div className="text-center max-w-sm">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium text-cyan-300 tracking-wider">
                        UNIFIED SEARCH INTELLIGENCE
                      </span>
                    </div>

                    <h3 className="text-white font-bold text-2xl mb-2">
                      One Market.
                    </h3>
                    <p className="text-gray-300 text-base mb-4">
                      Infinite Engines. Unified by AI.
                    </p>

                    <div className="space-y-3">
                      <div className="bg-gradient-to-r from-sky-400/20 to-indigo-400/20 rounded-lg px-4 py-2 border border-sky-400/30">
                        <p className="text-sm font-semibold bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
                          Google • Bing
                        </p>
                        <p className="text-[11px] text-gray-300 mt-1">
                          Core search surfaces
                        </p>
                      </div>
                      <div className="bg-gradient-to-r from-violet-400/20 to-purple-400/20 rounded-lg px-4 py-2 border border-violet-400/30">
                        <p className="text-sm font-semibold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                          ChatGPT • Gemini • Perplexity
                        </p>
                        <p className="text-[11px] text-gray-300 mt-1">
                          AI search and assistant layer
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-2xl font-bold text-cyan-400">
                          5 Engines
                        </div>
                        <div className="text-xs text-gray-400">
                          AI search coverage
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-400">
                          1 System
                        </div>
                        <div className="text-xs text-gray-400">
                          Search Intelligence layer
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating particles */}
                {mounted &&
                  [...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1.5 h-1.5 bg-cyan-400/60 rounded-full animate-particle"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                      }}
                    ></div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TIER OVERVIEW SECTION */}
      <section className="relative py-24 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900/30 border border-blue-800/50 rounded-full text-sm text-blue-400 mb-6">
              <span>THE HENDRICKS.AI SYSTEM</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Three tiers. One Search Intelligence system.
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Start where you are. Build a continuous AI visibility and measurement function
              that keeps your brand visible, understood, and selected across AI powered search
              engines.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Foundation */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-gradient-to-b from-gray-900 to-black p-8 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-all duration-500 transform hover:-translate-y-2">
                <div className="text-5xl mb-4 flex justify-center">📊</div>
                <h3 className="text-2xl font-bold mb-2 text-center">Foundation</h3>
                <p className="text-sm text-blue-400 mb-4 text-center font-medium">
                  AI Visibility and Measurement
                </p>
                <p className="text-sm text-gray-400 mb-6 text-center">
                  Ongoing AI visibility monitoring and measurement health. Continuous insight
                  into how AI search engines see your brand, with clear actions for your team
                  every month.
                </p>

                <div className="mb-6">
                  <p className="text-sm text-gray-300 text-center font-semibold">
                    From $5,000/month
                  </p>
                  <p className="text-xs text-gray-500 text-center">
                    Minimum 3 months
                  </p>
                </div>

                <Link
                  href="/solutions/foundation"
                  className="block text-center py-3 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 bg-opacity-10 text-white font-medium hover:bg-opacity-20 transition-all duration-300"
                >
                  Learn More →
                </Link>
              </div>
            </div>

            {/* System - Highlighted */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-300"></div>
              <div className="relative bg-gradient-to-b from-gray-900 to-black p-8 rounded-2xl border-2 border-purple-500/50 hover:border-purple-400 transition-all duration-500 transform hover:-translate-y-2 shadow-[0_0_40px_rgba(168,85,247,0.4)]">
                <div className="absolute top-4 right-4">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                    POPULAR
                  </span>
                </div>
                <div className="text-5xl mb-4 flex justify-center">🔧</div>
                <h3 className="text-2xl font-bold mb-2 text-center">System</h3>
                <p className="text-sm text-purple-400 mb-4 text-center font-medium">
                  AI Search Intelligence System
                </p>
                <p className="text-sm text-gray-400 mb-6 text-center">
                  A full Search Intelligence layer across AI visibility, schema, entities, and
                  measurement. The operating system for AI search visibility in your marketing
                  and revenue engine.
                </p>

                <div className="mb-6">
                  <p className="text-sm text-gray-300 text-center font-semibold">
                    From $10,000/month
                  </p>
                  <p className="text-xs text-gray-500 text-center">
                    Minimum 3–6 months
                  </p>
                </div>

                <Link
                  href="/solutions/system"
                  className="block text-center py-3 px-4 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
                >
                  Learn More →
                </Link>
              </div>
            </div>

            {/* Partnership */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-gradient-to-b from-gray-900 to-black p-8 rounded-2xl border border-gray-800 hover:border-cyan-500/50 transition-all duration-500 transform hover:-translate-y-2">
                <div className="text-5xl mb-4 flex justify-center">🤝</div>
                <h3 className="text-2xl font-bold mb-2 text-center">Partnership</h3>
                <p className="text-sm text-cyan-400 mb-4 text-center font-medium">
                  Search Intelligence Engineering Partnership
                </p>
                <p className="text-sm text-gray-400 mb-6 text-center">
                  Your dedicated Search Intelligence Engineering function. Hendricks.AI owns
                  your AI search visibility program, signal integrity, and Search Intelligence
                  roadmap alongside your leadership team.
                </p>

                <div className="mb-6">
                  <p className="text-sm text-gray-300 text-center font-semibold">
                    From $20,000/month
                  </p>
                  <p className="text-xs text-gray-500 text-center">
                    Minimum 6–12 months
                  </p>
                </div>

                <Link
                  href="/solutions/partnership"
                  className="block text-center py-3 px-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 bg-opacity-10 text-white font-medium hover:bg-opacity-20 transition-all duration-300"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IS SEARCH INTELLIGENCE ENGINEERING */}
      <section className="relative bg-black/60 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            What is{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Search Intelligence Engineering
            </span>
            ?
          </h2>
          <p className="text-sm md:text-base text-gray-300 max-w-3xl mx-auto">
            Search Intelligence Engineering is the discipline of designing and maintaining the
            visibility, signal, and measurement systems that govern how your brand appears and
            is evaluated across AI powered and traditional search engines. Instead of optimizing
            channels in isolation, it unifies AI Search Visibility, schema and entities, and
            measurement into one operating layer for B2B growth.
          </p>
        </div>
      </section>

      {/* UNIFIED SEARCH INTELLIGENCE SECTION */}
      <section className="relative py-24 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-950/50 via-purple-950/50 to-blue-950/50 rounded-2xl p-8 border border-gray-800 backdrop-blur-sm">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-950/50 backdrop-blur-sm border border-cyan-800/50 rounded-full text-sm text-cyan-400 mb-6">
              <span>SEARCH INTELLIGENCE ENGINEERING</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-white">One Market. </span>
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Infinite Engines.
              </span>{" "}
              <span className="text-white">Unified by Search Intelligence Engineering.</span>
            </h2>

            <p className="text-lg text-gray-300 max-w-3xl mb-8">
              While competitors chase rankings and content volume, you engineer AI Search
              Visibility. Measure and improve how your brand appears across Google AI Overviews,
              Gemini, ChatGPT, Perplexity, and Bing Copilot as one continuous Search Intelligence
              system.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-black/50 rounded-lg p-6 border border-rose-500/20">
                <div className="text-3xl font-bold text-rose-400 mb-2">
                  Fragmented signals
                </div>
                <div className="text-gray-400">
                  Visibility loss when schema, entities, and AI search signals are not
                  engineered together.
                </div>
              </div>
              <div className="bg-black/50 rounded-lg p-6 border border-amber-500/20">
                <div className="text-3xl font-bold text-amber-300 mb-2">
                  Disconnected analytics
                </div>
                <div className="text-gray-400">
                  Redundant and conflicting reporting when search and AI are measured in
                  separate systems.
                </div>
              </div>
              <div className="bg-black/50 rounded-lg p-6 border border-emerald-500/20">
                <div className="text-3xl font-bold text-emerald-400 mb-2">
                  Search Intelligence gains
                </div>
                <div className="text-gray-400">
                  Clearer, more trusted ROI when AI visibility, technical signals, and
                  attribution live in one Search Intelligence layer.
                </div>
              </div>
            </div>

            <p className="mt-8 text-sm text-gray-500 text-center">
              Built on Google Cloud • Powered by Vertex AI • Designed for the AI Search Era
            </p>
          </div>
        </div>
      </section>

      {/* FOUNDER SPOTLIGHT */}
      <section className="py-12 bg-black/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-sm font-bold">
            BL
          </div>
          <div className="text-xs md:text-sm text-gray-300">
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

      {/* FINAL CTA SECTION */}
      <section className="py-32 relative overflow-hidden bg-gradient-to-br from-[#020617] via-[#0b1f32] to-[#1b0034]">
        {/* Ambient Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
            <span className="text-white">
              Ready to Engineer AI Search Visibility{" "}
            </span>
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              for Your Team?
            </span>
          </h2>

          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Start with the Foundation tier for visibility and measurement clarity or move
            directly into the System or Partnership tiers to build a continuous Search
            Intelligence function for your organization.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/solutions"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 text-white rounded-full font-semibold hover:scale-[1.03] transition-transform inline-flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(120,180,255,0.6)]"
            >
              View Subscription Tiers →
            </Link>

            <Link
              href="/contact"
              className="px-8 py-4 border border-cyan-400/30 text-gray-300 rounded-full font-semibold hover:border-cyan-400 hover:text-white transition inline-flex items-center justify-center gap-2"
            >
              Book Visibility Consultation →
            </Link>
          </div>
        </div>
      </section>

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

        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes particle {
          0%,
          100% {
            transform: translate(0, 0);
            opacity: 0;
          }
          10%,
          90% {
            opacity: 1;
          }
          50% {
            transform: translate(var(--tx, 20px), var(--ty, 20px));
          }
        }

        @keyframes fade-in-1 {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-2 {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-3 {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-4 {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-fade-in-1 {
          animation: fade-in-1 0.6s ease-out forwards;
        }

        .animate-fade-in-2 {
          animation: fade-in-2 0.6s ease-out 0.1s forwards;
          opacity: 0;
        }

        .animate-fade-in-3 {
          animation: fade-in-3 0.6s ease-out 0.2s forwards;
          opacity: 0;
        }

        .animate-fade-in-4 {
          animation: fade-in-4 0.6s ease-out 0.3s forwards;
          opacity: 0;
        }

        .animate-scale-in {
          animation: scale-in 0.6s ease-out 0.4s forwards;
          opacity: 0;
        }

        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }

        .animate-particle {
          animation: particle var(--duration, 10s) ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}
