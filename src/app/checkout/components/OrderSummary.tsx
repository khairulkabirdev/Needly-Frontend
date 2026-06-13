import React, { useState } from "react";
import { ChevronDown, Tag, ShieldCheck, Truck, RotateCcw, AlertCircle, HelpCircle } from "lucide-react";
import { CartItem } from "../../../types";

interface OrderSummaryProps {
  cart: CartItem[];
  cartSubtotal: number;
  couponDiscount: number;
  isCouponApplied: boolean;
  onApplyCoupon: (discount: number) => void;
  shippingCost: number;
}

export default function OrderSummary({
  cart,
  cartSubtotal,
  couponDiscount,
  isCouponApplied,
  onApplyCoupon,
  shippingCost,
}: OrderSummaryProps) {
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(true);
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponMsg, setCouponMsg] = useState("");

  const totalItems = cart.reduce((tot, item) => tot + item.quantity, 0);

  // Dynamic values that match the screenshot
  const discountAmount = isCouponApplied ? Number((cartSubtotal * 0.10).toFixed(2)) : 0;
  const netTotal = Number((cartSubtotal - discountAmount + shippingCost).toFixed(2));

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    setCouponMsg("");

    const cleanCode = couponCode.trim().toUpperCase();
    if (cleanCode === "WELCOME10") {
      onApplyCoupon(Number((cartSubtotal * 0.10).toFixed(2)));
      setCouponMsg("Success! 'WELCOME10' 10% discount applied.");
      setCouponCode("");
    } else if (cleanCode === "") {
      setCouponError("Please enter a code");
    } else {
      setCouponError("Invalid promo code. Try 'WELCOME10'!");
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Main Order Summary Card */}
      <div className="bg-white border-2 border-gray-100 rounded-[24px] shadow-xs overflow-hidden transition-all duration-305">
        {/* Card Header toggle button */}
        <button
          type="button"
          onClick={() => setIsSummaryExpanded(!isSummaryExpanded)}
          className="w-full flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50/50 transition-colors focus:outline-hidden text-left"
        >
          <div className="flex items-center space-x-2">
            <h3 className="text-lg md:text-xl font-extrabold text-[#111111] tracking-tight">
              Order Summary
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-extrabold text-[#FF5000]">
              {totalItems} {totalItems === 1 ? "Item" : "Items"}
            </span>
            <ChevronDown
              className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                isSummaryExpanded ? "rotate-180" : ""
              }`}
            />
          </div>
        </button>

        {/* Card Items body list */}
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isSummaryExpanded ? "max-h-[800px] border-t-2 border-gray-50 p-6 space-y-5" : "max-h-0"
          }`}
        >
          {/* Cart Item Row list */}
          <div className="divide-y divide-gray-100/60 max-h-[300px] overflow-y-auto pr-1">
            {cart.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedColor}`}
                className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
              >
                <div className="flex items-center space-x-4">
                  {/* Thumbnail */}
                  <div className="w-16 h-16 bg-gray-50 border-2 border-gray-100 rounded-xl p-2 flex items-center justify-center shrink-0">
                    <img
                      src={item.product.imageUrl}
                      alt=""
                      className="max-h-full max-w-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 leading-snug">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-gray-400 font-semibold mt-1">
                      {item.selectedColor || "Black"}
                    </p>
                    <p className="text-xs text-gray-400 font-semibold mt-0.5">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>

                <span className="text-sm md:text-base font-extrabold text-gray-900 shrink-0">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing breakdown Details */}
          <div className="border-t-2 border-dashed border-gray-100 pt-5 space-y-3.5">
            <div className="flex justify-between text-sm text-gray-500 font-bold">
              <span>Subtotal</span>
              <span className="text-gray-900 font-extrabold">
                ${cartSubtotal.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between text-sm text-gray-500 font-bold">
              <span>Shipping</span>
              <span className="text-emerald-600 font-extrabold">
                {shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}
              </span>
            </div>

            {isCouponApplied && (
              <div className="flex justify-between text-sm text-[#FF5000] font-bold">
                <span>Discount (WELCOME10)</span>
                <span className="font-extrabold">-${discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="border-t border-gray-100 pt-4 flex justify-between items-baseline">
              <span className="text-base font-extrabold text-[#111111]">Total</span>
              <span className="text-2xl md:text-3xl font-black text-[#FF5000] tracking-tight">
                ${netTotal.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Coupon inputs segment inside summary block */}
          <div className="border-t border-gray-100 pt-5">
            <p className="text-xs font-bold text-gray-500 mb-2">Have a coupon code?</p>
            <form onSubmit={handleApply} className="flex gap-2.5">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 px-4 py-3 bg-white border-2 border-gray-200 rounded-[12px] text-sm font-semibold placeholder:text-gray-400 focus:border-[#FF5000] focus:ring-0 outline-none transition-all"
              />
              <button
                type="submit"
                className="px-5 py-3 border-2 border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 text-gray-700 font-bold text-xs rounded-[12px] transition-colors cursor-pointer"
              >
                Apply
              </button>
            </form>
            {couponError && (
              <p className="text-xs text-red-600 font-semibold mt-2 flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{couponError}</span>
              </p>
            )}
            {couponMsg && (
              <p className="text-xs text-emerald-600 font-bold mt-2 flex items-center space-x-1">
                <Tag className="w-3.5 h-3.5" />
                <span>{couponMsg}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 2. Secure checkout warning banner */}
      <div className="bg-orange-50/10 border-2 border-orange-100 rounded-[20px] p-5 flex items-start space-x-4">
        <div className="p-2.5 bg-orange-50 rounded-xl text-[#FF5000] shrink-0">
          <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-gray-900 leading-none">
            Secure Checkout
          </h4>
          <p className="text-xs text-gray-400 font-semibold leading-relaxed">
            Your payment information is 100% secure and encrypted.
          </p>
        </div>
      </div>

      {/* 3. Global store standard trust badges lists */}
      <div className="bg-white border-2 border-gray-100 rounded-[24px] p-6 space-y-5 shadow-xs">
        {/* Badge 1 */}
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-orange-50 rounded-2xl text-[#FF5000] shrink-0">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h5 className="text-xs font-black text-gray-900">Free Shipping</h5>
            <p className="text-[11px] text-gray-400 font-semibold mt-0.5">On orders over $50</p>
          </div>
        </div>
        {/* Badge 2 */}
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-orange-50 rounded-2xl text-[#FF5000] shrink-0">
            <RotateCcw className="w-6 h-6" />
          </div>
          <div>
            <h5 className="text-xs font-black text-gray-900">30-Day Returns</h5>
            <p className="text-[11px] text-gray-400 font-semibold mt-0.5">Easy returns & refunds</p>
          </div>
        </div>
        {/* Badge 3 */}
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-orange-50 rounded-2xl text-[#FF5000] shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h5 className="text-xs font-black text-gray-900">Secure Payment</h5>
            <p className="text-[11px] text-gray-400 font-semibold mt-0.5">100% secure payment</p>
          </div>
        </div>
        {/* Badge 4 */}
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-orange-50 rounded-2xl text-[#FF5000] shrink-0">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h5 className="text-xs font-black text-gray-900">24/7 Support</h5>
            <p className="text-[11px] text-gray-400 font-semibold mt-0.5">We're here to help</p>
          </div>
        </div>
      </div>
    </div>
  );
}
