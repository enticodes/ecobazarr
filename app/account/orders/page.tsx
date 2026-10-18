import React, { Suspense } from "react";
import type { Metadata } from "next";
import { OrdersPageView } from "@/components/account";

export const metadata: Metadata = {
  title: "Order History | Ecobazar Organic Shop",
  description: "Track and review all previous purchases and shipments of fresh organic food from Ecobazar.",
};

export default function OrdersPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full py-24 text-center text-sm text-gray-400">
          Loading order history...
        </div>
      }
    >
      <OrdersPageView />
    </Suspense>
  );
}
