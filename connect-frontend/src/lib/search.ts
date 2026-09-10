import { useEffect, useState } from "react";

export interface SearchState {
  query: string;
}

const KEY = "jacto:search";
const EVENT = "jacto:search";

export const EMPTY_SEARCH: SearchState = {
  query: "",
};

export function getSearch(): SearchState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as SearchState) : null;
  } catch {
    return null;
  }
}

export function setSearch(s: SearchState | null) {
  if (typeof window === "undefined") return;
  if (s) window.localStorage.setItem(KEY, JSON.stringify(s));
  else window.localStorage.removeItem(KEY);
  window.dispatchEvent(new CustomEvent(EVENT, { detail: s }));
}

export function useSearch(): [SearchState | null, (s: SearchState | null) => void] {
  const [search, setLocalSearch] = useState<SearchState | null>(null);
  useEffect(() => {
    setLocalSearch(getSearch());
    const h = (e: Event) => setLocalSearch((e as CustomEvent<SearchState | null>).detail ?? null);
    window.addEventListener(EVENT, h);
    return () => window.removeEventListener(EVENT, h);
  }, []);
  return [search, (v) => { setSearch(v); setLocalSearch(v); }];
}

// Serviço separado para futura integração com API
export async function searchPartsAPI(query: string): Promise<any[]> {
  // TODO: Substituir por chamada de API real no futuro
  // Exemplo de implementação futura:
  // const response = await fetch(`/api/parts/search?q=${encodeURIComponent(query)}`);
  // return await response.json();
  
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock vazio pois o backend ainda não existe
      resolve([]);
    }, 1000);
  });
}
