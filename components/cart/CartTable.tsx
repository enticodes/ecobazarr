"use client";

import React from "react";
import Link from "next/link";
import { X } from "lucide-react";
import type { CartItem } from "@/types";
import { QuantitySelector } from "@/components/common/QuantitySelector";
import { formatPrice } from "@/lib/utils";

export interface CartTableProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
}

export const CartTable: React.FC<CartTableProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs">
      {/* Desktop Table Header */}
      <div className="hidden md:grid grid-cols-12 gap-4 bg-gray-50/70 px-6 py-4 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider font-sans">
        <div className="col-span-5">Product</div>
        <div className="col-span-2 text-center">Price</div>
        <div className="col-span-3 text-center">Quantity</div>
        <div className="col-span-2 text-right">Subtotal</div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-gray-100">
        {items.map((item) => {
          const lineTotal = item.product.price * item.quantity;

          return (
            <div
              key={item.product.id}
              className="p-4 sm:p-6 flex flex-col md:grid md:grid-cols-12 md:items-center gap-4 transition-colors hover:bg-gray-50/30"
            >
              {/* Product Info */}
              <div className="md:col-span-5 flex items-center gap-4">
                <Link
                  href={`/shop/${item.product.id}`}
                  className="w-20 h-20 rounded-xl border border-gray-100 bg-gray-50/50 shrink-0 overflow-hidden flex items-center justify-center group"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <Link
                    href={`/shop/${item.product.id}`}
                    className="text-sm font-bold text-gray-900 hover:text-primary transition-colors block truncate font-sans"
                  >
                    {item.product.name}
                  </Link>
                  <span className="text-xs text-gray-400 block mt-0.5">
                    {item.product.category}
                  </span>
                  {/* Mobile-only unit price */}
                  <span className="md:hidden text-xs text-primary font-semibold block mt-1">
                    {formatPrice(item.product.price)} each
                  </span>
                </div>
              </div>

              {/* Unit Price (Desktop) */}
              <div className="hidden md:block md:col-span-2 text-center text-sm font-medium text-gray-700">
                {formatPrice(item.product.price)}
              </div>

              {/* Quantity Stepper */}
              <div className="md:col-span-3 flex items-center justify-between md:justify-center gap-3">
                <span className="md:hidden text-xs text-gray-500 font-medium">
                  Quantity:
                </span>
                <QuantitySelector
                  value={item.quantity}
                  size="sm"
                  onChange={(newQty) =>
                    onUpdateQuantity(item.product.id, newQty)
                  }
                />
              </div>

              {/* Line Subtotal & Remove Action */}
              <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-gray-50">
                <div className="flex items-center gap-2 md:block md:text-right">
                  <span className="md:hidden text-xs text-gray-500 font-medium">
                    Subtotal:
                  </span>
                  <span className="text-base md:text-sm font-bold text-gray-900">
                    {formatPrice(lineTotal)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onRemoveItem(item.product.id)}
                  aria-label={`Remove ${item.product.name} from cart`}
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
