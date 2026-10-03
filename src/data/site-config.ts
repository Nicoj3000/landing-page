/**
 * Build-time constants shared by the app, `astro.config.mjs` and the tests.
 * Dependency-free on purpose: the Astro config loads it before aliases (`@/`) exist.
 */

/** Production origin: Astro `site`, canonical/hreflang/OG URLs, JSON-LD, robots. */
export const SITE_ORIGIN = "https://nicoj3000.netlify.app";

/**
 * Locale -> BCP 47 tag. The one source for the sitemap alternates, the `og:locale`
 * values (underscore form), the OG card label and the JSON-LD `inLanguage`.
 */
export const LOCALE_TAGS = { es: "es-CO", en: "en-US" } as const;
