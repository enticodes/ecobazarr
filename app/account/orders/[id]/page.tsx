import React, { Suspense } from "react";
import type { Metadata } from "next";
import { INITIAL_MOCK_ORDERS } from "@/store/slices/orderSlice";
import { OrderDetailPageView } from "@/components/account";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return INITIAL_MOCK_ORDERS.map((o) => ({
    id: o.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Order ${id} Details | Ecobazar Organic Shop`,
    description: `View delivery timeline and itemized receipt for order ${id}.`,
  };
}

export default async function OrderDetailPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <Suspense
      fallback={
        <div className="w-full py-24 text-center text-sm text-gray-400">
          Loading order details...
        </div>
      }
    >
      <OrderDetailPageView orderId={id} />
    </Suspense>
  );
}
