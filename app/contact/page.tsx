'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    budget: '',
    message: '',
    interests: [] as string[]
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const budgetOptions = [
    'Under $5K/month',
    '$5K - $10K/month',
    '$10K - $25K/month',
    '$25K - $50K/month',
    '$50K+/month'
  ]

  const interestOptions = [
    'Demand Intelligence',
    'Google Performance Max',
    'Bing Performance Max',
    'Conversion Optimization',
    'Full-Stack Management'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
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
            firstName: '',
            lastName: '',
            email: '',
            company: '',
            phone: '',
            budget: '',
            message: '',
            interests: []
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

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex-shrink-0">
              <img 
                src="/hendricks_logo.png" 
                alt="Hendricks.AI" 
                className="h-8 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              <Link href="/solutions" className="text-gray-300 hover:text-white transition-colors">Solutions</Link>
              <Link href="/how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</Link>
              <Link href="/results" className="text-gray-300 hover:text-white transition-colors">Results</Link>
              <Link href="/insights" className="text-gray-300 hover:text-white transition-colors">Insights</Link>
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
              <Link href="/contact" className="text-white font-semibold">Contact</Link>
            </div>
            <Link href="/contact" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 transform hover:scale-105">
              Get Intelligence Report
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-black animate-gradient-xy"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Let's Talk Growth
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto">
              Ready to see tomorrow today? Get your free Intelligence Report and discover 
              demand opportunities your competitors won't see for weeks.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form - 2 columns */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-800">
                <h2 className="text-3xl font-bold mb-8">Get Your Free Intelligence Report</h2>
                
                {submitStatus === 'success' ? (
                  <div className="bg-green-900/20 border border-green-500 p-6 rounded-xl">
                    <h3 className="text-2xl font-bold text-green-400 mb-2">Thank You!</h3>
                    <p className="text-gray-300">
                      We've received your request and will send your Intelligence Report within 24 hours. 
                      Check your email for next steps.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                          Business Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
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
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">
                          Monthly Marketing Budget
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                        >
                          <option value="">Select budget range</option>
                          {budgetOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        I'm interested in (select all that apply)
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {interestOptions.map(interest => (
                          <label
                            key={interest}
                            className="flex items-center space-x-3 cursor-pointer group"
                          >
                            <input
                              type="checkbox"
                              checked={formData.interests.includes(interest)}
                              onChange={() => handleInterestToggle(interest)}
                              className="w-5 h-5 bg-gray-800 border-gray-700 rounded focus:ring-blue-500 focus:ring-2"
                            />
                            <span className="text-gray-300 group-hover:text-white transition-colors">
                              {interest}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                        Tell us about your goals
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors resize-none"
                        placeholder="What marketing challenges are you facing? What would success look like for you?"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-4 px-6 rounded-lg font-semibold transition-all duration-300 ${
                        isSubmitting
                          ? 'bg-gray-700 cursor-not-allowed'
                          : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02]'
                      }`}
                    >
                      {isSubmitting ? 'Sending...' : 'Get My Free Intelligence Report'}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact Info - 1 column */}
            <div className="space-y-8">
              {/* Quick Contact */}
              <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800">
                <h3 className="text-2xl font-bold mb-6">Quick Contact</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <span className="text-blue-400 text-xl">📧</span>
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <a href="mailto:hello@hendricks.ai" className="text-lg hover:text-blue-400 transition-colors">
                        hello@hendricks.ai
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-blue-400 text-xl">📱</span>
                    <div>
                      <p className="text-sm text-gray-400">Phone</p>
                      <a href="tel:+1-555-123-4567" className="text-lg hover:text-blue-400 transition-colors">
                        +1 (555) 123-4567
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-blue-400 text-xl">📍</span>
                    <div>
                      <p className="text-sm text-gray-400">Headquarters</p>
                      <p className="text-lg">Houston, Texas</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Schedule a Call */}
              <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 p-8 rounded-2xl border border-blue-500/20">
                <h3 className="text-2xl font-bold mb-4">Prefer to Talk?</h3>
                <p className="text-gray-300 mb-6">
                  Schedule a 30-minute strategy call with our demand intelligence experts.
                </p>
                <button className="w-full px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                  Schedule Strategy Call
                </button>
              </div>

              {/* Response Time */}
              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <h4 className="font-semibold mb-3">What Happens Next?</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>Intelligence Report delivered within 24 hours</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>Custom demand predictions for your market</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>No-obligation strategy recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>30-minute consultation included</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h2>
          
          <div className="space-y-6">
            {[
              {
                question: "What's included in the free Intelligence Report?",
                answer: "Your custom Intelligence Report includes: demand predictions for your market over the next 4 weeks, competitor analysis, opportunity identification, and specific recommendations for capturing predicted demand."
              },
              {
                question: "How accurate are your predictions?",
                answer: "Our AI models achieve 74% accuracy in predicting demand 2-4 weeks in advance. This is 3x more accurate than traditional forecasting methods."
              },
              {
                question: "What's the minimum budget to work with Hendricks.AI?",
                answer: "We work with businesses investing $5,000+ per month in marketing. Our solutions scale from startups to enterprise."
              },
              {
                question: "How quickly can we see results?",
                answer: "Most clients see initial results within 30 days. Our predictive models start delivering actionable insights immediately after onboarding."
              },
              {
                question: "Do you work with agencies?",
                answer: "Yes! We partner with agencies to provide white-label demand intelligence services. Contact us for our agency partner program."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">
            Stop Reacting. Start Predicting.
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join 500+ companies seeing tomorrow today with Hendricks.AI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact-form" className="px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
              Get Intelligence Report
            </a>
            <Link href="/results" className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105">
              See Success Stories
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}