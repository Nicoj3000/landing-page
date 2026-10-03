import type satori from "satori";

export type OgFonts = Parameters<typeof satori>[1]["fonts"];

/**
 * satori reads TTF/OTF/WOFF only (no WOFF2), so static WOFF files are bundled in the repo,
 * under `<srcDir>/assets/fonts/`. The caller resolves that directory from Astro's
 * `srcDir` (a module-relative URL would point into the build's temp chunks).
 */
export const FONT_SUBDIR = "assets/fonts/";

export const FONT_FILES = {
  display: "bricolage-grotesque-latin-800-normal.woff",
  mono: "geist-mono-latin-400-normal.woff",
  monoMedium: "geist-mono-latin-500-normal.woff",
} as const;

/**
 * Returns a loader that reads the fonts once and shares the result. A failed load is NOT
 * cached: the next call retries instead of replaying the same rejected promise.
 */
export function createFontLoader(read: (file: string) => Promise<Buffer>): () => Promise<OgFonts> {
  let cached: Promise<OgFonts> | undefined;
  return () => {
    const attempt = (cached ??= Promise.all([
      read(FONT_FILES.display),
      read(FONT_FILES.mono),
      read(FONT_FILES.monoMedium),
    ]).then(([display, mono, monoMedium]): OgFonts => [
      { name: "Bricolage Grotesque", data: display, weight: 800, style: "normal" },
      { name: "Geist Mono", data: mono, weight: 400, style: "normal" },
      { name: "Geist Mono", data: monoMedium, weight: 500, style: "normal" },
    ]));
    attempt.catch(() => {
      if (cached === attempt) cached = undefined;
    });
    return attempt;
  };
}
