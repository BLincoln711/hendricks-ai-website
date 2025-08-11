export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
        <div className="animate-pulse mb-4">
          <div className="w-20 h-20 bg-blue-500 rounded-full mx-auto mb-6 shadow-lg shadow-blue-500/50"></div>
        </div>
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tight">
          Hendricks.AI
        </h1>
        <p className="text-2xl md:text-3xl text-gray-300 mb-4 font-light">
          Demand Intelligence to Demand Capture
        </p>
        <p className="text-lg text-gray-400 mb-12 max-w-2xl">
          Predict market demand 2-4 weeks early. Transform your marketing with AI-powered predictive analytics.
        </p>
        <div className="flex gap-4">
          <button className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
            Get Started
          </button>
          <button className="px-8 py-4 bg-transparent text-white border border-white/30 rounded-lg hover:bg-white/10 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </main>
  )
}