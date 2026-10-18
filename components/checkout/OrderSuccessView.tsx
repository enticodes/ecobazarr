"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, PackageCheck, ArrowRight, Home } from "lucide-react";
import type { Order } from "@/types";
import { Button } from "@/components/common/Button";
import { formatPrice } from "@/lib/utils";

export interface OrderSuccessViewProps {
  order: Order;
}

export const OrderSuccessView: React.FC<OrderSuccessViewProps> = ({ order }) => {
  return (
    <div className="w-full max-w-4xl mx-auto py-8 sm:py-12 space-y-8 animate-in fade-in zoom-in-95 duration-300">
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="w-20 h-20 bg-primary/10 text-primary rounded-full mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-sans tracking-tight">
          Thank You For Your Order!
        </h1>
        <p className="text-sm text-gray-600 max-w-md mx-auto font-body">
          Your organic produce harvest is confirmed and being prepared for fresh delivery.
        </p>
      </div>

      {/* Order Meta Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 sm:p-6 bg-gray-50/80 rounded-2xl border border-gray-100 text-xs text-gray-600">
        <div className="space-y-1">
          <span className="text-gray-400 block uppercase font-medium">Order Number</span>
          <strong className="text-gray-900 font-mono text-sm block font-bold">
            {order.id}
          </strong>
        </div>
        <div className="space-y-1">
          <span className="text-gray-400 block uppercase font-medium">Date</span>
          <strong className="text-gray-900 text-sm block font-bold">
            {order.date}
          </strong>
        </div>
        <div className="space-y-1">
          <span className="text-gray-400 block uppercase font-medium">Total Paid</span>
          <strong className="text-primary text-sm block font-bold">
            {formatPrice(order.total)}
          </strong>
        </div>
        <div className="space-y-1">
          <span className="text-gray-400 block uppercase font-medium">Payment Method</span>
          <strong className="text-gray-900 text-sm block font-bold uppercase">
            {order.paymentMethod === "cod"
              ? "Cash on Delivery"
              : order.paymentMethod === "paypal"
              ? "PayPal"
              : "Credit Card"}
          </strong>
        </div>
      </div>

      {/* Order Details Grid */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2">
            <PackageCheck className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-gray-900 font-sans">
              Ordered Products ({order.items.reduce((s, i) => s + i.quantity, 0)})
            </h2>
          </div>
          <span className="text-xs font-semibold text-primary bg-primary-tint px-3 py-1 rounded-full">
            {order.status}
          </span>
        </div>

        {/* Item Rows */}
        <div className="divide-y divide-gray-100">
          {order.items.map((item) => (
            <div
              key={item.product.id}
              className="py-3 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg border border-gray-100 bg-gray-50 shrink-0 overflow-hidden">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-sm font-bold text-gray-900 block font-sans">
                    {item.product.name}
                  </span>
                  <span className="text-xs text-gray-400">
                    {item.quantity} × {formatPrice(item.product.price)}
                  </span>
                </div>
              </div>

              <span className="text-sm font-bold text-gray-900">
                {formatPrice(item.product.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        {/* Totals Summary */}
        <div className="border-t border-gray-100 pt-4 space-y-2 text-xs sm:text-sm font-body max-w-xs ml-auto">
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
          <div className="flex justify-between text-base font-bold text-gray-900 border-t border-gray-100 pt-2 font-sans">
            <span>Total:</span>
            <span className="text-xl text-primary font-extrabold">
              {formatPrice(order.total)}
            </span>
          </div>
        </div>

        {/* Shipping Address Summary */}
        <div className="border-t border-gray-100 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-gray-600">
          <div className="space-y-1">
            <h4 className="font-bold text-gray-900 text-sm mb-1 font-sans">
              Billing Address
            </h4>
            <p className="font-semibold text-gray-800">
              {order.billingAddress.firstName} {order.billingAddress.lastName}
            </p>
            <p>{order.billingAddress.streetAddress}</p>
            <p>
              {order.billingAddress.state}, {order.billingAddress.zipCode}
            </p>
            <p>{order.billingAddress.country}</p>
            <p className="pt-1 text-gray-500">
              Email: {order.billingAddress.email} | Phone: {order.billingAddress.phone}
            </p>
          </div>

          <div className="space-y-1">
            <h4 className="font-bold text-gray-900 text-sm mb-1 font-sans">
              Shipping Destination
            </h4>
            <p className="font-semibold text-gray-800">
              {order.shippingAddress.firstName} {order.shippingAddress.lastName}
            </p>
            <p>{order.shippingAddress.streetAddress}</p>
            <p>
              {order.shippingAddress.state}, {order.shippingAddress.zipCode}
            </p>
            <p>{order.shippingAddress.country}</p>
            {order.orderNotes && (
              <p className="pt-2 text-gray-500 italic">
                Note: &ldquo;{order.orderNotes}&rdquo;
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
        <Button variant="primary" size="md">
          <Link href="/shop" className="flex items-center gap-2">
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
        <Button variant="secondary" size="md">
          <Link href="/" className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};
