"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown, PhoneCall } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleCategoryDrawer, setCategoryDrawerOpen } from "@/store/slices/uiSlice";
import { CategoryDrawer } from "./CategoryDrawer";
import { cn } from "@/lib/utils";

interface NavLinkItem {
  name: string;
  href: string;
  hasDropdown?: boolean;
  children?: { name: string; href: string }[];
}

const NAV_LINKS: NavLinkItem[] = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  {
    name: "Pages",
    href: "/about",
    hasDropdown: true,
    children: [
      { name: "About Us", href: "/about" },
      { name: "Contact Us", href: "/contact" },
      { name: "FAQs", href: "/faqs" },
      { name: "User Dashboard", href: "/account/dashboard" },
      { name: "Order History", href: "/account/orders" },
      { name: "Account Settings", href: "/account/settings" },
    ],
  },
  {
    name: "Blog",
    href: "/blog",
    hasDropdown: true,
    children: [
      { name: "All Articles", href: "/blog" },
      { name: "Food & Recipes", href: "/blog" },
      { name: "Organic Agriculture", href: "/blog" },
      { name: "Healthy Living", href: "/blog" },
    ],
  },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];

export const MainNavigation: React.FC = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const isCategoryOpen = useAppSelector(
    (state) => state.ui.isCategoryDrawerOpen
  );
  const categoryMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isCategoryOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        categoryMenuRef.current &&
        !categoryMenuRef.current.contains(event.target as Node)
      ) {
        dispatch(setCategoryDrawerOpen(false));
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dispatch(setCategoryDrawerOpen(false));
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
  }, [isCategoryOpen, dispatch]);

  // Close category drawer on route change
  useEffect(() => {
    dispatch(setCategoryDrawerOpen(false));
  }, [pathname, dispatch]);

  return (
    <nav
      className="hidden lg:block w-full bg-gray-900 text-white"
      aria-label="Main Navigation"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-15">
        {/* Left: Category Menu Button & Popover */}
        <div ref={categoryMenuRef} className="relative">
          <button
            type="button"
            onClick={() => dispatch(toggleCategoryDrawer())}
            aria-expanded={isCategoryOpen}
            className="h-15 px-7 bg-primary text-white font-semibold text-sm flex items-center gap-3 hover:bg-primary-hover active:bg-primary-dark transition-colors focus:outline-none cursor-pointer"
          >
            <Menu className="w-5 h-5" />
            <span>All Categories</span>
            <ChevronDown
              className={cn(
                "w-4 h-4 transition-transform duration-200",
                isCategoryOpen && "rotate-180"
              )}
            />
          </button>

          {/* Collapsible Category Drawer */}
          <CategoryDrawer />
        </div>

        {/* Center: Nav Links */}
        <div className="flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <div key={link.name} className="relative group">
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-1 text-sm font-medium transition-colors py-4 focus-visible:outline-none focus-visible:text-primary",
                    isActive
                      ? "text-white font-semibold"
                      : "text-gray-400 hover:text-white"
                  )}
                >
                  <span>{link.name}</span>
                  {link.hasDropdown && (
                    <ChevronDown className="w-3.5 h-3.5 text-gray-500 group-hover:text-white transition-colors" />
                  )}
                </Link>

                {/* Submenu Dropdown */}
                {link.children && (
                  <div className="absolute top-full left-0 pt-1 opacity-0 translate-y-1 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-200 z-50">
                    <div className="w-48 py-2 bg-white rounded-xl shadow-dropdown border border-gray-100 text-gray-800">
                      {link.children.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 text-xs font-medium hover:bg-gray-50 hover:text-primary transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right: Phone Support Hotline */}
        <div className="flex items-center gap-2.5 text-white">
          <PhoneCall className="w-5 h-5 text-primary" aria-hidden="true" />
          <span className="text-sm font-semibold tracking-wide">
            (219) 555-0114
          </span>
        </div>
      </div>
    </nav>
  );
};
