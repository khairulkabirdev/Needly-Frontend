import React, { useState } from "react";
import { CreditCard, ChevronDown, Lock, Check } from "lucide-react";

interface PaymentMethodProps {
  paymentOption: string;
  setPaymentOption: (val: string) => void;
  cardName: string;
  setCardName: (val: string) => void;
  cardNumber: string;
  setCardNumber: (val: string) => void;
  cardExpiry: string;
  setCardExpiry: (val: string) => void;
  cardCvv: string;
  setCardCvv: (val: string) => void;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

export default function PaymentMethod({
  paymentOption,
  setPaymentOption,
  cardName,
  setCardName,
  cardNumber,
  setCardNumber,
  cardExpiry,
  setCardExpiry,
  cardCvv,
  setCardCvv,
  isOpen,
  setIsOpen,
}: PaymentMethodProps) {
  return (
    <div className="bg-white border-2 border-gray-100 rounded-[24px] shadow-xs overflow-hidden transition-all duration-300">
      {/* Header Accordion toggler */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50/50 transition-colors focus:outline-hidden text-left"
      >
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 rounded-full bg-[#FF5000] text-white flex items-center justify-center font-bold text-sm">
            3
          </div>
          <h2 className="text-lg md:text-xl font-extrabold text-gray-900 tracking-tight">
            Payment Method
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
          isOpen ? "max-h-[1000px] border-t-2 border-gray-50 p-6 md:p-8" : "max-h-0 overflow-hidden"
        }`}
      >
        <div className="space-y-4">
          {/* Card Option 1: Credit / Debit Card */}
          <div
            className={`border-2 rounded-[18px] transition-all duration-250 select-none overflow-hidden ${
              paymentOption === "card"
                ? "border-[#FF5000] bg-orange-50/5"
                : "border-gray-200"
            }`}
          >
            <div
              onClick={() => setPaymentOption("card")}
              className="p-5 flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    paymentOption === "card"
                      ? "border-[#FF5000] bg-[#FF5000] text-white"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {paymentOption === "card" && (
                    <div className="w-2.5 h-2.5 rounded-full bg-white font-bold" />
                  )}
                </div>

                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2.5 rounded-xl border ${
                      paymentOption === "card"
                        ? "bg-transparent border-[#FF5000]/25 text-[#FF5000]"
                        : "bg-gray-50 border-gray-200 text-gray-500"
                    }`}
                  >
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">
                      Credit / Debit Card
                    </h4>
                  </div>
                </div>
              </div>

              {/* Card Provider Logos */}
              <div className="flex items-center space-x-1.5 shrink-0 bg-white p-1 rounded-lg border border-gray-100 shadow-3xs">
                {/* Visa Logo Badge */}
                <span className="text-[10px] uppercase tracking-widest font-black text-blue-800 px-1 border-r border-gray-150 py-0.5 select-none leading-none">
                  VISA
                </span>
                {/* Mastercard Logo Badge */}
                <span className="text-[10px] uppercase font-bold text-orange-600 px-1 border-r border-gray-150 py-0.5 select-none leading-none">
                  MC
                </span>
                {/* Amex Logo Badge */}
                <span className="text-[10px] uppercase font-extrabold text-teal-600 px-1 py-0.5 select-none leading-none">
                  AMEX
                </span>
              </div>
            </div>

            {/* Sub-Panel: Credit Card Input Forms */}
            {paymentOption === "card" && (
              <div className="border-t border-gray-150/60 p-5 md:p-6 bg-white space-y-5">
                {/* Visual Gold/Black Neutral Metallic Credit Card */}
                <div className="w-full max-w-sm mx-auto bg-gradient-to-tr from-zinc-800 to-zinc-950 border border-zinc-700/60 rounded-2xl p-5 text-zinc-100 shadow-md relative overflow-hidden aspect-[1.586/1] flex flex-col justify-between font-mono animate-fade-in">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-zinc-700/20 via-transparent to-transparent pointer-events-none" />

                  <div className="flex justify-between items-start z-10">
                    <div className="space-y-0.5">
                      <span className="text-[9px] font-black tracking-widest text-zinc-450">NEEDLY CHIP</span>
                      <p className="text-xs font-black tracking-wider text-orange-500">SECURE CONVERT</p>
                    </div>
                    {/* Golden card chip badge */}
                    <div className="w-8 h-6 bg-yellow-600/30 border border-yellow-500/30 rounded-md flex items-center justify-center relative">
                      <div className="absolute inset-1 border border-yellow-400/20 rounded-xs" />
                    </div>
                  </div>

                  {/* Card number preview text */}
                  <div className="text-base md:text-lg font-black tracking-widest text-zinc-200 my-4 z-10 select-all text-center">
                    {cardNumber || "••••  ••••  ••••  ••••"}
                  </div>

                  <div className="flex justify-between items-end z-10">
                    <div className="space-y-0.5">
                      <span className="text-[8px] text-zinc-500 font-bold">CARDHOLDER</span>
                      <p className="text-[10px] font-black uppercase text-zinc-300 truncate max-w-[140px]">
                        {cardName || "William Morris"}
                      </p>
                    </div>
                    <div className="flex space-x-4">
                      <div className="space-y-0.5">
                        <span className="text-[8px] text-zinc-500 font-bold">EXPIRES</span>
                        <p className="text-[10px] font-black text-zinc-350">
                          {cardExpiry || "MM/YY"}
                        </p>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[8px] text-zinc-500 font-bold">CVV</span>
                        <p className="text-[10px] font-black text-zinc-350">
                          {cardCvv || "•••"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actual Form Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="William Morris"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-[12px] text-sm font-semibold placeholder:text-gray-400 focus:border-[#FF5000] focus:ring-0 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">
                      Card Number
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={19}
                      placeholder="4111 2222 3333 4444"
                      value={cardNumber}
                      onChange={(e) => {
                        const val = e.target.value
                          .replace(/\s?/g, "")
                          .replace(/(\d{4})/g, "$1 ")
                          .trim();
                        setCardNumber(val);
                      }}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-[12px] text-sm font-semibold placeholder:text-gray-400 focus:border-[#FF5000] focus:ring-0 outline-none transition-all text-left"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1.5">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={5}
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => {
                          let val = e.target.value.replace(/\//g, "");
                          if (val.length >= 2) {
                            val = val.substring(0, 2) + "/" + val.substring(2);
                          }
                          setCardExpiry(val);
                        }}
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-[12px] text-sm font-semibold placeholder:text-gray-400 focus:border-[#FF5000] focus:ring-0 outline-none transition-all text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1.5">
                        CVV Secure Code
                      </label>
                      <input
                        type="password"
                        required
                        maxLength={3}
                        placeholder="382"
                        value={cardCvv}
                        onChange={(e) =>
                          setCardCvv(e.target.value.replace(/\D/g, ""))
                        }
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-[12px] text-sm font-semibold placeholder:text-gray-400 focus:border-[#FF5000] focus:ring-0 outline-none transition-all text-center"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-[11px] text-gray-405 font-semibold">
                    <Lock className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                    <span>Your connection is active and heavily secured with TLS cryptography.</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Option 2: PayPal */}
          <div
            onClick={() => setPaymentOption("paypal")}
            className={`border-2 rounded-[18px] p-5 flex items-center justify-between cursor-pointer transition-all duration-250 select-none ${
              paymentOption === "paypal"
                ? "border-[#FF5000] bg-orange-50/5"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center space-x-4">
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  paymentOption === "paypal"
                    ? "border-[#FF5000] bg-[#FF5000] text-white"
                    : "border-gray-300 bg-white"
                }`}
              >
                {paymentOption === "paypal" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-white font-bold" />
                )}
              </div>

              <div className="flex items-center space-x-3">
                <div
                  className={`p-2.5 rounded-xl border ${
                    paymentOption === "paypal"
                      ? "bg-transparent border-[#FF5000]/25 text-[#FF5000]"
                      : "bg-gray-50 border-gray-200 text-gray-500"
                  }`}
                >
                  {/* Elegant PayPal text or generic pay icon */}
                  <span className="font-black italic text-xs tracking-tight text-blue-900 leading-none">
                    P
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">PayPal</h4>
                </div>
              </div>
            </div>

            {/* Paypal visual logo */}
            <span className="text-[11px] font-black italic tracking-tighter text-blue-700 bg-blue-50 px-2 py-1 rounded-md border border-blue-100 select-none">
              PayPal
            </span>
          </div>

          {/* Option 3: Cash on Delivery */}
          <div
            onClick={() => setPaymentOption("cod")}
            className={`border-2 rounded-[18px] p-5 flex items-center justify-between cursor-pointer transition-all duration-250 select-none ${
              paymentOption === "cod"
                ? "border-[#FF5000] bg-orange-50/5"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center space-x-4">
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  paymentOption === "cod"
                    ? "border-[#FF5000] bg-[#FF5000] text-white"
                    : "border-gray-300 bg-white"
                }`}
              >
                {paymentOption === "cod" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-white font-bold" />
                )}
              </div>

              <div className="flex items-center space-x-3">
                <div
                  className={`p-2.5 rounded-xl border ${
                    paymentOption === "cod"
                      ? "bg-transparent border-[#FF5000]/25 text-[#FF5000]"
                      : "bg-gray-50 border-gray-200 text-gray-500"
                  }`}
                >
                  <span className="font-bold text-xs">$$</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">
                    Cash on Delivery
                  </h4>
                  <p className="text-[11px] text-gray-400 font-semibold mt-0.5">
                    Pay when you receive your order
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
