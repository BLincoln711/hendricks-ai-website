import type { Metadata } from "next";
import { MethodBeam } from "../components/site/MethodBeam";
import { PageActions } from "../components/site/PageActions";
import { PageIntro } from "../components/site/PageIntro";
import { SiteChrome } from "../components/site/SiteChrome";
import { METHOD_OBJECT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Method",
  description: `Diagnose. Architect. Install. Operate. Object = ${METHOD_OBJECT}.`,
};

export default function MethodPage() {
  return (
    <SiteChrome>
      <article className="product interior">
        <PageIntro
          kicker="Method"
          title="Diagnose. Architect. Install. Operate."
          spec
          wide
        />
        <section className="band">
          <MethodBeam />
          <p className="object-caption">Object = {METHOD_OBJECT}.</p>
        </section>
        <section className="band band-close">
          <PageActions primary={{ href: "/briefing", label: "Book a briefing" }} />
        </section>
      </article>
    </SiteChrome>
  );
}
