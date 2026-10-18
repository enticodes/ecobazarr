import React from "react";
import { Check } from "lucide-react";
import type { Order } from "@/types";

export interface OrderProgressTrackerProps {
  status: Order["status"];
}

const STAGES = [
  { id: "Order Received", label: "Order Received" },
  { id: "Processing", label: "Processing" },
  { id: "On the road", label: "On the road" },
  { id: "Delivered", label: "Delivered" },
];

export const OrderProgressTracker: React.FC<OrderProgressTrackerProps> = ({
  status,
}) => {
  const getStatusIndex = () => {
    switch (status) {
      case "Order Received":
        return 0;
      case "Processing":
        return 1;
      case "On the road":
        return 2;
      case "Delivered":
        return 3;
      case "Cancelled":
        return -1;
      default:
        return 1;
    }
  };

  const currentIndex = getStatusIndex();

  if (status === "Cancelled") {
    return (
      <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-sm font-semibold text-center">
        This order has been cancelled.
      </div>
    );
  }

  return (
    <div className="w-full py-4">
      <div className="relative flex items-center justify-between">
        {/* Connecting Progress Track */}
        <div
          className="absolute left-6 right-6 top-5 -translate-y-1/2 h-1 bg-gray-200 -z-0"
          aria-hidden="true"
        >
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{
              width: `${(Math.max(0, currentIndex) / (STAGES.length - 1)) * 100}%`,
            }}
          />
        </div>

        {/* Stages */}
        {STAGES.map((stage, idx) => {
          const isCompleted = idx <= currentIndex;
          const isCurrent = idx === currentIndex;

          return (
            <div
              key={stage.id}
              className="relative z-10 flex flex-col items-center text-center space-y-2 flex-1"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                  isCompleted
                    ? "bg-primary text-white shadow-xs"
                    : "bg-white border-2 border-gray-200 text-gray-400"
                } ${isCurrent ? "ring-4 ring-primary/20" : ""}`}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5 stroke-[2.5]" />
                ) : (
                  <span>0{idx + 1}</span>
                )}
              </div>

              <span
                className={`text-xs font-sans max-w-[90px] leading-tight ${
                  isCompleted ? "font-bold text-gray-900" : "font-medium text-gray-400"
                }`}
              >
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
