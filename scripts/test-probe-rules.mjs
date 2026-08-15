import assert from "node:assert/strict";

function normalizeHost(value) {
  return value.trim().toLowerCase().replace(/^\.+/, "").replace(/^www\./, "");
}

function hostFromUrl(value) {
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return null;
    return normalizeHost(parsed.hostname);
  } catch {
    return null;
  }
}

function hostsMatch(candidate, targetHost) {
  const a = hostFromUrl(candidate) ?? normalizeHost(candidate);
  const b = normalizeHost(targetHost);
  if (!a || !b) return false;
  return a === b || a.endsWith(`.${b}`) || b.endsWith(`.${a}`);
}

function anyUrlMatchesHost(urls, host) {
  return urls.some((url) => hostsMatch(url, host));
}

function resolveClassicGoogle(probed, organicUrls, host) {
  if (!probed || organicUrls === null) return "unmeasured";
  return anyUrlMatchesHost(organicUrls, host) ? "retrieved" : "invisible";
}

function resolveAiOverviews(probed, aioPresent, referenceUrls, host) {
  if (!probed || aioPresent === null) return "unmeasured";
  if (!aioPresent) return "unmeasured";
  if (referenceUrls === null) return "unmeasured";
  return anyUrlMatchesHost(referenceUrls, host) ? "cited" : "invisible";
}

function resolveChatGpt(probed, sourceListPresent, sourceUrls, host) {
  if (!probed || sourceListPresent === null) return "unmeasured";
  if (!sourceListPresent || sourceUrls === null) return "unmeasured";
  return anyUrlMatchesHost(sourceUrls, host) ? "cited" : "invisible";
}

function dataForSeoBasicToken(env) {
  const raw = env.DATAFORSEO_BASIC_TOKEN?.trim();
  if (raw) return raw.replace(/^Basic\s+/i, "");
  const login = env.DATAFORSEO_LOGIN?.trim();
  const password = env.DATAFORSEO_PASSWORD;
  if (login && password) return Buffer.from(`${login}:${password}`).toString("base64");
  return null;
}

assert.equal(resolveClassicGoogle(false, [], "example.com"), "unmeasured");
assert.equal(resolveClassicGoogle(true, null, "example.com"), "unmeasured");
assert.equal(resolveClassicGoogle(true, ["https://other.com"], "example.com"), "invisible");
assert.equal(resolveClassicGoogle(true, ["https://www.example.com/page"], "example.com"), "retrieved");
assert.notEqual(resolveClassicGoogle(true, ["https://www.example.com/page"], "example.com"), "found");

assert.equal(resolveAiOverviews(true, false, [], "example.com"), "unmeasured");
assert.equal(resolveAiOverviews(true, true, ["https://other.com"], "example.com"), "invisible");
assert.equal(resolveAiOverviews(true, true, ["https://example.com/a"], "example.com"), "cited");
assert.equal(resolveAiOverviews(false, true, ["https://other.com"], "example.com"), "unmeasured");

assert.equal(resolveChatGpt(true, false, null, "example.com"), "unmeasured");
assert.equal(resolveChatGpt(true, true, ["https://news.example.org"], "example.com"), "invisible");
assert.equal(resolveChatGpt(true, true, ["https://docs.example.com/x"], "example.com"), "cited");

const already = "bG9naW46cGFzcw==";
assert.equal(dataForSeoBasicToken({ DATAFORSEO_BASIC_TOKEN: already }), already);
assert.equal(dataForSeoBasicToken({ DATAFORSEO_BASIC_TOKEN: `Basic ${already}` }), already);
assert.equal(
  dataForSeoBasicToken({ DATAFORSEO_LOGIN: "login", DATAFORSEO_PASSWORD: "pass" }),
  Buffer.from("login:pass").toString("base64")
);
assert.notEqual(
  dataForSeoBasicToken({ DATAFORSEO_BASIC_TOKEN: already }),
  Buffer.from(already).toString("base64")
);

console.log("probe rules ok");
