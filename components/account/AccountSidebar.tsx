"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  RefreshCw,
  Heart,
  ShoppingBag,
  Settings,
  LogOut,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  {
    name: "Dashboard",
    href: "/account/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Order History",
    href: "/account/orders",
    icon: RefreshCw,
  },
  {
    name: "Wishlist",
    href: "/wishlist",
    icon: Heart,
  },
  {
    name: "Shopping Cart",
    href: "/cart",
    icon: ShoppingBag,
  },
  {
    name: "Settings",
    href: "/account/settings",
    icon: Settings,
  },
];

export const AccountSidebar: React.FC = () => {
  const pathname = usePathname();
  const [showLogoutNotice, setShowLogoutNotice] = useState(false);

  const handleLogout = () => {
    setShowLogoutNotice(true);
    setTimeout(() => setShowLogoutNotice(false), 3000);
  };

  return (
    <aside className="w-full bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs">
      <div className="p-5 border-b border-gray-100">
        <h3 className="text-base font-bold text-gray-900 font-sans">
          Navigation
        </h3>
      </div>

      <nav className="p-2 space-y-1" aria-label="Account sidebar navigation">
        {NAV_LINKS.map((item) => {
          const isActive =
            item.href === "/account/orders"
              ? pathname.startsWith("/account/orders")
              : pathname === item.href;

          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors font-sans",
                isActive
                  ? "bg-primary-tint text-primary font-bold border-l-4 border-primary"
                  : "text-gray-600 hover:text-primary hover:bg-gray-50"
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 shrink-0",
                  isActive ? "text-primary" : "text-gray-400"
                )}
              />
              <span>{item.name}</span>
            </Link>
          );
        })}

        {/* Log-out simulated action */}
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:text-danger hover:bg-danger/5 transition-colors font-sans text-left cursor-pointer"
        >
          <LogOut className="w-4 h-4 text-gray-400 shrink-0" />
          <span>Log-out</span>
        </button>
      </nav>

      {showLogoutNotice && (
        <div className="m-3 p-3 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-xl flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-amber-600" />
          <span>Mock session active: You remain logged in as Dianne Russell.</span>
        </div>
      )}
    </aside>
  );
};
