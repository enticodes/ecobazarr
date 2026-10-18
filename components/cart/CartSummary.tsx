"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck } from "lucide-react";
import { Button } from "@/components/common/Button";
import type { CartTotals } from "@/lib/cartUtils";
import { formatPrice } from "@/lib/utils";

export interface CartSummaryProps {
  totals: CartTotals;
  disabled?: boolean;
}

export const CartSummary: React.FC<CartSummaryProps> = ({ totals, disabled }) => {
  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 p-6 sm:p-7 shadow-xs space-y-6">
      <h3 className="text-xl font-bold text-gray-900 font-sans border-b border-gray-100 pb-4">
        Cart Total
      </h3>

      <div className="space-y-3.5 text-sm font-body">
        {/* Subtotal */}
        <div className="flex items-center justify-between">
          <span className="text-gray-600 font-medium">Subtotal:</span>
          <span className="font-bold text-gray-900">{formatPrice(totals.subtotal)}</span>
        </div>

        {/* Shipping */}
        <div className="flex items-center justify-between border-t border-gray-50 pt-3">
          <div className="flex items-center gap-1.5 text-gray-600 font-medium">
            <Truck className="w-4 h-4 text-primary" />
            <span>Shipping:</span>
          </div>
          <span className="font-bold text-gray-900">
            {totals.shipping === 0 ? (
              <span className="text-primary font-bold">Free</span>
            ) : (
              formatPrice(totals.shipping)
            )}
          </span>
        </div>
        {totals.subtotal > 0 && totals.subtotal < 50 && (
          <p className="text-[11px] text-gray-400">
            Add <strong className="text-primary">{formatPrice(50 - totals.subtotal)}</strong> more to get free delivery!
          </p>
        )}

        {/* Discount (if any) */}
        {totals.discount > 0 && (
          <div className="flex items-center justify-between border-t border-gray-50 pt-3 text-primary">
            <span className="font-medium">
              Discount ({totals.appliedCoupon?.code}):
            </span>
            <span className="font-bold">-{formatPrice(totals.discount)}</span>
          </div>
        )}

        {/* Total */}
        <div className="flex items-baseline justify-between border-t border-gray-200 pt-4">
          <span className="text-base font-bold text-gray-900 font-sans">Total:</span>
          <span className="text-2xl font-extrabold text-primary font-sans">
            {formatPrice(totals.total)}
          </span>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="pt-2">
        <Button
          variant="primary"
          size="lg"
          className="w-full justify-center shadow-xs"
          disabled={disabled}
        >
          <Link
            href="/checkout"
            className="flex items-center justify-center gap-2 w-full"
          >
            <span>Proceed to checkout</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>

      {/* Trust Badges */}
      <div className="pt-2 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-gray-500">
        <ShieldCheck className="w-4 h-4 text-primary" />
        <span>100% Safe & Secure Checkout</span>
      </div>
    </div>
  );
};
