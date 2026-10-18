import React, { Suspense } from "react";
import type { Metadata } from "next";
import { CheckoutPageView } from "@/components/checkout";

export const metadata: Metadata = {
  title: "Checkout | Ecobazar Organic Shop",
  description: "Securely review and complete your order for fresh organic fruits and vegetables.",
};

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full py-24 text-center text-sm text-gray-400">
          Loading checkout...
        </div>
      }
    >
      <CheckoutPageView />
    </Suspense>
  );
}
