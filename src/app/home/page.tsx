import React from "react";
import HeroSection from "../../components/HeroSection";
import TrustBadges from "../../components/TrustBadges";
import FlashDeals from "../../components/FlashDeals";
import TopCategories from "../../components/TopCategories";
import TopChoice from "../../components/TopChoice";
import PromoBanners from "../../components/PromoBanners";
import TopBrands from "../../components/TopBrands";
import { Product } from "../../types";

interface HomePageProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  wishlistIds: string[];
  onAddToCart: (p: Product) => void;
  onAddToWishlist: (p: Product) => void;
  onSelectProduct: (p: Product) => void;
  onOpenAuth: () => void;
  isCouponApplied: boolean;
  onApplyCoupon: (val: number) => void;
  onSearchSubmit: (val: string) => void;
  onBrandClick: (val: string) => void;
  activeNavTab: string;
  setActiveNavTab: (tab: string) => void;
}

export default function HomePage({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  wishlistIds,
  onAddToCart,
  onAddToWishlist,
  onSelectProduct,
  onOpenAuth,
  isCouponApplied,
  onApplyCoupon,
  onSearchSubmit,
  onBrandClick,
  activeNavTab,
  setActiveNavTab
}: HomePageProps) {
  return (
    <div className="w-full animate-fade-in" id="home-page-view">
      {/* Alert when search is active */}
      {searchTerm && (
        <div className="max-w-7xl mx-auto px-4 pt-4 mt-1">
          <div className="bg-orange-50 border border-orange-100 rounded-xl p-3.5 flex items-center justify-between text-xs font-bold text-orange-850 shadow-xs">
            <div className="flex items-center space-x-2">
              <span className="p-1 bg-orange-600 text-white rounded-md">✓</span>
              <span>Filtered Catalog results matching Search Keyword: <strong className="underline font-black text-orange-950">"{searchTerm}"</strong></span>
            </div>
            <button 
              onClick={() => setSearchTerm("")}
              className="px-2.5 py-1 bg-white hover:bg-orange-100 border border-orange-200 rounded-lg text-orange-600 transition-colors uppercase font-black cursor-pointer"
            >
              Clear Search
            </button>
          </div>
        </div>
      )}

      <HeroSection 
        onCategorySelect={(cat) => {
          setSelectedCategory(cat);
          if (cat) {
            document.getElementById("top-choice-section")?.scrollIntoView({ behavior: "smooth" });
          }
        }} 
        selectedCategory={selectedCategory}
        onOpenAuth={onOpenAuth}
        activeNavTab={activeNavTab}
        setActiveNavTab={setActiveNavTab}
      />
      
      <TrustBadges />
      
      <FlashDeals 
        onAddToCart={(p) => onAddToCart(p)}
        onAddToWishlist={onAddToWishlist}
        onSelectProduct={onSelectProduct}
        wishlistIds={wishlistIds}
      />
      
      <TopCategories 
        onCategorySelect={(cat) => {
          setSelectedCategory(cat);
          if (cat) {
            document.getElementById("top-choice-section")?.scrollIntoView({ behavior: "smooth" });
          }
        }}
        selectedCategory={selectedCategory}
      />
      
      <TopChoice 
        onAddToCart={(p) => onAddToCart(p)}
        onAddToWishlist={onAddToWishlist}
        onSelectProduct={onSelectProduct}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        wishlistIds={wishlistIds}
      />
      
      <PromoBanners 
        onApplyCoupon={onApplyCoupon}
        isCouponApplied={isCouponApplied}
      />
      
      <TopBrands onBrandClick={onBrandClick} />
    </div>
  );
}
