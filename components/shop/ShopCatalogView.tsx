"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { PackageOpen, RotateCcw } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductQuickViewModal } from "@/components/product/ProductQuickViewModal";
import {
  ShopBreadcrumbs,
  ShopSidebar,
  ShopToolbar,
  ShopPagination,
} from "@/components/shop";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCategory, resetFilters } from "@/store/slices/filterSlice";

const ITEMS_PER_PAGE = 12;

export const ShopCatalogView: React.FC = () => {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filter);

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);

  // Sync URL searchParams to filter state
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      dispatch(setCategory(categoryParam));
    }
  }, [searchParams, dispatch]);

  const queryParam = searchParams.get("q") || "";

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Search Query
      if (queryParam) {
        const q = queryParam.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc) return false;
      }

      // 2. Category Filter
      if (filters.category) {
        const cat = filters.category.toLowerCase().replace(/[-_]/g, " ");
        const prodCat = product.category.toLowerCase();
        if (!prodCat.includes(cat) && !cat.includes(prodCat)) {
          return false;
        }
      }

      // 3. Price Range Filter
      if (
        product.price < filters.priceRange[0] ||
        product.price > filters.priceRange[1]
      ) {
        return false;
      }

      // 4. Rating Filter
      if (filters.rating !== null && product.rating < filters.rating) {
        return false;
      }

      // 5. Stock Status Filter
      if (filters.inStockOnly && !product.inStock) {
        return false;
      }

      // 6. Popular Tags Filter
      if (filters.tags.length > 0) {
        const productTags = product.additionalInfo?.tags || [];
        const matchesTag = filters.tags.some((tag) =>
          productTags.some((pt) => pt.toLowerCase() === tag.toLowerCase())
        );
        if (!matchesTag) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === "price-asc") return a.price - b.price;
      if (filters.sortBy === "price-desc") return b.price - a.price;
      if (filters.sortBy === "rating") return b.rating - a.rating;
      return 0; // latest / default order
    });
  }, [filters, queryParam]);

  // Pagination calculation
  const totalResults = filteredProducts.length;
  const totalPages = Math.ceil(totalResults / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const [prevFilterKey, setPrevFilterKey] = useState("");
  const filterKey = `${queryParam}-${JSON.stringify(filters)}`;

  if (prevFilterKey !== filterKey) {
    setPrevFilterKey(filterKey);
    setCurrentPage(1);
  }

  return (
    <div className="w-full bg-white pb-16">
      {/* Breadcrumbs */}
      <ShopBreadcrumbs
        items={[
          { label: "Shop", href: "/shop" },
          ...(filters.category
            ? [{ label: filters.category }]
            : queryParam
            ? [{ label: `Search: "${queryParam}"` }]
            : []),
        ]}
      />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Desktop Left Filter Sidebar */}
          <div className="hidden lg:block w-78 shrink-0">
            <ShopSidebar />
          </div>

          {/* Main Catalog View Area */}
          <div className="flex-1 w-full">
            {/* Top Toolbar */}
            <ShopToolbar
              totalResults={totalResults}
              onOpenMobileFilters={() => setIsMobileFiltersOpen(true)}
              viewMode={viewMode}
              onChangeViewMode={setViewMode}
            />

            {/* Products Grid or Empty State */}
            {totalResults === 0 ? (
              <div className="w-full py-16 flex flex-col items-center justify-center text-center bg-gray-50/50 rounded-2xl border border-gray-100 p-8">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-4">
                  <PackageOpen className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 font-sans mb-1">
                  No matching products found
                </h3>
                <p className="text-xs text-gray-500 max-w-sm mb-6 font-body">
                  Try adjusting or clearing your active filters or search keyword to find what you&apos;re looking for.
                </p>
                <button
                  type="button"
                  onClick={() => dispatch(resetFilters())}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-xs font-semibold rounded-full hover:bg-primary-hover transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Clear All Filters</span>
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
                    : "flex flex-col gap-4"
                }
              >
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            <ShopPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>

      {/* Mobile Slide-Over Filter Drawer */}
      {isMobileFiltersOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden flex justify-start"
          role="dialog"
          aria-modal="true"
          aria-label="Filter products drawer"
        >
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileFiltersOpen(false)}
            aria-hidden="true"
          />
          <div className="relative z-10 w-full max-w-xs bg-white h-full shadow-2xl p-6 overflow-y-auto animate-in slide-in-from-left duration-200">
            <ShopSidebar
              isMobile
              onCloseMobile={() => setIsMobileFiltersOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      <ProductQuickViewModal />
    </div>
  );
};
