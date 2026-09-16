"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";
import { useBuscaSemantica, BuscaSemanticaResult } from "@/hooks/useBuscaSemantica";
import { useDetection } from "@/lib/DetectionContext";
import { useRouter } from "next/navigation";
import { useT } from "@/i18n";

interface SemanticSearchProps {
  onSelect?: (item: BuscaSemanticaResult) => void;
}

export function SemanticSearch({ onSelect }: SemanticSearchProps) {
  const t = useT();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { results, isLoading } = useBuscaSemantica(query);
  const { setDetectionResult } = useDetection();

  // Fecha o dropdown se clicar fora
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Sanitização básica contra XSS removendo tags HTML
    let val = e.target.value.replace(/<[^>]*>?/gm, '');
    setQuery(val);
  };

  const handleSelect = (item: BuscaSemanticaResult) => {
    setSelectedId(item.id);
    
    // Simulamos um resultado de "detecção" de alta confiança para navegação posterior
    setDetectionResult({
      id: item.id,
      nome_peca: item.nome,
      codigo: item.codigo_jacto,
      confianca: item.score_similaridade, // score mapeado como confiança
      url_foto_principal: item.url_foto_principal || "",
    });
    
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <div className="relative w-full z-50" ref={containerRef}>
      <div className="relative flex items-center">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          maxLength={100}
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          placeholder={t("search.placeholder") || "Busca Inteligente por Texto (ex: registro do pulverizador)"}
          className="flex h-11 w-full rounded-lg border border-border bg-background px-9 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        />
        {isLoading && query.trim().length >= 2 && (
          <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-primary" />
        )}
      </div>

      {isFocused && query.trim().length >= 2 && (
        <div className="mt-2 overflow-hidden rounded-xl border border-border bg-background shadow-lg animate-in fade-in slide-in-from-top-2">
          {results.length > 0 ? (
            <ul className="max-h-64 overflow-y-auto py-2">
              {results.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleSelect(item)}
                    className={`flex w-full items-center gap-3 px-4 py-3 text-left transition rounded-lg border-2 ${
                      selectedId === item.id 
                        ? 'border-primary bg-primary/10' 
                        : 'border-transparent hover:bg-muted active:bg-accent'
                    }`}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white overflow-hidden border border-border">
                      {item.url_foto_principal ? (
                        <img src={item.url_foto_principal} alt={item.nome} className="h-full w-full object-cover" />
                      ) : (
                        <Search className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div className="flex flex-col flex-1 overflow-hidden">
                      <span className="truncate text-sm font-bold text-foreground leading-tight">
                        {item.nome}
                      </span>
                      <span className="truncate text-xs text-muted-foreground">
                        Cód: {item.codigo_jacto}
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : !isLoading ? (
            <div className="px-4 py-6 text-center text-sm text-muted-foreground">
              Nenhuma peça encontrada com essa descrição.
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
