"use client";

import React, { useEffect, useMemo } from "react";
import Link from "next/link";
import { X, ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import { Button } from "@/components/common/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCartFlyoutOpen } from "@/store/slices/uiSlice";
import { removeFromCart } from "@/store/slices/cartSlice";
import { calculateCartTotals } from "@/lib/cartUtils";
import { formatPrice } from "@/lib/utils";

export const CartFlyout: React.FC = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.isCartFlyoutOpen);
  const cartItems = useAppSelector((state) => state.cart.items);
  const couponCode = useAppSelector((state) => state.cart.couponCode);

  const { itemCount, subtotal } = useMemo(
    () => calculateCartTotals(cartItems, couponCode),
    [cartItems, couponCode]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        dispatch(setCartFlyoutOpen(false));
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, dispatch]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart Drawer"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={() => dispatch(setCartFlyoutOpen(false))}
        aria-hidden="true"
      />

      {/* Slide-over Drawer Panel */}
      <div className="relative z-10 w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-250">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-gray-900" />
            <h3 className="text-lg font-bold text-gray-900 font-sans">
              Shopping Cart ({itemCount})
            </h3>
          </div>
          <button
            type="button"
            onClick={() => dispatch(setCartFlyoutOpen(false))}
            className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        {cartItems.length === 0 ? (
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center overflow-y-auto">
            <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 mb-4">
              <ShoppingBag className="w-10 h-10 stroke-[1.2]" />
            </div>
            <h4 className="text-base font-semibold text-gray-800 mb-1 font-sans">
              Your cart is currently empty
            </h4>
            <p className="text-xs text-gray-500 max-w-xs mb-6 font-body">
              Looks like you haven&apos;t added any fresh organic produce to your cart yet.
            </p>
            <Button
              variant="primary"
              size="sm"
              onClick={() => dispatch(setCartFlyoutOpen(false))}
            >
              <Link href="/shop" className="flex items-center gap-2">
                <span>Start Shopping</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        ) : (
          <div className="flex-1 p-6 overflow-y-auto divide-y divide-gray-100">
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className="py-4 first:pt-0 last:pb-0 flex items-center gap-4"
              >
                <Link
                  href={`/shop/${item.product.id}`}
                  onClick={() => dispatch(setCartFlyoutOpen(false))}
                  className="w-16 h-16 rounded-xl border border-gray-100 bg-gray-50/50 shrink-0 overflow-hidden flex items-center justify-center"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <Link
                    href={`/shop/${item.product.id}`}
                    onClick={() => dispatch(setCartFlyoutOpen(false))}
                    className="text-sm font-semibold text-gray-900 hover:text-primary transition-colors block truncate"
                  >
                    {item.product.name}
                  </Link>
                  <div className="text-xs text-gray-500 mt-1">
                    <span>{item.quantity} × </span>
                    <strong className="text-primary font-bold">
                      {formatPrice(item.product.price)}
                    </strong>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => dispatch(removeFromCart(item.product.id))}
                  className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-danger hover:border-danger transition-colors cursor-pointer shrink-0"
                  aria-label={`Remove ${item.product.name} from cart`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Footer Subtotal & Action Buttons */}
        <div className="p-6 border-t border-gray-100 bg-gray-50/50 space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 font-medium">
              {itemCount} {itemCount === 1 ? "Product" : "Products"}
            </span>
            <span className="text-base font-bold text-gray-900">
              {formatPrice(subtotal)}
            </span>
          </div>

          <div className="space-y-2.5">
            <Button
              variant="primary"
              className="w-full justify-center"
              onClick={() => dispatch(setCartFlyoutOpen(false))}
              disabled={cartItems.length === 0}
            >
              <Link href="/checkout" className="w-full text-center">
                Checkout
              </Link>
            </Button>
            <Button
              variant="secondary"
              className="w-full justify-center"
              onClick={() => dispatch(setCartFlyoutOpen(false))}
            >
              <Link href="/cart" className="w-full text-center">
                Go To Cart
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
