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

/**
 * jsdom does not implement `window.matchMedia`, and the table of contents
 * disclosure asks it which side of 1024 px the viewport is on. The stub reports
 * the wide side, which is the state the list ships in, and is a real EventTarget
 * so the component's subscribe and unsubscribe run the same code they run in a
 * browser. A test that needs the narrow side overrides `matches` on the object
 * this returns.
 */
if (typeof window !== 'undefined' && typeof window.matchMedia !== 'function') {
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: (query: string) => {
      const target = new EventTarget()
      return Object.assign(target, {
        media: query,
        matches: false,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
      }) as unknown as MediaQueryList
    },
  })
}
