import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  dark?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className,
  size = "md",
  dark = false,
}) => {
  const sizeStyles = {
    sm: "text-xl gap-2",
    md: "text-2xl sm:text-3xl gap-2.5",
    lg: "text-3xl sm:text-4xl gap-3",
  };

  const iconSizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center select-none font-bold font-sans tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md transition-opacity hover:opacity-90",
        sizeStyles[size],
        className
      )}
    >
      {/* Ecobazar Leaf & Plant Sprout Icon */}
      <span
        className={cn(
          "flex items-center justify-center shrink-0 rounded-full bg-primary text-white shadow-xs",
          iconSizes[size]
        )}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5/6 h-5/6 text-white"
        >
          <path
            d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 8L2 22"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17.5 15H9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      {/* Brand Text */}
      <span
        className={cn(
          "font-extrabold tracking-tight",
          dark ? "text-white" : "text-gray-900"
        )}
      >
        Ecobazar
      </span>
    </Link>
  );
};
