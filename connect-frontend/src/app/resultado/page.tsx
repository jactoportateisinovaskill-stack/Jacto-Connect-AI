"use client";

import { useState } from "react";
import Image from "next/image";
import {
  CheckCircle2,
  Layers,
  Tag,
  Tractor,
  ChevronRight,
  MonitorPlay,
  Star,
  ExternalLink,
  BookOpen,
  Headphones,
  MessageSquare,
  ShoppingCart,
  Share,
  MessageCircle,
  FileText,
  ChevronDown,
  Wrench,
  Shield,
  Check,
} from "lucide-react";
import { useT } from "@/i18n";
import explodedJd12 from "@/assets/exploded-jd12.jpg";

import { Shell } from "@/components/jacto/Shell";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "sonner";

interface Related {
  code: string;
  name: string;
  compat: string;
}

const related: Related[] = [
  { code: "1168546", name: "Capa do bico JD-12", compat: "Bico JD-12 / SB-20B" },
  { code: "999142", name: "Anel de vedação O-ring do bico", compat: "Bico JD-12 / SB-20B" },
  { code: "999158", name: "Junta de vedação do porta-bico", compat: "Bico JD-12 / SB-20B" },
  { code: "1168545", name: "Filtro do bico M50/60", compat: "Bico JD-12 / SB-20B" },
  { code: "323456", name: "Tampa do reservatório SB-20B", compat: "Pulverizador SB-20B" },
  { code: "323478", name: "Vedação da tampa do reservatório", compat: "Pulverizador SB-20B" },
  { code: "445221", name: "Diafragma do registro LP 601", compat: "Registro / SB-20B" },
  { code: "1217605", name: "Kit de reparo do registro LP 601", compat: "Registro / SB-20B" },
];

const YOUTUBE_URL =
  "https://www.youtube.com/results?search_query=manuten%C3%A7%C3%A3o+Jacto+SB20";

export default function Resultado() {
  const t = useT();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const submitRating = () => {
    if (rating === 0 || submitted) return;
    setSubmitted(true);
    toast.success(t("rating.success"), {
      description: `${t("rating.feedback")} (${rating}/5).`,
    });
  };

  return (
    <Shell back="/capturar" title={t("result.title")}>
      <div className="mt-2 animate-slide-up">
        {/* Hero image */}
        <div className="relative mx-auto w-full max-w-[260px] overflow-hidden rounded-2xl bg-secondary shadow-[var(--shadow-card)]">
          <div className="aspect-[4/3] flex items-center justify-center bg-gradient-to-br from-zinc-700 to-zinc-900">
            <div className="h-24 w-16 rounded-[40%] bg-gradient-to-b from-zinc-300 via-zinc-400 to-zinc-600 rotate-12 shadow-2xl" />
          </div>
          <div className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-success px-2 py-1 text-[10px] font-extrabold text-success-foreground shadow-md">
            <CheckCircle2 className="h-3 w-3" /> 94%
          </div>
          <div className="absolute top-2 right-2 rounded-full bg-black/50 backdrop-blur px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
            {t("compat.identified")}
          </div>
        </div>

        {/* Identified card */}
        <div className="mt-4 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-primary">
            <Tag className="h-3 w-3" /> {t("result.code")}: 427062
          </div>
          <h2 className="mt-2 text-2xl font-extrabold leading-tight text-secondary">
            Bico Completo JD-12
          </h2>
          <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <Tractor className="h-4 w-4 text-secondary" />
            {t("result.usage")} <span className="font-semibold text-secondary">Jacto SB-20B</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 space-y-3">
          {/* {t("result.buyTitle")} — destaque */}
          <a
            href="https://www.jacto.com.br/pt/pecas-e-servicos"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex h-16 w-full items-center gap-3 rounded-xl bg-gradient-to-r from-primary to-primary/80 px-5 font-extrabold text-primary-foreground shadow-[var(--shadow-glow)] ring-2 ring-primary/30 ring-offset-2 ring-offset-background active:scale-[0.98] transition"
          >
            <ShoppingCart className="h-6 w-6" />
            <div className="flex flex-col items-start leading-tight">
              <span className="text-base">{t("result.buyTitle")}</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider opacity-90">
                {t("result.officialStore")}
              </span>
            </div>
            <ExternalLink className="ml-auto h-5 w-5" />
          </a>

          <Sheet>
            <SheetTrigger asChild>
              <button className="flex h-14 w-full items-center gap-3 rounded-xl bg-secondary px-5 text-secondary-foreground font-bold shadow-[var(--shadow-card)] active:scale-[0.98] transition cursor-pointer hover:opacity-90">
                <Layers className="h-5 w-5" />
                {t("compat.related")}
                <ChevronRight className="ml-auto h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-2xl p-0 sm:max-w-md sm:mx-auto">
              <SheetHeader className="px-5 pt-5 pb-2 text-left">
                <SheetTitle className="text-lg font-extrabold text-secondary">
                  {t("compat.related")}
                </SheetTitle>
                <SheetDescription className="text-xs text-muted-foreground">
                  {t("result.relatedDesc")}
                </SheetDescription>
              </SheetHeader>
              <ul className="max-h-[60vh] overflow-y-auto px-5 pb-6 pt-2 space-y-2">
                {related.map((r) => (
                  <li
                    key={r.code}
                    className="rounded-xl border border-border bg-card p-3 shadow-[var(--shadow-card)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-primary">
                          {t("result.code")}: {r.code}
                        </div>
                        <div className="mt-0.5 font-bold text-secondary truncate">
                          {r.name}
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-[10px] font-semibold text-secondary">
                      <CheckCircle2 className="h-3 w-3 text-success" />
                      {t("result.compatible")}: {r.compat}
                    </div>
                  </li>
                ))}
              </ul>
            </SheetContent>
          </Sheet>

          {/* {t("result.catalog")} */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="flex h-14 w-full items-center gap-3 rounded-xl border border-border bg-background px-5 font-bold text-secondary hover:bg-muted transition cursor-pointer">
                <BookOpen className="h-5 w-5 text-primary" />
                {t("result.catalog")}
                <ChevronRight className="ml-auto h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-2xl p-0 sm:max-w-md sm:mx-auto">
              <SheetHeader className="px-5 pt-5 pb-2 text-left">
                <SheetTitle className="text-lg font-extrabold text-secondary">
                  {t("result.catalog")}
                </SheetTitle>
                <SheetDescription className="text-xs text-muted-foreground">
                  {t("result.catalogDesc")}
                </SheetDescription>
              </SheetHeader>
              <div className="max-h-[70vh] overflow-y-auto px-5 pb-6 pt-2 space-y-4">
                {/* Código + nome */}
                <div className="rounded-xl border border-border bg-card p-3">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-primary">
                    <Tag className="h-3 w-3" /> {t("result.code")}: 427062
                  </div>
                  <div className="mt-1 font-extrabold text-secondary">
                    Bico Completo JD-12
                  </div>
                </div>

                {/* {t("result.explodedView")} */}
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-2">
                    {t("result.explodedView")}
                  </div>
                  <div className="rounded-xl border border-border bg-white overflow-hidden">
                    <Image
                      src={explodedJd12}
                      alt={`${t("result.explodedView")} do Bico Completo JD-12`}
                      width={1024}
                      height={1024}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>

                {/* {t("result.techInfo")} */}
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-2">
                    {t("result.techInfo")}
                  </div>
                  <dl className="rounded-xl border border-border bg-card divide-y divide-border text-sm">
                    {[
                      [t("result.category"), "Bico de pulverização"],
                      [t("result.mat"), "Polímero técnico + cerâmica"],
                      [t("result.flow"), "1,2 L/min @ 3 bar"],
                      [t("result.pressure"), "1 – 5 bar"],
                      [t("result.angle"), "110°"],
                      [t("result.thread"), "M11 x 1"],
                      [t("result.weight"), "38 g"],
                      ["Compatibilidade", "SB-20B, SB-B, SB20 Linha M"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex items-start justify-between gap-3 px-3 py-2">
                        <dt className="text-xs font-semibold text-muted-foreground">{k}</dt>
                        <dd className="text-right font-semibold text-secondary">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-14 items-center gap-3 rounded-xl border border-border bg-background px-5 font-bold text-secondary hover:bg-muted transition"
          >
            <MonitorPlay className="h-5 w-5 text-primary" />
            {t("result.youtube")}
            <span className="ml-auto inline-flex items-center gap-1 text-[11px] font-semibold text-muted-foreground">
              YouTube <ExternalLink className="h-3.5 w-3.5" />
            </span>
          </a>
        </div>


        {/* Torre de Atendimento */}
        <section className="mt-6">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            {t("dist.tower")}
          </h3>
          <div className="mt-2 rounded-2xl bg-secondary p-4 text-secondary-foreground shadow-[var(--shadow-card)]">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Headphones className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-bold">{t("dist.support")}</div>
                <div className="text-[11px] text-white/60">{t("dist.spec")}</div>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="flex h-10 items-center justify-center gap-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-bold">
                <MessageSquare className="h-4 w-4" /> {t("dist.whatsapp")}
              </a>
              <button className="flex h-10 items-center justify-center gap-1.5 rounded-lg bg-white/10 text-white text-xs font-semibold">
                <MessageSquare className="h-4 w-4" /> {t("dist.openTicket")}
              </button>
            </div>
          </div>
        </section>




        {/* Rating */}
        <div className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
          {submitted ? (
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/15 text-success">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div className="mt-3 text-sm font-extrabold text-secondary">
                {t("rating.thanks")}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {t("rating.helps").replace("ajuda", `(${rating}/5) ajuda`).replace("helps", `(${rating}/5) helps`).replace("ayuda", `(${rating}/5) ayuda`)}
              </div>
              <div className="mt-3 flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star
                    key={n}
                    className={`h-5 w-5 ${
                      n <= rating ? "fill-primary text-primary" : "text-muted-foreground/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                {t("rating.title")}
              </div>
              <div className="mt-1 text-sm font-semibold text-secondary">
                {t("rating.subtitle")}
              </div>
              <div
                className="mt-3 flex items-center gap-1.5"
                onMouseLeave={() => setHover(0)}
              >
                {[1, 2, 3, 4, 5].map((n) => {
                  const active = (hover || rating) >= n;
                  return (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setRating(n)}
                      onMouseEnter={() => setHover(n)}
                      aria-label={`${n} ${n > 1 ? t("rating.stars") : t("rating.star")}` }
                      className="p-1 transition active:scale-90"
                    >
                      <Star
                        className={`h-7 w-7 transition ${
                          active ? "fill-primary text-primary" : "text-muted-foreground/50"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
              <button
                onClick={submitRating}
                disabled={rating === 0}
                className="mt-4 h-11 w-full rounded-xl bg-secondary text-secondary-foreground text-sm font-bold transition disabled:bg-muted disabled:text-muted-foreground"
              >
                {t("rating.submit")}
              </button>
            </>
          )}
        </div>
      </div>
    </Shell>
  );
}
