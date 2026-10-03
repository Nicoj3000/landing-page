import { SITE } from "@/data/site";
import { LOCALE_TAGS } from "@/data/site-config";
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

/** BCP 47 tag per locale (sitemap, JSON-LD, OG card), from the single map in site-config. */
export const HTML_LANG: Record<Locale, string> = LOCALE_TAGS;
/** Open Graph spells locales with an underscore: "es_CO". Derived, never duplicated. */
export const OG_LOCALE: Record<Locale, string> = {
  es: LOCALE_TAGS.es.replace("-", "_"),
  en: LOCALE_TAGS.en.replace("-", "_"),
};

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

/**
 * Path (no leading slash, no extension) of a page's OG card: "home", "en/about-me".
 * Derived from PAGE_PATH so the card URL follows the page URL. The home route has
 * no file stem ("/" and "/en"), so it is the only page given an explicit name.
 */
export function ogSlug(lang: Locale, id: PageId): string {
  const stem = PAGE_PATH[id] === PAGE_PATH.home ? "/home" : PAGE_PATH[id];
  return localizedPath(stem, lang).slice(1);
}

export const ogImagePath = (lang: Locale, id: PageId): string => `/og/${ogSlug(lang, id)}.png`;

export const ogAlt = (lang: Locale, id: PageId): string => {
  const t = useTranslations(lang);
  return `${pageMeta(lang, id).heading} — ${SITE.brand} · ${t("site.role")}`;
};
