import { 
  Star, 
  ShoppingCart, 
  Heart, 
  ChevronRight,
  FilterX
} from "lucide-react";
import { Product } from "../types";
import { CHOICE_DEALS } from "../data";

interface TopChoiceProps {
  onAddToCart: (p: Product) => void;
  onAddToWishlist: (p: Product) => void;
  onSelectProduct: (p: Product) => void;
  selectedCategory: string;
  onCategorySelect: (cat: string) => void;
  wishlistIds: string[];
}

export default function TopChoice({
  onAddToCart,
  onAddToWishlist,
  onSelectProduct,
  selectedCategory,
  onCategorySelect,
  wishlistIds
}: TopChoiceProps) {
  
  // Filter products based on selected category if matching
  const filteredProducts = selectedCategory 
    ? CHOICE_DEALS.filter(p => p.category.toLowerCase().includes(selectedCategory.toLowerCase()) || selectedCategory.toLowerCase().includes(p.category.toLowerCase()))
    : CHOICE_DEALS;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-sans animate-fade-in" id="top-choice-section">
      {/* Header section with exact matches to the uploaded screenshot design */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-[#111111] tracking-tight">
            Top Chegorice
          </h2>
        </div>

        <div className="flex items-center space-x-2">
          {selectedCategory && (
            <button
              onClick={() => onCategorySelect("")}
              className="px-2.5 py-1 text-[10px] border border-orange-200 text-[#FF5000] bg-orange-50 font-bold rounded-md flex items-center space-x-1 hover:bg-orange-100 transition-colors"
            >
              <span>Reset: {selectedCategory}</span>
              <span className="text-[8px]">✖</span>
            </button>
          )}
          <button 
            onClick={() => onCategorySelect("")}
            className="flex items-center text-xs font-semibold text-gray-500 hover:text-[#FF5000] cursor-pointer transition-colors"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
          </button>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="bg-gray-50 border border-gray-100 rounded-2xl py-12 px-4 flex flex-col items-center justify-center text-center">
          <FilterX className="w-8 h-8 text-gray-300 mb-2" />
          <h4 className="text-xs font-bold text-gray-700">No Choice items matched</h4>
          <p className="text-[10px] text-gray-400 mt-0.5">Clear the filter to explore all of our deals!</p>
          <button
            onClick={() => onCategorySelect("")}
            className="mt-3 px-4 py-1.5 bg-[#FF5000] text-white rounded-lg text-xs font-bold hover:bg-[#E04600] transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4" id="choice-products-grid">
          {filteredProducts.slice(0, 6).map((prod) => {
            const isWishlisted = wishlistIds.includes(prod.id);
            return (
              <div
                key={prod.id}
                onClick={() => onSelectProduct(prod)}
                className="bg-[#F8F8F8] hover:bg-[#F2F2F2] rounded-2xl border border-gray-100 overflow-hidden hover:border-[#FF5000]/20 hover:shadow-xs transition-all duration-300 flex flex-col justify-between group relative p-3 cursor-pointer"
              >
                {/* Upper control badges row exactly matching screenshot */}
                <div className="w-full flex items-center justify-between mb-2">
                  {prod.choice ? (
                    <div className="bg-[#FFE14D] text-[#1E1E1E] text-[10px] font-extrabold px-2 py-0.5 rounded-md flex items-center select-none shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                      <span className="mr-0.5 text-[9px]">✓</span>Choice
                    </div>
                  ) : (
                    <div />
                  )}
                  {prod.discountBadge && (
                    <span className="bg-[#FF5000] text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full">
                      {prod.discountBadge}
                    </span>
                  )}
                </div>

                {/* Primary item picture */}
                <div className="w-full aspect-square bg-[#F8F8F8] group-hover:bg-[#F2F2F2] flex items-center justify-center p-3 relative overflow-hidden rounded-xl transition-colors duration-300">
                  <img
                    src={prod.imageUrl}
                    alt={prod.name}
                    className="max-h-[110px] max-w-full object-contain mix-blend-multiply duration-500 group-hover:scale-108 transition-transform pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Floating Action Overlay on Hover - Keeps Ecommerce capability without cluttering static design */}
                  <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-250 flex flex-col gap-1.5 z-10 pointer-events-auto">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToWishlist(prod);
                      }}
                      className={`p-1.5 rounded-full shadow-md cursor-pointer transition-colors ${
                        isWishlisted 
                          ? "bg-red-50 text-red-500" 
                          : "bg-white text-gray-400 hover:text-red-500 hover:bg-white"
                      }`}
                    >
                      <Heart className={`w-3 h-3 ${isWishlisted ? "fill-red-500" : ""}`} />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(prod);
                      }}
                      className="p-1.5 bg-[#FF5000] text-white rounded-full shadow-md hover:bg-[#E04600] cursor-pointer transition-colors"
                    >
                      <ShoppingCart className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Info and action panel matching screenshot layout exactly */}
                <div className="text-left flex flex-col flex-grow justify-between mt-1">
                  <div>
                    <h3 className="text-[12px] sm:text-[13px] font-medium text-[#222222] tracking-tight leading-tight truncate">
                      {prod.name}
                    </h3>

                    {/* Price Line: $28.99 $44.99 row */}
                    <div className="flex items-baseline space-x-1.5 mt-1">
                      <span className="text-[14px] sm:text-[15px] font-bold text-[#111111]">
                        ${prod.price.toFixed(2)}
                      </span>
                      {prod.originalPrice && (
                        <span className="text-[11px] text-[#999999] line-through font-normal">
                          ${prod.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Rating Line: 4.8 | 12.5K sold footer */}
                  <div className="flex items-center text-[#999999] text-[10px] sm:text-[11px] font-medium mt-1">
                    <Star className="w-3.5 h-3.5 fill-[#FF8A00] text-[#FF8A00] mr-1" />
                    <span className="text-[#FF8A00] font-semibold">{prod.rating}</span>
                    <span className="mx-1 text-gray-300">|</span>
                    <span>{prod.reviewsCount} sold</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
