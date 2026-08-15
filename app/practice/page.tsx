import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "../components/site/PageIntro";
import { SiteChrome } from "../components/site/SiteChrome";
import { POSITIONING, PRACTICE_MODULES, REFUSAL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Practice",
  description: POSITIONING,
};

export default function PracticePage() {
  return (
    <SiteChrome>
      <article className="product">
        <PageIntro eyebrow="Practice" title="Practice" deck={POSITIONING} />
        <div className="module-grid product-section">
          {PRACTICE_MODULES.map((module, index) => (
            <div key={module.name} className="panel module-card">
              <div className="module-index">0{index + 1}</div>
              <h2>{module.name}</h2>
              <p>{module.body}</p>
            </div>
          ))}
        </div>
        <section className="product-section">
          <p className="mono-label">Refusal</p>
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
