"use client";

import React, { useState } from "react";
import { CreditCard, DollarSign, Wallet, ShieldCheck } from "lucide-react";
import type { CartItem } from "@/types";
import type { CartTotals } from "@/lib/cartUtils";
import { Button } from "@/components/common/Button";
import { formatPrice } from "@/lib/utils";

export interface CheckoutOrderSummaryProps {
  items: CartItem[];
  totals: CartTotals;
  paymentMethod: "cod" | "paypal" | "card";
  onChangePaymentMethod: (method: "cod" | "paypal" | "card") => void;
  onSubmitOrder: () => void;
  isSubmitting?: boolean;
}

export const CheckoutOrderSummary: React.FC<CheckoutOrderSummaryProps> = ({
  items,
  totals,
  paymentMethod,
  onChangePaymentMethod,
  onSubmitOrder,
  isSubmitting = false,
}) => {
  const [agreedToTerms, setAgreedToTerms] = useState(true);

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs space-y-6">
      <h3 className="text-xl font-bold text-gray-900 font-sans border-b border-gray-100 pb-4">
        Order Summary
      </h3>

      {/* Cart Items List */}
      <div className="space-y-3 max-h-64 overflow-y-auto divide-y divide-gray-100 pr-1">
        {items.map((item) => (
          <div
            key={item.product.id}
            className="flex items-center justify-between gap-3 pt-3 first:pt-0"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-12 rounded-lg border border-gray-100 bg-gray-50 shrink-0 overflow-hidden">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-gray-900 truncate font-sans">
                  {item.product.name}
                </p>
                <span className="text-[11px] text-gray-500">
                  Qty: {item.quantity}
                </span>
              </div>
            </div>

            <span className="text-xs font-bold text-gray-900 shrink-0">
              {formatPrice(item.product.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      {/* Pricing Breakdown */}
      <div className="border-t border-gray-100 pt-4 space-y-3 text-xs sm:text-sm font-body">
        <div className="flex items-center justify-between text-gray-600">
          <span>Subtotal:</span>
          <span className="font-bold text-gray-900">{formatPrice(totals.subtotal)}</span>
        </div>

        <div className="flex items-center justify-between text-gray-600">
          <span>Shipping:</span>
          <span className="font-bold text-gray-900">
            {totals.shipping === 0 ? (
              <span className="text-primary font-bold">Free</span>
            ) : (
              formatPrice(totals.shipping)
            )}
          </span>
        </div>

        {totals.discount > 0 && (
          <div className="flex items-center justify-between text-primary">
            <span>Discount ({totals.appliedCoupon?.code}):</span>
            <span className="font-bold">-{formatPrice(totals.discount)}</span>
          </div>
        )}

        <div className="flex items-baseline justify-between border-t border-gray-200 pt-3 text-base">
          <span className="font-bold text-gray-900 font-sans">Total:</span>
          <span className="text-2xl font-extrabold text-primary font-sans">
            {formatPrice(totals.total)}
          </span>
        </div>
      </div>

      {/* Payment Method Selector */}
      <div className="border-t border-gray-100 pt-5 space-y-3">
        <h4 className="text-sm font-bold text-gray-900 font-sans">
          Payment Method
        </h4>

        <div className="space-y-2.5">
          {/* 1. Cash on Delivery */}
          <label
            className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
              paymentMethod === "cod"
                ? "border-primary bg-primary-tint/40 ring-1 ring-primary/20"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() => onChangePaymentMethod("cod")}
                className="accent-primary w-4 h-4"
              />
              <span className="text-xs sm:text-sm font-semibold text-gray-800">
                Cash on Delivery
              </span>
            </div>
            <DollarSign className="w-4 h-4 text-gray-400" />
          </label>

          {/* 2. Paypal */}
          <label
            className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
              paymentMethod === "paypal"
                ? "border-primary bg-primary-tint/40 ring-1 ring-primary/20"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={paymentMethod === "paypal"}
                onChange={() => onChangePaymentMethod("paypal")}
                className="accent-primary w-4 h-4"
              />
              <span className="text-xs sm:text-sm font-semibold text-gray-800">
                Paypal (Simulation)
              </span>
            </div>
            <Wallet className="w-4 h-4 text-gray-400" />
          </label>

          {/* 3. Credit / Debit Card */}
          <label
            className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
              paymentMethod === "card"
                ? "border-primary bg-primary-tint/40 ring-1 ring-primary/20"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === "card"}
                onChange={() => onChangePaymentMethod("card")}
                className="accent-primary w-4 h-4"
              />
              <span className="text-xs sm:text-sm font-semibold text-gray-800">
                Credit Card (Simulation)
              </span>
            </div>
            <CreditCard className="w-4 h-4 text-gray-400" />
          </label>
        </div>
      </div>

      {/* Terms Agreement */}
      <div className="pt-2">
        <label className="flex items-start gap-2.5 cursor-pointer text-xs text-gray-600 select-none">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="w-4 h-4 rounded accent-primary mt-0.5 text-primary"
          />
          <span>
            I have read and agree to the website{" "}
            <span className="text-primary font-semibold underline">
              terms and conditions
            </span>
            .
          </span>
        </label>
      </div>

      {/* Place Order CTA */}
      <Button
        variant="primary"
        size="lg"
        onClick={onSubmitOrder}
        disabled={!agreedToTerms || items.length === 0 || isSubmitting}
        isLoading={isSubmitting}
        className="w-full justify-center shadow-sm"
      >
        <span>Place Order</span>
      </Button>

      <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400 pt-1">
        <ShieldCheck className="w-4 h-4 text-primary" />
        <span>Simulated Checkout • No payment card needed</span>
      </div>
    </div>
  );
};
