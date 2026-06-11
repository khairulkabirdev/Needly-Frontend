import React, { useState, useEffect } from "react";
import { ChevronRight, Home, ArrowLeft } from "lucide-react";
import { Product } from "../../../types";

// Import modular section components
import ProductImageGallery from "../../../components/product-detail/ProductImageGallery";
import ProductInfoSection from "../../../components/product-detail/ProductInfoSection";
import ProductTabsSection from "../../../components/product-detail/ProductTabsSection";
import FrequentlyBoughtTogether from "../../../components/product-detail/FrequentlyBoughtTogether";
import RelatedProductsGrid from "../../../components/product-detail/RelatedProductsGrid";

interface ProductPageProps {
  product: Product;
  wishlistIds: string[];
  onAddToCart: (p: Product, qty: number, color: string) => void;
  onAddToWishlist: (p: Product) => void;
  onNavigateBack: () => void;
  onSelectProduct: (p: Product) => void;
}

export default function ProductDetailPage({
  product,
  wishlistIds,
  onAddToCart,
  onAddToWishlist,
  onNavigateBack,
  onSelectProduct
}: ProductPageProps) {
  
  // Shared color state to synchronize vertical image pack immediately as user chooses a different circle shade
  const availableColors = ["Black", "Cream/Silver", "Dark Blue"];
  const [selectedColor, setSelectedColor] = useState(availableColors[0]);

  // Extract real dynamic discount percent
  const discountPercent = product.discountPercent ?? (product.discountBadge ? parseInt(product.discountBadge.replace(/[^0-9]/g, "")) : 23);

  // Scroll smoothly to top when product changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSelectedColor(availableColors[0]);
  }, [product.id]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 animate-fade-in" id="product-detail-view">
      
      {/* 1. Micro Breadcrumb path aligned tightly in page margins as shown in the screenshot */}
      <div className="flex items-center justify-between text-xs font-sans text-zinc-400 py-1" id="mockup-breadcrumbs-row">
        <div className="flex items-center gap-2 flex-wrap">
          <button 
            onClick={onNavigateBack}
            className="hover:text-zinc-900 transition-colors cursor-pointer"
          >
            Home
          </button>
          <span className="text-zinc-300">›</span>
          <span className="hover:text-zinc-900 cursor-pointer transition-colors">Electronics</span>
          <span className="text-zinc-300">›</span>
          <span className="hover:text-zinc-900 cursor-pointer transition-colors">Headphones</span>
          <span className="text-zinc-300">›</span>
          <span className="hover:text-zinc-900 cursor-pointer transition-colors">Wireless Headphones</span>
          <span className="text-zinc-300">›</span>
          <span className="text-zinc-900 font-semibold">
            {product.id === "sony-wh1000xm5" ? "Sony WH-1000XM5" : product.name}
          </span>
        </div>
      </div>

      {/* 2. Main Presentation Grid: Gallery on left, Info section on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        
        {/* Left Column (approx 6/12): Product Image Gallery with Vertical list */}
        <div className="lg:col-span-7">
          <ProductImageGallery 
            product={product} 
            discountPercent={discountPercent} 
            selectedColor={selectedColor}
          />
        </div>

        {/* Right Column (approx 5/12): Purchase control, pricing, shade bubbles */}
        <div className="lg:col-span-5">
          <ProductInfoSection 
            product={product} 
            wishlistIds={wishlistIds} 
            onAddToCart={onAddToCart} 
            onAddToWishlist={onAddToWishlist} 
            onBuyNow={onAddToCart} 
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
        </div>
      </div>

      {/* 3. Divided Segment: Sold By & Customer Specs tabs split */}
      <div className="pt-6 border-t border-zinc-100">
        <ProductTabsSection product={product} />
      </div>

      {/* 4 & 5. Bottom Split Section: Frequently Bought Together (Left) & You May Also Like (Right) */}
      <div className="pt-6 border-t border-zinc-100 grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch pb-8" id="product-bottom-recs-split">
        <div className="xl:col-span-7 flex flex-col">
          <FrequentlyBoughtTogether 
            product={product} 
            onAddToCart={onAddToCart}
          />
        </div>
        <div className="xl:col-span-5 flex flex-col">
          <RelatedProductsGrid 
            onSelectProduct={onSelectProduct} 
          />
        </div>
      </div>

    </div>
  );
}
