"use client";

import React from "react";
import type { Address } from "@/types";

export interface BillingFormData {
  billing: Address;
  shipToDifferentAddress: boolean;
  shipping: Address;
  orderNotes: string;
}

export interface BillingFormProps {
  formData: BillingFormData;
  errors: Record<string, string>;
  onChange: (field: string, value: Address | boolean | string) => void;
}

export const BillingForm: React.FC<BillingFormProps> = ({
  formData,
  errors,
  onChange,
}) => {
  const handleBillingChange = (field: keyof Address, val: string) => {
    onChange("billing", { ...formData.billing, [field]: val });
  };

  const handleShippingChange = (field: keyof Address, val: string) => {
    onChange("shipping", { ...formData.shipping, [field]: val });
  };

  return (
    <div className="space-y-8">
      {/* 1. Billing Information Section */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs space-y-6">
        <h2 className="text-xl font-bold text-gray-900 font-sans border-b border-gray-100 pb-4">
          Billing Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* First Name */}
          <div className="space-y-1.5">
            <label
              htmlFor="billing-firstName"
              className="text-xs font-semibold text-gray-700 block"
            >
              First Name <span className="text-danger">*</span>
            </label>
            <input
              id="billing-firstName"
              type="text"
              value={formData.billing.firstName}
              onChange={(e) => handleBillingChange("firstName", e.target.value)}
              placeholder="Your first name"
              className={`w-full p-3 text-sm rounded-xl border outline-none transition-colors ${
                errors["billing.firstName"]
                  ? "border-danger focus:ring-1 focus:ring-danger"
                  : "border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
              }`}
            />
            {errors["billing.firstName"] && (
              <span className="text-xs text-danger font-medium block">
                {errors["billing.firstName"]}
              </span>
            )}
          </div>

          {/* Last Name */}
          <div className="space-y-1.5">
            <label
              htmlFor="billing-lastName"
              className="text-xs font-semibold text-gray-700 block"
            >
              Last Name <span className="text-danger">*</span>
            </label>
            <input
              id="billing-lastName"
              type="text"
              value={formData.billing.lastName}
              onChange={(e) => handleBillingChange("lastName", e.target.value)}
              placeholder="Your last name"
              className={`w-full p-3 text-sm rounded-xl border outline-none transition-colors ${
                errors["billing.lastName"]
                  ? "border-danger focus:ring-1 focus:ring-danger"
                  : "border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
              }`}
            />
            {errors["billing.lastName"] && (
              <span className="text-xs text-danger font-medium block">
                {errors["billing.lastName"]}
              </span>
            )}
          </div>

          {/* Company Name (Optional) */}
          <div className="sm:col-span-2 space-y-1.5">
            <label
              htmlFor="billing-company"
              className="text-xs font-semibold text-gray-700 block"
            >
              Company Name (Optional)
            </label>
            <input
              id="billing-company"
              type="text"
              value={formData.billing.companyName || ""}
              onChange={(e) => handleBillingChange("companyName", e.target.value)}
              placeholder="Company name"
              className="w-full p-3 text-sm rounded-xl border border-gray-200 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Street Address */}
          <div className="sm:col-span-2 space-y-1.5">
            <label
              htmlFor="billing-address"
              className="text-xs font-semibold text-gray-700 block"
            >
              Street Address <span className="text-danger">*</span>
            </label>
            <input
              id="billing-address"
              type="text"
              value={formData.billing.streetAddress}
              onChange={(e) => handleBillingChange("streetAddress", e.target.value)}
              placeholder="House number and street name"
              className={`w-full p-3 text-sm rounded-xl border outline-none transition-colors ${
                errors["billing.streetAddress"]
                  ? "border-danger focus:ring-1 focus:ring-danger"
                  : "border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
              }`}
            />
            {errors["billing.streetAddress"] && (
              <span className="text-xs text-danger font-medium block">
                {errors["billing.streetAddress"]}
              </span>
            )}
          </div>

          {/* Country / Region */}
          <div className="space-y-1.5">
            <label
              htmlFor="billing-country"
              className="text-xs font-semibold text-gray-700 block"
            >
              Country / Region <span className="text-danger">*</span>
            </label>
            <select
              id="billing-country"
              value={formData.billing.country}
              onChange={(e) => handleBillingChange("country", e.target.value)}
              className="w-full p-3 text-sm rounded-xl border border-gray-200 outline-none focus:border-primary bg-white"
            >
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Australia">Australia</option>
            </select>
          </div>

          {/* States */}
          <div className="space-y-1.5">
            <label
              htmlFor="billing-state"
              className="text-xs font-semibold text-gray-700 block"
            >
              State / Province <span className="text-danger">*</span>
            </label>
            <input
              id="billing-state"
              type="text"
              value={formData.billing.state}
              onChange={(e) => handleBillingChange("state", e.target.value)}
              placeholder="e.g. California"
              className={`w-full p-3 text-sm rounded-xl border outline-none transition-colors ${
                errors["billing.state"]
                  ? "border-danger focus:ring-1 focus:ring-danger"
                  : "border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
              }`}
            />
            {errors["billing.state"] && (
              <span className="text-xs text-danger font-medium block">
                {errors["billing.state"]}
              </span>
            )}
          </div>

          {/* Zip Code */}
          <div className="space-y-1.5">
            <label
              htmlFor="billing-zip"
              className="text-xs font-semibold text-gray-700 block"
            >
              Zip Code <span className="text-danger">*</span>
            </label>
            <input
              id="billing-zip"
              type="text"
              value={formData.billing.zipCode}
              onChange={(e) => handleBillingChange("zipCode", e.target.value)}
              placeholder="e.g. 90210"
              className={`w-full p-3 text-sm rounded-xl border outline-none transition-colors ${
                errors["billing.zipCode"]
                  ? "border-danger focus:ring-1 focus:ring-danger"
                  : "border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
              }`}
            />
            {errors["billing.zipCode"] && (
              <span className="text-xs text-danger font-medium block">
                {errors["billing.zipCode"]}
              </span>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <label
              htmlFor="billing-phone"
              className="text-xs font-semibold text-gray-700 block"
            >
              Phone <span className="text-danger">*</span>
            </label>
            <input
              id="billing-phone"
              type="tel"
              value={formData.billing.phone}
              onChange={(e) => handleBillingChange("phone", e.target.value)}
              placeholder="(219) 555-0114"
              className={`w-full p-3 text-sm rounded-xl border outline-none transition-colors ${
                errors["billing.phone"]
                  ? "border-danger focus:ring-1 focus:ring-danger"
                  : "border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
              }`}
            />
            {errors["billing.phone"] && (
              <span className="text-xs text-danger font-medium block">
                {errors["billing.phone"]}
              </span>
            )}
          </div>

          {/* Email Address */}
          <div className="sm:col-span-2 space-y-1.5">
            <label
              htmlFor="billing-email"
              className="text-xs font-semibold text-gray-700 block"
            >
              Email Address <span className="text-danger">*</span>
            </label>
            <input
              id="billing-email"
              type="email"
              value={formData.billing.email}
              onChange={(e) => handleBillingChange("email", e.target.value)}
              placeholder="youremail@example.com"
              className={`w-full p-3 text-sm rounded-xl border outline-none transition-colors ${
                errors["billing.email"]
                  ? "border-danger focus:ring-1 focus:ring-danger"
                  : "border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
              }`}
            />
            {errors["billing.email"] && (
              <span className="text-xs text-danger font-medium block">
                {errors["billing.email"]}
              </span>
            )}
          </div>
        </div>

        {/* Ship to Different Address Toggle */}
        <div className="pt-4 border-t border-gray-100">
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={formData.shipToDifferentAddress}
              onChange={(e) =>
                onChange("shipToDifferentAddress", e.target.checked)
              }
              className="w-4 h-4 rounded accent-primary text-primary"
            />
            <span className="text-sm font-semibold text-gray-800">
              Ship to a different address
            </span>
          </label>
        </div>

        {/* Conditional Shipping Address Fields */}
        {formData.shipToDifferentAddress && (
          <div className="pt-4 space-y-4 animate-in fade-in duration-200 border-t border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
              Shipping Destination
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 block">
                  First Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  value={formData.shipping.firstName}
                  onChange={(e) =>
                    handleShippingChange("firstName", e.target.value)
                  }
                  placeholder="Recipient first name"
                  className="w-full p-3 text-sm rounded-xl border border-gray-200 outline-none focus:border-primary"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 block">
                  Last Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  value={formData.shipping.lastName}
                  onChange={(e) =>
                    handleShippingChange("lastName", e.target.value)
                  }
                  placeholder="Recipient last name"
                  className="w-full p-3 text-sm rounded-xl border border-gray-200 outline-none focus:border-primary"
                />
              </div>
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 block">
                  Street Address <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  value={formData.shipping.streetAddress}
                  onChange={(e) =>
                    handleShippingChange("streetAddress", e.target.value)
                  }
                  placeholder="Delivery street address"
                  className="w-full p-3 text-sm rounded-xl border border-gray-200 outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. Additional Information / Order Notes */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-xl font-bold text-gray-900 font-sans border-b border-gray-100 pb-4">
          Additional Info
        </h2>
        <div className="space-y-1.5">
          <label
            htmlFor="order-notes"
            className="text-xs font-semibold text-gray-700 block"
          >
            Order Notes (Optional)
          </label>
          <textarea
            id="order-notes"
            rows={4}
            value={formData.orderNotes}
            onChange={(e) => onChange("orderNotes", e.target.value)}
            placeholder="Notes about your order, e.g. special delivery instructions..."
            className="w-full p-3 text-sm rounded-xl border border-gray-200 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>
    </div>
  );
};
