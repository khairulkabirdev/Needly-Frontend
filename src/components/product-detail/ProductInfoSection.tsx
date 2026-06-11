import React, { useState } from "react";
import { Star, ShoppingBag, Heart, RefreshCw, Sparkles, Check, GitCompare } from "lucide-react";
import { Product } from "../../types";

interface ProductInfoSectionProps {
  product: Product;
  wishlistIds: string[];
  onAddToCart: (p: Product, qty: number, color: string) => void;
  onAddToWishlist: (p: Product) => void;
  onBuyNow: (p: Product, qty: number, color: string) => void;
  selectedColor?: string;
  setSelectedColor?: (color: string) => void;
}

export default function ProductInfoSection({
  product,
  wishlistIds,
  onAddToCart,
  onAddToWishlist,
  onBuyNow,
  selectedColor: propSelectedColor,
  setSelectedColor: propSetSelectedColor
}: ProductInfoSectionProps) {
  const isWishlisted = wishlistIds.includes(product.id);
  const [quantity, setQuantity] = useState(1);

  // Dynamic colors list
  const availableColors = ["Black", "Cream/Silver", "Dark Blue"];
  const [internalSelectedColor, setInternalSelectedColor] = useState(availableColors[0]);

  const activeColor = propSelectedColor || internalSelectedColor;
  const setActiveColor = propSetSelectedColor || setInternalSelectedColor;

  // Active models/sizes list
  const availableModels = ["Standard", "XM5 Premium", "XM5 Bundle"];
  const [selectedModel, setSelectedModel] = useState(availableModels[0]);

  // Handle Buy Now workflow
  const handleBuy = () => {
    onBuyNow(product, quantity, activeColor);
  };

  const handleCartAdd = () => {
    onAddToCart(product, quantity, activeColor);
  };

  return (
    <div className="space-y-6 text-left" id="product-detail-info-sheet">
      
      {/* 1. Needly Choice premium highlight pill */}
      <div>
        <div className="bg-[#FFF0EB] text-[#EE4D30] font-sans text-xs font-semibold px-2.5 py-1 rounded-full w-fit mb-2">
          Needly Choice
        </div>

        {/* 2. Main Title Header directly matching the image */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight leading-snug">
          {product.id === "sony-wh1000xm5" 
            ? "Sony WH-1000XM5 Wireless Noise Canceling Headphones" 
            : product.name}
        </h1>

        {/* 3. Rating Stars & Sales Count segment */}
        <div className="flex items-center space-x-1.5 mt-2.5 text-xs font-sans">
          <div className="flex items-center text-amber-400 space-x-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-current text-amber-400 stroke-amber-405" />
            ))}
          </div>
          <span className="text-[#EE4D30] font-bold ml-1">
            {product.id === "sony-wh1000xm5" ? "4.8" : product.rating}
          </span>
          <span className="text-zinc-400">
            ({product.id === "sony-wh1000xm5" ? "1,256 reviews" : `${product.reviewsCount} reviews`})
          </span>
          <span className="text-zinc-350">|</span>
          <span className="text-zinc-500 font-medium">
            {product.id === "sony-wh1000xm5" ? "3,450 sold" : "2,150 sold"}
          </span>
        </div>
      </div>

      {/* 4. Price presentation block with NO border lines */}
      <div className="py-2 space-y-1" id="pricing-ratio-block">
        <div className="flex items-baseline space-x-3">
          <span className="text-3xl font-extrabold text-[#EE4D30] tracking-tight">
            ${product.id === "sony-wh1000xm5" ? "299.99" : product.price.toFixed(2)}
          </span>
          <span className="text-sm text-zinc-400 line-through font-sans">
            ${product.id === "sony-wh1000xm5" ? "389.99" : (product.originalPrice || (product.price * 1.3)).toFixed(2)}
          </span>
          <span className="bg-[#E6F9F0] text-[#00B05C] font-sans text-xs font-semibold px-2.5 py-0.5 rounded-md">
            {product.id === "sony-wh1000xm5" ? "25% OFF" : (product.discountBadge || "15% OFF")}
          </span>
        </div>
        <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-mono font-medium">
          Inclusive of all taxes
        </p>
      </div>

      {/* 5. Special Promotional coupons displayed side-by-side inside solid matching boxes without dashed borders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-sans text-xs text-left" id="coupons-benefit-promo">
        <div className="bg-[#FFF0EB] p-3 rounded-lg flex items-center justify-center text-[#EE4D30] font-bold shadow-3xs">
          <span>Buy 2 Get 5% OFF</span>
        </div>
        <div className="bg-[#FFF0EB] p-3 rounded-lg flex items-center justify-center text-[#EE4D30] font-bold shadow-3xs text-center">
          <span>Extra $10 OFF on orders over $100</span>
        </div>
      </div>

      {/* 6. Dynamic Color Selection row */}
      <div className="space-y-2">
        <div className="text-xs text-zinc-900 font-medium">
          <span className="text-zinc-500 font-bold">Color:</span> <span className="font-extrabold">{activeColor}</span>
        </div>
        <div className="flex items-center space-x-3.5" id="color-bubbles-row">
          {availableColors.map((color) => {
            const isSelected = activeColor === color;
            
            // Map color names to raw HEX values
            let colorHex = "#1A1A1A"; // Black
            if (color === "Cream/Silver") colorHex = "#ECEAE4";
            if (color === "Dark Blue") colorHex = "#2E3B4E";

            return (
              <button
                key={color}
                onClick={() => setActiveColor(color)}
                className={`w-9 h-9 rounded-full border cursor-pointer transition-transform relative flex items-center justify-center ${
                  isSelected 
                    ? "ring-2 ring-offset-2 ring-[#EE4D30] border-transparent" 
                    : "border-zinc-300 hover:border-zinc-450"
                }`}
                style={{ backgroundColor: colorHex }}
                title={`Select ${color}`}
              />
            );
          })}
        </div>
      </div>

      {/* 7. Model/Size category choice segment */}
      <div className="space-y-2.5">
        <span className="block text-xs font-bold text-zinc-500">
          Size/Model:
        </span>
        <div className="flex flex-wrap gap-2.5">
          {availableModels.map((model) => {
            const isSelected = selectedModel === model;
            return (
              <button
                key={model}
                onClick={() => setSelectedModel(model)}
                className={`px-5 py-2.5 font-sans text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-white text-[#EE4D30] border-[#EE4D30]"
                    : "bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400"
                }`}
              >
                {model}
              </button>
            );
          })}
        </div>
      </div>

      {/* 8. Quantity Picker with Stock warning indicator */}
      <div className="space-y-2.5">
        <span className="block text-xs font-bold text-zinc-500">
          Quantity:
        </span>
        <div className="flex items-center space-x-6">
          <div className="flex items-center border border-zinc-200 rounded-lg overflow-hidden bg-white w-28">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-9 h-9 flex items-center justify-center text-zinc-500 font-bold hover:bg-zinc-50 cursor-pointer"
            >
              -
            </button>
            <span className="flex-1 text-center text-xs font-bold text-zinc-900">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="w-9 h-9 flex items-center justify-center text-zinc-500 font-bold hover:bg-zinc-50 cursor-pointer"
            >
              +
            </button>
          </div>

          <div className="flex items-center space-x-2 text-xs font-sans text-emerald-600 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block animate-pulse" />
            <span>In Stock</span>
            <span className="text-zinc-250">|</span>
            <span className="text-zinc-500">Ships within 24 hours</span>
          </div>
        </div>
      </div>

      {/* 9. Checkout Action CTAs - Double Layout identical to screenshot */}
      <div className="grid grid-cols-2 gap-4 pt-3" id="main-buy-ctas-grid">
        <button
          onClick={handleCartAdd}
          className="h-12 border border-[#EE4D30] text-[#EE4D30] hover:bg-[#EE4D30]/5 text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <svg 
            className="w-5 h-5 text-[#EE4D30]" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>Add to Cart</span>
        </button>

        <button
          onClick={handleBuy}
          className="h-12 bg-[#EE4D30] hover:bg-[#D53A22] text-white text-sm font-bold rounded-lg transition-colors flex items-center justify-center cursor-pointer shadow-sm"
        >
          Buy Now
        </button>
      </div>

      {/* 10. Secondary controls (Add to Wishlist / Compare) */}
      <div className="flex items-center space-x-6 text-xs text-zinc-500 pt-1 font-sans">
        <button
          onClick={() => onAddToWishlist(product)}
          className={`flex items-center space-x-1.5 hover:text-[#EE4D30] transition-colors cursor-pointer select-none font-medium ${
            isWishlisted ? "text-[#EE4D30]" : ""
          }`}
          type="button"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
          <span>Add to Wishlist</span>
        </button>

        <button
          className="flex items-center space-x-1.5 hover:text-zinc-950 transition-colors cursor-pointer select-none font-medium"
          type="button"
          onClick={() => alert("Product added to comparative list dashboard!")}
        >
          <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span>Compare</span>
        </button>
      </div>

    </div>
  );
}
