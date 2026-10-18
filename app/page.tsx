import React from "react";
import {
  HeroBanner,
  ValuePropositions,
  PromoBanners,
  PopularCategories,
  HotDeals,
  PopularProducts,
  DiscountBanner,
  FeaturedProducts,
  LatestNews,
  Testimonials,
  BrandMarquee,
  InstagramFeed,
} from "@/components/home";
import { ProductQuickViewModal } from "@/components/product/ProductQuickViewModal";

export default function Home() {
  return (
    <main className="w-full flex flex-col bg-white">
      {/* 1. Hero Banner Slider */}
      <HeroBanner />

      {/* 2. Four Value Propositions */}
      <ValuePropositions />

      {/* 3. Three Promotional Banners */}
      <PromoBanners />

      {/* 4. Popular Categories Carousel/Grid */}
      <PopularCategories />

      {/* 5. Hot Deals with Countdown Timer */}
      <HotDeals />

      {/* 6. Popular Products (5-Column Grid with Category Tabs) */}
      <PopularProducts />

      {/* 7. Full-width Countdown Discount Banner */}
      <DiscountBanner />

      {/* 8. Featured Products */}
      <FeaturedProducts />

      {/* 9. Latest News Blog Cards */}
      <LatestNews />

      {/* 10. Client Testimonials */}
      <Testimonials />

      {/* 11. Brand Logos Marquee */}
      <BrandMarquee />

      {/* 12. Follow Us on Instagram Gallery */}
      <InstagramFeed />

      {/* Product Quick View Modal */}
      <ProductQuickViewModal />
    </main>
  );
}
