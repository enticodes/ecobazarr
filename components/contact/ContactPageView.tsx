"use client";

import React from "react";
import { ShopBreadcrumbs } from "@/components/shop";
import { ContactInfoCards } from "./ContactInfoCards";
import { ContactForm } from "./ContactForm";
import { ContactMap } from "./ContactMap";

export const ContactPageView: React.FC = () => {
  return (
    <div className="w-full bg-white pb-16 sm:pb-24">
      {/* 1. Breadcrumbs */}
      <ShopBreadcrumbs items={[{ label: "Contact Us" }]} />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* 2. 3 Contact Info Cards */}
        <ContactInfoCards />

        {/* 3. Interactive Contact Inquiry Form */}
        <ContactForm />

        {/* 4. Embedded Hub Map Banner */}
        <ContactMap />
      </div>
    </div>
  );
};
