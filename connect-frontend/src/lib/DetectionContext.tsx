"use client";

import React, { createContext, useContext, useState } from "react";

export interface DetectionResult {
  id: number;
  nome_peca: string;
  codigo: string;
  confianca: number;
  url_compra?: string;
  url_video?: string;
  url_foto_principal?: string;
  url_catalogo?: string;
  url_manual?: string;
}

interface DetectionContextType {
  imageFile: File | null;
  setImageFile: (file: File | null) => void;
  detectionResult: DetectionResult | null;
  setDetectionResult: (result: DetectionResult | null) => void;
}

const DetectionContext = createContext<DetectionContextType | undefined>(undefined);

export function DetectionProvider({ children }: { children: React.ReactNode }) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(null);

  return (
    <DetectionContext.Provider
      value={{
        imageFile,
        setImageFile,
        detectionResult,
        setDetectionResult,
      }}
    >
      {children}
    </DetectionContext.Provider>
  );
}

export function useDetection() {
  const context = useContext(DetectionContext);
  if (!context) {
    throw new Error("useDetection must be used within a DetectionProvider");
  }
  return context;
}
