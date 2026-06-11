import React, { useState } from "react";
import { 
  ArrowLeft, 
  CreditCard, 
  Truck, 
  ShoppingBag, 
  CheckCircle2, 
  Lock, 
  Percent, 
  MapPin, 
  User, 
  Mail, 
  Phone,
  Gift,
  HelpCircle,
  Clock
} from "lucide-react";
import { CartItem } from "../../types";

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
  onNavigateBack
}: CheckoutPageProps) {
  // Step indicator state
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Complete
  
  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");

  const [paymentOption, setPaymentOption] = useState("card"); // card | paypal | apple
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const [customCoupon, setCustomCoupon] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponMsg, setCouponMsg] = useState("");

  // Courier state
  const [shippingMethod, setShippingMethod] = useState("standard"); // standard ($0) | premium ($4.99)

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    setCouponMsg("");

    const code = customCoupon.trim().toUpperCase();
    if (code === "WELCOME10") {
      onApplyCoupon(10);
      setCouponMsg("Success! $10.00 discount applied.");
      setCustomCoupon("");
    } else if (code === "NEEDLY5") {
      onApplyCoupon(5);
      setCouponMsg("Success! $5.00 discount applied.");
      setCustomCoupon("");
    } else if (code === "FREESHIP") {
      setCouponMsg("Success! Free shipping discount applied.");
      setShippingMethod("standard"); 
      setCustomCoupon("");
    } else {
      setCouponError("Invalid or expired code. Try 'WELCOME10'!");
    }
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
    // Submit order & purge cart
    onClearCart();
  };

  // Calculations
  const shippingCost = shippingMethod === "premium" ? 4.99 : 0.00;
  const subtotalWithDiscount = Math.max(0, cartSubtotal - couponDiscount);
  const taxes = subtotalWithDiscount * 0.0825; // 8.25% sales tax
  const checkoutTotal = subtotalWithDiscount + taxes + shippingCost;

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center animate-fade-in">
        <div className="inline-flex p-4.5 bg-gray-50 border border-gray-150 rounded-full text-gray-400 mb-6">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-xl font-extrabold text-gray-900 mb-2">No Curated Needs in Bag</h2>
        <p className="text-xs text-gray-500 font-mono max-w-sm mx-auto mb-6">
          Your shopping bag appears to be empty. Explore our catalog of limited hardware and devices to populate.
        </p>
        <button
          onClick={onNavigateBack}
          className="bg-black hover:bg-zinc-900 text-white text-xs font-bold font-mono uppercase tracking-widest px-6 py-3 rounded-lg cursor-pointer"
        >
          RETURN TO CATALOG
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in" id="checkout-view">
      {/* Breadcrumb back */}
      {step < 3 && (
        <button 
          onClick={onNavigateBack}
          className="flex items-center space-x-1.5 text-xs font-bold font-mono text-gray-500 hover:text-black mb-6 group cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>BACK TO CATALOG</span>
        </button>
      )}

      {/* Step Indicators */}
      <div className="flex items-center justify-between max-w-xl mx-auto mb-10">
        <div className="flex flex-col items-center space-y-1">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-extrabold border ${
            step >= 1 ? "bg-black text-white border-black" : "bg-white text-gray-400 border-gray-200"
          }`}>
            01
          </div>
          <span className="text-[10px] font-bold font-mono text-gray-600">DELIVERY</span>
        </div>
        <div className={`flex-1 h-0.5 mx-2 border-t border-dashed ${step >= 2 ? "border-black" : "border-gray-250"}`} />
        <div className="flex flex-col items-center space-y-1">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-extrabold border ${
            step >= 2 ? "bg-black text-white border-black" : "bg-white text-gray-400 border-gray-200"
          }`}>
            02
          </div>
          <span className="text-[10px] font-bold font-mono text-gray-650">PAYMENT</span>
        </div>
        <div className={`flex-1 h-0.5 mx-2 border-t border-dashed ${step >= 3 ? "border-black" : "border-gray-250"}`} />
        <div className="flex flex-col items-center space-y-1">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-extrabold border ${
            step >= 3 ? "bg-black text-white border-black" : "bg-white text-gray-400 border-gray-200"
          }`}>
            03
          </div>
          <span className="text-[10px] font-bold font-mono text-gray-600">COMPLETE</span>
        </div>
      </div>

      {step === 3 ? (
        /* SUCCESS PAGE */
        <div className="max-w-xl mx-auto bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-lg animate-fade-in">
          <div className="inline-flex p-4.5 bg-emerald-50 border border-emerald-150 text-emerald-600 rounded-full mb-6 relative">
            <CheckCircle2 className="w-12 h-12" />
            <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] px-1.5 py-0.5 rounded-full font-mono font-bold">
              PAID
            </span>
          </div>

          <h1 className="text-2xl font-black text-gray-900 tracking-tight mb-2">Order Confirmed!</h1>
          <p className="text-xs text-gray-500 font-mono mb-6">
            ORDER REFERENCE: <span className="text-black font-black">#NDL-{(Math.random() * 900000 + 100000).toFixed(0)}</span>
          </p>

          <div className="bg-gray-50 border border-gray-150 rounded-xl p-4 text-left space-y-3 font-mono text-xs mb-8">
            <div className="flex justify-between border-b border-gray-150/60 pb-2">
              <span className="text-gray-400">Recipient:</span>
              <span className="font-bold text-gray-900">{firstName} {lastName}</span>
            </div>
            <div className="flex justify-between border-b border-gray-150/60 pb-2">
              <span className="text-gray-400">Postal Address:</span>
              <span className="font-bold text-gray-900 max-w-[250px] truncate text-right">{address}, {city}</span>
            </div>
            <div className="flex justify-between border-b border-gray-150/60 pb-2">
              <span className="text-gray-400">Registered Mail:</span>
              <span className="font-bold text-gray-900">{email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Courier Arrival:</span>
              <span className="font-bold text-teal-800 flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{shippingMethod === "premium" ? "Overnight Tomorrow" : "2-3 Business Days"}</span>
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={onNavigateBack}
              className="w-full bg-black hover:bg-zinc-900 text-white text-xs font-bold font-mono py-3.5 rounded-xl uppercase tracking-widest cursor-pointer"
            >
              KEEP DISCOVERING
            </button>
            <p className="text-[10px] text-gray-400 font-mono">
              An electronic copy of this receipt has been dispatched to {email || "your inbox"}.
            </p>
          </div>
        </div>
      ) : (
        /* CHECKOUT FORMS SECTION */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Block: Forms */}
          <div className="lg:col-span-7">
            {step === 1 ? (
              /* SHIPPING FORM */
              <div className="bg-white border border-gray-200/80 rounded-2xl p-6.5 shadow-3xs">
                <h2 className="text-sm font-bold tracking-widest font-mono text-gray-900 flex items-center space-x-2 pb-4 border-b border-gray-100 mb-6 uppercase">
                  <Truck className="w-4.5 h-4.5 text-gray-600" />
                  <span>01. Correspondence Address</span>
                </h2>

                <form onSubmit={handleStep1Submit} className="space-y-4 text-xs font-mono">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-500 mb-1">FIRST NAME</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-3.5 h-3.5 text-gray-400" />
                        <input
                          type="text"
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="William"
                          className="w-full bg-white border border-gray-350 rounded-xl pl-9 pr-3 py-2.5 outline-none font-bold placeholder:font-normal focus:border-black focus:ring-1 focus:ring-black"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-500 mb-1">LAST NAME</label>
                      <input
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Morris"
                        className="w-full bg-white border border-gray-350 rounded-xl px-3 py-2.5 outline-none font-bold placeholder:font-normal focus:border-black focus:ring-1 focus:ring-black"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-500 mb-1">CONTACT EMAIL</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-3.5 h-3.5 text-gray-400" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="client@needly.co"
                          className="w-full bg-white border border-gray-350 rounded-xl pl-9 pr-3 py-2.5 outline-none font-bold placeholder:font-normal focus:border-black focus:ring-1 focus:ring-black"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-500 mb-1">MOBILE CONTACT</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 w-3.5 h-3.5 text-gray-400" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+1 555-019-2831"
                          className="w-full bg-white border border-gray-350 rounded-xl pl-9 pr-3 py-2.5 outline-none font-bold placeholder:font-normal focus:border-black focus:ring-1 focus:ring-black"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-500 mb-1">STREET ADDRESS</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-3.5 h-3.5 text-gray-400" />
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="742 Evergreen Terrace"
                        className="w-full bg-white border border-gray-350 rounded-xl pl-9 pr-3 py-2.5 outline-none font-bold placeholder:font-normal focus:border-black focus:ring-1 focus:ring-black"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-500 mb-1">TOWN / CITY</label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Springfield"
                        className="w-full bg-white border border-gray-350 rounded-xl px-3 py-2.5 outline-none font-bold placeholder:font-normal focus:border-black focus:ring-1 focus:ring-black"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-500 mb-1">ZIP / POSTCODE</label>
                      <input
                        type="text"
                        required
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        placeholder="62704"
                        className="w-full bg-white border border-gray-350 rounded-xl px-3 py-2.5 outline-none font-bold placeholder:font-normal focus:border-black focus:ring-1 focus:ring-black"
                      />
                    </div>
                  </div>

                  {/* Shipping Options */}
                  <div className="space-y-2.5 pt-4 border-t border-gray-100">
                    <label className="block text-[10px] font-black text-gray-400 tracking-wider">COURIER FLIGHT CLASS</label>
                    <div className="grid grid-cols-2 gap-3">
                      <label className={`border rounded-xl p-3.5 flex items-start space-x-3 cursor-pointer select-none transition-all ${
                        shippingMethod === "standard" ? "border-black ring-2 ring-black/5 bg-gray-50/20" : "border-gray-200 hover:border-gray-300"
                      }`}>
                        <input
                          type="radio"
                          name="shipping"
                          value="standard"
                          checked={shippingMethod === "standard"}
                          onChange={() => setShippingMethod("standard")}
                          className="mt-0.5 accent-black"
                        />
                        <div>
                          <p className="font-bold text-gray-900 text-xs">Standard Freight</p>
                          <p className="text-[10px] text-gray-450 font-normal mt-0.5">2-3 Business Days • Free</p>
                        </div>
                      </label>

                      <label className={`border rounded-xl p-3.5 flex items-start space-x-3 cursor-pointer select-none transition-all ${
                        shippingMethod === "premium" ? "border-black ring-2 ring-black/5 bg-gray-50/20" : "border-gray-200 hover:border-gray-300"
                      }`}>
                        <input
                          type="radio"
                          name="shipping"
                          value="premium"
                          checked={shippingMethod === "premium"}
                          onChange={() => setShippingMethod("premium")}
                          className="mt-0.5 accent-black"
                        />
                        <div>
                          <p className="font-bold text-gray-900 text-xs">Priority Air-Post</p>
                          <p className="text-[10px] text-gray-450 font-normal mt-0.5">Overnight Priority • $4.99</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-black hover:bg-zinc-900 text-white font-bold py-3.5 rounded-xl uppercase tracking-wider font-mono mt-4 cursor-pointer"
                  >
                    CONTINUE TO PAYMENT PORT
                  </button>
                </form>
              </div>
            ) : (
              /* PAYMENT FORM WITH VISUAL MOCK CREDIT CARD */
              <div className="bg-white border border-gray-200/80 rounded-2xl p-6.5 shadow-3xs space-y-6">
                <h2 className="text-sm font-bold tracking-widest font-mono text-gray-900 flex items-center space-x-2 pb-4 border-b border-gray-100 uppercase">
                  <CreditCard className="w-4.5 h-4.5 text-gray-600" />
                  <span>02. Electronic Payment Gate</span>
                </h2>

                {/* VISUAL GOLD/BLACK NEUTRAL METALLIC CREDIT CARD */}
                <div className="w-full max-w-sm mx-auto bg-gradient-to-tr from-zinc-800 to-zinc-950 border border-zinc-700/60 rounded-2xl p-5 text-zinc-100 shadow-md relative overflow-hidden aspect-[1.586/1] flex flex-col justify-between font-mono">
                  {/* Subtle decorative grain overlays */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-zinc-700/20 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="flex justify-between items-start z-10">
                    <div className="space-y-0.5">
                      <span className="text-[9px] font-black tracking-widest text-zinc-400">NEEDLEY MEMBER ID</span>
                      <p className="text-xs font-black tracking-wider text-yellow-500">EXCL PREMIUM</p>
                    </div>
                    <div className="w-7.5 h-5 bg-yellow-600/40 border border-yellow-500/20 rounded-md flex items-center justify-center relative">
                      <div className="absolute inset-1.5 border border-yellow-400/20 rounded-xs" />
                    </div>
                  </div>

                  {/* Card number placeholder/input */}
                  <p className="text-lg font-bold tracking-widest text-zinc-200 my-4 z-10 select-all">
                    {cardNumber || "••••  ••••  ••••  ••••"}
                  </p>

                  <div className="flex justify-between items-end z-10">
                    <div className="space-y-0.5">
                      <span className="text-[8px] text-zinc-500 font-bold">CARDHOLDER</span>
                      <p className="text-[10px] font-black uppercase text-zinc-300 truncate max-w-[150px]">
                        {cardName || "William Morris"}
                      </p>
                    </div>
                    <div className="flex space-x-4">
                      <div className="space-y-0.5">
                        <span className="text-[8px] text-zinc-500 font-bold">EXPIRES</span>
                        <p className="text-[10px] font-black text-zinc-350">{cardExpiry || "MM/YY"}</p>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[8px] text-zinc-500 font-bold">CVV</span>
                        <p className="text-[10px] font-black text-zinc-350">{cardCvv || "•••"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleStep2Submit} className="space-y-4 text-xs font-mono">
                  <div>
                    <label className="block text-gray-500 mb-1">CARDHOLDER FULL NAME</label>
                    <input
                      type="text"
                      required
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="William Morris"
                      className="w-full bg-white border border-gray-350 rounded-xl px-3 py-2.5 outline-none font-bold placeholder:font-normal focus:border-black focus:ring-1 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-500 mb-1">CARD NUMBER</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-3 w-3.5 h-3.5 text-gray-400" />
                      <input
                        type="text"
                        required
                        maxLength={19}
                        value={cardNumber}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
                          setCardNumber(val);
                        }}
                        placeholder="4111 2222 3333 4444"
                        className="w-full bg-white border border-gray-350 rounded-xl pl-9 pr-3 py-2.5 outline-none font-bold placeholder:font-normal focus:border-black focus:ring-1 focus:ring-black"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-500 mb-1">EXPIRY DATE</label>
                      <input
                        type="text"
                        required
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) => {
                          let val = e.target.value.replace(/\//g, '');
                          if (val.length >= 2) {
                            val = val.substring(0, 2) + '/' + val.substring(2);
                          }
                          setCardExpiry(val);
                        }}
                        placeholder="MM/YY"
                        className="w-full bg-white border border-gray-350 rounded-xl px-3 py-2.5 outline-none font-bold placeholder:font-normal focus:border-black focus:ring-1 focus:ring-black text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-500 mb-1">CVV SECURE CODE</label>
                      <input
                        type="password"
                        required
                        maxLength={3}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                        placeholder="382"
                        className="w-full bg-white border border-gray-350 rounded-xl px-3 py-2.5 outline-none font-bold placeholder:font-normal focus:border-black focus:ring-1 focus:ring-black text-center"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 pt-2 text-[10px] text-gray-400">
                    <Lock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Your connection is heavily secured natively via 256-bit TLS key.</span>
                  </div>

                  <div className="flex items-center space-x-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-3.5 px-4 rounded-xl uppercase tracking-wider font-mono cursor-pointer"
                    >
                      Address Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-black hover:bg-zinc-900 text-white font-bold py-3.5 rounded-xl uppercase tracking-wider font-mono cursor-pointer shadow-xs hover:shadow-sm"
                    >
                      PLACE ORDER (${checkoutTotal.toFixed(2)})
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Right Block: Cart summary item lists & discount vouchers */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-3xs">
              <h3 className="text-xs font-bold font-mono tracking-widest text-gray-400 pb-3 border-b border-gray-100 mb-4 uppercase">
                YOUR EXCLUSIVE BAG ({cart.reduce((tot, ci) => tot + ci.quantity, 0)} ITEMS)
              </h3>

              {/* Items directory */}
              <div className="divide-y divide-gray-100 max-h-60 overflow-y-auto pr-1 mb-4">
                {cart.map((item) => (
                  <div key={`${item.product.id}-${item.selectedColor}`} className="py-2.5 flex items-center justify-between">
                    <div className="flex items-center space-x-3 overflow-hidden">
                      <div className="w-12 h-12 bg-gray-50 border border-gray-150 rounded-lg p-1.5 flex items-center justify-center shrink-0">
                        <img 
                          src={item.product.imageUrl} 
                          alt="" 
                          className="max-h-full max-w-full object-contain"
                          referrerPolicy="no-referrer" 
                        />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs font-black text-gray-900 truncate leading-tight">{item.product.name}</p>
                        <p className="text-[10px] text-gray-400 font-mono italic">Color: {item.selectedColor} • Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold font-mono text-gray-900 ml-4 shrink-0">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Coupon Form input */}
              <div className="border-t border-gray-100 pt-4 mb-4">
                <form onSubmit={handleCouponSubmit} className="flex space-x-2">
                  <input
                    type="text"
                    value={customCoupon}
                    onChange={(e) => setCustomCoupon(e.target.value)}
                    placeholder="ENTER VOUCHER V4"
                    className="flex-1 bg-gray-50 border border-gray-350 rounded-lg px-3 py-2 text-xs font-bold uppercase placeholder:font-normal outline-none focus:bg-white focus:border-black"
                  />
                  <button 
                    type="submit" 
                    className="bg-black hover:bg-zinc-900 text-white text-[10px] font-bold font-mono uppercase px-4 rounded-lg cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
                {couponError && <p className="text-[10px] text-red-650 font-mono mt-1.5">{couponError}</p>}
                {couponMsg && <p className="text-[10px] text-emerald-600 font-mono mt-1.5 font-bold">{couponMsg}</p>}
                {isCouponApplied && (
                  <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-lg p-2 text-[10px] font-medium flex items-center justify-between mt-2 font-mono">
                    <span>ACTIVE VOUCHER DISCOUNT</span>
                    <span>-$10.00 SAVED</span>
                  </div>
                )}
              </div>

              {/* Tax & totals breakout detail */}
              <div className="border-t border-gray-100 pt-4 space-y-2.5 font-mono text-xs">
                <div className="flex justify-between text-gray-400">
                  <span>Bag Subtotal:</span>
                  <span className="text-gray-900 font-bold">${cartSubtotal.toFixed(2)}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-800">
                    <span>Promo Deducts:</span>
                    <span className="font-extrabold">-${couponDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-400">
                  <span>Sales Tax (8.25%):</span>
                  <span className="text-gray-900 font-bold">${taxes.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Registered Postage:</span>
                  <span className="text-gray-900 font-bold">
                    {shippingCost === 0 ? "FREE FREIGHT" : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                
                <div className="border-t border-dashed border-gray-200 pt-3 flex justify-between items-baseline text-black">
                  <span className="font-bold text-gray-900">NET CONVERSION VALUE:</span>
                  <span className="text-lg font-black">${checkoutTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="bg-orange-50/50 border border-orange-100 rounded-xl p-4 flex items-start space-x-3 text-[10px] text-orange-900 font-mono">
              <Gift className="w-5 h-5 text-orange-600 shrink-0" />
              <div className="space-y-0.5">
                <p className="font-black">NEEDLY VIBRANT BONUS PACKAGE</p>
                <p className="text-orange-950/70">
                  Because your checkout features premium limited units, a set of 3 tactile catalog stickers will be automatically bundled in your box free of cost.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
