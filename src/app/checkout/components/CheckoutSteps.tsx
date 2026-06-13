import React from "react";
import { Check } from "lucide-react";

interface CheckoutStepsProps {
  currentStep: number;
}

export default function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  const steps = [
    { number: 1, label: "Shipping" },
    { number: 2, label: "Payment" },
    { number: 3, label: "Review & Place Order" },
  ];

  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-3xl mx-auto py-6 mb-8 px-4 gap-4 md:gap-2">
      {steps.map((step, index) => {
        const isCompleted = currentStep > step.number;
        const isActive = currentStep === step.number;

        return (
          <React.Fragment key={step.number}>
            {/* Step item */}
            <div className="flex items-center space-x-3 select-none">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2 ${
                  isCompleted
                    ? "bg-[#FF5000] border-[#FF5000] text-white"
                    : isActive
                    ? "bg-[#FF5000] border-[#FF5000] text-white shadow-md shadow-[#FF5000]/25"
                    : "bg-white border-gray-300 text-gray-500"
                }`}
              >
                {isCompleted ? <Check className="w-5 h-5 stroke-[3]" /> : step.number}
              </div>
              <span
                className={`text-sm md:text-base font-semibold tracking-tight transition-colors duration-300 ${
                  isActive || isCompleted ? "text-gray-900 font-bold" : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Dotted/Dashed Line connector */}
            {index < steps.length - 1 && (
              <div
                className={`hidden md:block flex-1 h-0.5 border-t-2 border-dashed mx-6 transition-colors duration-300 ${
                  currentStep > step.number ? "border-[#FF5000]/50" : "border-gray-250"
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
