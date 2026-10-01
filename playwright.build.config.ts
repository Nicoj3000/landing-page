import { defineConfig } from "@playwright/test";

/**
 * Build-output specs read files from BUILD_DIR; no browser, no dev server.
 * Used by `npm run test:build`.
 */
export default defineConfig({
  testDir: "./tests/build",
  reporter: process.env.CI ? "github" : "list",
});
