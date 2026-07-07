import { useEffect, useState } from "react";

const KEY = "jacto:region";

export function getRegion(): string {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(KEY) ?? "";
}

export function setRegion(v: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, v);
  window.dispatchEvent(new CustomEvent("jacto:region", { detail: v }));
}

export function useRegion(): [string, (v: string) => void] {
  const [r, setR] = useState("");
  useEffect(() => {
    setR(getRegion());
    const h = (e: Event) => setR((e as CustomEvent<string>).detail ?? "");
    window.addEventListener("jacto:region", h);
    return () => window.removeEventListener("jacto:region", h);
  }, []);
  return [r, (v: string) => { setRegion(v); setR(v); }];
}

// Regions with reduced availability — drives the contextual warning
const RESTRICTED = ["argentina", "méxico", "mexico", "latam", "áfrica", "africa"];

export function regionAvailability(region: string): {
  level: "info" | "warning";
  message: string;
} | null {
  if (!region.trim()) return null;
  const r = region.toLowerCase();
  if (RESTRICTED.some((k) => r.includes(k))) {
    return {
      level: "warning",
      message:
        "Alguns equipamentos não estão disponíveis para esta região. A identificação será ajustada ao contexto local.",
    };
  }
  return {
    level: "info",
    message:
      "Materiais técnicos e compatibilidades serão priorizados conforme a região informada.",
  };
}
