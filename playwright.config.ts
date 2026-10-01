import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.PORT ?? 4321);

export default defineConfig({
  testDir: "./tests",
  // Legacy Next.js suite; rewritten in T6.
  testIgnore: ["**/home/**"],
  timeout: 30_000,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: // --ignore-lock keeps Astro's dev server in the foreground when launched by
    // an agent/CI (it would otherwise auto-background and Playwright would see
    // the process exit).
    `npx astro dev --port ${PORT} --ignore-lock`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
