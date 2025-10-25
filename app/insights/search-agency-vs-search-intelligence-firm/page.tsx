import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react'
import { Metadata } from 'next'
import Navigation from '../../components/navigation'
import Footer from '../../components/footer'
import StickyMobileCTA from '../../components/sticky-mobile-cta'

export const metadata: Metadata = {
  title: 'Search Agency vs Search Intelligence Firm: What\'s the Difference? | Hendricks.AI',
  description: 'Understand the critical differences between traditional search agencies and search intelligence firms. Learn why B2B companies are shifting from campaign execution to engineering-led measurement and attribution.',
  keywords: [
    'search agency vs search intelligence firm',
    'traditional search agency',
    'search intelligence firm',
    'difference between search agency and intelligence firm',
    'search marketing agency comparison',
    'B2B search agency alternatives',
    'search measurement vs execution',
    'attribution vs campaign management'
  ],
  openGraph: {
    title: 'Search Agency vs Search Intelligence Firm: What\'s the Difference? | Hendricks.AI',
    description: 'Traditional search agencies optimize campaigns. Search intelligence firms build measurement systems. Learn the critical differences.',
    type: 'article',
    publishedTime: '2025-10-25T00:00:00.000Z',
    authors: ['Brandon Lincoln Hendricks'],
    url: 'https://hendricks.ai/insights/search-agency-vs-search-intelligence-firm',
    images: [
      {
        url: 'https://hendricks.ai/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Search Agency vs Search Intelligence Firm',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Search Agency vs Search Intelligence Firm: What\'s the Difference?',
    description: 'Traditional agencies optimize campaigns. Intelligence firms build measurement systems. Learn why it matters.',
  },
}

export default function SearchAgencyVsIntelligencePage() {
  const article = {
    headline: "Search Agency vs Search Intelligence Firm: What's the Difference?",
    date: "2025-10-25",
    author: "Brandon Lincoln Hendricks",
    category: "Industry Comparison",
    readTime: "10 min read",
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: 'Comprehensive comparison between traditional search agencies and search intelligence firms, explaining the shift from campaign execution to measurement-driven systems.',
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
      '@id': 'https://hendricks.ai/insights/search-agency-vs-search-intelligence-firm'
    }
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the difference between a search agency and a search intelligence firm?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Traditional search agencies focus on campaign execution and optimization within Google and Bing. A search intelligence firm like Hendricks.AI goes further by measuring visibility across the entire AI search ecosystem (including ChatGPT, Gemini, Perplexity), proving ROI with CFO-ready attribution, and unifying execution under one AI-powered system. We are engineers, not just marketers.'
        }
      },
      {
        '@type': 'Question',
        name: 'Should I work with a search agency or search intelligence firm?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Choose a traditional search agency if you need basic campaign management within Google Ads. Choose a search intelligence firm if you need: (1) Visibility measurement across ChatGPT, Gemini, Perplexity, Google, and Bing, (2) CFO-ready attribution connecting spend to pipeline and ARR, (3) Unified search execution under one system, or (4) Engineering-led measurement instead of just campaign optimization.'
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
        name: 'Search Agency vs Search Intelligence Firm',
        item: 'https://hendricks.ai/insights/search-agency-vs-search-intelligence-firm'
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
                Traditional search agencies optimize campaigns within Google and Bing. Search intelligence firms build measurement systems that prove ROI across the entire AI search ecosystem—including ChatGPT, Gemini, and Perplexity. The difference is engineering vs execution, measurement vs management, systems vs services.
              </p>
            </div>

            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              "We're looking for a search agency to help with our Google Ads."
            </p>

            <p className="text-gray-300 leading-relaxed">
              I hear this frequently from B2B marketing leaders. And my response is always the same: <strong className="text-white">"Are you looking for someone to manage campaigns, or someone to prove whether search actually drives pipeline?"</strong>
            </p>

            <p className="text-gray-300 leading-relaxed">
              Because those are two fundamentally different problems—requiring fundamentally different solutions.
            </p>

            <h2 className="text-3xl font-bold text-white mt-12 mb-6">The Core Difference</h2>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-white mb-3">Traditional Search Agency</h3>
                <p className="text-gray-400 text-sm mb-4">Focus: Campaign execution and optimization</p>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-start">
                    <span className="text-gray-500 mr-2">•</span>
                    <span>Manage Google Ads and Bing Ads accounts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-500 mr-2">•</span>
                    <span>Optimize bids, keywords, and ad copy</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-500 mr-2">•</span>
                    <span>Report on clicks, impressions, CTR</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-500 mr-2">•</span>
                    <span>Improve Quality Scores and lower CPCs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-500 mr-2">•</span>
                    <span>Monthly performance reviews</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border border-cyan-500/30 rounded-xl p-6">
                <div className="text-3xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-cyan-400 mb-3">Search Intelligence Firm</h3>
                <p className="text-cyan-300 text-sm mb-4">Focus: Measurement systems and attribution</p>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">✓</span>
                    <span>Measure visibility across ChatGPT, Gemini, Perplexity, Google, Bing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">✓</span>
                    <span>Build attribution connecting spend to pipeline and ARR</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">✓</span>
                    <span>Unify Google + Bing under one AI-powered system</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">✓</span>
                    <span>Prove ROI with 98% data match confidence</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">✓</span>
                    <span>CFO-ready dashboards and incrementality testing</span>
                  </li>
                </ul>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-white mt-12 mb-6">What Traditional Search Agencies Do Well</h2>

            <p className="text-gray-300 leading-relaxed mb-6">
              Let's be clear: traditional search agencies serve an important purpose. They excel at:
            </p>

            <div className="space-y-4 my-8">
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-2">Campaign Management at Scale</h3>
                <p className="text-gray-300 text-sm">
                  They manage hundreds of campaigns, thousands of ad groups, and tens of thousands of keywords efficiently. If you just need someone to execute within Google Ads, agencies do this competently.
                </p>
              </div>

              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-2">Tactical Optimization</h3>
                <p className="text-gray-300 text-sm">
                  They're skilled at improving Quality Scores, testing ad copy variations, adjusting bids based on performance, and implementing Google's latest features.
                </p>
              </div>

              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-2">Lower Cost (Initially)</h3>
                <p className="text-gray-300 text-sm">
                  Agency retainers are often lower than building internal measurement infrastructure or working with specialized firms. The cost appears lower—until you realize you have no idea if search actually drives revenue.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-white mt-12 mb-6">Where Traditional Search Agencies Fall Short</h2>

            <p className="text-gray-300 leading-relaxed mb-6">
              Here's where the traditional agency model breaks down for B2B companies:
            </p>

            <div className="space-y-6 my-8">
              <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6">
                <h3 className="text-xl font-bold text-red-400 mb-3">❌ No AI Search Visibility Measurement</h3>
                <p className="text-gray-300 mb-3">
                  Agencies measure Google rankings. They don't measure whether your brand appears when prospects ask ChatGPT, Gemini, or Perplexity about solutions.
                </p>
                <p className="text-gray-400 text-sm">
                  <strong className="text-gray-300">The problem:</strong> You're missing 30-40% of the search ecosystem. Prospects discover competitors in AI search while you remain invisible.
                </p>
              </div>

              <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6">
                <h3 className="text-xl font-bold text-red-400 mb-3">❌ Can't Prove ROI to CFOs</h3>
                <p className="text-gray-300 mb-3">
                  Agencies report "conversions" and "MQLs." CFOs want to see pipeline, ARR, and revenue attribution with data confidence levels.
                </p>
                <p className="text-gray-400 text-sm">
                  <strong className="text-gray-300">The problem:</strong> You spend $500K/year on search with no proof it drives revenue. Your CFO questions every dollar.
                </p>
              </div>

              <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6">
                <h3 className="text-xl font-bold text-red-400 mb-3">❌ Google and Bing Managed Separately</h3>
                <p className="text-gray-300 mb-3">
                  Agencies manage Google and Bing as separate silos. No unified strategy, no cross-platform optimization, no consolidated reporting.
                </p>
                <p className="text-gray-400 text-sm">
                  <strong className="text-gray-300">The problem:</strong> You're leaving efficiency gains on the table. Data shows unified execution delivers +67% better performance.
                </p>
              </div>

              <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6">
                <h3 className="text-xl font-bold text-red-400 mb-3">❌ No Engineering Capability</h3>
                <p className="text-gray-300 mb-3">
                  Agencies employ marketers, not engineers. They can't build attribution systems, integrate APIs, or create custom measurement infrastructure.
                </p>
                <p className="text-gray-400 text-sm">
                  <strong className="text-gray-300">The problem:</strong> You're limited to what Google Ads dashboard shows. No custom attribution, no advanced measurement, no data warehouse integration.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-white mt-12 mb-6">What Search Intelligence Firms Do Differently</h2>

            <p className="text-gray-300 leading-relaxed mb-6">
              Search intelligence firms approach search fundamentally differently. Here's what Hendricks.AI provides that traditional agencies can't:
            </p>

            <div className="space-y-8 my-8">
              <div className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 rounded-xl p-8 border border-blue-500/30">
                <h3 className="text-2xl font-bold text-white mb-4">1. Complete AI Search Ecosystem Visibility</h3>
                <p className="text-gray-300 mb-4">
                  We measure your brand's presence across all five major platforms:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-950 rounded-lg p-4 border border-gray-800">
                    <p className="text-cyan-400 font-semibold mb-2">Traditional Platforms</p>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Google (including AI Overviews)</li>
                      <li>• Bing (including Copilot)</li>
                    </ul>
                  </div>
                  <div className="bg-gray-950 rounded-lg p-4 border border-gray-800">
                    <p className="text-cyan-400 font-semibold mb-2">AI Search Platforms</p>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• ChatGPT</li>
                      <li>• Gemini</li>
                      <li>• Perplexity</li>
                    </ul>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mt-4">
                  You see exactly where your brand appears (and where competitors win) across the complete search ecosystem—not just Google rankings.
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-xl p-8 border border-purple-500/30">
                <h3 className="text-2xl font-bold text-white mb-4">2. CFO-Ready Attribution Engineering</h3>
                <p className="text-gray-300 mb-4">
                  We build attribution systems that connect every marketing dollar to pipeline, ARR, and revenue:
                </p>
                <ul className="space-y-3 text-gray-300 text-sm">
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">✓</span>
                    <span><strong className="text-white">98% data match confidence:</strong> CRM integration with verified accuracy</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">✓</span>
                    <span><strong className="text-white">Multi-touch attribution:</strong> See the complete buyer journey, not just last click</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">✓</span>
                    <span><strong className="text-white">Incrementality testing:</strong> Prove true lift, not just correlation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">✓</span>
                    <span><strong className="text-white">CFO dashboards:</strong> Pipeline, ARR, CAC, LTV—the metrics finance understands</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-cyan-900/40 to-blue-900/40 rounded-xl p-8 border border-cyan-500/30">
                <h3 className="text-2xl font-bold text-white mb-4">3. Unified Search Execution</h3>
                <p className="text-gray-300 mb-4">
                  Instead of managing Google and Bing separately, we unify them under one AI-powered system:
                </p>
                <div className="bg-gray-950 rounded-lg p-6 border border-gray-800 mb-4">
                  <p className="text-cyan-400 font-semibold mb-3">Results from Unified Approach:</p>
                  <div className="space-y-2 text-gray-300 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Efficiency improvement</span>
                      <span className="text-cyan-400 font-bold">+67%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Cost-per-lead reduction</span>
                      <span className="text-cyan-400 font-bold">-61%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Qualified pipeline increase</span>
                      <span className="text-cyan-400 font-bold">2.3X</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">
                  One platform, one strategy, one source of truth—not fragmented reporting across multiple tools.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-white mt-12 mb-6">When to Choose Each</h2>

            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 my-8">
              <h3 className="text-2xl font-bold text-white mb-6">Decision Framework</h3>

              <div className="space-y-6">
                <div>
                  <p className="text-lg font-semibold text-gray-400 mb-3">Choose a Traditional Search Agency if:</p>
                  <ul className="space-y-2 text-gray-300 text-sm ml-4">
                    <li className="flex items-start">
                      <span className="text-gray-500 mr-2">•</span>
                      <span>You only need basic Google Ads campaign management</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-500 mr-2">•</span>
                      <span>You don't need to prove ROI to finance/CFO</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-500 mr-2">•</span>
                      <span>You only care about Google (not AI search ecosystem)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-500 mr-2">•</span>
                      <span>Monthly reports on clicks and conversions are sufficient</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6 border-t border-gray-800">
                  <p className="text-lg font-semibold text-cyan-400 mb-3">Choose a Search Intelligence Firm if:</p>
                  <ul className="space-y-2 text-gray-300 text-sm ml-4">
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">✓</span>
                      <span>You need to measure visibility across ChatGPT, Gemini, Perplexity (not just Google)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">✓</span>
                      <span>You must prove ROI with CFO-ready attribution connecting spend to ARR</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">✓</span>
                      <span>You want Google + Bing unified under one AI-powered system</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">✓</span>
                      <span>You need engineering-led measurement, not just campaign execution</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">✓</span>
                      <span>You're spending $100K+/year and can't afford to waste budget on unmeasurable channels</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-white mt-12 mb-6">The Bottom Line</h2>

            <p className="text-gray-300 leading-relaxed mb-6">
              Traditional search agencies optimize campaigns. Search intelligence firms build measurement systems.
            </p>

            <p className="text-gray-300 leading-relaxed mb-6">
              Agencies report clicks and impressions. Intelligence firms prove pipeline and revenue.
            </p>

            <p className="text-gray-300 leading-relaxed">
              <strong className="text-white">The question isn't which is "better"—it's which solves your actual problem.</strong>
            </p>

            <p className="text-gray-300 leading-relaxed">
              If you need someone to manage your Google Ads account, hire an agency. If you need to prove whether search drives revenue, build attribution systems, and measure visibility across the AI search ecosystem—you need a search intelligence firm.
            </p>

            <div className="bg-gradient-to-r from-blue-950 via-purple-950 to-blue-950 rounded-2xl p-8 my-12 border border-cyan-500/30">
              <h3 className="text-2xl font-bold text-white mb-4">See the Search Intelligence Difference</h3>
              <p className="text-gray-300 mb-6">
                Book a strategy session and see how Hendricks.AI's Search Intelligence approach differs from traditional agencies. We'll show you exactly how we measure visibility across ChatGPT, Gemini, Perplexity, Google, and Bing—and prove ROI with CFO-ready attribution.
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
                href="/insights/what-is-search-intelligence-engineer"
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-cyan-400/50 transition-all"
              >
                <h4 className="text-lg font-semibold text-cyan-400 mb-2">What is a Search Intelligence Engineer? →</h4>
                <p className="text-gray-400 text-sm">Learn about the role that builds measurement systems instead of just managing campaigns</p>
              </Link>
              <Link
                href="/solutions"
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-cyan-400/50 transition-all"
              >
                <h4 className="text-lg font-semibold text-cyan-400 mb-2">Our Solutions →</h4>
                <p className="text-gray-400 text-sm">See how Visibility Audit, Attribution Engine, and AI Visibility Execution work</p>
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
