import React, { useState } from "react";
import { Star, ThumbsUp, Send, CheckCircle, Search, Play, X, ShieldAlert, BadgeCheck, HelpCircle, ShieldCheck, RotateCcw, Shield } from "lucide-react";
import { Product } from "../../types";

interface ProductTabsSectionProps {
  product: Product;
}

interface UserReview {
  id: number;
  author: string;
  rating: number;
  date: string;
  comment: string;
  likes: number;
  verified: boolean;
}

export default function ProductTabsSection({ product }: ProductTabsSectionProps) {
  // Tabs: details, specs, reviews, delivery
  const [activeTab, setActiveTab] = useState<"details" | "specs" | "reviews" | "delivery">("details");

  // Sold by Following State
  const [isFollowing, setIsFollowing] = useState(false);

  // VIDEO LIGHTBOX MODAL STATE
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // SPEC FILTER STATE
  const [specSearch, setSpecSearch] = useState("");

  // REVIEWS STATE
  const [reviews, setReviews] = useState<UserReview[]>([
    {
      id: 1,
      author: "Dominic S.",
      rating: 5,
      date: "3 days ago",
      comment: "Superb audio fidelity. The active noise canceling is wizardry. Blocks out typical engine roaring and ambient workspace hum completely.",
      likes: 12,
      verified: true
    },
    {
      id: 2,
      author: "Samantha K.",
      rating: 4,
      date: "1 week ago",
      comment: "Absolutely gorgeous matte finish! Fits perfectly without squeezing my spectacles. The quick attention mode is very useful.",
      likes: 8,
      verified: true
    },
    {
      id: 3,
      author: "Tariq M.",
      rating: 5,
      date: "2 weeks ago",
      comment: "Needly shipping is standard pristine protection. Arrived in standard double-walled Needs Shield cardboard with air cushions.",
      likes: 5,
      verified: true
    }
  ]);

  // REVIEW FORM STATE
  const [newAuthor, setNewAuthor] = useState("");
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  const specifications = [
    { label: "Design Series", value: "Sony WH Series Signature Edition" },
    { label: "Primary Materials", value: "Enriched Aerospace Polycarbonate, Soft Leatherette Cushioning" },
    { label: "Connectivity", value: "Bluetooth v5.2, Low Latency Audio Codecs, USB-C Charging" },
    { label: "Frequencies Response", value: "4Hz - 40,000Hz Ultra High-Res Audio" },
    { label: "Battery Performance", value: "Up to 30 Hours with ANC On, Fast 10-Min Charge for 5-Hour Playback" },
    { label: "Weight", value: "250 grams lightweight frame" },
    { label: "Noise Cancelling Processor", value: "Dedicated Integrated Processor V1, HD Noise Cancelling QN1" },
    { label: "Box Contents", value: "Carrying Case, 1.2m Connection Cable, USB-C Cable, Quick Setup Manual" }
  ];

  // Filters logic
  const filteredSpecs = specifications.filter(spec => 
    spec.label.toLowerCase().includes(specSearch.toLowerCase()) ||
    spec.value.toLowerCase().includes(specSearch.toLowerCase())
  );

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    setReviews(prev => [
      {
        id: Date.now(),
        author: newAuthor,
        rating: newRating,
        date: "Just now",
        comment: newComment,
        likes: 0,
        verified: true
      },
      ...prev
    ]);
    setNewAuthor("");
    setNewComment("");
    setNewRating(5);
    setIsSubmitSuccess(true);
    setTimeout(() => setIsSubmitSuccess(false), 3000);
  };

  const handleLike = (id: number) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, likes: r.likes + 1 } : r));
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-stretch text-left" id="product-bottom-split-section">
      
      {/* LEFT COLUMN: Sold by & Store Guarantees */}
      <div className="w-full lg:w-[28%] shrink-0 flex flex-col justify-between bg-white border border-zinc-200/60 rounded-3xl p-6 sm:p-7 shadow-3xs space-y-6">
        <div className="space-y-6">
          {/* Sold by header */}
          <div>
            <h3 className="text-sm font-bold text-zinc-900 tracking-tight">Sold by</h3>
            
            {/* Store brand metadata info */}
            <div className="flex items-center justify-between gap-2 mt-4">
              <div className="flex items-center gap-3">
                {/* Store logo wrapper */}
                <div className="w-12 h-12 rounded-xl bg-[#FFF1EB] flex items-center justify-center border border-[#FFE3D5] shrink-0">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#EE4D30] fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 20V9a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v11" />
                    <circle cx="12" cy="11" r="2.5" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h4 className="text-xs font-bold text-zinc-950 leading-tight">Needly Official Store</h4>
                    <span className="bg-[#E2F1FF] text-[#007AFF] text-[9px] font-bold px-2 py-0.5 rounded-full leading-none scale-90 origin-left">
                      Official
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-1">98% Positive Seller Ratings</p>
                  <p className="text-[11px] text-zinc-500">1.2M Followers</p>
                </div>
              </div>
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`py-1.5 px-4 rounded-xl text-xs font-semibold tracking-tight border cursor-pointer transition-all ${
                  isFollowing
                    ? "bg-[#EE4D30] text-white border-[#EE4D30] hover:bg-[#d64125]"
                    : "bg-white text-[#EE4D30] border-[#EE4D30] hover:bg-orange-50/50"
                }`}
              >
                {isFollowing ? "Following" : "Follow"}
              </button>
            </div>
          </div>

          <div className="border-t border-zinc-100 pt-5">
            <h4 className="text-sm font-bold text-zinc-900 tracking-tight mb-4">Store Guarantees</h4>
            
            <div className="space-y-4">
              {/* Guarantee 1 */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-zinc-50 border border-zinc-100 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4.5 h-4.5 text-zinc-900" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-zinc-900">Secure Payment</h5>
                  <p className="text-[11px] text-zinc-500 mt-0.5">100% secure payment</p>
                </div>
              </div>

              {/* Guarantee 2 */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-zinc-50 border border-zinc-100 flex items-center justify-center shrink-0">
                  <RotateCcw className="w-4 h-4 text-zinc-900" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-zinc-900">Easy Returns</h5>
                  <p className="text-[11px] text-zinc-500 mt-0.5">30-day return policy</p>
                </div>
              </div>

              {/* Guarantee 3 */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-zinc-50 border border-zinc-100 flex items-center justify-center shrink-0">
                  <Shield className="w-4.5 h-4.5 text-zinc-900" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-zinc-900">Buyer Protection</h5>
                  <p className="text-[11px] text-zinc-500 mt-0.5">Get your money back</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-zinc-100">
          <button
            onClick={() => alert("Learn more about our secure storage, prompt shipping, and 30-day satisfaction guarantees.")}
            className="text-xs font-bold text-[#EE4D30] hover:text-[#d64125] transition-colors inline-flex items-center gap-1 cursor-pointer"
          >
            <span>View More</span>
            <span className="text-[10px]">&gt;</span>
          </button>
        </div>
      </div>

      {/* RIGHT CONTENT PANEL: Interactive Custom Tab Switcher */}
      <div className="flex-1 bg-white border border-zinc-200/60 rounded-3xl shadow-3xs overflow-hidden flex flex-col justify-between">
        
        {/* Tab Headers Row */}
        <div className="flex border-b border-zinc-150 px-6 sm:px-8 bg-white overflow-x-auto whitespace-nowrap" id="gallery-tabs-headers">
          {(["details", "specs", "reviews", "delivery"] as const).map((tab) => {
            const isActive = activeTab === tab;
            let tabLabel = "Product Details";
            if (tab === "specs") tabLabel = "Specifications";
            if (tab === "reviews") tabLabel = `Reviews (${product.id === "sony-wh1000xm5" ? "1,256" : reviews.length})`;
            if (tab === "delivery") tabLabel = "Shipping & Returns";

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 text-sm font-sans font-bold tracking-tight relative transition-all cursor-pointer mr-8 ${
                  isActive ? "text-[#EE4D30]" : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                {tabLabel}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#EE4D30] rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Canvas */}
        <div className="p-6 sm:p-8 flex-1">
          
          {/* TAB 1: PRODUCT DETAILS WITH FEATURE VIDEO */}
          {activeTab === "details" && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start animate-fade-in font-sans">
              
              {/* Left Column: Slogan Intro and Bullets */}
              <div className="md:col-span-7 space-y-4 text-sm leading-relaxed text-zinc-600">
                <p className="text-zinc-600 leading-normal">
                  {product.id === "sony-wh1000xm5" 
                    ? "Industry-leading noise canceling, exceptional sound quality, and super comfortable design. The Sony WH-1000XM5 headphones take your listening experience to the next level." 
                    : "Premium class product designed carefully with durable materials, high-density performance layers, and elegant tactile physical triggers to deliver exceptional user feedback."}
                </p>
                
                {/* Visual Highlights Bullet Grid */}
                <ul className="space-y-3 list-disc pl-5 mt-4 text-zinc-600">
                  <li>
                    <span className="font-semibold text-zinc-900">Dual Noise Sensor Technology</span> with Integrated Processor V1
                  </li>
                  <li>
                    <span className="font-semibold text-zinc-900">30-hour battery life</span> with Quick Charge
                  </li>
                  <li>
                    <span className="font-semibold text-zinc-900">Crystal clear</span> hands-free calling
                  </li>
                  <li>
                    <span className="font-semibold text-zinc-900">Speak-to-Chat</span> pauses music automatically
                  </li>
                  <li>
                    <span className="font-semibold text-zinc-900">Multipoint connection</span> for two devices
                  </li>
                  <li>
                    <span className="font-semibold text-zinc-900">Lightweight</span> and foldable design
                  </li>
                </ul>
              </div>

              {/* Right Column: Video Preview Cover Container */}
              <div className="md:col-span-5">
                <div 
                  onClick={() => setIsVideoOpen(true)}
                  className="relative aspect-[1.6/1] w-full bg-zinc-950 border border-zinc-200/50 rounded-3xl overflow-hidden cursor-pointer group shadow-sm select-none"
                  id="tab-video-cover-container"
                >
                  <img
                    src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80"
                    alt="Sony WH-1000XM5 headphone video tour"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 rounded-3xl opacity-90 shadow-inner"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all rounded-3xl" />
                  
                  {/* Center stage Play button block matching screenshot perfectly */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5">
                    <div className="w-14 h-14 rounded-full bg-black/75 backdrop-blur-3xs border border-white/25 flex items-center justify-center text-white transition-all duration-300 shadow-md group-hover:scale-110">
                      <Play className="w-5 h-5 fill-white stroke-white ml-0.5" />
                    </div>
                    <span className="text-white text-xs sm:text-sm font-bold font-sans tracking-tight drop-shadow-md select-none bg-black/40 px-3.5 py-1 rounded-full backdrop-blur-3xs">
                      Play Video
                    </span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: TECH SPECIFICATIONS TABLE WITH FILTER SEARCH BAR */}
          {activeTab === "specs" && (
            <div className="space-y-4 animate-fade-in font-mono">
              <div className="relative">
                <span className="absolute left-3 top-3 text-zinc-400">
                  <Search className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  placeholder="Filter parameters inside specifications... (e.g., Weight, Battery)"
                  value={specSearch}
                  onChange={(e) => setSpecSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs outline-hidden focus:bg-white focus:border-zinc-950 transition-colors placeholder:text-zinc-400"
                />
              </div>

              {filteredSpecs.length > 0 ? (
                <div className="divide-y divide-zinc-100 text-xs">
                  {filteredSpecs.map((spec, idx) => (
                    <div key={idx} className="grid grid-cols-1 md:grid-cols-3 py-3 gap-2">
                      <span className="text-[#EE4D30] font-black uppercase text-[10px] tracking-wider md:col-span-1">
                        {spec.label}
                      </span>
                      <span className="text-zinc-900 font-bold md:col-span-2">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-zinc-400 py-4 text-center">
                  No specifications matched search string "{specSearch}"
                </p>
              )}
            </div>
          )}

          {/* TAB 3: VERIFIED REVIEWS PANEL */}
          {activeTab === "reviews" && (
            <div className="space-y-6 animate-fade-in">
              
              {/* Score aggregate banner */}
              <div className="bg-zinc-50 rounded-2xl p-5 border border-zinc-100 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h4 className="text-xs font-mono font-black text-zinc-400 uppercase tracking-widest leading-none">
                    Certified Aggregate Score
                  </h4>
                  <div className="flex items-baseline space-x-2 mt-2">
                    <span className="text-4xl font-black text-zinc-950">4.8</span>
                    <span className="text-sm font-bold text-zinc-400 font-mono">/ 5.0 base</span>
                  </div>
                  <div className="flex items-center text-amber-400 mt-1.5 space-x-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                <div className="text-center md:text-right text-xs text-zinc-500 max-w-xs leading-relaxed">
                  Every user feedback contains cryptographically signed identifiers verified directly by Needly backend purchase queues.
                </div>
              </div>

              {/* Reviews Stack & Fast submission feedback */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                
                {/* List portion */}
                <div className="lg:col-span-3 space-y-4">
                  {reviews.map((rev) => (
                    <div key={rev.id} className="border border-zinc-150 p-4.5 rounded-xl space-y-2">
                      <div className="flex justify-between items-start text-xs font-mono">
                        <div>
                          <span className="font-extrabold text-zinc-900 mr-2">{rev.author}</span>
                          {rev.verified && (
                            <span className="text-[9px] font-black tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 px-1.5 py-0.2 rounded uppercase inline-block">
                              Verified
                            </span>
                          )}
                        </div>
                        <span className="text-zinc-400 text-[10px]">{rev.date}</span>
                      </div>

                      <div className="flex items-center text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3 h-3 ${i < rev.rating ? "fill-current" : "text-zinc-250"}`} 
                          />
                        ))}
                      </div>

                      <p className="text-xs text-zinc-650 leading-relaxed italic">
                        "{rev.comment}"
                      </p>

                      <div className="flex items-center space-x-3 pt-2 text-[10px] font-mono text-zinc-400">
                        <button 
                          onClick={() => handleLike(rev.id)}
                          className="flex items-center gap-1 hover:text-zinc-950 transition-colors cursor-pointer"
                        >
                          <ThumbsUp className="w-3 h-3 text-emerald-600" />
                          <span>Helpful ({rev.likes})</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Fast feedback write box */}
                <div className="lg:col-span-2 bg-zinc-50 p-4 rounded-xl border border-zinc-200/50 h-fit space-y-4 text-xs">
                  <h5 className="font-mono font-black text-zinc-900 uppercase tracking-widest flex items-center gap-1.5">
                    <span>Write Feedback</span>
                  </h5>

                  {isSubmitSuccess ? (
                    <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl text-center font-mono font-bold space-y-1.5 border border-emerald-200">
                      <CheckCircle className="w-6 h-6 text-emerald-600 mx-auto" />
                      <p className="font-extrabold">Review Published!</p>
                      <p className="font-medium text-[10px] opacity-80">Feedback logged securely to global product stream.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleAddReview} className="space-y-3 font-mono">
                      <div>
                        <label className="block text-zinc-500 mb-1 font-bold">NAME:</label>
                        <input
                          type="text"
                          required
                          value={newAuthor}
                          onChange={(e) => setNewAuthor(e.target.value)}
                          placeholder="William Wallace"
                          className="w-full p-2 bg-white border border-zinc-200 rounded-lg text-xs outline-hidden focus:border-zinc-900"
                        />
                      </div>

                      <div>
                        <label className="block text-zinc-500 mb-1 font-bold">STARS:</label>
                        <select
                          value={newRating}
                          onChange={(e) => setNewRating(Number(e.target.value))}
                          className="w-full p-2 bg-white border border-zinc-200 rounded-lg text-xs outline-hidden focus:border-zinc-900"
                        >
                          <option value="5">★★★★★ Exceptional (5/5)</option>
                          <option value="4">★★★★☆ Solid Build (4/5)</option>
                          <option value="3">★★★☆☆ Satisfied Performance (3/5)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-zinc-500 mb-1 font-bold">COMMENT:</label>
                        <textarea
                          required
                          rows={3}
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Your audio impressions..."
                          className="w-full p-2 bg-white border border-zinc-200 rounded-lg text-xs outline-hidden focus:border-zinc-900 font-sans"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-zinc-950 hover:bg-zinc-850 text-white font-bold py-2 rounded-lg transition-colors cursor-pointer uppercase text-[10px] tracking-widest"
                      >
                        Publish Review
                      </button>
                    </form>
                  )}
                </div>

              </div>

            </div>
          )}

          {/* TAB 4: SHIPPINGS AND RETURNS */}
          {activeTab === "delivery" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-zinc-650 leading-relaxed font-sans animate-fade-in">
              <div className="space-y-2 border border-zinc-150 p-4.5 rounded-xl bg-zinc-50/50">
                <h4 className="text-zinc-900 font-extrabold uppercase font-mono tracking-wider flex items-center gap-1.5">
                  <span className="text-[#EE4D30]">✈</span>
                  <span>PRECISE FREIGHT DELIVERY</span>
                </h4>
                <p className="text-zinc-500 text-[11px]">
                  All high-value electronics parcels are shipped within specialized shockproof <strong>Needs Shield</strong> cases. This eliminates friction and static hazards. Shipping is entirely free on catalog checkouts above $50.
                </p>
                <p className="text-zinc-500 text-[11px]">
                  Expect standard regional deliveries in 2-4 business days. Priority air overnight routes can be selected during shipping configurations.
                </p>
              </div>

              <div className="space-y-2 border border-zinc-150 p-4.5 rounded-xl bg-zinc-50/50">
                <h4 className="text-zinc-900 font-extrabold uppercase font-mono tracking-wider flex items-center gap-1.5">
                  <span className="text-[#EE4D30]">↺</span>
                  <span>HASSLE-FREE RETURNS</span>
                </h4>
                <p className="text-zinc-500 text-[11px]">
                  Not satisfied with the tactile grip or baseline frequencies response? Register feedback correspondences inside 30 days of shipment receipt to trigger full money back guarantee or equivalent voucher reserves.
                </p>
                <p className="text-zinc-500 text-[11px]">
                  Returned products should sustain original serial scanner tags intact and include official pouch items. Needly provides pre-paid shipping labels inside return correspondences.
                </p>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* 11. VIDEO BOX LIGHTBOX OVERLAY PLAYER */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md">
          {/* Close click zone */}
          <div onClick={() => setIsVideoOpen(false)} className="absolute inset-0 cursor-pointer" />
          
          <div className="relative w-full max-w-4xl aspect-video bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl border border-zinc-800 z-10 m-4">
            
            {/* Close Button top corner */}
            <button 
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 text-white hover:bg-black border border-white/10 flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Video preview iframe representing high quality product showcase */}
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/S_gS8SOfxU0?autoplay=1"
              title="Sony WH-1000XM5 Premium Noise Canceling Headphones Review"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      )}

    </div>
  );
}
