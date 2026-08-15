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
      <article className="page-article">
        <PageIntro title="Practice" deck={POSITIONING} />
        <ol className="module-list">
          {PRACTICE_MODULES.map((module) => (
            <li key={module.name}>
              <h2>{module.name}</h2>
              <p>{module.body}</p>
            </li>
          ))}
        </ol>
        <section>
          <h2>Refusal</h2>
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
