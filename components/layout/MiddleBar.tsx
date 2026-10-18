"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Heart, ShoppingBag, Menu, ChevronDown } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleCartFlyout, toggleMobileMenu } from "@/store/slices/uiSlice";
import { calculateCartTotals } from "@/lib/cartUtils";
import { formatPrice } from "@/lib/utils";

const SEARCH_CATEGORIES = [
  "All Categories",
  "Fresh Fruit",
  "Vegetables",
  "River Fish",
  "Chicken & Meat",
  "Drink & Water",
  "Yogurt & Ice Cream",
  "Cake & Bread",
  "Butter & Cream",
  "Cooking",
];

export const MiddleBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isCatDropdownOpen, setIsCatDropdownOpen] = useState(false);
  const catDropdownRef = useRef<HTMLDivElement>(null);

  const cartItems = useAppSelector((state) => state.cart.items);
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const couponCode = useAppSelector((state) => state.cart.couponCode);

  useEffect(() => {
    if (!isCatDropdownOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        catDropdownRef.current &&
        !catDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCatDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsCatDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCatDropdownOpen]);

  const cartTotals = useMemo(
    () => calculateCartTotals(cartItems, couponCode),
    [cartItems, couponCode]
  );

  const displayWishlistCount = wishlistItems.length;
  const displayCartCount = cartTotals.itemCount;
  const displayCartTotal = formatPrice(cartTotals.subtotal);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/shop");
    }
  };

  return (
    <div className="w-full bg-white py-5 sm:py-6 border-b border-gray-100">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 sm:gap-8">
        {/* Left: Brand Logo & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => dispatch(toggleMobileMenu())}
            className="lg:hidden p-2 -ml-2 text-gray-700 hover:text-primary transition-colors focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <Logo />
        </div>

        {/* Center: Search Bar (Desktop & Tablet) */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex flex-1 max-w-xl items-center border border-gray-200 rounded-md overflow-visible relative focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all bg-white"
        >
          <div className="flex items-center pl-3.5 pr-2 pointer-events-none text-gray-400">
            <Search className="w-4 h-4 shrink-0" />
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full h-11 text-sm text-gray-900 placeholder:text-gray-400 bg-transparent outline-none pr-3"
            aria-label="Search products"
          />

          {/* Category Dropdown Filter */}
          <div ref={catDropdownRef} className="relative border-l border-gray-200 shrink-0">
            <button
              type="button"
              onClick={() => setIsCatDropdownOpen(!isCatDropdownOpen)}
              className="h-11 px-3 text-xs text-gray-700 hover:text-gray-900 flex items-center gap-1.5 focus:outline-none font-medium whitespace-nowrap"
            >
              <span>{selectedCategory}</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>

            {isCatDropdownOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-100 rounded-md shadow-dropdown py-1 z-50 max-h-60 overflow-y-auto">
                {SEARCH_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat);
                      setIsCatDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="h-11 px-6 bg-primary text-white text-sm font-semibold hover:bg-primary-hover active:bg-primary-dark transition-colors shrink-0 rounded-r-md cursor-pointer"
          >
            Search
          </button>
        </form>

        {/* Right: Wishlist & Cart Summary */}
        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
          {/* Wishlist Link */}
          <Link
            href="/wishlist"
            className="relative p-1.5 text-gray-900 hover:text-primary transition-colors focus:outline-none"
            aria-label={`Wishlist (${displayWishlistCount} items)`}
          >
            <Heart className="w-7 h-7 stroke-[1.5]" />
            <span className="absolute top-0 right-0 w-4.5 h-4.5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
              {displayWishlistCount}
            </span>
          </Link>

          <span className="h-8 w-px bg-gray-200 hidden sm:block" aria-hidden="true" />

          {/* Cart Widget Trigger */}
          <button
            type="button"
            onClick={() => dispatch(toggleCartFlyout())}
            className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
            aria-label={`Shopping Cart (${displayCartCount} items, ${displayCartTotal})`}
          >
            <div className="relative p-1.5 text-gray-900 group-hover:text-primary transition-colors">
              <ShoppingBag className="w-7 h-7 stroke-[1.5]" />
              <span className="absolute top-0 right-0 w-4.5 h-4.5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
                {displayCartCount}
              </span>
            </div>
            <div className="hidden lg:flex flex-col">
              <span className="text-[11px] text-gray-500 font-medium leading-tight">
                Shopping cart:
              </span>
              <span className="text-sm font-bold text-gray-900 leading-tight">
                {displayCartTotal}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Search Input */}
      <div className="md:hidden px-4 pt-3">
        <form
          onSubmit={handleSearchSubmit}
          className="flex w-full items-center border border-gray-200 rounded-md overflow-hidden bg-white"
        >
          <div className="pl-3 pr-2 text-gray-400">
            <Search className="w-4 h-4 shrink-0" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full h-10 text-sm text-gray-900 outline-none pr-3"
            aria-label="Search products"
          />
          <button
            type="submit"
            className="h-10 px-4 bg-primary text-white text-xs font-semibold"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};
