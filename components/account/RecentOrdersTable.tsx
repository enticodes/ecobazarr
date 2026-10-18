"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Package, ChevronLeft, ChevronRight } from "lucide-react";
import type { Order } from "@/types";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { formatPrice } from "@/lib/utils";

export interface RecentOrdersTableProps {
  orders: Order[];
  limit?: number;
  showPagination?: boolean;
}

const ITEMS_PER_PAGE = 6;

export const RecentOrdersTable: React.FC<RecentOrdersTableProps> = ({
  orders,
  limit,
  showPagination = false,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  if (orders.length === 0) {
    return (
      <div className="w-full py-12 bg-gray-50/50 rounded-2xl border border-gray-100 flex flex-col items-center justify-center text-center p-6 space-y-3">
        <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
          <Package className="w-7 h-7" />
        </div>
        <h4 className="text-base font-bold text-gray-900 font-sans">
          No Orders Placed Yet
        </h4>
        <p className="text-xs text-gray-500 max-w-sm font-body">
          You haven&apos;t placed any orders yet. Visit our shop to browse organic items and order fresh harvest.
        </p>
        <Link
          href="/shop"
          className="inline-flex px-4 py-2 bg-primary text-white text-xs font-semibold rounded-full hover:bg-primary-hover transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  const displayedOrders = limit
    ? orders.slice(0, limit)
    : showPagination
    ? orders.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
    : orders;

  const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs">
      {/* Desktop Header */}
      <div className="hidden md:grid grid-cols-12 gap-4 bg-gray-50/70 px-6 py-4 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider font-sans">
        <div className="col-span-3">Order ID</div>
        <div className="col-span-3">Date</div>
        <div className="col-span-3">Total</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-1 text-right">Action</div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-gray-100">
        {displayedOrders.map((order) => {
          const itemCount = order.items.reduce((s, i) => s + i.quantity, 0);

          return (
            <div
              key={order.id}
              className="p-4 sm:p-5 flex flex-col md:grid md:grid-cols-12 md:items-center gap-3 transition-colors hover:bg-gray-50/40 text-xs sm:text-sm"
            >
              <div className="md:col-span-3 flex items-center justify-between md:justify-start gap-2">
                <span className="md:hidden text-gray-400 text-xs">Order ID:</span>
                <strong className="font-mono font-bold text-gray-900">
                  {order.id}
                </strong>
              </div>

              <div className="md:col-span-3 flex items-center justify-between md:justify-start text-gray-500">
                <span className="md:hidden text-gray-400 text-xs">Date:</span>
                <span>{order.date}</span>
              </div>

              <div className="md:col-span-3 flex items-center justify-between md:justify-start">
                <span className="md:hidden text-gray-400 text-xs">Total:</span>
                <span className="font-bold text-gray-900">
                  {formatPrice(order.total)}{" "}
                  <span className="text-gray-400 font-normal text-xs">
                    ({itemCount} {itemCount === 1 ? "Product" : "Products"})
                  </span>
                </span>
              </div>

              <div className="md:col-span-2 flex items-center justify-between md:justify-start">
                <span className="md:hidden text-gray-400 text-xs">Status:</span>
                <OrderStatusBadge status={order.status} size="sm" />
              </div>

              <div className="md:col-span-1 flex items-center justify-end pt-2 md:pt-0 border-t md:border-t-0 border-gray-50">
                <Link
                  href={`/account/orders/${order.id}`}
                  className="text-xs font-bold text-primary hover:underline whitespace-nowrap font-sans"
                >
                  View Details
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      {showPagination && totalPages > 1 && (
        <div className="p-4 border-t border-gray-100 flex items-center justify-center gap-2">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setCurrentPage(p)}
              className={`w-8 h-8 rounded-full text-xs font-bold ${
                currentPage === p
                  ? "bg-primary text-white"
                  : "border border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
