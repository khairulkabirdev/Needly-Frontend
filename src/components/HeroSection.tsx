import React, { useState, useEffect } from "react";
import { 
  Laptop, 
  Smartphone, 
  Cpu, 
  Home, 
  Shirt, 
  Sparkles, 
  Bike, 
  Gamepad, 
  Car, 
  Watch, 
  Wrench, 
  Baby, 
  ChevronRight, 
  ChevronLeft,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Headphones,
  Lock,
  Sparkle,
  Menu,
  MapPin
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ALL_SIDEBAR_CATEGORIES } from "../data";
import heroImage from "../assets/images/needly_hero_render_1781009154955.png";
import coinImage from "../assets/images/needly_coins_1781009176738.png";
import appImage from "../assets/images/needly_app_1781009202107.png";

interface HeroSectionProps {
  onCategorySelect: (catId: string) => void;
  selectedCategory: string;
  onOpenAuth: () => void;
  activeNavTab: string;
  setActiveNavTab: (tab: string) => void;
}

const SLIDES = [
  {
    id: 0,
    badge: "Needly Choice",
    title: "Better Shopping",
    subtitle: "Better Living",
    description: "Discover premium utility items, active tech and essential accessories at unbeatable rates. Designed for your everyday convenience.",
    image: heroImage,
    btnText: "Shop Catalog",
    badgeColor: "bg-orange-50 text-orange-700 border-orange-100",
    themeClass: "from-[#FFF9F6] via-[#FFFAF8] to-white border-[#FFEFE5]",
    pulseColor: "bg-orange-500",
    buttonClass: "bg-orange-600 hover:bg-orange-750 shadow-orange-500/10 text-white"
  },
  {
    id: 1,
    badge: "Member Loyalty V4",
    title: "Needly Coins",
    subtitle: "Collect Rewards",
    description: "Accumulate authentic digital reward tokens with each checkout to redeem custom tactile hardware goodies or prioritize order dispatch queues.",
    image: coinImage,
    btnText: "View Coins Balance",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-100",
    themeClass: "from-[#FDFBF7] via-[#FAF6EE] to-white border-[#F4EEDF]",
    pulseColor: "bg-amber-500",
    buttonClass: "bg-amber-700 hover:bg-amber-800 shadow-amber-500/10 text-white"
  },
  {
    id: 2,
    badge: "Official Companion",
    title: "Unrivaled Portability",
    subtitle: "Needly Mobile App",
    description: "Monitor status logs, receive secure localized order codes directly, and chat instantly with our priority correspondence desk from any device.",
    image: appImage,
    btnText: "Launch Web Wrapper",
    badgeColor: "bg-teal-50 text-teal-800 border-teal-100",
    themeClass: "from-[#F7FCFB] via-[#F2FAF8] to-white border-[#E0F2EE]",
    pulseColor: "bg-teal-500",
    buttonClass: "bg-teal-700 hover:bg-teal-850 shadow-teal-500/10 text-white"
  }
];

export default function HeroSection({ 
  onCategorySelect, 
  selectedCategory, 
  onOpenAuth,
  activeNavTab,
  setActiveNavTab
}: HeroSectionProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [userLocation, setUserLocation] = useState(() => {
    try {
      return localStorage.getItem("needly_user_location") || "New York, USA";
    } catch (_) {
      return "New York, USA";
    }
  });
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [tempLocation, setTempLocation] = useState(userLocation);

  const handleSaveLocation = (loc: string) => {
    const trimmed = loc.trim();
    if (trimmed) {
      setUserLocation(trimmed);
      try {
        localStorage.setItem("needly_user_location", trimmed);
      } catch (_) {}
    }
    setIsLocationDropdownOpen(false);
  };

  // Autoplay slider logic
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveSlide((prev) => (prev + 1) % SLIDES.length);
  };

  // Map icon strings to Lucide components
  const getIcon = (iconName: string) => {
    const cls = "w-4 h-4 stroke-[1.5]";
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

  const currentSlideData = SLIDES[activeSlide];

  const navLinks = [
    { id: "deals", label: "Super Deals", hot: true },
    { id: "arrivals", label: "New Arrivals", hot: false },
    { id: "brands", label: "Top Brands", hot: false },
    { id: "choice", label: "Needly Choice", hot: false },
    { id: "save", label: "Big Save", hot: false },
    { id: "essentials", label: "Home Essentials", hot: false },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-4 font-sans" id="hero-grid-section">
      {/* 3. Dropdowns & Link list Menu Inside HeroSection wrapper */}
      <div className="w-full mb-4" id="sub-navigation-menu-hero">
        <div className="flex items-center">
          
          {/* Side menu active label - styled with same rounded and bg style as Categories/Sidebar */}
          <div className="w-64 hidden lg:flex items-center space-x-2 px-4 py-2.5 bg-[#FF5000] text-white rounded-xl text-xs font-bold shadow-xs select-none cursor-pointer">
            <Menu className="w-3.5 h-3.5" />
            <span>All Categories</span>
          </div>

          {/* Navigation Links list */}
          <nav className="flex-1 flex items-center justify-start ml-0 lg:ml-8 gap-6 sm:gap-8 text-xs font-bold text-gray-700" id="center-nav-links">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setActiveNavTab(link.id)}
                className={`relative py-1 cursor-pointer transition-colors hover:text-orange-600 ${
                  activeNavTab === link.id ? "text-orange-600 border-b-2 border-orange-500" : "text-gray-700"
                }`}
              >
                <span>{link.label}</span>
                {link.hot && (
                  <span className="absolute -top-3.5 -right-3.5 bg-red-500 text-white text-[8px] px-1 py-0.2 ml-1 rounded-md font-bold uppercase animate-pulse leading-normal scale-85">
                    Hot
                  </span>
                )}
              </button>
            ))}

            {/* Custom User Delivery Location display */}
            <div className="ml-auto relative" id="user-location-info-container">
              <button
                type="button"
                onClick={() => {
                  setTempLocation(userLocation);
                  setIsLocationDropdownOpen(!isLocationDropdownOpen);
                }}
                className="flex items-center space-x-1.5 py-1 text-xs font-bold text-gray-750 hover:text-[#FF5000] transition-all cursor-pointer group"
                id="user-location-btn"
              >
                <MapPin className="w-4 h-4 text-[#FF5000] shrink-0 transition-transform duration-200 group-hover:scale-110" />
                <span className="text-gray-400 font-normal">Deliver to:</span>
                <span className="text-gray-900 font-bold max-w-[120px] truncate">{userLocation}</span>
              </button>

              {isLocationDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40 bg-transparent" 
                    onClick={() => setIsLocationDropdownOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 bg-white border border-orange-100 rounded-2xl shadow-xl p-4 w-72 z-50 animate-fade-in text-left">
                    <h4 className="text-xs font-bold text-gray-950 mb-2">Change Delivery Location</h4>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={tempLocation}
                        onChange={(e) => setTempLocation(e.target.value)}
                        placeholder="e.g. Los Angeles, CA"
                        className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs text-black font-normal outline-none focus:border-[#FF5000] focus:ring-1 focus:ring-[#FF5000]"
                        id="location-input-field"
                      />
                      <button
                        type="button"
                        onClick={() => handleSaveLocation(tempLocation)}
                        className="bg-[#FF5000] hover:bg-orange-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                        id="save-location-btn"
                      >
                        Save
                      </button>
                    </div>
                    <div className="text-[10px] text-gray-400 font-mono mb-2 uppercase tracking-wider">Popular Locations</div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {["New York, USA", "San Francisco, US", "London, UK", "Tokyo, JP", "Berlin, DE", "Toronto, CA"].map((loc) => (
                        <button
                          key={loc}
                          type="button"
                          onClick={() => handleSaveLocation(loc)}
                          className="text-[11px] text-gray-700 hover:bg-orange-50 hover:text-[#FF5000] border border-gray-150 hover:border-orange-100 px-2 py-1 rounded-lg transition-all text-left truncate cursor-pointer font-bold"
                        >
                          {loc}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[16rem_1fr_1fr_15rem] gap-4">
        
        {/* Column 1: Left Categories Sidebar (Hidden on small screens) */}
        <div className="hidden lg:block bg-white border-2 border-[#FF5000]/20 rounded-2xl py-2 px-3 shadow-3xs" id="desktop-sidebar-categories">
          <div className="space-y-0.5">
            {ALL_SIDEBAR_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.name;
              return (
                <button
                  key={cat.id}
                  onClick={() => onCategorySelect(cat.name)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 text-xs rounded-lg transition-all duration-150 cursor-pointer text-left group ${
                    isActive 
                      ? "bg-orange-50/50 text-[#FF5000]" 
                      : "text-gray-700 hover:bg-gray-50 hover:text-[#FF5000]"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className={`transition-colors ${isActive ? "text-[#FF5000]" : "text-black group-hover:text-[#FF5000]"}`}>
                      {getIcon(cat.icon)}
                    </span>
                    <span className={`font-medium transition-colors shrink-0 ${isActive ? "text-[#FF5000] font-semibold" : "text-gray-700 group-hover:text-[#FF5000]"}`}>{cat.name}</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-150 ${isActive ? "text-[#FF5000] transform translate-x-1" : "text-gray-300 group-hover:text-[#FF5000]"}`} />
                </button>
              );
            })}
          </div>
          
          <div className="mt-1.5 pt-1.5 border-t border-gray-100">
            <button 
              onClick={() => onCategorySelect("")}
              className="w-full text-center py-1.5 text-xs font-bold text-gray-800 hover:text-black hover:underline transition-colors cursor-pointer"
            >
              Clear Category Filter ➔
            </button>
          </div>
        </div>

        {/* Column 2 & 3: Interactive Mature Hero Banner Slider */}
        <div 
          className={`lg:col-span-2 relative bg-gradient-to-tr ${currentSlideData.themeClass} border-2 border-[#FF5000]/20 rounded-2xl overflow-hidden p-6 md:p-8 flex flex-col justify-between shadow-xs min-h-[380px] transition-all duration-700 ease-in-out group`}
          id="hero-slider-banner"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          
          {/* Subtle mature grain overlays and lighting widgets */}
          <div className="absolute inset-0 bg-radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops)) from-[#FFFFFF0F] via-transparent to-transparent pointer-events-none" />
          
          {/* Nav arrows visible on hover */}
          <button 
            type="button"
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white border border-gray-200 flex items-center justify-center text-gray-700 shadow-sm z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <button 
            type="button"
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white border border-gray-200 flex items-center justify-center text-gray-700 shadow-sm z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Slide Layout - Animating with motion to make it extremely premium */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeSlide}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 h-full items-center my-auto relative z-10"
            >
              
              {/* Text segment col */}
              <div className="md:col-span-7 flex flex-col justify-center space-y-4">
                <div className="flex items-center space-x-1.5">
                  <span className={`inline-block py-1 px-2.5 rounded-full text-[9px] font-bold tracking-widest uppercase border ${currentSlideData.badgeColor}`}>
                    {currentSlideData.badge}
                  </span>
                  <span className="relative flex h-2 w-2">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${currentSlideData.pulseColor}`} />
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${currentSlideData.pulseColor}`} />
                  </span>
                </div>

                <div className="space-y-1">
                  <h1 className="text-3xl md:text-4xl font-extrabold text-gray-950 tracking-tight leading-none">
                    {currentSlideData.title}
                  </h1>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-700">
                    {currentSlideData.subtitle}
                  </h2>
                </div>

                <p className="text-xs text-gray-500 leading-relaxed font-medium">
                  {currentSlideData.description}
                </p>

                <div className="pt-2">
                  <button 
                    onClick={() => onCategorySelect("")}
                    className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer transform hover:-translate-y-0.5 shadow-sm hover:shadow-md ${currentSlideData.buttonClass}`}
                  >
                    <span>{currentSlideData.btnText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Image segment float col */}
              <div className="md:col-span-5 flex items-center justify-center select-none transform transition-transform duration-500 hover:scale-105 p-2">
                <img 
                  src={currentSlideData.image} 
                  alt={currentSlideData.title} 
                  className="max-h-[220px] object-contain drop-shadow-md pointer-events-none"
                  referrerPolicy="no-referrer"
                />
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Carousel dots navigator */}
          <div className="flex justify-center md:justify-start items-center space-x-2 z-20" id="hero-navigator-dots">
            {SLIDES.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => setActiveSlide(index)}
                className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
                  activeSlide === index ? "w-6 bg-gray-900" : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Column 4: Right widgets Portal portal block */}
        <div className="flex flex-col lg:h-full justify-between gap-2" id="hero-right-portal">
          
          {/* Card 1: Guest Welcome Area */}
          <div className="flex-1 bg-white border-2 border-[#FF5000]/20 rounded-2xl p-4 shadow-3xs flex flex-col items-center justify-center text-center relative overflow-hidden" id="welcome-portal">
            <div className="w-10 h-10 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center mb-2.5">
              <span className="text-lg">👋</span>
            </div>
            <h3 className="text-xs font-extrabold text-gray-950 leading-tight mb-1">
              Welcome to Needly
            </h3>
            <p className="text-[10px] text-gray-400 font-bold mb-3 max-w-[180px] font-mono leading-tight">
              ESTABLISH CORRESPONDENCE
            </p>
            
            <div className="w-full space-y-2">
              <button 
                onClick={onOpenAuth}
                className="w-full py-2 bg-black hover:bg-zinc-900 active:bg-zinc-950 text-white rounded-lg text-xs font-bold transition-all cursor-pointer shadow-sm uppercase font-mono tracking-wider"
              >
                Sign In
              </button>
              <button 
                onClick={onOpenAuth}
                className="w-full py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-lg text-xs font-bold transition-all border border-gray-250 cursor-pointer uppercase font-mono tracking-wider"
              >
                Register
              </button>
            </div>
          </div>

          {/* Card 2: Guarantees checklist */}
          <div className="flex-1 bg-white border-2 border-[#FF5000]/20 rounded-2xl p-4 shadow-3xs flex flex-col justify-center" id="guarantees-checklist">
            
            <div className="space-y-1.5">
              <div className="flex items-start space-x-3 group">
                <div className="p-1.5 bg-gray-50 border border-gray-200 text-gray-900 rounded-lg group-hover:bg-gray-100 transition-all shrink-0">
                  <Lock className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h5 className="text-[11px] font-bold text-gray-900">Secure Payment</h5>
                  <p className="text-[10px] text-gray-400 font-mono">100% SECURE TRANSFERS</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 group">
                <div className="p-1.5 bg-gray-50 border border-gray-200 text-gray-900 rounded-lg group-hover:bg-gray-100 transition-all shrink-0">
                  <RotateCcw className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h5 className="text-[11px] font-bold text-gray-900">Easy Returns</h5>
                  <p className="text-[10px] text-gray-400 font-mono">30-DAY CORRESPONDENCE</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 group">
                <div className="p-1.5 bg-gray-50 border border-gray-200 text-gray-900 rounded-lg group-hover:bg-gray-100 transition-all shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h5 className="text-[11px] font-bold text-gray-900">Buyer Protection</h5>
                  <p className="text-[10px] text-gray-400 font-mono">INSURED SHIPMENTS</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 group">
                <div className="p-1.5 bg-gray-50 border border-gray-200 text-gray-900 rounded-lg group-hover:bg-gray-100 transition-all shrink-0">
                  <Headphones className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h5 className="text-[11px] font-bold text-gray-900">24/7 Support Channel</h5>
                  <p className="text-[10px] text-gray-400 font-mono">PRIORITY TICKET QUEUE</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
