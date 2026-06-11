import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { 
  GooglePlayLogo, 
  AppleLogo, 
  FacebookLogo, 
  InstagramLogo, 
  YoutubeLogo, 
  XLogo 
} from "@phosphor-icons/react";
import { 
  FaCcVisa, 
  FaCcMastercard, 
  FaCcPaypal, 
  FaApplePay, 
  FaGooglePay,
  FaCreditCard
} from "react-icons/fa6";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().length > 3) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="w-full bg-white font-sans" id="needly-main-footer">
      
      {/* 1. Newsletter ribbon banner with red/orange solid style and beautiful 3D gift illustration */}
      <div className="max-w-7xl mx-auto px-4 pt-0 pb-0 mb-0" id="newsletter-bar-container">
        <div className="bg-[#EE4D30] rounded-b-none rounded-t-3xl py-3 px-8  text-white relative overflow-hidden w-full shadow-xs">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center w-full">
            
            {/* Section 1 (col-span-6): Left information layout containing Envelope Icon and text */}
            <div className="col-span-12 lg:col-span-4 flex items-center gap-4 text-left justify-start w-full">
              {/* White outlined Envelope Icon */}
              <div className="w-12 h-12 shrink-0 flex items-center justify-center text-white">
                <EnvelopeIcon className="w-10 h-10 opacity-95" />
              </div>
              
              <div>
                <h3 className="text-md md:text-md font-bold tracking-tight text-white leading-tight">
                  Subscribe to get updates 
                </h3>
                <p className="text-xs md:text-sm text-white/95 font-medium mt-1">
                  Join our newsletter and never miss a deal!
                </p>
              </div>
            </div>

            {/* Section 2 (col-span-5): Center/Subscription form: centered and styled cleanly */}
            <div className="col-span-12 lg:col-span-4 w-full flex items-center justify-center">
              {subscribed ? (
                <div className="bg-white/10 border border-white/20 backdrop-blur-md px-5 py-3 rounded-full flex items-center space-x-2 w-full shadow-inner justify-center">
                  <CheckCircle className="w-5 h-5 text-yellow-300" />
                  <span className="text-sm font-bold tracking-tight text-white">You've successfully subscribed to our list!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex bg-white rounded-full p-1.5 shadow-md w-full">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="px-5 py-2 w-full bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none text-xs md:text-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="px-6 md:px-8 py-2 bg-black hover:bg-black/95 active:scale-[0.98] text-white font-bold text-xs md:text-sm tracking-wide transition-all rounded-full shrink-0 flex items-center justify-center cursor-pointer"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>

            {/* Section 3 (col-span-4): Right illustration containing the absolute-positioned 3D Gift Box emerging from the bottom */}
            <div className="absolute -bottom-3 right-4 lg:right-8 pointer-events-none select-none flex items-end justify-center lg:justify-end">
              <svg className="w-20 h-20 md:w-28 md:h-28 drop-shadow-xl" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Colorful floating confetti particles around the box */}
                <circle cx="35" cy="50" r="3" fill="#FFE082" />
                <path d="M45 125 L49 129" stroke="#80CBC4" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="165" cy="45" r="3" fill="#80CBC4" />
                <circle cx="178" cy="105" r="4" fill="#FFCC80" />
                <circle cx="145" cy="135" r="1.5" fill="#FFFFFF" />
                <path d="M135 65 L139 61" stroke="#FF7043" strokeWidth="2" strokeLinecap="round" />
                
                {/* Box Shadow */}
                <ellipse cx="100" cy="165" rx="52" ry="10" fill="black" fillOpacity="0.12" />
                
                {/* Front-left side of box */}
                <path d="M55 100 L100 118 L100 156 L55 138 Z" fill="#D33512" />
                {/* Front-right side of box */}
                <path d="M100 118 L145 100 L145 138 L100 156 Z" fill="#B2280A" />
                
                {/* Lid side left */}
                <path d="M52 90 L100 109 L100 118 L52 99 Z" fill="#E64522" />
                {/* Lid side right */}
                <path d="M100 109 L148 90 L148 99 L100 118 Z" fill="#C92C11" />
                
                {/* Lid top */}
                <path d="M52 90 L100 71 L148 90 L100 109 Z" fill="#EF4E2E" />
                
                {/* White Ribbon around vertical parts */}
                <path d="M93 115 L107 121 L107 156 L93 156 Z" fill="#FFFFFF" />
                {/* White Ribbon around lid vertical parts */}
                <path d="M93 106 L107 112 L107 118 L93 118 Z" fill="#FFFFFF" />
                
                {/* White Ribbon around lid top (Left axis) */}
                <path d="M73 81 L86 75 L121 99 L108 105 Z" fill="#FFFFFF" />
                {/* White Ribbon around lid top (Right axis) */}
                <path d="M121 81 L108 75 L73 99 L86 105 Z" fill="#F0F0F0" />
                
                {/* Majestic 3D White bow */}
                {/* Left loop */}
                <path d="M100 81 C82 58 64 76 91 85 C95 87 98 84 100 81 Z" fill="#FFFFFF" stroke="#F0F0F0" strokeWidth="0.5" />
                {/* Right loop */}
                <path d="M100 81 C118 58 136 76 109 85 C105 87 102 84 100 81 Z" fill="#F0F0F0" stroke="#E2E2E2" strokeWidth="0.5" />
                
                {/* Bow tie tail left */}
                <path d="M100 84 C82 91 72 109 68 118 C77 113 91 99 96 89 Z" fill="#FFFFFF" />
                {/* Bow tie tail right */}
                <path d="M100 84 C118 91 128 109 132 118 C123 113 109 99 104 89 Z" fill="#F0F0F0" />
                
                {/* Central tie node */}
                <circle cx="100" cy="81" r="6" fill="#FFFFFF" />
              </svg>
            </div>

          </div>
        </div>
      </div>

      {/* 2. Main footer with beautiful light gray background and elegant 6-columns grid layout */}
      <div className="max-w-7xl mx-auto px-4 pb-0 mb-0" id="main-footer-directory-section">
        <div className="bg-[#F5F5F5] border-t border-gray-200/40 px-8 py-5 rounded-t-none rounded-b-3xl" id="footer-directory-grid">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[3fr_1.8fr_1.8fr_1.8fr_1.8fr_2fr] gap-6 lg:gap-0 text-left">
            
            {/* Column 1 (Big column): Brand information & social details */}
            <div className="pr-6 text-left space-y-4 lg:border-r border-[#E5E5E5]" id="footer-brand-info">
              {/* Needly Logo with exact Mascot Style & Crimson text */}
              <div className="flex items-center space-x-3 select-none">
                <div className="w-12 h-12 bg-[#EE4D30] rounded-2xl flex items-center justify-center relative shadow-sm pointer-events-none">
                  <svg className="w-8 h-8 text-white" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 12V32H18V22L30 32H36V12H30V22L18 12H12Z" fill="white" />
                    <circle cx="16" cy="38" r="3" fill="white" />
                    <circle cx="32" cy="38" r="3" fill="white" />
                    <path d="M10 38H38" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-3xl font-extrabold text-[#EE4D30] tracking-tight">Needly</span>
              </div>
              
              <p className="text-xs text-[#666666] font-medium leading-relaxed max-w-[240px]">
                Your global online marketplace. Millions of products, great prices, better shopping experience.
              </p>

              {/* Social icons row with matching outline circular buttons using Phosphor Icons */}
              <div className="flex items-center gap-2 pt-2" id="social-icons-bar">
                <a href="#facebook" aria-label="Facebook" className="w-[30px] h-[30px] rounded-full border border-[#D5D5D5] bg-white flex items-center justify-center text-gray-600 hover:border-[#EE4D30] hover:text-[#EE4D30] transition-colors shadow-xs">
                  <FacebookLogo className="w-4 h-4 fill-current text-gray-600 hover:text-inherit" weight="fill" />
                </a>
                <a href="#instagram" aria-label="Instagram" className="w-[30px] h-[30px] rounded-full border border-[#D5D5D5] bg-white flex items-center justify-center text-gray-600 hover:border-[#EE4D30] hover:text-[#EE4D30] transition-colors shadow-xs">
                  <InstagramLogo className="w-4 h-4 fill-current text-gray-600 hover:text-inherit" weight="fill" />
                </a>
                <a href="#twitter-x" aria-label="Twitter X" className="w-[30px] h-[30px] rounded-full border border-[#D5D5D5] bg-white flex items-center justify-center text-gray-600 hover:border-[#EE4D30] hover:text-[#EE4D30] transition-colors shadow-xs">
                  <XLogo className="w-4 h-4 fill-current text-gray-600 hover:text-inherit" weight="bold" />
                </a>
                <a href="#youtube" aria-label="YouTube" className="w-[30px] h-[30px] rounded-full border border-[#D5D5D5] bg-white flex items-center justify-center text-gray-600 hover:border-[#EE4D30] hover:text-[#EE4D30] transition-colors shadow-xs">
                  <YoutubeLogo className="w-4 h-4 fill-current text-gray-600 hover:text-inherit" weight="fill" />
                </a>
              </div>
            </div>

            {/* Column 2: Customer Service */}
            <div className="lg:border-r border-[#E5E5E5] lg:px-6" id="footer-col-cust">
              <h4 className="text-[13px] font-bold text-[#111111] tracking-tight mb-4">Customer Service</h4>
              <ul className="space-y-3 text-xs font-semibold text-[#666666]">
                <li><a href="#help" className="hover:text-[#EE4D30] transition-colors">Help Center</a></li>
                <li><a href="#track" className="hover:text-[#EE4D30] transition-colors">Track Order</a></li>
                <li><a href="#returns" className="hover:text-[#EE4D30] transition-colors">Returns & Refunds</a></li>
                <li><a href="#shipping" className="hover:text-[#EE4D30] transition-colors">Shipping Info</a></li>
                <li><a href="#contact" className="hover:text-[#EE4D30] transition-colors">Contact Us</a></li>
              </ul>
            </div>

            {/* Column 3: About Needly */}
            <div className="lg:border-r border-[#E5E5E5] lg:px-6" id="footer-col-about">
              <h4 className="text-[13px] font-bold text-[#111111] tracking-tight mb-4">About Needly</h4>
              <ul className="space-y-3 text-xs font-semibold text-[#666666]">
                <li><a href="#about" className="hover:text-[#EE4D30] transition-colors">About Us</a></li>
                <li><a href="#careers" className="hover:text-[#EE4D30] transition-colors">Careers</a></li>
                <li><a href="#press" className="hover:text-[#EE4D30] transition-colors">Press & Media</a></li>
                <li><a href="#affiliate" className="hover:text-[#EE4D30] transition-colors">Affiliate Program</a></li>
              </ul>
            </div>

            {/* Column 4: Policies */}
            <div className="lg:border-r border-[#E5E5E5] lg:px-6" id="footer-col-policies">
              <h4 className="text-[13px] font-bold text-[#111111] tracking-tight mb-4">Policies</h4>
              <ul className="space-y-3 text-xs font-semibold text-[#666666]">
                <li><a href="#privacy" className="hover:text-[#EE4D30] transition-colors">Privacy Policy</a></li>
                <li><a href="#terms" className="hover:text-[#EE4D30] transition-colors">Terms of Use</a></li>
                <li><a href="#buyer" className="hover:text-[#EE4D30] transition-colors">Buyer Protection</a></li>
                <li><a href="#ip" className="hover:text-[#EE4D30] transition-colors">Intellectual Property</a></li>
              </ul>
            </div>

            {/* Column 5: Sell on Needly */}
            <div className="lg:border-r border-[#E5E5E5] lg:px-6" id="footer-col-selling">
              <h4 className="text-[13px] font-bold text-[#111111] tracking-tight mb-4">Sell on Needly</h4>
              <ul className="space-y-3 text-xs font-semibold text-[#666666]">
                <li><a href="#start" className="hover:text-[#EE4D30] transition-colors">Start Selling</a></li>
                <li><a href="#seller-center" className="hover:text-[#EE4D30] transition-colors">Seller Center</a></li>
                <li><a href="#affiliates" className="hover:text-[#EE4D30] transition-colors">Affiliates</a></li>
                <li><a href="#partnerships" className="hover:text-[#EE4D30] transition-colors">Partnerships</a></li>
              </ul>
            </div>

            {/* Column 6: Download App Badges */}
            <div className="lg:pl-6 text-left space-y-4" id="footer-col-app">
              <div>
                <h4 className="text-[13px] font-bold text-[#111111] tracking-tight">Download App</h4>
                <p className="text-xs text-[#999999] font-medium mt-0.5">Shop on the go</p>
              </div>
              
              <div className="flex flex-col gap-2 max-w-[150px]">
                {/* Google Play Store Badge using Phosphor Icons */}
                <a href="#play-store" className="flex items-center gap-2 border border-gray-200 bg-white rounded-lg px-2.5 py-1.5 hover:border-[#EE4D30]/30 hover:bg-gray-50 transition-all text-black w-full shadow-xs scale-[0.98]">
                  <GooglePlayLogo className="w-6 h-6 text-[#00E5FF] shrink-0" weight="fill" />
                  <div className="flex flex-col text-left leading-none font-sans">
                    <span className="text-[7.5px] font-semibold text-gray-400 uppercase tracking-tight">GET IT ON</span>
                    <span className="text-[11.5px] font-extrabold text-gray-800 tracking-tight">Google Play</span>
                  </div>
                </a>

                {/* Apple App Store Badge using Phosphor Icons */}
                <a href="#app-store" className="flex items-center gap-2.5 border border-gray-200 bg-white rounded-lg px-2.5 py-1.5 hover:border-[#EE4D30]/30 hover:bg-gray-50 transition-all text-black w-full shadow-xs scale-[0.98]">
                  <AppleLogo className="w-6 h-6 text-black shrink-0" weight="fill" />
                  <div className="flex flex-col text-left leading-none font-sans">
                    <span className="text-[6.5px] font-medium text-gray-400 tracking-tight">Download on the</span>
                    <span className="text-[12px] font-bold text-gray-800 tracking-tight">App Store</span>
                  </div>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 3. Bottom sub-footer row with copyright and payment logos */}
      <div className="max-w-7xl mx-auto px-4 py-3" id="footer-bottom-ribbon">
        <div className="px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Copyright Section */}
          <div className="text-xs font-semibold text-[#888888] tracking-tight">
            © 2026 Needly. All rights reserved.
          </div>

          {/* Secure Payment methods layout styled elegantly as high-fidelity badges using React Icons */}
          <div className="flex flex-wrap items-center gap-1.5 justify-center sm:justify-end" id="payment-logos-strip">
            {/* Visa */}
            <div className="h-6 px-1.5  flex items-center justify-center select-none  text-[#1A1F71] hover:text-[#0066B2] transition-colors" title="Visa">
              <span className="w-6 h-6 flex items-center justify-center shrink-0">
                <FaCcVisa size={24} />
              </span>
            </div>

            {/* Mastercard */}
            <div className="h-6 px-1.5  flex items-center justify-center select-none text-[#EB001B] hover:text-[#FF5F00] transition-colors" title="Mastercard">
              <span className="w-6 h-6 flex items-center justify-center shrink-0">
                <FaCcMastercard size={24} />
              </span>
            </div>

            {/* PayPal */}
            <div className="h-6 px-1.5  flex items-center justify-center select-none  text-[#003087] hover:text-[#0079C1] transition-colors" title="PayPal">
              <span className="w-6 h-6 flex items-center justify-center shrink-0">
                <FaCcPaypal size={24} />
              </span>
            </div>

            {/* Apple Pay */}
            <div className="h-6 px-1.5  flex items-center justify-center select-none shadow-xs text-black hover:text-gray-800 transition-colors" title="Apple Pay">
              <span className="w-7 h-7 flex items-center justify-center shrink-0">
                <FaApplePay size={28} />
              </span>
            </div>

            {/* Google Pay */}
            <div className="h-6 px-1.5  flex items-center justify-center select-none shadow-xs text-gray-800 hover:text-black transition-colors" title="Google Pay">
              <span className="w-8 h-8 flex items-center justify-center shrink-0">
                <FaGooglePay size={32} />
              </span>
            </div>

            {/* Credits & Debits card */}
            <div className="h-6 px-2  flex items-center justify-center select-none shadow-xs text-gray-400 hover:text-gray-600 transition-colors" title="Cards Accepted">
              <span className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                <FaCreditCard size={14} />
              </span>
            </div>

            {/* "and more" string */}
            <span className="text-xs text-[#999999] font-medium ml-1">and more</span>
          </div>

        </div>
      </div>

    </footer>
  );
}
