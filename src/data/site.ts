import type { Locale } from "@/i18n/ui";
import type { UiKey } from "@/i18n/ui";
import { SITE_ORIGIN } from "@/data/site-config";

export const SITE = {
  /** Short brand used for og:site_name, the manifest and WebSite JSON-LD. */
  brand: "NicoX",
  url: SITE_ORIGIN,
  mail: "nicoj3000its@gmail.com",
  github: "https://github.com/Nicoj3000",
  linkedin: "https://www.linkedin.com/in/nicolas-delgado-6b22372b7/",
} as const;

export const mailto = (subject?: string): string =>
  subject ? `mailto:${SITE.mail}?subject=${encodeURIComponent(subject)}` : `mailto:${SITE.mail}`;

/** The CV is a per-locale PDF in /public. */
export const cvPath = (lang: Locale): string => `/hoja-de-vida-${lang}.pdf`;

export interface NavItem {
  href: string;
  key: UiKey;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { href: "/", key: "nav.home" },
  { href: "/about-me", key: "nav.about" },
  { href: "/services", key: "nav.services" },
  { href: "/portfolio", key: "nav.portfolio" },
];
