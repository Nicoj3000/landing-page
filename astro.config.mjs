import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { LOCALE_TAGS, SITE_ORIGIN } from "./src/data/site-config.ts";

export default defineConfig({
  site: SITE_ORIGIN,
  output: "static",
  // No trailing slash: matches the URLs the legacy site already exposed
  // (/about-me, not /about-me/). `format: "file"` emits about-me.html, which
  // Netlify serves at /about-me without a redirect hop.
  trailingSlash: "never",
  // Inline the (~7 KB) stylesheet so first render needs no render-blocking request.
  build: { format: "file", inlineStylesheets: "always" },
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: { prefixDefaultLocale: false },
  },
  // Plain document loads (no client router): warm the next page as links enter the viewport.
  prefetch: { prefetchAll: true, defaultStrategy: "viewport" },
  // The dev toolbar overlaps the bottom dock and intercepts pointer events in e2e.
  devToolbar: { enabled: false },
  // Status pages are noindex; keep them out of the sitemap too.
  integrations: [
    sitemap({
      filter: (page) => !/\/(404|error)\/?$/.test(page),
      // Emits <xhtml:link> alternates (es-CO / en-US) for each page pair.
      i18n: { defaultLocale: "es", locales: { ...LOCALE_TAGS } },
    }),
  ],
  vite: { plugins: [tailwindcss()] },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Bricolage Grotesque",
      cssVariable: "--af-display",
      weights: ["400", "600", "700"],
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
