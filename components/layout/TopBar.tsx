"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, ChevronDown } from "lucide-react";

export const TopBar: React.FC = () => {
  const [language, setLanguage] = useState("Eng");
  const [currency, setCurrency] = useState("USD");
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isCurrOpen, setIsCurrOpen] = useState(false);

  return (
    <div className="w-full bg-white border-b border-gray-100 text-xs text-gray-600">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between">
        {/* Left: Store Location */}
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-gray-500 shrink-0" aria-hidden="true" />
          <span className="truncate">
            Store Location: Lincoln- 344, Illinois, Chicago, USA
          </span>
        </div>

        {/* Right: Preferences & Authentication */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Language Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsLangOpen(!isLangOpen);
                setIsCurrOpen(false);
              }}
              className="flex items-center gap-1 hover:text-gray-900 transition-colors focus:outline-none"
              aria-label="Select Language"
            >
              <span>{language}</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>
            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-24 bg-white border border-gray-100 rounded-md shadow-dropdown py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                {["Eng", "Esp", "Fra"].map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => {
                      setLanguage(lang);
                      setIsLangOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-50 transition-colors"
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Currency Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsCurrOpen(!isCurrOpen);
                setIsLangOpen(false);
              }}
              className="flex items-center gap-1 hover:text-gray-900 transition-colors focus:outline-none"
              aria-label="Select Currency"
            >
              <span>{currency}</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>
            {isCurrOpen && (
              <div className="absolute right-0 mt-2 w-24 bg-white border border-gray-100 rounded-md shadow-dropdown py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                {["USD", "EUR", "GBP"].map((curr) => (
                  <button
                    key={curr}
                    type="button"
                    onClick={() => {
                      setCurrency(curr);
                      setIsCurrOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-50 transition-colors"
                  >
                    {curr}
                  </button>
                ))}
              </div>
            )}
          </div>

          <span className="text-gray-300" aria-hidden="true">
            |
          </span>

          {/* Account & Auth Links */}
          <Link
            href="/account/dashboard"
            className="hover:text-primary transition-colors font-medium focus-visible:outline-none focus-visible:underline"
          >
            My Account
          </Link>

          <span className="text-gray-300" aria-hidden="true">
            /
          </span>

          <Link
            href="/sign-in"
            className="hover:text-primary transition-colors font-medium focus-visible:outline-none focus-visible:underline"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
