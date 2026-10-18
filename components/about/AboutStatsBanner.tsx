import React from "react";
import { CheckCircle2 } from "lucide-react";

export const AboutStatsBanner: React.FC = () => {
  const stats = [
    { label: "Organic Produce", value: "100%" },
    { label: "Happy Customers", value: "50k+" },
    { label: "Years Experience", value: "10+" },
    { label: "Freshness Guaranteed", value: "100%" },
  ];

  return (
    <section className="py-14 sm:py-20 bg-white" aria-label="Our Impact">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Farm Image */}
          <div className="order-2 lg:order-1 relative rounded-2xl overflow-hidden aspect-4/3 sm:aspect-16/11 shadow-lg bg-gray-50 border border-gray-100">
            <img
              src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80"
              alt="Organic farm fields with regenerative agriculture"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right: Mission Story & Statistics */}
          <div className="order-1 lg:order-2 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                100% Organic Food
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-sans text-gray-900 tracking-tight leading-tight">
                We Deliver More Than Just Organic Groceries
              </h2>
            </div>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Sed vestibulum nulla et ipsum posuere commodo. Phasellus pharetra dolor ut quam mattis,
              ac sagittis nunc sollicitudin. Nulla facilisi. Praesent a tortor sit amet nisi
              scelerisque dictum sed sit amet lectus. Pellentesque habitant morbi tristique senectus.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gray-100">
              {stats.map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span className="text-2xl sm:text-3xl font-extrabold font-sans text-gray-900">
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-gray-500 pl-6">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
