import { ChevronRight } from "lucide-react";
import { BRANDS } from "../data";

interface TopBrandsProps {
  onBrandClick: (brandName: string) => void;
}

// Custom renderer for perfect "same to same" vector brand logos matching official styles
function renderBrandLogo(brandName: string) {
  switch (brandName) {
    case "Apple":
      return (
        <svg className="h-[21px] sm:h-[24px] w-auto fill-current text-black" viewBox="0 0 170 170" xmlns="http://www.w3.org/2000/svg">
          <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.37.13-9.13-1.9-14.28-6.08-3.35-2.73-7.22-7.41-11.59-14.04-8.87-13.32-13.32-26.74-13.32-40.23 0-13.1 3.51-24.1 10.51-33 7.01-8.89 15.82-13.34 26.43-13.34 5.37 0 11.07 1.48 17.11 4.43 6.04 2.95 10.2 4.43 12.47 4.43 1.9 0 6.1-1.5 12.59-4.51 6.5-3.01 12.12-4.43 16.89-4.25 15.32.74 26.85 6.33 34.6 16.78-12.62 7.64-18.82 17.76-18.6 30.36.22 10.3 4.13 18.96 11.75 25.96 7.62 7.01 16.48 10.85 26.57 11.52-2.12 6.24-4.92 12.3-8.4 18.2zM119.22 30c0-7.52 2.68-14.62 8.04-21.31C132.61 1.99 140-.66 149.43.11c.11 1.01.17 1.8.17 2.35 0 7.39-2.74 14.39-8.23 21C135.88 30.13 128.53 33 119.39 32.22c-.11-1.12-.17-1.85-.17-2.22z" />
        </svg>
      );
    case "Samsung":
      return (
        <svg className="h-[9px] sm:h-[11px] w-auto fill-current text-[#0A54A6]" viewBox="0 0 500 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M47.7 57.3c-.3-4.2-3.1-6.7-10.4-8.6l-11.4-3c-14.7-3.9-22-10.4-22-23.7C3.9 8.2 13.9 0 31.7 0c17.5 0 26.8 8.6 27.2 21.8h-11c-.3-5.2-3.9-9.1-16-9.1-8.5 0-14.1 3.5-14.1 10.5 0 5.4 3.1 8 11.5 10.2l10.9 2.8c15.1 3.9 22.3 11 22.3 24.3 0 14.1-10.3 22-29.6 22-18.1 0-29.2-8-29.6-22h11.1c.3 6 4.8 9.5 18.2 9.5 10.5 0 17-3.9 17-10.8zM100.8 1.9l26.2 78.4H114l-4.5-15.1H84.3L79.8 80.3H68.8l26.2-78.4h5.8zm7 43.1L97.2 13 86.8 45h21zM203 1.9v78.4h-9l-38.4-53.5V80.3h-10.3V1.9h9l38.4 53.5V1.9H203zM250.7 57.3c-.3-4.2-3.1-6.7-10.4-8.6l-11.4-3c-14.7-3.9-22-10.4-22-23.7 0-13.8 10-22 27.8-22 17.5 0 26.8 8.6 27.2 21.8h-11c-.3-5.2-3.9-9.1-16-9.1-8.5 0-14.1 3.5-14.1 10.5 0 5.4 3.1 8 11.5 10.2l10.9 2.8c15.1 3.9 22.3 11 22.3 24.3 0 14.1-10.3 22-29.6 22-18.1 0-29.2-8-29.6-22h11.1c.3 6 4.8 9.5 18.2 9.5 10.5 0 17-3.9 17-10.8zM315.7 1.9v49.9c0 14.8-8 23.3-21.8 23.3-13.8 0-21.8-8.5-21.8-23.3V1.9h11.1v49.1c0 8.7 3.9 13.1 10.7 13.1s10.7-4.4 10.7-13.1V1.9h11.1zM404.9 1.9v78.4h-9l-38.4-53.5V80.3h-10.3V1.9h9l38.4 53.5V1.9H404.9zM461.7 44.5h20.8V80.3C475.2 81.3 469.7 82 461 82c-21.9 0-33.3-12.7-33.3-33C427.7 16 439.4 0 463.3 0c14.6 0 24 5.2 28.5 14.7l-9.3 4.9C478.4 12 472.9 8.6 463.3 8.6c-16 0-24 10.7-24 23.8S447.1 73 461.4 73c5.3 0 10.7-.7 11.1-.9V52.8h-10.8V44.5z" />
        </svg>
      );
    case "Xiaomi":
      return (
        <div className="rounded-lg h-[24px] w-[24px] bg-[#FF5000] flex items-center justify-center overflow-hidden">
          <svg className="h-[15px] w-[15px] fill-current text-white" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M28 72V45.2c0-5.5 3-8.2 8.4-8.2s8.4 2.7 8.4 8.2V72h9.6V45.2c0-5.5 3-8.2 8.4-8.2s8.4 2.7 8.4 8.2V72h9.6V42.8c0-10.5-6-15.8-16.8-15.8-5.8 0-10.1 2.1-12.8 5.4-2.7-3.3-7-5.4-12.8-5.4-8.8 0-14.4 3.7-16.2 10.2h-.4v-8.2H18v43h10z" />
          </svg>
        </div>
      );
    case "Anker":
      return (
        <svg className="h-[11px] sm:h-[13px] w-auto fill-current text-[#00A1E4]" viewBox="0 0 320 80" xmlns="http://www.w3.org/2000/svg">
          <path d="M31.2 0H14.1L0 80h14.1l3.5-20h22l3.5 20h14.1L31.2 0zm-11 50l7.5-43 7.5 43h-15zM105.5 0H91.4L65 50.5V0H51v80h14.1l26.4-50.5V80H105V0zM155.1 0h-16.4l-25 35V0H100v80h14.1V49.1l26.4 30.9h17l-29.5-34.6 27.1-35.4zM207.2 0h-43.1v80h43.1V68h-29V46.2h26.4V34.2H178V12h29.2V0zM245.5 0h-25.1v80h14.1V49.1h11c15.1 0 24.3-8 24.3-24.6C269.8 8 260.6 0 245.5 0zm1 37.1h-12V12h12c7.5 0 11.4 3 11.4 12.6s-3.9 12.5-11.4 12.5z" />
        </svg>
      );
    case "Nike":
      return (
        <svg className="h-[14px] sm:h-[17px] w-auto fill-current text-black" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.4 81.3C4.5 81.3.6 77-.3 70.4c-.9-6.3 2-13.8 8-22.3 5.4-7.6 12-15 19.3-22.2H39c-4 4.5-8 9.3-11.8 14.5L14 62c-2.3 3.3-3.1 6.5-2.2 8.7 1 2.3 3.9 3.5 8.7 3.3a25 25 0 0011.6-3.7c9-4.8 17.5-12.7 24.8-23C64.6 36.3 70.9 25 75 14h1c-3.3 9.4-8 19-13.8 28.5C54.4 55 45.4 66.8 35 74.4c-7.2 5.2-14.8 7-22.6 6.9z" />
        </svg>
      );
    case "Philips":
      return (
        <svg className="h-[9px] sm:h-[11px] w-auto fill-current text-[#0B4E9A]" viewBox="0 0 420 80" xmlns="http://www.w3.org/2000/svg">
          <path d="M43.2 0H14.1v80h14.1V48.1h15c18.1 0 29.6-8.5 29.6-24.1C72.8 8.5 61.3 0 43.2 0zm-.5 36.1h-14.1V12h14.1c10.5 0 15 3.5 15 12.1S63.2 36.1 42.7 36.1zM116.5 0h-14.1v80h14.1V46.2h32.2V80h14.1V0h-14.1v34.2h-32.2V0zM182.2 0V80h14.1V0h-14.1zM211.2 0V80h43.1V68h-29V0h-14.1zM271.2 0V80h14.1V0h-14.1zM321.2 0H292v80h14.1V48.1h15c18.1 0 29.6-8.5 29.6-24.1C350.8 8.5 339.3 0 321.2 0zm-.5 36.1h-14.1V12h14.1c10.5 0 15 3.5 15 12.1s-4.5 12-25 12z" />
          <path d="M410 28c-.3-4.2-3.1-6.7-10.4-8.6l-11.4-3c-14.7-3.9-22-10.4-22-23.7C366.2 8.2 376.2 0 394 0c17.5 0 26.8 8.6 27.2 21.8H410c-.3-5.2-3.9-9.1-16-9.1-8.5 0-14.1 3.5-14.1 10.5 0 5.4 3.1 8 11.5 10.2l10.9 2.8c15.1 3.9 22.3 11 22.3 24.3 0 14.1-10.3 22-29.6 22-18.1 0-29.2-8-29.6-22h11.1c.3 6 4.8 9.5 18.2 9.5 10.5 0 17-3.9 17-10.8z" />
        </svg>
      );
    case "Adidas":
      return (
        <div className="flex flex-col items-center justify-center">
          <svg className="h-[15px] sm:h-[18px] w-auto fill-current text-black" viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
            <path d="M26 42 L34 22 H43 L35 42 Z" />
            <path d="M42 42 L52 14 H61 L51 42 Z" />
            <path d="M58 42 L70 5 H79 L67 42 Z" />
          </svg>
          <span className="text-[8px] sm:text-[9px] font-bold text-black select-none tracking-tight leading-none uppercase mt-0.5">adidas</span>
        </div>
      );
    case "Lenovo":
      return (
        <span className="text-xs sm:text-[14px] font-bold tracking-tight text-[#E1251B] font-sans">
          Lenovo
        </span>
      );
    case "DJI":
      return (
        <svg className="h-[11px] sm:h-[13px] w-auto fill-current text-black" viewBox="0 0 80 35" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 4h6v27h-6v-10h-6c-4 0-6-2-6-6v-5c0-4 2-6 6-6h6V4zm-6 17h6v-11h-6c-1.5 0-2 1-2 2v5c0 1 .5 2 2 2z" />
          <path d="M38 4h6v22.5c0 4.5-2.5 7-7 7h-5.5v-6H37c1 0 1.5-.5 1.5-1.5V4z" />
          <path d="M56 4h6v27h-6V4z" />
        </svg>
      );
    case "Ugreen":
      return (
        <span className="text-[10px] sm:text-[11px] font-black tracking-normal text-black font-sans uppercase">
          UGREEN
        </span>
      );
    default:
      return <span className="text-xs font-bold text-gray-400">{brandName}</span>;
  }
}

export default function TopBrands({ onBrandClick }: TopBrandsProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-sans" id="top-brands-section">
      
      {/* Header section matching exact layout styles */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-[#111111] tracking-tight">
            Top Brands
          </h2>
        </div>
        <button 
          onClick={() => onBrandClick("")}
          className="flex items-center text-xs font-semibold text-gray-500 hover:text-[#FF5000] cursor-pointer transition-colors"
        >
          <span>View All</span>
          <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
        </button>
      </div>

      {/* Grid of clean brand cells with exact card layout */}
      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-10 gap-2 sm:gap-3" id="brands-logos-grid">
        {BRANDS.map((brand) => (
          <button
            key={brand.name}
            onClick={() => onBrandClick(brand.name)}
            className="h-[48px] sm:h-[58px] bg-white border border-gray-100 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:border-[#FF5000]/25 hover:shadow-[0_2px_10px_rgba(255,80,0,0.04)] px-2"
          >
            {renderBrandLogo(brand.name)}
          </button>
        ))}
      </div>
    </div>
  );
}

