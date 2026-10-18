"use client";

import React from "react";
import { ShopBreadcrumbs } from "@/components/shop";
import { FaqAccordion } from "./FaqAccordion";
import { FaqSupportCard } from "./FaqSupportCard";

export const FaqPageView: React.FC = () => {
  return (
    <div className="w-full bg-white pb-16 sm:pb-24">
      {/* 1. Breadcrumbs */}
      <ShopBreadcrumbs items={[{ label: "Faqs" }]} />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* 2. Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Help & Information
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-sans text-gray-900 tracking-tight">
            Welcome, Let&apos;s Talk About Our Ecobazar
          </h1>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
            Everything you need to know about our organic farm sourcing, delivery timelines,
            freshness guarantee, and order management.
          </p>
        </div>

        {/* 3. Filterable Accordions */}
        <FaqAccordion />

        {/* 4. Support Contact Callout */}
        <FaqSupportCard />
      </div>
    </div>
  );
};
