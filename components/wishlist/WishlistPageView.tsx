"use client";

import React from "react";
import Link from "next/link";
import { Heart, ArrowLeft, Trash2, Share2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeFromWishlist, clearWishlist } from "@/store/slices/wishlistSlice";
import { addToCart } from "@/store/slices/cartSlice";
import { WishlistTable } from "./WishlistTable";
import { ShopBreadcrumbs } from "@/components/shop";
import { Button } from "@/components/common/Button";

export const WishlistPageView: React.FC = () => {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);

  return (
    <div className="w-full bg-white pb-20">
      {/* 1. Breadcrumbs */}
      <ShopBreadcrumbs items={[{ label: "Wishlist" }]} />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-sans tracking-tight">
          My Wishlist
        </h1>

        {wishlistItems.length === 0 ? (
          <div className="w-full py-20 bg-gray-50/50 rounded-2xl border border-gray-100 flex flex-col items-center justify-center text-center p-8">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-4">
              <Heart className="w-10 h-10 stroke-[1.2]" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 font-sans mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-sm text-gray-500 max-w-sm mb-6 font-body">
              Save your favorite organic fruits, vegetables, and artisan foods here while you explore our shop.
            </p>
            <Button variant="primary" size="md">
              <Link href="/shop" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Explore Products</span>
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <WishlistTable
              items={wishlistItems}
              onAddToCart={(product) =>
                dispatch(addToCart({ product, quantity: 1 }))
              }
              onRemoveItem={(id) => dispatch(removeFromWishlist(id))}
            />

            {/* Bottom Actions & Sharing */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-3 text-xs text-gray-600 font-body">
                <span className="font-semibold text-gray-900 flex items-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5 text-primary" />
                  Share Wishlist:
                </span>
                <span className="text-gray-400">Facebook, Twitter, Pinterest</span>
              </div>

              <div className="flex items-center gap-3">
                <Button variant="secondary" size="sm">
                  <Link href="/shop" className="flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Continue Shopping</span>
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => dispatch(clearWishlist())}
                  className="text-danger hover:bg-danger/10 hover:text-danger hover:border-danger"
                  leftIcon={<Trash2 className="w-4 h-4" />}
                >
                  Clear Wishlist
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
