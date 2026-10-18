import React, { Suspense } from "react";
import type { Metadata } from "next";
import { BlogListContent } from "@/components/blog";

export const metadata: Metadata = {
  title: "Latest News & Blog | Ecobazar Organic Grocery",
  description:
    "Explore healthy organic living tips, regenerative farm stories, produce guides, and seasonal cooking recipes from Ecobazar.",
};

export default function BlogPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full py-24 text-center text-sm text-gray-400">
          Loading articles...
        </div>
      }
    >
      <BlogListContent />
    </Suspense>
  );
}
