import React, { Suspense } from "react";
import type { Metadata } from "next";
import { CartPageView } from "@/components/cart";

export const metadata: Metadata = {
  title: "Shopping Cart | Ecobazar Organic Shop",
  description: "View and manage your Ecobazar organic shopping cart items, quantities, and coupons before checkout.",
};

export default function CartPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full py-24 text-center text-sm text-gray-400">
          Loading your shopping cart...
        </div>
      }
    >
      <CartPageView />
    </Suspense>
  );
}
