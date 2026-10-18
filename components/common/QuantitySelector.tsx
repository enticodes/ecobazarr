"use client";

import React from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface QuantitySelectorProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  size?: "sm" | "md" | "lg";
  rounded?: "md" | "full";
  className?: string;
  disabled?: boolean;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  value,
  min = 1,
  max = 99,
  onChange,
  size = "md",
  rounded = "full",
  className,
  disabled = false,
}) => {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) {
      if (val >= min && val <= max) {
        onChange(val);
      } else if (val < min) {
        onChange(min);
      } else if (val > max) {
        onChange(max);
      }
    }
  };

  const sizeStyles = {
    sm: "h-9 text-xs px-1",
    md: "h-11 text-sm px-2",
    lg: "h-13 text-base px-2.5",
  };

  const buttonSizeStyles = {
    sm: "w-7 h-7",
    md: "w-8 h-8",
    lg: "w-9 h-9",
  };

  const iconSizeStyles = {
    sm: "w-3 h-3",
    md: "w-3.5 h-3.5",
    lg: "w-4 h-4",
  };

  const roundedStyles = {
    md: "rounded-md",
    full: "rounded-full",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center justify-between border border-gray-200 bg-white select-none transition-colors",
        sizeStyles[size],
        roundedStyles[rounded],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={disabled || value <= min}
        aria-label="Decrease quantity"
        className={cn(
          "inline-flex items-center justify-center rounded-full bg-gray-50 text-gray-700 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          buttonSizeStyles[size]
        )}
      >
        <Minus className={iconSizeStyles[size]} />
      </button>

      <input
        type="number"
        value={value}
        min={min}
        max={max}
        disabled={disabled}
        onChange={handleInputChange}
        aria-label="Quantity"
        className="w-12 text-center font-semibold text-gray-900 bg-transparent border-none outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />

      <button
        type="button"
        onClick={handleIncrement}
        disabled={disabled || value >= max}
        aria-label="Increase quantity"
        className={cn(
          "inline-flex items-center justify-center rounded-full bg-gray-50 text-gray-700 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          buttonSizeStyles[size]
        )}
      >
        <Plus className={iconSizeStyles[size]} />
      </button>
    </div>
  );
};
