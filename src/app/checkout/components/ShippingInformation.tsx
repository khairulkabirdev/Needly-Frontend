import React from "react";
import { User, Phone, MapPin, ChevronDown, Check } from "lucide-react";

interface ShippingInformationProps {
  fullName: string;
  setFullName: (val: string) => void;
  phone: string;
  setPhone: (val: string) => void;
  address: string;
  setAddress: (val: string) => void;
  city: string;
  setCity: (val: string) => void;
  stateProv: string;
  setStateProv: (val: string) => void;
  zipCode: string;
  setZipCode: (val: string) => void;
  saveNewAddress: boolean;
  setSaveNewAddress: (val: boolean) => void;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

const STATES_PROVINCES = [
  "California",
  "New York",
  "Texas",
  "Florida",
  "Illinois",
  "Washington",
  "Massachusetts",
  "Ontario",
  "British Columbia"
];

export default function ShippingInformation({
  fullName,
  setFullName,
  phone,
  setPhone,
  address,
  setAddress,
  city,
  setCity,
  stateProv,
  setStateProv,
  zipCode,
  setZipCode,
  saveNewAddress,
  setSaveNewAddress,
  isOpen,
  setIsOpen,
}: ShippingInformationProps) {
  return (
    <div className="bg-white border-2 border-gray-100 rounded-[24px] shadow-xs overflow-hidden transition-all duration-300">
      {/* Header (Expandable Accordion) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50/50 transition-colors focus:outline-hidden text-left"
      >
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 rounded-full bg-[#FF5000] text-white flex items-center justify-center font-bold text-sm">
            1
          </div>
          <h2 className="text-lg md:text-xl font-extrabold text-gray-900 tracking-tight">
            Shipping Information
          </h2>
        </div>
        <ChevronDown
          className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Content Form */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[1000px] border-t-2 border-gray-50 p-6 md:p-8" : "max-h-0 overflow-hidden"
        }`}
      >
        <div className="space-y-6">
          {/* Row 1: Full Name & Phone Number */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-[14px] text-gray-800 text-sm font-semibold placeholder:text-gray-400 focus:border-[#FF5000] focus:bg-white focus:ring-0 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  required
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-[14px] text-gray-800 text-sm font-semibold placeholder:text-gray-400 focus:border-[#FF5000] focus:bg-white focus:ring-0 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Row 2: Address */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Address
            </label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                required
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-[14px] text-gray-800 text-sm font-semibold placeholder:text-gray-400 focus:border-[#FF5000] focus:bg-white focus:ring-0 outline-none transition-all"
              />
            </div>
          </div>

          {/* Row 3: City, State/Province, ZIP/Postal Code */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                City
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  required
                  placeholder="Enter your city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-[14px] text-gray-800 text-sm font-semibold placeholder:text-gray-400 focus:border-[#FF5000] focus:bg-white focus:ring-0 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                State / Province
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                <select
                  required
                  value={stateProv}
                  onChange={(e) => setStateProv(e.target.value)}
                  className="w-full pl-12 pr-10 py-3.5 bg-white border-2 border-gray-200 rounded-[14px] text-gray-800 text-sm font-semibold placeholder:text-gray-400 focus:border-[#FF5000] focus:bg-white focus:ring-0 outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select state</option>
                  {STATES_PROVINCES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                ZIP / Postal Code
              </label>
              <input
                type="text"
                required
                placeholder="Enter ZIP code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-[14px] text-gray-800 text-sm font-semibold placeholder:text-gray-400 focus:border-[#FF5000] focus:bg-white focus:ring-0 outline-none transition-all"
              />
            </div>
          </div>

          {/* Save Address Checkbox */}
          <div className="flex items-center space-x-3 pt-2">
            <button
              type="button"
              onClick={() => setSaveNewAddress(!saveNewAddress)}
              className={`w-6 h-6 rounded-[6px] border-2 transition-all flex items-center justify-center cursor-pointer ${
                saveNewAddress
                  ? "bg-[#FF5000] border-[#FF5000] text-white"
                  : "bg-white border-gray-300 hover:border-gray-400"
              }`}
            >
              {saveNewAddress && <Check className="w-4 h-4 stroke-[3]" />}
            </button>
            <span
              onClick={() => setSaveNewAddress(!saveNewAddress)}
              className="text-sm font-bold text-gray-750 cursor-pointer select-none"
            >
              Save this address for next time
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
