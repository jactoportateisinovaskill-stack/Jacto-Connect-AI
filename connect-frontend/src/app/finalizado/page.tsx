"use client";

import Link from "next/link";
import { Check, Plus } from "lucide-react";
import { Shell } from "@/components/jacto/Shell";

import { useT } from "@/i18n";

import { useDetection } from "@/lib/DetectionContext";
import { useEquipment } from "@/lib/equipment";

export default function Finalizado() {
  const t = useT();
  const { detectionResult } = useDetection();
  const [stored] = useEquipment();

  // Pegando o nome e o código vindos diretamente da API
  const detectedName = detectionResult?.nome_peca || "Não encontrado";
  const detectedCode = detectionResult?.codigo || "0";
  
  const confidencePercent = detectionResult ? Math.round(detectionResult.confianca) : 0;

  // Pegar data e hora atuais
  const now = new Date();
  const dataFormatada = now.toLocaleDateString("pt-BR");
  const horaFormatada = now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

  const resumo = [
    [t("finish.itemIdent"), `${detectedName} (${detectedCode})`],
    [t("finish.usage"), stored?.modelo ? `Jacto ${stored.modelo}` : "Jacto (Desconhecido)"],
    [t("finish.tech"), "Null"],
    [t("finish.date"), `${dataFormatada} · ${horaFormatada}`],
    [t("finish.conf"), `${confidencePercent}%`],
  ];

  return (
    <Shell back="/" title={t("finish.title")}>
      <div className="mt-6 flex flex-col items-center text-center animate-slide-up">
        <div className="relative flex h-28 w-28 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-primary/15 animate-pulse-ring" />
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-glow)]">
            <Check className="h-12 w-12" strokeWidth={3} />
          </div>
        </div>
        <h2 className="mt-6 text-2xl font-extrabold tracking-tight text-secondary">
          {t("finish.successTitle").split("\\n").map((line, i) => (<span key={i}>{line}<br /></span>))}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-[280px]">
          {t("finish.successSub")}
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
        <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">{t("finish.summary")}</div>
        <dl className="mt-3 divide-y divide-border">
          {resumo.map(([k, v]) => (
            <div key={k} className="flex items-start justify-between gap-4 py-2.5">
              <dt className="text-xs text-muted-foreground">{k}</dt>
              <dd className="text-sm font-semibold text-secondary text-right">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-auto pt-8">
        <Link
          href="/"
          className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground font-bold shadow-[var(--shadow-glow)] active:scale-[0.98] transition"
        >
          <Plus className="h-5 w-5" /> {t("finish.newIdent")}
        </Link>
      </div>
    </Shell>
  );
}
