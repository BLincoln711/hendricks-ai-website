import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react'
import { Metadata } from 'next'
import Navigation from '../../components/navigation'
import { Footer } from '../../components/Footer'
import StickyMobileCTA from '../../components/sticky-mobile-cta'

export const metadata: Metadata = {
  title: 'How to Appear in Google AI Overviews | Hendricks.AI',
  description: 'Learn proven strategies to make your brand appear in Google AI Overviews. Comprehensive guide covering structured data, content optimization, E-E-A-T signals, and technical SEO for AI search visibility.',
  keywords: [
    'Google AI Overviews',
    'how to appear in Google AI Overviews',
    'Google AI Overview optimization',
    'SGE optimization',
    'AI Overview SEO',
    'Google Search Generative Experience',
    'appear in AI search results',
    'optimize for Google AI',
    'AI search visibility'
  ],
  openGraph: {
    title: 'How to Appear in Google AI Overviews | Hendricks.AI',
    description: 'Proven strategies to optimize your content for Google AI Overviews and increase visibility in AI-powered search results.',
    type: 'article',
    publishedTime: '2025-10-25T00:00:00.000Z',
    authors: ['Brandon Lincoln Hendricks'],
    url: 'https://hendricks.ai/insights/how-to-appear-in-google-ai-overviews',
    images: [
      {
        url: 'https://hendricks.ai/og-image.png',
        width: 1200,
        height: 630,
        alt: 'How to Appear in Google AI Overviews',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Appear in Google AI Overviews | Hendricks.AI',
    description: 'Master the strategies to get featured in Google AI Overviews and dominate AI-powered search.',
  },
}

export default function GoogleAIOverviewsPage() {
  const article = {
    headline: "How to Appear in Google AI Overviews",
    date: "2025-10-25",
    author: "Brandon Lincoln Hendricks",
    category: "AI Search Optimization",
    readTime: "13 min read",
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: 'Complete guide to optimizing your content and website to appear in Google AI Overviews, including structured data implementation, content strategies, and technical SEO best practices.',
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
      '@id': 'https://hendricks.ai/insights/how-to-appear-in-google-ai-overviews'
    }
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I appear in Google AI Overviews?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To appear in Google AI Overviews, implement structured data (especially FAQ schema), create authoritative content that directly answers questions, ensure technical SEO is solid, and build E-E-A-T signals. Hendricks.AI helps measure your current AI Overview coverage and optimize your content strategy to increase visibility across all AI-powered search features.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is FAQ schema and why does it help with AI Overviews?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'FAQ schema is structured data markup that tells Google exactly which questions your content answers and what those answers are. AI Overviews frequently pull from content with FAQ schema because it provides clear, structured question-answer pairs that AI can easily understand and cite.'
        }
      },
      {
        '@type': 'Question',
        name: 'How long does it take to appear in Google AI Overviews after optimization?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'After implementing optimization (structured data, content improvements, E-E-A-T signals), it typically takes 2-4 weeks for Google to recrawl, process, and potentially include your content in AI Overviews. However, building authority for competitive queries can take 2-3 months of consistent optimization.'
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
        name: 'How to Appear in Google AI Overviews',
        item: 'https://hendricks.ai/insights/how-to-appear-in-google-ai-overviews'
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
                Google AI Overviews appear above traditional search results for billions of queries, making them the most valuable screen real estate in search. Appearing in AI Overviews requires strategic implementation of structured data (FAQ schema), authoritative content creation, strong E-E-A-T signals, and technical SEO excellence.
              </p>
            </div>

            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              Google AI Overviews have fundamentally changed the search landscape. These AI-generated answer boxes appear at the very top of search results, above all traditional listings, for billions of queries daily.
            </p>

            <p className="text-gray-300 leading-relaxed">
              <strong className="text-white">If you're not appearing in AI Overviews, you're invisible at the most critical moment in the buyer journey.</strong>
            </p>

            <p className="text-gray-300 leading-relaxed">
              This guide shows you exactly how to optimize your content and website to appear in Google AI Overviews—the proven strategies that actually work.
            </p>

            <h2 className="text-3xl font-bold text-white mt-12 mb-6">What Are Google AI Overviews?</h2>

            <p className="text-gray-300 leading-relaxed mb-6">
              Google AI Overviews (formerly called SGE - Search Generative Experience) are AI-generated summaries that appear at the top of Google search results. They:
            </p>

            <ul className="space-y-2 text-gray-300 mb-6">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">→</span>
                <span>Synthesize information from multiple web sources</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">→</span>
                <span>Provide direct answers to user questions</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">→</span>
                <span>Include citations to the sources Google used</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">→</span>
                <span>Appear above all traditional organic results</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">→</span>
                <span>Capture user attention before they scroll</span>
              </li>
            </ul>

            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 my-8">
              <h3 className="text-xl font-bold text-white mb-4">Why AI Overviews Matter</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-cyan-400 font-semibold mb-1">75% of Search Queries</p>
                  <p className="text-gray-300 text-sm">AI Overviews now appear on approximately 75% of informational and commercial search queries</p>
                </div>
                <div>
                  <p className="text-cyan-400 font-semibold mb-1">85% Attention Capture</p>
                  <p className="text-gray-300 text-sm">Eye-tracking studies show AI Overviews capture 85% of user attention on results pages where they appear</p>
                </div>
                <div>
                  <p className="text-cyan-400 font-semibold mb-1">Zero Position</p>
                  <p className="text-gray-300 text-sm">AI Overviews are the ultimate "position zero" - above featured snippets, above organic #1, above everything</p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-white mt-12 mb-6">The Four Pillars of AI Overview Optimization</h2>

            <p className="text-gray-300 leading-relaxed mb-6">
              Appearing in Google AI Overviews requires optimization across four critical areas:
            </p>

            <div className="space-y-8 my-8">
              <div className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 rounded-xl p-8 border border-blue-500/30">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-blue-500 text-white font-bold rounded-lg p-4 text-2xl min-w-[60px] text-center">
                    1
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Structured Data Implementation</h3>
                    <p className="text-gray-300 mb-4">
                      Structured data tells Google exactly what your content is about in a machine-readable format. AI Overviews heavily favor content with proper schema markup.
                    </p>
                  </div>
                </div>

                <div className="bg-gray-950 rounded-lg p-6 border border-gray-800">
                  <h4 className="text-lg font-semibold text-cyan-400 mb-4">Critical Schema Types</h4>

                  <div className="space-y-4">
                    <div>
                      <p className="text-white font-semibold mb-2">FAQ Schema (Most Important)</p>
                      <p className="text-gray-300 text-sm mb-2">Marks question-answer pairs. AI Overviews frequently pull from FAQ schema.</p>
                      <div className="bg-gray-900 rounded p-3 font-mono text-xs text-gray-400 overflow-x-auto">
{`{
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "What is [your question]?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Direct answer here..."
    }
  }]
}`}
                      </div>
                    </div>

                    <div>
                      <p className="text-white font-semibold mb-2">Article Schema</p>
                      <p className="text-gray-300 text-sm mb-2">Identifies content as authoritative articles with clear authorship.</p>
                    </div>

                    <div>
                      <p className="text-white font-semibold mb-2">HowTo Schema</p>
                      <p className="text-gray-300 text-sm">Perfect for step-by-step guides and instructional content.</p>
                    </div>

                    <div>
                      <p className="text-white font-semibold mb-2">Organization Schema</p>
                      <p className="text-gray-300 text-sm">Establishes your brand authority and trustworthiness.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-xl p-8 border border-purple-500/30">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-purple-500 text-white font-bold rounded-lg p-4 text-2xl min-w-[60px] text-center">
                    2
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Authoritative Content Creation</h3>
                    <p className="text-gray-300 mb-4">
                      AI Overviews prioritize comprehensive, authoritative content that directly answers user questions with accuracy and depth.
                    </p>
                  </div>
                </div>

                <div className="bg-gray-950 rounded-lg p-6 border border-gray-800">
                  <h4 className="text-lg font-semibold text-cyan-400 mb-4">Content Best Practices</h4>

                  <ul className="space-y-3 text-gray-300 text-sm">
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-2 font-bold">✓</span>
                      <div>
                        <strong className="text-white">Answer Questions Directly:</strong> Start with clear, direct answers before providing context
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-2 font-bold">✓</span>
                      <div>
                        <strong className="text-white">Use Clear Structure:</strong> Headings, subheadings, bullet points, and numbered lists
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-2 font-bold">✓</span>
                      <div>
                        <strong className="text-white">Provide Complete Coverage:</strong> Address related questions and edge cases
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-2 font-bold">✓</span>
                      <div>
                        <strong className="text-white">Include Examples:</strong> Specific, concrete examples that illustrate concepts
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-2 font-bold">✓</span>
                      <div>
                        <strong className="text-white">Cite Sources:</strong> Link to authoritative sources that support your claims
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-2 font-bold">✓</span>
                      <div>
                        <strong className="text-white">Keep Content Fresh:</strong> Update regularly with current information
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-cyan-900/40 to-blue-900/40 rounded-xl p-8 border border-cyan-500/30">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-cyan-500 text-white font-bold rounded-lg p-4 text-2xl min-w-[60px] text-center">
                    3
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">E-E-A-T Signals</h3>
                    <p className="text-gray-300 mb-4">
                      Experience, Expertise, Authoritativeness, and Trustworthiness are critical ranking factors for AI Overviews.
                    </p>
                  </div>
                </div>

                <div className="bg-gray-950 rounded-lg p-6 border border-gray-800">
                  <h4 className="text-lg font-semibold text-cyan-400 mb-4">Building E-E-A-T</h4>

                  <div className="space-y-4">
                    <div>
                      <p className="text-white font-semibold mb-2">Experience</p>
                      <ul className="text-gray-300 text-sm space-y-1 ml-4">
                        <li>• Demonstrate first-hand experience with the topic</li>
                        <li>• Include case studies and real examples</li>
                        <li>• Show practical application of concepts</li>
                      </ul>
                    </div>

                    <div>
                      <p className="text-white font-semibold mb-2">Expertise</p>
                      <ul className="text-gray-300 text-sm space-y-1 ml-4">
                        <li>• Author credentials and qualifications</li>
                        <li>• Detailed author bio with relevant expertise</li>
                        <li>• Professional certifications and achievements</li>
                      </ul>
                    </div>

                    <div>
                      <p className="text-white font-semibold mb-2">Authoritativeness</p>
                      <ul className="text-gray-300 text-sm space-y-1 ml-4">
                        <li>• Backlinks from authoritative websites</li>
                        <li>• Media mentions and press coverage</li>
                        <li>• Recognition as thought leaders</li>
                      </ul>
                    </div>

                    <div>
                      <p className="text-white font-semibold mb-2">Trustworthiness</p>
                      <ul className="text-gray-300 text-sm space-y-1 ml-4">
                        <li>• HTTPS security certificate</li>
                        <li>• Clear privacy policy and terms</li>
                        <li>• Contact information and transparency</li>
                        <li>• Customer reviews and testimonials</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-pink-900/40 to-purple-900/40 rounded-xl p-8 border border-pink-500/30">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-pink-500 text-white font-bold rounded-lg p-4 text-2xl min-w-[60px] text-center">
                    4
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Technical SEO Excellence</h3>
                    <p className="text-gray-300 mb-4">
                      Solid technical foundation ensures Google can crawl, understand, and include your content in AI Overviews.
                    </p>
                  </div>
                </div>

                <div className="bg-gray-950 rounded-lg p-6 border border-gray-800">
                  <h4 className="text-lg font-semibold text-cyan-400 mb-4">Technical Requirements</h4>

                  <ul className="space-y-3 text-gray-300 text-sm">
                    <li className="flex items-start">
                      <span className="text-pink-400 mr-2 font-bold">✓</span>
                      <div>
                        <strong className="text-white">Fast Page Speed:</strong> Core Web Vitals optimized for performance
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-400 mr-2 font-bold">✓</span>
                      <div>
                        <strong className="text-white">Mobile-First:</strong> Perfect mobile experience (Google indexes mobile-first)
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-400 mr-2 font-bold">✓</span>
                      <div>
                        <strong className="text-white">Clean HTML:</strong> Semantic HTML5 with proper heading hierarchy
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-400 mr-2 font-bold">✓</span>
                      <div>
                        <strong className="text-white">Internal Linking:</strong> Clear site architecture with contextual links
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-400 mr-2 font-bold">✓</span>
                      <div>
                        <strong className="text-white">Sitemap & Robots.txt:</strong> Help Google discover and index your content
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-white mt-12 mb-6">Step-by-Step Implementation Guide</h2>

            <p className="text-gray-300 leading-relaxed mb-6">
              Here's the exact process to optimize your website for Google AI Overviews:
            </p>

            <div className="space-y-6 my-8">
              <div className="bg-gray-900/50 border-l-4 border-blue-500 rounded-r-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">Week 1: Audit & Research</h3>
                <ol className="space-y-2 text-gray-300 text-sm ml-4">
                  <li>1. Identify your top 20-50 target keywords</li>
                  <li>2. Search each keyword and see if AI Overviews appear</li>
                  <li>3. Analyze which websites Google cites in AI Overviews</li>
                  <li>4. Note patterns: What structured data do they use? How is content formatted?</li>
                  <li>5. Audit your current pages: Do you have relevant content for these queries?</li>
                </ol>
              </div>

              <div className="bg-gray-900/50 border-l-4 border-purple-500 rounded-r-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">Week 2: Implement Structured Data</h3>
                <ol className="space-y-2 text-gray-300 text-sm ml-4">
                  <li>1. Add FAQ schema to pages that answer common questions</li>
                  <li>2. Implement Article schema on blog posts and guides</li>
                  <li>3. Add HowTo schema to instructional content</li>
                  <li>4. Validate all schema using Google's Rich Results Test</li>
                  <li>5. Submit updated pages to Google Search Console</li>
                </ol>
              </div>

              <div className="bg-gray-900/50 border-l-4 border-cyan-500 rounded-r-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">Week 3: Content Optimization</h3>
                <ol className="space-y-2 text-gray-300 text-sm ml-4">
                  <li>1. Rewrite content to answer questions directly (no fluff)</li>
                  <li>2. Add clear headings that match question formats</li>
                  <li>3. Include specific examples and data</li>
                  <li>4. Add internal links to related content</li>
                  <li>5. Ensure mobile formatting is perfect</li>
                </ol>
              </div>

              <div className="bg-gray-900/50 border-l-4 border-pink-500 rounded-r-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">Week 4: E-E-A-T Enhancement</h3>
                <ol className="space-y-2 text-gray-300 text-sm ml-4">
                  <li>1. Add detailed author bios with credentials</li>
                  <li>2. Create/update About page with expertise signals</li>
                  <li>3. Add customer testimonials and case studies</li>
                  <li>4. Ensure all technical trust signals are in place</li>
                  <li>5. Build backlinks from authoritative sources</li>
                </ol>
              </div>

              <div className="bg-gray-900/50 border-l-4 border-green-500 rounded-r-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">Ongoing: Monitor & Iterate</h3>
                <ol className="space-y-2 text-gray-300 text-sm ml-4">
                  <li>1. Track AI Overview appearances in Google Search Console</li>
                  <li>2. Monitor which pages get cited</li>
                  <li>3. Analyze patterns in successful content</li>
                  <li>4. Continuously update content based on performance</li>
                  <li>5. Test new structured data types and formats</li>
                </ol>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-white mt-12 mb-6">Common Mistakes to Avoid</h2>

            <div className="space-y-4 my-8">
              <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6">
                <h3 className="text-xl font-bold text-red-400 mb-3">❌ Using Thin, Shallow Content</h3>
                <p className="text-gray-300">
                  AI Overviews favor comprehensive, in-depth content. A 300-word blog post won't cut it. Aim for 1,500-2,500 words of genuine value.
                </p>
              </div>

              <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6">
                <h3 className="text-xl font-bold text-red-400 mb-3">❌ Ignoring Mobile Experience</h3>
                <p className="text-gray-300">
                  Google uses mobile-first indexing. If your mobile experience is poor, you won't appear in AI Overviews regardless of content quality.
                </p>
              </div>

              <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6">
                <h3 className="text-xl font-bold text-red-400 mb-3">❌ Missing Author Credentials</h3>
                <p className="text-gray-300">
                  Anonymous content rarely appears in AI Overviews. Add clear authorship with credentials and expertise signals.
                </p>
              </div>

              <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6">
                <h3 className="text-xl font-bold text-red-400 mb-3">❌ Not Implementing FAQ Schema</h3>
                <p className="text-gray-300">
                  FAQ schema is the single most effective structured data type for AI Overviews. If you're not using it, you're missing the easiest win.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-white mt-12 mb-6">How Hendricks.AI Helps You Appear in AI Overviews</h2>

            <p className="text-gray-300 leading-relaxed mb-6">
              Our <Link href="/solutions" className="text-cyan-400 hover:text-cyan-300 underline">Visibility Audit</Link> includes comprehensive AI Overview analysis:
            </p>

            <div className="bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-8 my-8">
              <h3 className="text-2xl font-bold text-white mb-6">What We Measure</h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-cyan-400 mb-3">Current Coverage</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">✓</span>
                      <span>Which keywords trigger AI Overviews</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">✓</span>
                      <span>Whether you appear in any of them</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">✓</span>
                      <span>Which pages get cited</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">✓</span>
                      <span>Your visibility vs competitors</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-cyan-400 mb-3">Optimization Opportunities</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">✓</span>
                      <span>Missing structured data</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">✓</span>
                      <span>Content gaps and weaknesses</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">✓</span>
                      <span>E-E-A-T signal improvements</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">✓</span>
                      <span>Technical SEO issues</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-700">
                <Link
                  href="/contact"
                  className="inline-block px-6 py-3 bg-white text-gray-900 hover:bg-gray-100 shadow-lg shadow-cyan-500/50 font-bold rounded-full hover:scale-[1.03] transition-transform"
                >
                  Get Your Visibility Audit →
                </Link>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-white mt-12 mb-6">Start Appearing in Google AI Overviews Today</h2>

            <p className="text-gray-300 leading-relaxed mb-6">
              Google AI Overviews represent the most valuable screen real estate in search. Appearing in them isn't luck—it's systematic optimization of structured data, content quality, E-E-A-T signals, and technical SEO.
            </p>

            <p className="text-gray-300 leading-relaxed">
              The brands that dominate AI Overviews today will dominate search visibility tomorrow.
            </p>

            <div className="mt-12 bg-gradient-to-r from-blue-950 via-purple-950 to-blue-950 rounded-2xl p-8 border border-cyan-500/30">
              <h3 className="text-2xl font-bold text-white mb-4">See Where You Appear in AI Overviews</h3>
              <p className="text-gray-300 mb-6">
                Get a comprehensive Visibility Audit that shows your current AI Overview coverage, competitive positioning, and specific optimization opportunities to increase your visibility across Google AI Overviews, ChatGPT, Gemini, Perplexity, and Bing.
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
                href="/insights/what-is-ai-search-visibility-measurement"
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-cyan-400/50 transition-all"
              >
                <h4 className="text-lg font-semibold text-cyan-400 mb-2">What is AI Search Visibility Measurement? →</h4>
                <p className="text-gray-400 text-sm">Learn how to measure visibility across the entire AI search ecosystem</p>
              </Link>
              <Link
                href="/solutions"
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-cyan-400/50 transition-all"
              >
                <h4 className="text-lg font-semibold text-cyan-400 mb-2">Visibility Audit Solution →</h4>
                <p className="text-gray-400 text-sm">See how we measure and optimize your AI Overview presence</p>
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
