import React, { useState } from "react";
import { ArrowLeft, Clock, CheckCircle2, ShoppingBag } from "lucide-react";
import { CartItem } from "../../types";

// Component imports
import CheckoutSteps from "./components/CheckoutSteps";
import ShippingInformation from "./components/ShippingInformation";
import ShippingMethod from "./components/ShippingMethod";
import PaymentMethod from "./components/PaymentMethod";
import OrderSummary from "./components/OrderSummary";
import FreeShippingBanner from "./components/FreeShippingBanner";

interface CheckoutPageProps {
  cart: CartItem[];
  cartSubtotal: number;
  couponDiscount: number;
  isCouponApplied: boolean;
  onApplyCoupon: (discount: number) => void;
  onClearCart: () => void;
  onNavigateBack: () => void;
}

export default function CheckoutPage({
  cart,
  cartSubtotal,
  couponDiscount,
  isCouponApplied,
  onApplyCoupon,
  onClearCart,
  onNavigateBack,
}: CheckoutPageProps) {
  // Page step progress: 1: Information, 2: Complete
  const [step, setStep] = useState(1);

  // Accordion active fold states
  const [isShippingOpen, setIsShippingOpen] = useState(true);
  const [isShippingMethodOpen, setIsShippingMethodOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  // Shipping form fields
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateProv, setStateProv] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [saveNewAddress, setSaveNewAddress] = useState(true);

  // Shipping Method selection
  const [shippingMethod, setShippingMethod] = useState("standard");

  // Payment method selection
  const [paymentOption, setPaymentOption] = useState("card");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  // Get shipping cost based on selection
  const getShippingCost = () => {
    if (shippingMethod === "express") return 6.99;
    if (shippingMethod === "overnight") return 12.99;
    return 0;
  };

  const shippingCost = getShippingCost();
  // Dynamic 10% coupon WELCOME10 logic matching screenshot subtotal calculations
  const totalDiscount = isCouponApplied ? Number((cartSubtotal * 0.10).toFixed(2)) : 0;
  const grandTotal = Number((cartSubtotal - totalDiscount + shippingCost).toFixed(2));

  // Determine current CTA banner button action and text
  const getCtaButtonText = () => {
    if (isShippingOpen) return "Continue to Shipping Method";
    if (isShippingMethodOpen) return "Continue to Payment";
    return `Pay $${grandTotal.toFixed(2)}`;
  };

  const handleCtaClick = () => {
    setValidationError(null);
    if (isShippingOpen) {
      if (!fullName || !phone || !address || !city || !stateProv || !zipCode) {
        // Automatically open & focus on shipping info
        setIsShippingOpen(true);
        setValidationError("Please complete all shipping address fields first.");
        return;
      }
      setIsShippingOpen(false);
      setIsShippingMethodOpen(true);
    } else if (isShippingMethodOpen) {
      setIsShippingMethodOpen(false);
      setIsPaymentOpen(true);
    } else if (isPaymentOpen) {
      if (paymentOption === "card" && (!cardName || !cardNumber || !cardExpiry || !cardCvv)) {
        setValidationError("Please fill in all required credit card payment details.");
        return;
      }
      handleSubmitOrder();
    } else {
      // Fallback: cycle back or reset
      setIsShippingOpen(true);
    }
  };

  const handleSubmitOrder = () => {
    setStep(3); // Success Screen step
    onClearCart();
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center animate-fade-in flex flex-col items-center">
        <div className="inline-flex p-6 bg-orange-100/30 border-2 border-orange-100 text-[#FF5000] rounded-full mb-6">
          <ShoppingBag className="w-12 h-12 stroke-[1.8]" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-2">
          Your Shopping Cart is Empty
        </h2>
        <p className="text-gray-400 font-semibold max-w-md mx-auto mb-8 text-sm">
          You don't have any merchandise items loaded for purchase checkout. Discover something unique in our catalog first!
        </p>
        <button
          onClick={onNavigateBack}
          className="bg-[#FF5000] hover:bg-[#E04600] text-white font-extrabold text-sm py-4 px-8 rounded-2xl shadow-md shadow-[#FF5000]/25 transition-all text-center cursor-pointer"
        >
          Return to Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in" id="needly-checkout-body">
      {/* 1. Back button navigation */}
      {step < 3 && (
        <button
          onClick={onNavigateBack}
          className="flex items-center space-x-2 text-xs md:text-sm font-extrabold text-gray-400 hover:text-gray-900 mb-8 group transition-colors cursor-pointer focus:outline-hidden"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform stroke-[2.5]" />
          <span>Continue Shopping</span>
        </button>
      )}

      {/* 2. Visual Top Step Tracking Indicators */}
      {step < 3 && <CheckoutSteps currentStep={isShippingOpen ? 1 : isShippingMethodOpen ? 2 : 2} />}

      {/* Validation error visual banner */}
      {step < 3 && validationError && (
        <div className="max-w-7xl mx-auto bg-red-50 border border-red-150 rounded-2xl p-4 mb-6 flex items-center space-x-3 text-red-800 text-xs font-bold font-mono uppercase animate-fade-in shadow-3xs">
          <span className="w-5 h-5 rounded-full bg-red-100 text-red-650 flex items-center justify-center font-extrabold shrink-0">!</span>
          <span>{validationError}</span>
        </div>
      )}

      {step === 3 ? (
        /* 3. SUCCESS / CONFIRMATION VIEW */
        <div className="max-w-2xl mx-auto bg-white border-2 border-gray-100 rounded-[32px] p-8 md:p-12 text-center shadow-md animate-fade-in relative overflow-hidden">
          {/* Confirmed check circle */}
          <div className="inline-flex p-6 bg-emerald-100/40 text-emerald-600 border-2 border-emerald-100 rounded-full mb-6 relative">
            <CheckCircle2 className="w-16 h-16 stroke-[2]" />
            <span className="absolute -top-1.5 -right-1.5 bg-[#FF5000] text-white text-[10px] px-2.5 py-0.5 rounded-full font-black tracking-wider uppercase select-none leading-none border border-white">
              PAID
            </span>
          </div>

          <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-3">
            Thank you for your order!
          </h1>
          <p className="text-gray-400 font-semibold mb-8 text-sm md:text-base">
            Your payment was processed successfully. Order reference ID is{" "}
            <span className="text-[#FF5000] font-black">
              #NDL-{(Math.random() * 900000 + 100000).toFixed(0)}
            </span>
          </p>

          <div className="bg-gray-50 border-2 border-gray-105 rounded-[20px] p-6 text-left space-y-3 font-semibold text-xs text-gray-500 mb-8 md:px-8">
            <div className="flex justify-between border-b border-gray-150/60 pb-3">
              <span>Customer Recipient</span>
              <span className="font-extrabold text-gray-900">
                {fullName || "William Morris"}
              </span>
            </div>
            <div className="flex justify-between border-b border-gray-150/60 pb-3">
              <span>Postal Destination</span>
              <span className="font-extrabold text-gray-900 max-w-[280px] truncate">
                {address || "742 Evergreen Terrace"}, {city || "Springfield"}
              </span>
            </div>
            <div className="flex justify-between border-b border-gray-150/60 pb-3">
              <span>Contact Phone</span>
              <span className="font-extrabold text-gray-900">{phone || "+1 555-019-2831"}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Delivery ETA</span>
              <span className="font-extrabold text-emerald-700 flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5" />
                <span>
                  {shippingMethod === "standard"
                    ? "3 - 5 Business Days"
                    : shippingMethod === "express"
                    ? "1 - 2 Business Days"
                    : "Overnight Delivery Tomorrow"}
                </span>
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={onNavigateBack}
              className="w-full bg-[#FF5000] hover:bg-[#E04600] active:bg-[#C83E00] text-white font-extrabold text-base py-4 rounded-2xl shadow-md shadow-[#FF5000]/20 transition-all text-center cursor-pointer"
            >
              Continue Shopping
            </button>
            <p className="text-xs text-gray-400 font-semibold">
              An electronic copy of this receipt has been dispatched to your correspondence email.
            </p>
          </div>
        </div>
      ) : (
        /* 4. DUAL COLUMN CHECKOUT ENGINE */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Shipping details entry forms */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
              Checkout
            </h1>

            {/* Accordion List Segment */}
            <div className="space-y-4">
              {/* Shipping Address step form */}
              <ShippingInformation
                fullName={fullName}
                setFullName={setFullName}
                phone={phone}
                setPhone={setPhone}
                address={address}
                setAddress={setAddress}
                city={city}
                setCity={setCity}
                stateProv={stateProv}
                setStateProv={setStateProv}
                zipCode={zipCode}
                setZipCode={setZipCode}
                saveNewAddress={saveNewAddress}
                setSaveNewAddress={setSaveNewAddress}
                isOpen={isShippingOpen}
                setIsOpen={(val) => {
                  setIsShippingOpen(val);
                  if (val) {
                    setIsShippingMethodOpen(false);
                    setIsPaymentOpen(false);
                  }
                }}
              />

              {/* Shipping Carrier service method step selector */}
              <ShippingMethod
                shippingMethod={shippingMethod}
                setShippingMethod={setShippingMethod}
                isOpen={isShippingMethodOpen}
                setIsOpen={(val) => {
                  setIsShippingMethodOpen(val);
                  if (val) {
                    setIsShippingOpen(false);
                    setIsPaymentOpen(false);
                  }
                }}
              />

              {/* Payment details options step card */}
              <PaymentMethod
                paymentOption={paymentOption}
                setPaymentOption={setPaymentOption}
                cardName={cardName}
                setCardName={setCardName}
                cardNumber={cardNumber}
                setCardNumber={setCardNumber}
                cardExpiry={cardExpiry}
                setCardExpiry={setCardExpiry}
                cardCvv={cardCvv}
                setCardCvv={setCardCvv}
                isOpen={isPaymentOpen}
                setIsOpen={(val) => {
                  setIsPaymentOpen(val);
                  if (val) {
                    setIsShippingOpen(false);
                    setIsShippingMethodOpen(false);
                  }
                }}
              />
            </div>

            {/* Bottom Status Progress Ribbon Banner with primary CTA trigger */}
            <FreeShippingBanner
              cartSubtotal={cartSubtotal}
              onButtonClick={handleCtaClick}
              buttonText={getCtaButtonText()}
            />
          </div>

          {/* RIGHT SIDEBAR: Live recalculation checkout totals list */}
          <div className="lg:col-span-5">
            <OrderSummary
              cart={cart}
              cartSubtotal={cartSubtotal}
              couponDiscount={couponDiscount}
              isCouponApplied={isCouponApplied}
              onApplyCoupon={onApplyCoupon}
              shippingCost={shippingCost}
            />
          </div>
        </div>
      )}
    </div>
  );
}
