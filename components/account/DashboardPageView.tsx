"use client";

import React from "react";
import Link from "next/link";
import { UserCheck } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import {
  AccountLayout,
  AddressCard,
  RecentOrdersTable,
} from "@/components/account";

export const DashboardPageView: React.FC = () => {
  const profile = useAppSelector((state) => state.profile);
  const orders = useAppSelector((state) => state.order.orders);

  return (
    <AccountLayout breadcrumbLabel="Dashboard">
      <div className="space-y-8">
        {/* Top Profile Summary Card (Figma 23_User_Dashboard) */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-primary/20 shrink-0">
              <img
                src={profile.avatar}
                alt={`${profile.firstName} ${profile.lastName}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 font-sans">
                  {profile.firstName} {profile.lastName}
                </h2>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary bg-primary-tint px-2.5 py-0.5 rounded-full">
                  <UserCheck className="w-3 h-3" />
                  Customer
                </span>
              </div>
              <p className="text-xs text-gray-500 font-body">{profile.email}</p>
              <p className="text-xs text-gray-500 font-body">{profile.phone}</p>
            </div>
          </div>

          <Link
            href="/account/settings"
            className="text-xs font-semibold text-primary hover:underline px-4 py-2 bg-primary-tint rounded-full font-sans"
          >
            Edit Profile
          </Link>
        </div>

        {/* Address Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AddressCard title="Billing Address" address={profile.billingAddress} />
          <AddressCard title="Shipping Address" address={profile.shippingAddress} />
        </div>

        {/* Recent Order History Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900 font-sans">
              Recent Order History
            </h3>
            <Link
              href="/account/orders"
              className="text-xs font-semibold text-primary hover:underline font-sans"
            >
              View All
            </Link>
          </div>

          <RecentOrdersTable orders={orders} limit={5} />
        </div>
      </div>
    </AccountLayout>
  );
};
