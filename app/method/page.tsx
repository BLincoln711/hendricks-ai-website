import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "../components/site/PageIntro";
import { SiteChrome } from "../components/site/SiteChrome";
import { METHOD_OBJECT, METHOD_STEPS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Method",
  description: `Diagnose → Architect → Install → Operate. Object = ${METHOD_OBJECT}.`,
};

export default function MethodPage() {
  return (
    <SiteChrome>
      <article className="product">
        <PageIntro
          title="Method"
          deck={`${METHOD_STEPS.join(" → ")}. Object = ${METHOD_OBJECT}.`}
        />
        <div className="method-rail product-section">
          {METHOD_STEPS.map((step) => (
            <div key={step} className="panel method-step">
              <strong>{step}</strong>
            </div>
          ))}
        </div>
        <p className="page-ctas">
          <Link href="/practice">Practice</Link>
          <Link href="/diagnostic">Retrieval Graph Diagnostic</Link>
        </p>
      </article>
    </SiteChrome>
  );
}
