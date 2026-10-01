/// <reference types="astro/client" />

type ThemePreference = "light" | "dark" | "system";

interface Window {
  /** Defined by the inline theme script in BaseLayout; persists and applies a preference. */
  __setTheme?: (pref: ThemePreference) => void;
}
