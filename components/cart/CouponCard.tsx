"use client";

import React, { useState } from "react";
import { Tag, X, Info } from "lucide-react";
import { Button } from "@/components/common/Button";
import type { Coupon } from "@/types";

export interface CouponCardProps {
  appliedCoupon: Coupon | null;
  couponError?: string;
  onApplyCoupon: (code: string) => void;
  onRemoveCoupon: () => void;
}

export const CouponCard: React.FC<CouponCardProps> = ({
  appliedCoupon,
  couponError,
  onApplyCoupon,
  onRemoveCoupon,
}) => {
  const [inputCode, setInputCode] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) {
      setLocalError("Please enter a coupon code");
      return;
    }
    setLocalError(null);
    onApplyCoupon(inputCode.trim());
    setInputCode("");
  };

  const errorMessage = localError || couponError;

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-4">
      <div className="flex items-center gap-2">
        <Tag className="w-5 h-5 text-primary" />
        <h3 className="text-base font-bold text-gray-900 font-sans">Coupon Code</h3>
      </div>

      {appliedCoupon ? (
        <div className="p-4 bg-primary-tint/60 border border-primary-soft rounded-xl flex items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-primary bg-white px-2.5 py-0.5 rounded-full border border-primary/30">
                {appliedCoupon.code}
              </span>
              <span className="text-xs font-semibold text-gray-700">Applied</span>
            </div>
            <p className="text-xs text-gray-600 font-body">{appliedCoupon.description}</p>
          </div>

          <button
            type="button"
            onClick={onRemoveCoupon}
            className="text-xs font-semibold text-danger hover:underline flex items-center gap-1 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>Remove</span>
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch gap-2">
            <input
              type="text"
              value={inputCode}
              onChange={(e) => {
                setInputCode(e.target.value);
                if (localError) setLocalError(null);
              }}
              placeholder="Enter coupon code (e.g. ECO10)"
              className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-gray-400 font-body uppercase"
            />
            <Button variant="primary" size="sm" type="submit" className="justify-center">
              Apply Coupon
            </Button>
          </div>

          {errorMessage && (
            <div className="text-xs text-danger font-medium flex items-center gap-1.5 pt-1">
              <Info className="w-3.5 h-3.5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Test suggestions pill */}
          <div className="pt-1 flex flex-wrap items-center gap-1.5 text-[11px] text-gray-500">
            <span className="font-medium">Try coupons:</span>
            {["ECO10", "FREESHIP", "ORGANIC20"].map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => {
                  onApplyCoupon(code);
                  setLocalError(null);
                }}
                className="px-2 py-0.5 bg-gray-50 hover:bg-primary-tint hover:text-primary rounded-md border border-gray-200/80 font-mono font-semibold transition-colors cursor-pointer"
              >
                {code}
              </button>
            ))}
          </div>
        </form>
      )}
    </div>
  );
};
