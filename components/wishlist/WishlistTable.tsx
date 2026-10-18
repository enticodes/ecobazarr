"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, ShoppingBag, Check } from "lucide-react";
import type { Product } from "@/types";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { formatPrice } from "@/lib/utils";

export interface WishlistTableProps {
  items: Product[];
  onAddToCart: (product: Product) => void;
  onRemoveItem: (productId: string) => void;
}

export const WishlistTable: React.FC<WishlistTableProps> = ({
  items,
  onAddToCart,
  onRemoveItem,
}) => {
  const [addedMap, setAddedMap] = useState<Record<string, boolean>>({});

  const handleAdd = (product: Product) => {
    onAddToCart(product);
    setAddedMap((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedMap((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs">
      {/* Desktop Header */}
      <div className="hidden md:grid grid-cols-12 gap-4 bg-gray-50/70 px-6 py-4 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider font-sans">
        <div className="col-span-5">Product</div>
        <div className="col-span-2 text-center">Price</div>
        <div className="col-span-2 text-center">Stock Status</div>
        <div className="col-span-3 text-right">Actions</div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-gray-100">
        {items.map((product) => {
          const isAdded = !!addedMap[product.id];

          return (
            <div
              key={product.id}
              className="p-4 sm:p-6 flex flex-col md:grid md:grid-cols-12 md:items-center gap-4 transition-colors hover:bg-gray-50/30"
            >
              {/* Product Info */}
              <div className="md:col-span-5 flex items-center gap-4">
                <Link
                  href={`/shop/${product.id}`}
                  className="w-20 h-20 rounded-xl border border-gray-100 bg-gray-50/50 shrink-0 overflow-hidden flex items-center justify-center group"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <Link
                    href={`/shop/${product.id}`}
                    className="text-sm font-bold text-gray-900 hover:text-primary transition-colors block truncate font-sans"
                  >
                    {product.name}
                  </Link>
                  <span className="text-xs text-gray-400 block mt-0.5">
                    {product.category}
                  </span>
                  <div className="md:hidden flex items-center gap-2 mt-2">
                    <span className="text-xs font-bold text-primary">
                      {formatPrice(product.price)}
                    </span>
                    <Badge
                      variant={product.inStock ? "inStock" : "outOfStock"}
                      size="sm"
                    >
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Price (Desktop) */}
              <div className="hidden md:flex md:col-span-2 items-center justify-center gap-2 text-sm font-semibold text-gray-800">
                <span>{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-xs text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Stock Status (Desktop) */}
              <div className="hidden md:flex md:col-span-2 items-center justify-center">
                <Badge
                  variant={product.inStock ? "inStock" : "outOfStock"}
                  size="sm"
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </Badge>
              </div>

              {/* Actions */}
              <div className="md:col-span-3 flex items-center justify-between md:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-gray-50">
                <Button
                  variant="primary"
                  size="sm"
                  disabled={!product.inStock}
                  onClick={() => handleAdd(product)}
                  className="flex-1 md:flex-none justify-center"
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
                  onClick={() => onRemoveItem(product.id)}
                  aria-label={`Remove ${product.name} from wishlist`}
                  className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-danger hover:border-danger hover:bg-danger/5 transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
