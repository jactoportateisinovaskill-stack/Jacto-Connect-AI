"use client";

import Link from "next/link";
import { Tractor, Cog, Circle, ChevronRight, MapPin } from "lucide-react";
import { useT } from "@/i18n";
import { Shell } from "@/components/jacto/Shell";

const equipamentos = [
  { name: "Jacto SB-20B", tag: "Identificado" },
  { name: "Jacto SB-B", tag: "Compatível" },
  { name: "Jacto SB20 Linha M", tag: "Compatível" },
];

const relacionadas = [
  { code: "1168547", name: "Bico JD 12" },
  { code: "1168545", name: "Filtro do bico M50/60" },
  { code: "1168546", name: "Capa do bico" },
];

export default function Compat() {
  const t = useT();
  return (
    <Shell back="/resultado" title={t("compat.title")} bg="muted">
      <div className="mt-2 rounded-2xl bg-secondary p-5 text-secondary-foreground shadow-[var(--shadow-card)]">
        <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">{t("compat.identified")}</div>
        <div className="mt-1 text-lg font-extrabold">Bico Completo JD-12</div>
        <div className="text-xs text-white/60">427062 · {t("compat.usage")} SB-B</div>
      </div>

      <section className="mt-6">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
          {t("compat.compatEquip")}
        </h3>
        <ul className="mt-2 space-y-2">
          {equipamentos.map((e, i) => (
            <li
              key={e.name}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 shadow-[var(--shadow-card)]"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                  i === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-secondary"
                }`}
              >
                <Tractor className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-secondary">{e.name}</div>
                <div className="text-xs text-muted-foreground">Linha pulverizadores</div>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                  i === 0 ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {e.tag}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
          {t("compat.related")}
        </h3>
        <div className="mt-2 grid grid-cols-1 gap-2">
          {/* identified hero */}
          <div className="flex items-center gap-3 rounded-xl border-2 border-primary bg-card p-3 shadow-[var(--shadow-card)]">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Cog className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-primary">Identificada</div>
              <div className="font-bold text-secondary">Bico Completo JD-12</div>
            </div>
            <span className="text-xs font-mono font-bold text-secondary">427062</span>
          </div>

          {relacionadas.map((r) => (
            <div
              key={r.code}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground">
                <Circle className="h-4 w-4" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{t("compat.suggested")}</div>
                <div className="font-semibold text-secondary">{r.name}</div>
              </div>
              <span className="text-xs font-mono text-muted-foreground">{r.code}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          ))}
        </div>
      </section>

      <Link
        href="/distribuidores"
        className="mt-8 flex h-14 items-center gap-3 rounded-xl bg-primary px-5 text-primary-foreground font-bold shadow-[var(--shadow-glow)]"
      >
        <MapPin className="h-5 w-5" /> {t("compat.findDist")}
        <ChevronRight className="ml-auto h-5 w-5" />
      </Link>
    </Shell>
  );
}
