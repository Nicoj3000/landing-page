import { SITE } from "@/data/site";
import type { Locale, UiKey } from "@/i18n/ui";
import { localizedPath, useTranslations } from "@/i18n/utils";

/** Pages that own metadata and an OG card. Status pages (404/error) reuse "home". */
export const PAGE_IDS = ["home", "about", "services", "portfolio"] as const;
export type PageId = (typeof PAGE_IDS)[number];

/** Locale-neutral route of each page. */
export const PAGE_PATH: Record<PageId, string> = {
  home: "/",
  about: "/about-me",
  services: "/services",
  portfolio: "/portfolio",
};

const NAV_KEY: Record<Exclude<PageId, "home">, UiKey> = {
  about: "nav.about",
  services: "nav.services",
  portfolio: "nav.portfolio",
};

const DESCRIPTION_KEY: Record<PageId, UiKey> = {
  home: "site.description",
  about: "seo.about.description",
  services: "seo.services.description",
  portfolio: "seo.portfolio.description",
};

export const OG_SIZE = { width: 1200, height: 630 } as const;

/** BCP 47 tag used in sitemap/JSON-LD, and Open Graph's underscore variant. */
export const HTML_LANG: Record<Locale, string> = { es: "es-CO", en: "en-US" };
export const OG_LOCALE: Record<Locale, string> = { es: "es_CO", en: "en_US" };

export interface PageMeta {
  /** Document title: "Section | Name" (home: "Name | Role"). */
  title: string;
  /** Short heading used on the OG card. */
  heading: string;
  description: string;
}

export function pageMeta(lang: Locale, id: PageId): PageMeta {
  const t = useTranslations(lang);
  const name = t("site.name");
  const description = t(DESCRIPTION_KEY[id]);
  if (id === "home") return { title: `${name} | ${t("site.role")}`, heading: name, description };
  const section = t(NAV_KEY[id]);
  return { title: `${section} | ${name}`, heading: section, description };
}

/** Path (no leading slash, no extension) of a page's OG card: "home", "en/about-me". */
export function ogSlug(lang: Locale, id: PageId): string {
  const path = localizedPath(PAGE_PATH[id], lang);
  const slug = path === "/" ? "home" : path === "/en" ? "en/home" : path.slice(1);
  return slug;
}

export const ogImagePath = (lang: Locale, id: PageId): string => `/og/${ogSlug(lang, id)}.png`;

export const ogAlt = (lang: Locale, id: PageId): string => {
  const t = useTranslations(lang);
  return `${pageMeta(lang, id).heading} — ${SITE.brand} · ${t("site.role")}`;
};
