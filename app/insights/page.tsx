'use client'

import Link from 'next/link'
import { useState } from 'react'
import Navigation from '../components/navigation'
import Footer from '../components/footer'
import StickyMobileCTA from '../components/sticky-mobile-cta'

// Featured Intelligence - Top Editorial Content
const featuredIntelligence = [
  {
    id: 'what-is-search-intelligence-engineer',
    title: 'What is a Search Intelligence Engineer?',
    subtitle: 'The pioneering role combining search marketing, data science, and AI engineering.',
    author: 'Brandon Lincoln Hendricks',
    date: '2025-10-25',
    readTime: '12 min read',
    category: 'Search Intelligence',
    gradient: 'from-blue-600 to-cyan-600'
  },
  {
    id: 'what-is-unified-search-execution',
    title: 'What is Unified Search Execution?',
    subtitle: 'Orchestrating Google, Bing, and AI search in one integrated strategy.',
    author: 'Brandon Lincoln Hendricks',
    date: '2025-10-26',
    readTime: '10 min read',
    category: 'Attribution',
    gradient: 'from-purple-600 to-pink-600'
  },
  {
    id: 'what-is-visibility-audit',
    title: 'What is a Visibility Audit?',
    subtitle: 'Comprehensive visibility measurement across Google, Bing, ChatGPT, Gemini, and Perplexity.',
    author: 'Brandon Lincoln Hendricks',
    date: '2025-10-26',
    readTime: '15 min read',
    category: 'Measurement',
    gradient: 'from-cyan-600 to-blue-600'
  }
]

// Research & Measurement Highlights
const researchHighlights = [
  {
    title: 'The 2025 Visibility Benchmark Report',
    takeaway: 'Visibility correlates to a 2.3x lift in qualified pipeline',
    stat: '2.3X',
    color: 'blue'
  },
  {
    title: 'Cross-Engine Attribution Study (Google vs Bing)',
    takeaway: 'Unified attribution improves ROI accuracy by 67%',
    stat: '+67%',
    color: 'purple'
  },
  {
    title: 'AI Search Ecosystem Index 2025',
    takeaway: 'Only 18% of B2B brands measure AI search exposure effectively',
    stat: '18%',
    color: 'cyan'
  },
  {
    title: 'CFO-Ready Attribution Framework',
    takeaway: '98% data match confidence in CRM-linked attribution',
    stat: '98%',
    color: 'green'
  }
]

// All insights data
const allInsights = [
  {
    id: 'what-is-search-intelligence-engineer',
    title: 'What is a Search Intelligence Engineer?',
    excerpt: 'A Search Intelligence Engineer combines search marketing expertise with AI/ML engineering to build systems that measure, attribute, and optimize visibility across traditional and AI-powered search engines.',
    author: 'Brandon Lincoln Hendricks',
    date: '2025-10-25',
    readTime: '12 min read',
    category: 'Search Intelligence'
  },
  {
    id: 'how-to-measure-chatgpt-visibility',
    title: 'How to Measure Your Visibility in ChatGPT',
    excerpt: 'Learn how to measure your brand visibility in ChatGPT and track when your company appears in AI-powered search responses.',
    author: 'Brandon Lincoln Hendricks',
    date: '2025-10-25',
    readTime: '14 min read',
    category: 'AI Search Measurement'
  },
  {
    id: 'what-is-ai-search-visibility-measurement',
    title: 'What is AI Search Visibility Measurement?',
    excerpt: 'AI search visibility measurement tracks where and how often your brand appears across AI-powered search engines like ChatGPT, Gemini, Perplexity, and traditional search like Google and Bing.',
    author: 'Brandon Lincoln Hendricks',
    date: '2025-10-25',
    readTime: '11 min read',
    category: 'Measurement'
  },
  {
    id: 'how-to-appear-in-google-ai-overviews',
    title: 'How to Appear in Google AI Overviews',
    excerpt: 'Learn proven strategies to make your brand appear in Google AI Overviews through structured data, content optimization, E-E-A-T signals, and technical SEO.',
    author: 'Brandon Lincoln Hendricks',
    date: '2025-10-25',
    readTime: '13 min read',
    category: 'AI Search Optimization'
  },
  {
    id: 'search-agency-vs-search-intelligence-firm',
    title: 'Search Agency vs Search Intelligence Firm: What\'s the Difference?',
    excerpt: 'Traditional search agencies optimize campaigns. Search intelligence firms build measurement systems that prove ROI across the entire AI search ecosystem.',
    author: 'Brandon Lincoln Hendricks',
    date: '2025-10-25',
    readTime: '10 min read',
    category: 'Industry Comparison'
  },
  {
    id: 'google-ai-revolution-search-marketing',
    title: 'Google\'s AI Revolution: Game-Changing Updates for Search Marketing',
    excerpt: 'September 2025 marks a watershed moment as Google unleashes its most comprehensive AI transformation yet.',
    author: 'Brandon Lincoln Hendricks',
    date: '2025-09-14',
    readTime: '8 min read',
    category: 'AI & Analytics'
  },
  {
    id: 'death-of-keywords-ai-max-search',
    title: 'The Death of Keywords: How AI Max for Search is Revolutionizing B2B SaaS Campaigns',
    excerpt: 'While competitors bid on outdated keywords, sophisticated marketers are capturing 27% more conversions with AI Max.',
    author: 'Brandon Lincoln Hendricks',
    date: '2025-09-17',
    readTime: '15 min read',
    category: 'AI & Analytics'
  },
  {
    id: 'b2b-marketing-funnel-is-dead',
    title: 'The B2B Marketing Funnel is Dead: Why 80% of Buying Happens in Chaos',
    excerpt: 'The traditional B2B marketing funnel is obsolete. Modern buyers use 10+ channels with 6-10 stakeholders.',
    author: 'Brandon Lincoln Hendricks',
    date: '2025-08-20',
    readTime: '12 min read',
    category: 'Measurement'
  },
  {
    id: 'google-meridian-mmm-attribution',
    title: 'Google Meridian MMM Meets AI Attribution: The Future of Marketing Measurement',
    excerpt: 'How Hendricks.AI\'s measurement capabilities enhance Google\'s new Meridian MMM framework.',
    author: 'Brandon Lincoln Hendricks',
    date: '2025-08-19',
    readTime: '6 min read',
    category: 'Attribution'
  },
  {
    id: 'ai-marketing-beyond-smart-bidding',
    title: 'AI Marketing Beyond Smart Bidding: How Custom AI Models Reduce CPA by 32%',
    excerpt: 'Google\'s Smart Bidding is just the beginning. Learn how proprietary AI models can achieve 32% CPA reductions.',
    author: 'Brandon Lincoln Hendricks',
    date: '2025-08-16',
    readTime: '12 min read',
    category: 'AI & Analytics'
  },
  {
    id: 'unified-visibility-measurement-2025',
    title: 'The Future of Measurement: Unified Visibility Across AI Search',
    excerpt: 'Traditional measurement reacts to yesterday\'s data. Unified visibility shows the complete picture.',
    author: 'Brandon Lincoln Hendricks',
    date: '2025-08-14',
    readTime: '12 min read',
    category: 'Visibility'
  },
  {
    id: 'google-performance-max-bing',
    title: 'Why Running Both Google and Bing Performance Max Delivers 10% Higher ROAS',
    excerpt: 'Most agencies ignore Bing Performance Max. Our data shows dual-platform strategies capture 28% more conversions.',
    author: 'Brandon Lincoln Hendricks',
    date: '2025-08-12',
    readTime: '5 min read',
    category: 'Measurement'
  },
  {
    id: 'visibility-measurement-case-study',
    title: 'Case Study: How We Measured a 127% Visibility Surge in "AI Automation"',
    excerpt: 'Real-time visibility measurement identified early signals. Here\'s how we positioned our client for $2.3M in additional revenue.',
    author: 'Brandon Lincoln Hendricks',
    date: '2025-08-10',
    readTime: '10 min read',
    category: 'Case Studies'
  },
  {
    id: 'b2b-visibility-strategies',
    title: 'B2B Visibility: Measuring Decision Maker Exposure Across All Platforms',
    excerpt: 'The average B2B buyer is 57% through their journey before contacting sales. How to measure their visibility.',
    author: 'Brandon Lincoln Hendricks',
    date: '2025-08-08',
    readTime: '6 min read',
    category: 'Visibility'
  },
  {
    id: 'attribution-architecture-framework',
    title: 'Attribution Architecture: How CFO-Ready Models Connect Spend to ARR',
    excerpt: 'Stop arguing about last-click vs first-touch. Our AI-driven attribution shows true impact with 98% data confidence.',
    author: 'Brandon Lincoln Hendricks',
    date: '2025-08-03',
    readTime: '9 min read',
    category: 'Attribution'
  }
]

const categories = ['All', 'Search Intelligence', 'AI Search Measurement', 'Visibility', 'Attribution', 'Measurement', 'Case Studies', 'AI & Analytics']

export default function InsightsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredInsights = selectedCategory === 'All'
    ? allInsights
    : allInsights.filter(post => post.category === selectedCategory)

  return (
    <main className="min-h-screen bg-black text-white">
      <Navigation />

      {/* 1️⃣ HERO SECTION - Intelligence Hub */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-[#010414] via-[#0b1f32] to-[#1b0034]">
        {/* Animated Grid Overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(96,165,250,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.4) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}></div>

        {/* Particle Layer */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Search Visibility. Attribution. Intelligence.
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto mb-10">
              The Hendricks.AI Intelligence Hub — where B2B growth leaders explore the systems, data, and frameworks defining the new era of measurable marketing.
            </p>

            {/* Dual CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 text-white rounded-full font-semibold hover:scale-[1.03] transition-transform inline-flex items-center justify-center gap-2">
                Explore Insights →
              </button>
              <Link
                href="#subscribe"
                className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-black transition inline-flex items-center justify-center gap-2"
              >
                Subscribe to The Intelligence Brief →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2️⃣ CATEGORY FILTERS */}
      <section className="py-8 border-b border-[rgba(255,255,255,0.05)] bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white'
                    : 'bg-[rgba(255,255,255,0.05)] text-gray-300 hover:text-white hover:bg-[rgba(255,255,255,0.08)]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3️⃣ FEATURED INTELLIGENCE */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Featured Intelligence
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredIntelligence.map((article, index) => (
              <Link
                key={article.id}
                href={`/insights/${article.id}`}
                className="group"
              >
                <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-[rgba(255,255,255,0.05)] hover:border-cyan-400/50 transition-all duration-300 hover:scale-[1.02] h-full">
                  {/* Abstract Tech Imagery Placeholder */}
                  <div className={`w-full h-48 rounded-xl bg-gradient-to-br ${article.gradient} opacity-20 mb-6 relative overflow-hidden`}>
                    <div className="absolute inset-0" style={{
                      backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(-45deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                    }}></div>
                  </div>

                  <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3">
                    {article.category}
                  </div>

                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {article.subtitle}
                  </p>

                  <div className="flex items-center text-sm text-gray-500">
                    <span className="text-gray-400">{article.author}</span>
                    <span className="mx-2">•</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4️⃣ COLLECTIONS GRID - Explore Our Frameworks */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Explore Our Frameworks
            </span>
          </h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
            Curated knowledge areas defining measurable visibility in the AI search era
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] hover:border-cyan-400 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-white text-xl font-semibold mb-2">Visibility Systems</h3>
              <p className="text-gray-400 text-sm mb-4">
                Frameworks and strategies for measuring and optimizing AI-powered visibility across Google, Bing, ChatGPT, Gemini, and Perplexity.
              </p>
              <Link href="/insights?category=Visibility" className="text-cyan-400 font-medium text-sm hover:underline">
                View Insights →
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] hover:border-cyan-400 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-400 flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-white text-xl font-semibold mb-2">Attribution Architecture</h3>
              <p className="text-gray-400 text-sm mb-4">
                Multi-touch and AI-powered attribution frameworks designed for B2B pipelines with CFO-ready measurement and 98% data confidence.
              </p>
              <Link href="/insights?category=Attribution" className="text-cyan-400 font-medium text-sm hover:underline">
                View Insights →
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] hover:border-cyan-400 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-400 flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-white text-xl font-semibold mb-2">Performance Intelligence</h3>
              <p className="text-gray-400 text-sm mb-4">
                AI-driven systems that unify campaign performance with CRM and ARR visibility for measurable business outcomes.
              </p>
              <Link href="/insights?category=Measurement" className="text-cyan-400 font-medium text-sm hover:underline">
                View Insights →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5️⃣ RESEARCH SPOTLIGHT */}
      <section className="py-20 bg-gradient-to-b from-gray-900/20 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Research & Measurement Highlights
            </span>
          </h2>
          <p className="text-gray-400 text-center max-w-3xl mx-auto mb-12">
            Original research and frameworks developed by Hendricks.AI to define and measure visibility across the AI-powered search ecosystem.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {researchHighlights.map((research, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border border-[rgba(255,255,255,0.05)] hover:border-cyan-400/50 transition-all duration-300"
              >
                <div className={`text-4xl font-bold mb-3 bg-gradient-to-r from-${research.color}-400 to-${research.color}-300 bg-clip-text text-transparent`}>
                  {research.stat}
                </div>
                <h4 className="text-white font-bold text-sm mb-2 leading-tight">
                  {research.title}
                </h4>
                <p className="text-gray-400 text-xs leading-relaxed">
                  {research.takeaway}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ALL INSIGHTS GRID */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">
            {selectedCategory === 'All' ? 'All Insights' : selectedCategory}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInsights.map(post => (
              <Link
                key={post.id}
                href={`/insights/${post.id}`}
                className="group"
              >
                <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 hover:border-cyan-400/50 transition-all duration-200 h-full">
                  <div className="mb-3">
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">{post.category}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6️⃣ SUBSCRIBE CTA - Join the Intelligence Brief */}
      <section id="subscribe" className="py-32 relative overflow-hidden bg-gradient-to-br from-blue-950 via-purple-950 to-blue-950">
        {/* Grid Overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}></div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white leading-tight">
            Join the <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Intelligence Brief</span>
          </h2>

          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Get exclusive insights, frameworks, and visibility benchmarks from the Hendricks.AI Intelligence team — directly in your inbox.
          </p>

          {/* Email Form */}
          <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto mb-8">
            <input
              type="email"
              placeholder="Your work email"
              className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 text-white font-bold rounded-full hover:scale-[1.03] transition-transform"
            >
              Subscribe →
            </button>
          </form>

          {/* Secondary CTA */}
          <p className="text-gray-400">
            Prefer a conversation?{' '}
            <Link href="/contact" className="text-cyan-400 font-semibold hover:underline">
              Book a Strategy Session →
            </Link>
          </p>
        </div>
      </section>

      <Footer />
      <StickyMobileCTA />
    </main>
  )
}
