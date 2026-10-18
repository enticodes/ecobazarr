import React, { Suspense } from "react";
import type { Metadata } from "next";
import { SettingsPageView } from "@/components/account";

export const metadata: Metadata = {
  title: "Account Settings | Ecobazar Organic Shop",
  description: "Manage your profile information, saved delivery addresses, and account security preferences.",
};

export default function SettingsPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full py-24 text-center text-sm text-gray-400">
          Loading account settings...
        </div>
      }
    >
      <SettingsPageView />
    </Suspense>
  );
}
