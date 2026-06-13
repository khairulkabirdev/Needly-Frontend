import React, { useState, useMemo } from "react";
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  SlidersHorizontal, 
  Grid2X2, 
  List, 
  ChevronDown, 
  ChevronUp, 
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { Product, FilterableSmartphone } from "../../types";
import { SMARTPHONES_DATA } from "../../data";

interface SmartphonesPageProps {
  wishlistIds: string[];
  onAddToCart: (p: Product, qty: number, color?: string) => void;
  onAddToWishlist: (p: Product) => void;
  onSelectProduct: (p: Product) => void;
  onNavigateHome: () => void;
}

export default function SmartphonesPage({
  wishlistIds,
  onAddToCart,
  onAddToWishlist,
  onSelectProduct,
  onNavigateHome
}: SmartphonesPageProps) {

  // Grid/List toggle state
  const [isGridView, setIsGridView] = useState(true);

  // Mobile filters toggled state
  const [isFiltersMobileOpen, setIsFiltersMobileOpen] = useState(false);

  // Sorting state (Popular, LowToHigh, HighToLow, Rating)
  const [sortedBy, setSortedBy] = useState("Popular");

  // Filter States matching the values on the sidebar:
  // Brand selection
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  // Price sliders
  const [minPrice, setMinPrice] = useState<number>(50);
  const [maxPrice, setMaxPrice] = useState<number>(1500);
  // Stars checkbox selection
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  // Storage checkboxes
  const [selectedStorage, setSelectedStorage] = useState<string[]>([]);
  // Screen size checkboxes
  const [selectedScreenSizes, setSelectedScreenSizes] = useState<string[]>([]);

  // Interactive page state
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Collapsible brand filter
  const [isBrandExpanded, setIsBrandExpanded] = useState(true);

  const toggleBrandFilter = (brandName: string) => {
    setSelectedBrands(prev => 
      prev.includes(brandName) 
        ? prev.filter(b => b !== brandName) 
        : [...prev, brandName]
    );
    setCurrentPage(1);
  };

  const toggleStarFilter = (starsNumber: number) => {
    setSelectedStars(prev => 
      prev.includes(starsNumber)
        ? prev.filter(s => s !== starsNumber)
        : [...prev, starsNumber]
    );
    setCurrentPage(1);
  };

  const toggleStorageFilter = (size: string) => {
    setSelectedStorage(prev => 
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
    setCurrentPage(1);
  };

  const toggleScreenFilter = (sizeCode: string) => {
    setSelectedScreenSizes(prev => 
      prev.includes(sizeCode)
        ? prev.filter(s => s !== sizeCode)
        : [...prev, sizeCode]
    );
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setMinPrice(50);
    setMaxPrice(1500);
    setSelectedStars([]);
    setSelectedStorage([]);
    setSelectedScreenSizes([]);
    setSortedBy("Popular");
    setCurrentPage(1);
  };

  // Filter logic
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...SMARTPHONES_DATA];

    // Brand filter
    if (selectedBrands.length > 0) {
      result = result.filter(prod => selectedBrands.includes(prod.brand));
    }

    // Price range filter
    result = result.filter(prod => prod.price >= minPrice && prod.price <= maxPrice);

    // Rating filter (selected rating is minimum threshold)
    if (selectedStars.length > 0) {
      // If stars selected are say 5 and 4, we match if the product rating is one of those or higher:
      result = result.filter(prod => {
        return selectedStars.some(starThreshold => prod.rating >= starThreshold);
      });
    }

    // Storage filter
    if (selectedStorage.length > 0) {
      result = result.filter(prod => selectedStorage.includes(prod.storage));
    }

    // Screen size filter
    if (selectedScreenSizes.length > 0) {
      result = result.filter(prod => selectedScreenSizes.includes(prod.screenSize));
    }

    // Sorting
    if (sortedBy === "Popular") {
      // Default order in data
    } else if (sortedBy === "PriceLowToHigh") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortedBy === "PriceHighToLow") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortedBy === "TopRated") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedBrands, minPrice, maxPrice, selectedStars, selectedStorage, selectedScreenSizes, sortedBy]);

  // Convert custom smartphone back to global Product format before cart/wishlist
  const mapToGlobalProduct = (phone: FilterableSmartphone): Product => {
    return {
      id: phone.id,
      name: phone.name,
      price: phone.price,
      originalPrice: phone.originalPrice,
      discountBadge: phone.discountBadge,
      rating: phone.rating,
      reviewsCount: `${phone.reviewsCount}`,
      imageUrl: phone.imageUrl,
      category: "electronics"
    };
  };

  const handleProductClick = (phone: FilterableSmartphone) => {
    onSelectProduct(mapToGlobalProduct(phone));
  };

  const handleAddToCartClick = (e: React.MouseEvent, phone: FilterableSmartphone) => {
    e.stopPropagation();
    onAddToCart(mapToGlobalProduct(phone), 1, "Liquid Carbon");
  };

  const handleAddToWishlistClick = (e: React.MouseEvent, phone: FilterableSmartphone) => {
    e.stopPropagation();
    onAddToWishlist(mapToGlobalProduct(phone));
  };

  return (
    <div className="w-full font-sans pb-16" id="smartphones-category-layout">
      
      {/* 1. Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        
        {/* 2. Path Breadcrumbs matching screenshot exactly */}
        <nav className="flex items-center space-x-1.5 text-[11px] text-zinc-400 font-medium py-3" id="smartphones-breadcrumbs">
          <button onClick={onNavigateHome} className="hover:text-zinc-900 transition-colors cursor-pointer">Home</button>
          <span>&gt;</span>
          <span className="hover:text-zinc-900 transition-colors cursor-pointer">Electronics</span>
          <span>&gt;</span>
          <span className="text-zinc-800 font-bold">Smartphones</span>
        </nav>

        {/* 3. Title Section with promo card layout */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-6" id="smartphones-hero-card">
          <div className="max-w-xl text-left">
            <h1 className="text-3xl font-black text-zinc-900 tracking-tight mb-2" id="smartphones-page-title">
              Smartphones
            </h1>
            <p className="text-xs text-zinc-400 font-medium leading-relaxed">
              Discover the best smartphones from top brands with amazing features and unbeatable prices.
            </p>
          </div>

          {/* Promotional Banner Box */}
          <div className="bg-[#FFEAEA] border border-[#FFD8D8] rounded-2xl p-4 flex items-center justify-between w-full md:w-80 shadow-3xs group relative overflow-hidden" id="smartphones-promo-banner">
            <div className="text-left z-10">
              <span className="text-[10px] font-bold text-[#FF5000] uppercase tracking-wider block mb-1">Weekly Offer</span>
              <h3 className="text-sm font-black text-zinc-900 leading-tight">Great Deals on</h3>
              <p className="text-[13px] font-extrabold text-zinc-800">Latest Smartphones</p>
              <p className="text-xs font-medium text-[#FF5000] mt-1">Up to <span className="font-extrabold text-base">30% OFF</span></p>
            </div>
            
            {/* Visual Phone Collage placement */}
            <div className="w-28 h-20 relative flex items-center justify-center shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=300&auto=format&fit=crop&q=80"
                alt="Promo Smartphones" 
                className="w-16 h-16 object-contain absolute z-10 rotate-12 translate-x-3 pointer-events-none select-none drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <img 
                src="https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300&auto=format&fit=crop&q=80"
                alt="Promo Smartphones 2" 
                className="w-14 h-14 object-contain absolute -rotate-12 -translate-x-3 pointer-events-none select-none drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* 4. Secondary Row: Sidebar (Filter block) + Right Product Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="smartphones-grid-split">
          
          {/* ================== LEFT FILTER SIDEBAR BACKPLANE ================== */}
          <aside className={`${isFiltersMobileOpen ? "block" : "hidden lg:block"} lg:col-span-3 bg-white border border-zinc-200/60 rounded-[28px] p-5 shadow-3xs text-left select-none space-y-6 animate-fade-in`} id="smartphones-filter-sidebar">
            
            {/* Category Listing Module */}
            <div className="space-y-3" id="categories-filter-widget">
              <h3 className="text-xs font-black text-zinc-900 uppercase tracking-wider mb-2">
                Categories
              </h3>
              <div className="flex flex-col space-y-2">
                <button className="flex items-center justify-between text-xs font-bold text-[#FF5000] bg-[#FFF5F0] px-3.5 py-2.5 rounded-xl border-l-[3.5px] border-[#FF5000] w-full text-left transition-colors cursor-pointer">
                  <span>Smartphones</span>
                  <span className="text-[10px] text-zinc-400 bg-white border border-zinc-100 rounded-md px-1.5 py-0.5">324</span>
                </button>
                <button onClick={onNavigateHome} className="flex items-center justify-between text-xs font-medium text-zinc-500 hover:text-zinc-900 px-3.5 py-1.5 w-full text-left transition-colors cursor-pointer">
                  <span>Feature Phones</span>
                  <span className="text-[10px] text-zinc-400 bg-[#fbfbfa] rounded-md px-1.5">42</span>
                </button>
                <button onClick={onNavigateHome} className="flex items-center justify-between text-xs font-medium text-zinc-500 hover:text-zinc-900 px-3.5 py-1.5 w-full text-left transition-colors cursor-pointer">
                  <span>Phone Accessories</span>
                  <span className="text-[10px] text-zinc-400 bg-[#fbfbfa] rounded-md px-1.5">186</span>
                </button>
                <button onClick={onNavigateHome} className="flex items-center justify-between text-xs font-medium text-zinc-500 hover:text-zinc-900 px-3.5 py-1.5 w-full text-left transition-colors cursor-pointer">
                  <span>Tablets</span>
                  <span className="text-[10px] text-zinc-400 bg-[#fbfbfa] rounded-md px-1.5">25</span>
                </button>
                <button onClick={onNavigateHome} className="flex items-center justify-between text-xs font-medium text-zinc-500 hover:text-zinc-900 px-3.5 py-1.5 w-full text-left transition-colors cursor-pointer">
                  <span>Smartwatches</span>
                  <span className="text-[10px] text-zinc-400 bg-[#fbfbfa] rounded-md px-1.5">94</span>
                </button>
                <button onClick={onNavigateHome} className="flex items-center justify-between text-xs font-medium text-zinc-500 hover:text-zinc-900 px-3.5 py-1.5 w-full text-left transition-colors cursor-pointer">
                  <span>Laptops</span>
                  <span className="text-[10px] text-zinc-400 bg-[#fbfbfa] rounded-md px-1.5">110</span>
                </button>
                <button onClick={onNavigateHome} className="flex items-center justify-between text-xs font-medium text-zinc-500 hover:text-zinc-900 px-3.5 py-1.5 w-full text-left transition-colors cursor-pointer">
                  <span>Headphones</span>
                  <span className="text-[10px] text-zinc-400 bg-[#fbfbfa] rounded-md px-1.5">140</span>
                </button>
                <button onClick={onNavigateHome} className="flex items-center justify-between text-xs font-medium text-zinc-500 hover:text-zinc-900 px-3.5 py-1.5 w-full text-left transition-colors cursor-pointer">
                  <span>Cameras</span>
                  <span className="text-[10px] text-zinc-400 bg-[#fbfbfa] rounded-md px-1.5">52</span>
                </button>
                <button onClick={onNavigateHome} className="flex items-center justify-between text-xs font-medium text-zinc-500 hover:text-zinc-900 px-3.5 py-1.5 w-full text-left transition-colors cursor-pointer group">
                  <span className="flex items-center text-[#FF5000]">More Categories <ChevronDown className="w-3 h-3 ml-1" /></span>
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-zinc-200/65" />

            <div className="flex items-center justify-between">
              <h3 className="text-[13px] font-extrabold text-zinc-950 flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-500" />
                <span>Filter By</span>
              </h3>
            </div>

            {/* Brand Filter Element */}
            <div className="space-y-3" id="brand-filters-list">
              <button 
                onClick={() => setIsBrandExpanded(!isBrandExpanded)}
                className="flex items-center justify-between w-full text-[11px] font-black text-zinc-900 uppercase tracking-wider text-left"
              >
                <span>Brand</span>
                {isBrandExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {isBrandExpanded && (
                <div className="space-y-2 mt-2">
                  {[
                    { name: "Apple", count: 25 },
                    { name: "Samsung", count: 38 },
                    { name: "Xiaomi", count: 32 },
                    { name: "Realme", count: 18 },
                    { name: "OnePlus", count: 15 },
                    { name: "Oppo", count: 20 }
                  ].map((brand) => (
                    <label 
                      key={brand.name} 
                      className="flex items-center justify-between text-xs font-medium text-zinc-650 cursor-pointer hover:text-zinc-900 transition-colors"
                    >
                      <div className="flex items-center space-x-2.5">
                        <input 
                          type="checkbox"
                          className="rounded border-zinc-300 text-[#FF5000] focus:ring-[#FF5000] cursor-pointer"
                          checked={selectedBrands.includes(brand.name)}
                          onChange={() => toggleBrandFilter(brand.name)}
                          id={`brand-cb-${brand.name}`}
                        />
                        <span>{brand.name}</span>
                      </div>
                      <span className="text-[10px] text-zinc-400 font-normal">({brand.count})</span>
                    </label>
                  ))}
                  <button className="text-[10px] font-extrabold text-[#FF5000] hover:underline mt-1 cursor-pointer">
                    View More +
                  </button>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="h-px bg-zinc-200/65" />

            {/* Price Slider Filter with boxes as shown in mockup */}
            <div className="space-y-3" id="price-filters-widget">
              <h4 className="text-[11px] font-black text-zinc-900 uppercase tracking-wider">
                Price Range
              </h4>
              
              <div className="space-y-2 pt-1 px-1">
                {/* HTML range input (simple dual mockup) */}
                <input 
                  type="range"
                  min={50}
                  max={1500}
                  step={50}
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(parseInt(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="w-full h-1 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-[#FF5000]"
                  id="price-range-slider-bar"
                />
                
                {/* Visual Boxes layout matching screenshot */}
                <div className="flex items-center justify-between gap-2.5 pt-2">
                  <div className="flex-1 bg-[#FBFBFA] border border-zinc-250/80 rounded-xl py-2 px-3 text-center">
                    <span className="text-[10px] text-zinc-400 block uppercase font-mono leading-none mb-0.5">Min</span>
                    <span className="text-zinc-900 text-xs font-black font-mono">${minPrice}</span>
                  </div>
                  <span className="text-xs text-zinc-400 font-bold" id="to-price-range-indicator">to</span>
                  <div className="flex-1 bg-[#FBFBFA] border border-zinc-250/80 rounded-xl py-2 px-3 text-center">
                    <span className="text-[10px] text-zinc-400 block uppercase font-mono leading-none mb-0.5">Max</span>
                    <span className="text-zinc-900 text-xs font-black font-mono">${maxPrice}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-zinc-200/65" />

            {/* Star Ratings Multi-select Selector */}
            <div className="space-y-3" id="rating-filters-widget">
              <h4 className="text-[11px] font-black text-zinc-900 uppercase tracking-wider">
                Rating
              </h4>
              <div className="space-y-2.5">
                {[
                  { stars: 5, label: "Up", count: 128 },
                  { stars: 4, label: "Up", count: 256 },
                  { stars: 3, label: "Up", count: 312 },
                  { stars: 2, label: "Up", count: 98 },
                  { stars: 1, label: "Up", count: 45 }
                ].map((row) => (
                  <label 
                    key={row.stars}
                    className="flex items-center justify-between text-xs font-medium text-zinc-650 hover:text-zinc-900 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center space-x-2.5">
                      <input 
                        type="checkbox"
                        checked={selectedStars.includes(row.stars)}
                        onChange={() => toggleStarFilter(row.stars)}
                        className="rounded border-zinc-300 text-[#FF5000] focus:ring-[#FF5000] cursor-pointer"
                        id={`stars-cb-${row.stars}`}
                      />
                      <div className="flex items-center text-amber-500 space-x-0.5">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star 
                            key={idx} 
                            className={`w-3 h-3 ${idx < row.stars ? "fill-amber-400 stroke-amber-400" : "text-zinc-200"}`} 
                          />
                        ))}
                        <span className="text-zinc-500 font-medium text-[11px] ml-1.5">{row.label}</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-zinc-400 font-normal">({row.count})</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-zinc-200/65" />

            {/* Storage capacity selector */}
            <div className="space-y-3" id="storage-filters-widget">
              <h4 className="text-[11px] font-black text-zinc-900 uppercase tracking-wider">
                Storage
              </h4>
              <div className="space-y-2">
                {[
                  { code: "64GB", count: 45 },
                  { code: "128GB", count: 78 },
                  { code: "256GB", count: 96 },
                  { code: "512GB", count: 32 }
                ].map((obj) => (
                  <label 
                    key={obj.code}
                    className="flex items-center justify-between text-xs font-medium text-zinc-650 hover:text-zinc-900 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center space-x-2.5">
                      <input 
                        type="checkbox"
                        checked={selectedStorage.includes(obj.code)}
                        onChange={() => toggleStorageFilter(obj.code)}
                        className="rounded border-zinc-300 text-[#FF5000] focus:ring-[#FF5000] cursor-pointer"
                        id={`storage-cb-${obj.code}`}
                      />
                      <span>{obj.code}</span>
                    </div>
                    <span className="text-[10px] text-zinc-400">({obj.count})</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-zinc-200/65" />

            {/* Screen size filter */}
            <div className="space-y-3" id="screen-size-filters-widget">
              <h4 className="text-[11px] font-black text-zinc-900 uppercase tracking-wider">
                Screen Size
              </h4>
              <div className="space-y-2">
                {[
                  { label: "Under 5.5\"", code: "under-5.5", count: 12 },
                  { label: "5.5\" - 6.1\"", code: "5.5-6.1", count: 68 },
                  { label: "6.1\" - 6.7\"", code: "6.1-6.7", count: 112 },
                  { label: "Above 6.7\"", code: "above-6.7", count: 54 }
                ].map((sz) => (
                  <label 
                    key={sz.code}
                    className="flex items-center justify-between text-xs font-medium text-zinc-650 hover:text-zinc-900 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center space-x-2.5">
                      <input 
                        type="checkbox"
                        checked={selectedScreenSizes.includes(sz.code)}
                        onChange={() => toggleScreenFilter(sz.code)}
                        className="rounded border-zinc-300 text-[#FF5000] focus:ring-[#FF5000] cursor-pointer"
                        id={`screen-cb-${sz.code}`}
                      />
                      <span>{sz.label}</span>
                    </div>
                    <span className="text-[10px] text-zinc-400">({sz.count})</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Clear button */}
            <div className="pt-2">
              <button
                onClick={clearAllFilters}
                className="w-full border border-zinc-300 hover:border-zinc-500 hover:bg-zinc-50 text-zinc-700 text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-3xs active:scale-98"
                id="clear-all-filters-btn"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear All Filters</span>
              </button>
            </div>

          </aside>

          {/* ================== RIGHT PRODUCT BACKPLANE VIEWPORT ================== */}
          <main className="lg:col-span-9" id="smartphones-product-area">
            
            {/* Top Area Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 mb-6 gap-3 bg-gray-50 border border-zinc-100 rounded-2xl" id="smartphones-results-top-toolbar">
              
              {/* Layout triggers (Grid / List switcher + Mobile Filter Button) */}
              <div className="flex items-center justify-between sm:justify-start gap-4 text-left w-full sm:w-auto">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setIsGridView(true)}
                    className={`p-2 rounded-lg cursor-pointer transition-all ${isGridView ? "bg-[#FFF5F0] text-[#FF5000] border border-[#FF5000]/10" : "text-zinc-400 hover:bg-zinc-100"}`}
                    aria-label="Grid View"
                    id="grid-layout-view-btn"
                  >
                    <Grid2X2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setIsGridView(false)}
                    className={`p-2 rounded-lg cursor-pointer transition-all ${!isGridView ? "bg-[#FFF5F0] text-[#FF5000] border border-[#FF5000]/10" : "text-zinc-400 hover:bg-zinc-100"}`}
                    aria-label="List View"
                    id="list-layout-view-btn"
                  >
                    <List className="w-4 h-4" />
                  </button>

                  {/* Toggle Filters Button for Mobile and Tablet viewports */}
                  <button
                    type="button"
                    onClick={() => setIsFiltersMobileOpen(!isFiltersMobileOpen)}
                    className="lg:hidden flex items-center space-x-1.5 px-3 py-2 bg-white border border-zinc-200 hover:border-[#FF5000]/30 hover:bg-orange-50 text-zinc-700 hover:text-[#FF5000] text-xs font-bold rounded-lg transition-all cursor-pointer shadow-3xs"
                    id="toggle-filters-mobile-btn"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>Filters {selectedBrands.length + selectedStars.length + selectedStorage.length + selectedScreenSizes.length > 0 ? `(${selectedBrands.length + selectedStars.length + selectedStorage.length + selectedScreenSizes.length})` : ""}</span>
                  </button>
                </div>
                
                <span className="text-xs text-zinc-500 font-semibold font-mono shrink-0">
                  Showing 1-{filteredAndSortedProducts.length} results
                </span>
              </div>

              {/* Sort selector dropdown */}
              <div className="flex items-center space-x-3 text-left">
                <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Sort By:</span>
                <div className="relative">
                  <select
                    value={sortedBy}
                    onChange={(e) => setSortedBy(e.target.value)}
                    className="appearance-none bg-white border border-zinc-200 rounded-xl pl-4 pr-10 py-2.5 text-xs font-bold text-zinc-800 cursor-pointer focus:outline-hidden focus:ring-1 focus:ring-[#FF5000]/30 outline-none"
                    id="sort-by-selector"
                  >
                    <option value="Popular">Popular Code (Default)</option>
                    <option value="PriceLowToHigh">Price: Low to High</option>
                    <option value="PriceHighToLow">Price: High to Low</option>
                    <option value="TopRated">Highest Rated</option>
                  </select>
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none">
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

            </div>

            {/* Main Product Canvas */}
            {filteredAndSortedProducts.length === 0 ? (
              <div className="bg-white border border-dashed border-zinc-200 rounded-[28px] py-20 px-8 text-center space-y-4" id="empty-filters-box">
                <p className="text-zinc-400 text-sm font-medium">No smartphones found matching the current filters.</p>
                <button 
                  onClick={clearAllFilters}
                  className="px-5 py-2.5 bg-[#FF5000] hover:bg-[#E04600] text-white font-bold text-xs rounded-xl transition-colors cursor-pointer shadow-3xs"
                >
                  Reset Active Filters
                </button>
              </div>
            ) : (
              <div 
                className={
                  isGridView 
                    ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5" 
                    : "flex flex-col gap-4"
                } 
                id="smartphones-listed-grid"
              >
                {filteredAndSortedProducts.map((phone) => {
                  const isWishlisted = wishlistIds.includes(phone.id);
                  const saving = phone.originalPrice ? phone.originalPrice - phone.price : 0;

                  if (isGridView) {
                    return (
                      <div
                        key={phone.id}
                        onClick={() => handleProductClick(phone)}
                        className="group relative bg-white border border-zinc-200 hover:border-[#FF5000]/60 rounded-[24px] p-4 flex flex-col justify-between h-[360px] transition-all duration-300 hover:shadow-2xs cursor-pointer text-left"
                        id={`smartphones-grid-card-${phone.id}`}
                        style={{ contentVisibility: "auto" }}
                      >
                        {/* Top Badging & Love Icon */}
                        <div className="flex items-center justify-between w-full absolute top-4 left-0 px-4 z-10">
                          {/* Discount Badge */}
                          {phone.badgeType !== "none" ? (
                            <span className={`text-[10px] font-black uppercase text-white px-2.5 py-1 rounded-[8px] tracking-wide shadow-3xs ${
                              phone.badgeType === "new" ? "bg-emerald-500" : "bg-red-500"
                            }`}>
                              {phone.discountBadge}
                            </span>
                          ) : (
                            <div />
                          )}

                          {/* Love Wishlist Indicator Accent */}
                          <button
                            type="button"
                            onClick={(e) => handleAddToWishlistClick(e, phone)}
                            className={`w-8 h-8 rounded-full border bg-white flex items-center justify-center transition-all shadow-3xs hover:scale-105 active:scale-95 ${
                              isWishlisted 
                                ? "border-[#FF5000]/10 text-red-500" 
                                : "border-zinc-200 text-zinc-400 hover:text-zinc-900"
                          }`}
                            aria-label={`Favorite ${phone.name}`}
                            id={`wishicon-grid-${phone.id}`}
                          >
                            <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
                          </button>
                        </div>

                        {/* Phone Image Gallery Wrapper */}
                        <div className="mx-auto flex items-center justify-center select-none bg-zinc-50/40 rounded-2xl w-full h-36 mb-3 p-2 transition-transform duration-300 group-hover:scale-102">
                          <img
                            src={phone.imageUrl}
                            alt={phone.name}
                            className="max-h-full max-w-full object-contain mix-blend-multiply"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Phone Metadata Block */}
                        <div className="text-left space-y-1 mt-1">
                          {/* Brand spec */}
                          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block font-mono">
                            {phone.brand}
                          </span>

                          {/* Name header */}
                          <h4 className="text-xs font-bold text-zinc-900 line-clamp-2 leading-snug tracking-tight group-hover:text-[#FF5000] transition-colors min-h-[36px]">
                            {phone.name}
                          </h4>

                          {/* Rating row matching mockup */}
                          <div className="flex items-center text-amber-500 text-[10px] space-x-0.5 pt-0.5">
                            <div className="flex items-center">
                              {Array.from({ length: 5 }).map((_, idx) => (
                                <Star 
                                  key={idx} 
                                  className={`w-3 h-3 ${idx < phone.rating ? "fill-amber-400 stroke-amber-400" : "text-zinc-200"}`} 
                                />
                              ))}
                            </div>
                            <span className="text-zinc-400 font-bold shrink-0 ml-1">({phone.reviewsCount})</span>
                          </div>

                          {/* Pricing element */}
                          <div className="flex items-baseline space-x-2 pt-1 font-sans">
                            <span className="text-sm font-extrabold text-zinc-950 font-sans">
                              ${phone.price.toFixed(2)}
                            </span>
                            {phone.originalPrice && (
                              <span className="text-[11px] text-zinc-400 line-through font-sans">
                                 ${phone.originalPrice.toFixed(2)}
                              </span>
                            )}
                            {saving > 0 && (
                              <span className="text-[9px] text-[#FF5000] font-bold uppercase font-mono">
                                Save ${saving.toFixed(0)}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Side by side shopping buttons at bottom */}
                        <div className="flex items-center gap-2 pt-3 border-t border-zinc-100 w-full">
                          {/* 1. Micro Cart button */}
                          <button
                            type="button"
                            onClick={(e) => handleAddToCartClick(e, phone)}
                            className="p-2.5 rounded-xl border border-zinc-200 hover:border-[#FF5000]/60 hover:bg-[#FFF5F0]/20 text-zinc-700 hover:text-[#FF5000] transition-all cursor-pointer shadow-3xs flex items-center justify-center shrink-0 active:scale-95"
                            aria-label={`Quick add ${phone.name} to cart`}
                            id={`cart-quick-grid-${phone.id}`}
                          >
                            <ShoppingCart className="w-4 h-4" />
                          </button>

                          {/* 2. Text Add to Cart button */}
                          <button
                            type="button"
                            onClick={(e) => handleAddToCartClick(e, phone)}
                            className="flex-1 bg-white hover:bg-[#FFF5F0]/20 border border-zinc-200 hover:border-[#FF5000]/50 text-zinc-800 hover:text-[#FF5000] text-[11px] font-black py-2 rounded-xl transition-all shadow-3xs flex items-center justify-center cursor-pointer uppercase tracking-wider active:scale-[0.98]"
                            id={`addall-grid-btn-${phone.id}`}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={phone.id}
                        onClick={() => handleProductClick(phone)}
                        className="group relative bg-white border border-zinc-200 hover:border-[#FF5000]/50 rounded-[24px] p-5 flex flex-col sm:flex-row items-stretch gap-6 transition-all duration-300 hover:shadow-xs cursor-pointer text-left"
                        id={`smartphones-list-card-${phone.id}`}
                        style={{ contentVisibility: "auto" }}
                      >
                        {/* Elegant Left Image Box */}
                        <div className="w-full h-48 sm:w-44 sm:h-44 bg-zinc-50/50 rounded-2xl flex items-center justify-center p-4 shrink-0 relative overflow-hidden group-hover:bg-zinc-50 transition-colors">
                          {/* Discount Badge directly inside the image container for cleaner local context */}
                          {phone.badgeType !== "none" && (
                            <span className={`absolute top-3 left-3 z-10 text-[9px] font-black uppercase text-white px-2 py-0.5 rounded-[6px] tracking-wider shadow-3xs ${
                              phone.badgeType === "new" ? "bg-emerald-500" : "bg-red-500"
                            }`}>
                              {phone.discountBadge}
                            </span>
                          )}

                          <img
                            src={phone.imageUrl}
                            alt={phone.name}
                            className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-103"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Mid Section: Information and Specifications */}
                        <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
                          <div className="space-y-1.5">
                            {/* Brand name */}
                            <span className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest block font-mono">
                              {phone.brand}
                            </span>

                            {/* Product Title */}
                            <h4 className="text-base sm:text-lg font-bold text-zinc-900 group-hover:text-[#FF5000] transition-colors leading-snug line-clamp-2">
                              {phone.name}
                            </h4>

                            {/* Rating row with stars */}
                            <div className="flex items-center text-amber-500 text-xs space-x-1">
                              <div className="flex items-center">
                                {Array.from({ length: 5 }).map((_, idx) => (
                                  <Star 
                                    key={idx} 
                                    className={`w-3.5 h-3.5 ${idx < phone.rating ? "fill-amber-400 stroke-amber-400" : "text-zinc-200"}`} 
                                  />
                                ))}
                              </div>
                              <span className="text-zinc-400 font-bold ml-1">({phone.reviewsCount} reviews)</span>
                            </div>

                            {/* Custom spec pills representing unique technical properties */}
                            <div className="flex flex-wrap gap-2 pt-2">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-[10px] font-extrabold uppercase tracking-wider bg-zinc-100 text-zinc-650 border border-zinc-200/30 font-mono">
                                <span className="text-xs">💾</span> {phone.storage}
                              </span>
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-[10px] font-extrabold uppercase tracking-wider bg-orange-50/30 text-[#FF5000] border border-orange-100/20 font-mono">
                                <span className="text-xs">📱</span> {phone.screenSize === "under-5.5" ? "Compact (<5.5\")" : phone.screenSize === "5.5-6.1" ? "Medium (5.5-6.1\")" : phone.screenSize === "6.1-6.7" ? "Pro (6.1-6.7\")" : "Ultra (>6.7\")"}
                              </span>
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-[10px] font-extrabold uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-100/50 font-mono">
                                <span className="text-xs">✓</span> In Stock / Fast Delivery
                              </span>
                            </div>
                          </div>

                          {/* Extra subtle tagline */}
                          <p className="text-[11px] text-zinc-400 font-medium hidden sm:block">
                            Free accessory bundle and manufacturer warranty included with authorized retail purchase.
                          </p>
                        </div>

                        {/* Right Section: Separate block for Pricing & Action Buttons */}
                        <div className="w-full sm:w-48 shrink-0 flex flex-col justify-between items-start sm:items-end sm:text-right border-t sm:border-t-0 sm:border-l border-zinc-100 pt-4 sm:pt-0 sm:pl-6 space-y-4 sm:space-y-0 text-left">
                          
                          {/* Pricing structure */}
                          <div className="space-y-1 w-full text-left sm:text-right">
                            <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-wider block font-sans">Retail Price</span>
                            <div className="flex items-baseline sm:justify-end gap-2.5">
                              <span className="text-xl sm:text-2xl font-black text-zinc-950 font-sans tracking-tight">
                                ${phone.price.toFixed(2)}
                              </span>
                              {phone.originalPrice && (
                                <span className="text-xs text-zinc-400 line-through font-sans">
                                   ${phone.originalPrice.toFixed(2)}
                                </span>
                              )}
                            </div>
                            {saving > 0 && (
                              <span className="inline-block text-[10px] font-extrabold text-red-500 bg-red-50 border border-red-100/60 px-2 py-0.5 rounded-md uppercase tracking-wide font-mono">
                                Save ${saving.toFixed(0)}
                              </span>
                            )}
                          </div>

                          {/* Action columns / controls row */}
                          <div className="flex items-center gap-2.5 w-full">
                            {/* Favorite Love Button */}
                            <button
                              type="button"
                              onClick={(e) => handleAddToWishlistClick(e, phone)}
                              className={`w-11 h-11 rounded-xl border bg-white flex items-center justify-center transition-all shadow-3xs hover:scale-105 active:scale-95 hover:bg-zinc-50 shrink-0 ${
                                isWishlisted 
                                  ? "border-red-100 text-red-500 bg-red-50/20" 
                                  : "border-zinc-250 text-zinc-400 hover:text-zinc-800"
                              }`}
                              aria-label={`Favorite ${phone.name}`}
                              id={`wishicon-list-${phone.id}`}
                            >
                              <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
                            </button>

                            {/* primary Cart purchase button */}
                            <button
                              type="button"
                              onClick={(e) => handleAddToCartClick(e, phone)}
                              className="flex-1 bg-[#FF5000] hover:bg-[#E04600] text-white text-xs font-black py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-2xs cursor-pointer uppercase tracking-wider active:scale-[0.98]"
                              id={`addall-list-btn-${phone.id}`}
                            >
                              <ShoppingCart className="w-4 h-4" />
                              <span>Add to Cart</span>
                            </button>
                          </div>

                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            )}

            {/* Pagination Segment exactly styled like mockup code */}
            <div className="flex items-center justify-center space-x-1.5 pt-12 pb-4" id="smartphones-pagination-widget">
              
              {/* Back btn */}
              <button
                type="button"
                onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-8 h-8 rounded-xl border border-zinc-200 hover:border-zinc-300 bg-white flex items-center justify-center text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Page numbers */}
              {[1, 2, 3, 4, 5].map((pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-8 h-8 rounded-xl text-xs font-black transition-all flex items-center justify-center shrink-0 cursor-pointer ${
                    currentPage === pageNum
                      ? "bg-[#FF5000] text-white shadow-3xs scale-105"
                      : "bg-white border border-zinc-200 text-zinc-800 hover:bg-zinc-50"
                  }`}
                  id={`page-btn-${pageNum}`}
                >
                  {pageNum}
                </button>
              ))}

              <span className="text-zinc-300 px-1 font-bold">...</span>

              <button
                type="button"
                onClick={() => setCurrentPage(27)}
                className={`w-8 h-8 rounded-xl text-xs font-black transition-all flex items-center justify-center shrink-0 cursor-pointer ${
                  currentPage === 27
                    ? "bg-[#FF5000] text-white shadow-3xs"
                    : "bg-white border border-zinc-200 text-zinc-800 hover:bg-zinc-50"
                }`}
                id="page-btn-27"
              >
                27
              </button>

              {/* Next btn */}
              <button
                type="button"
                onClick={() => currentPage < 27 && setCurrentPage(currentPage + 1)}
                className="w-8 h-8 rounded-xl border border-zinc-200 hover:border-zinc-300 bg-white flex items-center justify-center text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer shrink-0"
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

            </div>

          </main>

        </div>

      </div>

      {/* 5. Trust Badges strip (matching layout at the bottom of category page) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-zinc-200" id="smartphones-trust-badges">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white border border-zinc-150/80 rounded-3xl p-6 shadow-3xs">
          
          <div className="flex items-center space-x-3.5 text-left" id="badge-shipping">
            <div className="w-10 h-10 rounded-xl bg-orange-100/50 text-[#FF5000] flex items-center justify-center shrink-0 font-bold text-xl">
              🚚
            </div>
            <div>
              <h4 className="text-xs font-black text-zinc-900 leading-tight">Free Shipping</h4>
              <p className="text-[10px] text-zinc-400 font-medium">On orders over $50</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 text-left" id="badge-payment">
            <div className="w-10 h-10 rounded-xl bg-orange-100/50 text-[#FF5000] flex items-center justify-center shrink-0 font-bold text-xl">
              🛡️
            </div>
            <div>
              <h4 className="text-xs font-black text-zinc-900 leading-tight">Secure Payment</h4>
              <p className="text-[10px] text-zinc-400 font-medium">100% secure payment</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 text-left" id="badge-returns">
            <div className="w-10 h-10 rounded-xl bg-orange-100/50 text-[#FF5000] flex items-center justify-center shrink-0 font-bold text-xl">
              🔄
            </div>
            <div>
              <h4 className="text-xs font-black text-zinc-900 leading-tight">30-Day Returns</h4>
              <p className="text-[10px] text-zinc-400 font-medium">Easy returns & refunds</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 text-left" id="badge-support">
            <div className="w-10 h-10 rounded-xl bg-orange-100/50 text-[#FF5000] flex items-center justify-center shrink-0 font-bold text-xl">
              📞
            </div>
            <div>
              <h4 className="text-xs font-black text-zinc-900 leading-tight">24/7 Support</h4>
              <p className="text-[10px] text-zinc-400 font-medium">We're here to help</p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
