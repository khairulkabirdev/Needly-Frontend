import { 
  Truck, 
  Zap, 
  RotateCcw, 
  ShieldCheck, 
  Tag 
} from "lucide-react";

export default function TrustBadges() {
  const badges = [
    {
      id: "free-del",
      title: "Free Delivery",
      desc: "On orders over $50",
      icon: <Truck className="w-5 h-5 text-orange-500" />,
      color: "bg-orange-50"
    },
    {
      id: "fast-ship",
      title: "Fast Shipping",
      desc: "Worldwide delivery",
      icon: <Zap className="w-5 h-5 text-sky-500" />,
      color: "bg-sky-50"
    },
    {
      id: "returns",
      title: "30-Day Returns",
      desc: "Easy return policy",
      icon: <RotateCcw className="w-5 h-5 text-emerald-500" />,
      color: "bg-emerald-50"
    },
    {
      id: "secure",
      title: "Secure Payment",
      desc: "100% protected logs",
      icon: <ShieldCheck className="w-5 h-5 text-indigo-500" />,
      color: "bg-indigo-50"
    },
    {
      id: "best-prices",
      title: "Best Prices",
      desc: "Guaranteed deals",
      icon: <Tag className="w-5 h-5 text-pink-500" />,
      color: "bg-pink-50"
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-2 mt-2 font-sans" id="trust-badges-container">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 bg-white border border-gray-100 rounded-2xl p-4 shadow-2xs">
        {badges.map((b) => (
          <div 
            key={b.id} 
            className="flex items-center space-x-3.5 p-2 rounded-xl hover:bg-gray-50 transition-colors duration-150 group"
          >
            <div className={`p-2.5 rounded-xl ${b.color} duration-300 transition-transform group-hover:scale-105 shrink-0`}>
              {b.icon}
            </div>
            <div className="text-left leading-tight">
              <h4 className="text-xs font-bold text-gray-800 tracking-tight group-hover:text-orange-600 transition-colors">
                {b.title}
              </h4>
              <p className="text-[10px] text-gray-400 font-medium">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
