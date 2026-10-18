"use client";

import React, { useState } from "react";
import { Heart, ShoppingBag, Check } from "lucide-react";
import { Modal } from "@/components/common/Modal";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { RatingStars } from "@/components/common/RatingStars";
import { QuantitySelector } from "@/components/common/QuantitySelector";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeQuickView } from "@/store/slices/uiSlice";
import { addToCart } from "@/store/slices/cartSlice";
import { toggleWishlist } from "@/store/slices/wishlistSlice";
import { formatPrice } from "@/lib/utils";

export const ProductQuickViewModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.isQuickViewOpen);
  const product = useAppSelector((state) => state.ui.quickViewProduct);
  const wishlistItems = useAppSelector((state) => state.wishlist.items);

  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const isWishlisted = product
    ? wishlistItems.some((item) => item.id === product.id)
    : false;

  if (!product) return null;

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist(product));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => dispatch(closeQuickView())}
      maxWidth="3xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
        {/* Left: Product Image Gallery Preview */}
        <div className="flex flex-col gap-3">
          <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center border border-gray-100">
            {product.discountPercentage ? (
              <div className="absolute top-3 left-3 z-10">
                <Badge variant="sale">Sale {product.discountPercentage}%</Badge>
              </div>
            ) : null}
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right: Details & Buying Box */}
        <div className="flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                {product.category}
              </span>
              <Badge variant={product.inStock ? "inStock" : "outOfStock"} size="sm">
                {product.inStock ? "In Stock" : "Out of Stock"}
              </Badge>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 font-sans">
              {product.name}
            </h3>

            <div className="flex items-center gap-3">
              <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
              <span className="text-xs text-gray-300">|</span>
              <span className="text-xs text-gray-500 font-medium">
                SKU: ECO-{product.id}
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-extrabold text-primary">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <p className="text-xs text-gray-600 font-body leading-relaxed line-clamp-3">
              {product.description}
            </p>
          </div>

          {/* Stepper & Actions */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <QuantitySelector value={quantity} onChange={setQuantity} />
              <Button
                variant="primary"
                onClick={handleAddToCart}
                className="flex-1 justify-center"
                leftIcon={
                  isAdded ? (
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  ) : (
                    <ShoppingBag className="w-4 h-4" />
                  )
                }
              >
                {isAdded ? "Added to Cart" : "Add to Cart"}
              </Button>
              <button
                type="button"
                onClick={handleToggleWishlist}
                aria-label="Wishlist"
                className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-gray-700 hover:text-primary hover:border-primary transition-colors cursor-pointer"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? "fill-danger text-danger" : ""}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
