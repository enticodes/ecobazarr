"use client";

import React from "react";
import { SlidersHorizontal, LayoutGrid, List } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSortBy } from "@/store/slices/filterSlice";
import { cn } from "@/lib/utils";

export interface ShopToolbarProps {
  totalResults: number;
  onOpenMobileFilters: () => void;
  viewMode: "grid" | "list";
  onChangeViewMode: (mode: "grid" | "list") => void;
}

export const ShopToolbar: React.FC<ShopToolbarProps> = ({
  totalResults,
  onOpenMobileFilters,
  viewMode,
  onChangeViewMode,
}) => {
  const dispatch = useAppDispatch();
  const sortBy = useAppSelector((state) => state.filter.sortBy);

  return (
    <div className="w-full bg-white border border-gray-100 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs mb-6">
      {/* Left: Mobile Filter Button & Results Counter */}
      <div className="flex items-center justify-between w-full sm:w-auto gap-4">
        <button
          type="button"
          onClick={onOpenMobileFilters}
          className="lg:hidden flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-xs font-semibold focus:outline-none cursor-pointer"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Filters</span>
        </button>

        <span className="text-sm text-gray-500 font-medium">
          <strong className="text-gray-900 font-bold">{totalResults}</strong> Results Found
        </span>
      </div>

      {/* Right: Sort Dropdown & View Mode */}
      <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
        {/* Sort By Select */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-500 font-medium whitespace-nowrap">
            Sort by:
          </span>
          <select
            value={sortBy}
            onChange={(e) =>
              dispatch(
                setSortBy(
                  e.target.value as "latest" | "price-asc" | "price-desc" | "rating"
                )
              )
            }
            className="h-9 px-3 text-xs font-semibold text-gray-800 bg-gray-50 border border-gray-200 rounded-lg outline-none cursor-pointer focus:border-primary"
          >
            <option value="latest">Latest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Rating: High to Low</option>
          </select>
        </div>

        {/* View Mode Toggle Buttons */}
        <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-lg border border-gray-100">
          <button
            type="button"
            onClick={() => onChangeViewMode("grid")}
            aria-label="Grid view"
            className={cn(
              "p-1.5 rounded-md transition-colors",
              viewMode === "grid"
                ? "bg-white text-primary shadow-xs"
                : "text-gray-400 hover:text-gray-700"
            )}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onChangeViewMode("list")}
            aria-label="List view"
            className={cn(
              "p-1.5 rounded-md transition-colors",
              viewMode === "list"
                ? "bg-white text-primary shadow-xs"
                : "text-gray-400 hover:text-gray-700"
            )}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
