"use client";

import { useState, useEffect } from "react";
import { Search, Loader2, AlertCircle, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useT } from "@/i18n";
import { useSearch, searchPartsAPI } from "@/lib/search";

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const t = useT();
  const router = useRouter();
  const [storedSearch, saveSearch] = useSearch();
  const [query, setQuery] = useState<string>(storedSearch?.query || "");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    if (open) {
      setQuery(storedSearch?.query || "");
      setSearched(false);
      setResults([]);
    }
  }, [open, storedSearch?.query]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedQuery = query.trim();
    if (!normalizedQuery) return;
    
    setQuery(normalizedQuery);
    saveSearch({ query: normalizedQuery });
    
    setLoading(true);
    setSearched(true);
    
    try {
      const data = await searchPartsAPI(normalizedQuery);
      setResults(data);
    } catch (error) {
      console.error(error);
      setResults([]);
    } finally {
      setLoading(false);
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

        <div className="max-h-[70vh] overflow-y-auto px-5 pb-6 pt-2 space-y-4">
          <div>
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  maxLength={100}
                  placeholder={t("search.placeholder")}
                  className="flex h-11 w-full rounded-lg border border-border bg-background px-9 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition hover:bg-primary/20 active:scale-[0.98] disabled:opacity-50 sm:w-auto sm:px-6"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <span className="hidden sm:inline font-bold mr-2">{t("search.submit")}</span>
                    <Search className="h-4 w-4 sm:hidden" />
                  </>
                )}
              </button>
            </form>
          </div>

          {searched && !loading && results.length === 0 && (
            <div className="mt-2 flex flex-col items-center justify-center rounded-xl border border-dashed border-border p-6 text-center bg-muted/30">
              <AlertCircle className="h-8 w-8 text-muted-foreground mb-3" />
              <p className="text-sm font-medium text-secondary">{t("search.empty")}</p>
            </div>
          )}

          {/* Results Area would go here */}

          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={() => {
                onOpenChange(false);
                router.push("/capturar");
              }}
              className="rounded-lg px-4 py-2 text-xs font-semibold text-muted-foreground transition hover:bg-muted"
            >
              {t("search.skip")}
            </button>
            <button
              type="button"
              disabled={!query.trim()}
              onClick={() => {
                saveSearch({ query: query.trim() });
                onOpenChange(false);
                router.push("/capturar");
              }}
              className="flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-bold text-primary-foreground shadow-[var(--shadow-glow)] transition active:scale-[0.98] disabled:opacity-50"
            >
              {t("common.continue")} <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
