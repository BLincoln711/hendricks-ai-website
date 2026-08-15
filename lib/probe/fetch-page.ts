import { hostFromUrl } from "./host";

const FETCH_TIMEOUT_MS = 10_000;
const MAX_BYTES = 1_500_000;

export type FetchedPage = {
  url: string;
  host: string;
  html: string | null;
};

export async function fetchPage(url: string): Promise<FetchedPage> {
  const host = hostFromUrl(url) ?? "";
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "User-Agent": "HendricksProbe/1.0 (+https://hendricks.ai)",
        Accept: "text/html,application/xhtml+xml",
      },
    });

    if (!response.ok) {
      return { url, host, html: null };
    }

    const contentType = response.headers.get("content-type") ?? "";
    if (contentType && !/text\/html|application\/xhtml\+xml/i.test(contentType)) {
      return { url, host, html: null };
    }

    const reader = response.body?.getReader();
    if (!reader) {
      const text = await response.text();
      return { url: response.url || url, host: hostFromUrl(response.url || url) ?? host, html: text.slice(0, MAX_BYTES) };
    }

    const chunks: Uint8Array[] = [];
    let received = 0;
    while (received < MAX_BYTES) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) {
        chunks.push(value);
        received += value.byteLength;
      }
    }
    reader.releaseLock();

    const html = new TextDecoder("utf-8").decode(
      chunks.reduce((acc, chunk) => {
        const next = new Uint8Array(acc.length + chunk.length);
        next.set(acc);
        next.set(chunk, acc.length);
        return next;
      }, new Uint8Array())
    );

    return {
      url: response.url || url,
      host: hostFromUrl(response.url || url) ?? host,
      html,
    };
  } catch {
    return { url, host, html: null };
  } finally {
    clearTimeout(timer);
  }
}
