import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductDealCard } from "@/components/product/ProductDealCard";

export const HotDeals: React.FC = () => {
  // Find the hot deal product (Chinese Cabbage) or default to the second product
  const dealProduct = PRODUCTS.find((p) => p.isHotDeal) || PRODUCTS[1];
  // 8 side products
  const sideProducts = PRODUCTS.slice(0, 8);

  return (
    <section className="w-full bg-white py-10 sm:py-14 border-t border-gray-100" aria-label="Hot Deals">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-sans text-gray-900 tracking-tight">
              Hot Deals
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

        {/* Deals Layout: Large Feature Card on Left + 4x2 Grid on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Featured Hot Deal Card */}
          <div className="lg:col-span-4 xl:col-span-4 w-full">
            <ProductDealCard product={dealProduct} />
          </div>

          {/* Right: Products Grid (4 cols on lg, 2 cols on sm) */}
          <div className="lg:col-span-8 xl:col-span-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {sideProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
