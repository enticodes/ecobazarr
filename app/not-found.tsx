import React from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { ShopBreadcrumbs } from "@/components/shop";

export default function NotFound() {
  return (
    <div className="w-full bg-white pb-20">
      <ShopBreadcrumbs items={[{ label: "404 Error" }]} />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-center">
        <div className="max-w-md mx-auto space-y-6">
          {/* Visual 404 Graphic */}
          <div className="relative mx-auto w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl opacity-60" />
            <span className="text-8xl sm:text-9xl font-black font-sans text-primary/20 tracking-tighter select-none">
              404
            </span>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl sm:text-6xl font-black font-sans text-gray-900 tracking-tight">
                404
              </span>
              <span className="text-xs font-extrabold uppercase tracking-widest text-primary mt-1">
                Page Not Found
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold font-sans text-gray-900 tracking-tight">
              Oops! Page not found
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-sm mx-auto">
              The page you are looking for might have been removed, had its name changed,
              or is temporarily unavailable.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white text-xs sm:text-sm font-semibold hover:bg-primary-hover transition-colors shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-100 text-gray-800 text-xs sm:text-sm font-semibold hover:bg-gray-200 transition-colors shadow-xs"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Browse Shop</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
