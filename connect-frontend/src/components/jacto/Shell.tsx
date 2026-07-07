"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, BarChart3, LogOut, Wrench } from "lucide-react";
import type { ReactNode } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useAuth } from "@/lib/auth";
import { useEquipment } from "@/lib/equipment";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-black text-base shadow-[var(--shadow-glow)]">
        J
      </div>
      <div className="leading-tight">
        <div className="font-extrabold text-secondary text-[15px] tracking-tight">Jacto Connect</div>
        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">IA</div>
      </div>
    </div>
  );
}

interface ShellProps {
  children: ReactNode;
  back?: string;
  title?: string;
  showMenu?: boolean;
  bg?: "white" | "muted" | "dark";
}

export function Shell({ children, back, title, showMenu, bg = "white" }: ShellProps) {
  const bgClass =
    bg === "muted" ? "bg-muted" : bg === "dark" ? "bg-secondary text-secondary-foreground" : "bg-background";
  const tone = bg === "dark" ? "dark" : "light";
  const { isAuthenticated, isManager, logout } = useAuth();

  return (
    <div className={`min-h-screen ${bgClass} flex flex-col`}>
      <header className="sticky top-0 z-20 flex items-center justify-between gap-3 px-5 pt-4 pb-3 sm:pt-5 bg-inherit">
        <div className="flex items-center gap-3 min-w-0">
          {back && (
            <Link
               href={back}
              className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
                tone === "dark" ? "bg-white/10 text-white hover:bg-white/20" : "bg-muted text-secondary hover:bg-accent"
              }`}
              aria-label="Voltar"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
          )}
          {title ? (
            <h1 className="text-base font-bold tracking-tight truncate">{title}</h1>
          ) : (
            <Logo />
          )}
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher tone={tone} />
          {showMenu && isManager && (
            <Link
              href="/insights"
              className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
                tone === "dark" ? "bg-white/10 text-white hover:bg-white/20" : "bg-muted text-secondary hover:bg-accent"
              }`}
              aria-label="Insights"
            >
              <BarChart3 className="h-5 w-5" />
            </Link>
          )}
          {isAuthenticated && (
            <button
              onClick={() => {
                logout();
                if (typeof window !== "undefined") window.location.href = "/";
              }}
              className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
                tone === "dark" ? "bg-white/10 text-white hover:bg-white/20" : "bg-muted text-secondary hover:bg-accent"
              }`}
              aria-label="Sair"
            >
              <LogOut className="h-5 w-5" />
            </button>
          )}
        </div>
      </header>
      {isAuthenticated && !isManager && tone === "light" && <EquipmentBadge />}
      <main className="flex-1 flex flex-col px-5 pb-8">{children}</main>
    </div>
  );
}

// Routes where the equipment context badge makes sense (operational flow).
const BADGE_ROUTES = new Set([
  "/capturar",
  "/analisando",
  "/resultado",
  "/compatibilidade",
  "/distribuidores",
  "/finalizado",
]);

function EquipmentBadge() {
  const [eq] = useEquipment();
  const pathname = usePathname();
  if (!eq?.modelo) return null;
  if (!BADGE_ROUTES.has(pathname)) return null;
  return (
    <Link
      href="/equipamento"
      className="mx-5 -mt-1 mb-3 flex items-center gap-2 rounded-lg border border-border bg-muted/60 px-3 py-1.5 text-[11px] text-secondary hover:bg-muted transition"
    >
      <Wrench className="h-3.5 w-3.5 text-primary" />
      <span className="font-bold">{eq.modelo}</span>
      {eq.linha && <span className="text-muted-foreground">· {eq.linha}</span>}
      {eq.serial && <span className="ml-auto font-mono text-[10px] text-muted-foreground">#{eq.serial}</span>}
    </Link>
  );
}
