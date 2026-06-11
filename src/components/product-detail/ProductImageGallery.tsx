import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Heart, Share2, Sparkles, Check, ZoomIn, ZoomOut, X, Maximize2 } from "lucide-react";
import { Product } from "../../types";

interface ProductImageGalleryProps {
  product: Product;
  discountPercent: number;
  selectedColor?: string;
}

export default function ProductImageGallery({ product, discountPercent, selectedColor }: ProductImageGalleryProps) {
  // Let's create an excellent image stack of the Sony WH-1000XM5 from different angles as depicted!
  // If another product is selected, we fall back to its own main image but simulate beautiful angles based on its category
  const [activeIdx, setActiveIdx] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);

  // Dynamic image stack based on selected color option to keep experience extremely authentic
  const getImageStack = () => {
    if (product.id === "sony-wh1000xm5") {
      if (selectedColor === "Cream/Silver") {
        return [
          "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop&q=80", // silver angle
          "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?w=600&auto=format&fit=crop&q=80", // silver front
          "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&auto=format&fit=crop&q=80", // studio desk
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80", // accessories match
          "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?w=300&auto=format&fit=crop&q=80", // carry pouch
          "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&auto=format&fit=crop&q=80", // cream ambient
          "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=600&auto=format&fit=crop&q=80", // white headphones
          "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&auto=format&fit=crop&q=80", // silver desk decor
          "https://images.unsplash.com/photo-1496181130204-755241524eab?w=600&auto=format&fit=crop&q=80"  // cream aesthetic desk
        ];
      }
      if (selectedColor === "Dark Blue") {
        return [
          "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=600&auto=format&fit=crop&q=80", // navy front
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80", // navy angle
          "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80", // dark ambient
          "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&auto=format&fit=crop&q=80", // studio desk
          "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?w=300&auto=format&fit=crop&q=80", // carry pouch
          "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&auto=format&fit=crop&q=80", // blue aesthetic
          "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=600&auto=format&fit=crop&q=80", // ambient neon blue
          "https://images.unsplash.com/photo-1516280440614-37939bbacd6a?w=600&auto=format&fit=crop&q=80"  // blue music setup
        ];
      }
      // Default / Black
      return [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80", // Black headphones hero
        "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80", // side angle
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&auto=format&fit=crop&q=80", // angle view on wood
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&auto=format&fit=crop&q=80", // studio microphone setup
        "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?w=300&auto=format&fit=crop&q=80", // premium accessory pouch
        "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&auto=format&fit=crop&q=80", // studio black keyboard
        "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=600&auto=format&fit=crop&q=80", // dark theme music
        "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=600&auto=format&fit=crop&q=80", // stylish overhead focus
        "https://images.unsplash.com/photo-1516280440614-37939bbacd6a?w=600&auto=format&fit=crop&q=80"  // dark bokeh background
      ];
    }

    // Generic fallbacks for other accessories
    return [
      product.imageUrl,
      product.imageUrl + "&q=80&fit=crop&crop=faces",
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?w=300&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&auto=format&fit=crop&q=80"
    ];
  };

  const images = getImageStack();

  // Reset index when color choice updates
  useEffect(() => {
    setActiveIdx(0);
    setShowAllImages(false);
  }, [selectedColor, product.id]);

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  const [wishlisted, setWishlisted] = useState(false);
  const [shared, setShared] = useState(false);

  // Zoom states
  const [zoomOpen, setZoomOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (zoomScale === 1) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  // Render subset of images initially, otherwise all of them
  const renderedThumbnails = showAllImages ? images : images.slice(0, 4);

  return (
    <div className="flex flex-col gap-6" id="product-detail-gallery-container flex-initial">
      
      {/* 2-Column Gallery Layout matching screenshot exactly: Vertical list + Large image */}
      <div className="flex gap-4 items-stretch">
        
        {/* Left column: Vertical Thumbnails list stack */}
        <div className="relative shrink-0 w-16 sm:w-20" id="gallery-vertical-thumbnails-wrapper">
          <div 
            className="absolute inset-0 flex flex-col gap-3 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-300 [&::-webkit-scrollbar-thumb]:rounded-full" 
            id="gallery-vertical-thumbnails"
          >
            {renderedThumbnails.map((img, index) => {
              const isSelected = activeIdx === index;
              return (
                <button
                  key={index}
                  onClick={() => setActiveIdx(index)}
                  className={`relative aspect-square rounded-xl p-1 bg-white border cursor-pointer overflow-hidden transition-all duration-200 flex items-center justify-center shrink-0 ${
                    isSelected 
                      ? "border-[#EE4D30] border-2 shadow-2xs" 
                      : "border-zinc-200 hover:border-zinc-450"
                  }`}
                  style={{ contentVisibility: "auto" }}
                >
                  <img 
                    src={img} 
                    alt="" 
                    className="max-h-full max-w-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </button>
              );
            })}

            {/* Dynamic "+ X More" tile displayed initially if not showing all. Sets state to show all images and enable scrolling. */}
            {!showAllImages && images.length > 4 && (
              <button 
                onClick={() => setShowAllImages(true)}
                className="aspect-square rounded-xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 flex flex-col items-center justify-center cursor-pointer text-zinc-500 transition-colors shrink-0"
              >
                <span className="text-[10px] sm:text-xs font-bold font-sans text-zinc-650">+ {images.length - 4} More</span>
              </button>
            )}
          </div>
        </div>

        {/* Right column: Large display box with arrows and badge overlays */}
        <div className="flex-1 bg-[#F5F5F5] border border-zinc-200/50 rounded-3xl relative aspect-[14/13] sm:aspect-square p-4 flex items-center justify-center overflow-hidden group">
          
          {/* Discount Badge top-left: round style from screenshot */}
          {discountPercent > 0 && (
            <div className="absolute top-4 left-4 bg-[#EE4D30] text-white text-xs font-bold px-3 py-1 rounded-lg shadow-sm z-10 flex items-center gap-1">
              <span>-{discountPercent}%</span>
            </div>
          )}

          {/* Top-Right Control Actions circle overlays */}
          <div className="absolute top-4 right-4 flex gap-2 z-10">
            {/* Outline Circle Wishlist button */}
            <button
              onClick={() => setWishlisted(!wishlisted)}
              className={`w-10 h-10 rounded-full flex items-center justify-center border border-zinc-200 shadow-3xs bg-white hover:bg-zinc-50 transition-colors cursor-pointer ${
                wishlisted ? "text-[#EE4D30]" : "text-zinc-650"
              }`}
              title="Add to Wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlisted ? "fill-current" : ""}`} />
            </button>

            {/* Outlined Circle Share button */}
            <button
              onClick={() => {
                setShared(true);
                setTimeout(() => setShared(false), 2000);
              }}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-zinc-200 shadow-3xs bg-white hover:bg-zinc-50 transition-colors cursor-pointer text-zinc-650"
              title="Share"
            >
              {shared ? (
                <span className="text-[10px] font-bold text-emerald-600 font-mono">Sent!</span>
              ) : (
                <Share2 className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Left Arrow hover Chevrons */}
          <button
            onClick={handlePrev}
            className="absolute left-3 w-8 h-8 rounded-full border border-zinc-200 bg-white/90 shadow-sm hover:bg-white flex items-center justify-center text-zinc-700 transition-all cursor-pointer z-10 opacity-0 group-hover:opacity-100"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Main big presentation preview headphone */}
          <img
            src={images[activeIdx]}
            alt={product.name}
            onClick={() => {
              setZoomScale(1);
              setZoomOpen(true);
            }}
            className="w-full h-full object-cover rounded-2xl select-none cursor-zoom-in transition-transform duration-500 hover:scale-[1.01]"
            referrerPolicy="no-referrer"
            id="gallery-main-viewport-img"
          />

          {/* Right Arrow hover Chevrons */}
          <button
            onClick={handleNext}
            className="absolute right-3 w-8 h-8 rounded-full border border-zinc-200 bg-white/95 shadow-3xs hover:bg-zinc-100 flex items-center justify-center text-zinc-700 transition-all cursor-pointer z-10 animate-pulse-subtle"
            aria-label="Next Image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Floating Zoom Button */}
          <button
            onClick={() => {
              setZoomScale(1);
              setZoomOpen(true);
            }}
            className="absolute bottom-4 right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border border-zinc-200 shadow-sm bg-white hover:bg-zinc-50 hover:scale-105 active:scale-95 transition-all cursor-pointer text-zinc-700 z-10"
            title="Zoom Image"
            id="gallery-zoom-trigger-btn"
          >
            <ZoomIn className="w-5 h-5 text-zinc-600" />
          </button>
        </div>
      </div>

      {/* Trust guarantees bar exactly matching layout of the screenshot directly below image */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white border border-zinc-200 rounded-2xl p-4 text-left" id="image-underband-ratings">
        <div className="flex items-center gap-3">
          <div className="text-zinc-900 shrink-0">
            <Check className="w-6 h-6 stroke-[1.5]" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-zinc-900 leading-none">100% Original</h4>
            <p className="text-[10px] text-zinc-500 mt-1 leading-none font-medium">Guarantee</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-zinc-900 shrink-0">
            <svg 
              className="w-6 h-6 text-zinc-900" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.75A1.5 1.5 0 012.25 17.25V5.25A1.5 1.5 0 013.75 3.75h14.25A1.5 1.5 0 0119.5 5.25v2.25m-9 11.25a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.75" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75a1.5 1.5 0 11-3 01.5 1.5 0 013 0zm0 0h3.75a1.5 1.5 0 001.5-1.5V11.25M15 4.5v10.5m-5.25-10.5h10.5" />
            </svg>
          </div>
          <div>
            <h4 className="text-xs font-bold text-zinc-900 leading-none">Free Delivery</h4>
            <p className="text-[10px] text-zinc-500 mt-1 leading-none font-medium font-sans">on orders over $50</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-zinc-900 shrink-0">
            <svg 
              className="w-6 h-6 text-zinc-900" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </div>
          <div>
            <h4 className="text-xs font-bold text-zinc-900 leading-none">30 Days Return</h4>
            <p className="text-[10px] text-zinc-500 mt-1 leading-none font-medium">No hassle returns</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-zinc-900 shrink-0">
            <svg 
              className="w-6 h-6 text-zinc-900" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 1 1 .517.517l-.02.041m-3.018.069a6.002 6.002 0 1 1 10.124-1.253m-10.124 1.253a6.002 6.002 0 0 0 10.124-1.253M9.75 8.25l.042-.02a.75.75 0 1 1 .516.516l-.02.042m-3.017.069a6.002 6.002 0 1 1 10.124-1.253m-10.124 1.253a6.002 6.002 0 0 0 10.124-1.253" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          <div>
            <h4 className="text-xs font-bold text-zinc-900 leading-none">Secure Payment</h4>
            <p className="text-[10px] text-zinc-500 mt-1 leading-none font-medium">100% protected</p>
          </div>
        </div>
      </div>

      {/* Interactive Magnifying Glass Lightbox Modal */}
      {zoomOpen && (
        <div 
          className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex flex-col justify-between p-4 md:p-6 animate-fade-in"
          id="gallery-zoom-overlay-modal"
          onClick={() => setZoomOpen(false)}
        >
          {/* Top Navigation Row */}
          <div 
            className="flex items-center justify-between text-white w-full max-w-6xl mx-auto py-2 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <span className="text-xs font-mono text-zinc-400">Interactive Gallery Zoom</span>
              <h3 className="text-sm font-bold text-zinc-100">{product.name}</h3>
            </div>
            
            {/* Inline controls of Magnifier and Scale */}
            <div className="flex items-center gap-3 bg-zinc-900/85 border border-zinc-800 px-4 py-2 rounded-full shadow-lg">
              <button
                onClick={() => setZoomScale(s => Math.max(1, s - 0.5))}
                disabled={zoomScale <= 1}
                className="text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <span className="text-xs font-bold font-mono text-zinc-300 min-w-[32px] text-center select-none">
                {zoomScale.toFixed(1)}x
              </span>
              <button
                onClick={() => setZoomScale(s => Math.min(3.5, s + 0.5))}
                disabled={zoomScale >= 3.5}
                className="text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <div className="w-px h-4 bg-zinc-800" />
              <button
                onClick={() => {
                  setZoomScale(1);
                  setZoomOpen(false);
                }}
                className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
                title="Close Zoom View"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Large image active display center stage */}
          <div 
            className="flex-1 flex items-center justify-center relative w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev image button */}
            <button
              onClick={() => {
                setZoomScale(1);
                handlePrev();
              }}
              className="absolute left-4 w-12 h-12 rounded-full bg-zinc-900/70 hover:bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white transition-all cursor-pointer z-10 hover:scale-105 active:scale-95"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Click to zoom viewport area with interactive lens effect */}
            <div 
              className="w-full h-full max-w-4xl max-h-[70vh] flex items-center justify-center overflow-hidden relative"
              onMouseMove={handleMouseMove}
              onClick={() => setZoomScale(prev => prev > 1 ? 1 : 2.5)}
              style={{ cursor: zoomScale > 1 ? "zoom-out" : "zoom-in" }}
            >
              <img
                src={images[activeIdx]}
                alt={product.name}
                className="max-h-full max-w-full object-contain select-none transition-transform duration-200 ease-out rounded-xl"
                style={{
                  transform: `scale(${zoomScale})`,
                  transformOrigin: `${mousePos.x}% ${mousePos.y}%`
                }}
                referrerPolicy="no-referrer"
              />
              
              {zoomScale === 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/75 backdrop-blur-xs px-4 py-1.5 rounded-full text-[11px] text-zinc-300 pointer-events-none font-medium flex items-center gap-2 border border-zinc-800 shadow-xl">
                  <Maximize2 className="w-3.5 h-3.5 text-zinc-400 animate-pulse" />
                  <span>Click image to zoom & hover to pan textures</span>
                </div>
              )}
            </div>

            {/* Next image button */}
            <button
              onClick={() => {
                setZoomScale(1);
                handleNext();
              }}
              className="absolute right-4 w-12 h-12 rounded-full bg-zinc-900/70 hover:bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white transition-all cursor-pointer z-10 hover:scale-105 active:scale-95"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Lower track selection of thumbnails inside lightbox */}
          <div 
            className="w-full max-w-4xl mx-auto flex flex-col gap-2.5 items-center py-2 shrink-0 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold font-mono">
              Angles Selection ({activeIdx + 1}/{images.length})
            </p>
            <div 
              className="flex gap-2.5 overflow-x-auto max-w-full p-2 scrollbar-none animate-fade-in"
              id="zoom-modal-thumbnails-track"
            >
              {images.map((img, index) => {
                const isSelected = activeIdx === index;
                return (
                  <button
                    key={index}
                    onClick={() => {
                      setZoomScale(1);
                      setActiveIdx(index);
                    }}
                    className={`relative w-12 h-12 rounded-lg p-0.5 bg-zinc-900 border cursor-pointer overflow-hidden transition-all duration-200 flex items-center justify-center shrink-0 ${
                      isSelected 
                        ? "border-[#EE4D30] border-2 shadow-sm" 
                        : "border-zinc-800 hover:border-zinc-650"
                    }`}
                  >
                    <img 
                      src={img} 
                      alt="" 
                      className="max-h-full max-w-full object-contain rounded-md"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
