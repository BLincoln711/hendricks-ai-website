import type { PageSignals } from "./extractability";

function unique(values: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const value of values) {
    const key = value.toLowerCase().replace(/\s+/g, " ").trim();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(value.replace(/\s+/g, " ").trim());
  }
  return out;
}

function asQuestion(text: string): string | null {
  const clean = text.replace(/\s+/g, " ").trim();
  if (!clean) return null;
  if (clean.endsWith("?")) return clean;
  return null;
}

/**
 * Asks are taken from the page itself — FAQ, question headings, or the
 * title/H1 the page is answering. Never invented demand queries.
 */
export function deriveAsks(signals: PageSignals): string[] {
  const fromFaq = signals.faqQuestions.filter(Boolean);
  const fromHeadings = signals.headings
    .map(asQuestion)
    .filter((value): value is string => Boolean(value));
  const fromTitle = asQuestion(signals.title ?? "");
  const fromH1 = signals.h1s.map(asQuestion).filter((value): value is string => Boolean(value));

  const questions = unique([...fromFaq, ...fromHeadings, ...fromTitle, ...fromH1].filter(Boolean) as string[]);
  if (questions.length >= 2) return questions.slice(0, 3);

  const subject = (signals.h1s[0] || signals.title || "").replace(/\s+/g, " ").trim();
  if (subject && !GENERIC_SUBJECT.test(subject)) {
    questions.push(`What does this page claim about ${subject}?`);
  }

  return unique(questions).slice(0, 3);
}

const GENERIC_SUBJECT = /^(home|welcome|untitled|index)$/i;

export function probeQuery(signals: PageSignals, host: string): string | null {
  const question = deriveAsks(signals)[0];
  if (question) return question;
  const subject = (signals.h1s[0] || signals.title || signals.siteName || "").trim();
  if (subject) return subject;
  return host || null;
}
