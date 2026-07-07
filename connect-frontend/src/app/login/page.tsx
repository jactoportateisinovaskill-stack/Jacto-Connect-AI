"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const cargo = localStorage.getItem("jacto_cargo") || "";
    router.push(cargo === "gestor" ? "/insights" : "/equipamento");
  }, [router]);

  return null;
}
