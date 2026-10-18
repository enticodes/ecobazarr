"use client";

import React from "react";
import { TopBar } from "./TopBar";
import { MiddleBar } from "./MiddleBar";
import { MainNavigation } from "./MainNavigation";
import { MobileNav } from "./MobileNav";
import { CartFlyout } from "./CartFlyout";

export const Header: React.FC = () => {
  return (
    <header className="w-full flex flex-col sticky top-0 z-40 bg-white shadow-xs">
      {/* 1. Currency, Language & Auth Bar */}
      <TopBar />

      {/* 2. Logo, Search & Cart Summary Bar */}
      <MiddleBar />

      {/* 3. Categories Drawer & Primary Navigation Strip */}
      <React.Suspense fallback={<div className="h-14 bg-white" />}>
        <MainNavigation />
      </React.Suspense>

      {/* 4. Slide-over Mobile Navigation */}
      <React.Suspense fallback={null}>
        <MobileNav />
      </React.Suspense>

      {/* 5. Slide-over Cart Panel */}
      <CartFlyout />
    </header>
  );
};
