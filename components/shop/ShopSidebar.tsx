"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, RotateCcw, Star, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setCategory,
  setPriceRange,
  setRating,
  toggleTag,
  setInStockOnly,
  resetFilters,
} from "@/store/slices/filterSlice";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  "All Categories",
  "Fresh Fruit",
  "Vegetables",
  "Meat & Fish",
  "Bread & Bakery",
  "Beverages",
  "Snacks",
  "Beauty & Health",
];

const POPULAR_TAGS = [
  "Healthy",
  "Low fat",
  "Vegetarian",
  "Bread",
  "Meat",
  "Fresh",
  "Fruit",
  "Organic",
];

export interface ShopSidebarProps {
  onCloseMobile?: () => void;
  isMobile?: boolean;
}

export const ShopSidebar: React.FC<ShopSidebarProps> = ({
  onCloseMobile,
  isMobile = false,
}) => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filter);

  const [isCatOpen, setIsCatOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isRatingOpen, setIsRatingOpen] = useState(true);
  const [isTagOpen, setIsTagOpen] = useState(true);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxVal = Number(e.target.value);
    dispatch(setPriceRange([filters.priceRange[0], maxVal]));
  };

  return (
    <aside
      className={cn(
        "w-full flex flex-col gap-6 text-gray-900",
        !isMobile && "max-w-[312px] shrink-0"
      )}
    >
      {/* Mobile Drawer Header */}
      {isMobile && (
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <h3 className="text-lg font-bold font-sans">Filter Products</h3>
          <button
            type="button"
            onClick={onCloseMobile}
            className="p-1 rounded-full text-gray-400 hover:text-gray-900"
            aria-label="Close filters"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Top Filter Bar with Reset Action */}
      <div className="flex items-center justify-between bg-primary-tint/50 p-3.5 rounded-xl border border-primary-soft">
        <span className="text-xs font-bold uppercase tracking-wider text-primary">
          Filters Active
        </span>
        <button
          type="button"
          onClick={() => dispatch(resetFilters())}
          className="flex items-center gap-1.5 text-xs font-semibold text-danger hover:underline cursor-pointer focus:outline-none"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All</span>
        </button>
      </div>

      {/* 1. All Categories Accordion */}
      <div className="border border-gray-100 rounded-xl p-5 bg-white shadow-xs">
        <button
          type="button"
          onClick={() => setIsCatOpen(!isCatOpen)}
          className="w-full flex items-center justify-between font-bold text-base font-sans text-gray-900 focus:outline-none"
        >
          <span>All Categories</span>
          <ChevronDown
            className={cn(
              "w-4 h-4 text-gray-400 transition-transform",
              isCatOpen && "rotate-180"
            )}
          />
        </button>

        {isCatOpen && (
          <ul className="mt-4 space-y-2 text-sm text-gray-600 font-body">
            {CATEGORIES.map((cat) => {
              const isSelected =
                cat === "All Categories"
                  ? filters.category === null
                  : filters.category?.toLowerCase() === cat.toLowerCase();

              return (
                <li key={cat}>
                  <button
                    type="button"
                    onClick={() => {
                      dispatch(
                        setCategory(cat === "All Categories" ? null : cat)
                      );
                      if (isMobile) onCloseMobile?.();
                    }}
                    className={cn(
                      "w-full text-left py-1 px-2 rounded-md transition-colors flex items-center justify-between",
                      isSelected
                        ? "text-primary font-bold bg-primary-tint"
                        : "hover:text-primary hover:bg-gray-50"
                    )}
                  >
                    <span>{cat}</span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-primary" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* 2. Price Filter Range */}
      <div className="border border-gray-100 rounded-xl p-5 bg-white shadow-xs">
        <button
          type="button"
          onClick={() => setIsPriceOpen(!isPriceOpen)}
          className="w-full flex items-center justify-between font-bold text-base font-sans text-gray-900 focus:outline-none"
        >
          <span>Price</span>
          <ChevronDown
            className={cn(
              "w-4 h-4 text-gray-400 transition-transform",
              isPriceOpen && "rotate-180"
            )}
          />
        </button>

        {isPriceOpen && (
          <div className="mt-4 space-y-3">
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={filters.priceRange[1]}
              onChange={handlePriceChange}
              className="w-full accent-primary cursor-pointer"
            />
            <div className="flex items-center justify-between text-xs font-semibold text-gray-700">
              <span>Price: $0 — ${filters.priceRange[1]}</span>
            </div>
          </div>
        )}
      </div>

      {/* 3. Rating Filter */}
      <div className="border border-gray-100 rounded-xl p-5 bg-white shadow-xs">
        <button
          type="button"
          onClick={() => setIsRatingOpen(!isRatingOpen)}
          className="w-full flex items-center justify-between font-bold text-base font-sans text-gray-900 focus:outline-none"
        >
          <span>Rating</span>
          <ChevronDown
            className={cn(
              "w-4 h-4 text-gray-400 transition-transform",
              isRatingOpen && "rotate-180"
            )}
          />
        </button>

        {isRatingOpen && (
          <div className="mt-4 space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => (
              <label
                key={stars}
                className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer hover:text-gray-900 select-none"
              >
                <input
                  type="checkbox"
                  checked={filters.rating === stars}
                  onChange={() =>
                    dispatch(
                      setRating(filters.rating === stars ? null : stars)
                    )
                  }
                  className="rounded text-primary focus:ring-primary w-4 h-4 accent-primary"
                />
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-3.5 h-3.5",
                        i < stars
                          ? "fill-accent-orange text-accent-orange"
                          : "text-gray-200"
                      )}
                    />
                  ))}
                  <span className="ml-1 text-gray-600 font-medium">
                    {stars}.0 {stars < 5 && "& up"}
                  </span>
                </div>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 4. Popular Tags Cloud */}
      <div className="border border-gray-100 rounded-xl p-5 bg-white shadow-xs">
        <button
          type="button"
          onClick={() => setIsTagOpen(!isTagOpen)}
          className="w-full flex items-center justify-between font-bold text-base font-sans text-gray-900 focus:outline-none"
        >
          <span>Popular Tags</span>
          <ChevronDown
            className={cn(
              "w-4 h-4 text-gray-400 transition-transform",
              isTagOpen && "rotate-180"
            )}
          />
        </button>

        {isTagOpen && (
          <div className="mt-4 flex flex-wrap gap-2">
            {POPULAR_TAGS.map((tag) => {
              const isSelected = filters.tags.includes(tag);

              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => dispatch(toggleTag(tag))}
                  className={cn(
                    "text-xs px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer",
                    isSelected
                      ? "bg-primary text-white"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200/60"
                  )}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. Stock Status Toggle */}
      <div className="border border-gray-100 rounded-xl p-5 bg-white shadow-xs">
        <label className="flex items-center justify-between cursor-pointer select-none">
          <span className="font-bold text-sm text-gray-900">In Stock Only</span>
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => dispatch(setInStockOnly(e.target.checked))}
            className="w-4 h-4 accent-primary rounded text-primary"
          />
        </label>
      </div>

      {/* 6. Sidebar Promo Banner (as in Figma 07_Shop 1) */}
      <div className="relative rounded-2xl overflow-hidden p-6 bg-gradient-to-t from-emerald-950 to-emerald-900 text-white space-y-3 shadow-sm text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-primary-light block">
          79% Discount
        </span>
        <h4 className="text-xl font-extrabold font-sans leading-tight">
          100% Organic Food
        </h4>
        <p className="text-xs text-white/80">Best organic items from our verified farms.</p>
        <div className="pt-2">
          <Link
            href="/shop"
            className="inline-block px-5 py-2 rounded-full bg-primary text-white text-xs font-bold hover:bg-primary-hover transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </aside>
  );
};
