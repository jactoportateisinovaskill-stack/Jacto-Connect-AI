"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useT } from "@/i18n";
import { useEffect, useState } from "react";
import { Loader2, X } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

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

            <div className="relative w-[95vw] h-[80vh] flex items-center justify-center">
              <Carousel className="w-full h-full">
                <CarouselContent className="h-full">
                  {Array.from({ length: 6 }).map((_, index) => {
                    const pageNumber = String(index + 1).padStart(4, '0');
                    const imgUrl = `https://bzhflihrkxgtkyldhgxs.supabase.co/storage/v1/object/public/${urlCatalogo}_page-${pageNumber}.jpg`;
                    return (
                      <CarouselItem key={index} className="flex items-center justify-center">
                        <TransformWrapper
                          initialScale={1}
                          minScale={1}
                          maxScale={4}
                          centerZoomedOut={true}
                          panning={{ disabled: false }}
                          wheel={{ step: 0.1 }}
                        >
                          <TransformComponent wrapperClass="w-full h-full flex items-center justify-center" contentClass="w-full h-full flex items-center justify-center">
                            <img
                              src={imgUrl}
                              alt={`Página ${index + 1}`}
                              onLoad={() => setLoading(false)}
                              className={`max-w-[95vw] max-h-[80vh] object-contain rounded-xl transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'} bg-white/5 shadow-2xl`}
                            />
                          </TransformComponent>
                        </TransformWrapper>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                <CarouselPrevious className="absolute left-2 md:left-4 bg-black/50 text-white border-none hover:bg-black/80 hover:text-white" />
                <CarouselNext className="absolute right-2 md:right-4 bg-black/50 text-white border-none hover:bg-black/80 hover:text-white" />
              </Carousel>
            </div>
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
