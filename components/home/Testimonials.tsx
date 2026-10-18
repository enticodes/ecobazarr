"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/data/testimonials";
import { RatingStars } from "@/components/common/RatingStars";

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="w-full bg-[#F2F2F2] py-14 sm:py-20" aria-label="Client Testimonials">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Navigation Arrows */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-1">
              Client Testimonials
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-sans text-gray-900 tracking-tight">
              What Our Customers Say
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full bg-white text-gray-700 hover:bg-primary hover:text-white transition-colors flex items-center justify-center shadow-xs cursor-pointer focus:outline-none"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full bg-white text-gray-700 hover:bg-primary hover:text-white transition-colors flex items-center justify-center shadow-xs cursor-pointer focus:outline-none"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Testimonials Cards (3 on desktop, 1 on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={item.id}
              className={`bg-white rounded-xl p-6 sm:p-7 shadow-xs border border-gray-100 flex flex-col justify-between space-y-5 transition-all duration-300 ${
                currentIndex === idx ? "ring-2 ring-primary/20" : ""
              }`}
            >
              <div className="space-y-4">
                <Quote className="w-8 h-8 text-primary/30" />
                <p className="text-xs sm:text-sm text-gray-600 font-body leading-relaxed">
                  &ldquo;{item.content}&rdquo;
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-11 h-11 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 font-sans leading-tight">
                      {item.name}
                    </h4>
                    <span className="text-xs text-gray-400 font-medium">
                      {item.role}
                    </span>
                  </div>
                </div>

                <RatingStars rating={item.rating} size="sm" showCountText={false} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
