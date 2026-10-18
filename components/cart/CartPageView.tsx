"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { ShoppingBag, ArrowLeft, Trash2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  updateQuantity,
  removeFromCart,
  clearCart,
  applyCoupon,
  removeCoupon,
} from "@/store/slices/cartSlice";
import { calculateCartTotals } from "@/lib/cartUtils";
import { CartTable, CouponCard, CartSummary } from "@/components/cart";
import { ShopBreadcrumbs } from "@/components/shop";
import { Button } from "@/components/common/Button";

export const CartPageView: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const couponCode = useAppSelector((state) => state.cart.couponCode);

  const totals = useMemo(
    () => calculateCartTotals(cartItems, couponCode),
    [cartItems, couponCode]
  );

  return (
    <div className="w-full bg-white pb-20">
      {/* 1. Breadcrumbs */}
      <ShopBreadcrumbs items={[{ label: "Shopping Cart" }]} />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-sans tracking-tight">
          My Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="w-full py-20 bg-gray-50/50 rounded-2xl border border-gray-100 flex flex-col items-center justify-center text-center p-8">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-4">
              <ShoppingBag className="w-10 h-10 stroke-[1.2]" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 font-sans mb-2">
              Your shopping cart is empty
            </h2>
            <p className="text-sm text-gray-500 max-w-sm mb-6 font-body">
              Explore our fresh organic fruits, vegetables, and pantry harvest to start adding items.
            </p>
            <Button variant="primary" size="md">
              <Link href="/shop" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Shop</span>
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Cart Table & Coupon Card */}
            <div className="lg:col-span-8 space-y-6">
              <CartTable
                items={cartItems}
                onUpdateQuantity={(id, qty) =>
                  dispatch(updateQuantity({ productId: id, quantity: qty }))
                }
                onRemoveItem={(id) => dispatch(removeFromCart(id))}
              />

              {/* Action Buttons Below Table */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <Button variant="secondary" size="sm">
                  <Link href="/shop" className="flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Return to shop</span>
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => dispatch(clearCart())}
                  className="text-danger hover:bg-danger/10 hover:text-danger hover:border-danger"
                  leftIcon={<Trash2 className="w-4 h-4" />}
                >
                  Clear Cart
                </Button>
              </div>

              {/* Coupon Form Card */}
              <CouponCard
                appliedCoupon={totals.appliedCoupon}
                couponError={totals.couponError}
                onApplyCoupon={(code) => dispatch(applyCoupon(code))}
                onRemoveCoupon={() => dispatch(removeCoupon())}
              />
            </div>

            {/* Right: Cart Totals & Checkout CTA */}
            <div className="lg:col-span-4 sticky top-28">
              <CartSummary totals={totals} disabled={cartItems.length === 0} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
