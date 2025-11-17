import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react'
import { Metadata } from 'next'
import Navigation from '../../components/navigation'
import { Footer } from '../../components/Footer'
import StickyMobileCTA from '../../components/sticky-mobile-cta'

export const metadata: Metadata = {
  title: 'What is AI Search Visibility Measurement? | Hendricks.AI',
  description: 'AI search visibility measurement tracks where and how often your brand appears across AI-powered search engines like ChatGPT, Gemini, Perplexity, and traditional search like Google and Bing. Learn how to measure brand visibility across the entire AI search ecosystem.',
  keywords: [
    'AI search visibility measurement',
    'what is AI search visibility',
    'measure AI search presence',
    'ChatGPT visibility tracking',
    'Gemini search measurement',
    'Perplexity visibility',
    'AI search analytics',
    'brand visibility measurement',
    'multi-engine search visibility'
  ],
  openGraph: {
    title: 'What is AI Search Visibility Measurement? | Hendricks.AI',
    description: 'Comprehensive guide to measuring brand visibility across the AI-powered search ecosystem including ChatGPT, Gemini, Perplexity, Google, and Bing.',
    type: 'article',
    publishedTime: '2025-10-25T00:00:00.000Z',
    authors: ['Brandon Lincoln Hendricks'],
    url: 'https://hendricks.ai/insights/what-is-ai-search-visibility-measurement',
    images: [
      {
        url: 'https://hendricks.ai/og-image.png',
        width: 1200,
        height: 630,
        alt: 'What is AI Search Visibility Measurement?',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What is AI Search Visibility Measurement? | Hendricks.AI',
    description: 'Learn how to measure your brand visibility across the entire AI search ecosystem.',
  },
}

export default function AISearchVisibilityMeasurementPage() {
  const article = {
    headline: "What is AI Search Visibility Measurement?",
    date: "2025-10-25",
    author: "Brandon Lincoln Hendricks",
    category: "Measurement",
    readTime: "11 min read",
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: 'Complete guide to understanding AI search visibility measurement, why it matters for B2B brands, and how to track brand presence across the AI-powered search ecosystem.',
    image: 'https://hendricks.ai/og-image.png',
    datePublished: article.date,
    dateModified: article.date,
    author: {
      '@type': 'Person',
      name: article.author,
      url: 'https://hendricks.ai/about',
      jobTitle: 'Founder & Search Intelligence Engineer',
      worksFor: {
        '@type': 'Organization',
        name: 'Hendricks.AI'
      }
    },
    publisher: {
      '@type': 'Organization',
      name: 'Hendricks.AI',
      logo: {
        '@type': 'ImageObject',
        url: 'https://hendricks.ai/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://hendricks.ai/insights/what-is-ai-search-visibility-measurement'
    }
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is AI search visibility measurement?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'AI search visibility measurement is the process of tracking where and how often your brand appears across AI-powered search engines like ChatGPT, Gemini, Perplexity, and traditional search engines like Google and Bing. Unlike traditional SEO which focuses only on rankings, AI visibility measurement tracks brand mentions, competitive positioning, and topic coverage across the entire search ecosystem.'
        }
      },
      {
        '@type': 'Question',
        name: 'Why is AI search visibility different from traditional SEO?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Traditional SEO measures keyword rankings in Google search results. AI search visibility measurement tracks whether your brand appears when AI engines like ChatGPT generate responses to queries. You can rank #1 in Google but be invisible in ChatGPT responses, missing millions of potential buyers who use AI search for discovery.'
        }
      },
      {
        '@type': 'Question',
        name: 'Which platforms should I measure for AI search visibility?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A comprehensive AI search visibility measurement strategy includes Google (with AI Overviews), Bing (with Copilot), ChatGPT, Gemini, and Perplexity. Together, these five platforms cover the vast majority of AI-powered search behavior. Measuring only one or two platforms gives an incomplete picture of your actual visibility.'
        }
      }
    ]
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://hendricks.ai'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Insights',
        item: 'https://hendricks.ai/insights'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'What is AI Search Visibility Measurement?',
        item: 'https://hendricks.ai/insights/what-is-ai-search-visibility-measurement'
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="min-h-screen bg-black text-white">
        <Navigation />

        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
          <Link
            href="/insights"
            className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-8 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Insights
          </Link>

          <header className="mb-12">
            <div className="flex items-center gap-4 text-sm text-gray-400 mb-4 flex-wrap">
              <span className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full border border-cyan-500/30">
                {article.category}
              </span>
              <div className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                {new Date(article.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                {article.readTime}
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6 leading-tight">
              {article.headline}
            </h1>

            <div className="flex items-center justify-between border-t border-b border-gray-800 py-4">
              <p className="text-gray-300">
                By <Link href="/about" className="text-cyan-400 hover:text-cyan-300 font-semibold">{article.author}</Link>
              </p>
            </div>
          </header>

          <div className="prose prose-lg prose-invert max-w-none">
            <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 p-6 rounded-xl mb-8 border border-blue-500/30">
              <p className="font-semibold text-cyan-400 mb-2">Key Insight:</p>
              <p className="text-gray-200 leading-relaxed">
                AI search visibility measurement tracks your brand's presence across the entire AI-powered search ecosystem—not just Google rankings. It answers the critical question: "When prospects search for solutions in ChatGPT, Gemini, Perplexity, Google AI Overviews, and Bing Copilot, does your brand appear?"
              </p>
            </div>

            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              The search landscape has fundamentally changed. Your customers don't just Google anymore. They ask ChatGPT for recommendations. They research in Gemini. They compare solutions in Perplexity. They read Google AI Overviews.
            </p>

            <p className="text-gray-300 leading-relaxed">
              <strong className="text-white">If you're only measuring Google keyword rankings, you're missing 30-40% of the search ecosystem</strong>—and you have no idea whether your brand appears when prospects research solutions in AI-powered search engines.
            </p>

            <p className="text-gray-300 leading-relaxed">
              This is what AI search visibility measurement solves.
            </p>

            <h2 className="text-3xl font-bold text-white mt-12 mb-6">The Problem: Traditional SEO Doesn't Measure AI Search</h2>

            <p className="text-gray-300 leading-relaxed mb-6">
              Traditional SEO tools tell you:
            </p>

            <ul className="space-y-2 text-gray-300 mb-6">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">→</span>
                <span>Your Google keyword rankings (#1, #5, #10)</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">→</span>
                <span>Your domain authority and backlink count</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">→</span>
                <span>Which pages get organic traffic from Google</span>
              </li>
            </ul>

            <p className="text-gray-300 leading-relaxed">
              <strong className="text-white">But they don't tell you:</strong>
            </p>

            <ul className="space-y-2 text-gray-300 mb-6">
              <li className="flex items-start">
                <span className="text-red-400 mr-2">✗</span>
                <span>Whether you appear when prospects ask ChatGPT about solutions</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-2">✗</span>
                <span>How you're positioned in Gemini responses vs competitors</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-2">✗</span>
                <span>If your brand shows up in Perplexity's research summaries</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-2">✗</span>
                <span>Your visibility in Google AI Overviews (the AI-generated answers above search results)</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-2">✗</span>
                <span>Whether Bing Copilot mentions you when buyers research your category</span>
              </li>
            </ul>

            <p className="text-gray-300 leading-relaxed">
              This is the visibility gap that AI search measurement addresses.
            </p>

            <h2 className="text-3xl font-bold text-white mt-12 mb-6">What AI Search Visibility Measurement Actually Measures</h2>

            <p className="text-gray-300 leading-relaxed mb-6">
              AI search visibility measurement tracks five critical dimensions across the entire search ecosystem:
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <div className="text-3xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-cyan-400 mb-3">1. Presence</h3>
                <p className="text-gray-300 text-sm">
                  Does your brand appear at all when prospects search for solutions in your category? Visibility starts with presence.
                </p>
              </div>

              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <div className="text-3xl mb-4">📊</div>
                <h3 className="text-xl font-bold text-purple-400 mb-3">2. Frequency</h3>
                <p className="text-gray-300 text-sm">
                  How often does your brand appear across relevant queries? Appearing in 20% of relevant searches vs 80% makes a massive difference in pipeline.
                </p>
              </div>

              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <div className="text-3xl mb-4">🏆</div>
                <h3 className="text-xl font-bold text-blue-400 mb-3">3. Position</h3>
                <p className="text-gray-300 text-sm">
                  Where do you rank when AI engines list multiple solutions? First position gets attention; fourth position gets ignored.
                </p>
              </div>

              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <div className="text-3xl mb-4">⚖️</div>
                <h3 className="text-xl font-bold text-pink-400 mb-3">4. Context</h3>
                <p className="text-gray-300 text-sm">
                  How is your brand described? What features are highlighted? Is the positioning accurate and favorable?
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-white mt-12 mb-6">The Five Platforms You Must Measure</h2>

            <p className="text-gray-300 leading-relaxed mb-6">
              Comprehensive AI search visibility measurement covers these five platforms:
            </p>

            <div className="space-y-6 my-8">
              <div className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 rounded-xl p-6 border border-blue-500/30">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500 text-white font-bold rounded-lg p-3 min-w-[60px] text-center">
                    #1
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">ChatGPT</h3>
                    <p className="text-gray-300 mb-3">
                      200M+ weekly active users who research solutions, compare vendors, and discover brands through conversational AI.
                    </p>
                    <p className="text-gray-400 text-sm">
                      <strong>Why it matters:</strong> B2B buyers increasingly start their research in ChatGPT before visiting any vendor websites. If you're not visible here, you're invisible to millions of early-stage prospects.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-xl p-6 border border-purple-500/30">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-500 text-white font-bold rounded-lg p-3 min-w-[60px] text-center">
                    #2
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">Google (with AI Overviews)</h3>
                    <p className="text-gray-300 mb-3">
                      Still the dominant search engine, but now with AI Overviews appearing above traditional results for billions of queries.
                    </p>
                    <p className="text-gray-400 text-sm">
                      <strong>Why it matters:</strong> Google AI Overviews capture attention before users scroll to traditional results. Appearing in AI Overviews means visibility at the most valuable screen position.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-cyan-900/40 to-blue-900/40 rounded-xl p-6 border border-cyan-500/30">
                <div className="flex items-start gap-4">
                  <div className="bg-cyan-500 text-white font-bold rounded-lg p-3 min-w-[60px] text-center">
                    #3
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">Gemini</h3>
                    <p className="text-gray-300 mb-3">
                      Google's AI chatbot integrated across Google Workspace, Android, and increasingly used for business research.
                    </p>
                    <p className="text-gray-400 text-sm">
                      <strong>Why it matters:</strong> Gemini is embedded in tools that professionals use daily (Gmail, Docs, Workspace). Visibility here means appearing where buyers already work.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-pink-900/40 to-purple-900/40 rounded-xl p-6 border border-pink-500/30">
                <div className="flex items-start gap-4">
                  <div className="bg-pink-500 text-white font-bold rounded-lg p-3 min-w-[60px] text-center">
                    #4
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">Perplexity</h3>
                    <p className="text-gray-300 mb-3">
                      AI-powered research engine favored by professionals who want cited, authoritative answers instead of simple chatbot responses.
                    </p>
                    <p className="text-gray-400 text-sm">
                      <strong>Why it matters:</strong> Perplexity users are research-oriented and solution-focused. Visibility here captures high-intent prospects in active evaluation mode.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-xl p-6 border border-blue-500/30">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500 text-white font-bold rounded-lg p-3 min-w-[60px] text-center">
                    #5
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">Bing (with Copilot)</h3>
                    <p className="text-gray-300 mb-3">
                      Microsoft's search engine with built-in AI Copilot, integrated across Microsoft 365 and Edge browser.
                    </p>
                    <p className="text-gray-400 text-sm">
                      <strong>Why it matters:</strong> Bing captures enterprise users in Microsoft ecosystems. Combined with Google, it covers 95%+ of traditional search + AI-powered search behavior.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed bg-gray-900/50 border border-gray-800 rounded-xl p-6 my-8">
              <strong className="text-white">Complete visibility measurement requires all five platforms.</strong> Measuring only Google or only ChatGPT gives you an incomplete—and dangerously misleading—picture of where buyers actually discover your brand.
            </p>

            <h2 className="text-3xl font-bold text-white mt-12 mb-6">Why AI Search Visibility Matters for B2B Pipeline</h2>

            <p className="text-gray-300 leading-relaxed mb-6">
              AI search visibility directly impacts business outcomes:
            </p>

            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 my-8">
              <h3 className="text-2xl font-bold text-white mb-6">The Data</h3>

              <div className="space-y-6">
                <div>
                  <div className="flex items-start gap-4 mb-2">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-bold rounded-lg px-4 py-2">
                      2.3X
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-cyan-400">More Qualified Pipeline</h4>
                      <p className="text-gray-300 text-sm">
                        Brands with strong AI search visibility (60%+ mention rate across platforms) generate 2.3X more qualified pipeline compared to brands with weak visibility.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-4 mb-2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-400 text-white font-bold rounded-lg px-4 py-2">
                      43%
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-cyan-400">Of B2B Buyers Start in AI Search</h4>
                      <p className="text-gray-300 text-sm">
                        Nearly half of B2B buyers begin their research in ChatGPT, Gemini, or Perplexity before visiting any vendor websites. Invisible in AI search means invisible to early-stage prospects.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-4 mb-2">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-400 text-white font-bold rounded-lg px-4 py-2">
                      67%
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-cyan-400">Lower Cost-Per-Opportunity</h4>
                      <p className="text-gray-300 text-sm">
                        Brands that appear consistently across AI search platforms see 67% lower cost-per-opportunity because AI search drives high-intent, pre-educated prospects.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-white mt-12 mb-6">How Hendricks.AI Measures AI Search Visibility</h2>

            <p className="text-gray-300 leading-relaxed mb-6">
              Our <Link href="/solutions" className="text-cyan-400 hover:text-cyan-300 underline">Visibility Audit</Link> provides comprehensive AI search visibility measurement across all five platforms:
            </p>

            <div className="bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-8 my-8">
              <h3 className="text-2xl font-bold text-white mb-6">The Visibility Audit Process</h3>

              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-6">
                  <h4 className="text-lg font-semibold text-cyan-400 mb-2">Step 1: Query Set Definition</h4>
                  <p className="text-gray-300 text-sm">
                    We identify 100-300 queries your prospects actually use when researching solutions in your category. This includes category queries, problem-based searches, competitor comparisons, and feature-specific questions.
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-6">
                  <h4 className="text-lg font-semibold text-cyan-400 mb-2">Step 2: Automated Visibility Tracking</h4>
                  <p className="text-gray-300 text-sm">
                    Our system queries all five platforms (ChatGPT, Google, Gemini, Perplexity, Bing) with your keyword set, tracking when and where your brand appears—and how you're positioned vs competitors.
                  </p>
                </div>

                <div className="border-l-4 border-cyan-500 pl-6">
                  <h4 className="text-lg font-semibold text-cyan-400 mb-2">Step 3: Competitive Benchmarking</h4>
                  <p className="text-gray-300 text-sm">
                    We measure your visibility against top competitors, showing exactly where you win, where they dominate, and which visibility gaps are costing you pipeline.
                  </p>
                </div>

                <div className="border-l-4 border-pink-500 pl-6">
                  <h4 className="text-lg font-semibold text-cyan-400 mb-2">Step 4: Actionable Reporting</h4>
                  <p className="text-gray-300 text-sm">
                    You receive a complete visibility report with platform-by-platform analysis, competitive positioning, visibility gaps, and specific recommendations to improve your AI search presence.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-950 via-purple-950 to-blue-950 rounded-2xl p-8 my-12 border border-cyan-500/30">
              <h3 className="text-2xl font-bold text-white mb-4">See Your Complete AI Search Visibility</h3>
              <p className="text-gray-300 mb-6">
                Get a comprehensive Visibility Audit showing exactly where your brand appears (and doesn't appear) across ChatGPT, Gemini, Perplexity, Google, and Bing. See your competitive position, visibility gaps, and specific opportunities to improve your AI search presence.
              </p>
              <Link
                href="/contact"
                className="inline-block px-8 py-4 bg-white text-gray-900 hover:bg-gray-100 shadow-lg shadow-cyan-500/50 font-bold rounded-full hover:scale-[1.03] transition-transform"
              >
                Book Your Strategy Session →
              </Link>
            </div>

            <h2 className="text-3xl font-bold text-white mt-12 mb-6">Key Metrics in AI Search Visibility Measurement</h2>

            <div className="space-y-4 my-8">
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-2">Mention Rate</h3>
                <p className="text-gray-300 mb-2">Percentage of relevant queries where your brand appears</p>
                <p className="text-gray-400 text-sm">Target: 60%+ for strong visibility</p>
              </div>

              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-2">Average Position</h3>
                <p className="text-gray-300 mb-2">Your typical rank when AI engines list multiple solutions</p>
                <p className="text-gray-400 text-sm">Target: Top 3 positioning for visibility</p>
              </div>

              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-2">Share of Voice</h3>
                <p className="text-gray-300 mb-2">Your mention frequency vs top competitors</p>
                <p className="text-gray-400 text-sm">Target: 25%+ competitive share</p>
              </div>

              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-2">Category Coverage</h3>
                <p className="text-gray-300 mb-2">Percentage of relevant categories where you have visibility</p>
                <p className="text-gray-400 text-sm">Target: 80%+ comprehensive coverage</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-white mt-12 mb-6">Start Measuring Your AI Search Visibility</h2>

            <p className="text-gray-300 leading-relaxed mb-6">
              You can't improve what you don't measure. If you're not tracking AI search visibility, you have no idea whether prospects discover your brand when they research solutions in ChatGPT, Gemini, Perplexity, Google AI Overviews, or Bing Copilot.
            </p>

            <p className="text-gray-300 leading-relaxed">
              The good news: AI search visibility measurement is now automated, comprehensive, and actionable. Hendricks.AI's Visibility Audit shows you exactly where you stand—and what to do about it.
            </p>

            <div className="mt-12 bg-gradient-to-r from-blue-950 via-purple-950 to-blue-950 rounded-2xl p-8 border border-cyan-500/30">
              <h3 className="text-2xl font-bold text-white mb-4">Get Your Visibility Audit</h3>
              <p className="text-gray-300 mb-6">
                See your brand's complete visibility profile across ChatGPT, Gemini, Perplexity, Google, and Bing. Understand your competitive position, identify visibility gaps, and receive specific recommendations to improve your AI search presence.
              </p>
              <Link
                href="/contact"
                className="inline-block px-8 py-4 bg-white text-gray-900 hover:bg-gray-100 shadow-lg shadow-cyan-500/50 font-bold rounded-full hover:scale-[1.03] transition-transform"
              >
                Book Your Strategy Session →
              </Link>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800">
            <h3 className="text-2xl font-bold text-white mb-4">Related Insights</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/insights/how-to-measure-chatgpt-visibility"
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-cyan-400/50 transition-all"
              >
                <h4 className="text-lg font-semibold text-cyan-400 mb-2">How to Measure ChatGPT Visibility →</h4>
                <p className="text-gray-400 text-sm">Detailed guide to tracking your brand visibility in ChatGPT</p>
              </Link>
              <Link
                href="/solutions"
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-cyan-400/50 transition-all"
              >
                <h4 className="text-lg font-semibold text-cyan-400 mb-2">Visibility Audit Solution →</h4>
                <p className="text-gray-400 text-sm">See how our automated visibility measurement works</p>
              </Link>
            </div>
          </div>
        </article>

        <Footer />
        <StickyMobileCTA />
      </main>
    </>
  )
}
