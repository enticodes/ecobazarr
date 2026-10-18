import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/common/Button";

const PROMO_CARDS = [
  {
    tag: "Best Deals",
    title: "Sale of the Month",
    highlight: "50% OFF",
    buttonText: "Shop Now",
    buttonLink: "/shop",
    bgClass: "from-amber-900/80 to-amber-950/90",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80",
  },
  {
    tag: "Low-Fat Meat",
    title: "85% Fat Free",
    highlight: "Started at $79.99",
    buttonText: "Shop Now",
    buttonLink: "/shop?category=meat-fish",
    bgClass: "from-emerald-950/80 to-emerald-900/90",
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=600&q=80",
  },
  {
    tag: "Summer Sale",
    title: "100% Fresh Fruit",
    highlight: "Up to 64% OFF",
    buttonText: "Shop Now",
    buttonLink: "/shop?category=fresh-fruit",
    bgClass: "from-yellow-950/80 to-orange-950/90",
    image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=600&q=80",
  },
];

export const PromoBanners: React.FC = () => {
  return (
    <section className="w-full bg-white py-10 sm:py-14" aria-label="Promotional Banners">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROMO_CARDS.map((card, idx) => (
            <div
              key={idx}
              className="group relative h-96 sm:h-[480px] rounded-2xl overflow-hidden shadow-xs flex flex-col justify-end p-8 text-white transition-all duration-300 hover:shadow-card"
            >
              {/* Background Image & Gradient Overlay */}
              <img
                src={card.image}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t ${card.bgClass} opacity-85 group-hover:opacity-90 transition-opacity`}
              />

              {/* Text Content */}
              <div className="relative z-10 space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-primary-light block">
                  {card.tag}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-sans leading-tight">
                  {card.title}
                </h3>
                <p className="text-sm font-semibold text-white/90">
                  {card.highlight}
                </p>
                <div className="pt-2">
                  <Button variant="primary" size="sm">
                    <Link href={card.buttonLink} className="flex items-center gap-1.5">
                      <span>{card.buttonText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
