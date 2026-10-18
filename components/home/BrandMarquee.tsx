import React from "react";
import { BRAND_PARTNERS } from "@/data/brands";

export const BrandMarquee: React.FC = () => {
  return (
    <section className="w-full bg-white py-10 sm:py-14 border-y border-gray-100" aria-label="Brand Partners">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-8 md:gap-12 opacity-60 hover:opacity-100 transition-opacity">
          {BRAND_PARTNERS.map((brand) => (
            <div
              key={brand.id}
              className="flex items-center justify-center p-3 grayscale hover:grayscale-0 transition-all duration-200 cursor-pointer"
            >
              <span className="text-xl sm:text-2xl font-black font-sans tracking-widest text-gray-500 hover:text-gray-900">
                {brand.logoText}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
