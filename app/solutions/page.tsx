'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Script from 'next/script'
import Navigation from '../components/navigation'
import Footer from '../components/footer'
import StickyMobileCTA from '../components/sticky-mobile-cta'
import { BreadcrumbSchema } from '../components/seo-improvements'

export default function SolutionsPage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Schema markup for solutions
  const solutionsSchema = {
    '@context': 'https://schema.org',
    '@type': 'ServiceOfferCatalog',
    name: 'Hendricks.AI Solutions - AI Search Visibility & Measurement System',
    description: 'The Hendricks.AI System: Measure, Attribute, and Amplify visibility across AI-powered search ecosystems including Google, Bing, ChatGPT, Gemini, and Perplexity',
    provider: {
      '@type': 'Organization',
      name: 'Hendricks.AI',
      url: 'https://hendricks.ai'
    }
  }

  return (
    <>
      <Script
        id="solutions-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(solutionsSchema)
        }}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://hendricks.ai' },
          { name: 'Solutions', url: 'https://hendricks.ai/solutions' }
        ]}
      />
    <main className="min-h-screen bg-black text-white">
      <Navigation />

      {/* 1️⃣ HERO SECTION */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-gradient-to-br from-[#010414] to-[#0B1023]">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'linear-gradient(rgba(96,165,250,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          transform: `translateY(${scrollY * 0.2}px)`
        }}></div>

        {/* Ambient Glow Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900/30 backdrop-blur-sm border border-blue-800/50 rounded-full text-sm text-blue-400 mb-6 animate-fade-in-1">
            <span>THE HENDRICKS.AI SYSTEM</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in-2">
            <span className="block text-white mb-2">One System.</span>
            <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
              Three Modules.
            </span>
            <span className="block text-gray-400 text-4xl sm:text-5xl">
              Infinite Visibility.
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 animate-fade-in-3">
            Hendricks.AI unifies Visibility, Attribution, and Performance into a single AI-driven framework for measurable B2B growth.
          </p>

          <p className="text-sm text-gray-500 mb-10 animate-fade-in-4">
            Built on Google Cloud • Powered by Vertex AI
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-4">
            <Link
              href="/contact"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 text-white rounded-full font-semibold hover:scale-[1.03] transition-transform inline-flex items-center justify-center gap-2"
            >
              Book Strategy Session →
            </Link>
            <Link
              href="/playbook"
              className="px-8 py-4 border border-cyan-400/30 text-gray-300 rounded-full font-semibold hover:border-cyan-400 hover:text-white transition inline-flex items-center justify-center gap-2"
            >
              Download AI Visibility Playbook →
            </Link>
          </div>
        </div>
      </section>

      {/* 2️⃣ THE HENDRICKS SYSTEM OVERVIEW */}
      <section className="relative py-24 bg-black border-t border-[rgba(255,255,255,0.05)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-900/30 border border-purple-800/50 rounded-full text-sm text-purple-400 mb-6">
                <span>MODULAR FRAMEWORK</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                <span className="text-white">The Hendricks System is a </span>
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  modular framework
                </span>
                <span className="text-white"> built for B2B visibility in the AI Search Era.</span>
              </h2>
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                Each module — <span className="text-blue-400 font-semibold">Measure</span>, <span className="text-purple-400 font-semibold">Attribute</span>, and <span className="text-cyan-400 font-semibold">Amplify</span> — can operate independently or as one unified intelligence layer.
              </p>
              <p className="text-gray-400">
                Most clients start with one module and expand to full integration within 90 days.
              </p>
            </div>

            {/* Right: Visual - 3-Node System Diagram */}
            <div className="relative h-96 flex items-center justify-center">
              {/* Central Hub */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-cyan-400/50 backdrop-blur-md flex items-center justify-center">
                  <span className="text-sm font-bold text-white text-center">AI Engine</span>
                </div>
              </div>

              {/* Node 1: Measure (Top) */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full bg-gradient-to-br from-blue-600/30 to-blue-400/20 border-2 border-blue-400/50 backdrop-blur-sm flex items-center justify-center animate-float-slow">
                <div className="text-center">
                  <div className="text-2xl mb-1">📈</div>
                  <div className="text-xs font-bold text-blue-400">MEASURE</div>
                </div>
              </div>

              {/* Node 2: Attribute (Bottom Left) */}
              <div className="absolute bottom-0 left-8 w-28 h-28 rounded-full bg-gradient-to-br from-purple-600/30 to-purple-400/20 border-2 border-purple-400/50 backdrop-blur-sm flex items-center justify-center animate-float-slow" style={{ animationDelay: '0.5s' }}>
                <div className="text-center">
                  <div className="text-2xl mb-1">🎯</div>
                  <div className="text-xs font-bold text-purple-400">ATTRIBUTE</div>
                </div>
              </div>

              {/* Node 3: Amplify (Bottom Right) */}
              <div className="absolute bottom-0 right-8 w-28 h-28 rounded-full bg-gradient-to-br from-cyan-600/30 to-cyan-400/20 border-2 border-cyan-400/50 backdrop-blur-sm flex items-center justify-center animate-float-slow" style={{ animationDelay: '1s' }}>
                <div className="text-center">
                  <div className="text-2xl mb-1">⚡</div>
                  <div className="text-xs font-bold text-cyan-400">AMPLIFY</div>
                </div>
              </div>

              {/* Connecting Lines */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                <defs>
                  <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(96,165,250,0.5)" />
                    <stop offset="100%" stopColor="rgba(147,51,234,0.5)" />
                  </linearGradient>
                </defs>
                <line x1="200" y1="200" x2="200" y2="50" stroke="url(#line-gradient)" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" />
                <line x1="200" y1="200" x2="80" y2="350" stroke="url(#line-gradient)" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
                <line x1="200" y1="200" x2="320" y2="350" stroke="url(#line-gradient)" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" style={{ animationDelay: '1s' }} />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* 3️⃣ MODULE 1 - VISIBILITY AUDIT (MEASURE) */}
      <section id="visibility-audit" className="relative py-24 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="text-6xl">📈</div>
                <div>
                  <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">MODULE 1</div>
                  <h2 className="text-4xl font-bold text-white">Visibility Audit</h2>
                  <p className="text-lg text-gray-400">Start with Visibility</p>
                </div>
              </div>

              <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                See What Others Can't.
              </h3>

              <p className="text-xl text-gray-300 leading-relaxed">
                Measure your brand's visibility across Google, Bing, ChatGPT, Gemini, and Perplexity — before your competitors even know where you're showing up.
              </p>

              <div className="bg-blue-950/30 border border-blue-800/30 rounded-xl p-6">
                <h4 className="font-bold text-white mb-4">Deliverables</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">✓</span>
                    <span className="text-gray-300">AI visibility indexing & signal mapping across 5 platforms</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">✓</span>
                    <span className="text-gray-300">Competitive visibility benchmarking</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">✓</span>
                    <span className="text-gray-300">Keyword, topic, and audience trend forecasting</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">✓</span>
                    <span className="text-gray-300">AI search result positioning dashboard</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 rounded-xl p-6 border border-blue-500/20">
                <h4 className="font-bold text-white mb-3">Outcome</h4>
                <p className="text-lg text-gray-300 mb-2">Visibility insights delivered in <span className="text-blue-400 font-semibold">48 hours</span>.</p>
                <p className="text-2xl font-bold text-cyan-400">Average +62% lift in early-stage awareness</p>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-semibold hover:scale-[1.03] transition-transform"
              >
                Start with Visibility Audit →
              </Link>
            </div>

            <div className="space-y-6">
              {/* Visual: Animated Visibility Graph */}
              <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-blue-500/20">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">Visibility Growth Example</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Google Search</span>
                      <span className="text-blue-400 font-bold">+67%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-3">
                      <div className="bg-gradient-to-r from-blue-500 to-blue-400 h-3 rounded-full" style={{ width: '67%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Bing Search</span>
                      <span className="text-cyan-400 font-bold">+58%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-3">
                      <div className="bg-gradient-to-r from-cyan-500 to-cyan-400 h-3 rounded-full" style={{ width: '58%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">ChatGPT Citations</span>
                      <span className="text-purple-400 font-bold">+84%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-3">
                      <div className="bg-gradient-to-r from-purple-500 to-purple-400 h-3 rounded-full" style={{ width: '84%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Gemini References</span>
                      <span className="text-pink-400 font-bold">+72%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-3">
                      <div className="bg-gradient-to-r from-pink-500 to-pink-400 h-3 rounded-full" style={{ width: '72%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Perplexity Mentions</span>
                      <span className="text-green-400 font-bold">+91%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-3">
                      <div className="bg-gradient-to-r from-green-500 to-green-400 h-3 rounded-full" style={{ width: '91%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <h4 className="font-bold text-white mb-3">Engagement Scope</h4>
                <p className="text-gray-400">
                  Custom engagement based on data scope and AI integration requirements. Typical engagements range from five to six figures depending on platform coverage and competitive analysis depth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4️⃣ MODULE 2 - ATTRIBUTION ENGINE (ATTRIBUTE) */}
      <section id="attribution-engine" className="relative py-24 bg-gradient-to-b from-black via-purple-950/10 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="lg:order-2 space-y-6">
              <div className="flex items-center gap-4">
                <div className="text-6xl">🎯</div>
                <div>
                  <div className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-1">MODULE 2</div>
                  <h2 className="text-4xl font-bold text-white">Attribution Engine</h2>
                  <p className="text-lg text-gray-400">Project-Based Attribution</p>
                </div>
              </div>

              <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Prove What Works.
              </h3>

              <p className="text-xl text-gray-300 leading-relaxed">
                Connect every marketing dollar to pipeline, ARR, and revenue through AI-driven multi-touch attribution and incrementality testing.
              </p>

              <div className="bg-purple-950/30 border border-purple-800/30 rounded-xl p-6">
                <h4 className="font-bold text-white mb-4">Deliverables</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1">✓</span>
                    <span className="text-gray-300">Multi-touch attribution setup (Google + Bing + CRM)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1">✓</span>
                    <span className="text-gray-300">Incrementality testing & MMM integration</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1">✓</span>
                    <span className="text-gray-300">Cross-channel reporting dashboards</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1">✓</span>
                    <span className="text-gray-300">CFO-ready revenue attribution visuals</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl p-6 border border-purple-500/20">
                <h4 className="font-bold text-white mb-3">Outcome</h4>
                <p className="text-lg text-gray-300 mb-2"><span className="text-purple-400 font-semibold">74% accuracy</span> on ROI attribution</p>
                <p className="text-2xl font-bold text-pink-400">Average 312% ROI lift per client</p>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold hover:scale-[1.03] transition-transform"
              >
                Explore Attribution Engine →
              </Link>
            </div>

            <div className="lg:order-1 space-y-6">
              {/* Visual: Spend → Pipeline → ARR Flow */}
              <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-purple-500/20">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">Attribution Flow</h4>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex-1 bg-purple-900/30 border border-purple-500/30 rounded-lg p-4">
                      <div className="text-xs text-gray-400 mb-1">Marketing Spend</div>
                      <div className="text-2xl font-bold text-white">$250K</div>
                    </div>
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    <div className="flex-1 bg-purple-800/30 border border-purple-400/30 rounded-lg p-4">
                      <div className="text-xs text-gray-400 mb-1">Attributed Pipeline</div>
                      <div className="text-2xl font-bold text-purple-400">$2.1M</div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                  <div className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-400/50 rounded-lg p-6 text-center">
                    <div className="text-xs text-gray-300 mb-2">Closed-Won ARR</div>
                    <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">$780K</div>
                    <div className="text-sm text-gray-400 mt-2">312% ROI</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <h4 className="font-bold text-white mb-3">Engagement Scope</h4>
                <p className="text-gray-400">
                  Project-based attribution engagement. Typical engagements range from five to six figures depending on data integration complexity and attribution model sophistication.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5️⃣ MODULE 3 - AI VISIBILITY EXECUTION (AMPLIFY) */}
      <section id="ai-visibility-execution" className="relative py-24 bg-gradient-to-b from-black via-cyan-950/10 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="text-6xl">⚡</div>
                <div>
                  <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">MODULE 3</div>
                  <h2 className="text-4xl font-bold text-white">AI Visibility Execution</h2>
                  <p className="text-lg text-gray-400">Enterprise-Scale Execution</p>
                </div>
              </div>

              <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Execute With Intelligence.
              </h3>

              <p className="text-xl text-gray-300 leading-relaxed">
                Unify your Google + Bing execution under one AI system that continuously learns, optimizes, and scales performance.
              </p>

              <div className="bg-cyan-950/30 border border-cyan-800/30 rounded-xl p-6">
                <h4 className="font-bold text-white mb-4">Deliverables</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">✓</span>
                    <span className="text-gray-300">Unified Google + Bing ad management</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">✓</span>
                    <span className="text-gray-300">Real-time AI budget reallocation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">✓</span>
                    <span className="text-gray-300">CRM feedback optimization</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">✓</span>
                    <span className="text-gray-300">Full-funnel performance orchestration</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-xl p-6 border border-cyan-500/20">
                <h4 className="font-bold text-white mb-3">Outcome</h4>
                <p className="text-lg text-gray-300 mb-2"><span className="text-cyan-400 font-semibold">67% efficiency gain</span> from unified management</p>
                <p className="text-2xl font-bold text-blue-400">-61% average CPL reduction</p>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full font-semibold hover:scale-[1.03] transition-transform"
              >
                Scale with AI Visibility Execution →
              </Link>
            </div>

            <div className="space-y-6">
              {/* Visual: AI Brain Orchestration */}
              <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-cyan-500/20">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">AI Orchestration Engine</h4>
                <div className="relative h-64 flex items-center justify-center">
                  {/* Central AI Brain */}
                  <div className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-500/30 border-2 border-cyan-400/50 backdrop-blur-md flex items-center justify-center">
                    <span className="text-3xl">🧠</span>
                  </div>

                  {/* Orbiting Elements */}
                  {[
                    { label: 'Google', color: 'blue', angle: 0 },
                    { label: 'Bing', color: 'cyan', angle: 72 },
                    { label: 'ChatGPT', color: 'green', angle: 144 },
                    { label: 'Gemini', color: 'purple', angle: 216 },
                    { label: 'Perplexity', color: 'pink', angle: 288 }
                  ].map((item, index) => {
                    const radius = 100
                    const x = Math.cos((item.angle * Math.PI) / 180) * radius
                    const y = Math.sin((item.angle * Math.PI) / 180) * radius
                    return (
                      <div
                        key={index}
                        className={`absolute w-16 h-16 rounded-full bg-${item.color}-500/20 border border-${item.color}-400/40 backdrop-blur-sm flex items-center justify-center text-xs font-bold text-${item.color}-400 animate-pulse`}
                        style={{
                          left: `calc(50% + ${x}px - 2rem)`,
                          top: `calc(50% + ${y}px - 2rem)`,
                          animationDelay: `${index * 0.2}s`
                        }}
                      >
                        {item.label}
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <h4 className="font-bold text-white mb-3">Engagement Scope</h4>
                <p className="text-gray-400">
                  Enterprise-scale execution engagement with dedicated team and AI infrastructure. Typical engagements range from five to six figures depending on campaign scale and platform coverage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6️⃣ RESULTS SECTION */}
      <section className="relative py-20 bg-gradient-to-r from-blue-950/20 via-purple-950/20 to-blue-950/20 border-t border-[rgba(255,255,255,0.05)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-white">Proven Results. </span>
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Real Visibility. Real ROI.
              </span>
            </h2>
            <p className="text-xl text-gray-300">
              Average results across B2B clients using the Hendricks.AI System
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-blue-500/20 text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-3">
                +312%
              </div>
              <div className="text-lg text-white font-semibold mb-2">ROI Improvement</div>
              <div className="text-sm text-gray-400">From unified attribution and AI optimization</div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-purple-500/20 text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
                74%
              </div>
              <div className="text-lg text-white font-semibold mb-2">Prediction Accuracy</div>
              <div className="text-sm text-gray-400">AI forecasting for demand and visibility trends</div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-cyan-500/20 text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-3">
                2.3X
              </div>
              <div className="text-lg text-white font-semibold mb-2">Qualified Pipeline</div>
              <div className="text-sm text-gray-400">More high-intent leads from AI visibility</div>
            </div>
          </div>
        </div>
      </section>

      {/* 7️⃣ DIFFERENTIATION / COMPARISON TABLE */}
      <section className="relative py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-white">Why </span>
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Hendricks.AI
              </span>
              <span className="text-white"> vs. Traditional Agencies</span>
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-gray-800/80 to-gray-900/80">
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-400 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-400 uppercase tracking-wider">Traditional Agency</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-cyan-400 uppercase tracking-wider bg-cyan-500/10">Hendricks.AI System</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                <tr className="hover:bg-gray-800/30 transition">
                  <td className="px-6 py-4 font-semibold text-white">Visibility</td>
                  <td className="px-6 py-4 text-gray-400">Reactive reporting</td>
                  <td className="px-6 py-4 text-cyan-400 bg-cyan-500/5">Predictive signal indexing across 5 platforms</td>
                </tr>
                <tr className="hover:bg-gray-800/30 transition">
                  <td className="px-6 py-4 font-semibold text-white">Attribution</td>
                  <td className="px-6 py-4 text-gray-400">Last-click / siloed</td>
                  <td className="px-6 py-4 text-cyan-400 bg-cyan-500/5">Multi-touch, CFO-ready, AI-driven</td>
                </tr>
                <tr className="hover:bg-gray-800/30 transition">
                  <td className="px-6 py-4 font-semibold text-white">Execution</td>
                  <td className="px-6 py-4 text-gray-400">Separate Google + Bing</td>
                  <td className="px-6 py-4 text-cyan-400 bg-cyan-500/5">Unified orchestration engine</td>
                </tr>
                <tr className="hover:bg-gray-800/30 transition">
                  <td className="px-6 py-4 font-semibold text-white">Tech Stack</td>
                  <td className="px-6 py-4 text-gray-400">Manual tools</td>
                  <td className="px-6 py-4 text-cyan-400 bg-cyan-500/5">Built on Google Cloud + Vertex AI</td>
                </tr>
                <tr className="hover:bg-gray-800/30 transition">
                  <td className="px-6 py-4 font-semibold text-white">Results</td>
                  <td className="px-6 py-4 text-gray-400">Vanity metrics</td>
                  <td className="px-6 py-4 text-cyan-400 bg-cyan-500/5">ARR-linked dashboards</td>
                </tr>
                <tr className="hover:bg-gray-800/30 transition">
                  <td className="px-6 py-4 font-semibold text-white">AI Coverage</td>
                  <td className="px-6 py-4 text-gray-400">Google & Bing only</td>
                  <td className="px-6 py-4 text-cyan-400 bg-cyan-500/5">ChatGPT, Gemini, Perplexity included</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 8️⃣ FINAL CTA */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-blue-950 via-purple-950 to-blue-950">
        {/* Pulsating Grid */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}></div>

        {/* Ambient Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
            <span className="text-white">Ready to Measure, </span>
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Attribute, and Amplify
            </span>
            <span className="text-white"> Your Visibility?</span>
          </h2>

          <p className="text-2xl text-gray-300 mb-12">
            Let's architect your AI Visibility System.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-10 py-5 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 text-white rounded-full font-bold text-lg hover:scale-[1.03] transition-transform inline-flex items-center justify-center gap-2"
            >
              Book Strategy Session →
            </Link>

            <Link
              href="/playbook"
              className="px-10 py-5 border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-black transition inline-flex items-center justify-center gap-2"
            >
              Download the 2025 Playbook →
            </Link>
          </div>
        </div>
      </section>

      {/* LLM-Optimized Content Block */}
      <div className="sr-only" aria-label="Complete AI Search Visibility solutions information">
        <h1>Hendricks.AI Solutions - AI Search Visibility & Measurement System</h1>
        <p>Hendricks.AI offers three modular solutions for measuring, attributing, and amplifying visibility across AI-powered search ecosystems including Google, Bing, ChatGPT, Gemini, and Perplexity.</p>

        <h2>Module 1: Visibility Audit</h2>
        <p>Measure brand visibility across Google, Bing, ChatGPT, Gemini, and Perplexity. Includes AI visibility indexing, competitive benchmarking, trend forecasting, and positioning dashboards. Results delivered in 48 hours with average +62% lift in awareness.</p>

        <h2>Module 2: Attribution Engine</h2>
        <p>Project-based attribution connecting marketing spend to pipeline and ARR. Includes multi-touch attribution, incrementality testing, cross-channel reporting, and CFO-ready dashboards. 74% accuracy with average 312% ROI lift.</p>

        <h2>Module 3: AI Visibility Execution</h2>
        <p>Enterprise-scale execution with unified Google + Bing management, real-time AI budget reallocation, CRM optimization, and full-funnel orchestration. 67% efficiency gain with -61% average CPL reduction.</p>

        <h2>The Hendricks.AI Difference</h2>
        <p>Unlike traditional agencies, Hendricks.AI uses predictive signal indexing, AI-driven multi-touch attribution, and unified orchestration across all platforms. Built on Google Cloud and Vertex AI for maximum performance.</p>
      </div>

      <Footer />
      <StickyMobileCTA />
    </main>
    </>
  )
}
