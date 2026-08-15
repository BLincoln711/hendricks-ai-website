import { DIAGNOSTIC, POSITIONING, PRACTICE_MODULES, REFUSAL, SITE_URL } from "@/lib/site";

export function GET() {
  const body = `# Hendricks

${POSITIONING}

Hendricks is a search intelligence engineering firm. It designs, instruments, and operates one search intelligence system.

## Practice

${PRACTICE_MODULES.map((module) => `- ${module.name}: ${module.body}`).join("\n")}

## Method

Diagnose → Architect → Install → Operate. Object = one search intelligence system.

## Diagnostic

${DIAGNOSTIC.name}, ${DIAGNOSTIC.price} / ${DIAGNOSTIC.duration}.
${DIAGNOSTIC.lede}

## Refusal

${REFUSAL}

## Pages

- ${SITE_URL}/
- ${SITE_URL}/practice
- ${SITE_URL}/method
- ${SITE_URL}/about
- ${SITE_URL}/diagnostic
- ${SITE_URL}/pricing
- ${SITE_URL}/briefing
- ${SITE_URL}/insights
- ${SITE_URL}/insights/what-is-search-intelligence-engineer

## About

Named the category on Medium, 6 December 2025: “What is a Search Intelligence Engineer?”
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
