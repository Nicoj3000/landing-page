export const LOCALES = ["es", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "es";

export const LOCALE_LABEL: Record<Locale, string> = {
  es: "Español",
  en: "English",
};

const es = {
  "nav.home": "Inicio",
  "nav.about": "Sobre mí",
  "nav.services": "Mis servicios",
  "nav.portfolio": "Portafolio",
  "nav.mail": "Correo",
  "nav.label": "Navegación principal",
  "a11y.skipToContent": "Saltar al contenido",
  "site.name": "Nicolás Delgado",
  "site.description":
    "Ingeniero de Sistemas enfocado en crear experiencias digitales de alto impacto, con liderazgo en estrategia TI, desarrollo fullstack y mentoría técnica.",
} as const;

export type UiKey = keyof typeof es;

const en: Record<UiKey, string> = {
  "nav.home": "Home",
  "nav.about": "About me",
  "nav.services": "My services",
  "nav.portfolio": "Portfolio",
  "nav.mail": "Mail",
  "nav.label": "Main navigation",
  "a11y.skipToContent": "Skip to content",
  "site.name": "Nicolás Delgado",
  "site.description":
    "Systems Engineer focused on building high-impact digital experiences, with leadership in IT strategy, fullstack development, and technical mentoring.",
};

export const ui: Record<Locale, Record<UiKey, string>> = { es, en };
