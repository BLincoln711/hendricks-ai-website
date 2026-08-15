/**
 * DataForSEO dashboard "Base64 token" is already a Basic credential.
 * Never encode that string again. Only encode login + password.
 */
export function dataForSeoBasicToken(
  env: NodeJS.ProcessEnv = process.env
): string | null {
  const raw = env.DATAFORSEO_BASIC_TOKEN?.trim();
  if (raw) {
    return raw.replace(/^Basic\s+/i, "");
  }

  const login = env.DATAFORSEO_LOGIN?.trim();
  const password = env.DATAFORSEO_PASSWORD;
  if (login && password) {
    return Buffer.from(`${login}:${password}`).toString("base64");
  }

  return null;
}

export function hasOpenAiKey(env: NodeJS.ProcessEnv = process.env): boolean {
  const key = env.OPENAI_API_KEY?.trim();
  return Boolean(key) && key !== "your-openai-api-key-here";
}
