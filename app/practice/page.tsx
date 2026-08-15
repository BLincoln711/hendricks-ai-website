import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "../components/site/PageIntro";
import { SiteChrome } from "../components/site/SiteChrome";
import { PRACTICE_MODULES, REFUSAL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Practice",
};

export default function PracticePage() {
  return (
    <SiteChrome>
      <article className="product">
        <PageIntro title="Practice" />
        <div className="module-grid product-section">
          {PRACTICE_MODULES.map((module) => (
            <div key={module.name} className="panel module-card">
              <h2 className="mono-label">{module.name}</h2>
              <p>{module.body}</p>
            </div>
          ))}
        </div>
        <section className="product-section">
          <p>{REFUSAL}</p>
        </section>
        <p className="page-ctas">
          <Link href="/method">Method</Link>
          <Link href="/diagnostic">Retrieval Graph Diagnostic</Link>
        </p>
      </article>
    </SiteChrome>
  );
}
