import React, { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "../../types";

interface RelatedProductsGridProps {
  onSelectProduct: (p: Product) => void;
}

interface MockRelatedProduct {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviewsCount: string;
  imageUrl: string;
  category: string;
}

export default function RelatedProductsGrid({ onSelectProduct }: RelatedProductsGridProps) {
  // exact database replica from mockup image:
  const recommendations: MockRelatedProduct[] = [
    {
      id: "rec1",
      name: "Bose QuietComfort 45 Headphones",
      price: 279.00,
      rating: 4.7,
      reviewsCount: "856",
      imageUrl: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=300&auto=format&fit=crop&q=80",
      category: "Wireless Headphones"
    },
    {
      id: "rec2",
      name: "Apple AirPods Max Headphones",
      price: 549.00,
      rating: 4.8,
      reviewsCount: "1.2K",
      imageUrl: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&auto=format&fit=crop&q=80",
      category: "Wireless Headphones"
    },
    {
      id: "rec3",
      name: "JBL Tune 760NC Headphones",
      price: 79.99,
      rating: 4.6,
      reviewsCount: "752",
      imageUrl: "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?w=300&auto=format&fit=crop&q=80",
      category: "Wireless Headphones"
    }
  ];

  const handleSelect = (rec: MockRelatedProduct) => {
    // Navigate home, or select a high fidelity product demo
    const fakeProduct: Product = {
      id: "sony-wh1000xm5", // Keep active workspace focused on prime demonstration
      name: rec.name,
      price: rec.price,
      rating: rec.rating,
      reviewsCount: rec.reviewsCount,
      imageUrl: rec.imageUrl,
      category: "electronics"
    };
    onSelectProduct(fakeProduct);
  };

  return (
    <div className="bg-white border border-zinc-200/60 rounded-[24px] p-5 sm:p-6 shadow-3xs flex flex-col justify-between h-full text-left" id="you-may-also-like-block">
      
      {/* Header section with slide navigation control triggers (matching image cleanly) */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-zinc-950 tracking-tight">
          You May Also Like
        </h3>
        
        {/* Slider circle buttons in the top right */}
        <div className="flex items-center gap-1.5">
          <button 
            type="button"
            onClick={() => alert("Already showing our recommended audio collection.")}
            className="w-7 h-7 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 flex items-center justify-center text-zinc-700 cursor-pointer transition-all hover:scale-105 active:scale-95"
            aria-label="Previous suggestions"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <button 
            type="button"
            onClick={() => alert("Recommendations lists cycle dynamically as you explore.")}
            className="w-7 h-7 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 flex items-center justify-center text-zinc-700 cursor-pointer transition-all hover:scale-105 active:scale-95"
            aria-label="Next suggestions"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid containing 3 vertical product cards (from mockup image) */}
      <div className="flex items-center gap-3 overflow-x-auto py-1 scrollbar-none">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            onClick={() => handleSelect(rec)}
            className="flex-1 min-w-[102px] sm:min-w-[124px] group bg-white border border-zinc-150 rounded-[18px] p-2.5 sm:p-3 flex flex-col justify-between h-[245px] sm:h-[268px] hover:border-zinc-350 hover:shadow-2xs cursor-pointer transition-all"
            style={{ contentVisibility: "auto" }}
          >
            
            {/* Soft background image gallery box */}
            <div className="relative aspect-[1.12/1] w-full bg-zinc-50/70 rounded-xl flex items-center justify-center p-2 mb-2 select-none">
              <img
                src={rec.imageUrl}
                alt={rec.name}
                className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Typography metadata section */}
            <div className="text-left space-y-0.5 mt-1 flex-1 flex flex-col justify-between">
              <h4 className="text-[10px] sm:text-[11px] font-semibold text-zinc-800 line-clamp-2 leading-snug group-hover:text-[#EE4D30] transition-colors">
                {rec.name}
              </h4>
              
              <div className="pt-1.5 border-t border-zinc-100 flex flex-col">
                <span className="text-[11px] sm:text-xs font-bold text-zinc-950 font-sans">
                  ${rec.price.toFixed(2)}
                </span>
                <div className="flex items-center text-amber-500 text-[9px] mt-0.5 space-x-0.5">
                  <Star className="w-2.5 h-2.5 fill-amber-400 stroke-amber-400 shrink-0" />
                  <span className="font-bold text-zinc-700">{rec.rating}</span>
                  <span className="text-zinc-400 font-normal">({rec.reviewsCount})</span>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
