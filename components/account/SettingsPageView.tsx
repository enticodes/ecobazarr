"use client";

import React, { useState } from "react";
import { CheckCircle2, User, MapPin, Lock, Info } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  updateProfile,
  updateBillingAddress,
} from "@/store/slices/profileSlice";
import { AccountLayout } from "@/components/account";
import { Button } from "@/components/common/Button";
import type { Address } from "@/types";

export const SettingsPageView: React.FC = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.profile);

  // 1. Profile form state
  const [profileForm, setProfileForm] = useState({
    firstName: profile.firstName,
    lastName: profile.lastName,
    email: profile.email,
    phone: profile.phone,
    avatar: profile.avatar,
  });
  const [profileSaved, setProfileSaved] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);

  // 2. Billing address state
  const [billingForm, setBillingForm] = useState<Address>({
    ...profile.billingAddress,
  });
  const [billingSaved, setBillingSaved] = useState(false);
  const [billingError, setBillingError] = useState<string | null>(null);

  // 3. Password simulation state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Handlers
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileForm.firstName.trim() || !profileForm.lastName.trim()) {
      setProfileError("First and last names are required");
      return;
    }
    if (!profileForm.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileForm.email)) {
      setProfileError("A valid email address is required");
      return;
    }
    setProfileError(null);
    dispatch(updateProfile(profileForm));
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const handleSaveBilling = (e: React.FormEvent) => {
    e.preventDefault();
    if (!billingForm.firstName.trim() || !billingForm.lastName.trim()) {
      setBillingError("Recipient name is required");
      return;
    }
    if (!billingForm.streetAddress.trim()) {
      setBillingError("Street address is required");
      return;
    }
    if (!billingForm.zipCode.trim()) {
      setBillingError("Zip code is required");
      return;
    }
    setBillingError(null);
    dispatch(updateBillingAddress(billingForm));
    setBillingSaved(true);
    setTimeout(() => setBillingSaved(false), 3000);
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordForm.currentPassword) {
      setPasswordError("Please enter your current password");
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    setPasswordError(null);
    setPasswordSaved(true);
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setTimeout(() => setPasswordSaved(false), 3000);
  };

  return (
    <AccountLayout breadcrumbLabel="Settings">
      <div className="space-y-8">
        {/* Section 1: Account Settings / Profile */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-2.5 border-b border-gray-100 pb-4">
            <User className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-gray-900 font-sans">
              Account Settings
            </h2>
          </div>

          {profileSaved && (
            <div className="p-3 bg-primary-tint border border-primary-soft text-primary text-xs font-semibold rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Profile settings successfully saved!</span>
            </div>
          )}

          {profileError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl flex items-center gap-2">
              <Info className="w-4 h-4 shrink-0" />
              <span>{profileError}</span>
            </div>
          )}

          <form onSubmit={handleSaveProfile} className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center gap-6 pb-2">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/20 shrink-0">
                <img
                  src={profileForm.avatar}
                  alt={profileForm.firstName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1.5 flex-1 w-full">
                <label className="text-xs font-semibold text-gray-700 block">
                  Avatar Image URL
                </label>
                <input
                  type="url"
                  value={profileForm.avatar}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, avatar: e.target.value })
                  }
                  className="w-full p-2.5 text-xs rounded-xl border border-gray-200 outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 block">
                  First Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={profileForm.firstName}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, firstName: e.target.value })
                  }
                  className="w-full p-3 text-sm rounded-xl border border-gray-200 outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 block">
                  Last Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={profileForm.lastName}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, lastName: e.target.value })
                  }
                  className="w-full p-3 text-sm rounded-xl border border-gray-200 outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 block">
                  Email Address <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={profileForm.email}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, email: e.target.value })
                  }
                  className="w-full p-3 text-sm rounded-xl border border-gray-200 outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 block">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={profileForm.phone}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, phone: e.target.value })
                  }
                  className="w-full p-3 text-sm rounded-xl border border-gray-200 outline-none focus:border-primary"
                />
              </div>
            </div>

            <Button variant="primary" size="md" type="submit">
              Save Profile Changes
            </Button>
          </form>
        </div>

        {/* Section 2: Billing Address Form */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-2.5 border-b border-gray-100 pb-4">
            <MapPin className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-gray-900 font-sans">
              Billing Address
            </h2>
          </div>

          {billingSaved && (
            <div className="p-3 bg-primary-tint border border-primary-soft text-primary text-xs font-semibold rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Billing address successfully updated!</span>
            </div>
          )}

          {billingError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl flex items-center gap-2">
              <Info className="w-4 h-4 shrink-0" />
              <span>{billingError}</span>
            </div>
          )}

          <form onSubmit={handleSaveBilling} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 block">
                  First Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={billingForm.firstName}
                  onChange={(e) =>
                    setBillingForm({ ...billingForm, firstName: e.target.value })
                  }
                  className="w-full p-3 text-sm rounded-xl border border-gray-200 outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 block">
                  Last Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={billingForm.lastName}
                  onChange={(e) =>
                    setBillingForm({ ...billingForm, lastName: e.target.value })
                  }
                  className="w-full p-3 text-sm rounded-xl border border-gray-200 outline-none focus:border-primary"
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 block">
                  Company Name (Optional)
                </label>
                <input
                  type="text"
                  value={billingForm.companyName || ""}
                  onChange={(e) =>
                    setBillingForm({ ...billingForm, companyName: e.target.value })
                  }
                  className="w-full p-3 text-sm rounded-xl border border-gray-200 outline-none focus:border-primary"
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 block">
                  Street Address <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={billingForm.streetAddress}
                  onChange={(e) =>
                    setBillingForm({
                      ...billingForm,
                      streetAddress: e.target.value,
                    })
                  }
                  className="w-full p-3 text-sm rounded-xl border border-gray-200 outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 block">
                  Country / Region
                </label>
                <select
                  value={billingForm.country}
                  onChange={(e) =>
                    setBillingForm({ ...billingForm, country: e.target.value })
                  }
                  className="w-full p-3 text-sm rounded-xl border border-gray-200 outline-none focus:border-primary bg-white"
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 block">
                  State / Province <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={billingForm.state}
                  onChange={(e) =>
                    setBillingForm({ ...billingForm, state: e.target.value })
                  }
                  className="w-full p-3 text-sm rounded-xl border border-gray-200 outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 block">
                  Zip Code <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={billingForm.zipCode}
                  onChange={(e) =>
                    setBillingForm({ ...billingForm, zipCode: e.target.value })
                  }
                  className="w-full p-3 text-sm rounded-xl border border-gray-200 outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 block">
                  Phone
                </label>
                <input
                  type="tel"
                  value={billingForm.phone}
                  onChange={(e) =>
                    setBillingForm({ ...billingForm, phone: e.target.value })
                  }
                  className="w-full p-3 text-sm rounded-xl border border-gray-200 outline-none focus:border-primary"
                />
              </div>
            </div>

            <Button variant="primary" size="md" type="submit">
              Save Billing Address
            </Button>
          </form>
        </div>

        {/* Section 3: Change Password Simulation */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-2.5 border-b border-gray-100 pb-4">
            <Lock className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-gray-900 font-sans">
              Change Password
            </h2>
          </div>

          {passwordSaved && (
            <div className="p-3 bg-primary-tint border border-primary-soft text-primary text-xs font-semibold rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Password updated successfully in demonstration session!</span>
            </div>
          )}

          {passwordError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl flex items-center gap-2">
              <Info className="w-4 h-4 shrink-0" />
              <span>{passwordError}</span>
            </div>
          )}

          <form onSubmit={handleSavePassword} className="space-y-4 max-w-lg">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 block">
                Current Password
              </label>
              <input
                type="password"
                required
                value={passwordForm.currentPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    currentPassword: e.target.value,
                  })
                }
                placeholder="Enter current password"
                className="w-full p-3 text-sm rounded-xl border border-gray-200 outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 block">
                New Password
              </label>
              <input
                type="password"
                required
                value={passwordForm.newPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    newPassword: e.target.value,
                  })
                }
                placeholder="At least 6 characters"
                className="w-full p-3 text-sm rounded-xl border border-gray-200 outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 block">
                Confirm Password
              </label>
              <input
                type="password"
                required
                value={passwordForm.confirmPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    confirmPassword: e.target.value,
                  })
                }
                placeholder="Confirm new password"
                className="w-full p-3 text-sm rounded-xl border border-gray-200 outline-none focus:border-primary"
              />
            </div>

            <Button variant="primary" size="md" type="submit">
              Change Password
            </Button>
          </form>
        </div>
      </div>
    </AccountLayout>
  );
};
