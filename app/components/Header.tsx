// components/Header.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "/solutions", label: "Solutions" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(href + "/");

  return (
    <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo/hendricks-logo.png"
            alt="Hendricks.AI Logo"
            width={140}
            height={40}
            className="object-contain"
            priority
          />
        </Link>

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
            href="/contact"
            className="text-xs font-semibold text-slate-200 hover:text-emerald-300 transition"
          >
            Book Consultation
          </Link>
          <Link
            href="/solutions"
            className="inline-flex items-center rounded-md bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-400 transition"
          >
            Start Your AI Visibility System
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
                href="/contact"
                onClick={() => setOpen(false)}
                className="text-xs font-semibold text-slate-200 hover:text-emerald-300 transition"
              >
                Book Consultation
              </Link>
              <Link
                href="/solutions"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-md bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-400 transition"
              >
                Start Your AI Visibility System
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
