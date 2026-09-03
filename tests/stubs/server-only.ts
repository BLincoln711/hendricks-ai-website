/**
 * Stub for the `server-only` marker package.
 *
 * Next.js resolves `server-only` through a bundler alias that throws if a
 * module reaches a client bundle. There is no package to resolve under vitest,
 * so the marker is aliased here to an empty module. That keeps the guard where
 * it belongs, in the build, while letting the server modules it protects be
 * unit tested.
 */
export {}
