"use client";

import React from "react";
import { ShopBreadcrumbs } from "@/components/shop";
import { AboutHero } from "./AboutHero";
import { AboutFeatures } from "./AboutFeatures";
import { AboutStatsBanner } from "./AboutStatsBanner";
import { AboutTeam } from "./AboutTeam";
import { Testimonials } from "@/components/home/Testimonials";
import { BrandMarquee } from "@/components/home/BrandMarquee";

export const AboutPageView: React.FC = () => {
  return (
    <div className="w-full bg-white">
      {/* 1. Breadcrumbs */}
      <ShopBreadcrumbs items={[{ label: "About Us" }]} />

      {/* 2. Hero Story */}
      <AboutHero />

      {/* 3. Core Values & Features */}
      <AboutFeatures />

      {/* 4. Delivery & Farm Statistics */}
      <AboutStatsBanner />

      {/* 5. Team Section */}
      <AboutTeam />

      {/* 6. Client Testimonials */}
      <Testimonials />

      {/* 7. Partner Brand Marquee */}
      <BrandMarquee />
    </div>
  );
};
