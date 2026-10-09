"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { detectLang, LANGS, type Lang, type T } from "@/lib/i18n";

const STORAGE_KEY = "giramenu-lang";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (text: T) => string };
const LangContext = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("pt");

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {}
    const initial = saved && (LANGS as readonly string[]).includes(saved) ? (saved as Lang) : detectLang();
    setLangState(initial);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-PT" : lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {}
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: (text) => text[lang] }}>{children}</LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang precisa do LangProvider");
  return ctx;
}
