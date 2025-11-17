'use client'

import { useState } from 'react'
import Link from 'next/link'
import Script from 'next/script'
import Navigation from '../components/navigation'
import Footer from '../components/Footer'
import StickyMobileCTA from '../components/sticky-mobile-cta'
import { BreadcrumbSchema } from '../components/seo-improvements'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    monthlySpend: '',
    primaryGoal: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const monthlySpendOptions = [
    '$5K - $15K/month',
    '$15K - $50K/month',
    '$50K - $100K/month',
    '$100K - $250K/month',
    '$250K+/month'
  ]

  const primaryGoalOptions = [
    'Measure visibility across AI search engines',
    'Attribute pipeline back to search',
    'Unify Google + Bing under one system',
    'See coverage across ChatGPT, Gemini, Perplexity',
    'Need guidance — not sure where to start'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus('success')

        // Reset form after success
        setTimeout(() => {
          setFormData({
            fullName: '',
            company: '',
            email: '',
            monthlySpend: '',
            primaryGoal: '',
            message: ''
          })
          setSubmitStatus('idle')
        }, 5000)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Schema markup for contact page
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Hendricks.AI - Book Your Strategy Session',
    description: 'Book a strategy session with the AI Search Visibility & Measurement Firm for B2B Growth. Measure visibility, attribute pipeline, and amplify performance.',
    url: 'https://hendricks.ai/contact',
    mainEntity: {
      '@type': 'Organization',
      name: 'Hendricks.AI',
      url: 'https://hendricks.ai',
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: 'hello@hendricks.ai',
        availableLanguage: 'English'
      }
    }
  }

  return (
    <>
      <Script
        id="contact-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactSchema)
        }}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://hendricks.ai' },
          { name: 'Contact', url: 'https://hendricks.ai/contact' }
        ]}
      />
    <main className="min-h-screen bg-gradient-to-br from-[#010414] via-[#0b1f32] to-[#1b0034] text-white">
      <Navigation />
      <StickyMobileCTA />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(147,51,234,0.1),transparent_50%)]"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-[1.1] tracking-tight">
            <span className="block text-white mb-2 animate-fade-in-1">
              Let's Measure What Matters.
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 animate-fade-in-2">
            Book a Strategy Session with the AI Search Visibility & Measurement Firm for B2B Growth.
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto animate-fade-in-3">
            We unify marketing, data, and AI to measure visibility, prove ROI, and amplify performance across Google, Bing, ChatGPT, Gemini, and Perplexity.
          </p>
        </div>
      </section>

      {/* Main Form + What You'll Receive */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Strategy Session Form: 2 columns */}
            <div className="lg:col-span-2">
              <div className="bg-[rgba(255,255,255,0.03)] backdrop-blur-sm p-8 sm:p-10 rounded-2xl border border-[rgba(255,255,255,0.05)]">
                <h2 className="text-3xl font-bold mb-2">Book Your Strategy Session</h2>
                <p className="text-gray-400 mb-8">
                  Tell us about your business and we'll prepare a custom session tailored to your goals.
                </p>

                {submitStatus === 'success' ? (
                  <div className="bg-green-900/20 border border-green-500/50 p-6 rounded-xl">
                    <h3 className="text-2xl font-bold text-green-400 mb-2">Thank You!</h3>
                    <p className="text-gray-300">
                      We've received your request. Our team will reach out within 24 hours to confirm your strategy session.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        placeholder="John Smith"
                        className="w-full px-4 py-3 bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] rounded-lg focus:outline-none focus:border-cyan-400 transition-colors text-white placeholder-gray-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                        Company *
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        required
                        placeholder="ABC Company"
                        className="w-full px-4 py-3 bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] rounded-lg focus:outline-none focus:border-cyan-400 transition-colors text-white placeholder-gray-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="john@company.com"
                        className="w-full px-4 py-3 bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] rounded-lg focus:outline-none focus:border-cyan-400 transition-colors text-white placeholder-gray-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="monthlySpend" className="block text-sm font-medium text-gray-300 mb-2">
                        Monthly Search Spend *
                      </label>
                      <select
                        id="monthlySpend"
                        name="monthlySpend"
                        value={formData.monthlySpend}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] rounded-lg focus:outline-none focus:border-cyan-400 transition-colors text-white"
                      >
                        <option value="">Select monthly spend range</option>
                        {monthlySpendOptions.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="primaryGoal" className="block text-sm font-medium text-gray-300 mb-2">
                        Primary Goal *
                      </label>
                      <select
                        id="primaryGoal"
                        name="primaryGoal"
                        value={formData.primaryGoal}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] rounded-lg focus:outline-none focus:border-cyan-400 transition-colors text-white"
                      >
                        <option value="">What are you trying to achieve?</option>
                        {primaryGoalOptions.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                        Additional Details (Optional)
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] rounded-lg focus:outline-none focus:border-cyan-400 transition-colors resize-none text-white placeholder-gray-500"
                        placeholder="Tell us more about your current search marketing challenges or questions you'd like us to address in the session..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-4 px-6 rounded-full font-semibold text-lg transition-all duration-300 ${
                        isSubmitting
                          ? 'bg-gray-700 cursor-not-allowed'
                          : 'bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 hover:scale-[1.02] transform animate-glow'
                      }`}
                    >
                      {isSubmitting ? 'Submitting...' : 'Book My Strategy Session →'}
                    </button>

                    <p className="text-sm text-gray-400 text-center mt-4">
                      We'll confirm your session within 24 hours • No commitment required
                    </p>
                  </form>
                )}
              </div>
            </div>

            {/* What You'll Receive: 1 column */}
            <div className="space-y-6">
              <div className="bg-[rgba(255,255,255,0.03)] backdrop-blur-sm p-8 rounded-2xl border border-[rgba(255,255,255,0.05)]">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  What You'll Receive
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-cyan-400 text-xl mr-3 mt-1">✓</span>
                    <div>
                      <p className="font-semibold text-white mb-1">Visibility Audit Preview</p>
                      <p className="text-sm text-gray-400">See where your brand appears across Google, Bing, ChatGPT, Gemini, and Perplexity</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 text-xl mr-3 mt-1">✓</span>
                    <div>
                      <p className="font-semibold text-white mb-1">Attribution Framework Review</p>
                      <p className="text-sm text-gray-400">Learn how to connect marketing dollars to pipeline, ARR, and revenue</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 text-xl mr-3 mt-1">✓</span>
                    <div>
                      <p className="font-semibold text-white mb-1">Benchmark Insights</p>
                      <p className="text-sm text-gray-400">Compare your visibility and attribution performance against industry leaders</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 text-xl mr-3 mt-1">✓</span>
                    <div>
                      <p className="font-semibold text-white mb-1">AI Search Recommendations</p>
                      <p className="text-sm text-gray-400">Custom roadmap for improving coverage across the AI search ecosystem</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Quick Contact Info */}
              <div className="bg-[rgba(255,255,255,0.03)] backdrop-blur-sm p-6 rounded-2xl border border-[rgba(255,255,255,0.05)]">
                <h4 className="font-semibold mb-4 text-white">Prefer Email?</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-cyan-400 text-lg">📧</span>
                    <a href="mailto:hello@hendricks.ai" className="text-gray-300 hover:text-cyan-400 transition-colors">
                      hello@hendricks.ai
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-cyan-400 text-lg">📍</span>
                    <span className="text-gray-300">Houston, Texas</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Credibility Section */}
      <section className="py-20 bg-black/30 backdrop-blur-sm border-t border-[rgba(255,255,255,0.05)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Trusted by B2B Growth Leaders
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              We've helped SaaS, FinTech, and Enterprise companies measure and amplify their visibility across the AI search ecosystem.
            </p>
          </div>

          {/* Partner Logos Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12 items-center justify-items-center">
            {['SolarWinds', 'Workday', 'Foursquare', 'Evernote', 'Warby Parker'].map((company) => (
              <div key={company} className="flex items-center justify-center p-4 bg-[rgba(255,255,255,0.03)] rounded-lg border border-[rgba(255,255,255,0.05)] w-full h-20">
                <span className="text-gray-400 font-semibold text-sm">{company}</span>
              </div>
            ))}
          </div>

          {/* Tech & Credentials */}
          <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-400 mb-8">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              Built on Google Cloud
            </span>
            <span className="text-gray-600">•</span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
              Powered by Vertex AI
            </span>
            <span className="text-gray-600">•</span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
              Member of the Ahrefs Customer Advisory Board
            </span>
          </div>

          {/* Founder Credential */}
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              Led by <span className="text-white font-semibold">Brandon Lincoln Hendricks</span>, Certified Google Cloud Machine Learning Engineer
            </p>
          </div>
        </div>
      </section>

      {/* Global Presence Section */}
      <section className="py-16 bg-gradient-to-br from-[rgba(59,130,246,0.05)] to-[rgba(147,51,234,0.05)] border-t border-[rgba(255,255,255,0.05)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Global Reach, Rooted in Houston
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Headquartered in Houston, Texas, we serve B2B growth leaders worldwide — from SaaS startups to Fortune 500 enterprises.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-400">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌍</span>
              <span>Serving Clients Globally</span>
            </div>
            <span className="hidden sm:block text-gray-600">•</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏢</span>
              <span>Houston, Texas HQ</span>
            </div>
            <span className="hidden sm:block text-gray-600">•</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🤝</span>
              <span>Remote-First Team</span>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#010414] via-[#0b1f32] to-[#1b0034] border-t border-[rgba(255,255,255,0.05)]">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
            <span className="text-white">Ready to </span>
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Quantify Your Visibility?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join the B2B leaders who measure what matters, attribute with confidence, and amplify performance across the AI search ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 text-white font-bold rounded-full hover:scale-[1.03] transition-transform shadow-lg animate-glow"
            >
              Book Strategy Session →
            </a>
            <Link
              href="/solutions"
              className="px-8 py-4 bg-transparent border-2 border-[rgba(255,255,255,0.2)] text-white font-semibold rounded-full hover:border-cyan-400 hover:bg-[rgba(255,255,255,0.05)] transition-all duration-300"
            >
              Explore Our System
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
    </>
  )
}
