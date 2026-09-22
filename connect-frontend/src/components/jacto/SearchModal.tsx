"use client";

import { useState, useEffect } from "react";
import { Search, Loader2, AlertCircle, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useT } from "@/i18n";
import { SemanticSearch } from "@/components/jacto/SemanticSearch";
import { BuscaSemanticaResult } from "@/hooks/useBuscaSemantica";

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const t = useT();
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<BuscaSemanticaResult | null>(null);

  useEffect(() => {
    if (open) {
      setSelectedItem(null);
    }
  }, [open]);

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
            <button
              type="button"
              disabled={!selectedItem}
              onClick={() => {
                onOpenChange(false);
                router.push("/resultado");
              }}
              className={`flex h-11 items-center justify-center gap-2 rounded-lg bg-white border px-6 text-sm font-bold shadow-sm transition active:scale-[0.98] disabled:opacity-50 ${
                selectedItem ? 'border-primary text-primary' : 'border-input text-muted-foreground'
              }`}
            >
              {t("common.continue")} <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
