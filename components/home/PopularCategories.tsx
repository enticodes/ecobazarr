import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { POPULAR_CATEGORIES } from "@/data/categories";

export const PopularCategories: React.FC = () => {
  return (
    <section className="w-full bg-white py-10 sm:py-14" aria-label="Popular Categories">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-sans text-gray-900 tracking-tight">
              Popular Categories
            </h2>
          </div>
          <Link
            href="/shop"
            className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Categories Grid (6 columns desktop, 3 tablet, 2 mobile) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {POPULAR_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className="group bg-white border border-gray-100 rounded-xl p-4 sm:p-5 flex flex-col items-center text-center transition-all duration-200 hover:border-primary-light hover:shadow-card cursor-pointer"
            >
              {/* Category Image Circle */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-gray-50 mb-3 flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-full"
                  loading="lazy"
                />
              </div>

              {/* Title & Count */}
              <h3 className="text-sm font-semibold text-gray-800 group-hover:text-primary transition-colors font-sans line-clamp-1">
                {cat.name}
              </h3>
              <p className="text-xs text-gray-400 font-body mt-0.5">
                {cat.itemCount} Items
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
