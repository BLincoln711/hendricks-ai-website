import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-900 bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <Link href="/" className="text-slate-50">
              Hendricks
            </Link>
            <p className="text-xs text-slate-300">
              Hendricks designs, instruments, and operates the systems that decide
              whether a company is retrieved, cited, and chosen when a person or a
              model looks for an answer.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase text-slate-400">Practice</h3>
            <ul className="text-sm text-slate-300 space-y-2">
              <li><Link href="/practice" className="hover:text-emerald-300">Practice</Link></li>
              <li><Link href="/method" className="hover:text-emerald-300">Method</Link></li>
              <li><Link href="/diagnostic" className="hover:text-emerald-300">Diagnostic</Link></li>
              <li><Link href="/pricing" className="hover:text-emerald-300">Pricing</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase text-slate-400">Insights</h3>
            <ul className="text-sm text-slate-300 space-y-2">
              <li><Link href="/insights" className="hover:text-emerald-300">Archive</Link></li>
              <li>
                <Link
                  href="/insights/what-is-search-intelligence-engineer"
                  className="hover:text-emerald-300"
                >
                  Search Intelligence Engineer
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase text-slate-400">Company</h3>
            <ul className="text-sm text-slate-300 space-y-2">
              <li><Link href="/about" className="hover:text-emerald-300">About</Link></li>
              <li><Link href="/briefing" className="hover:text-emerald-300">Briefing</Link></li>
              <li><Link href="/privacy" className="hover:text-emerald-300">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-emerald-300">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-900 mt-10 pt-6 text-[11px] text-slate-500">
          © {new Date().getFullYear()} Hendricks.
        </div>
      </div>
    </footer>
  );
}
