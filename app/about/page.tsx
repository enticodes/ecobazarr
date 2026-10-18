import React from "react";
import type { Metadata } from "next";
import { AboutPageView } from "@/components/about";

export const metadata: Metadata = {
  title: "About Us | Ecobazar Organic Grocery",
  description:
    "Learn about Ecobazar's mission to deliver 100% certified organic foods directly from local regenerative farms to your table.",
};

export default function AboutPage() {
  return <AboutPageView />;
}
