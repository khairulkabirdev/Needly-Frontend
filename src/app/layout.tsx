import React from "react";
import { X, Sparkles, ShoppingBag, Trash2, ShieldAlert } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { CartItem } from "../types";

interface LayoutProps {
  children: React.ReactNode;
  cart: CartItem[];
  cartSubtotal: number;
  totalItemsCount: number;
  wishlistCount: number;
  onNavigateHome: () => void;
  onNavigateToWishlist: () => void;
  onNavigateToCheckout: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isAuthOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;
  onRemoveFromCart: (id: string, col?: string) => void;
  onUpdateCartQty: (id: string, delta: number, col?: string) => void;
  onSearchSubmit: (term: string) => void;
  toastMessage: string;
  showToast: boolean;
  currentPath: string;
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  activeNavTab: string;
  setActiveNavTab: (tab: string) => void;
}

export default function Layout({
  children,
  cart,
  cartSubtotal,
  totalItemsCount,
  wishlistCount,
  onNavigateHome,
  onNavigateToWishlist,
  onNavigateToCheckout,
  isCartOpen,
  setIsCartOpen,
  isAuthOpen,
  setIsAuthOpen,
  onRemoveFromCart,
  onUpdateCartQty,
  onSearchSubmit,
  toastMessage,
  showToast,
  currentPath,
  searchTerm,
  setSearchTerm,
  activeNavTab,
  setActiveNavTab
}: LayoutProps) {
  // Login auth helper
  const [authUser, setAuthUser] = React.useState<string | null>(null);
  const [emailInput, setEmailInput] = React.useState("");
  const [passInput, setPassInput] = React.useState("");

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setAuthUser(emailInput.split("@")[0]);
      setIsAuthOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] selection:bg-black selection:text-white flex flex-col font-sans">
      {/* 3. SIMULATED BROWSER / PATH ROUTER STATUS BAR (Master Developer Touch) */}
      <div className="bg-gray-100/30 border-b border-gray-200/20 py-1.5 px-4 flex items-center justify-between text-[11px] font-mono text-gray-400 shrink-0">
        <div className="flex items-center space-x-2">
          <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500/80" />
          <span>Local Engine Live:</span>
          <span className="text-gray-700 font-medium bg-white/50 px-2 py-0.5 rounded border border-gray-200/25">
            needly://app{currentPath}
          </span>
        </div>
        <div className="hidden sm:flex items-center space-x-3 text-gray-400/60 text-[10px]">
          <span>RENDER PHASE: CLIENT-SIDE SPA</span>
          <span>•</span>
          <span>LATENCY: 2ms</span>
        </div>
      </div>

      {/* 1. Global Announcement Header */}
      <div className="bg-black text-white text-[10px] font-mono tracking-widest text-center py-2.5 px-4 font-bold uppercase relative z-50 flex items-center justify-center space-x-1.5 shrink-0">
        <Sparkles className="w-3.5 h-3.5 text-yellow-500 animate-pulse" />
        <span>SPECIAL INTRODUCTORY CONVERSION: ENTER CODE <strong className="text-yellow-400">WELCOME10</strong> DURING CHECKOUT FOR $10 SAVINGS</span>
        <Sparkles className="w-3.5 h-3.5 text-yellow-500 animate-pulse" />
      </div>

      {/* 2. Global Header */}
      <Header 
        cartCount={totalItemsCount} 
        wishlistCount={wishlistCount} 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearchSubmit={onSearchSubmit}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={onNavigateToWishlist}
        activeNavTab={activeNavTab}
        setActiveNavTab={setActiveNavTab}
        onOpenAuth={() => setIsAuthOpen(true)}
        currentPath={currentPath}
        onNavigateHome={onNavigateHome}
      />

      {/* 4. Main content viewport section */}
      <main className="flex-1 w-full bg-[#fbfbfa]">
        {children}
      </main>

      {/* 5. Global Footer */}
      <Footer />

      {/* 6. GLOBAL TOAST NOTIFIER */}
      <div className="fixed bottom-6 right-6 z-50 pointer-events-none">
        {showToast && (
          <div className="bg-black border border-zinc-800 text-white rounded-xl py-3.5 px-5 flex items-center space-x-3 shadow-lg select-none font-mono text-xs scale-in shrink-0">
            <span className="p-1 bg-zinc-800 text-yellow-500 rounded-md">✓</span>
            <span className="font-bold">{toastMessage}</span>
          </div>
        )}
      </div>

      {/* 7. AUTH LOGIN DRAWER OVERLAY */}
      {isAuthOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div 
            onClick={() => setIsAuthOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-350 cursor-pointer"
          />
          {/* Drawer container body */}
          <div className="relative w-full max-w-md bg-white h-screen shadow-2xl flex flex-col justify-between p-6 overflow-y-auto animate-slide-in font-mono text-xs">
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-gray-150">
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">
                  Secure Identity Check-In
                </h3>
                <button 
                  onClick={() => setIsAuthOpen(false)}
                  className="p-1.5 text-gray-400 hover:text-black hover:bg-gray-50 border border-gray-150 rounded-lg cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {authUser ? (
                <div className="space-y-4">
                  <div className="bg-emerald-50 border border-emerald-150 rounded-xl p-4 text-emerald-800">
                    <p className="font-bold">Active Connection: {authUser}@needly.co</p>
                    <p className="text-[10px] mt-1 font-normal opacity-70">Authenticated session active. Limited hardware reserves are unlocked.</p>
                  </div>
                  <button
                    onClick={() => setAuthUser(null)}
                    className="w-full bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 font-bold py-3 rounded-lg cursor-pointer text-center uppercase tracking-wider text-[10px]"
                  >
                    DISCONNECT SESSION
                  </button>
                </div>
              ) : (
                <form onSubmit={handleAuthSubmit} className="space-y-4 font-mono text-xs text-gray-650">
                  <div className="border border-amber-200 bg-amber-50 rounded-xl p-3.5 text-amber-900 flex space-x-2.5">
                    <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                    <p className="text-[10px] leading-relaxed">
                      Authenticate with a generic test mail to activate priority correspondence queues and special pricing reserves.
                    </p>
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-1">CORRESPONDENCE EMAIL</label>
                    <input 
                      type="email" 
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="e.g., client@needly.co" 
                      className="w-full bg-white border border-gray-350 rounded-xl px-3 py-2.5 text-gray-900 font-bold outline-none placeholder:font-normal focus:border-black focus:ring-1 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-1">SECURE ACCESS TOKEN (PASSWORD)</label>
                    <input 
                      type="password" 
                      required
                      value={passInput}
                      onChange={(e) => setPassInput(e.target.value)}
                      placeholder="••••••••" 
                      className="w-full bg-white border border-gray-350 rounded-xl px-3 py-2.5 text-gray-900 font-bold outline-none placeholder:font-normal focus:border-black focus:ring-1 focus:ring-black"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-black hover:bg-zinc-900 text-white font-bold py-3.5 rounded-xl uppercase tracking-wider text-[10px] cursor-pointer"
                  >
                    ESTABLISH SECURE LINK
                  </button>
                </form>
              )}
            </div>

            <div className="text-[10px] text-gray-400 text-center border-t border-gray-100 pt-4">
              Needles secure systems | Version 4.0.0 Stable
            </div>
          </div>
        </div>
      )}

      {/* 8. SHOPPING CART SIDE DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div 
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-350 cursor-pointer"
          />
          {/* Drawer container body */}
          <div className="relative w-full max-w-md bg-white h-screen shadow-2xl flex flex-col justify-between p-6 overflow-y-auto animate-slide-in">
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-gray-150">
                <div className="flex items-center space-x-2 text-xs font-bold font-mono tracking-widest text-gray-400">
                  <ShoppingBag className="w-4.5 h-4.5" />
                  <span>SHOPPING BAG ({totalItemsCount})</span>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 text-gray-400 hover:text-black hover:bg-gray-50 border border-gray-150 rounded-lg cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="py-20 text-center space-y-3 font-mono text-xs">
                  <p className="text-gray-400">Your shopping bag is completely empty.</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold uppercase rounded-lg text-[10px] tracking-wider cursor-pointer"
                  >
                    DISCOVER ITEMS
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-gray-100 max-h-[60vh] overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={`${item.product.id}-${item.selectedColor}`} className="py-4 flex items-start justify-between gap-4 font-mono text-xs text-gray-650">
                      <div className="flex items-start space-x-3.5">
                        <div className="w-14 h-14 bg-gray-50 border border-gray-150 rounded-xl p-2 flex items-center justify-center shrink-0">
                          <img 
                            src={item.product.imageUrl} 
                            alt="" 
                            className="max-h-full max-w-full object-contain"
                            referrerPolicy="no-referrer" 
                          />
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-black text-gray-900 leading-snug line-clamp-2">{item.product.name}</p>
                          <p className="text-[10px] text-gray-400 italic">Color: {item.selectedColor}</p>
                          <div className="flex items-center border border-gray-250 rounded-md bg-white p-0.5 w-fit">
                            <button
                              onClick={() => onUpdateCartQty(item.product.id, -1, item.selectedColor)}
                              className="w-5 h-5 flex items-center justify-center text-xs text-gray-400 hover:text-black cursor-pointer font-bold"
                            >
                              -
                            </button>
                            <span className="px-1.5 text-[10px] font-bold text-gray-900">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateCartQty(item.product.id, 1, item.selectedColor)}
                              className="w-5 h-5 flex items-center justify-center text-xs text-gray-400 hover:text-black cursor-pointer font-bold"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="text-right space-y-1 shrink-0">
                        <p className="text-xs font-black text-gray-900">${(item.product.price * item.quantity).toFixed(2)}</p>
                        <button
                          onClick={() => onRemoveFromCart(item.product.id, item.selectedColor)}
                          className="text-[10px] text-gray-400 hover:text-red-600 transition-colors flex items-center space-x-1 ml-auto cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3 text-red-500" />
                          <span>Trash</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-gray-150 pt-5 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-baseline">
                  <span className="text-gray-400">ESTIMATED TOTALS:</span>
                  <span className="text-lg font-black text-black">${cartSubtotal.toFixed(2)}</span>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      onNavigateToCheckout();
                    }}
                    className="w-full bg-black hover:bg-zinc-900 text-white font-bold py-3.5 rounded-xl uppercase tracking-widest text-[10px] flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
                  >
                    <span>SECURE CONVERT CHECKOUT</span>
                  </button>
                  <p className="text-[9px] text-gray-450 text-center uppercase tracking-wider">
                    Free Standard Freight applied on local deliveries.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
