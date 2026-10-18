import React from "react";
import { Check } from "lucide-react";

export const AboutHero: React.FC = () => {
  const highlights = [
    "Healthy & 100% natural organic food for your daily wellness",
    "Directly harvested from certified local regenerative farms",
    "Zero synthetic chemical fertilizers or artificial ripening sprays",
    "Eco-friendly packaging and rapid cold-chain delivery",
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white" aria-label="About Ecobazar">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                About Ecobazar
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-sans text-gray-900 tracking-tight leading-tight">
                100% Trusted Organic Food Store
              </h1>
            </div>

            <p className="text-base text-gray-600 leading-relaxed">
              Morbi porttitor ligula id varius consectetur. Integer ipsum justo, lacinia pellentesque
              erat sollicitudin, elementum sagittis purus. Curabitur porttitor orci eget neque accumsan
              venenatis. Nunc fermentum, quam vitae dictum cursus, diam est finibus mauris, ut
              condimentum turpis ipsum id diam.
            </p>

            <ul className="space-y-3 pt-2">
              {highlights.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-3" />
                  </span>
                  <span className="text-sm font-medium text-gray-700 leading-snug">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Visual Showcase */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden aspect-4/3 sm:aspect-16/11 shadow-lg bg-gray-50 border border-gray-100">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80"
                alt="Ecobazar fresh organic produce market"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/95 backdrop-blur-xs shadow-md border border-white flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                    Certified Organic
                  </span>
                  <span className="text-base font-bold text-gray-900">
                    Pure From Farm to Table
                  </span>
                </div>
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary font-black text-sm flex items-center justify-center shrink-0">
                  100%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
