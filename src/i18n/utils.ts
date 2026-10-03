import { DEFAULT_LOCALE, LOCALES, ui, type Locale, type UiKey } from "./ui";

export function isLocale(value: string | undefined): value is Locale {
  return LOCALES.some((locale) => locale === value);
}

/** Reads the locale from the first path segment; falls back to the default. */
export function getLangFromUrl(url: URL): Locale {
  const [, segment] = url.pathname.split("/");
  return isLocale(segment) ? segment : DEFAULT_LOCALE;
}

export function useTranslations(lang: Locale) {
  return function t(key: UiKey): string {
    return ui[lang][key] ?? ui[DEFAULT_LOCALE][key];
  };
}

/**
 * Canonical shape of a pathname, independent of build format: no `.html`
 * suffix, no trailing `index`, no trailing slash ("/about-me.html" ->
 * "/about-me", "/en/index.html" -> "/en"). The one place every URL consumer
 * (canonical, hreflang, language switch, aria-current) normalizes through.
 */
export function normalizePathname(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  const last = parts.at(-1);
  if (last !== undefined) {
    const stem = last.replace(/\.html$/, "");
    if (stem === "index") parts.pop();
    else parts[parts.length - 1] = stem;
  }
  return parts.length === 0 ? "/" : `/${parts.join("/")}`;
}

/** Removes the locale prefix: "/en/about-me" -> "/about-me", "/en" -> "/". */
export function stripLocale(pathname: string): string {
  const parts = normalizePathname(pathname).split("/").filter(Boolean);
  if (isLocale(parts[0])) parts.shift();
  return parts.length === 0 ? "/" : `/${parts.join("/")}`;
}

/**
 * Builds the path of a locale-neutral route ("/", "/about-me") for a locale.
 * Default locale is unprefixed; no trailing slash except for the root.
 */
export function localizedPath(path: string, lang: Locale): string {
  const clean = stripLocale(path);
  if (lang === DEFAULT_LOCALE) return clean;
  return clean === "/" ? `/${lang}` : `/${lang}${clean}`;
}

export function switchLocalePath(pathname: string, lang: Locale): string {
  return localizedPath(pathname, lang);
}
