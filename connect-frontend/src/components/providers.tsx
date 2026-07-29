"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { LocaleProvider } from "@/i18n";
import { Toaster } from "@/components/ui/sonner";
import { DetectionProvider } from "@/lib/DetectionContext";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <LocaleProvider>
        <DetectionProvider>
          {children}
          <Toaster />
        </DetectionProvider>
      </LocaleProvider>
    </QueryClientProvider>
  );
}
