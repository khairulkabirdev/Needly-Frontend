import React, { useState } from "react";
import { User, Phone, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import SocialLogins from "./SocialLogins";

interface AuthCardProps {
  onSuccess: (email: string) => void;
}

export default function AuthCard({ onSuccess }: AuthCardProps) {
  // Tabs: 'create' | 'login'
  const [activeTab, setActiveTab] = useState<"create" | "login">("create");

  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(true);

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Local validation/error states
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!emailOrPhone.trim()) {
      setErrorMsg("Please enter email or phone number.");
      return;
    }
    if (!password) {
      setErrorMsg("Please enter password.");
      return;
    }

    if (activeTab === "create") {
      if (!firstName.trim() || !lastName.trim()) {
        setErrorMsg("Please enter both First Name and Last Name.");
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg("Passwords do not match.");
        return;
      }
      if (!agreeToTerms) {
        setErrorMsg("You must agree to the Terms of Use & Privacy Policy.");
        return;
      }
    }

    // Success login/register
    const displayEmail = emailOrPhone.includes("@") ? emailOrPhone : `${emailOrPhone}@phone.needly.co`;
    onSuccess(displayEmail);
  };

  return (
    <div className="w-full max-w-[580px] bg-white border-2 border-gray-100 rounded-[32px] p-6 md:p-10 shadow-xl overflow-hidden transition-all duration-300 relative">
      <div className="flex flex-col items-center">
        {/* Top Needy Orange Icon Badge */}
        <div className="w-14 h-14 rounded-2xl bg-[#FF5000] flex items-center justify-center shadow-md mb-4 relative">
          <span className="text-white font-black text-3xl tracking-tight select-none">N</span>
          {/* SMILE bottom curve of logo */}
          <div className="absolute bottom-1 w-9 h-3 border-b-4 border-orange-200 rounded-b-full opacity-85" />
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-black text-gray-900 text-center tracking-tight leading-none mb-1.5 flex items-center gap-1">
          Welcome to <span className="text-[#FF5000]">Needly</span>
        </h1>
        <p className="text-xs text-gray-400 font-semibold mb-8 text-center leading-relaxed">
          Create your account and start shopping the{" "}
          <span className="text-[#FF5000] font-bold">best deals</span> today!
        </p>

        {/* Active Auth Selection Rounded Tabs */}
        <div className="w-full bg-[#FCF8F5] p-1.5 rounded-2xl flex items-center gap-1.5 border border-orange-100/30 mb-8 max-w-[340px]">
          <button
            type="button"
            onClick={() => {
              setActiveTab("login");
              setErrorMsg("");
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs md:text-sm font-extrabold flex items-center justify-center space-x-2.5 cursor-pointer select-none transition-all duration-250 ${
              activeTab === "login"
                ? "bg-[#FF5000] text-white shadow-xs"
                : "text-gray-500 hover:text-gray-800 hover:bg-orange-50/50"
            }`}
          >
            <User className="w-4 h-4" />
            <span>Login</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("create");
              setErrorMsg("");
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs md:text-sm font-extrabold flex items-center justify-center space-x-2.5 cursor-pointer select-none transition-all duration-250 ${
              activeTab === "create"
                ? "bg-[#FF5000] text-white shadow-xs"
                : "text-gray-500 hover:text-gray-800 hover:bg-orange-50/50"
            }`}
          >
            <User className="w-4 h-4" />
            <span>Create Account</span>
          </button>
        </div>

        {/* Error Notification Alert */}
        {errorMsg && (
          <div className="w-full bg-red-50 border-2 border-red-100 rounded-2xl p-4 mb-6 text-red-700 font-semibold text-xs text-left animate-fade-in flex items-center space-x-2">
            <span className="text-sm">⚠️</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Auth Input Fields Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-5 text-left">
          {activeTab === "create" && (
            /* First/Last Name Inputs Row only for Create Account tab */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs md:text-sm font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    required
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-white border-2 border-gray-200 rounded-2xl text-xs md:text-sm font-semibold placeholder:text-gray-400 focus:border-[#FF5000] outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs md:text-sm font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                  Last Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    required
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-white border-2 border-gray-200 rounded-2xl text-xs md:text-sm font-semibold placeholder:text-gray-400 focus:border-[#FF5000] outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Email or Phone Number */}
          <div>
            <label className="block text-xs md:text-sm font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
              Email or Phone Number
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400 pointer-events-none" />
              <input
                type="text"
                required
                placeholder="Enter your email or phone number"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border-2 border-gray-200 rounded-2xl text-xs md:text-sm font-semibold placeholder:text-gray-400 focus:border-[#FF5000] outline-none transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs md:text-sm font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400 pointer-events-none" />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder={activeTab === "create" ? "Create a password" : "Enter password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-11 py-3 bg-white border-2 border-gray-200 rounded-2xl text-xs md:text-sm font-semibold placeholder:text-gray-400 focus:border-[#FF5000] outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 focus:outline-hidden"
              >
                {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
              </button>
            </div>
          </div>

          {activeTab === "create" && (
            /* Confirm Password only for Create Account tab */
            <div>
              <label className="block text-xs md:text-sm font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400 pointer-events-none" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-11 pr-11 py-3 bg-white border-2 border-gray-200 rounded-2xl text-xs md:text-sm font-semibold placeholder:text-gray-400 focus:border-[#FF5000] outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 focus:outline-hidden"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4.5 h-4.5" />
                  ) : (
                    <Eye className="w-4.5 h-4.5" />
                  )}
                </button>
              </div>
            </div>
          )}

          {activeTab === "create" && (
            /* Policy Agreement Checkbox */
            <div className="flex items-center space-x-3 pt-1">
              <button
                type="button"
                onClick={() => setAgreeToTerms(!agreeToTerms)}
                className={`w-5.5 h-5.5 rounded-lg border-2 transition-all flex items-center justify-center shrink-0 cursor-pointer ${
                  agreeToTerms
                    ? "bg-[#FF5000] border-[#FF5000] text-white"
                    : "bg-white border-gray-300 hover:border-gray-400"
                }`}
              >
                {agreeToTerms && (
                  <svg className="w-3.5 h-3.5 stroke-[3.5] stroke-current" fill="none" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
              <span
                onClick={() => setAgreeToTerms(!agreeToTerms)}
                className="text-[11px] md:text-xs font-bold text-gray-750 cursor-pointer select-none leading-snug"
              >
                I agree to the{" "}
                <span className="text-[#FF5000] hover:underline">Terms of Use</span> and{" "}
                <span className="text-[#FF5000] hover:underline">Privacy Policy</span>
              </span>
            </div>
          )}

          {/* Primary Action Button (Welcome Orange Gradient Style) */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-[#FF5000] hover:from-orange-600 hover:to-[#E04600] active:from-orange-700 active:to-[#C83E00] text-white font-extrabold text-xs md:text-sm py-4 rounded-2xl flex items-center justify-between px-6 transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-md shadow-[#FF5000]/20 cursor-pointer"
          >
            <span>{activeTab === "create" ? "Create Account" : "Access Account"}</span>
            <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#FF5000] shadow-xs shrink-0">
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </div>
          </button>
        </form>

        {/* Social Authentication Portals */}
        <div className="w-full">
          <SocialLogins />
        </div>

        {/* Bottom swap direction indicator link */}
        <div className="mt-8 text-xs font-bold text-gray-400">
          {activeTab === "create" ? (
            <span>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setActiveTab("login");
                  setErrorMsg("");
                }}
                className="text-[#FF5000] hover:underline font-black cursor-pointer bg-transparent focus:outline-hidden"
              >
                Login
              </button>
            </span>
          ) : (
            <span>
              New to Needly?{" "}
              <button
                type="button"
                onClick={() => {
                  setActiveTab("create");
                  setErrorMsg("");
                }}
                className="text-[#FF5000] hover:underline font-black cursor-pointer bg-transparent focus:outline-hidden"
              >
                Create Account
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
