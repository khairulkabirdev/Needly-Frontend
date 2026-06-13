import { ChevronRight } from "lucide-react";
import { CATEGORIES } from "../data";

interface TopCategoriesProps {
  onCategorySelect: (catName: string) => void;
  selectedCategory: string;
}

export default function TopCategories({ onCategorySelect, selectedCategory }: TopCategoriesProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-4 font-sans" id="top-categories-section">
      {/* Header section with refined typography matching Top Choice */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-black text-gray-900 tracking-tight flex items-center gap-2">
            Top Categories
          </h2>
          <p className="text-[10px] text-gray-400 font-medium">Explore handpicked products curated just for you</p>
        </div>
        <button 
          onClick={() => onCategorySelect("")}
          className="flex items-center text-xs font-bold text-gray-400 hover:text-[#FF5000] cursor-pointer transition-colors"
        >
          <span>View All</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Grid wrapper containing cards exactly styled like the image layout */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4" id="categories-cards-row">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.name;
          return (
            <button
              key={cat.id}
              onClick={() => onCategorySelect(isActive ? "" : cat.name)}
              className={`group w-full rounded-2xl p-4 flex flex-col items-center justify-between aspect-[3/4] min-h-[160px] cursor-pointer transition-all duration-300 relative focus:outline-hidden ${
                isActive 
                  ? "bg-white border-2 border-[#FF5000] shadow-md scale-102" 
                  : "bg-[#F7F7F7] border border-transparent hover:bg-[#F0F0F0] hover:scale-102 hover:shadow-2xs"
              }`}
              aria-label={`Select category ${cat.name}`}
            >
              {/* Center aligned wrapper containing graphic with multiply mix blend for professional integration */}
              <div className="flex-1 w-full flex items-center justify-center p-1 relative min-h-[85px] sm:min-h-[105px]">
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  className="max-h-[85px] max-w-[90%] object-contain mix-blend-multiply duration-500 group-hover:scale-108 transition-transform"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Centered label block with matching alignment */}
              <span className={`text-[11px] sm:text-[13px] font-medium tracking-tight text-center truncate w-full mt-3 block transition-colors duration-200 ${
                isActive ? "text-[#FF5000] font-semibold" : "text-[#222222]"
              }`}>
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
