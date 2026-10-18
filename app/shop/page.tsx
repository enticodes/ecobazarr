import React, { Suspense } from "react";
import type { Metadata } from "next";
import { ShopCatalogView } from "@/components/shop";

export const metadata: Metadata = {
  title: "Shop Organic Fresh Produce | Ecobazar",
  description:
    "Explore our full catalog of fresh organic fruits, vegetables, meat, bakery items, and beverages with flexible filtering and sorting.",
};

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full py-20 text-center text-sm text-gray-400">
          Loading shop catalog...
        </div>
      }
    >
      <ShopCatalogView />
    </Suspense>
  );
}
