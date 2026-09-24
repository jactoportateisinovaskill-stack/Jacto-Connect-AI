"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  XCircle,
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
  AlertCircle,
  LogOut,
} from "lucide-react";
import { useT, useLocale } from "@/i18n";
import { getTranslatedPartName } from "@/lib/parts-translations";

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
import { useDetection } from "@/lib/DetectionContext";
import { useEquipment } from "@/lib/equipment";
import { API_URL } from "@/lib/api";

interface Related {
  code: string;
  name: string;
  compat: string;
}

export default function Resultado() {
  const t = useT();
  const { locale } = useLocale();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();
  const { detectionResult, imageFile } = useDetection();
  const [stored] = useEquipment();
  const [relatedParts, setRelatedParts] = useState<Related[]>([]);
  const [maquinasCompativeis, setMaquinasCompativeis] = useState<string>("");

  const imageUrl = (detectionResult?.url_foto_principal && !detectionResult.url_foto_principal.endsWith("None"))
    ? detectionResult.url_foto_principal
    : "/assets/no-image.svg";

  const [historicoId, setHistoricoId] = useState<number | null>(null);
  const historicoSalvoRef = useRef(false);

  useEffect(() => {
    // Só roda se já não salvou o histórico. A tela de resultado sempre deve registrar.
    if (historicoSalvoRef.current) return;

    const salvarHistorico = async () => {
      historicoSalvoRef.current = true;
      try {
        let fileUrl = "";
        
        let currentModelo = stored?.modelo;
        if (!currentModelo) {
          try {
            const raw = window.localStorage.getItem("jacto:equipment");
            if (raw) currentModelo = JSON.parse(raw).modelo;
          } catch {}
        }

        // Se houver uma foto tirada pelo usuário salva no contexto, fazemos o upload
        if (imageFile) {
          const formData = new FormData();
          // Garante um nome de arquivo descritivo
          const sufixoPeca = detectionResult?.id ? `peca_${detectionResult.id}` : "falha";
          const fileName = `foto_${currentModelo || "Desconhecido"}_${sufixoPeca}_${Date.now()}.jpg`;
          
          formData.append("file", imageFile, fileName);
          
          const uploadRes = await fetch(`${API_URL}/storage/buckets/historico_fotos/upload`, {
            method: "POST",
            body: formData,
          });
          
          if (uploadRes.ok) {
            const uploadData = await uploadRes.json();
            fileUrl = uploadData?.data?.public_url || "";
          } else {
            console.error("Falha no upload da foto", await uploadRes.text());
          }
        }

        // Busca o ID real da máquina no banco baseado no modelo
        let maquinaId = null;
        if (currentModelo) {
          const maquinasRes = await fetch(`${API_URL}/database/maquinas`);
          if (maquinasRes.ok) {
            const maquinas = await maquinasRes.json();
            const maquinaAtual = maquinas.find((m: any) => m.modelo?.toLowerCase() === currentModelo?.toLowerCase());
            if (maquinaAtual) maquinaId = maquinaAtual.id;
          }
        }

        // Salva o Histórico
        const historicoRes = await fetch(`${API_URL}/database/historicos`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            maquina_id: detectionResult?.id ? maquinaId : null,
            peca_identificada_id: detectionResult?.id || null,
            url_foto_cliente: fileUrl,
            confianca_ia: detectionResult?.confianca || 0,
            status: detectionResult?.id ? "Identificada" : "Não Identificada"
          })
        });
        
        const historicoData = await historicoRes.json();
        if (historicoData.id) {
          setHistoricoId(historicoData.id);
        }
      } catch (err) {
        console.error("Erro ao salvar histórico:", err);
      }
    };
    
    salvarHistorico();
  }, [detectionResult, imageFile, stored?.modelo]);

  useEffect(() => {
    if (!detectionResult?.id) return;

    Promise.all([
      fetch(`${API_URL}/database/pecas`).then(r => r.json()),
      fetch(`${API_URL}/database/peca-relacionada`).then(r => r.json())
    ]).then(([parts, relations]) => {
      if (Array.isArray(parts) && Array.isArray(relations)) {
        const myRelations = relations.filter((r: any) => r.peca_id === detectionResult.id);
        const mapped = myRelations.map((rel: any) => {
          const p = parts.find((p: any) => p.id === rel.peca_relacionada_id);
          if (!p) return null;
          return {
            code: p.codigo_jacto,
            name: getTranslatedPartName(p.codigo_jacto, p.nome, locale),
            compat: "Compatível"
          };
        }).filter((item): item is Related => item !== null);
        setRelatedParts(mapped);
      }
    }).catch(err => {
      console.error("Erro ao buscar peças relacionadas:", err);
      setRelatedParts([]);
    });
  }, [detectionResult?.id, locale]);

  useEffect(() => {
    if (detectionResult?.id) {
      fetch(`${API_URL}/database/pecas/${detectionResult.id}/maquinas`)
        .then(res => res.json())
        .then(data => {
            if (Array.isArray(data) && data.length > 0) {
               setMaquinasCompativeis(data.map(m => m.modelo).join(", "));
            } else {
               setMaquinasCompativeis(t("result.unknown"));
            }
        }).catch(() => setMaquinasCompativeis(t("result.unknown")));
    }
  }, [detectionResult?.id, t]);

  const submitRating = async () => {
    if (rating === 0 || submitted) return;
    setSubmitted(true);
    
    if (historicoId) {
      try {
        await fetch(`${API_URL}/database/avaliacoes`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            historico_id: historicoId,
            nota: rating
          })
        });
      } catch (err) {
        console.error("Erro ao enviar avaliação:", err);
      }
    }

    toast.success(t("rating.success"), {
      description: `${t("rating.feedback")} (${rating}/5).`,
    });
  };

  const detectedCode = detectionResult?.codigo || "N/A";
  const detectedNameOriginal = detectionResult?.nome_peca;
  const detectedName = detectedNameOriginal
    ? getTranslatedPartName(detectedCode, detectedNameOriginal, locale)
    : t("result.notFound");

  const confidencePercent = detectionResult ? Math.round(detectionResult.confianca) : 0;

  return (
    <Shell 
      back="/capturar" 
      title={t("result.title")}
      headerAction={
        <button
          onClick={() => router.push("/equipamento")}
          className="flex h-8 items-center gap-1.5 rounded-full bg-destructive/10 px-3 text-xs font-bold text-destructive hover:bg-destructive/20 transition"
        >
          <LogOut className="h-3 w-3" />
          {t("common.logout")}
        </button>
      }
    >
      <div className="mt-2 animate-slide-up">
        {/* Hero image */}
        <div className="relative mx-auto w-full max-w-[260px] overflow-hidden rounded-2xl bg-secondary shadow-[var(--shadow-card)]">
          <img src={imageUrl} alt="Foto oficial da peça" className="w-full aspect-[4/3] object-cover bg-white" />
          <div className={`absolute top-2 left-2 inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-extrabold shadow-md ${detectionResult?.id ? 'bg-success text-success-foreground' : 'bg-red-500 text-white'}`}>
            {detectionResult?.id ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />} {detectionResult?.isManualSelection ? "Peça selecionada" : `${confidencePercent}%`}
          </div>
          <div className="absolute top-2 right-2 rounded-full bg-black/50 backdrop-blur px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
            {detectionResult?.id ? t("compat.identified") : t("result.notFound")}
          </div>
        </div>

        {/* Low Confidence Warning */}
        {confidencePercent < 80 && !detectionResult?.isManualSelection && (
          <div className="mt-4 flex flex-col items-center gap-3 rounded-2xl border border-yellow-500/40 bg-yellow-500/10 p-5 text-center shadow-[var(--shadow-card)]">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500/20">
              <AlertCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <p className="text-sm font-semibold text-yellow-700 dark:text-yellow-300">
              {t("result.lowConfWarning1")}{confidencePercent}{t("result.lowConfWarning2")}
            </p>
            <button
              onClick={() => router.push("/capturar")}
              className="mt-1 flex h-10 items-center justify-center rounded-xl bg-yellow-500 px-6 text-xs font-extrabold text-white transition hover:bg-yellow-400 active:scale-95"
            >
              {t("result.captureAgain")}
            </button>
          </div>
        )}

        {/* Identified card */}
        <div className="mt-4 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-primary">
            <Tag className="h-3 w-3" /> {t("result.code")}: {detectedCode}
          </div>
          <h2 className="mt-2 text-2xl font-extrabold leading-tight text-secondary">
            {detectedName}
          </h2>
          {detectionResult?.id && (
            <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <Tractor className="h-4 w-4 text-secondary" />
              {t("result.usage")} <span className="font-semibold text-secondary">
                {maquinasCompativeis ? `Jacto ${maquinasCompativeis}` : "Carregando..."}
              </span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-4 space-y-3">
          {/* {t("result.buyTitle")} — destaque */}
          <a
            href={detectionResult?.url_compra && detectionResult.url_compra !== "PREENCHER_LINK_OFICIAL" ? detectionResult.url_compra : "#"}
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
                {relatedParts.length === 0 ? (
                  <div className="text-center text-sm text-muted-foreground mt-4">{t("result.noRelated")}</div>
                ) : relatedParts.map((r) => (
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
                      {t("result.compatible")}
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
                    <Tag className="h-3 w-3" /> {t("result.code")}: {detectedCode}
                  </div>
                  <div className="mt-1 font-extrabold text-secondary">
                    {detectedName}
                  </div>
                </div>

                {/* PDF do Catálogo */}
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-2">
                    {t("result.catalog")}
                  </div>
                  {detectionResult?.url_catalogo ? (
                    <div className="rounded-xl border border-border bg-white overflow-hidden h-[50vh]">
                      <iframe
                        src={detectionResult.url_catalogo}
                        title="Catálogo de Peças"
                        className="w-full h-full border-0"
                      />
                    </div>
                  ) : (
                    <div className="rounded-xl border border-border bg-muted flex items-center justify-center h-[20vh] text-sm text-muted-foreground font-medium">
                      {t("result.noCatalog")}
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Manual */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="flex h-14 w-full items-center gap-3 rounded-xl border border-border bg-background px-5 font-bold text-secondary hover:bg-muted transition cursor-pointer">
                <FileText className="h-5 w-5 text-primary" />
                {t("result.manual")}
                <ChevronRight className="ml-auto h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-2xl p-0 sm:max-w-md sm:mx-auto">
              <SheetHeader className="px-5 pt-5 pb-2 text-left">
                <SheetTitle className="text-lg font-extrabold text-secondary">
                  {t("result.manual")}
                </SheetTitle>
                <SheetDescription className="text-xs text-muted-foreground">
                  {t("result.manualDesc")}
                </SheetDescription>
              </SheetHeader>
              <div className="max-h-[70vh] overflow-y-auto px-5 pb-6 pt-2 space-y-4">
                {/* Código + nome */}
                <div className="rounded-xl border border-border bg-card p-3">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-primary">
                    <Tag className="h-3 w-3" /> {t("result.code")}: {detectedCode}
                  </div>
                  <div className="mt-1 font-extrabold text-secondary">
                    {detectedName}
                  </div>
                </div>

                {/* PDF do Manual */}
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-2">
                    {t("result.manual")}
                  </div>
                  {detectionResult?.url_manual ? (
                    <div className="rounded-xl border border-border bg-white overflow-hidden h-[50vh]">
                      <iframe
                        src={detectionResult.url_manual}
                        title={t("result.manual")}
                        className="w-full h-full border-0"
                      />
                    </div>
                  ) : (
                    <div className="rounded-xl border border-border bg-muted flex items-center justify-center h-[20vh] text-sm text-muted-foreground font-medium">
                      {t("result.noManual")}
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <a
            href={detectionResult?.url_video && detectionResult.url_video !== "PREENCHER_LINK_OFICIAL" ? detectionResult.url_video : "#"}
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
              <a href="https://wa.me/5514981441403" target="_blank" rel="noopener noreferrer" className="flex h-10 items-center justify-center gap-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-bold">
                <MessageSquare className="h-4 w-4" /> {t("dist.whatsapp")}
              </a>
              <a href="https://jacto.com/brasil/garantia-jacto-portateis" target="_blank" rel="noopener noreferrer" className="flex h-10 items-center justify-center gap-1.5 rounded-lg bg-white/10 text-white text-xs font-semibold">
                <MessageSquare className="h-4 w-4" /> {t("dist.openTicket")}
              </a>
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
