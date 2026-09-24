"use client";

import { useState, useEffect } from "react";
import { Search, Loader2, AlertCircle, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useT } from "@/i18n";
import { SemanticSearch } from "@/components/jacto/SemanticSearch";
import { BuscaSemanticaResult } from "@/hooks/useBuscaSemantica";
import { useEquipment } from "@/lib/equipment";
import { API_URL } from "@/lib/api";

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const t = useT();
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<BuscaSemanticaResult | null>(null);
  const [showIncompatibleModal, setShowIncompatibleModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [stored] = useEquipment();

  useEffect(() => {
    if (open) {
      setSelectedItem(null);
      setShowIncompatibleModal(false);
    }
  }, [open]);

  const handleContinue = async () => {
    if (!selectedItem) return;
    
    // Se não tiver equipamento selecionado, vai direto
    if (!stored?.modelo) {
      onOpenChange(false);
      router.push("/resultado");
      return;
    }

    setIsLoading(true);
    try {
      // 1. Pega os equipamentos e encontra o atual
      const maquinasRes = await fetch(`${API_URL}/database/maquinas`);
      if (!maquinasRes.ok) throw new Error("Erro maquinas");
      const maquinas = await maquinasRes.json();
      const maquinaAtual = maquinas.find((m: any) => m.modelo?.toLowerCase() === stored.modelo?.toLowerCase());
      
      // 2. Verifica compatibilidade
      if (maquinaAtual) {
        const compatRes = await fetch(`${API_URL}/database/compatibilidade/${maquinaAtual.id}/${selectedItem.id}`);
        if (compatRes.ok) {
          const compatData = await compatRes.json();
          if (compatData.compativel === false) {
            setShowIncompatibleModal(true);
            setIsLoading(false);
            return; // Interrompe a navegação!
          }
        }
      }
      
      // Se tudo OK ou compatível
      onOpenChange(false);
      router.push("/resultado");
    } catch (err) {
      console.error(err);
      // Fallback em caso de erro da API: vai direto pro resultado
      onOpenChange(false);
      router.push("/resultado");
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-3xl p-0 sm:max-w-md sm:mx-auto">
        <SheetHeader className="px-5 pt-5 pb-2 text-left">
          <SheetTitle className="flex items-center gap-2 text-lg font-extrabold text-secondary">
            <Search className="h-5 w-5 text-primary" />
            {t("search.title")}
          </SheetTitle>
          <SheetDescription className="text-xs text-muted-foreground">
            {t("search.subtitle")}
          </SheetDescription>
        </SheetHeader>

        <div className="max-h-[85vh] overflow-y-auto px-5 pb-6 pt-2 space-y-4">
          <div>
            <SemanticSearch 
              onSelect={(item) => setSelectedItem(item)} 
            />
          </div>

          {/* Results Area would go here */}

          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
            {stored?.modelo === "PJH" ? (
              <div className="flex h-11 items-center justify-center rounded-lg bg-muted px-6 text-xs font-bold text-muted-foreground text-center">
                Busca por IA indisponível p/ PJH
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  onOpenChange(false);
                  router.push("/capturar");
                }}
                className="flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-bold text-primary-foreground shadow-[var(--shadow-glow)] transition active:scale-[0.98]"
              >
                {t("search.skip")}
              </button>
            )}
            <button
              type="button"
              disabled={!selectedItem || isLoading}
              onClick={handleContinue}
              className={`flex h-11 items-center justify-center gap-2 rounded-lg bg-white border px-6 text-sm font-bold shadow-sm transition active:scale-[0.98] disabled:opacity-50 ${
                selectedItem ? 'border-primary text-primary' : 'border-input text-muted-foreground'
              }`}
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>{t("common.continue")} <ArrowRight className="h-4 w-4" /></>}
            </button>
          </div>
        </div>

        {/* Modal de Incompatibilidade por cima */}
        {showIncompatibleModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
            <div className="w-full max-w-sm rounded-2xl bg-card p-6 shadow-2xl animate-in zoom-in-95">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-destructive mb-4">
                <AlertCircle className="h-7 w-7" />
              </div>
              <h3 className="text-center text-xl font-extrabold text-secondary">Atenção!</h3>
              <p className="mt-3 text-center text-sm text-muted-foreground leading-relaxed">
                A peça <span className="font-bold text-secondary">{selectedItem?.nome}</span> não é compatível com o equipamento <span className="font-bold text-secondary">{stored?.modelo || "atual"}</span>. 
                <br/><br/>
                Por favor, selecione uma peça compatível para prosseguir.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <button 
                  onClick={() => setShowIncompatibleModal(false)}
                  className="flex h-12 items-center justify-center rounded-xl bg-secondary px-4 text-sm font-bold text-secondary-foreground shadow-md transition active:scale-95"
                >
                  Voltar e escolher outra peça
                </button>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
