import React from 'react';
import Link from 'next/link';
import Navigation from '../components/navigation';
import { Footer } from '../components/Footer';
import VisibilityWidget from '@/app/components/VisibilityWidget';

export default function VisibilityPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#010414] via-[#0b1f32] to-[#1b0034] text-white flex flex-col">
      <Navigation />

      <div className="relative flex-grow flex items-center justify-center py-20 px-4 pt-32">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(147,51,234,0.1),transparent_50%)]"></div>
        </div>

        <div className="container mx-auto max-w-6xl grid lg:grid-cols-2 gap-12 items-center relative z-10">

          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium mb-6">
              AI Search Intelligence
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Can AI Search <br />
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                Find Your Brand?
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0">
              We help B2B companies measure and optimize their presence in AI-powered search results like ChatGPT, Gemini, and Perplexity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/contact"
                className="px-8 py-3 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 text-white rounded-full font-semibold hover:scale-[1.02] transition-transform text-center shadow-lg"
              >
                Start Free Audit
              </Link>
              <Link
                href="/solutions"
                className="px-8 py-3 border border-[rgba(255,255,255,0.2)] text-white rounded-full font-semibold hover:border-cyan-400 hover:bg-[rgba(255,255,255,0.05)] transition-all duration-300 text-center"
              >
                View Pricing
              </Link>
            </div>
          </div>

          {/* Right Content - Widget */}
          <div>
            <VisibilityWidget />
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
