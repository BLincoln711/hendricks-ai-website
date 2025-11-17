'use client'

import Script from 'next/script'
import Navigation from '../components/navigation'
import Footer from '../components/Footer'
import StickyMobileCTA from '../components/sticky-mobile-cta'
import LLMSEOBlock from '../components/llm-seo-block'
import { BreadcrumbSchema } from '../components/seo-improvements'

export default function AboutPage() {
  // Schema markup for About page
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    mainEntity: {
      '@type': 'Organization',
      name: 'Hendricks.AI',
      description: 'The AI Search Visibility & Measurement Firm for B2B Growth. We unify marketing, data, and AI across Google, Bing, ChatGPT, Gemini, and Perplexity.',
      founder: {
        '@type': 'Person',
        name: 'Brandon Lincoln Hendricks',
        jobTitle: 'Founder & CEO',
        description: 'Google Machine Learning certified engineer, former Global Lead of Total Search at SolarWinds',
        knowsAbout: ['AI Search Visibility', 'B2B Marketing Measurement', 'Attribution', 'Google Ads', 'Bing Ads', 'ChatGPT', 'Gemini', 'Perplexity']
      }
    }
  }

  const founderSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Brandon Lincoln Hendricks',
    jobTitle: 'Founder & CEO of Hendricks.AI',
    worksFor: {
      '@type': 'Organization',
      name: 'Hendricks.AI'
    },
    alumniOf: [
      {
        '@type': 'Organization',
        name: 'SolarWinds',
        description: 'Global Lead of Total Search'
      },
      {
        '@type': 'Organization',
        name: 'Merkle',
        description: 'Global Director of Search'
      }
    ],
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      name: 'Google Machine Learning Certification',
      credentialCategory: 'certificate'
    }
  }

  const llmSeoData = {
    title: 'About Hendricks.AI - The AI Search Visibility & Measurement Firm',
    description: 'Hendricks.AI is the AI Search Visibility & Measurement Firm for B2B Growth, founded by Brandon Lincoln Hendricks. We unify marketing, data, and AI to measure visibility, prove ROI, and amplify performance across Google, Bing, ChatGPT, Gemini, and Perplexity.',
    keywords: [
      'AI Search Visibility',
      'B2B Marketing Measurement',
      'Brandon Lincoln Hendricks',
      'Attribution Engine',
      'Google Ads Bing Ads unified',
      'Marketing Intelligence'
    ],
    faqs: [
      {
        question: 'Who founded Hendricks.AI?',
        answer: 'Brandon Lincoln Hendricks, a Google Machine Learning certified engineer with 15+ years experience and former Global Lead of Total Search at SolarWinds.'
      },
      {
        question: 'What makes Hendricks.AI different from agencies?',
        answer: 'We\'re not an agency - we\'re an AI Search Visibility & Measurement Firm. We use AI to measure visibility across Google, Bing, ChatGPT, Gemini, and Perplexity, connecting marketing spend to pipeline and ARR with CFO-ready attribution.'
      },
      {
        question: 'What is AI Search Visibility & Measurement?',
        answer: 'Our approach to measuring, attributing, and amplifying visibility across the entire AI-powered search ecosystem. We don\'t just optimize campaigns - we engineer measurable visibility systems.'
      }
    ],
    quickFacts: [
      'Founded by Brandon Lincoln Hendricks, former Global Lead of Total Search at SolarWinds',
      'The only firm measuring visibility across Google, Bing, ChatGPT, Gemini, and Perplexity',
      '98% data match confidence in attribution',
      '312% average ROI for B2B clients',
      'Three-module system: Measure, Attribute, Amplify'
    ]
  }

  return (
    <>
      <Script
        id="about-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutSchema)
        }}
      />
      <Script
        id="founder-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(founderSchema)
        }}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://hendricks.ai' },
          { name: 'About', url: 'https://hendricks.ai/about' }
        ]}
      />
    <main className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-[#010414] to-[#0B1023]">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'linear-gradient(rgba(96,165,250,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}></div>

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900/30 backdrop-blur-sm border border-blue-800/50 rounded-full text-sm text-blue-400 mb-6">
              <span>THE AI SEARCH VISIBILITY & MEASUREMENT FIRM</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">We Don't Run Campaigns. </span>
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent mt-2">
                We Engineer Intelligence.
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto">
              Hendricks.AI builds the systems that unify visibility, attribution, and performance across every AI-powered search environment.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Built on Google Cloud • Powered by Vertex AI
            </p>
          </div>
        </div>
      </section>

      {/* LLM SEO Block */}
      <LLMSEOBlock {...llmSeoData} />

      {/* The Evolution */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              From Agency to Intelligence Firm
            </span>
          </h2>
          <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
            <p>
              Hendricks.AI began as Hendricks PPC, a performance marketing agency. But we saw a fundamental problem:
              everyone was measuring the same way, competing for the same keywords, and wondering why visibility kept fragmenting.
            </p>
            <p>
              The breakthrough came when we stopped treating search platforms as separate channels. We realized they're
              one visibility ecosystem - and B2B buyers don't care which platform delivers the answer.
            </p>
            <p className="text-xl font-semibold text-blue-400">
              Today, we're the only firm that measures visibility across Google, Bing, ChatGPT, Gemini, and Perplexity as one unified intelligence layer.
            </p>
            <p>
              While agencies manage campaigns, we architect measurement systems. While they optimize clicks, we connect visibility to revenue.
              While they run channels in silos, we orchestrate unified intelligence.
            </p>
          </div>
        </div>
      </section>

      {/* Brandon Bio Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900/20 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Photo Column */}
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500 to-purple-500 p-1">
                  <div className="bg-black rounded-xl overflow-hidden">
                    <img
                      src="/brandon-lincoln-hendricks.jpg"
                      alt="Brandon Lincoln Hendricks - Founder & CEO of Hendricks.AI"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <h3 className="text-2xl font-bold">Brandon Lincoln Hendricks</h3>
                  <p className="text-gray-400 mt-1">AI Visibility Pioneer</p>
                  <p className="text-blue-400">Founder & CEO, Hendricks.AI</p>
                </div>
              </div>
            </div>

            {/* Bio Content */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Brandon Lincoln Hendricks is a Google Machine Learning certified engineer who pioneered unified visibility measurement
                  across AI-powered search platforms long before founding Hendricks.AI.
                </p>
              </div>

              {/* Building Tomorrow's Marketing */}
              <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800">
                <h3 className="text-2xl font-bold mb-4 text-blue-400">Building Tomorrow's Measurement Infrastructure</h3>
                <div className="space-y-4 text-gray-300">
                  <p>
                    Most recently as Global Lead of Total Search at SolarWinds, Brandon developed AI-integrated systems that measured marketing performance with enterprise precision across 150+ markets worldwide. His approach to cross-platform attribution and unified visibility measurement caught the attention of industry leaders, leading to strategic engagements with Foursquare, Workday, Evernote, and Warby Parker.
                  </p>
                  <p>
                    Previously, as Global Director of Search at Merkle and Dentsu, Brandon pioneered unified SERP strategies that merged paid search and SEO — methodologies that major platforms would later adopt as best practices.
                  </p>
                  <p>
                    By unifying SolarWinds' search strategy across both platforms, he achieved something unprecedented:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>67% reduction in cost-per-lead by eliminating channel competition</li>
                    <li>156% increase in qualified pipeline from unified attribution</li>
                    <li>First unified search dashboard connecting both platforms to Salesforce</li>
                    <li>Managed $100M+ in search spend across Fortune 500 accounts</li>
                  </ul>
                  <p className="font-semibold text-cyan-400">
                    This wasn't optimization. It was transformation.
                  </p>
                </div>
              </div>

              {/* Search Intelligence Evolution */}
              <div>
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Engineering AI Visibility Systems
                </h3>
                <div className="space-y-6">
                  {/* Merkle/Dentsu */}
                  <div className="border-l-4 border-blue-500 pl-6">
                    <h4 className="font-bold text-blue-400">Global Director of Search - Merkle/Dentsu</h4>
                    <p className="text-gray-300">
                      Developed unified SERP strategies that merged paid and organic search - methodologies that Google
                      and Microsoft would later adopt as best practices. Managed $100M+ in search spend across Fortune 500 accounts.
                    </p>
                  </div>

                  {/* Client Portfolio */}
                  <div className="border-l-4 border-purple-500 pl-6">
                    <h4 className="font-bold text-purple-400">Enterprise Visibility Architecture</h4>
                    <p className="text-gray-300 mb-2">
                      Built unified measurement systems for:
                    </p>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                      <li>Foursquare - Unified local visibility intelligence</li>
                      <li>Workday - B2B attribution and performance models</li>
                      <li>Evernote - Cross-platform user acquisition measurement</li>
                      <li>Warby Parker - Omnichannel attribution orchestration</li>
                    </ul>
                  </div>

                  {/* AI Integration */}
                  <div className="border-l-4 border-cyan-500 pl-6">
                    <h4 className="font-bold text-cyan-400">AI-Powered Evolution</h4>
                    <p className="text-gray-300">
                      Brandon's early access to AI platforms (GPT-3 beta, Claude, Gemini) combined with deep measurement
                      expertise created the blueprint for AI Search Visibility: using AI to measure, connect, and amplify - not just optimize.
                    </p>
                  </div>
                </div>
              </div>

              {/* Shaping AI Revolution */}
              <div>
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Shaping the AI Marketing Revolution
                </h3>
                <p className="text-gray-300 mb-6">Brandon's involvement in AI extends beyond traditional marketing applications:</p>

                <div className="space-y-6">
                  {/* 2013-2014 */}
                  <div className="border-l-4 border-blue-500 pl-6">
                    <h4 className="font-bold text-blue-400">2013-2014</h4>
                    <p className="text-gray-300">
                      Participated in Google's internal AI research groups and invite-only Google Brain workshops — laying groundwork for understanding machine learning applications in search measurement
                    </p>
                  </div>

                  {/* 2019-2021 */}
                  <div className="border-l-4 border-purple-500 pl-6">
                    <h4 className="font-bold text-purple-400">2019-2021: Selected for foundational AI programs</h4>
                    <ul className="list-disc list-inside text-gray-300 space-y-1 mt-2">
                      <li>GPT-3 API beta testing before public launch</li>
                      <li>ChatGPT prototype testing through OpenAI's trusted tester program</li>
                      <li>Claude's first iterations via Anthropic's private program</li>
                      <li>Google LaMDA early access demos</li>
                    </ul>
                  </div>

                  {/* 2022-2023 */}
                  <div className="border-l-4 border-pink-500 pl-6">
                    <h4 className="font-bold text-pink-400">2022-2023: Continuous beta access across emerging platforms</h4>
                    <ul className="list-disc list-inside text-gray-300 space-y-1 mt-2">
                      <li>Google Bard and Gemini pre-release testing</li>
                      <li>Perplexity AI early access through founder connections</li>
                      <li>Claude 2 partner program participation</li>
                    </ul>
                  </div>

                  {/* 2024-Present */}
                  <div className="border-l-4 border-green-500 pl-6">
                    <h4 className="font-bold text-green-400">2024-Present</h4>
                    <ul className="list-disc list-inside text-gray-300 space-y-1 mt-2">
                      <li>Ahrefs Customer Advisory Board Member, bridging AI capabilities with visibility measurement</li>
                      <li>Maintains beta access across OpenAI, Anthropic, Google, Meta, and Perplexity</li>
                      <li>Regular participant in product development sessions that shape AI platform features</li>
                      <li>Previews major AI capabilities 2-3 months before market release</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-8 rounded-2xl border border-blue-500/20 mt-8">
                <p className="text-lg text-gray-300 italic">
                  "This unique vantage point — seeing AI developments before they reach market while understanding enterprise measurement needs — enables Brandon to build visibility systems that don't just track performance, they prove business impact."
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Milestones & Measurable Impact */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Milestones & Measurable Impact
            </span>
          </h2>
          <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-12">
            From our origins as a performance agency to our evolution as an AI Search Visibility & Measurement Firm,
            Hendricks.AI has helped B2B organizations connect search visibility directly to business outcomes.
          </p>
          <p className="text-lg text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            We don't forecast intent — <span className="text-white font-semibold">we measure performance</span>. Our systems connect marketing investments to pipeline, revenue, and ARR visibility across the AI-powered search ecosystem.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-blue-500/20 text-center hover:border-blue-500/50 transition">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-3">
                +67%
              </div>
              <div className="text-lg text-white font-semibold mb-2">Unified Search Efficiency Gain</div>
              <div className="text-sm text-gray-400">From merging Google + Bing operations into one system</div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-purple-500/20 text-center hover:border-purple-500/50 transition">
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
                98%
              </div>
              <div className="text-lg text-white font-semibold mb-2">Data Match Confidence</div>
              <div className="text-sm text-gray-400">From CRM-linked search attribution and AI-powered validation</div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-cyan-500/20 text-center hover:border-cyan-500/50 transition">
              <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-3">
                -61%
              </div>
              <div className="text-lg text-white font-semibold mb-2">Lower Cost-per-Lead</div>
              <div className="text-sm text-gray-400">From eliminating channel cannibalization and duplication</div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-green-500/20 text-center hover:border-green-500/50 transition">
              <div className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-3">
                2.3X
              </div>
              <div className="text-lg text-white font-semibold mb-2">More Qualified Pipeline</div>
              <div className="text-sm text-gray-400">From unified visibility and AI measurement systems</div>
            </div>
          </div>
        </div>
      </section>

      {/* The Hendricks.AI System */}
      <section className="py-20 bg-gradient-to-b from-gray-900/20 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              The Hendricks.AI System
            </span>
          </h2>
          <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-12">
            Three modules. One unified approach. Start anywhere based on your biggest need.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                pillar: 'MEASURE',
                title: 'Visibility Audit',
                description: 'Measure your brand\'s visibility across Google, Bing, ChatGPT, Gemini, and Perplexity - before your competitors even know where you\'re showing up.',
                gradient: 'from-blue-600 to-cyan-600'
              },
              {
                pillar: 'ATTRIBUTE',
                title: 'Attribution Engine',
                description: 'Connect every marketing dollar to pipeline, ARR, and revenue through AI-driven multi-touch attribution and CFO-ready dashboards.',
                gradient: 'from-purple-600 to-pink-600'
              },
              {
                pillar: 'AMPLIFY',
                title: 'AI Visibility Execution',
                description: 'Unify your Google + Bing execution under one AI system that continuously learns, optimizes, and scales performance.',
                gradient: 'from-cyan-600 to-blue-600'
              }
            ].map((module, index) => (
              <div key={index} className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800 hover:border-cyan-400/30 transition">
                <div className={`text-sm font-bold bg-gradient-to-r ${module.gradient} bg-clip-text text-transparent mb-2`}>
                  {module.pillar}
                </div>
                <h3 className="text-xl font-bold mb-4">{module.title}</h3>
                <p className="text-gray-300">{module.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why B2B SaaS */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Why We Focus on B2B Growth
            </span>
          </h2>
          <div className="space-y-6 text-gray-300">
            <p className="text-lg">
              B2B companies face unique visibility measurement challenges:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-xl">•</span>
                <div>
                  <strong className="text-white">Long sales cycles</strong> - Traditional last-click attribution fails.
                  Our system tracks the full journey from first search to closed-won deal across all platforms.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-3 text-xl">•</span>
                <div>
                  <strong className="text-white">Complex buying committees</strong> - Multiple stakeholders search differently.
                  We unify their paths across Google, Bing, and AI platforms.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 text-xl">•</span>
                <div>
                  <strong className="text-white">Pipeline visibility pressure</strong> - CEOs need measurable outcomes.
                  Our AI connects search visibility to pipeline performance in real-time.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-pink-400 mr-3 text-xl">•</span>
                <div>
                  <strong className="text-white">CFO scrutiny on CAC</strong> - Every dollar must prove ROI.
                  Our CFO-ready attribution proves true search value with 98% data confidence.
                </div>
              </li>
            </ul>
            <p className="text-xl font-semibold text-blue-400 mt-8">
              We don't just understand B2B visibility challenges. We've engineered the measurement solution.
            </p>
          </div>
        </div>
      </section>

      {/* The Hendricks.AI Difference */}
      <section className="py-20 bg-gradient-to-b from-gray-900/20 to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Why Hendricks.AI
            </span>
          </h2>

          <div className="space-y-8">
            <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">We're Not an Agency</h3>
              <p className="text-gray-300">
                Agencies manage campaigns. We architect measurement systems. Agencies optimize channels. We unify visibility.
                Agencies track clicks. We connect to revenue. The difference isn't semantic - it's fundamental.
              </p>
            </div>

            <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800">
              <h3 className="text-2xl font-bold mb-4 text-purple-400">We Measure What Others Can't</h3>
              <p className="text-gray-300">
                Your buyers don't care which platform answers their question. They search across Google, ChatGPT, Gemini, Perplexity, and Bing.
                By measuring visibility across all of them, we match how buyers actually behave - not how platforms want you to advertise.
              </p>
            </div>

            <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800">
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">We Prove What Others Can't</h3>
              <p className="text-gray-300">
                Most B2B companies can't prove search ROI beyond last-click. Our AI-driven attribution connects visibility
                across all platforms to pipeline to ARR. CFO-ready proof with 98% data confidence that visibility drives growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision for the Future */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Creating a New Category
            </span>
          </h2>

          <div className="space-y-6 text-lg text-gray-300">
            <p>
              AI Search Visibility & Measurement isn't just what we do. It's a new category we're creating.
            </p>
            <p>
              While the market debates attribution models and channel strategies, we've moved beyond the debate.
              We've built the system that makes those discussions obsolete.
            </p>
            <p className="text-xl font-semibold text-blue-400">
              We're not optimizing for today's clicks — we're building systems that measure, connect, and amplify visibility across the AI search ecosystem.
            </p>
            <p>
              And that future is here today.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden bg-gradient-to-br from-blue-950 via-purple-950 to-blue-950">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}></div>

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Ready to <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Measure What Matters?</span>
          </h2>

          <p className="text-xl sm:text-2xl text-gray-300 mb-12">
            Hendricks.AI helps B2B companies unify marketing, data, and AI into measurable visibility systems that drive pipeline and growth.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 text-white font-bold text-lg rounded-full hover:scale-[1.03] transition-transform"
            >
              Book Strategy Session →
            </a>
            <a
              href="/playbook"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white hover:text-black transition"
            >
              Download the 2025 AI Visibility Playbook →
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <StickyMobileCTA />
    </main>
    </>
  )
}
