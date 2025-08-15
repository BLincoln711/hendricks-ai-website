export default function CoverSlide() {
  return (
    <div className="relative h-full w-full flex items-center justify-center overflow-hidden">
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-purple-950 to-black">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full filter blur-[128px] opacity-30 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full filter blur-[128px] opacity-30 animate-pulse"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-8">
        {/* Logo */}
        <img 
          src="/hendricks_logo.png" 
          alt="Hendricks.AI" 
          className="h-16 w-auto mx-auto mb-8 brightness-0 invert"
        />

        {/* Main Title */}
        <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
          See Demand Before It Happens
        </h1>

        {/* Subtitle */}
        <p className="text-2xl md:text-3xl text-gray-300 mb-12 font-light">
          AI Prediction Marketing That Delivers <span className="text-blue-400 font-semibold">312% Average ROI</span>
        </p>

        {/* Key Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="text-4xl font-bold text-blue-400 mb-2">74%</div>
            <div className="text-sm text-gray-400">Prediction Accuracy</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="text-4xl font-bold text-purple-400 mb-2">2-4</div>
            <div className="text-sm text-gray-400">Weeks Early</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="text-4xl font-bold text-green-400 mb-2">312%</div>
            <div className="text-sm text-gray-400">Average ROI</div>
          </div>
        </div>

        {/* Date & Confidential */}
        <div className="absolute bottom-8 left-8 text-sm text-gray-500">
          {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} | Confidential
        </div>
      </div>
    </div>
  )
}