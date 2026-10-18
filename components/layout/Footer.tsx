"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Logo } from "@/components/common/Logo";

const FacebookIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    className="w-4 h-4 fill-none stroke-current"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="w-full bg-gray-900 text-white" aria-label="Site Footer">
      {/* 1. Integrated Newsletter Banner */}
      <div className="w-full bg-gray-50 text-gray-900 border-b border-gray-100 py-10 sm:py-12">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left Copy */}
            <div className="max-w-md text-center lg:text-left space-y-1">
              <h3 className="text-2xl font-bold font-sans text-gray-900 tracking-tight">
                Subcribe our Newsletter
              </h3>
              <p className="text-xs text-gray-500 font-body">
                Pellentesque eu nibh eget mauris congue mattis mattis nec
                tellus. Phasellus imperdiet elit eu magna.
              </p>
            </div>

            {/* Center Subscription Form */}
            <div className="w-full max-w-lg">
              {isSubscribed ? (
                <div className="flex items-center gap-2 p-3 bg-primary-tint border border-primary-soft text-primary rounded-full text-xs font-semibold justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Thank you! You are subscribed to our newsletter.</span>
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex items-center w-full bg-white border border-gray-200 rounded-full p-1 pl-5 shadow-xs focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full text-xs sm:text-sm text-gray-900 bg-transparent outline-none pr-3 placeholder:text-gray-400"
                    aria-label="Your email address"
                  />
                  <button
                    type="submit"
                    className="px-6 sm:px-8 py-3 sm:py-3.5 bg-primary text-white text-xs sm:text-sm font-semibold rounded-full hover:bg-primary-hover active:bg-primary-dark transition-colors shrink-0 cursor-pointer shadow-xs"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>

            {/* Right Social Icons */}
            <div className="flex items-center gap-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center text-gray-700 hover:bg-primary hover:text-white transition-colors border border-gray-200"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center text-gray-700 hover:bg-primary hover:text-white transition-colors border border-gray-200"
                aria-label="Twitter"
              >
                <TwitterIcon />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center text-gray-700 hover:bg-primary hover:text-white transition-colors border border-gray-200"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Multi-Column Links */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-5">
            <Logo dark size="md" />
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm font-body">
              Morbi cursus porttitor enim lobortis molestie. Duis gravida turpis
              dui, eget bibendum magna congue nec.
            </p>
            <div className="space-y-1.5 text-xs text-gray-300">
              <p>
                <span className="font-semibold text-white">(219) 555-0114</span>{" "}
                <span className="text-gray-500">or</span>{" "}
                <span className="font-semibold text-white">
                  Proxy@gmail.com
                </span>
              </p>
            </div>
          </div>

          {/* Column 2: My Account */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold tracking-wide uppercase text-white font-sans">
              My Account
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400 font-body">
              <li>
                <Link
                  href="/account/dashboard"
                  className="hover:text-primary transition-colors"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  href="/account/orders"
                  className="hover:text-primary transition-colors"
                >
                  Order History
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="hover:text-primary transition-colors"
                >
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link
                  href="/wishlist"
                  className="hover:text-primary transition-colors"
                >
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Helps */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold tracking-wide uppercase text-white font-sans">
              Helps
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400 font-body">
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/faqs"
                  className="hover:text-primary transition-colors"
                >
                  Faqs
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors"
                >
                  Terms & Condition
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Categories */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold tracking-wide uppercase text-white font-sans">
              Categories
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400 font-body">
              <li>
                <Link
                  href="/shop?category=fresh-fruit"
                  className="hover:text-primary transition-colors"
                >
                  Fruit & Vegetables
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=chicken-meat"
                  className="hover:text-primary transition-colors"
                >
                  Meat & Fish
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=cake-bread"
                  className="hover:text-primary transition-colors"
                >
                  Bread & Bakery
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=cooking"
                  className="hover:text-primary transition-colors"
                >
                  Beauty & Health
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. Bottom Copyright & Payment Partner Badges */}
      <div className="w-full border-t border-gray-800 py-6 text-xs text-gray-500">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-center sm:text-left">
            Ecobazar eCommerce © 2026. All Rights Reserved
          </p>

          {/* Payment Badges Matching Figma */}
          <div className="flex items-center gap-2 select-none">
            <span className="px-2.5 py-1 rounded bg-white text-gray-900 font-bold text-[10px] tracking-tight">
              ApplePay
            </span>
            <span className="px-2.5 py-1 rounded bg-white text-blue-700 font-extrabold text-[10px] italic tracking-tight">
              VISA
            </span>
            <span className="px-2.5 py-1 rounded bg-white text-red-600 font-bold text-[10px] tracking-tight">
              MasterCard
            </span>
            <span className="px-2.5 py-1 rounded bg-white text-orange-600 font-bold text-[10px] tracking-tight">
              Discover
            </span>
            <span className="px-2.5 py-1 rounded bg-emerald-600 text-white font-semibold text-[10px] tracking-tight">
              Secure
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
