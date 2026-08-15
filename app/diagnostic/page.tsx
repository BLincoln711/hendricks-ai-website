import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "../components/site/PageIntro";
import { SiteChrome } from "../components/site/SiteChrome";
import { DIAGNOSTIC } from "@/lib/site";

export const metadata: Metadata = {
  title: DIAGNOSTIC.name,
  description: DIAGNOSTIC.lede,
};

export default function DiagnosticPage() {
  return (
    <SiteChrome>
      <article className="page-article">
        <PageIntro
          title={DIAGNOSTIC.name}
          deck={`${DIAGNOSTIC.price} / ${DIAGNOSTIC.duration}.`}
        />
        <p className="lede">{DIAGNOSTIC.lede}</p>
        <section>
          <h2>Weeks</h2>
          <ol className="plain-list">
            {DIAGNOSTIC.weeks.map((week, index) => (
              <li key={week}>
                Week {index + 1}: {week}
              </li>
            ))}
          </ol>
        </section>
        <p>
          The diagnostic is available on its own. After it, you decide whether we
          install the system.
        </p>
        <p className="page-ctas">
          <Link href="/briefing">Book a briefing</Link>
          <Link href="/pricing">Pricing</Link>
        </p>
      </article>
    </SiteChrome>
  );
}
