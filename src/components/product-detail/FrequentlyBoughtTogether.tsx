import React, { useState } from "react";
import { Star, Plus, Check } from "lucide-react";
import { Product } from "../../types";

interface FrequentlyBoughtTogetherProps {
  product: Product;
  onAddToCart: (p: Product, qty: number, color: string) => void;
}

interface BundleItem {
  id: string;
  name: string;
  price: number;
  rating: number;
  imageUrl: string;
  checked: boolean;
}

export default function FrequentlyBoughtTogether({ product, onAddToCart }: FrequentlyBoughtTogetherProps) {
  // Setup exact accessories matching the image:
  // - Sony WH-1000XM5 Wireless Headphones ($299.99)
  // - Sony Headphone Case for WH-1000XM5 ($29.99)
  // - Sony USB-C Fast Charger 30W ($19.99)
  const [items, setItems] = useState<BundleItem[]>([
    {
      id: "main-prod",
      name: product.id === "sony-wh1000xm5" ? "Sony WH-1000XM5 Wireless Headphones" : product.name,
      price: product.price,
      rating: product.rating,
      imageUrl: product.imageUrl,
      checked: true, // Lead product is checked
    },
    {
      id: "bundle-case",
      name: "Sony Headphone Case for WH-1000XM5",
      price: 29.99,
      rating: 4.7,
      imageUrl: "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?w=300&auto=format&fit=crop&q=80",
      checked: true,
    },
    {
      id: "bundle-charger",
      name: "Sony USB-C Fast Charger 30W",
      price: 19.99,
      rating: 4.6,
      imageUrl: "https://images.unsplash.com/photo-1615887023516-9b6bcd559e87?w=150&auto=format&fit=crop&q=80",
      checked: true,
    }
  ]);

  // Synchronize main product when switching details
  React.useEffect(() => {
    setItems((prev) =>
      prev.map((it, idx) =>
        idx === 0
          ? {
              ...it,
              name: product.id === "sony-wh1000xm5" ? "Sony WH-1000XM5 Wireless Headphones" : product.name,
              price: product.price,
              rating: product.rating,
              imageUrl: product.imageUrl,
            }
          : it
      )
    );
  }, [product.id, product.price, product.rating, product.imageUrl]);

  const toggleCheck = (id: string, index: number) => {
    if (id === "main-prod") return; // Keep lead product checked as per default behavior
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, checked: !it.checked } : it))
    );
  };

  const selectedItems = items.filter((it) => it.checked);
  
  // Pricing logic matching physical retail mathematical subtotal
  const totalPrice = selectedItems.reduce((acc, current) => acc + current.price, 0);
  const rawSum = items.reduce((acc, c) => acc + c.price, 0);

  const handleAddAll = () => {
    if (selectedItems.length === 0) return;
    
    selectedItems.forEach((item) => {
      const mockProduct: Product = {
        id: item.id === "main-prod" ? product.id : item.id,
        name: item.name,
        price: item.price,
        rating: item.rating,
        reviewsCount: "100+",
        imageUrl: item.imageUrl,
        category: "electronics",
      };
      onAddToCart(mockProduct, 1, "Original Series");
    });

    alert(`Successfully bundled and loaded ${selectedItems.length} items to your shopping bag!`);
  };

  return (
    <div className="bg-white border border-zinc-200/60 rounded-[24px] p-5 sm:p-6 shadow-3xs flex flex-col justify-between h-full text-left" id="frequently-bought-together-section">
      <div>
        <h3 className="text-sm font-bold text-zinc-950 tracking-tight mb-4 shrink-0">
          Frequently Bought Together
        </h3>
        
        {/* Row matching layout with Plus dividers */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const isMain = item.id === "main-prod";
            
            return (
              <React.Fragment key={item.id}>
                {/* Product microcard */}
                <div 
                  onClick={() => toggleCheck(item.id, index)}
                  className={`relative flex flex-col justify-between w-[105px] sm:w-[124px] h-[190px] sm:h-[210px] p-3 border transition-all rounded-[18px] cursor-pointer select-none bg-white ${
                    isMain 
                      ? "border-[#EE4D30] ring-1 ring-[#EE4D35] bg-[#FFFDFD] shadow-2xs" 
                      : item.checked 
                        ? "border-zinc-200/85 hover:border-zinc-350" 
                        : "border-dashed border-zinc-250 opacity-40 bg-zinc-50/50"
                  }`}
                  style={{ contentVisibility: "auto" }}
                >
                  
                  {/* Image checkbox overlay on physical card */}
                  {isMain && (
                    <div className="absolute top-2 left-2 z-10 scale-90">
                      <div className="w-5 h-5 rounded-[5px] bg-[#EE4D30] text-white flex items-center justify-center shadow-3xs">
                        <Check className="w-3.5 h-3.5 stroke-[3.5px]" />
                      </div>
                    </div>
                  )}

                  {/* Icon photo view */}
                  <div className="h-14 sm:h-16 aspect-square mx-auto flex items-center justify-center p-1 mt-1.5">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Title and pricing info */}
                  <div className="mt-1 space-y-0.5">
                    <h4 className="text-[10px] sm:text-[11px] font-semibold text-zinc-900 line-clamp-2 leading-snug">
                      {item.name}
                    </h4>
                    
                    <div className="pt-1 border-t border-zinc-100 flex flex-col">
                      <span className="text-[10px] sm:text-[11px] font-extrabold text-zinc-950 font-sans">
                        ${item.price.toFixed(2)}
                      </span>
                      <div className="flex items-center text-amber-500 text-[9px] mt-0.5 space-x-0.5">
                        <Star className="w-2.5 h-2.5 fill-amber-400 stroke-amber-400" />
                        <span className="font-bold text-zinc-700">{item.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Addition plus glyph */}
                {!isLast && (
                  <div className="text-zinc-300 font-bold flex items-center justify-center shrink-0">
                    <Plus className="w-4 h-4 stroke-[2.5px] text-zinc-400" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Pricing and cart dispatch column */}
      <div className="mt-5 pt-4 border-t border-zinc-100 flex flex-row items-center justify-between gap-3">
        <div className="text-left font-sans">
          <p className="text-xs text-zinc-400 font-medium">
            Total Price:
          </p>
          <p className="text-lg sm:text-xl font-extrabold text-zinc-950 leading-tight">
            ${totalPrice.toFixed(2)}
          </p>
          {selectedItems.length === items.length ? (
            <p className="text-[10px] font-medium flex items-center gap-1.5 mt-0.5">
              <span className="text-emerald-500 line-through font-sans">${rawSum.toFixed(2)}</span>
              <span className="text-[#EE4D30] font-bold">Save $40.00</span>
            </p>
          ) : (
            <p className="text-[9px] text-zinc-400 mt-0.5">Add companion accessories for discount</p>
          )}
        </div>

        <button
          onClick={handleAddAll}
          disabled={selectedItems.length === 0}
          className="bg-[#EE4D30] hover:bg-[#d64125] text-white text-xs font-bold py-2.5 px-4 rounded-xl cursor-pointer shadow-3xs hover:shadow-2xs transition-all active:scale-[0.98] select-none h-10 w-fit shrink-0 inline-flex items-center justify-center"
        >
          Add All to Cart
        </button>
      </div>
    </div>
  );
}
