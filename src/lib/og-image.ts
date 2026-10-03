import { readFile } from "node:fs/promises";
import { srcDir } from "astro:config/server";
import satori from "satori";
import sharp from "sharp";
import { SITE } from "@/data/site";
import type { Locale } from "@/i18n/ui";
import { useTranslations } from "@/i18n/utils";
import { FONT_SUBDIR, createFontLoader } from "@/lib/og-fonts";
import { HTML_LANG, OG_SIZE, PAGE_IDS, pageMeta, type PageId } from "@/lib/seo";

/** Brand tokens (dark "Spec Sheet" palette from global.css). */
const INK = "#0A0C0F";
const RAISED = "#12151A";
const LINE = "#1E2329";
const TEXT = "#E8E6E1";
const MUTED = "#8B8A86";
const LIME = "#C8F03C";

// `srcDir` comes from Astro's resolved config, so it is right in `astro dev` and `astro build`
// regardless of process.cwd() or where the bundler places this module.
const loadFonts = createFontLoader((file) => readFile(new URL(`${FONT_SUBDIR}${file}`, srcDir)));

type Style = Record<string, string | number>;
interface Node {
  type: string;
  props: { style: Style; children?: Node | string | Array<Node | string> };
}
const el = (style: Style, children?: Node["props"]["children"]): Node => ({
  type: "div",
  props: { style: { display: "flex", ...style }, ...(children === undefined ? {} : { children }) },
});

const mono = (size: number, color: string, children: string, extra: Style = {}) =>
  el({ fontFamily: "Geist Mono", fontSize: size, color, letterSpacing: 2, ...extra }, children);

/** Spec Sheet card: ink board, blueprint grid, lime accents, mono labels. */
function card(lang: Locale, id: PageId): Node {
  const t = useTranslations(lang);
  const { heading } = pageMeta(lang, id);
  const index = String(PAGE_IDS.indexOf(id)).padStart(2, "0");
  const section = `${index} / ${(id === "home" ? t("nav.home") : heading).toUpperCase()}`;
  const subtitle = id === "home" ? `${t("site.role")} · Fullstack` : `${t("site.name")} — ${t("site.role")}`;

  const monogram = el(
    { width: 64, height: 64, alignItems: "center", justifyContent: "center", border: `2px solid ${LIME}`, background: RAISED },
    el({ fontFamily: "Bricolage Grotesque", fontWeight: 800, fontSize: 30, color: LIME }, "NX"),
  );

  return el(
    {
      width: OG_SIZE.width,
      height: OG_SIZE.height,
      flexDirection: "column",
      justifyContent: "space-between",
      padding: 56,
      background: INK,
      backgroundImage: `linear-gradient(to right, ${LINE} 1px, transparent 1px), linear-gradient(to bottom, ${LINE} 1px, transparent 1px)`,
      backgroundSize: "48px 48px",
      color: TEXT,
    },
    [
      el({ justifyContent: "space-between", alignItems: "center" }, [
        el({ alignItems: "center", gap: 20 }, [monogram, mono(24, MUTED, `${SITE.brand.toUpperCase()} / SPEC SHEET`, { fontWeight: 500 })]),
        mono(24, MUTED, HTML_LANG[lang].toUpperCase(), { fontWeight: 500 }),
      ]),
      el({ flexDirection: "column", gap: 24 }, [
        mono(30, LIME, section, { fontWeight: 500 }),
        el(
          { fontFamily: "Bricolage Grotesque", fontWeight: 800, fontSize: id === "home" ? 132 : 120, lineHeight: 1, letterSpacing: -3 },
          heading,
        ),
        mono(34, MUTED, subtitle, { letterSpacing: 0 }),
      ]),
      el({ justifyContent: "space-between", alignItems: "center" }, [
        mono(24, MUTED, new URL(SITE.url).host),
        el({ width: 220, height: 8, background: LIME }),
      ]),
    ],
  );
}

/** Renders the 1200x630 PNG of a page's social card. */
export async function renderOgImage(lang: Locale, id: PageId): Promise<Buffer> {
  const svg = await satori(card(lang, id) as unknown as Parameters<typeof satori>[0], {
    width: OG_SIZE.width,
    height: OG_SIZE.height,
    fonts: await loadFonts(),
  });
  return sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
}
