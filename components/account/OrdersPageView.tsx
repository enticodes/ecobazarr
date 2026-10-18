"use client";

import React from "react";
import { useAppSelector } from "@/store/hooks";
import { AccountLayout, RecentOrdersTable } from "@/components/account";

export const OrdersPageView: React.FC = () => {
  const orders = useAppSelector((state) => state.order.orders);

  return (
    <AccountLayout breadcrumbLabel="Order History">
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 font-sans tracking-tight">
            Order History
          </h2>
          <span className="text-xs font-semibold text-gray-500 font-sans">
            {orders.length} {orders.length === 1 ? "Order Placed" : "Orders Placed"}
          </span>
        </div>

        <RecentOrdersTable orders={orders} showPagination={true} />
      </div>
    </AccountLayout>
  );
};
