"use client";

import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, PackageCheck } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import {
  AccountLayout,
  OrderStatusBadge,
  OrderProgressTracker,
} from "@/components/account";
import { formatPrice } from "@/lib/utils";

export interface OrderDetailPageViewProps {
  orderId: string;
}

export const OrderDetailPageView: React.FC<OrderDetailPageViewProps> = ({
  orderId,
}) => {
  const orders = useAppSelector((state) => state.order.orders);

  // Normalize ID search to allow both "ECO-73291" and "#ECO-73291"
  const cleanId = decodeURIComponent(orderId).trim();
  const order = orders.find(
    (o) =>
      o.id === cleanId ||
      o.id === `#${cleanId}` ||
      o.id.replace(/^#/, "") === cleanId.replace(/^#/, "")
  );

  if (!order) {
    notFound();
  }

  const itemCount = order.items.reduce((s, i) => s + i.quantity, 0);

  return (
    <AccountLayout breadcrumbLabel={`Order ${order.id}`}>
      <div className="space-y-8">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 font-sans tracking-tight">
                Order Details
              </h2>
              <span className="font-mono font-bold text-gray-800 text-sm">
                ({order.id})
              </span>
              <OrderStatusBadge status={order.status} size="sm" />
            </div>
            <p className="text-xs text-gray-400 font-body">
              Placed on {order.date} • {itemCount}{" "}
              {itemCount === 1 ? "Product" : "Products"}
            </p>
          </div>

          <Link
            href="/account/orders"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline font-sans"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Order History</span>
          </Link>
        </div>

        {/* 4-Stage Visual Progress Tracker (Figma 25_Order_Details) */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs">
          <OrderProgressTracker status={order.status} />
        </div>

        {/* Ordered Products Table */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs">
          <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
            <PackageCheck className="w-5 h-5 text-primary" />
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider font-sans">
              Purchased Items
            </h3>
          </div>

          <div className="divide-y divide-gray-100">
            {order.items.map((item) => (
              <div
                key={item.product.id}
                className="p-4 sm:p-5 flex items-center justify-between gap-4 text-xs sm:text-sm"
              >
                <div className="flex items-center gap-4">
                  <Link
                    href={`/shop/${item.product.id}`}
                    className="w-16 h-16 rounded-xl border border-gray-100 bg-gray-50/50 shrink-0 overflow-hidden flex items-center justify-center"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  <div>
                    <Link
                      href={`/shop/${item.product.id}`}
                      className="font-bold text-gray-900 hover:text-primary transition-colors block font-sans"
                    >
                      {item.product.name}
                    </Link>
                    <span className="text-xs text-gray-400 block mt-0.5">
                      {item.product.category}
                    </span>
                    <span className="text-xs text-gray-500 font-medium block mt-1">
                      {formatPrice(item.product.price)} × {item.quantity}
                    </span>
                  </div>
                </div>

                <span className="font-bold text-gray-900 text-sm">
                  {formatPrice(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing Summary */}
          <div className="p-6 bg-gray-50/40 border-t border-gray-100 space-y-2.5 text-xs sm:text-sm font-body max-w-xs ml-auto">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal:</span>
              <span className="font-semibold text-gray-900">
                {formatPrice(order.subtotal)}
              </span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping:</span>
              <span className="font-semibold text-gray-900">
                {order.shipping === 0 ? "Free" : formatPrice(order.shipping)}
              </span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-primary">
                <span>Discount ({order.couponCode || "Coupon"}):</span>
                <span className="font-bold">-{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-bold text-gray-900 border-t border-gray-200 pt-2 font-sans">
              <span>Total Paid:</span>
              <span className="text-xl text-primary font-extrabold">
                {formatPrice(order.total)}
              </span>
            </div>
          </div>
        </div>

        {/* Addresses & Payment Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-3 text-xs text-gray-600 font-body">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider font-sans border-b border-gray-100 pb-2">
              Billing Address
            </h4>
            <p className="font-bold text-gray-900 text-sm">
              {order.billingAddress.firstName} {order.billingAddress.lastName}
            </p>
            {order.billingAddress.companyName && (
              <p>{order.billingAddress.companyName}</p>
            )}
            <p>{order.billingAddress.streetAddress}</p>
            <p>
              {order.billingAddress.state}, {order.billingAddress.zipCode}
            </p>
            <p>{order.billingAddress.country}</p>
            <p className="pt-1 text-gray-500">
              Email: {order.billingAddress.email} | Phone:{" "}
              {order.billingAddress.phone}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-3 text-xs text-gray-600 font-body">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider font-sans border-b border-gray-100 pb-2">
              Shipping Destination
            </h4>
            <p className="font-bold text-gray-900 text-sm">
              {order.shippingAddress.firstName} {order.shippingAddress.lastName}
            </p>
            {order.shippingAddress.companyName && (
              <p>{order.shippingAddress.companyName}</p>
            )}
            <p>{order.shippingAddress.streetAddress}</p>
            <p>
              {order.shippingAddress.state}, {order.shippingAddress.zipCode}
            </p>
            <p>{order.shippingAddress.country}</p>
            <div className="pt-2 border-t border-gray-50">
              <span className="font-semibold text-gray-700">Payment: </span>
              <span className="uppercase font-bold text-gray-900">
                {order.paymentMethod === "cod"
                  ? "Cash on Delivery"
                  : order.paymentMethod === "paypal"
                  ? "PayPal"
                  : "Credit Card"}
              </span>
            </div>
            {order.orderNotes && (
              <p className="pt-1 text-gray-500 italic">
                Note: &ldquo;{order.orderNotes}&rdquo;
              </p>
            )}
          </div>
        </div>
      </div>
    </AccountLayout>
  );
};
