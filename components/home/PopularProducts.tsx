"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { cn } from "@/lib/utils";

const TABS = ["All", "Vegetables", "Fruit", "Meat & Fish"];

export const PopularProducts: React.FC = () => {
  const [activeTab, setActiveTab] = useState("All");

  const filteredProducts = PRODUCTS.filter((product) => {
    if (activeTab === "All") return true;
    return product.category.toLowerCase().includes(activeTab.toLowerCase());
  }).slice(0, 10);

  return (
    <section className="w-full bg-white py-10 sm:py-14 border-t border-gray-100" aria-label="Popular Products">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Tabs */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold font-sans text-gray-900 tracking-tight">
            Popular Products
          </h2>

          <div className="flex items-center gap-3 sm:gap-6 flex-wrap">
            <div className="flex items-center gap-1 sm:gap-2">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-full transition-colors cursor-pointer",
                    activeTab === tab
                      ? "text-primary border-b-2 border-primary"
                      : "text-gray-500 hover:text-gray-900"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            <Link
              href="/shop"
              className="hidden sm:flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 5-Column Responsive Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
