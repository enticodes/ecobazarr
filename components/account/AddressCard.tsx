import React from "react";
import Link from "next/link";
import type { Address } from "@/types";

export interface AddressCardProps {
  title: string;
  address: Address;
}

export const AddressCard: React.FC<AddressCardProps> = ({ title, address }) => {
  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-400 font-sans">
          {title}
        </span>
        <Link
          href="/account/settings"
          className="text-xs font-semibold text-primary hover:underline font-sans"
        >
          Edit Address
        </Link>
      </div>

      <div className="space-y-1 text-xs text-gray-600 font-body">
        <h4 className="text-sm font-bold text-gray-900 font-sans mb-1">
          {address.firstName} {address.lastName}
        </h4>
        {address.companyName && (
          <p className="text-gray-500">{address.companyName}</p>
        )}
        <p>{address.streetAddress}</p>
        <p>
          {address.state}, {address.zipCode}
        </p>
        <p>{address.country}</p>
        <div className="pt-2 text-gray-500 space-y-0.5">
          <p>Email: {address.email}</p>
          <p>Phone: {address.phone}</p>
        </div>
      </div>
    </div>
  );
};
