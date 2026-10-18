"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, Heart, ShoppingBag, Check } from "lucide-react";
import type { Product } from "@/types";
import { RatingStars } from "@/components/common/RatingStars";
import { Badge } from "@/components/common/Badge";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { openQuickView } from "@/store/slices/uiSlice";
import { addToCart } from "@/store/slices/cartSlice";
import { toggleWishlist } from "@/store/slices/wishlistSlice";
import { cn, formatPrice } from "@/lib/utils";

export interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className,
}) => {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const isWishlisted = wishlistItems.some((item) => item.id === product.id);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ product, quantity: 1 }));
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 1500);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist(product));
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(openQuickView(product));
  };

  return (
    <div
      className={cn(
        "group relative bg-white border border-gray-100 rounded-lg p-4 flex flex-col justify-between transition-all duration-200 hover:border-primary-light hover:shadow-card",
        className
      )}
    >
      {/* Top Bar: Badges & Action Buttons */}
      <div className="relative w-full aspect-square mb-3 flex items-center justify-center overflow-hidden rounded-md bg-gray-50/50">
        {/* Sale / Out of Stock Badges */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
          {product.discountPercentage ? (
            <Badge variant="sale" size="sm">
              Sale {product.discountPercentage}%
            </Badge>
          ) : null}
          {!product.inStock && (
            <Badge variant="outOfStock" size="sm">
              Out of Stock
            </Badge>
          )}
        </div>

        {/* Hover Floating Action Buttons */}
        <div className="absolute top-2 right-2 z-10 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            type="button"
            onClick={handleToggleWishlist}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className={cn(
              "w-9 h-9 rounded-full flex items-center justify-center shadow-xs transition-colors focus:outline-none cursor-pointer",
              isWishlisted
                ? "bg-danger text-white"
                : "bg-white text-gray-700 hover:bg-primary hover:text-white"
            )}
          >
            <Heart className={cn("w-4 h-4", isWishlisted && "fill-current")} />
          </button>
          <button
            type="button"
            onClick={handleQuickView}
            aria-label="Quick view product"
            className="w-9 h-9 rounded-full bg-white text-gray-700 hover:bg-primary hover:text-white flex items-center justify-center shadow-xs transition-colors focus:outline-none cursor-pointer"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Product Image */}
        <Link href={`/shop/${product.id}`} className="w-full h-full flex items-center justify-center">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </Link>
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-1 justify-between gap-2">
        <div>
          <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wider block">
            {product.category}
          </span>
          <Link
            href={`/shop/${product.id}`}
            className="text-sm font-semibold text-gray-800 hover:text-primary transition-colors line-clamp-1 mt-0.5"
          >
            {product.name}
          </Link>
        </div>

        {/* Price & Add to Cart Row */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-sm sm:text-base font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <RatingStars rating={product.rating} size="sm" showCountText={false} />
          </div>

          {/* Add to Cart Icon Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary shrink-0",
              isAddedToCart
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-900 hover:bg-primary hover:text-white"
            )}
          >
            {isAddedToCart ? (
              <Check className="w-4 h-4 stroke-[2.5]" />
            ) : (
              <ShoppingBag className="w-4 h-4 stroke-[1.8]" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
