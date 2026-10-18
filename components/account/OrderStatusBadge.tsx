import React from "react";
import type { Order } from "@/types";

export interface OrderStatusBadgeProps {
  status: Order["status"];
  size?: "sm" | "md";
}

export const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({
  status,
  size = "sm",
}) => {
  const getVariantStyles = () => {
    switch (status) {
      case "Delivered":
        return "bg-emerald-50 text-primary border-emerald-200";
      case "Processing":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "On the road":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Order Received":
        return "bg-sky-50 text-sky-700 border-sky-200";
      case "Cancelled":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const sizeStyles =
    size === "sm" ? "px-2.5 py-0.5 text-xs font-semibold" : "px-3 py-1 text-sm font-bold";

  return (
    <span
      className={`inline-flex items-center rounded-full border font-sans ${getVariantStyles()} ${sizeStyles}`}
    >
      {status}
    </span>
  );
};
