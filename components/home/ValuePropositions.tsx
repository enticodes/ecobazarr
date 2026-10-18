import React from "react";
import { Truck, Headphones, ShieldCheck, Package } from "lucide-react";

const FEATURES = [
  {
    icon: <Truck className="w-8 h-8 text-primary" />,
    title: "Free Shipping",
    description: "Free shipping on all your order",
  },
  {
    icon: <Headphones className="w-8 h-8 text-primary" />,
    title: "Customer Support 24/7",
    description: "Instant access to Support",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: "100% Secure Payment",
    description: "We ensure your money is save",
  },
  {
    icon: <Package className="w-8 h-8 text-primary" />,
    title: "Money-Back Guarantee",
    description: "30 Days Money-Back Guarantee",
  },
];

export const ValuePropositions: React.FC = () => {
  return (
    <section className="w-full bg-white py-6 sm:py-8 border-b border-gray-100" aria-label="Value Propositions">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 sm:p-8 bg-white rounded-xl shadow-xs border border-gray-100">
          {FEATURES.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-2 transition-transform hover:-translate-y-0.5 duration-200"
            >
              <div className="w-14 h-14 rounded-full bg-primary-tint flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-gray-900 font-sans">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-500 font-body">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
