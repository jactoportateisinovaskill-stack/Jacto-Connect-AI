"use client";
import { LOCALES, useLocale } from "@/i18n";

export function LanguageSwitcher({ tone = "light" }: { tone?: "light" | "dark" }) {
  const { locale, setLocale } = useLocale();
  const base =
    tone === "dark"
      ? "bg-white/10 text-white/80 border-white/10"
      : "bg-muted text-muted-foreground border-border";
  const active =
    tone === "dark"
      ? "bg-white text-secondary border-white"
      : "bg-secondary text-secondary-foreground border-secondary";
  return (
    <div
      role="group"
      aria-label="Language"
      className={`inline-flex items-center gap-0.5 rounded-full border p-0.5 ${base}`}
    >
      {LOCALES.map((l) => {
        const isActive = locale === l.code;
        return (
          <button
            key={l.code}
            type="button"
            onClick={() => setLocale(l.code)}
            className={`rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide transition ${
              isActive ? active : "hover:bg-foreground/5"
            }`}
            aria-pressed={isActive}
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
}
