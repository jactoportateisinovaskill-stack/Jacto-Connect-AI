"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Globe2, Calendar, MapPin, AlertCircle, AlertTriangle, Info, ShieldAlert, LogOut, Search, Filter } from "lucide-react";
import { useT } from "@/i18n";
import { Shell } from "@/components/jacto/Shell";
import { useAuth } from "@/lib/auth";

type Level = "low" | "medium" | "high" | "critical";

interface Hotspot {
  x: number;
  y: number;
  level: Level;
  label: string;
  region: string;
  macro: Macro;
  parts: string[]; // part codes recorrentes
}

type Macro = "all" | "latam" | "na" | "eu" | "africa" | "asia" | "oceania";

const hotspots: Hotspot[] = [
  { x: 33, y: 68, level: "critical", label: "BR", region: "Brasil — Mato Grosso", macro: "latam", parts: ["427062", "1168545"] },
  { x: 28, y: 78, level: "high", label: "AR", region: "Argentina — Pampa", macro: "latam", parts: ["427062", "915769"] },
  { x: 22, y: 44, level: "high", label: "US", region: "EUA — Midwest", macro: "na", parts: ["1265961", "1217605"] },
  { x: 25, y: 56, level: "medium", label: "MX", region: "México — Bajío", macro: "na", parts: ["1168545"] },
  { x: 51, y: 40, level: "high", label: "UA", region: "Ucrânia", macro: "eu", parts: ["1217605", "427062"] },
  { x: 49, y: 60, level: "medium", label: "NG", region: "Nigéria", macro: "africa", parts: ["915769"] },
  { x: 54, y: 74, level: "low", label: "ZA", region: "África do Sul", macro: "africa", parts: ["1168545"] },
  { x: 67, y: 52, level: "critical", label: "IN", region: "Índia — Punjab", macro: "asia", parts: ["427062", "1265961"] },
  { x: 76, y: 48, level: "medium", label: "CN", region: "China — Henan", macro: "asia", parts: ["1217605"] },
  { x: 82, y: 76, level: "low", label: "AU", region: "Austrália — NSW", macro: "oceania", parts: ["1265961"] },
];

const levelColor: Record<Level, string> = {
  low: "#A8F28F",
  medium: "#FFD75E",
  high: "#FF9A3C",
  critical: "#FF4D36",
};
const levelSize: Record<Level, number> = { low: 20, medium: 30, high: 42, critical: 54 };



export default function Insights() {
  const t = useT();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [period, setPeriod] = useState<"7d" | "30d" | "90d">("30d");
  const [macro, setMacro] = useState<Macro>("all");
  const [partCode, setPartCode] = useState("");

  const macros: { id: Macro; label: string }[] = [
    { id: "all", label: t("insights.macroAll") },
    { id: "latam", label: t("insights.macroLatam") },
    { id: "na", label: t("insights.macroNa") },
    { id: "eu", label: t("insights.macroEu") },
    { id: "africa", label: t("insights.macroAfrica") },
    { id: "asia", label: t("insights.macroAsia") },
    { id: "oceania", label: t("insights.macroOceania") },
  ];

  const filtered = useMemo(() => {
    return hotspots.filter((h) => {
      if (macro !== "all" && h.macro !== macro) return false;
      const q = partCode.trim();
      if (q && !h.parts.some((p) => p.includes(q))) return false;
      return true;
    });
  }, [macro, partCode]);

  return (
    <Shell back="/" title={t("insights.title")} bg="muted">
      {/* Header bar — corporate */}
      <div className="mt-2 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Globe2 className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              {t("insights.globalOp")}
            </div>
            <div className="text-sm font-extrabold text-secondary truncate">
              {user?.name ?? "Gestor"} · {t("insights.managerView")}
            </div>
          </div>
        </div>
        <div className="inline-flex rounded-full bg-muted p-1 text-[11px] font-semibold">
          {(["7d", "30d", "90d"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1 rounded-full transition ${
                period === p ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              {p === "7d" ? t("insights.days7") : p === "30d" ? t("insights.days30") : t("insights.days90")}
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="mt-3 rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          <Filter className="h-3.5 w-3.5" />
          {t("insights.filters")}
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_auto]">
          <label className="relative block">
            <span className="sr-only">Código da peça</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={partCode}
              onChange={(e) => setPartCode(e.target.value.replace(/\D/g, "").slice(0, 10))}
              inputMode="numeric"
              placeholder={t("insights.partCode")}
              className="h-10 w-full rounded-xl border border-border bg-background pl-9 pr-3 text-sm text-secondary outline-none transition focus:border-primary"
            />
          </label>
          {partCode && (
            <button
              onClick={() => setPartCode("")}
              className="h-10 rounded-xl border border-border bg-muted px-3 text-xs font-bold text-secondary hover:bg-accent"
            >
              {t("insights.clear")}
            </button>
          )}
        </div>

        <div className="mt-3 -mx-1 flex gap-1.5 overflow-x-auto pb-1">
          {macros.map((m) => {
            const active = macro === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setMacro(m.id)}
                className={`whitespace-nowrap rounded-full px-3 py-1.5 text-[11px] font-bold transition ${
                  active
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-muted text-muted-foreground hover:text-secondary"
                }`}
              >
                {m.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Heatmap */}
      <div
        className="mt-3 rounded-2xl border border-border p-3 shadow-[var(--shadow-card)]"
        style={{ background: "#F3F3F3" }}
      >
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-bold text-secondary">{t("insights.globalMap")}</h3>
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            {filtered.length}/{hotspots.length} · {period}
          </span>
        </div>

        <div className="relative mt-2 aspect-[2/1] overflow-hidden rounded-xl" style={{ background: "#F3F3F3" }}>
          <WorldMap />
          {filtered.map((h) => {
            const size = levelSize[h.level];
            const color = levelColor[h.level];
            return (
              <div
                key={h.label}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${h.x}%`, top: `${h.y}%` }}
                title={`${h.region} — ${h.parts.join(", ")}`}
              >
                <span
                  className="block rounded-full"
                  style={{
                    width: size * 2,
                    height: size * 2,
                    background: `radial-gradient(circle, ${color}cc 0%, ${color}66 40%, ${color}00 70%)`,
                    filter: "blur(2px)",
                  }}
                />
                <span
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    width: size * 0.45,
                    height: size * 0.45,
                    background: color,
                  }}
                />
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-muted-foreground">
              {t("insights.empty")}
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="mt-3 flex items-center justify-between gap-2 px-1">
          {(["low", "medium", "high", "critical"] as Level[]).map((l) => (
            <div key={l} className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: levelColor[l] }} />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {l === "low" ? t("insights.low") : l === "medium" ? t("insights.medium") : l === "high" ? t("insights.high") : t("insights.critical")}
              </span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => {
          logout();
          router.push("/");
        }}
        className="mt-4 inline-flex items-center justify-center gap-2 self-start rounded-xl border border-border bg-card px-4 py-2 text-xs font-bold text-secondary shadow-[var(--shadow-card)] hover:bg-muted"
      >
        <LogOut className="h-3.5 w-3.5" /> {t("insights.logout")}
      </button>
    </Shell>
  );
}

function WorldMap() {
  return (
    <svg
      viewBox="0 0 200 100"
      preserveAspectRatio="xMidYMid meet"
      className="absolute inset-0 h-full w-full"
      fill="#111111"
    >
      <path d="M18 22 C28 18 42 18 52 24 C58 30 56 38 52 44 C46 50 38 54 30 52 C24 56 18 58 14 54 C8 48 8 38 12 30 C12 26 14 22 18 22 Z" />
      <path d="M44 50 C50 52 54 56 52 60 C48 62 44 58 42 54 Z" />
      <path d="M58 60 C66 58 72 64 72 72 C70 80 64 88 58 90 C54 84 52 76 54 68 C54 64 56 60 58 60 Z" />
      <path d="M94 30 C102 28 110 30 112 36 C108 42 100 42 94 40 C92 36 92 32 94 30 Z" />
      <path d="M96 46 C106 44 114 50 114 60 C112 70 106 78 100 78 C94 74 92 64 94 54 C94 50 95 47 96 46 Z" />
      <path d="M114 46 C120 46 124 50 122 56 C118 60 114 56 112 52 Z" />
      <path d="M114 22 C140 20 160 22 172 28 C168 34 158 36 144 36 C132 36 120 34 114 30 Z" />
      <path d="M130 46 C136 46 140 52 138 58 C134 62 130 58 128 52 Z" />
      <path d="M146 36 C158 36 166 40 168 46 C164 52 154 52 146 48 C142 44 142 38 146 36 Z" />
      <path d="M156 56 C162 56 164 60 162 64 C158 66 154 62 154 58 Z" />
      <path d="M158 72 C168 70 176 74 176 80 C172 86 162 86 156 82 C154 78 156 74 158 72 Z" />
      <path d="M70 14 C76 12 82 16 82 22 C78 26 72 24 70 20 Z" />
    </svg>
  );
}
