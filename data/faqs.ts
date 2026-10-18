import type { FAQItem } from "@/types";

export const FAQ_CATEGORIES = [
  "All",
  "General",
  "Orders & Shipping",
  "Quality & Freshness",
  "Payment & Refunds",
] as const;

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq-1",
    category: "General",
    question: "What makes Ecobazar produce 100% organic?",
    answer:
      "All produce sold through Ecobazar is certified organic by accredited regional agricultural bodies. Our partner farmers practice non-GMO farming, avoid synthetic pesticides and artificial fertilizers, and undergo rigorous seasonal soil inspections.",
  },
  {
    id: "faq-2",
    category: "General",
    question: "How does Ecobazar source its fresh fruits and vegetables?",
    answer:
      "We partner directly with local and regional family-owned organic farms within a 200-mile radius. Harvesting is coordinated directly with daily dispatch schedules to ensure produce travels from the soil to your door in under 24 hours.",
  },
  {
    id: "faq-3",
    category: "Orders & Shipping",
    question: "How long does standard delivery take?",
    answer:
      "Orders placed before 2:00 PM local time are dispatched for next-day morning delivery. Our temperature-controlled courier fleet ensures your fresh greens, dairy, and fruits remain crisp throughout transit.",
  },
  {
    id: "faq-4",
    category: "Orders & Shipping",
    question: "Is there free shipping available on orders?",
    answer:
      "Yes! We offer 100% Free Shipping on all orders of $50.00 or higher. For smaller orders below this threshold, a flat regional delivery rate of $5.00 applies.",
  },
  {
    id: "faq-5",
    category: "Orders & Shipping",
    question: "Can I track my order in real-time?",
    answer:
      "Yes. Once your order is confirmed, you can track each stage directly in your Account dashboard under Order History. The 4-step progress tracker indicates when your order is Received, Processing, On the road, and Delivered.",
  },
  {
    id: "faq-6",
    category: "Quality & Freshness",
    question: "What should I do if an item arrives damaged or un-fresh?",
    answer:
      "We stand firmly behind our 100% Freshness Guarantee. If any item fails to meet your quality expectations upon delivery, simply report it via our Contact form within 24 hours with your order ID, and we will issue an immediate replacement or full refund.",
  },
  {
    id: "faq-7",
    category: "Payment & Refunds",
    question: "What payment methods are supported?",
    answer:
      "We accept Cash on Delivery (COD), PayPal, and all major credit/debit cards including Visa, MasterCard, and Discover. In this local demonstration build, all checkout payments are simulated instantly.",
  },
  {
    id: "faq-8",
    category: "Payment & Refunds",
    question: "How do discount coupons work?",
    answer:
      "During checkout or on the Shopping Cart page, enter your active promo coupon code (such as 'ECOBAZAR10') and click Apply. The eligible discount percentage or credit will be automatically deducted from your subtotal.",
  },
];
