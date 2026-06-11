import React, { useState } from "react";
import { 
  ArrowLeft, 
  Heart, 
  ShoppingBag, 
  Trash2, 
  Star, 
  Filter, 
  Tag, 
  Share2, 
  Sparkles,
  AlertCircle
} from "lucide-react";
import { Product } from "../../types";

interface WishlistPageProps {
  wishlist: Product[];
  onAddToCart: (p: Product) => void;
  onRemoveFromWishlist: (p: Product) => void;
  onSelectProduct: (p: Product) => void;
  onNavigateBack: () => void;
}

export default function WishlistPage({
  wishlist,
  onAddToCart,
  onRemoveFromWishlist,
  onSelectProduct,
  onNavigateBack
}: WishlistPageProps) {
  // Category filter state
  const [selectedTag, setSelectedTag] = useState("all");
  const [isShareSuccess, setIsShareSuccess] = useState(false);

  // Derive wishlist categories
  const categories = ["all", ...new Set(wishlist.map((p) => p.category))];

  // Filtered items
  const filteredWishlist = selectedTag === "all" 
    ? wishlist 
    : wishlist.filter((p) => p.category === selectedTag);

  const handleShareLink = () => {
    setIsShareSuccess(true);
    setTimeout(() => {
      setIsShareSuccess(false);
    }, 2800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in" id="wishlist-page-view">
      {/* Top action header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-150 mb-8 gap-4">
        <div>
          <button 
            onClick={onNavigateBack}
            className="flex items-center space-x-1.5 text-xs font-bold font-mono text-gray-500 hover:text-black mb-2.5 group cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>BACK TO DISCOVER CATALOG</span>
          </button>
          <div className="flex items-center space-x-2">
            <Heart className="w-6 h-6 text-red-650 fill-current" />
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">Your Curated Collection</h1>
          </div>
          <p className="text-[10px] text-gray-400 font-mono mt-0.5 uppercase">
            Saves are persisted locally to support temporary drafting on Needles.
          </p>
        </div>

        {wishlist.length > 0 && (
          <div className="flex items-center space-x-2">
            <button
              onClick={handleShareLink}
              className="px-4 py-2 bg-white border border-gray-250 hover:bg-gray-50 text-gray-700 text-xs font-bold font-mono uppercase tracking-wider rounded-lg flex items-center space-x-2 shadow-3xs cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Board</span>
            </button>
          </div>
        )}
      </div>

      {isShareSuccess && (
        <div className="bg-teal-50 border border-teal-150 text-teal-800 rounded-xl p-3.5 text-xs font-black text-center mb-6 font-mono animate-fade-in">
          ✓ WISHLIST SHARE LINK GENERATED: copied custom clipboard link node successfully!
        </div>
      )}

      {wishlist.length === 0 ? (
        /* EMPTY STATE */
        <div className="py-20 text-center max-w-sm mx-auto animate-fade-in">
          <div className="inline-flex p-4 bg-red-50 text-red-650 border border-red-100 rounded-full mb-6">
            <Heart className="w-9 h-9" />
          </div>
          <h2 className="text-lg font-extrabold text-gray-900 mb-1.5">Collection Slate is Clean</h2>
          <p className="text-xs text-gray-500 font-mono leading-relaxed mb-6">
            Explore our custom collection matrix of hardware gear, click the heart badges to bookmark and organize devices.
          </p>
          <button
            onClick={onNavigateBack}
            className="bg-black hover:bg-zinc-900 text-white text-xs font-bold font-mono uppercase tracking-widest px-5 py-3 rounded-lg cursor-pointer"
          >
            GO TO HARDWARE ITEMS
          </button>
        </div>
      ) : (
        /* GRID & CONTROLS */
        <div className="space-y-6">
          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-1.5 border-b border-dashed border-gray-200 pb-4">
            <div className="flex items-center space-x-1 text-[10px] font-black text-gray-400 tracking-wider font-mono mr-2 uppercase">
              <Filter className="w-3 h-3" />
              <span>SEGMENT FILTER:</span>
            </div>
            
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedTag(cat)}
                className={`px-3 py-1 text-xs font-bold font-mono rounded-full uppercase transition-all tracking-wider border cursor-pointer ${
                  selectedTag === cat 
                    ? "bg-black text-white border-black" 
                    : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                }`}
              >
                {cat === "all" ? "All Saved Items" : cat}
              </button>
            ))}
          </div>

          {/* Grid display */}
          {filteredWishlist.length === 0 ? (
            <div className="bg-gray-50 border border-gray-150 rounded-xl p-8 text-center text-xs text-gray-500 font-mono">
              No bookmarks match this category partition.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredWishlist.map((product) => (
                <div 
                  key={product.id}
                  className="bg-white border border-gray-200 hover:border-black/40 rounded-xl p-4.5 flex flex-col justify-between transition-colors shadow-3xs group relative"
                >
                  {/* Remove badge */}
                  <button
                    onClick={() => onRemoveFromWishlist(product)}
                    className="absolute top-3 right-3 p-1.5 bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-600 border border-gray-150 rounded-lg transition-colors cursor-pointer z-10"
                    title="Remove from board"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div 
                    onClick={() => onSelectProduct(product)}
                    className="cursor-pointer space-y-4"
                  >
                    {/* Thumbnail view */}
                    <div className="aspect-square bg-gray-50 rounded-lg p-3 flex items-center justify-center overflow-hidden relative">
                      <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="max-h-28 max-w-28 object-contain group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer" 
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono font-bold text-amber-600 uppercase tracking-wider">
                          {product.category}
                        </span>
                        <div className="flex items-center space-x-0.5 text-amber-500 text-[10px] font-bold">
                          <Star className="w-2.5 h-2.5 fill-current" />
                          <span>{product.rating}</span>
                        </div>
                      </div>

                      <h3 className="text-xs font-black text-gray-900 group-hover:underline line-clamp-1">
                        {product.name}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-100 pt-3.5 mt-4">
                    <span className="font-mono text-xs font-black text-black">
                      ${product.price.toFixed(2)}
                    </span>
                    
                    <button
                      onClick={() => onAddToCart(product)}
                      className="bg-black hover:bg-zinc-900 text-white font-mono text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg flex items-center space-x-1.5 cursor-pointer"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>BAG IT</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
