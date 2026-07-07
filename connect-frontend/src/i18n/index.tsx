"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { pt, type Dict } from "./locales/pt";
import { en } from "./locales/en";
import { es } from "./locales/es";

export type Locale = "pt" | "en" | "es";

const dictionaries: Record<Locale, Dict> = { pt, en, es };

export const LOCALES: { code: Locale; label: string }[] = [
  { code: "pt", label: "PT" },
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
];

const KEY = "jacto:locale";

interface Ctx {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: <K1 extends keyof Dict, K2 extends keyof Dict[K1]>(path: `${K1 & string}.${K2 & string}`) => string;
}

const LocaleCtx = createContext<Ctx | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("pt");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(KEY) as Locale | null;
    if (stored && stored in dictionaries) setLocaleState(stored);
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    if (typeof window !== "undefined") window.localStorage.setItem(KEY, l);
  }, []);

  const t = useCallback<Ctx["t"]>(
    (path) => {
      const [a, b] = path.split(".") as [keyof Dict, string];
      const section = dictionaries[locale][a] as Record<string, string>;
      return section?.[b] ?? path;
    },
    [locale],
  );

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);
  return <LocaleCtx.Provider value={value}>{children}</LocaleCtx.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleCtx);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}

export function useT() {
  return useLocale().t;
}
