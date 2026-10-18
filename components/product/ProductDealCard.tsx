"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, Heart, ShoppingBag, Check } from "lucide-react";
import type { Product } from "@/types";
import { RatingStars } from "@/components/common/RatingStars";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { useCountdown } from "@/hooks/useCountdown";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { openQuickView } from "@/store/slices/uiSlice";
import { addToCart } from "@/store/slices/cartSlice";
import { toggleWishlist } from "@/store/slices/wishlistSlice";
import { cn, formatPrice } from "@/lib/utils";

export interface ProductDealCardProps {
  product: Product;
  className?: string;
}

const DEFAULT_DEAL_END = "2026-11-30T23:59:59.000Z";

export const ProductDealCard: React.FC<ProductDealCardProps> = ({
  product,
  className,
}) => {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const isWishlisted = wishlistItems.some((item) => item.id === product.id);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const targetDate = product.dealEndsAt || DEFAULT_DEAL_END;
  const { days, hours, minutes, seconds } = useCountdown(targetDate);

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity: 1 }));
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 1500);
  };

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist(product));
  };

  return (
    <div
      className={cn(
        "group relative bg-white border-2 border-primary/20 rounded-xl p-5 flex flex-col justify-between transition-all duration-200 hover:border-primary hover:shadow-card-hover",
        className
      )}
    >
      {/* Top Media Container */}
      <div className="relative w-full aspect-4/3 mb-4 flex items-center justify-center overflow-hidden rounded-lg bg-gray-50">
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          <Badge variant="sale">Sale 50%</Badge>
          <Badge variant="hot">Best Deal</Badge>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5">
          <button
            type="button"
            onClick={handleToggleWishlist}
            aria-label="Wishlist"
            className={cn(
              "w-9 h-9 rounded-full flex items-center justify-center shadow-xs transition-colors cursor-pointer",
              isWishlisted
                ? "bg-danger text-white"
                : "bg-white text-gray-700 hover:bg-primary hover:text-white"
            )}
          >
            <Heart className={cn("w-4 h-4", isWishlisted && "fill-current")} />
          </button>
          <button
            type="button"
            onClick={() => dispatch(openQuickView(product))}
            aria-label="Quick View"
            className="w-9 h-9 rounded-full bg-white text-gray-700 hover:bg-primary hover:text-white flex items-center justify-center shadow-xs transition-colors cursor-pointer"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        <Link href={`/shop/${product.id}`} className="w-full h-full flex items-center justify-center">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
      </div>

      {/* Info & Details */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
            {product.category}
          </span>
          <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="sm" />
        </div>

        <Link
          href={`/shop/${product.id}`}
          className="text-base font-bold text-gray-900 hover:text-primary transition-colors block line-clamp-1"
        >
          {product.name}
        </Link>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-primary">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Live Countdown Timer */}
        <div className="space-y-1 pt-1">
          <span className="text-[11px] text-gray-500 font-medium uppercase tracking-wider block">
            Hurry up! Offer ends in:
          </span>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-gray-50 border border-gray-100 rounded-lg p-2">
              <span className="text-base font-bold text-gray-900 block leading-tight">
                {String(days).padStart(2, "0")}
              </span>
              <span className="text-[10px] text-gray-400 uppercase font-semibold">
                Days
              </span>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-lg p-2">
              <span className="text-base font-bold text-gray-900 block leading-tight">
                {String(hours).padStart(2, "0")}
              </span>
              <span className="text-[10px] text-gray-400 uppercase font-semibold">
                Hours
              </span>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-lg p-2">
              <span className="text-base font-bold text-gray-900 block leading-tight">
                {String(minutes).padStart(2, "0")}
              </span>
              <span className="text-[10px] text-gray-400 uppercase font-semibold">
                Mins
              </span>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-lg p-2">
              <span className="text-base font-bold text-gray-900 block leading-tight">
                {String(seconds).padStart(2, "0")}
              </span>
              <span className="text-[10px] text-gray-400 uppercase font-semibold">
                Secs
              </span>
            </div>
          </div>
        </div>

        {/* Full-width Add to Cart Button */}
        <Button
          variant="primary"
          className="w-full justify-center mt-3"
          onClick={handleAddToCart}
          leftIcon={
            isAddedToCart ? (
              <Check className="w-4 h-4 stroke-[2.5]" />
            ) : (
              <ShoppingBag className="w-4 h-4" />
            )
          }
        >
          {isAddedToCart ? "Added to Cart" : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
};
