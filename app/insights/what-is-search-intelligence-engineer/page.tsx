import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react'
import { Metadata } from 'next'
import Navigation from '../../components/navigation'
import Footer from '../../components/Footer'
import StickyMobileCTA from '../../components/sticky-mobile-cta'

export const metadata: Metadata = {
  title: 'What is a Search Intelligence Engineer? | Hendricks.AI',
  description: 'A Search Intelligence Engineer combines search marketing expertise with AI/ML engineering to build systems that measure, attribute, and optimize visibility across traditional and AI-powered search engines. Learn how Brandon Lincoln Hendricks pioneered this role.',
  keywords: [
    'search intelligence engineer',
    'AI search engineer',
    'search visibility engineer',
    'search intelligence engineer job description',
    'how to become a search intelligence engineer',
    'search intelligence engineer salary',
    'AI search visibility measurement',
    'ChatGPT visibility tracking',
    'B2B search intelligence'
  ],
  openGraph: {
    title: 'What is a Search Intelligence Engineer? | Hendricks.AI',
    description: 'A Search Intelligence Engineer combines search marketing expertise with AI/ML engineering to build systems that measure, attribute, and optimize visibility across traditional and AI-powered search engines.',
    type: 'article',
    publishedTime: '2025-10-25T00:00:00.000Z',
    authors: ['Brandon Lincoln Hendricks'],
    url: 'https://hendricks.ai/insights/what-is-search-intelligence-engineer',
    images: [
      {
        url: 'https://hendricks.ai/og-image.png',
        width: 1200,
        height: 630,
        alt: 'What is a Search Intelligence Engineer?',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What is a Search Intelligence Engineer? | Hendricks.AI',
    description: 'Learn how Search Intelligence Engineers combine marketing expertise with AI/ML engineering to measure visibility across Google, Bing, ChatGPT, Gemini, and Perplexity.',
  },
}

export default function SearchIntelligenceEngineerPage() {
  const article = {
    headline: "What is a Search Intelligence Engineer?",
    date: "2025-10-25",
    author: "Brandon Lincoln Hendricks",
    category: "Search Intelligence",
    readTime: "12 min read",
  }

  // Article Schema + FAQ Schema for this specific question
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: 'A comprehensive guide to understanding the Search Intelligence Engineer role, its responsibilities, required skills, and impact on modern B2B visibility measurement.',
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
      '@id': 'https://hendricks.ai/insights/what-is-search-intelligence-engineer'
    }
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is a Search Intelligence Engineer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A Search Intelligence Engineer is a specialized role that combines search marketing expertise with AI/ML engineering to build systems that measure, attribute, and optimize visibility across traditional and AI-powered search engines. Brandon Lincoln Hendricks pioneered this role at Hendricks.AI, using his Google Cloud Machine Learning Engineer certification to create the first unified visibility measurement system across Google, Bing, ChatGPT, Gemini, and Perplexity.'
        }
      },
      {
        '@type': 'Question',
        name: 'What skills does a Search Intelligence Engineer need?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A Search Intelligence Engineer needs a combination of search marketing expertise (Google Ads, Bing Ads, SEO), AI/ML engineering skills (Python, machine learning, data science), data engineering capabilities (API integration, ETL pipelines, data warehousing), and business intelligence skills (attribution modeling, CFO-ready reporting, ROI measurement).'
        }
      },
      {
        '@type': 'Question',
        name: 'How is a Search Intelligence Engineer different from a traditional search marketer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Traditional search marketers focus on campaign execution and optimization within Google and Bing. Search Intelligence Engineers build the systems that measure visibility across the entire AI search ecosystem (including ChatGPT, Gemini, Perplexity), prove ROI with CFO-ready attribution, and unify execution under one AI-powered platform. They are engineers first, marketers second.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is the average Search Intelligence Engineer salary?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'As a pioneering role, Search Intelligence Engineer compensation varies based on technical depth and business impact. Engineers who can build attribution systems with 98% data match confidence and demonstrate measurable ROI improvements typically command premium compensation in the $150K-$250K+ range, reflecting the combination of AI/ML engineering and search marketing expertise.'
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
        name: 'What is a Search Intelligence Engineer?',
        item: 'https://hendricks.ai/insights/what-is-search-intelligence-engineer'
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
                A Search Intelligence Engineer is a specialized role that combines search marketing expertise with AI/ML engineering to build systems that measure, attribute, and optimize visibility across traditional and AI-powered search engines. This role represents the evolution of search marketing from campaign execution to engineering-led measurement science.
              </p>
            </div>

            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              The search landscape has fundamentally changed. Your customers don't just use Google anymore. They search in ChatGPT, ask questions in Gemini, research in Perplexity, and use Bing AI Chat. Traditional search marketers focus on optimizing Google Ads campaigns. <strong className="text-white">Search Intelligence Engineers build the systems that prove which channels actually drive revenue.</strong>
            </p>

            <p className="text-gray-300 leading-relaxed">
              This is the story of how a new role emerged—and why it matters for every B2B company trying to prove marketing ROI in the AI search era.
            </p>

            <h2 className="text-3xl font-bold text-white mt-12 mb-6">The Problem: Marketing Can't Prove What Works</h2>

            <p className="text-gray-300 leading-relaxed">
              Here's the painful reality most B2B marketing leaders face:
            </p>

            <ul className="space-y-3 text-gray-300 my-6">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">→</span>
                <span>You're spending $50K/month on search, but can't prove how much pipeline it generates</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">→</span>
                <span>Your Google Ads dashboard shows "conversions," but your CFO wants to see ARR</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">→</span>
                <span>You have no idea if your brand appears in ChatGPT when prospects research solutions</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">→</span>
                <span>Your agency reports "impression share" but can't measure actual visibility</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">→</span>
                <span>Google and Bing are managed separately, with no unified view of search performance</span>
              </li>
            </ul>

            <p className="text-gray-300 leading-relaxed">
              Traditional search marketers weren't trained to solve these problems. They were trained to optimize campaigns, improve Quality Scores, and lower CPCs. <strong className="text-white">But none of that answers the CFO's question: "How much revenue did search generate this quarter?"</strong>
            </p>

            <h2 className="text-3xl font-bold text-white mt-12 mb-6">The Solution: Engineering-Led Search Intelligence</h2>

            <p className="text-gray-300 leading-relaxed mb-6">
              A Search Intelligence Engineer approaches search differently. Instead of just running campaigns, they build measurement systems. Instead of reporting on clicks and impressions, they connect every dollar to pipeline and revenue.
            </p>

            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 my-8">
              <h3 className="text-2xl font-bold text-white mb-4">What Makes a Search Intelligence Engineer Different</h3>

              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-6">
                  <h4 className="text-xl font-semibold text-cyan-400 mb-2">1. They Build Systems, Not Just Campaigns</h4>
                  <p className="text-gray-300">
                    Traditional marketers optimize existing platforms. Search Intelligence Engineers build custom attribution engines, visibility measurement systems, and unified execution platforms that connect search spend to business outcomes.
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-6">
                  <h4 className="text-xl font-semibold text-cyan-400 mb-2">2. They Measure the Entire AI Search Ecosystem</h4>
                  <p className="text-gray-300">
                    While traditional SEO focuses on Google rankings, Search Intelligence Engineers measure brand visibility across Google, Bing, ChatGPT, Gemini, and Perplexity—providing a complete picture of how buyers discover your brand.
                  </p>
                </div>

                <div className="border-l-4 border-cyan-500 pl-6">
                  <h4 className="text-xl font-semibold text-cyan-400 mb-2">3. They Prove ROI with CFO-Ready Data</h4>
                  <p className="text-gray-300">
                    Instead of marketing metrics like "click-through rate," they deliver business metrics like "98% data match confidence attribution" and "search-attributed ARR." They speak finance, not just marketing.
                  </p>
                </div>

                <div className="border-l-4 border-pink-500 pl-6">
                  <h4 className="text-xl font-semibold text-cyan-400 mb-2">4. They Use AI/ML Engineering Skills</h4>
                  <p className="text-gray-300">
                    Search Intelligence Engineers write Python, build machine learning models, integrate APIs, and design data pipelines. They're software engineers who happen to specialize in search visibility measurement.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-white mt-12 mb-6">The Brandon Lincoln Hendricks Story: Pioneering the Role</h2>

            <p className="text-gray-300 leading-relaxed">
              I didn't set out to create a new role. I set out to solve a problem: <strong className="text-white">B2B companies were spending millions on search with no idea what actually worked.</strong>
            </p>

            <p className="text-gray-300 leading-relaxed">
              After years of running search campaigns and seeing the same frustrations—CMOs who couldn't prove ROI, CFOs who distrusted marketing data, sales teams who ignored "marketing-qualified" leads—I realized the industry needed a different approach.
            </p>

            <p className="text-gray-300 leading-relaxed">
              So I earned my <Link href="/about" className="text-cyan-400 hover:text-cyan-300 underline">Google Cloud Machine Learning Engineer certification</Link> and built what became the first unified visibility measurement system across Google, Bing, ChatGPT, Gemini, and Perplexity.
            </p>

            <div className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 rounded-xl p-8 my-8 border border-cyan-500/30">
              <h3 className="text-2xl font-bold text-white mb-4">The Three Systems I Built</h3>

              <div className="space-y-4 text-gray-300">
                <div>
                  <h4 className="text-lg font-semibold text-cyan-400 mb-2">1. Visibility Audit System</h4>
                  <p>Measures where your brand appears across Google, Bing, ChatGPT, Gemini, and Perplexity. Shows exactly where you show up, where competitors win, and which gaps exist in your visibility.</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-cyan-400 mb-2">2. Attribution Engine</h4>
                  <p>Connects every marketing dollar to pipeline, ARR, and revenue with 98% data match confidence. Proves true lift from search spend using multi-touch attribution and incrementality testing.</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-cyan-400 mb-2">3. AI Visibility Execution Platform</h4>
                  <p>Unifies Google and Bing under one AI-powered system instead of separate silos. Delivers +67% efficiency gains, -61% lower cost-per-lead, and 2.3X more qualified pipeline.</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-cyan-500/30">
                <p className="text-cyan-400 font-semibold">
                  These systems are what Hendricks.AI clients use today → <Link href="/solutions" className="underline hover:text-cyan-300">See how they work</Link>
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-white mt-12 mb-6">Required Skills for Search Intelligence Engineers</h2>

            <p className="text-gray-300 leading-relaxed mb-6">
              Becoming a Search Intelligence Engineer requires a unique combination of skills that span marketing, engineering, and data science:
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-cyan-400 mb-4">Marketing Expertise</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">✓</span>
                    <span>Google Ads & Bing Ads platform mastery</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">✓</span>
                    <span>SEO and technical SEO fundamentals</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">✓</span>
                    <span>Understanding of B2B buyer journeys</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">✓</span>
                    <span>Conversion rate optimization (CRO)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">✓</span>
                    <span>Performance marketing metrics and KPIs</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-purple-400 mb-4">AI/ML Engineering</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">✓</span>
                    <span>Python programming and scripting</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">✓</span>
                    <span>Machine learning fundamentals</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">✓</span>
                    <span>Statistical analysis and modeling</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">✓</span>
                    <span>API integration and automation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">✓</span>
                    <span>Cloud platforms (Google Cloud, AWS, Azure)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-blue-400 mb-4">Data Engineering</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">✓</span>
                    <span>ETL pipelines and data transformation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">✓</span>
                    <span>Data warehousing (BigQuery, Snowflake)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">✓</span>
                    <span>SQL and database management</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">✓</span>
                    <span>Data visualization (Looker, Tableau)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">✓</span>
                    <span>Real-time data processing</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-pink-400 mb-4">Business Intelligence</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-start">
                    <span className="text-pink-400 mr-2">✓</span>
                    <span>Multi-touch attribution modeling</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-400 mr-2">✓</span>
                    <span>CFO-ready financial reporting</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-400 mr-2">✓</span>
                    <span>ROI and ROAS calculation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-400 mr-2">✓</span>
                    <span>Incrementality testing and experimentation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-400 mr-2">✓</span>
                    <span>Business stakeholder communication</span>
                  </li>
                </ul>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-white mt-12 mb-6">Search Intelligence Engineer Salary & Career Path</h2>

            <p className="text-gray-300 leading-relaxed">
              As a pioneering role, Search Intelligence Engineer compensation reflects the rare combination of technical and business skills required:
            </p>

            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 my-8">
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-cyan-400 mb-2">Entry-Level Search Intelligence Engineer</h4>
                  <p className="text-gray-300 mb-2">$80K - $120K</p>
                  <p className="text-gray-400 text-sm">Focus: Campaign management, basic data analysis, learning attribution systems</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-cyan-400 mb-2">Mid-Level Search Intelligence Engineer</h4>
                  <p className="text-gray-300 mb-2">$120K - $180K</p>
                  <p className="text-gray-400 text-sm">Focus: Building attribution models, API integrations, multi-platform measurement</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-cyan-400 mb-2">Senior Search Intelligence Engineer</h4>
                  <p className="text-gray-300 mb-2">$180K - $250K+</p>
                  <p className="text-gray-400 text-sm">Focus: System architecture, 98% data match confidence attribution, CFO-ready measurement, strategic visibility optimization</p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-white mt-12 mb-6">The Future: Why Every B2B Company Needs Search Intelligence</h2>

            <p className="text-gray-300 leading-relaxed">
              The AI search revolution isn't coming—it's here. ChatGPT now handles over 200 million weekly active users. Google's AI Overviews appear on billions of searches. Gemini and Perplexity are reshaping how professionals research solutions.
            </p>

            <p className="text-gray-300 leading-relaxed">
              <strong className="text-white">If you're only measuring Google rankings, you're missing 30-40% of the search ecosystem.</strong>
            </p>

            <p className="text-gray-300 leading-relaxed">
              B2B companies that thrive in this environment will be those that:
            </p>

            <ul className="space-y-3 text-gray-300 my-6">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">→</span>
                <span>Measure visibility across the entire AI search ecosystem, not just Google</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">→</span>
                <span>Prove ROI with CFO-ready attribution, not marketing vanity metrics</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">→</span>
                <span>Unify search execution under one system instead of managing silos</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">→</span>
                <span>Invest in engineering-led measurement, not just campaign optimization</span>
              </li>
            </ul>

            <p className="text-gray-300 leading-relaxed">
              This is what Search Intelligence Engineers build. This is what Hendricks.AI delivers.
            </p>

            <div className="bg-gradient-to-r from-blue-950 via-purple-950 to-blue-950 rounded-2xl p-8 my-12 border border-cyan-500/30">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to See Search Intelligence in Action?</h3>
              <p className="text-gray-300 mb-6">
                Book a strategy session and see how Hendricks.AI's Search Intelligence systems measure your visibility across Google, Bing, ChatGPT, Gemini, and Perplexity—then prove exactly how much pipeline and revenue search drives.
              </p>
              <Link
                href="/contact"
                className="inline-block px-8 py-4 bg-white text-gray-900 hover:bg-gray-100 shadow-lg shadow-cyan-500/50 font-bold rounded-full hover:scale-[1.03] transition-transform"
              >
                Book Your Strategy Session →
              </Link>
            </div>

            <h2 className="text-3xl font-bold text-white mt-12 mb-6">Frequently Asked Questions</h2>

            <div className="space-y-6">
              <div className="border-l-4 border-cyan-500 pl-6 py-2">
                <h4 className="text-lg font-semibold text-white mb-2">How do I become a Search Intelligence Engineer?</h4>
                <p className="text-gray-300">
                  Start by building strong foundations in both search marketing and data engineering. Get certified in Google Ads and Google Analytics, learn Python and SQL, and practice building attribution models. Consider pursuing a Google Cloud Machine Learning Engineer certification to develop the AI/ML skills needed for visibility measurement systems.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-6 py-2">
                <h4 className="text-lg font-semibold text-white mb-2">Is a Search Intelligence Engineer the same as an SEO specialist?</h4>
                <p className="text-gray-300">
                  No. SEO specialists focus on optimizing websites to rank higher in traditional search engines like Google. Search Intelligence Engineers build systems that measure brand visibility across the entire AI-powered search ecosystem (Google, Bing, ChatGPT, Gemini, Perplexity) and prove ROI through attribution engineering.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-6 py-2">
                <h4 className="text-lg font-semibold text-white mb-2">What companies hire Search Intelligence Engineers?</h4>
                <p className="text-gray-300">
                  Currently, most Search Intelligence Engineers work at specialized firms like Hendricks.AI or within advanced B2B SaaS companies that require CFO-ready attribution and multi-platform visibility measurement. As the AI search ecosystem grows, demand for this role will expand across enterprise B2B organizations.
                </p>
              </div>

              <div className="border-l-4 border-pink-500 pl-6 py-2">
                <h4 className="text-lg font-semibold text-white mb-2">Can I hire Hendricks.AI instead of building internal Search Intelligence capabilities?</h4>
                <p className="text-gray-300">
                  Yes. Many B2B companies partner with Hendricks.AI rather than building internal Search Intelligence teams. We provide the complete stack: visibility measurement across Google, Bing, ChatGPT, Gemini, and Perplexity; attribution engineering with 98% data confidence; and unified search execution. <Link href="/contact" className="text-cyan-400 hover:text-cyan-300 underline">Book a strategy session</Link> to discuss your needs.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800">
            <h3 className="text-2xl font-bold text-white mb-4">Explore More Search Intelligence Insights</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/solutions"
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-cyan-400/50 transition-all"
              >
                <h4 className="text-lg font-semibold text-cyan-400 mb-2">Our Solutions →</h4>
                <p className="text-gray-400 text-sm">See how Visibility Audit, Attribution Engine, and AI Visibility Execution work together</p>
              </Link>
              <Link
                href="/about"
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-cyan-400/50 transition-all"
              >
                <h4 className="text-lg font-semibold text-cyan-400 mb-2">Meet Brandon →</h4>
                <p className="text-gray-400 text-sm">Learn more about the founder who pioneered Search Intelligence Engineering</p>
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
