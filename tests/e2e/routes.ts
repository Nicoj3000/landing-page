export type Lang = "es" | "en";

export interface Route {
  name: string;
  es: string;
  en: string;
}

export const ROUTES: readonly Route[] = [
  { name: "home", es: "/", en: "/en" },
  { name: "about", es: "/about-me", en: "/en/about-me" },
  { name: "services", es: "/services", en: "/en/services" },
  { name: "portfolio", es: "/portfolio", en: "/en/portfolio" },
];

export const LANGS: readonly Lang[] = ["es", "en"];
