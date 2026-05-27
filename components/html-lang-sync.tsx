"use client";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export function HtmlLangSync() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return null;
}
