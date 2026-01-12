import { Metadata } from 'next'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Website Demos | Hendricks.AI',
  description: 'View live website redesign demos and prototypes by Hendricks.AI. See our work in action before your project begins.',
  openGraph: {
    title: 'Website Demos | Hendricks.AI',
    description: 'View live website redesign demos and prototypes by Hendricks.AI.',
  },
}

const demos = [
  {
    id: 'abm-tv-mounting',
    title: 'ABM TV Mounting',
    description: 'Complete website redesign for a local TV mounting service in Houston, TX. Optimized for lead generation with click-to-call, text CTAs, pricing transparency, and local SEO.',
    category: 'Local Service Business',
    features: [
      'Mobile-first responsive design',
      'Click-to-call & SMS integration',
      'Transparent pricing section',
      'Before/After gallery with sliders',
      'FAQ with accordion',
      'LocalBusiness schema markup',
      'Google Maps integration',
      'Urgency messaging',
      '100% satisfaction guarantee',
    ],
    url: '/demos/abm-tv-mounting.html',
    status: 'Live Demo',
  },
]

export default function DemosPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto text-center">
            <span className="text-cyan-400 text-sm font-semibold tracking-wider uppercase">
              Client Previews
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
              Website Demos
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Preview website redesigns and prototypes. See the quality of our work before your project begins.
            </p>
          </div>
        </section>

        {/* Demos Grid */}
        <section className="px-6 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-8">
              {demos.map((demo) => (
                <div
                  key={demo.id}
                  className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300"
                >
                  <div className="p-8">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-sm font-medium">
                        {demo.category}
                      </span>
                      <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                        {demo.status}
                      </span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                      {demo.title}
                    </h2>

                    <p className="text-gray-400 text-lg mb-6">
                      {demo.description}
                    </p>

                    <div className="mb-8">
                      <h3 className="text-white font-semibold mb-3">Key Features:</h3>
                      <div className="grid md:grid-cols-3 gap-2">
                        {demo.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-gray-300">
                            <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <a
                        href={demo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        View Live Demo
                      </a>
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 border border-cyan-500 text-cyan-300 hover:bg-cyan-500/10 font-semibold px-6 py-3 rounded-lg transition-colors"
                      >
                        Request Similar Project
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-16">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-slate-800 to-slate-800/50 border border-slate-700 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready for Your Own Website Redesign?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Let&apos;s discuss how we can transform your online presence and drive more leads to your business.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-8 py-4 rounded-lg transition-colors text-lg"
            >
              Get Started Today
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
