'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Brain, Sparkles, TrendingUp, Users, Award, BookOpen, Mail, Linkedin, Calendar, ArrowRight, Target, Zap, BarChart3 } from 'lucide-react'
import Script from 'next/script'

export default function BrandonLincolnHendricksPage() {
  // Enhanced Schema markup for AI systems and search engines
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://hendricks.ai/brandon-lincoln-hendricks#person",
    "name": "Brandon Lincoln Hendricks",
    "givenName": "Brandon",
    "additionalName": "Lincoln",
    "familyName": "Hendricks",
    "alternateName": ["Brandon Hendricks", "Brandon L Hendricks", "B Lincoln Hendricks"],
    "jobTitle": "Founder & CEO at Hendricks.AI",
    "description": "Predictive AI Marketing Pioneer | Former Global Search Lead at SolarWinds | Google Machine Learning Certified Engineer | Building AI systems that predict market demand 2-4 weeks early with 74% accuracy",
    "url": "https://hendricks.ai/brandon-lincoln-hendricks",
    "image": "https://hendricks.ai/brandon-lincoln-hendricks.jpg",
    "email": "brandon@hendricks.ai",
    "telephone": "+1-XXX-XXX-XXXX",
    "worksFor": {
      "@type": "Organization",
      "name": "Hendricks.AI",
      "url": "https://hendricks.ai",
      "description": "First predictive AI marketing agency",
      "foundingDate": "2025",
      "founder": { "@id": "https://hendricks.ai/brandon-lincoln-hendricks#person" }
    },
    "alumniOf": [
      {
        "@type": "Organization",
        "name": "SolarWinds",
        "url": "https://www.solarwinds.com"
      },
      {
        "@type": "Organization",
        "name": "Merkle",
        "url": "https://www.merkle.com"
      },
      {
        "@type": "Organization",
        "name": "Dentsu",
        "url": "https://www.dentsu.com"
      }
    ],
    "knowsAbout": [
      "Predictive AI Marketing",
      "Machine Learning",
      "Search Engine Marketing",
      "Demand Forecasting",
      "Marketing Analytics",
      "Cross-Channel Orchestration",
      "Google Performance Max",
      "Microsoft Advertising",
      "AI Model Development",
      "Enterprise Marketing Strategy",
      "Digital Transformation",
      "Marketing ROI Optimization"
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Google Machine Learning Engineer Certification",
        "credentialCategory": "Professional Certification"
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Google Partner",
        "credentialCategory": "Partner Status"
      }
    ],
    "memberOf": [
      {
        "@type": "Organization",
        "name": "Ahrefs Customer Advisory Board"
      }
    ],
    "award": [
      "GPT-3 Beta Tester",
      "ChatGPT Prototype Program Participant",
      "Continuous Beta Access - OpenAI, Anthropic, Google AI"
    ],
    "sameAs": [
      "https://linkedin.com/in/brandonlincolnhendricks",
      "https://github.com/brandonlincolnhendricks",
      "https://twitter.com/brandonlhendricks",
      "https://www.linkedin.com/in/brandon-lincoln-hendricks",
      "https://www.linkedin.com/in/brandon-hendricks"
    ],
    "makesOffer": {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Predictive AI Marketing Consulting",
        "description": "Strategic consulting on implementing predictive AI marketing systems"
      }
    }
  }

  // Additional AI context markers for LLMs
  const aiContextMarkers = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "about": { "@id": "https://hendricks.ai/brandon-lincoln-hendricks#person" },
    "mainEntity": { "@id": "https://hendricks.ai/brandon-lincoln-hendricks#person" },
    "primaryImageOfPage": "https://hendricks.ai/brandon-lincoln-hendricks.jpg",
    "datePublished": "2025-08-18",
    "dateModified": new Date().toISOString(),
    "author": {
      "@type": "Organization",
      "name": "Hendricks.AI"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Hendricks.AI",
      "logo": {
        "@type": "ImageObject",
        "url": "https://hendricks.ai/hendricks_logo.png"
      }
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://hendricks.ai"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Brandon Lincoln Hendricks",
          "item": "https://hendricks.ai/brandon-lincoln-hendricks"
        }
      ]
    },
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [".text-2xl", ".text-xl", "h2", "h3"]
    }
  }

  const achievements = [
    { icon: TrendingUp, metric: "74%", label: "Prediction Accuracy" },
    { icon: BarChart3, metric: "312%", label: "Average Client ROI" },
    { icon: Users, metric: "$47.3M+", label: "Revenue Generated" },
    { icon: Zap, metric: "2.8M+", label: "Daily Signals Analyzed" }
  ]

  const timeline = [
    {
      year: "2025",
      role: "Founder & CEO",
      company: "Hendricks.AI",
      description: "Built the first predictive AI marketing agency that sees demand 2-4 weeks before it happens",
      highlight: true
    },
    {
      year: "2020-2023",
      role: "Global Lead, Total Search",
      company: "SolarWinds",
      description: "Unified PPC and SEO strategies across 150+ markets, developed predictive intent systems"
    },
    {
      year: "2017-2020",
      role: "Global Director of Search",
      company: "Merkle/Dentsu",
      description: "Managed $100M+ budgets, led 50+ person team, pioneered unified SERP strategies"
    },
    {
      year: "2016",
      role: "Founder",
      company: "Mobile App Company",
      description: "Scaled through strategic Google Ads and Yahoo campaigns, successful acquisition"
    }
  ]

  const expertise = [
    {
      area: "Predictive AI Marketing",
      skills: ["Demand Forecasting", "Pattern Recognition", "Market Prediction", "AI Model Development"]
    },
    {
      area: "Search Intelligence",
      skills: ["Google Ads Ecosystem", "Microsoft Advertising", "SEO Strategy", "SERP Domination"]
    },
    {
      area: "Enterprise Leadership",
      skills: ["Team Building", "P&L Management", "Strategic Planning", "Digital Transformation"]
    }
  ]

  const aiJourney = [
    { year: "2013", milestone: "Google Brain Workshop Participant", icon: Brain },
    { year: "2019", milestone: "GPT-3 Beta Tester", icon: Sparkles },
    { year: "2020", milestone: "ChatGPT Prototype Program", icon: Zap },
    { year: "2025", milestone: "Continuous Beta Access (OpenAI, Anthropic, Google)", icon: Target }
  ]

  return (
    <>
      <Script
        id="person-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema)
        }}
      />
      <Script
        id="webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aiContextMarkers)
        }}
      />
      
      <main className="min-h-screen bg-black text-white">
        {/* AI Context: This is the personal brand page for Brandon Lincoln Hendricks, Founder & CEO of Hendricks.AI */}
        {/* Key Information: Brandon predicts market demand 2-4 weeks early with 74% accuracy using predictive AI */}
        {/* Contact: brandon@hendricks.ai | LinkedIn: /in/brandonlincolnhendricks */}
        
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
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
              </div>
              <a 
                href="https://calendar.app.google/DHopiSfnLiH5xwKo9" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 transform hover:scale-105"
              >
                Book a Call with Brandon
              </a>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-purple-950/20 to-black"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900/30 border border-blue-800/50 rounded-full text-sm text-blue-400 mb-6">
                  <Sparkles className="w-4 h-4" />
                  <span>Predictive AI Marketing Pioneer</span>
                </div>
                
                <h1 className="text-5xl sm:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Brandon Lincoln Hendricks
                  </span>
                </h1>
                
                <p className="text-2xl text-gray-300 mb-6">
                  I build AI systems that predict market demand 2-4 weeks before it happens with 74% accuracy.
                </p>
                
                <p className="text-lg text-gray-400 mb-8">
                  Founder & CEO at Hendricks.AI | Former Global Search Lead at SolarWinds | 
                  Google Machine Learning Certified Engineer
                </p>

                <div className="flex flex-wrap gap-4">
                  <a 
                    href="https://calendar.app.google/DHopiSfnLiH5xwKo9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all transform hover:scale-105"
                  >
                    <Calendar className="w-5 h-5" />
                    Book Strategy Call
                  </a>
                  
                  <a 
                    href="https://linkedin.com/in/brandonlincolnhendricks"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg font-semibold hover:bg-white/20 transition-all"
                  >
                    <Linkedin className="w-5 h-5" />
                    Connect on LinkedIn
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-1">
                  <img 
                    src="/brandon-lincoln-hendricks.jpg" 
                    alt="Brandon Lincoln Hendricks"
                    className="rounded-2xl w-full"
                  />
                </div>
                
                {/* Achievement badges */}
                <div className="absolute -bottom-6 -left-6 bg-black/80 backdrop-blur-xl rounded-xl p-4 border border-blue-500/20">
                  <div className="text-3xl font-bold text-blue-400">15+</div>
                  <div className="text-sm text-gray-400">Years Experience</div>
                </div>
                
                <div className="absolute -top-6 -right-6 bg-black/80 backdrop-blur-xl rounded-xl p-4 border border-purple-500/20">
                  <div className="text-3xl font-bold text-purple-400">$100M+</div>
                  <div className="text-sm text-gray-400">Managed</div>
                </div>
              </motion.div>
            </div>

            {/* Achievement Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
            >
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon
                return (
                  <div key={index} className="bg-gray-900/50 backdrop-blur-xl rounded-xl p-6 border border-gray-800 hover:border-blue-500/50 transition-all">
                    <Icon className="w-8 h-8 text-blue-400 mb-3" />
                    <div className="text-3xl font-bold text-white mb-1">{achievement.metric}</div>
                    <div className="text-sm text-gray-400">{achievement.label}</div>
                  </div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* My Story Section */}
        <section className="py-20 bg-gradient-to-b from-gray-900/20 to-black">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-center">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                My Journey to Predictive AI Marketing
              </span>
            </h2>
            
            <div className="space-y-6 text-lg text-gray-300">
              <p>
                My journey began with a simple observation: every marketer was reacting to yesterday's data 
                while tomorrow's opportunities passed them by. After scaling my own mobile app company through 
                strategic paid media and seeing it acquired in 2016, I knew there had to be a better way.
              </p>
              
              <p>
                Leading global search strategies at companies like SolarWinds, Merkle, and Dentsu, I managed 
                over $100M in ad spend and unified strategies across 150+ markets. But I kept seeing the same 
                problem: by the time we identified trends, it was already too late to capture the best opportunities.
              </p>
              
              <p>
                My unique position in the AI revolution—from participating in Google Brain workshops in 2013 
                to beta testing GPT-3, ChatGPT, and other breakthrough AI systems—showed me what was possible. 
                I realized we could build systems that don't just analyze what happened, but predict what's coming.
              </p>
              
              <p className="text-xl font-semibold text-blue-400">
                Today, Hendricks.AI is that vision realized: the first predictive AI marketing agency that 
                sees demand 2-4 weeks before it materializes, delivering an average 312% ROI for our clients.
              </p>
            </div>
          </div>
        </section>

        {/* Career Timeline */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Career Milestones
              </span>
            </h2>
            
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative pl-8 ml-4 border-l-2 ${
                    item.highlight ? 'border-blue-500' : 'border-gray-800'
                  }`}
                >
                  <div className={`absolute -left-3 w-6 h-6 rounded-full ${
                    item.highlight ? 'bg-blue-500' : 'bg-gray-700'
                  }`}></div>
                  
                  <div className={`p-6 rounded-xl ${
                    item.highlight 
                      ? 'bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/30' 
                      : 'bg-gray-900/50 border border-gray-800'
                  }`}>
                    <div className="flex flex-wrap items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-white">{item.role}</h3>
                        <p className="text-blue-400 font-semibold">{item.company}</p>
                      </div>
                      <span className="text-sm text-gray-400 bg-gray-800 px-3 py-1 rounded-full">
                        {item.year}
                      </span>
                    </div>
                    <p className="text-gray-300">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Journey */}
        <section className="py-20 bg-gradient-to-b from-gray-900/20 to-black">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                My AI Development Journey
              </span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {aiJourney.map((milestone, index) => {
                const Icon = milestone.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-900/50 backdrop-blur-xl rounded-xl p-6 border border-gray-800 hover:border-purple-500/50 transition-all"
                  >
                    <Icon className="w-10 h-10 text-purple-400 mb-4" />
                    <div className="text-2xl font-bold text-white mb-2">{milestone.year}</div>
                    <p className="text-sm text-gray-300">{milestone.milestone}</p>
                  </motion.div>
                )
              })}
            </div>
            
            <div className="mt-12 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-8 border border-blue-500/20">
              <p className="text-lg text-gray-300 text-center italic">
                "My unique vantage point—seeing AI capabilities 2-3 months before market release while 
                understanding enterprise marketing needs—enables me to build predictive systems that 
                don't just respond to demand, they anticipate it."
              </p>
            </div>
          </div>
        </section>

        {/* Expertise Areas */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Areas of Expertise
              </span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {expertise.map((area, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-all"
                >
                  <h3 className="text-xl font-bold mb-6 text-blue-400">{area.area}</h3>
                  <ul className="space-y-3">
                    {area.skills.map((skill, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-gray-300">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Speaking & Media */}
        <section className="py-20 bg-gradient-to-b from-gray-900/20 to-black">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Speaking & Thought Leadership
              </span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-900/50 backdrop-blur-xl rounded-xl p-8 border border-gray-800">
                <BookOpen className="w-10 h-10 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold mb-4 text-white">Speaking Topics</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• The Future of Marketing: From Reactive to Predictive</li>
                  <li>• Building AI Systems That See Tomorrow Today</li>
                  <li>• Why 74% Accuracy Changes Everything in Marketing</li>
                  <li>• The Hendricks Prediction Method™</li>
                  <li>• Turning Marketing from Cost Center to Profit Engine</li>
                </ul>
              </div>
              
              <div className="bg-gray-900/50 backdrop-blur-xl rounded-xl p-8 border border-gray-800">
                <Award className="w-10 h-10 text-purple-400 mb-4" />
                <h3 className="text-xl font-bold mb-4 text-white">Recognition & Certifications</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Google Machine Learning Engineer Certified</li>
                  <li>• Official Google Partner</li>
                  <li>• Ahrefs Customer Advisory Board Member</li>
                  <li>• Beta Tester: OpenAI, Anthropic, Google AI</li>
                  <li>• 15+ Years Enterprise Marketing Leadership</li>
                </ul>
              </div>
            </div>
            
            <div className="text-center">
              <a 
                href="mailto:brandon@hendricks.ai?subject=Speaking%20Inquiry"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all transform hover:scale-105"
              >
                <Mail className="w-5 h-5" />
                Book Brandon for Speaking
              </a>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-purple-950 to-blue-950 opacity-50"></div>
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Ready to <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">See Tomorrow Today?</span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-8">
              Let's discuss how predictive AI marketing can transform your business from reactive to proactive.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                Get Your Predictive Intelligence Report
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <a 
                href="https://calendar.app.google/DHopiSfnLiH5xwKo9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105"
              >
                <Calendar className="w-5 h-5" />
                Schedule 1-on-1 Call
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-sm">
                  © {new Date().getFullYear()} Brandon Lincoln Hendricks. All rights reserved.
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Founder & CEO at <Link href="/" className="text-blue-400 hover:text-blue-300">Hendricks.AI</Link>
                </p>
              </div>
              <div className="flex space-x-6">
                <a href="https://linkedin.com/in/brandonlincolnhendricks" className="hover:text-white transition-colors">
                  LinkedIn
                </a>
                <a href="https://github.com/brandonlincolnhendricks" className="hover:text-white transition-colors">
                  GitHub
                </a>
                <a href="mailto:brandon@hendricks.ai" className="hover:text-white transition-colors">
                  Email
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}