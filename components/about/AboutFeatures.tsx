import React from "react";
import { Leaf, Award, Truck, Tag } from "lucide-react";

export const AboutFeatures: React.FC = () => {
  const features = [
    {
      icon: Leaf,
      title: "100% Organic Food",
      description: "Healthy and pure food harvested directly from certified organic farms without synthetic fertilizers.",
    },
    {
      icon: Award,
      title: "Customer Feedback",
      description: "Our community of thousands of families rates our produce freshness at over 99% satisfaction.",
    },
    {
      icon: Truck,
      title: "Free Delivery",
      description: "Enjoy temperature-controlled free delivery on all grocery orders over $50 straight to your doorstep.",
    },
    {
      icon: Tag,
      title: "Great Daily Deal",
      description: "Save on seasonal harvests with special bundle discounts and member pricing every day of the week.",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-gray-50/60 border-y border-gray-100" aria-label="Our Values">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-gray-100 shadow-xs hover:shadow-card hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Icon className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 font-sans">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
