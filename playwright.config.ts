import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.PORT ?? 4321);
const CI = !!process.env.CI;

export default defineConfig({
  testDir: "./tests",
  // tests/build specs inspect an explicit BUILD_DIR and skip themselves (with the
  // reason in the report) when it is unset; `npm run test:build` runs them.
  timeout: 30_000,
  forbidOnly: CI,
  retries: CI ? 2 : 0,
  reporter: CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    {
      // Touch + coarse pointer + small viewport. Only the e2e specs: unit/build
      // specs do not depend on the device, so they run once (chromium project).
      name: "mobile-chrome",
      testMatch: "e2e/**/*.spec.ts",
      use: { ...devices["Pixel 7"] },
    },
  ],
  webServer: {
    // --ignore-lock is REQUIRED: without a TTY, Astro 7's `astro dev` detaches into a
    // background daemon and exits 0, so Playwright would see its server process die.
    // The flag keeps it in the foreground (and skips the lock-file check).
    command: `npx astro dev --port ${PORT} --ignore-lock`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !CI,
    timeout: 120_000,
  },
});
