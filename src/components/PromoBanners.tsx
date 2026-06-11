import { useState } from "react";
import { 
  Percent, 
  Coins, 
  Smartphone, 
  Download, 
  Sparkle,
  CheckCircle2,
  QrCode
} from "lucide-react";
import coinsImage from "../assets/images/needly_coins_1781009176738.png";
import appImage from "../assets/images/needly_app_1781009202107.png";

interface PromoBannersProps {
  onApplyCoupon: (discount: number) => void;
  isCouponApplied: boolean;
}

export default function PromoBanners({ onApplyCoupon, isCouponApplied }: PromoBannersProps) {
  const [isCoinClaimed, setIsCoinClaimed] = useState(false);

  const handleClaimCoupon = () => {
    if (!isCouponApplied) {
      onApplyCoupon(10);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 font-sans" id="promotional-banners-row">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Card 1: New User Coupon */}
        <div className="bg-[#FFF0E5] rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden min-h-[180px] group border border-[#FFE0D0]" id="promo-card-coupon">
          {/* Confetti particles */}
          <div className="absolute top-10 left-[45%] w-2 h-2 bg-orange-400 rotate-12 opacity-40 rounded-xs" />
          <div className="absolute top-24 left-[15%] w-3 h-1.5 bg-orange-300 -rotate-45 opacity-40 rounded-xs" />
          <div className="absolute top-4 left-[30%] w-2 h-3 bg-orange-200 rotate-45 opacity-30 rounded-xs" />
          <div className="absolute bottom-6 left-[38%] w-1.5 h-1.5 bg-orange-400 rotate-12 opacity-40 rounded-full" />
          <div className="absolute bottom-16 left-[50%] w-2 h-3 bg-orange-300 -rotate-12 opacity-35 rounded-xs" />

          {/* Text and buttons */}
          <div className="z-10 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-[#FF5000] font-bold text-lg md:text-[20px] tracking-tight leading-snug">
                New User Coupon
              </h3>
              <p className="text-[#222222] font-semibold text-xs mt-1 md:text-[13px] leading-tight">
                Get up to <span className="text-[#FF5000] font-black">$10 off</span>
              </p>
              <p className="text-gray-500 font-normal text-[11px] mt-0.5">
                on your first order
              </p>
            </div>
            
            <div className="mt-4">
              <button
                onClick={handleClaimCoupon}
                disabled={isCouponApplied}
                className={`py-1.5 px-4 rounded-xl text-xs font-semibold border transition-all duration-250 cursor-pointer ${
                  isCouponApplied
                    ? "bg-emerald-600 border-emerald-600 text-white flex items-center space-x-1"
                    : "bg-white border-[#FF5000] text-[#FF5000] hover:bg-orange-50 active:scale-95"
                }`}
              >
                {isCouponApplied ? (
                  <>
                    <CheckCircle2 className="w-3 h-3 fill-white text-emerald-600" />
                    <span>Applied</span>
                  </>
                ) : (
                  "Get Coupon"
                )}
              </button>
            </div>
          </div>

          {/* 3D-styled Fan of tickets matching screenshot perfectly */}
          <div className="absolute right-4 bottom-2 top-2 w-[42%] flex items-center justify-center select-none" id="visual-ticket-graphic">
            <div className="relative w-full h-[120px] flex items-center justify-center">
              {/* Layer 3 - Back ticket, tilted left */}
              <div className="absolute w-[82px] h-[105px] bg-[#FF7E40] rounded-xl transform -rotate-12 translate-x-[-12px] opacity-80" />
              {/* Layer 2 - Mid ticket, tilted right */}
              <div className="absolute w-[82px] h-[105px] bg-[#FF6A1A] rounded-xl transform rotate-12 translate-x-[12px] opacity-90" />
              {/* Layer 1 - Front Main Ticket, upright/slightly tilted left */}
              <div className="absolute w-[92px] h-[72px] bg-white rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col justify-center items-center transform -rotate-3 translate-y-[2px]">
                {/* Side punch-out notches */}
                <div className="absolute top-1/2 left-0 w-3 h-3 bg-[#FFF0E5] border-r border-[#FFE0D0] rounded-full transform -translate-y-1/2 -ml-1.5" />
                <div className="absolute top-1/2 right-0 w-3 h-3 bg-[#FFF0E5] border-l border-[#FFE0D0] rounded-full transform -translate-y-1/2 -mr-1.5" />
                
                {/* Content inside white ticket */}
                <div className="flex items-center justify-center">
                  <span className="text-[#FF5000] text-sm font-semibold mr-0.5">$</span>
                  <span className="text-[#FF5000] text-2xl font-black tracking-tight">10</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Save More with Needly Coins */}
        <div className="bg-[#EAF0FF] rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden min-h-[180px] group border border-[#D5E4FF]" id="promo-card-coins">
          {/* Confetti particles */}
          <div className="absolute top-12 left-[40%] w-2 h-1.5 bg-blue-300 rotate-45 opacity-35 rounded-xs" />
          <div className="absolute top-22 left-[15%] w-2.5 h-2.5 bg-blue-400 -rotate-12 opacity-35 rounded-xs" />
          <div className="absolute bottom-12 left-[30%] w-1.5 h-2 bg-indigo-300 rotate-12 opacity-35 rounded-xs" />
          
          <div className="z-10 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-[#0047FF] font-bold text-lg md:text-[20px] tracking-tight leading-snug">
                Save More
              </h3>
              <p className="text-[#0047FF] font-extrabold text-xs mt-0.5 md:text-[13px] leading-tight">
                With Needly Coins
              </p>
              <p className="text-gray-500 font-normal text-[11px] mt-1.5 leading-snug max-w-[150px]">
                Collect coins & save <br/>
                <span className="font-semibold text-[#222222]">up to 50% on orders</span>
              </p>
            </div>

            <div className="mt-4">
              <button
                onClick={() => setIsCoinClaimed(true)}
                className={`py-1.5 px-4 rounded-xl text-xs font-semibold border transition-all duration-200 cursor-pointer ${
                  isCoinClaimed
                    ? "bg-[#0047FF] border-[#0047FF] text-white flex items-center space-x-1"
                    : "bg-white border-[#0047FF] text-[#0047FF] hover:bg-blue-50 active:scale-95"
                }`}
              >
                {isCoinClaimed ? (
                  <>
                    <CheckCircle2 className="w-3 h-3 fill-white text-[#0047FF]" />
                    <span>Claimed!</span>
                  </>
                ) : (
                  "Learn More"
                )}
              </button>
            </div>
          </div>

          {/* 3D golden coins image positioned at bottom-right */}
          <div className="absolute right-2 bottom-0 w-[42%] select-none transition-transform duration-500 transform group-hover:scale-105 pointer-events-none" id="coins-promo-render">
            <img 
              src={coinsImage} 
              alt="Golden Coins bundle" 
              className="w-full h-auto object-contain mix-blend-multiply"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Card 3: Download Needly App with QR code overlay */}
        <div className="bg-[#F3E8FF] rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden min-h-[180px] group border border-[#E9D5FF]" id="promo-card-app">
          {/* Confetti particles */}
          <div className="absolute top-14 left-[42%] w-1.5 h-2 bg-purple-300 rotate-12 opacity-35 rounded-xs" />
          <div className="absolute top-26 left-[18%] w-2 h-2 bg-purple-400 -rotate-45 opacity-35 rounded-xs" />
          <div className="absolute bottom-14 left-[32%] w-2 h-3 bg-pink-300 rotate-45 opacity-35 rounded-xs" />

          <div className="z-10 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-[#6A0DAD] font-bold text-lg md:text-[20px] tracking-tight leading-snug">
                Download Needly App
              </h3>
              <p className="text-gray-500 font-normal text-[11px] mt-1.5 leading-snug">
                Shop anywhere,<br/>
                anytime
              </p>
            </div>

            <div className="mt-4">
              <a
                href="#app-install"
                className="inline-block py-1.5 px-4 bg-white border border-[#6A0DAD] text-[#6A0DAD] font-semibold text-xs rounded-xl hover:bg-purple-100/50 transition-all duration-200 cursor-pointer active:scale-95 text-center"
              >
                Download Now
              </a>
            </div>
          </div>

          {/* Smartphone + QR code block, perfectly matching layout */}
          <div className="absolute right-0 bottom-[-10px] top-2 w-[46%] select-none flex items-end justify-between" id="app-promo-renders-group">
            {/* QR code block to the left of the phone */}
            <div className="mb-4 ml-1 z-10 p-1.5 bg-white border border-gray-200 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] scale-90 sm:scale-100 hover:scale-105 duration-300 transition-transform cursor-help" title="Scan to check app">
              <QrCode className="w-11 h-11 text-[#222222]" />
            </div>

            {/* Smartphone layout slightly on the right side */}
            <div className="w-[62%] h-full flex items-end relative overflow-hidden transform transition-transform duration-300 group-hover:translate-x-1" id="app-promo-render">
              <img 
                src={appImage} 
                alt="Needly App Mockup" 
                className="max-h-[145px] w-auto object-contain ml-auto"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
