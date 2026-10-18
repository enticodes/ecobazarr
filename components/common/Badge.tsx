import React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "sale"
  | "new"
  | "outOfStock"
  | "hot"
  | "inStock"
  | "neutral";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: "sm" | "md";
  rounded?: "md" | "full";
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "sale",
  size = "md",
  rounded = "full",
  children,
  ...props
}) => {
  const variantStyles = {
    sale: "bg-danger text-white",
    new: "bg-accent-orange text-white",
    outOfStock: "bg-gray-900 text-white",
    hot: "bg-danger text-white",
    inStock: "bg-primary-tint text-primary font-medium",
    neutral: "bg-gray-50 text-gray-700 border border-gray-100",
  };

  const sizeStyles = {
    sm: "text-[11px] px-2 py-0.5 leading-tight font-medium",
    md: "text-xs px-2.5 py-1 leading-normal font-medium",
  };

  const roundedStyles = {
    md: "rounded-md",
    full: "rounded-full",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center select-none uppercase tracking-wide",
        variantStyles[variant],
        sizeStyles[size],
        roundedStyles[rounded],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
