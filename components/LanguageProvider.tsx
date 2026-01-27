"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import type { Lang } from "../lib/i18n";
import { translations } from "../lib/i18n";

// Tipul corect: obiectul de traduceri pentru o limbă (en SAU es)
type TranslationShape = (typeof translations)[Lang];

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: TranslationShape;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  const value = useMemo<LanguageContextValue>(() => {
    return {
      lang,
      setLang,
      t: translations[lang],
    };
  }, [lang]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
