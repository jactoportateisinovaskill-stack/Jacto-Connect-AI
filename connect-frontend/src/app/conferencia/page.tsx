"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { Check, ArrowRight, AlertCircle, RefreshCw } from "lucide-react";
import { useLocale } from "@/i18n";
import { Shell } from "@/components/jacto/Shell";
import { useDetection } from "@/lib/DetectionContext";
import { getTranslatedPartName } from "@/lib/parts-translations";

export default function Conferencia() {
  const { locale, t } = useLocale();
  const router = useRouter();
  const { imageFile, detectionResult, setDetectionResult, setImageFile } = useDetection();
  const isRejecting = useRef(false);

  const userImageUrl = useMemo(() => {
    return imageFile ? URL.createObjectURL(imageFile) : null;
  }, [imageFile]);

  useEffect(() => {
    return () => {
      if (userImageUrl) URL.revokeObjectURL(userImageUrl);
    };
  }, [userImageUrl]);

  // Se não encontrou a peça, deu erro, ou a confiança for baixa, vai para a tela de resultado
  useEffect(() => {
    if (!isRejecting.current && (!detectionResult || !detectionResult.id || (detectionResult.confianca ?? 0) < 80)) {
      router.replace("/resultado");
    }
  }, [detectionResult, router]);

  if (!detectionResult || !detectionResult.id || (detectionResult.confianca ?? 0) < 80) {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const officialImageUrl = (detectionResult.url_foto_principal && !detectionResult.url_foto_principal.endsWith("None"))
    ? detectionResult.url_foto_principal
    : "/assets/no-image.svg";

  const detectedCode = detectionResult.codigo || "N/A";
  const detectedName = getTranslatedPartName(detectedCode, detectionResult.nome_peca, locale);

  const handleConfirm = () => {
    router.push("/resultado");
  };

  const handleReject = () => {
    isRejecting.current = true;
    setImageFile(null);
    setDetectionResult(null);
    router.push("/capturar");
  };

  return (
    <Shell back="/capturar" title={t("conference.title")} bg="dark">
      <div className="mt-2 animate-slide-up flex flex-col items-center">
        <div className="text-center mt-2 mb-6">
          <h2 className="text-2xl font-extrabold text-white">{t("conference.confirmTitle")}</h2>
          <p className="mt-2 text-sm text-white/70 px-4">
            {t("conference.confirmDesc")}
          </p>
        </div>

        <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-[2rem] p-5 shadow-2xl backdrop-blur-md">
          {/* Comparison Side by Side */}
          <div className="grid grid-cols-2 gap-4">
            {/* User Image */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 text-center">{t("conference.yourPhoto")}</span>
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-black border border-white/10 shadow-inner">
                {userImageUrl ? (
                  <img src={userImageUrl} alt={t("conference.yourPhotoAlt")} className="absolute inset-0 h-full w-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-white/30"><AlertCircle /></div>
                )}
              </div>
            </div>

            {/* Official Image */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary text-center">{t("conference.official")}</span>
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-card)]">
                <img src={officialImageUrl} alt={t("conference.official")} className="absolute inset-0 h-full w-full object-contain p-2" />
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center border-t border-white/10 pt-5">
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
              {t("conference.codePrefix")}: {detectedCode}
            </div>
            <div className="mt-1.5 text-lg font-bold text-white leading-tight">
              {detectedName}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex w-full max-w-md flex-col gap-3 px-2 pb-8">
          <button
            onClick={handleConfirm}
            className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-primary px-6 text-sm font-extrabold text-primary-foreground shadow-[var(--shadow-glow)] transition hover:bg-primary/90 active:scale-[0.98]"
          >
            <Check className="h-5 w-5" />
            {t("conference.confirmBtn")}
          </button>
          
          <button
            onClick={handleReject}
            className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/5 px-6 text-sm font-bold text-white transition hover:bg-white/10 active:scale-[0.98]"
          >
            <RefreshCw className="h-5 w-5 text-white/70" />
            {t("conference.rejectBtn")}
          </button>
        </div>
      </div>
    </Shell>
  );
}
