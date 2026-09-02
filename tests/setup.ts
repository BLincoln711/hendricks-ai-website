import '@testing-library/jest-dom/vitest'

/**
 * Node 25 defines a `localStorage` global that is inert unless the process was
 * started with `--localstorage-file`, and vitest's jsdom environment keeps any
 * global Node already defines instead of replacing it with jsdom's. The consent
 * store swallows the resulting TypeError, so every test that records a decision
 * would read it back as undecided. Put jsdom's working Storage on the global
 * before any test module loads.
 */
const dom = (globalThis as { jsdom?: { window: Window } }).jsdom

for (const key of ['localStorage', 'sessionStorage'] as const) {
  if (dom && typeof globalThis[key]?.setItem !== 'function') {
    Object.defineProperty(globalThis, key, {
      value: dom.window[key],
      configurable: true,
      writable: true,
    })
  }
}
