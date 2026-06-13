import React from "react";
import { Truck, ChevronDown, Check } from "lucide-react";

interface ShippingMethodProps {
  shippingMethod: string;
  setShippingMethod: (val: string) => void;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

export default function ShippingMethod({
  shippingMethod,
  setShippingMethod,
  isOpen,
  setIsOpen,
}: ShippingMethodProps) {
  const methods = [
    {
      id: "standard",
      title: "Standard Shipping",
      desc: "Delivery in 3–5 business days",
      price: 0,
      priceStr: "Free",
    },
    {
      id: "express",
      title: "Express Shipping",
      desc: "Delivery in 1–2 business days",
      price: 6.99,
      priceStr: "$6.99",
    },
    {
      id: "overnight",
      title: "Overnight Shipping",
      desc: "Delivery by next day",
      price: 12.99,
      priceStr: "$12.99",
    },
  ];

  return (
    <div className="bg-white border-2 border-gray-100 rounded-[24px] shadow-xs overflow-hidden transition-all duration-300">
      {/* Header Accordion toggle button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50/50 transition-colors focus:outline-hidden text-left"
      >
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 rounded-full bg-[#FF5000] text-white flex items-center justify-center font-bold text-sm">
            2
          </div>
          <h2 className="text-lg md:text-xl font-extrabold text-gray-900 tracking-tight">
            Shipping Method
          </h2>
        </div>
        <ChevronDown
          className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Accordion Content options */}
      <div
        className={`transition-all duration-350 ease-in-out ${
          isOpen ? "max-h-[500px] border-t-2 border-gray-50 p-6 md:p-8" : "max-h-0 overflow-hidden"
        }`}
      >
        <div className="space-y-4">
          {methods.map((method) => {
            const isSelected = shippingMethod === method.id;

            return (
              <div
                key={method.id}
                onClick={() => setShippingMethod(method.id)}
                className={`border-2 rounded-[18px] p-5 flex items-center justify-between cursor-pointer transition-all duration-250 select-none ${
                  isSelected
                    ? "border-[#FF5000] bg-orange-50/15"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center space-x-4">
                  {/* Custom Radio check button */}
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected
                        ? "border-[#FF5000] bg-[#FF5000] text-white"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {isSelected && (
                      <div className="w-2.5 h-2.5 rounded-full bg-white font-bold" />
                    )}
                  </div>

                  {/* Truck delivery option labels */}
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2.5 rounded-xl border ${
                        isSelected
                          ? "bg-transparent border-[#FF5000]/25 text-[#FF5000]"
                          : "bg-gray-50 border-gray-200 text-gray-500"
                      }`}
                    >
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">
                        {method.title}
                      </h4>
                      <p className="text-xs text-gray-400 font-semibold mt-0.5">
                        {method.desc}
                      </p>
                    </div>
                  </div>
                </div>

                <span
                  className={`text-sm md:text-base font-extrabold tracking-tight ${
                    isSelected ? "text-[#FF5000]" : "text-gray-900"
                  }`}
                >
                  {method.priceStr}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
