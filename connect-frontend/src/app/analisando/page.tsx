"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ScanLine, Cpu, Sparkles, CheckCircle2 } from "lucide-react";
import { useT } from "@/i18n";
import { Shell } from "@/components/jacto/Shell";

export default function Analisando() {
  const t = useT();
  const steps = [
    { icon: ScanLine, label: t("analyzing.step1") },
    { icon: Cpu, label: t("analyzing.step2") },
    { icon: Sparkles, label: t("analyzing.step3") },
  ];
  const router = useRouter();
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setPct((p) => {
        if (p >= 100) {
          clearInterval(t);
          setTimeout(() => router.push("/resultado"), 120);
          return 100;
        }
        return p + 10;
      });
    }, 45);
    return () => clearInterval(t);
  }, [router]);

  const activeIdx = Math.min(steps.length - 1, Math.floor((pct / 100) * steps.length));

  return (
    <Shell back="/capturar" title={t("analyzing.title")}>
      <div className="relative mt-4 mx-auto aspect-square w-44 overflow-hidden rounded-2xl bg-secondary shadow-[var(--shadow-card)]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-28 w-20 rounded-[40%] bg-gradient-to-b from-zinc-400 to-zinc-600 rotate-12" />
        </div>
        <div className="absolute inset-x-0 top-0 h-1 bg-primary animate-scan" />
        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
      </div>

      <div className="mt-8 text-center">
        <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{t("analyzing.vision")}</div>
        <h2 className="mt-2 text-xl font-extrabold text-secondary">{t("analyzing.analyzingText")}</h2>
      </div>

      <div className="mt-8">
        <div className="flex items-end justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("analyzing.progress")}</span>
          <span className="text-2xl font-extrabold text-secondary tabular-nums">{pct}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-primary transition-all duration-100" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <ul className="mt-8 space-y-3">
        {steps.map((s, i) => {
          const done = i < activeIdx || pct >= 100;
          const active = i === activeIdx && pct < 100;
          const Icon = done ? CheckCircle2 : s.icon;
          return (
            <li
              key={s.label}
              className={`flex items-center gap-3 rounded-xl border p-3 transition ${
                active
                  ? "border-primary bg-accent"
                  : done
                  ? "border-success/30 bg-success/5"
                  : "border-border bg-background"
              }`}
            >
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                  done
                    ? "bg-success text-success-foreground"
                    : active
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <span className={`text-sm font-semibold ${done || active ? "text-secondary" : "text-muted-foreground"}`}>
                {s.label}
              </span>
              {active && (
                <span className="ml-auto h-2 w-2 rounded-full bg-primary animate-pulse" />
              )}
            </li>
          );
        })}
      </ul>
    </Shell>
  );
}
