import React from 'react';
import VisibilityWidget from '@/app/components/VisibilityWidget';

export default function VisibilityPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <div className="relative flex-grow flex items-center justify-center py-20 px-4">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px]"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-20"></div>
        </div>

        <div className="container mx-auto max-w-6xl grid lg:grid-cols-2 gap-12 items-center relative z-10">

          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium mb-6">
              AI Search Intelligence
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Make Your Brand <br />
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                Visible to AI
              </span>
            </h1>

            <p className="text-xl text-zinc-400 mb-8 max-w-lg mx-auto lg:mx-0">
              We help B2B companies measure and optimize their presence in AI-powered search results like ChatGPT, Gemini, and Perplexity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="px-8 py-3 bg-white text-black rounded-full font-semibold hover:bg-zinc-200 transition-colors">
                Start Free Audit
              </button>
              <button className="px-8 py-3 border border-zinc-700 text-white rounded-full font-semibold hover:bg-zinc-900 transition-colors">
                View Pricing
              </button>
            </div>
          </div>

          {/* Right Content - Widget */}
          <div>
            <VisibilityWidget />
          </div>

        </div>
      </div>
    </main>
  );
}
