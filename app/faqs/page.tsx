import React from "react";
import type { Metadata } from "next";
import { FaqPageView } from "@/components/faq";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQs) | Ecobazar Organic Grocery",
  description:
    "Find answers to common questions about Ecobazar's certified organic foods, delivery schedules, order tracking, and refund policies.",
};

export default function FaqsPage() {
  return <FaqPageView />;
}
