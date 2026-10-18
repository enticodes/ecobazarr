"use client";

import React from "react";
import { ShopBreadcrumbs } from "@/components/shop";
import { AccountSidebar } from "./AccountSidebar";

export interface AccountLayoutProps {
  breadcrumbLabel: string;
  children: React.ReactNode;
}

export const AccountLayout: React.FC<AccountLayoutProps> = ({
  breadcrumbLabel,
  children,
}) => {
  return (
    <div className="w-full bg-white pb-20">
      {/* 1. Breadcrumbs */}
      <ShopBreadcrumbs
        items={[
          { label: "Account", href: "/account/dashboard" },
          { label: breadcrumbLabel },
        ]}
      />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left: Account Navigation Sidebar */}
          <div className="w-full lg:w-72 shrink-0">
            <AccountSidebar />
          </div>

          {/* Right: Main Page Content */}
          <div className="flex-1 w-full min-w-0">{children}</div>
        </div>
      </div>
    </div>
  );
};
