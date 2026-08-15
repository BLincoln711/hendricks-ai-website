export function normalizeHost(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/^\.+/, "")
    .replace(/^www\./, "");
}

export function hostFromUrl(value: string): string | null {
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return null;
    }
    return normalizeHost(parsed.hostname);
  } catch {
    return null;
  }
}

export function hostsMatch(candidate: string, targetHost: string): boolean {
  const a = hostFromUrl(candidate) ?? normalizeHost(candidate);
  const b = normalizeHost(targetHost);
  if (!a || !b) return false;
  return a === b || a.endsWith(`.${b}`) || b.endsWith(`.${a}`);
}

export function collectUrls(value: unknown, into: string[] = []): string[] {
  if (typeof value === "string") {
    if (/^https?:\/\//i.test(value)) into.push(value);
    return into;
  }
  if (Array.isArray(value)) {
    for (const item of value) collectUrls(item, into);
    return into;
  }
  if (value && typeof value === "object") {
    for (const [key, nested] of Object.entries(value as Record<string, unknown>)) {
      if (/(url|uri|href|link|domain|source)/i.test(key) && typeof nested === "string") {
        if (/^https?:\/\//i.test(nested)) into.push(nested);
        else if (/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(nested)) into.push(`https://${nested}`);
      }
      collectUrls(nested, into);
    }
  }
  return into;
}

export function anyUrlMatchesHost(urls: string[], host: string): boolean {
  return urls.some((url) => hostsMatch(url, host));
}
