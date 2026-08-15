// components/Header.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "/practice", label: "Practice" },
  { href: "/method", label: "Method" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/briefing", label: "Briefing" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(href + "/");

  return (
    <header className="relative z-50 border-b border-slate-900 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">

        {/* Logo with AI-Powered Badge */}
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex-shrink-0">
            <img
              src="/hendricks_logo.png"
              alt="Hendricks.AI"
              className="h-6 w-auto object-contain brightness-0 invert"
            />
          </Link>
          <span className="text-gray-400 text-sm ml-1 flex items-center gap-1">
            <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            AI-Powered
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "text-emerald-400"
                  : "text-slate-300 hover:text-emerald-300"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/briefing"
            className="text-xs font-semibold text-slate-200 hover:text-emerald-300 transition"
          >
            Book a briefing
          </Link>
          <Link
            href="/diagnostic"
            className="inline-flex items-center rounded-md bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-400 transition"
          >
            Retrieval Graph Diagnostic
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="flex items-center justify-center rounded-md border border-slate-800 p-1.5 text-slate-200 hover:border-emerald-400 hover:text-emerald-300 md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="border-t border-slate-900 bg-slate-950 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`text-sm font-medium ${
                  isActive(item.href)
                    ? "text-emerald-400"
                    : "text-slate-300 hover:text-emerald-300"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2">
              <Link
                href="/briefing"
                onClick={() => setOpen(false)}
                className="text-xs font-semibold text-slate-200 hover:text-emerald-300 transition"
              >
                Book a briefing
              </Link>
              <Link
                href="/diagnostic"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-md bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-400 transition"
              >
                Retrieval Graph Diagnostic
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
