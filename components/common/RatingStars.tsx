"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RatingStarsProps {
  rating: number; // 0 to 5
  maxRating?: number;
  reviewCount?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onRate?: (rating: number) => void;
  className?: string;
  showCountText?: boolean;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxRating = 5,
  reviewCount,
  size = "md",
  interactive = false,
  onRate,
  className,
  showCountText = true,
}) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const starSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const activeRating = hoverRating !== null ? hoverRating : rating;

  return (
    <div
      className={cn("inline-flex items-center gap-1", className)}
      role={interactive ? "radiogroup" : "img"}
      aria-label={`${rating} out of ${maxRating} stars`}
    >
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxRating }, (_, index) => {
          const starValue = index + 1;
          const isFilled = activeRating >= starValue;
          const isHalf = !isFilled && activeRating >= starValue - 0.5;

          return (
            <button
              key={index}
              type="button"
              disabled={!interactive}
              onClick={() => interactive && onRate?.(starValue)}
              onMouseEnter={() => interactive && setHoverRating(starValue)}
              onMouseLeave={() => interactive && setHoverRating(null)}
              className={cn(
                "p-0 text-gray-200 transition-colors focus:outline-none",
                interactive && "cursor-pointer hover:scale-110",
                !interactive && "cursor-default pointer-events-none"
              )}
              tabIndex={interactive ? 0 : -1}
              aria-label={interactive ? `Rate ${starValue} star${starValue > 1 ? "s" : ""}` : undefined}
            >
              <Star
                className={cn(
                  starSizes[size],
                  isFilled
                    ? "fill-accent-orange text-accent-orange"
                    : isHalf
                    ? "fill-accent-orange/50 text-accent-orange"
                    : "fill-transparent text-gray-200"
                )}
              />
            </button>
          );
        })}
      </div>

      {showCountText && reviewCount !== undefined && (
        <span className="text-xs text-gray-500 font-normal ml-0.5">
          ({reviewCount})
        </span>
      )}
    </div>
  );
};
