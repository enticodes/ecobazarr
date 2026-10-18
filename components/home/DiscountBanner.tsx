"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/common/Button";
import { useCountdown } from "@/hooks/useCountdown";

const TARGET_DATE = "2026-11-30T23:59:59.000Z";

export const DiscountBanner: React.FC = () => {
  const { days, hours, minutes, seconds } = useCountdown(TARGET_DATE);

  return (
    <section className="w-full bg-white py-10 sm:py-14" aria-label="Discount Countdown Banner">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full rounded-2xl bg-gray-900 overflow-hidden px-8 py-12 sm:px-16 sm:py-16 text-white flex flex-col lg:flex-row items-center justify-between gap-10 shadow-lg">
          {/* Subtle background image */}
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80"
            alt="Organic food"
            className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
          />

          {/* Left Text & Countdown */}
          <div className="relative z-10 space-y-5 text-center lg:text-left max-w-xl">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-primary block">
              Summer Sale
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-sans leading-tight">
              100% Organic Food
            </h2>
            <p className="text-sm text-gray-300 font-body">
              Free on all your order. We deliver healthy, certified organic fruits and vegetables straight from verified farms.
            </p>

            {/* Countdown Boxes */}
            <div className="flex items-center justify-center lg:justify-start gap-3 pt-2">
              <div className="w-16 h-16 rounded-xl bg-white/10 backdrop-blur-xs border border-white/20 flex flex-col items-center justify-center">
                <span className="text-xl font-bold leading-none">{String(days).padStart(2, "0")}</span>
                <span className="text-[10px] text-gray-300 uppercase font-medium mt-1">Days</span>
              </div>
              <div className="w-16 h-16 rounded-xl bg-white/10 backdrop-blur-xs border border-white/20 flex flex-col items-center justify-center">
                <span className="text-xl font-bold leading-none">{String(hours).padStart(2, "0")}</span>
                <span className="text-[10px] text-gray-300 uppercase font-medium mt-1">Hours</span>
              </div>
              <div className="w-16 h-16 rounded-xl bg-white/10 backdrop-blur-xs border border-white/20 flex flex-col items-center justify-center">
                <span className="text-xl font-bold leading-none">{String(minutes).padStart(2, "0")}</span>
                <span className="text-[10px] text-gray-300 uppercase font-medium mt-1">Mins</span>
              </div>
              <div className="w-16 h-16 rounded-xl bg-white/10 backdrop-blur-xs border border-white/20 flex flex-col items-center justify-center">
                <span className="text-xl font-bold leading-none">{String(seconds).padStart(2, "0")}</span>
                <span className="text-[10px] text-gray-300 uppercase font-medium mt-1">Secs</span>
              </div>
            </div>

            <div className="pt-3">
              <Button variant="primary" size="lg" className="shadow-md">
                <Link href="/shop" className="flex items-center gap-2">
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Product Graphic */}
          <div className="relative z-10 w-full max-w-md aspect-square flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=600&q=80"
              alt="Fresh vegetables basket"
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
