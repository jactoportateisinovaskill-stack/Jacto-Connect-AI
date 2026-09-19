import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useState, useEffect } from "react";

export interface BuscaSemanticaResult {
  id: number;
  nome: string;
  codigo_jacto: string;
  score_similaridade: number;
  url_foto_principal?: string;
  url_compra?: string;
  url_video?: string;
  url_catalogo?: string;
  url_manual?: string;
}

export function useBuscaSemantica(query: string, delay = 500) {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [query, delay]);

  const { data, isLoading, error } = useQuery<BuscaSemanticaResult[]>({
    queryKey: ["buscaSemantica", debouncedQuery],
    queryFn: async () => {
      // Evita disparar request se a string for muito curta
      if (!debouncedQuery.trim() || debouncedQuery.trim().length < 2) return [];

      const response = await api.post("/v1/pecas/busca-semantica", {
        query: debouncedQuery.trim(),
        limit: 3,
      });
      return response.data;
    },
    enabled: debouncedQuery.trim().length >= 2,
    staleTime: 60 * 1000 * 5, // 5 minutos de cache
  });

  return {
    results: data || [],
    isLoading,
    error,
  };
}
