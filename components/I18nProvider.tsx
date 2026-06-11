"use client";
import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/utils/i18n";

const STORAGE_KEY = "nicox-lang";

// SSR always renders the default language ("es"); the real preference is only
// known on the client, so it's applied after mount to keep hydration clean.
export default function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      // localStorage unavailable (privacy mode); fall back to browser language
    }
    const preferred =
      saved ?? (window.navigator.language.startsWith("es") ? "es" : "en");
    if (preferred !== i18n.language) {
      i18n.changeLanguage(preferred);
    }

    const persist = (lng: string) => {
      try {
        window.localStorage.setItem(STORAGE_KEY, lng);
      } catch {
        // best effort only
      }
    };
    i18n.on("languageChanged", persist);
    return () => {
      i18n.off("languageChanged", persist);
    };
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
