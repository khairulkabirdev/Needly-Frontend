import React, { useState } from "react";
import { 
  Search, 
  Heart, 
  ShoppingCart, 
  User, 
  ChevronDown, 
  Smartphone, 
  Sparkles,
  HelpCircle,
  Truck,
  Menu,
  Globe,
  Laptop,
  Cpu,
  Shirt,
  Bike,
  Gamepad,
  Car,
  Watch,
  Wrench,
  Baby,
  Grid,
  Home
} from "lucide-react";
import { ALL_SIDEBAR_CATEGORIES } from "../data";

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  onSearchSubmit: (val: string) => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  activeNavTab: string;
  setActiveNavTab: (tab: string) => void;
  onOpenAuth: () => void;
  currentPath?: string;
  onNavigateHome?: () => void;
}

export default function Header({
  cartCount,
  wishlistCount,
  searchTerm,
  setSearchTerm,
  onSearchSubmit,
  onOpenCart,
  onOpenWishlist,
  activeNavTab,
  setActiveNavTab,
  onOpenAuth,
  currentPath = "/",
  onNavigateHome
}: HeaderProps) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchTerm);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit(localSearch);
  };

  const navLinks = [
    { id: "deals", label: "Super Deals", hot: true },
    { id: "arrivals", label: "New Arrivals", hot: false },
    { id: "brands", label: "Top Brands", hot: false },
    { id: "choice", label: "Needly Choice", hot: false },
    { id: "save", label: "Big Save", hot: false },
    { id: "essentials", label: "Home Essentials", hot: false },
  ];

  const getCategoryIcon = (iconName: string) => {
    const cls = "w-4 h-4 stroke-[1.5] text-black group-hover:text-[#FF5000] transition-colors shrink-0";
    switch (iconName) {
      case "Laptop": return <Laptop className={cls} />;
      case "Smartphone": return <Smartphone className={cls} />;
      case "Cpu": return <Cpu className={cls} />;
      case "Home": return <Home className={cls} />;
      case "Shirt": return <Shirt className={cls} />;
      case "Sparkles": return <Sparkles className={cls} />;
      case "Bike": return <Bike className={cls} />;
      case "Gamepad": return <Gamepad className={cls} />;
      case "Car": return <Car className={cls} />;
      case "Watch": return <Watch className={cls} />;
      case "Wrench": return <Wrench className={cls} />;
      case "Baby": return <Baby className={cls} />;
      default: return <Sparkles className={cls} />;
    }
  };

  const isHomepage = currentPath === "/";

  return (
    <header className="w-full bg-white border-b border-[#FF5000]/10 font-sans shadow-xs" id="needly-main-header">
      {/* 1. Top Ribbon Bar */}
      <div className="w-full bg-transparent text-[11px] font-semibold text-gray-500 py-2.5 border-b border-[#FF5000]/5" id="top-ribbon">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <a href="#sell" className="flex items-center hover:text-[#FF5000] transition-colors">
              <Sparkles className="w-3 h-3 text-gray-400 mr-1.5" />
              <span>Sell on Needly</span>
            </a>
            <a href="#care" className="flex items-center hover:text-[#FF5000] transition-colors">
              <span>Customer Care</span>
              <ChevronDown className="w-3 h-3 text-gray-400 ml-1" />
            </a>
            <a href="#track" className="hover:text-[#FF5000] transition-colors">Track Order</a>
          </div>
          
          <div className="flex items-center space-x-1.5 text-gray-800 font-bold" id="free-shipping-bar">
            <span>🚚</span>
            <span>Free shipping on orders over <span className="text-gray-900 font-black">$50</span></span>
          </div>

          <div className="flex items-center space-x-6" id="ribbon-right">
            <a href="#download" className="flex items-center hover:text-[#FF5000] transition-colors">
              <Smartphone className="w-3.5 h-3.5 text-gray-400 mr-1.5" />
              <span>Download App</span>
            </a>
            <button className="flex items-center hover:text-[#FF5000] cursor-pointer">
              <Globe className="w-3.5 h-3.5 text-gray-400 mr-1.5" />
              <span>English / USD</span>
              <ChevronDown className="w-3 h-3 text-gray-400 ml-1" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Large Header Bar */}
      <div className="w-full py-4 bg-transparent" id="main-nav-bar">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-6">
          
          {/* Logo */}
          <button 
            type="button"
            onClick={() => onNavigateHome?.()} 
            className="flex items-center space-x-2.5 shrink-0 select-none group text-left cursor-pointer focus:outline-hidden" 
            id="needly-logo-link"
          >
            {/* Custom crafted N icon matching Needly style */}
            <div className="w-10 h-10 rounded-2xl bg-[#FF5000] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200">
              <span className="text-white font-black text-2xl tracking-tight">N</span>
            </div>
            <span className="text-3xl font-black text-[#FF5000] tracking-tight">
              Needly
            </span>
          </button>

          {/* Search form bar matching screenshot layout exactly */}
          <form onSubmit={handleSubmit} className="flex-1 max-w-2xl flex items-center" id="search-form">
            {/* All Categories Button with absolute list placement */}
            <div className="relative mr-3 shrink-0">
              <button 
                type="button"
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className={
                  isHomepage
                    ? "flex items-center space-x-3 px-4 py-3 border border-gray-200 rounded-2xl bg-white text-gray-800 text-xs font-bold hover:bg-gray-50 transition-all text-left cursor-pointer shrink-0"
                    : "flex items-center space-x-3 px-4 py-3 border border-transparent rounded-2xl bg-[#FF5000] hover:bg-[#E04600] text-white text-xs font-bold transition-all text-left cursor-pointer shrink-0 shadow-sm"
                }
              >
                <Menu className={isHomepage ? "w-4 h-4 text-gray-800" : "w-4 h-4 text-white"} />
                <span>All Categories</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${isHomepage ? "text-gray-500" : "text-white"} ${isCategoryOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCategoryOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-orange-100 rounded-2xl shadow-xl py-2 w-64 max-h-[420px] overflow-y-auto z-50 animate-fade-in divide-y divide-gray-50">
                  <button
                    type="button"
                    onClick={() => {
                      setLocalSearch("");
                      onSearchSubmit("");
                      setIsCategoryOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-[#FFFBEA] text-xs font-medium text-gray-700 hover:text-[#FF5000] transition-colors flex items-center space-x-3 cursor-pointer group"
                  >
                    <Grid className="w-4 h-4 stroke-[1.5] text-gray-400 group-hover:text-[#FF5000] transition-colors shrink-0" />
                    <span>All Categories</span>
                  </button>

                  {ALL_SIDEBAR_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setLocalSearch(cat.name);
                        onSearchSubmit(cat.name);
                        setIsCategoryOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-[#FFFBEA] text-xs font-medium text-gray-700 hover:text-[#FF5000] transition-colors flex items-center space-x-3 cursor-pointer group"
                    >
                      {getCategoryIcon(cat.icon)}
                      <span className="truncate">{cat.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input field box */}
            <div className="flex-1 flex items-center bg-white border border-[#FF5000]/20 rounded-2xl focus-within:ring-2 focus-within:ring-[#FF5000]/10 transition-all overflow-hidden" id="search-input-field-container">
              <input 
                type="text" 
                placeholder="Search for products, brands and more..."
                className="w-full px-5 py-3.5 text-xs text-gray-800 placeholder-gray-400 bg-transparent focus:outline-hidden"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
              />
              <button 
                type="submit"
                className="px-6 py-2.5 bg-[#FF5000] hover:bg-[#E04600] active:bg-[#C83E00] text-white font-bold text-xs rounded-xl mr-1.5 transition-colors shrink-0 flex items-center justify-center cursor-pointer shadow-xs"
              >
                Search
              </button>
            </div>
          </form>

          {/* User controls / Icons matching screenshot style */}
          <div className="flex items-center space-x-7 shrink-0" id="header-user-controls">
            
            {/* Account Info */}
            <button 
              onClick={onOpenAuth}
              className="flex items-center space-x-2.5 text-gray-850 hover:text-[#FF5000] transition-colors cursor-pointer group text-left"
              id="user-account-btn"
            >
              <div className="relative flex items-center justify-center w-6 h-6 shrink-0">
                <User className="w-6 h-6 text-gray-800 stroke-[1.5]" />
              </div>
              <div className="hidden lg:block text-xs">
                <p className="text-gray-400 leading-none mb-0.5 font-medium text-[10px]">Sign in</p>
                <p className="font-extrabold text-gray-905 leading-none">Account</p>
              </div>
            </button>

            {/* Wishlist */}
            <button 
              onClick={onOpenWishlist}
              className="relative flex items-center space-x-2.5 text-gray-850 hover:text-[#FF5000] transition-colors cursor-pointer group text-left"
              id="wishlist-header-btn"
            >
              <div className="relative flex items-center justify-center w-6 h-6 shrink-0">
                <Heart className="w-6 h-6 text-gray-800 stroke-[1.5] group-hover:text-[#FF5000] transition-colors" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex min-w-[16px] h-4 px-1 items-center justify-center rounded-full bg-[#FF5000] text-[9px] font-black text-white ring-2 ring-white leading-none text-center select-none z-10">
                    {wishlistCount}
                  </span>
                )}
              </div>
              <div className="hidden lg:block text-xs">
                <p className="font-extrabold text-gray-905 leading-none">Wishlist</p>
              </div>
            </button>

            {/* Cart */}
            <button 
              onClick={onOpenCart}
              className="relative flex items-center space-x-2.5 text-gray-850 hover:text-[#FF5000] transition-colors cursor-pointer group text-left"
              id="cart-header-btn"
            >
              <div className="relative flex items-center justify-center w-6 h-6 shrink-0">
                <ShoppingCart className="w-6 h-6 text-gray-800 stroke-[1.5] group-hover:text-[#FF5000] transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex min-w-[16px] h-4 px-1 items-center justify-center rounded-full bg-[#FF5000] text-[9px] font-black text-white ring-2 ring-white leading-none text-center select-none z-10">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden lg:block text-xs">
                <p className="font-extrabold text-gray-905 leading-none">Cart</p>
              </div>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
}
