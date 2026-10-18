import React from "react";
import type { Metadata } from "next";
import { ContactPageView } from "@/components/contact";

export const metadata: Metadata = {
  title: "Contact Us | Ecobazar Organic Grocery",
  description:
    "Get in touch with the Ecobazar customer support team for inquiries, order feedback, wholesale questions, or farm partnerships.",
};

export default function ContactPage() {
  return <ContactPageView />;
}
