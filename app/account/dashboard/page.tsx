import React, { Suspense } from "react";
import type { Metadata } from "next";
import { DashboardPageView } from "@/components/account";

export const metadata: Metadata = {
  title: "User Dashboard | Ecobazar Organic Shop",
  description: "View your organic store order history, recent shipments, and manage account details.",
};

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full py-24 text-center text-sm text-gray-400">
          Loading dashboard...
        </div>
      }
    >
      <DashboardPageView />
    </Suspense>
  );
}
