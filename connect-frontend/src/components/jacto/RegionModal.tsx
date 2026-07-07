"use client";
import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Logo } from "@/components/jacto/Shell";
import { useRegion, regionAvailability } from "@/lib/region";
import { useT } from "@/i18n";

const STATES = [
  "Acre",
  "Alagoas",
  "Amapá",
  "Amazonas",
  "Bahia",
  "Ceará",
  "Distrito Federal",
  "Espírito Santo",
  "Goiás",
  "Maranhão",
  "Mato Grosso",
  "Mato Grosso do Sul",
  "Minas Gerais",
  "Pará",
  "Paraíba",
  "Paraná",
  "Pernambuco",
  "Piauí",
  "Rio de Janeiro",
  "Rio Grande do Norte",
  "Rio Grande do Sul",
  "Rondônia",
  "Roraima",
  "Santa Catarina",
  "São Paulo",
  "Sergipe",
  "Tocantins",
];

const COUNTRIES = {
  "América do Sul": ["Argentina", "Bolívia", "Chile", "Colômbia", "Equador", "Paraguai", "Peru", "Uruguai", "Venezuela"],
  "América do Norte e Central": ["Canadá", "Estados Unidos", "México", "Costa Rica", "Guatemala", "Panamá"],
  "Europa": ["Alemanha", "Espanha", "França", "Itália", "Portugal", "Reino Unido", "Países Baixos"],
  "África": ["África do Sul", "Angola", "Egito", "Marrocos", "Moçambique", "Nigéria"],
  "Ásia e Oceania": ["Austrália", "China", "Índia", "Indonésia", "Japão", "Tailândia", "Vietnã"],
};



interface Props {
  open: boolean;
  onConfirm: () => void;
}

export function RegionModal({ open, onConfirm }: Props) {
  const t = useT();
  const [region, setRegionValue] = useRegion();
  const [draft, setDraft] = useState("");

  useEffect(() => {
    if (open) setDraft(region);
  }, [open, region]);

  const availability = regionAvailability(draft);
  const enabled = draft.trim().length > 0;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enabled) return;
    setRegionValue(draft);
    onConfirm();
  };

  return (
    <Dialog open={open}>
      <DialogContent
        className="max-w-sm border-border p-0 gap-0 [&>button]:hidden"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader className="items-center text-center px-6 pt-7 pb-2">
          <Logo />
          <DialogTitle className="mt-5 text-xl font-bold tracking-tight text-secondary">
            {t("region.label")}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            {t("region.subtitle")}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} className="px-6 pb-6 pt-3">
          <label htmlFor="region-select" className="sr-only">
            {t("region.label")}
          </label>
          <select
            id="region-select"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="w-full appearance-none rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm font-medium text-secondary outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2'><polyline points='6 9 12 15 18 9'/></svg>\")",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 12px center",
              paddingRight: "32px",
            }}
          >
            <option value="">{t("region.placeholder")}</option>
            <optgroup label="🇧🇷  BRASIL — ESTADOS">
              {STATES.map((s) => (
                <option key={s} value={s}>{`   ${s}`}</option>
              ))}
            </optgroup>
            <option disabled>──────────────────────────</option>
            {Object.entries(COUNTRIES).map(([group, list]) => (
              <optgroup key={group} label={`🌎  ${group.toUpperCase()}`}>
                {list.map((c) => (
                  <option key={c} value={c}>{`   ${c}`}</option>
                ))}
              </optgroup>
            ))}


          </select>


          <button
            type="submit"
            disabled={!enabled}
            className="mt-4 flex h-11 w-full items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold tracking-wide shadow-[var(--shadow-glow)] transition active:scale-[0.98] disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none"
          >
            {t("region.cta")}
          </button>

          <div className="mt-4 flex items-start gap-2 text-[11px] leading-relaxed text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-primary mt-0.5" />
            <span>{availability?.message ?? t("region.hint")}</span>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
