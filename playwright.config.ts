import { defineConfig } from '@playwright/test';

// Visual regression checks for the 8 required combinations (DESIGN.md §19):
// 390px / 1440px × light / dark (projects) × en / ja (tests/visual/page.spec.ts).
//
//   npm run test:visual:baseline   # record screenshots from the code you trust (e.g. main)
//   npm run test:visual            # compare the current code against them
//
// Screenshots are machine-specific (fonts, GPU), so they are git-ignored and recorded locally.

const PORT = 3100;

const desktop = { viewport: { width: 1440, height: 900 } };
const mobile = { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true };

export default defineConfig({
  testDir: './tests/visual',
  snapshotPathTemplate: '{testDir}/__screenshots__/{projectName}/{arg}{ext}',
  fullyParallel: true,
  reporter: [['list'], ['html', { open: 'never' }]],
  expect: {
    toHaveScreenshot: { animations: 'disabled', caret: 'hide', maxDiffPixels: 0, threshold: 0 },
  },
  use: {
    baseURL: `http://localhost:${PORT}`,
    // Reveal and the hero fade-up skip their animations, so every section is fully visible.
    reducedMotion: 'reduce',
  },
  webServer: {
    // A production build: the dev server adds overlays that differ between Next.js versions.
    command: `npm run build && npm run start -- --port ${PORT}`,
    url: `http://localhost:${PORT}`,
    timeout: 300_000,
    reuseExistingServer: false,
  },
  projects: [
    { name: 'desktop-light', use: { ...desktop, colorScheme: 'light' } },
    { name: 'desktop-dark', use: { ...desktop, colorScheme: 'dark' } },
    { name: 'mobile-light', use: { ...mobile, colorScheme: 'light' } },
    { name: 'mobile-dark', use: { ...mobile, colorScheme: 'dark' } },
  ],
});
