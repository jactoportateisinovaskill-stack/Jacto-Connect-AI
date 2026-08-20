"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Camera, ImagePlus, X, AlertCircle } from "lucide-react";
import { useT } from "@/i18n";
import { Shell } from "@/components/jacto/Shell";
import { useDetection } from "@/lib/DetectionContext";

export default function Capturar() {
  const t = useT();
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [preview, setPreview] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  
  const { setImageFile } = useDetection();

  const goAnalyze = useCallback(() => router.push("/analisando"), [router]);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      setStream(null);
    }
  }, []);

  const startCamera = useCallback(async () => {
    setCameraError(null);
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });
      streamRef.current = newStream;
      setStream(newStream);
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
    } catch (err: any) {
      console.error("Erro ao acessar a câmera:", err);
      setCameraError(err.message || "Permissão de câmera negada ou dispositivo não encontrado.");
    }
  }, []);

  // Iniciar a câmera ao montar a página
  useEffect(() => {
    startCamera();
    return () => {
      // Quando o componente desmontar (ou sair da página), desliga a câmera!
      stopCamera();
    };
  }, [startCamera, stopCamera]);

  // Se o videoRef carregar depois da renderização do React, vinculamos o stream
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const captureFrame = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    
    // Criar um canvas com as mesmas dimensões reais do vídeo
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Desenhar o frame atual da tag video no canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Converter a imagem em Blob (JPG)
    canvas.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
      
      // Enviar pro contexto igual antes
      setImageFile(file);
      
      // Gerar preview local para o usuário
      const url = URL.createObjectURL(file);
      setPreview(url);
      
      // Desligar a câmera para não consumir bateria à toa
      stopCamera();
      
      // Chamar a IA!
      setTimeout(goAnalyze, 250);
    }, "image/jpeg", 0.9);
  };

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setImageFile(file);
    const url = URL.createObjectURL(file);
    setPreview(url);
    stopCamera();
    
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
          ) : cameraError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <AlertCircle className="h-10 w-10 text-destructive mb-3" />
              <p className="text-sm font-semibold text-white mb-2">Erro de Câmera</p>
              <p className="text-xs text-white/60 mb-4">{cameraError}</p>
              <button 
                onClick={startCamera}
                className="rounded-lg bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/20 transition"
              >
                Tentar Novamente
              </button>
            </div>
          ) : (
            <>
              {/* Fallback de gradiente enqto a camera carrega */}
              {!stream && (
                <>
                  <div
                    className="absolute inset-0 opacity-90"
                    style={{
                      background:
                        "radial-gradient(ellipse at center, oklch(0.42 0.02 0) 0%, oklch(0.18 0.005 0) 75%)",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-28 w-20 rounded-[40%] bg-gradient-to-b from-zinc-500 to-zinc-700 shadow-2xl rotate-12 sm:h-32 sm:w-24 animate-pulse" />
                  </div>
                </>
              )}
              
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${stream ? "opacity-100" : "opacity-0"}`}
              />
            </>
          )}

          {/* Frame overlay */}
          <div className="absolute inset-6 rounded-2xl border-2 border-primary/80 pointer-events-none">
            <span className="absolute -top-px -left-px h-5 w-5 border-t-4 border-l-4 border-primary rounded-tl-2xl" />
            <span className="absolute -top-px -right-px h-5 w-5 border-t-4 border-r-4 border-primary rounded-tr-2xl" />
            <span className="absolute -bottom-px -left-px h-5 w-5 border-b-4 border-l-4 border-primary rounded-bl-2xl" />
            <span className="absolute -bottom-px -right-px h-5 w-5 border-b-4 border-r-4 border-primary rounded-br-2xl" />
            {!preview && !cameraError && (
              <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent animate-scan" />
            )}
          </div>

          <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            <span className={`h-1.5 w-1.5 rounded-full ${preview ? 'bg-primary' : cameraError ? 'bg-destructive' : stream ? 'bg-success animate-pulse' : 'bg-primary animate-pulse'}`} />
            {preview ? t("capture.galleryImg") : cameraError ? "Erro" : t("capture.camActive")}
          </div>

          {preview && (
            <button
              onClick={() => {
                setPreview(null);
                startCamera(); // Se cancelou a preview, religa a câmera!
              }}
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
          onClick={() => {
            if (preview) {
              goAnalyze();
            } else if (stream) {
              captureFrame();
            }
          }}
          disabled={!preview && (!stream || !!cameraError)}
          className="relative flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-glow)] active:scale-95 transition disabled:opacity-50 disabled:active:scale-100"
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
