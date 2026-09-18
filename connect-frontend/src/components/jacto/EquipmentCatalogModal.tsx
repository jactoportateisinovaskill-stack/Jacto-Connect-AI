"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useT } from "@/i18n";
import { useEffect, useState } from "react";
import { Loader2, X } from "lucide-react";

interface EquipmentCatalogModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  urlCatalogo?: string;
  onConfirm: () => void;
}

export function EquipmentCatalogModal({ open, onOpenChange, urlCatalogo, onConfirm }: EquipmentCatalogModalProps) {
  const t = useT();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open) setLoading(true);
  }, [open, urlCatalogo]);

  const handleOpenChange = (isOpen: boolean) => {
    onOpenChange(isOpen);
    if (!isOpen) {
      onConfirm();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent 
        className="max-w-[95vw] w-fit p-0 border-none bg-transparent shadow-none flex flex-col items-center justify-center focus-visible:outline-none [&>button]:hidden"
      >
        {urlCatalogo ? (
          <div className="relative flex flex-col items-center justify-center">
            {loading && (
               <div className="absolute inset-0 flex items-center justify-center">
                 <Loader2 className="h-8 w-8 animate-spin text-white" />
               </div>
            )}
            
            <button 
              onClick={() => handleOpenChange(false)}
              className="absolute -top-3 -right-3 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-md transition hover:bg-black/90 focus:outline-none ring-1 ring-white/20"
            >
              <X className="h-4 w-4" />
            </button>

            <img
              src={urlCatalogo}
              alt="Visão Explodida"
              onLoad={() => setLoading(false)}
              className={`max-w-[95vw] max-h-[80vh] object-contain rounded-xl transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'} bg-white/5 shadow-2xl`}
            />
          </div>
        ) : (
           <div className="bg-white/10 rounded-xl p-6 text-center text-white backdrop-blur-md border border-white/20">
             <p>Nenhuma visão explodida disponível.</p>
           </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
