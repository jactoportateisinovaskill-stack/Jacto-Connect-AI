import { useEffect, useState } from "react";

export type Cargo = "gestor" | "parceiro";

const KEY = "jacto:cargo";
const EVENT = "jacto:cargo";

export function getCargo(): Cargo | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(KEY);
  if (v === "gestor" || v === "parceiro") return v;
  // Migrate legacy values (revenda/assistencia/cliente) → parceiro
  if (v === "revenda" || v === "assistencia" || v === "cliente") {
    window.localStorage.setItem(KEY, "parceiro");
    return "parceiro";
  }
  return null;
}

export function setCargo(c: Cargo | null) {
  if (typeof window === "undefined") return;
  if (c) window.localStorage.setItem(KEY, c);
  else window.localStorage.removeItem(KEY);
  window.dispatchEvent(new CustomEvent(EVENT, { detail: c }));
}

export function useCargo(): [Cargo | null, (c: Cargo | null) => void] {
  const [cargo, setCargoState] = useState<Cargo | null>(null);
  useEffect(() => {
    setCargoState(getCargo());
    const h = (e: Event) => setCargoState((e as CustomEvent<Cargo | null>).detail ?? null);
    window.addEventListener(EVENT, h);
    return () => window.removeEventListener(EVENT, h);
  }, []);
  return [cargo, (c) => { setCargo(c); setCargoState(c); }];
}

export const CARGO_LABELS: Record<Cargo, { pt: string; en: string; es: string }> = {
  gestor: { pt: "Gestor", en: "Manager", es: "Gestor" },
  parceiro: {
    pt: "Cliente / Parceiro",
    en: "Customer / Partner",
    es: "Cliente / Socio",
  },
};

