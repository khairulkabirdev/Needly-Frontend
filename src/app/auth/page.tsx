import React from "react";
import { ArrowLeft, Sparkles, ShieldCheck, Truck, RotateCcw, HelpCircle } from "lucide-react";
import DecorativeLeft from "./components/DecorativeLeft";
import DecorativeRight from "./components/DecorativeRight";
import AuthCard from "./components/AuthCard";

interface AuthPageProps {
  onAuthSuccess: (email: string) => void;
  onNavigateHome: () => void;
}

export default function AuthPage({ onAuthSuccess, onNavigateHome }: AuthPageProps) {
  return (
    <div className="w-full relative py-12 md:py-16 selection:bg-[#FF5000] selection:text-white" id="auth-page-root">
      
      {/* 1. Optional floating header badge */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center space-x-2 text-xs md:text-sm font-extrabold text-gray-400 hover:text-gray-900 group transition-colors cursor-pointer focus:outline-hidden"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform stroke-[2.5]" />
          <span>Back to Home</span>
        </button>
      </div>

      {/* 2. Unified elegant bento container */}
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center">
        
        {/* Core Layout row: Decor left, Central Auth Card, Decor right */}
        <div className="w-full flex items-center justify-around gap-4 md:gap-8 mb-16">
          <DecorativeLeft />
          <AuthCard onSuccess={onAuthSuccess} />
          <DecorativeRight />
        </div>

        {/* 3. Global store standard trust badges list (screenshot matching version) */}
        <div className="w-full max-w-5xl bg-white border-2 border-gray-100 rounded-[24px] p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center shadow-xs">
          
          {/* Badge 1 */}
          <div className="flex items-center space-x-3.5 px-2">
            <div className="p-3 bg-orange-50 rounded-2xl text-[#FF5000] shrink-0">
              <Truck className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <h5 className="text-xs font-black text-gray-900">Free Shipping</h5>
              <p className="text-[11px] text-gray-400 font-semibold mt-0.5">On orders over $50</p>
            </div>
          </div>

          {/* Badge 2 */}
          <div className="flex items-center space-x-3.5 px-2 border-t sm:border-t-0 sm:border-l border-gray-100 pt-4 sm:pt-0 sm:pl-4">
            <div className="p-3 bg-orange-50 rounded-2xl text-[#FF5000] shrink-0">
              <ShieldCheck className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <h5 className="text-xs font-black text-gray-900">Secure Payment</h5>
              <p className="text-[11px] text-gray-400 font-semibold mt-0.5">100% secure payment</p>
            </div>
          </div>

          {/* Badge 3 */}
          <div className="flex items-center space-x-3.5 px-2 border-t lg:border-t-0 lg:border-l border-gray-100 pt-4 lg:pt-0 lg:pl-4">
            <div className="p-3 bg-orange-50 rounded-2xl text-[#FF5000] shrink-0">
              <RotateCcw className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <h5 className="text-xs font-black text-gray-900">30-Day Returns</h5>
              <p className="text-[11px] text-gray-400 font-semibold mt-0.5">Easy returns & refunds</p>
            </div>
          </div>

          {/* Badge 4 */}
          <div className="flex items-center space-x-3.5 px-2 border-t lg:border-t-0 lg:border-l border-gray-100 pt-4 lg:pt-0 lg:pl-4">
            <div className="p-3 bg-orange-50 rounded-2xl text-[#FF5000] shrink-0">
              <HelpCircle className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <h5 className="text-xs font-black text-gray-900">24/7 Support</h5>
              <p className="text-[11px] text-gray-400 font-semibold mt-0.5">We're here to help</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
