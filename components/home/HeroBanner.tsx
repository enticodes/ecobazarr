"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/common/Button";

const SLIDES = [
  {
    id: 1,
    tag: "Welcome to Shopery",
    title: "Fresh & Healthy Organic Food",
    discount: "Sale up to 30% OFF",
    description: "Free shipping on all your order. We deliver healthy vegetables & fruits directly to your doorstep.",
    buttonText: "Shop now",
    buttonLink: "/shop",
    image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=800&q=80",
    bgColor: "bg-[#EDF2EE]",
  },
  {
    id: 2,
    tag: "100% Organic Products",
    title: "Fresh Harvest From Green Valley",
    discount: "Special Deal 40% OFF",
    description: "Picked daily with love and care from certified organic farmers across the country.",
    buttonText: "Shop now",
    buttonLink: "/shop",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    bgColor: "bg-[#EAF5E9]",
  },
];

export const HeroBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  };

  const slide = SLIDES[currentSlide];

  return (
    <section className="relative w-full overflow-hidden bg-gray-50/50" aria-label="Hero Banner">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div
          className={`relative w-full rounded-2xl ${slide.bgColor} p-6 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 transition-colors duration-500`}
        >
          {/* Left Text Content */}
          <div className="max-w-xl space-y-4 sm:space-y-6 text-center lg:text-left z-10">
            <span className="inline-block text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary">
              {slide.tag}
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 font-sans tracking-tight leading-tight">
              {slide.title}
            </h1>

            <div className="flex items-center justify-center lg:justify-start gap-2">
              <span className="text-sm sm:text-lg font-medium text-gray-700">
                {slide.discount}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 font-body leading-relaxed max-w-md mx-auto lg:mx-0">
              {slide.description}
            </p>

            <div className="pt-2">
              <Button variant="primary" size="lg" className="shadow-md">
                <Link href={slide.buttonLink} className="flex items-center gap-2">
                  <span>{slide.buttonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Product Image */}
          <div className="relative w-full max-w-lg aspect-4/3 lg:aspect-auto lg:h-[420px] flex items-center justify-center z-10">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-contain rounded-xl drop-shadow-xl animate-in fade-in zoom-in-95 duration-500"
            />
          </div>

          {/* Carousel Arrows */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-md flex items-center justify-center transition-all cursor-pointer focus:outline-none z-20"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-md flex items-center justify-center transition-all cursor-pointer focus:outline-none z-20"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Pagination Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  currentSlide === idx ? "w-6 bg-primary" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
