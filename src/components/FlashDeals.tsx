import { useState, useEffect, useRef } from "react";
import { 
  Zap, 
  Heart, 
  ShoppingCart,
  Eye,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Product } from "../types";
import { FLASH_DEALS } from "../data";

interface FlashDealsProps {
  onAddToCart: (p: Product) => void;
  onAddToWishlist: (p: Product) => void;
  onSelectProduct: (p: Product) => void;
  wishlistIds: string[];
}

export default function FlashDeals({ 
  onAddToCart, 
  onAddToWishlist, 
  onSelectProduct,
  wishlistIds
}: FlashDealsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  // Live ticking countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 45,
    seconds: 30
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset block to loop the ticking demo
          return { hours: 12, minutes: 45, seconds: 30 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.75;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const formatUnit = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-sans" id="flash-deals-row">
      <div className="bg-[#FF5000]/5 rounded-xl flex flex-col lg:flex-row gap-4 relative">
        
        {/* Left deep-orange ticking banner card - slightly wider on desktop width */}
        <div 
          className="bg-[#FF5000] p-4 pb-5 rounded-xl flex flex-col justify-between text-white shadow-md relative w-full lg:w-[21%] shrink-0" 
          id="flash-deals-badge-banner"
        >
          <div className="">
            <div className="flex items-center space-x-1.5 text-base font-black tracking-tight mb-3">
              <Zap className="w-4 h-4 fill-white text-white shrink-0" />
              <span>Flash Deals</span>
            </div>
            
            <p className="text-[11px] text-white/90 leading-tight mb-0.5 font-medium">
              Limited time offers
            </p>
            <p className="text-[11px] text-white font-black leading-tight mb-4">
              Up to 70% off!
            </p>

            <p className="text-[9px] font-black uppercase tracking-wider text-white/80 mb-1.5">Ends in</p>
            
            {/* Countdown timer blocks updated to match image details exactly */}
            <div className="flex items-center  space-x-1.5" id="live-countdown-timer">
              <div className="bg-white text-black rounded-lg w-[44px] h-[44px] flex flex-col items-center justify-center shadow-xs">
                <span className="text-xs font-black text-gray-950 leading-none">
                  {formatUnit(timeLeft.hours)}
                </span>
                <span className="text-[8px] font-bold text-gray-500 mt-0.5">Hrs</span>
              </div>
              <div className="bg-white text-black rounded-lg w-[44px] h-[44px] flex flex-col items-center justify-center shadow-xs">
                <span className="text-xs font-black text-gray-950 leading-none">
                  {formatUnit(timeLeft.minutes)}
                </span>
                <span className="text-[8px] font-bold text-gray-500 mt-0.5">Mins</span>
              </div>
              <div className="bg-white text-black rounded-lg w-[44px] h-[44px] flex flex-col items-center justify-center shadow-xs">
                <span className="text-xs font-black text-gray-950 leading-none">
                  {formatUnit(timeLeft.seconds)}
                </span>
                <span className="text-[8px] font-bold text-gray-500 mt-0.5">Secs</span>
              </div>
            </div>
          </div>

          <button 
            type="button" 
            className="w-full py-2 bg-white text-[#FF5000] rounded-xl text-[11px] font-black shadow-xs hover:bg-orange-50 active:scale-98 transition-all cursor-pointer text-center mt-3"
          >
            View All Deals
          </button>
        </div>

        {/* Right products container - smooth scrolling slider */}
        <div className="flex-1 min-w-0 relative">
          <div className="w-full h-full overflow-hidden relative">
            <style>{`
              .no-scrollbar::-webkit-scrollbar {
                display: none;
              }
              .no-scrollbar {
                -ms-overflow-style: none; /* IE and Edge */
                scrollbar-width: none; /* Firefox */
              }
            `}</style>

            <div 
              ref={scrollContainerRef}
              className="h-full flex overflow-x-auto gap-4 animate-fade-in no-scrollbar scroll-smooth px-1"
            >
            {FLASH_DEALS.map((prod) => {
              const isWishlisted = wishlistIds.includes(prod.id);
              return (
                <div
                  key={prod.id}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-2xs group flex flex-col justify-between hover:border-orange-100 hover:shadow-md transition-all duration-300 relative pb-4 w-[150px] sm:w-[175px] md:w-[195px] my-3 shrink-0"
                >
                  {/* Discount Badge */}
                  <div className="absolute top-3 left-3 z-10 bg-[#FF5000] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-2xs">
                    {prod.discountBadge}
                  </div>

                  {/* Wishlist toggle badge */}
                  <button
                    type="button"
                    onClick={() => onAddToWishlist(prod)}
                    className={`absolute top-3 right-3 z-10 p-1.5 rounded-full shadow-3xs cursor-pointer transition-all duration-200 ${
                      isWishlisted ? "bg-red-50 text-[#FF5000]" : "bg-white/80 hover:bg-white text-gray-400 hover:text-[#FF5000]"
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isWishlisted ? "fill-[#FF5000]" : ""}`} />
                  </button>

                  {/* Larger dynamic imagery container to make images look beautiful and big */}
                  <div className="w-full h-40 bg-white flex items-center justify-center p-3 relative overflow-hidden">
                    {/* Opacity loading animation using the primary color */}
                    {!loadedImages[prod.id] && (
                      <div className="absolute inset-0 bg-[#FF5000]/5 flex items-center justify-center animate-pulse z-0">
                        <Zap className="w-6 h-6 text-[#FF5000] opacity-25 animate-bounce" />
                      </div>
                    )}
                    <img
                      src={prod.imageUrl}
                      alt={prod.name}
                      onLoad={() => setLoadedImages(prev => ({ ...prev, [prod.id]: true }))}
                      className={`max-h-[130px] max-w-full object-contain mix-blend-multiply transition-all duration-500 transform group-hover:scale-105 ${
                        loadedImages[prod.id] ? "opacity-100 scale-100" : "opacity-0 scale-95"
                      }`}
                      referrerPolicy="no-referrer"
                    />

                    {/* Hover actions panel containing both Quick View and Add To Cart */}
                    <div className="absolute inset-0 bg-white/70 backdrop-blur-xs opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center gap-1.5 transition-all duration-300">
                      <button
                        type="button"
                        onClick={() => onSelectProduct(prod)}
                        className="w-[85%] bg-white border border-gray-200 text-gray-800 text-[11px] font-bold py-1.5 px-2.5 rounded-lg shadow-xs hover:bg-[#FF5000] hover:border-[#FF5000] hover:text-white flex items-center justify-center gap-1 transition-all cursor-pointer transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Quick View</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onAddToCart(prod)}
                        className="w-[85%] bg-[#FF5000] text-white text-[11px] font-bold py-1.5 px-2.5 rounded-lg shadow-xs hover:bg-orange-600 flex items-center justify-center gap-1 transition-all cursor-pointer transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75"
                      >
                        <ShoppingCart className="w-3 h-3" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>

                  {/* Details info */}
                  <div className="px-3 pt-2 flex flex-col text-left">
                    <h4 className="text-xs font-bold text-gray-800 leading-tight mb-1 truncate block">
                      {prod.name}
                    </h4>
                    
                    {/* Pricing aligned exactly below title */}
                    <div className="flex items-baseline space-x-1.5 mt-0.5">
                      <span className="text-sm font-black text-black">
                        ${prod.price.toFixed(2)}
                      </span>
                      {prod.originalPrice && (
                        <span className="text-xs text-gray-400 line-through font-normal">
                          ${prod.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
          </div>

          {/* Absolutely positioned slide controls (fully visible outside the clipped shelf) */}
          <button
            type="button"
            onClick={() => handleScroll("left")}
            className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -left-[5px] z-20 w-10 h-10 bg-white border border-[#FF5000]/20 rounded-full items-center justify-center shadow-md hover:bg-gray-50 text-gray-800 hover:text-[#FF5000] hover:border-[#FF5000] hover:shadow-lg transition-all cursor-pointer scale-100 hover:scale-105 active:scale-95"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          
          <button
            type="button"
            onClick={() => handleScroll("right")}
            className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -right-[5px] z-20 w-10 h-10 bg-white border border-[#FF5000]/20 rounded-full items-center justify-center shadow-md hover:bg-gray-50 text-gray-800 hover:text-[#FF5000] hover:border-[#FF5000] hover:shadow-lg transition-all cursor-pointer scale-100 hover:scale-105 active:scale-95"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

      </div>
    </div>
  );
}
