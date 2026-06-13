import React from "react";
import { ShieldCheck, ArrowRight } from "lucide-react";

interface FreeShippingBannerProps {
  cartSubtotal: number;
  onButtonClick: () => void;
  buttonText: string;
}

export default function FreeShippingBanner({
  cartSubtotal,
  onButtonClick,
  buttonText,
}: FreeShippingBannerProps) {
  const isFree = cartSubtotal >= 50;
  const remaining = Math.max(0, 50 - cartSubtotal);

  return (
    <div className="bg-orange-50/20 border-2 border-orange-100 rounded-[20px] p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-5 shadow-3xs">
      <div className="flex items-center space-x-4">
        {/* Shield Icon container */}
        <div className="p-3 bg-[#FF5000]/10 rounded-2xl text-[#FF5000] shrink-0">
          <ShieldCheck className="w-7 h-7 stroke-[2.5]" />
        </div>
        <div className="text-center md:text-left">
          <p className="text-base font-extrabold text-gray-900 leading-snug">
            {isFree ? (
              <span>Your order is eligible for <span className="text-[#FF5000]">FREE shipping!</span></span>
            ) : (
              <span>
                You're <span className="text-[#FF5000]">${remaining.toFixed(2)}</span> away from free shipping!
              </span>
            )}
          </p>
          <p className="text-xs text-gray-400 font-semibold mt-1">
            {isFree
              ? "Enjoy premium fast shipping entirely on us."
              : "Add more items to your cart and enjoy free delivery."}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onButtonClick}
        className="w-full md:w-auto bg-[#FF5000] hover:bg-[#E04600] active:bg-[#C83E00] text-white font-extrabold text-sm md:text-base py-4 px-8 rounded-[16px] transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center space-x-3.5 shadow-md shadow-[#FF5000]/25 cursor-pointer"
      >
        <span>{buttonText}</span>
        <ArrowRight className="w-5 h-5 stroke-[2.5]" />
      </button>
    </div>
  );
}
