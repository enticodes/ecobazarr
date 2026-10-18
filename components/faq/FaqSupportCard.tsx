import React from "react";
import Link from "next/link";
import { MessageSquare, PhoneCall } from "lucide-react";

export const FaqSupportCard: React.FC = () => {
  return (
    <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <MessageSquare className="w-7 h-7" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-gray-900 font-sans">
            Still Have Questions?
          </h3>
          <p className="text-sm text-gray-600 max-w-lg leading-relaxed">
            Can&apos;t find the answer you&apos;re looking for? Please contact our friendly customer
            support team or give us a direct call anytime.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 shrink-0">
        <Link
          href="/contact"
          className="px-5 py-2.5 rounded-full bg-primary text-white text-xs sm:text-sm font-semibold hover:bg-primary-hover transition-colors shadow-xs"
        >
          Contact Us
        </Link>
        <a
          href="tel:2195550114"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-gray-200 text-gray-800 text-xs sm:text-sm font-semibold hover:border-primary hover:text-primary transition-colors shadow-xs"
        >
          <PhoneCall className="w-4 h-4 text-primary" />
          <span>(219) 555-0114</span>
        </a>
      </div>
    </div>
  );
};
