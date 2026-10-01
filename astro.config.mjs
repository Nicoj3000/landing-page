import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://nicoj3000.netlify.app",
  output: "static",
  // No trailing slash: matches the URLs the legacy site already exposed
  // (/about-me, not /about-me/). `format: "file"` emits about-me.html, which
  // Netlify serves at /about-me without a redirect hop.
  trailingSlash: "never",
  build: { format: "file" },
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: { prefixDefaultLocale: false },
  },
  // The dev toolbar overlaps the bottom dock and intercepts pointer events in e2e.
  devToolbar: { enabled: false },
  // Status pages are noindex; keep them out of the sitemap too.
  integrations: [sitemap({ filter: (page) => !/\/(404|error)\/?$/.test(page) })],
  vite: {
    plugins: [tailwindcss()],
    // Ignore the legacy postcss.config.mjs (Tailwind 3 / Next) until T7 deletes it.
    css: { postcss: { plugins: [] } },
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Bricolage Grotesque",
      cssVariable: "--af-display",
      weights: ["200 800"],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["sans-serif"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Geist",
      cssVariable: "--af-body",
      weights: ["100 900"],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["sans-serif"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Geist Mono",
      cssVariable: "--af-mono",
      weights: ["100 900"],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["monospace"],
    },
  ],
});
