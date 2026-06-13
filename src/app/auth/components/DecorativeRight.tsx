import React from "react";
import { ShoppingCart } from "lucide-react";

export default function DecorativeRight() {
  return (
    <div className="hidden lg:flex flex-col items-center justify-center relative w-full h-full max-w-[280px]">
      {/* Dashed curved track */}
      <svg className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 text-orange-200 pointer-events-none -z-10" fill="none" viewBox="0 0 100 100">
        <path d="M 90,80 Q 50,150 10,80" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" />
      </svg>

      {/* Floating Orange Sparkle Star */}
      <div className="absolute top-12 left-4 text-orange-400 text-xl animate-pulse">✦</div>

      {/* Floating Check Shield Badge */}
      <div className="absolute top-14 right-6 bg-white border border-emerald-100 rounded-2xl p-3 shadow-md transform rotate-12 hover:rotate-0 transition-transform duration-300">
        <div className="bg-emerald-50 text-emerald-500 rounded-full p-2">
          <span className="text-xl leading-none">⚔️</span>
        </div>
      </div>

      {/* Floating Percentage Discount Badge */}
      <div className="absolute bottom-16 right-1 bg-gradient-to-r from-red-500 to-rose-600 text-white font-black text-lg w-12 h-12 rounded-full shadow-lg flex items-center justify-center transform -rotate-6 animate-bounce">
        <span>%</span>
      </div>

      {/* Main Composite: Wire Shopping Cart with Needly Boxes */}
      <div className="relative mt-20 flex flex-col items-center">
        {/* Wire Cart Mockup */}
        <div className="relative bg-gradient-to-b from-zinc-50 to-zinc-100 border border-zinc-200 rounded-[28px] shadow-2xl p-6 w-48 text-zinc-600 group transition-all hover:scale-105 duration-300 z-20">
          
          {/* Basket upper handle bars */}
          <div className="absolute -top-4 left-6 right-6 h-4 border-2 border-dashed border-zinc-350 rounded-t-xl" />

          {/* Cart item interior (Brown box envelope with N logo) */}
          <div className="relative bg-orange-100/65 border border-orange-200 rounded-2xl p-3 mb-2 flex items-center space-x-2">
            {/* Minimal N circle badge */}
            <div className="w-8 h-8 rounded-xl bg-[#FF5000] flex items-center justify-center text-white font-black text-base shrink-0">
              N
            </div>
            <div className="space-y-0.5 min-w-0">
              <div className="w-12 h-1.5 bg-orange-300 rounded" />
              <div className="w-8 h-1 bg-orange-200 rounded" />
            </div>
          </div>

          {/* Extra orange box lying next */}
          <div className="w-full bg-[#FF5000]/10 border border-[#FF5000]/25 rounded-xl p-2 flex items-center justify-between">
            <span className="w-4 h-4 rounded-full bg-[#FF5000] flex items-center justify-center text-white text-[8px] font-black">✓</span>
            <div className="w-16 h-1 bg-[#FF5000]/30 rounded" />
          </div>

          {/* Grid wire layout style look */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_49%,#d4d4d8_49%,#d4d4d8_51%,transparent_51%),linear-gradient(0deg,transparent_49%,#d4d4d8_49%,#d4d4d8_51%,transparent_51%)] bg-[size:16px_16px] max-h-40 rounded-[28px] overflow-hidden opacity-30 pointer-events-none" />

          {/* Wire cart legs & wheels underneath */}
          <div className="absolute -bottom-6 left-8 right-8 flex justify-between">
            <div className="w-4 h-6 border-l-2 border-zinc-350 flex flex-col justify-end items-center">
              <div className="w-3.5 h-3.5 rounded-full bg-zinc-800 border-2 border-white shadow-xs" />
            </div>
            <div className="w-4 h-6 border-r-2 border-zinc-350 flex flex-col justify-end items-center">
              <div className="w-3.5 h-3.5 rounded-full bg-zinc-800 border-2 border-white shadow-xs" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
