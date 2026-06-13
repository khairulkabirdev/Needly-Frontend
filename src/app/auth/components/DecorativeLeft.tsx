import React from "react";

export default function DecorativeLeft() {
  return (
    <div className="hidden lg:flex flex-col items-center justify-center relative w-full h-full max-w-[280px]">
      {/* Dashed curved track */}
      <svg className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 text-orange-200 pointer-events-none -z-10" fill="none" viewBox="0 0 100 100">
        <path d="M 10,80 Q 50,-10 90,80" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" />
      </svg>

      {/* Floating Orange Sparkle */}
      <div className="absolute top-10 right-4 text-orange-400 text-xl animate-pulse">✦</div>

      {/* Floating Red Heart Badge */}
      <div className="absolute top-16 left-6 bg-white border border-rose-100 rounded-2xl p-3 shadow-md transform -rotate-12 hover:rotate-0 transition-transform duration-300">
        <div className="bg-rose-50 text-rose-500 rounded-full p-2">
          <span className="text-xl leading-none">❤️</span>
        </div>
      </div>

      {/* Main Composite: Plant pot, Shopping bag, Boxes */}
      <div className="relative mt-20 flex flex-col items-center">
        {/* Shopping Bag & Boxes Area */}
        <div className="relative">
          {/* Potted Plant (Left layer, slightly behind) */}
          <div className="absolute -left-16 bottom-0 w-24 z-10 flex flex-col items-center">
            {/* Minimal plant leaves */}
            <div className="relative h-28 w-20 flex flex-col items-center select-none">
              <div className="absolute top-0 left-4 w-6 h-12 bg-emerald-600 rounded-full rotate-12 blur-[0.3px]" />
              <div className="absolute top-4 left-0 w-5 h-10 bg-emerald-700 rounded-full -rotate-12 blur-[0.3px]" />
              <div className="absolute top-6 left-8 w-5 h-11 bg-emerald-600 rounded-full rotate-45 blur-[0.3px]" />
              <div className="absolute top-10 left-2 w-6 h-10 bg-emerald-500 rounded-full -rotate-45 blur-[0.3px]" />
              <div className="w-1.5 h-16 bg-zinc-400" />
            </div>
            {/* Minimal white plant pot */}
            <div className="w-12 h-14 bg-gradient-to-b from-zinc-100 to-zinc-200 border border-zinc-300 rounded-b-xl shadow-sm relative overflow-hidden">
              <div className="w-full h-1.5 bg-zinc-300" />
            </div>
          </div>

          {/* White Premium Shopping Bag */}
          <div className="relative bg-white border border-gray-150 rounded-2xl shadow-xl w-44 p-4 pb-6 flex flex-col items-center transition-all hover:scale-105 duration-300 z-20">
            {/* Soft pink/orange handle circles on bag */}
            <div className="absolute -top-12 w-20 h-16 border-4 border-orange-500 rounded-t-full -z-10" />

            {/* Needly Logo on Bag */}
            <div className="mt-8 w-14 h-14 rounded-2xl bg-[#FF5000] flex items-center justify-center shadow-inner relative">
              <span className="text-white font-black text-3xl tracking-tight">N</span>
              {/* SMILE bottom curve of bag logo */}
              <div className="absolute bottom-1 w-10 h-3 border-b-4 border-orange-200 rounded-b-full opacity-80" />
            </div>

            {/* "Best Deals" hanging tag */}
            <div className="absolute top-20 -right-6 bg-gradient-to-r from-orange-500 to-[#FF5000] text-white text-[9px] font-black tracking-widest uppercase p-2 px-3.5 rounded-xl shadow-md cursor-pointer hover:rotate-3 transition-transform duration-200 flex flex-col items-center">
              <span>Best</span>
              <span className="text-[10px]">Deals</span>
              {/* Golden string hole */}
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white border border-orange-600" />
            </div>
          </div>

          {/* Cardboard Boxes in front */}
          <div className="absolute -bottom-4 -right-10 flex space-x-1 z-30">
            {/* Box 1 (Small cube) */}
            <div className="w-10 h-10 bg-orange-100 border border-orange-200/50 rounded-lg p-2.5 shadow-sm transform rotate-6 flex items-center justify-center">
              {/* Packing tape */}
              <div className="w-full h-1.5 bg-orange-200" />
            </div>
            {/* Box 2 (Medium cube) */}
            <div className="w-12 h-12 bg-amber-100 border border-amber-200/50 rounded-lg p-3 shadow-md transform -rotate-3 flex flex-col justify-between">
              <div className="w-full h-2 bg-amber-200/40" />
              <div className="w-full h-1 bg-amber-200" />
            </div>
            {/* Box 3 (Foreground box) */}
            <div className="w-11 h-11 bg-orange-100 border border-orange-200/50 rounded-lg p-2 shadow-xs transform rotate-12 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-orange-200/20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
