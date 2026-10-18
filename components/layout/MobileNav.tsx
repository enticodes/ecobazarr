"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, PhoneCall, ChevronRight } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setMobileMenuOpen } from "@/store/slices/uiSlice";
import { CATEGORIES_LIST } from "./CategoryDrawer";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Shopping Cart", href: "/cart" },
  { name: "My Wishlist", href: "/wishlist" },
  { name: "About Us", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact Us", href: "/contact" },
  { name: "FAQs", href: "/faqs" },
];

export const MobileNav: React.FC = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.isMobileMenuOpen);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        dispatch(setMobileMenuOpen(false));
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, dispatch]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden flex"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => dispatch(setMobileMenuOpen(false))}
        aria-hidden="true"
      />

      {/* Slide-out Drawer Surface */}
      <div className="relative z-10 w-full max-w-xs bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-200">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <Logo size="sm" />
            <button
              type="button"
              onClick={() => dispatch(setMobileMenuOpen(false))}
              className="p-1.5 rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors focus:outline-none"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Primary Nav Links */}
          <div className="p-4 border-b border-gray-100">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2 px-3">
              Navigation
            </p>
            <ul className="space-y-1">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => dispatch(setMobileMenuOpen(false))}
                      className={cn(
                        "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary-tint text-primary font-semibold"
                          : "text-gray-700 hover:bg-gray-50 hover:text-primary"
                      )}
                    >
                      <span>{item.name}</span>
                      <ChevronRight className="w-4 h-4 text-gray-300" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Categories Quick List */}
          <div className="p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2 px-3">
              Top Categories
            </p>
            <ul className="space-y-1 max-h-56 overflow-y-auto pr-1">
              {CATEGORIES_LIST.slice(0, 8).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/shop?category=${cat.slug}`}
                    onClick={() => dispatch(setMobileMenuOpen(false))}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors"
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Support Info */}
        <div className="p-5 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center gap-2.5 text-gray-900 mb-3">
            <PhoneCall className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold">(219) 555-0114</span>
          </div>
          <Link
            href="/sign-in"
            onClick={() => dispatch(setMobileMenuOpen(false))}
            className="block w-full py-2.5 text-center text-xs font-semibold text-white bg-primary rounded-lg hover:bg-primary-hover transition-colors"
          >
            Sign In / Register
          </Link>
        </div>
      </div>
    </div>
  );
};
