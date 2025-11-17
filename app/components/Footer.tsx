// components/Footer.tsx

import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-slate-900 bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-10">

        <div className="grid gap-8 md:grid-cols-4">

          {/* Logo + Brand */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo/hendricks-logo.png"
                alt="Hendricks.AI Logo"
                width={150}
                height={40}
                className="object-contain brightness-125 contrast-125"
              />
            </Link>

            <p className="text-xs text-slate-300">
              Search Intelligence Engineering Firm specializing in AI Search Visibility
              and Measurement for B2B companies.
            </p>

            <p className="text-[11px] text-slate-500">
              Founded by Brandon Lincoln Hendricks, former Director of Search at SolarWinds
              and former Global Search Director at Merkle Dentsu.
            </p>
          </div>

          {/* Solutions */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase text-slate-400">
              Solutions
            </h3>
            <ul className="text-sm text-slate-300 space-y-2">
              <li><Link href="/solutions#foundation" className="hover:text-emerald-300">Foundation</Link></li>
              <li><Link href="/solutions#system" className="hover:text-emerald-300">System</Link></li>
              <li><Link href="/solutions#partnership" className="hover:text-emerald-300">Partnership</Link></li>
            </ul>
          </div>

          {/* Insights */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase text-slate-400">
              Insights
            </h3>
            <ul className="text-sm text-slate-300 space-y-2">
              <li><Link href="/insights" className="hover:text-emerald-300">All Insights</Link></li>
              <li><Link href="/insights/ai-search-visibility-b2b-companies-2025" className="hover:text-emerald-300">AI Search Visibility Guide</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase text-slate-400">
              Company
            </h3>
            <ul className="text-sm text-slate-300 space-y-2">
              <li><Link href="/about" className="hover:text-emerald-300">About</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-300">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-emerald-300">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-emerald-300">Terms</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-900 mt-10 pt-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

            <div>
              <h4 className="text-sm font-semibold text-slate-50">
                Ready to engineer true AI Search Visibility
              </h4>
              <p className="text-xs text-slate-400 mt-1 max-w-xl">
                Your buyers are already using AI powered search. The question is whether
                you are visible inside the answers they trust.
              </p>
            </div>

            <div className="flex gap-3">
              <Link href="/solutions" className="bg-emerald-500 text-slate-950 text-xs font-semibold px-4 py-2 rounded-md hover:bg-emerald-400 transition">
                Start Your Subscription
              </Link>
              <Link href="/contact" className="border border-slate-700 text-slate-200 text-xs font-semibold px-4 py-2 rounded-md hover:border-emerald-400 transition">
                Book Visibility Consultation
              </Link>
            </div>

          </div>

          <div className="flex flex-col md:flex-row md:justify-between md:items-center text-[11px] text-slate-500 mt-6 gap-2">
            <span>© {new Date().getFullYear()} Hendricks.AI. All rights reserved.</span>
            <span>Search Intelligence Engineering for B2B AI visibility and measurement.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
