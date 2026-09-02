/**
 * Lighthouse CI, informational mode (redesign handoff section 8; MG-01, PF-09,
 * X-02). Run against a production build: `pnpm build && pnpm exec lhci autorun`.
 *
 * No `assert` block yet, so a low score cannot fail a run; PR 16 adds the MG-01
 * thresholds and makes it blocking. Reports land in `.lighthouseci/`, which is
 * ignored by git. The six routes are the ones section 8 names; mobile is
 * Lighthouse's default emulation, three runs per route.
 */
const routes = [
  '/',
  '/diagnostic',
  '/for-agencies',
  '/research/the-answer-index',
  '/solutions/selection-intelligence',
  '/what-is-search-intelligence-engineering',
]

module.exports = {
  ci: {
    collect: {
      startServerCommand: 'pnpm start',
      startServerReadyPattern: 'Ready in',
      url: routes.map((route) => `http://localhost:3000${route}`),
      numberOfRuns: 3,
    },
    upload: {
      target: 'filesystem',
      outputDir: '.lighthouseci',
    },
  },
}
