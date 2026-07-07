import { useEffect, useState } from "react";

export type Role = "manager" | "usuario";

export interface AuthUser {
  name: string;
  email: string;
  role: Role;
}

const KEY = "jacto:auth";
const EVENT = "jacto:auth";

function normalize(raw: unknown): AuthUser | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  // Backwards compat: previously stored as "gestor"
  const role: Role = r.role === "manager" || r.role === "gestor" ? "manager" : "usuario";
  return {
    name: String(r.name ?? "Operador"),
    email: String(r.email ?? ""),
    role,
  };
}

export function getAuthUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? normalize(JSON.parse(raw)) : null;
  } catch {
    return null;
  }
}

export function setAuthUser(u: AuthUser | null) {
  if (typeof window === "undefined") return;
  if (u) window.localStorage.setItem(KEY, JSON.stringify(u));
  else window.localStorage.removeItem(KEY);
  window.dispatchEvent(new CustomEvent(EVENT, { detail: u }));
}

export function login(input: { name: string; email: string; role: Role }) {
  setAuthUser({ name: input.name.trim() || "Operador", email: input.email.trim(), role: input.role });
}

export function logout() {
  setAuthUser(null);
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  useEffect(() => {
    setUser(getAuthUser());
    const h = (e: Event) => setUser((e as CustomEvent<AuthUser | null>).detail ?? null);
    window.addEventListener(EVENT, h);
    return () => window.removeEventListener(EVENT, h);
  }, []);
  const isManager = user?.role === "manager";
  return {
    user,
    isAuthenticated: !!user,
    isManager,
    /** @deprecated use isManager */
    isGestor: isManager,
    login,
    logout,
  };
}
