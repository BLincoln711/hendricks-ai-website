import Link from "next/link";
import { CONTACT_EMAIL, CONTACT_PLACE, NAV_ITEMS } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-wrap site-footer-inner">
        <Link href="/" className="wordmark">
          Hendricks
        </Link>
        <nav aria-label="Footer">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link href="/diagnostic">Diagnostic</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
        </nav>
        <p className="site-footer-meta">
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          <span aria-hidden="true"> · </span>
          {CONTACT_PLACE}
        </p>
      </div>
    </footer>
  );
}
