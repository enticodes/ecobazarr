import React, { Suspense } from "react";
import type { Metadata } from "next";
import { WishlistPageView } from "@/components/wishlist";

export const metadata: Metadata = {
  title: "My Wishlist | Ecobazar Organic Shop",
  description: "View and manage your saved organic products, stock availability, and transfer items directly to your shopping cart.",
};

export default function WishlistPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full py-24 text-center text-sm text-gray-400">
          Loading your wishlist...
        </div>
      }
    >
      <WishlistPageView />
    </Suspense>
  );
}
