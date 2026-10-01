import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import astro from "eslint-plugin-astro";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores([
    "dist/",
    ".next/",
    "out/",
    ".claude/",
    ".playwright-mcp/",
    ".astro/",
    "node_modules/",
    "test-results/",
    "playwright-report/",
    // Legacy Next.js sources, deleted in T7. Anchored: src/lib etc. stay linted.
    "app/",
    "components/",
    "lib/",
    "utils/",
    "data.tsx",
    "next.config.mjs",
    "tailwind.config.ts",
    "postcss.config.mjs",
  ]),
  js.configs.recommended,
  tseslint.configs.recommended,
  astro.configs.recommended,
  {
    files: ["**/*.{js,mjs,ts}"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  {
    rules: {
      "@typescript-eslint/consistent-type-imports": ["error", { fixStyle: "inline-type-imports" }],
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    },
  },
]);
