"use client";

import React, { useState } from 'react';
import { Search, CheckCircle, AlertTriangle, Loader2, ArrowRight } from 'lucide-react';

interface AnalysisResult {
  score: number;
  sentiment: string;
  gaps: string[];
  visibility: string;
}

const VisibilityWidget = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [email, setEmail] = useState('');
  const [unlocked, setUnlocked] = useState(false);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) throw new Error('Analysis failed');

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      setResult({
        score: 0,
        sentiment: 'Error',
        gaps: ['Could not analyze URL', 'Please try again'],
        visibility: 'None'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setUnlocked(true);
  };

  return (
    <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 max-w-lg w-full mx-auto relative overflow-hidden shadow-2xl">

      {!result ? (
        <form onSubmit={handleAnalyze}>
          <h3 className="text-2xl font-bold mb-4 text-white">Check Your AI Visibility</h3>
          <p className="text-zinc-400 mb-6">
            See how your brand appears in AI search results like ChatGPT and Gemini.
          </p>

          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
            <input
              type="url"
              placeholder="https://yourcompany.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-black/30 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white py-3 rounded-full font-semibold transition-all shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]"
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Analyze Now'}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>
      ) : !unlocked ? (
        <div className="animate-in fade-in zoom-in duration-500 text-center">
          <div className="mb-6">
            <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Analysis Complete!</h3>
            <p className="text-zinc-400">Enter your email to unlock your AI Visibility Score.</p>
          </div>

          <form onSubmit={handleUnlock}>
            <input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 bg-black/30 border border-zinc-700 rounded-lg text-white mb-4 focus:outline-none focus:border-blue-500"
              required
            />
            <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-violet-600 text-white py-3 rounded-full font-semibold hover:opacity-90 transition-opacity">
              Unlock Results
            </button>
          </form>
        </div>
      ) : (
        <div className="animate-in fade-in zoom-in duration-500">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white">Analysis Results</h3>
            <button
              onClick={() => { setResult(null); setUrl(''); setUnlocked(false); }}
              className="text-sm text-zinc-500 hover:text-white transition-colors"
            >
              Start Over
            </button>
          </div>

          <div className="text-center mb-8">
            <div className="text-6xl font-bold bg-gradient-to-br from-blue-400 to-violet-400 bg-clip-text text-transparent leading-none">
              {result.score}
            </div>
            <div className="text-zinc-500 text-sm mt-2">/ 100 Visibility Score</div>
          </div>

          <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-lg flex items-center gap-3">
              <CheckCircle size={20} className="text-green-400" />
              <div>
                <div className="text-xs text-zinc-500">Sentiment</div>
                <div className="font-medium text-white">{result.sentiment}</div>
              </div>
            </div>

            <div className="bg-white/5 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle size={18} className="text-amber-400" />
                <span className="text-sm font-medium text-white">Key Gaps Detected</span>
              </div>
              <ul className="space-y-2 pl-6 list-disc text-sm text-zinc-400">
                {result.gaps.map((gap, i) => (
                  <li key={i}>{gap}</li>
                ))}
              </ul>
            </div>
          </div>

          <button className="w-full mt-6 bg-zinc-800 hover:bg-zinc-700 text-white py-3 rounded-full font-medium transition-colors">
            Get Full Report
          </button>
        </div>
      )}
    </div>
  );
};

export default VisibilityWidget;
