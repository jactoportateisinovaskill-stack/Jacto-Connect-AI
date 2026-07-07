"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Camera, ImagePlus, X } from "lucide-react";
import { useT } from "@/i18n";
import { Shell } from "@/components/jacto/Shell";

export default function Capturar() {
  const t = useT();
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const goAnalyze = () => router.push("/analisando");

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    // Auto-analyze right after the photo is received.
    setTimeout(goAnalyze, 250);
  };

  return (
    <Shell back="/" title={t("capture.title")} bg="dark">
      <p className="mt-1 text-sm text-white/60">
        {t("capture.subtitle")}
      </p>

      {/* Viewfinder — compact on desktop, full-bleed on mobile */}
      <div className="mt-5 mx-auto w-full max-w-md sm:max-w-sm">
        <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-black sm:aspect-[4/3]">
          {preview ? (
            <img
              src={preview}
              alt={t("capture.previewAlt")}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <>
              <div
                className="absolute inset-0 opacity-90"
                style={{
                  background:
                    "radial-gradient(ellipse at center, oklch(0.42 0.02 0) 0%, oklch(0.18 0.005 0) 75%)",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-28 w-20 rounded-[40%] bg-gradient-to-b from-zinc-500 to-zinc-700 shadow-2xl rotate-12 sm:h-32 sm:w-24" />
              </div>
            </>
          )}

          {/* Frame overlay */}
          <div className="absolute inset-6 rounded-2xl border-2 border-primary/80">
            <span className="absolute -top-px -left-px h-5 w-5 border-t-4 border-l-4 border-primary rounded-tl-2xl" />
            <span className="absolute -top-px -right-px h-5 w-5 border-t-4 border-r-4 border-primary rounded-tr-2xl" />
            <span className="absolute -bottom-px -left-px h-5 w-5 border-b-4 border-l-4 border-primary rounded-bl-2xl" />
            <span className="absolute -bottom-px -right-px h-5 w-5 border-b-4 border-r-4 border-primary rounded-br-2xl" />
            {!preview && (
              <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent animate-scan" />
            )}
          </div>

          <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            {preview ? t("capture.galleryImg") : t("capture.camActive")}
          </div>

          {preview && (
            <button
              onClick={() => setPreview(null)}
              className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur hover:bg-black/80"
              aria-label={t("capture.removeImg")}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="mx-auto mt-6 flex w-full max-w-md items-center justify-between sm:max-w-sm">
        <button
          onClick={() => fileRef.current?.click()}
          className="flex h-12 flex-col items-center justify-center gap-0.5 rounded-2xl bg-white/10 px-4 text-white hover:bg-white/20 transition"
          aria-label={t("capture.gallery")}
        >
          <ImagePlus className="h-5 w-5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">{t("capture.gallery")}</span>
        </button>

        <button
          onClick={goAnalyze}
          className="relative flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-glow)] active:scale-95 transition"
          aria-label={preview ? t("capture.analyzeImg") : t("capture.capturePhoto")}
        >
          <span className="absolute inset-1.5 rounded-full border-2 border-white/40" />
          <Camera className="h-7 w-7" />
        </button>

        <div className="h-12 w-12" aria-hidden />

      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onPick}
      />
    </Shell>
  );
}
