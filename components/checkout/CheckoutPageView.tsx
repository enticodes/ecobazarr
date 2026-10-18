"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearCart } from "@/store/slices/cartSlice";
import { createOrder } from "@/store/slices/orderSlice";
import { calculateCartTotals } from "@/lib/cartUtils";
import { BillingForm, type BillingFormData } from "./BillingForm";
import { CheckoutOrderSummary } from "./CheckoutOrderSummary";
import { OrderSuccessView } from "./OrderSuccessView";
import { ShopBreadcrumbs } from "@/components/shop";
import { Button } from "@/components/common/Button";
import type { Order, Address } from "@/types";

export const CheckoutPageView: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const couponCode = useAppSelector((state) => state.cart.couponCode);

  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "paypal" | "card">("cod");

  const [formData, setFormData] = useState<BillingFormData>({
    billing: {
      firstName: "",
      lastName: "",
      companyName: "",
      streetAddress: "",
      country: "United States",
      state: "",
      zipCode: "",
      phone: "",
      email: "",
    },
    shipToDifferentAddress: false,
    shipping: {
      firstName: "",
      lastName: "",
      companyName: "",
      streetAddress: "",
      country: "United States",
      state: "",
      zipCode: "",
      phone: "",
      email: "",
    },
    orderNotes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const totals = useMemo(
    () => calculateCartTotals(cartItems, couponCode),
    [cartItems, couponCode]
  );

  const handleFieldChange = (
    field: string,
    value: Address | boolean | string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field-level errors when edited
    setErrors((prev) => {
      const copy = { ...prev };
      Object.keys(copy).forEach((key) => {
        if (key.startsWith(field)) delete copy[key];
      });
      return copy;
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.billing.firstName.trim()) {
      newErrors["billing.firstName"] = "First name is required";
    }
    if (!formData.billing.lastName.trim()) {
      newErrors["billing.lastName"] = "Last name is required";
    }
    if (!formData.billing.streetAddress.trim()) {
      newErrors["billing.streetAddress"] = "Street address is required";
    }
    if (!formData.billing.state.trim()) {
      newErrors["billing.state"] = "State is required";
    }
    if (!formData.billing.zipCode.trim()) {
      newErrors["billing.zipCode"] = "Zip code is required";
    }
    if (!formData.billing.phone.trim()) {
      newErrors["billing.phone"] = "Phone number is required";
    }
    if (!formData.billing.email.trim()) {
      newErrors["billing.email"] = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.billing.email)) {
      newErrors["billing.email"] = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validateForm()) return;
    if (cartItems.length === 0) return;

    setIsSubmitting(true);

    const generatedId = `ECO-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date();
    const formattedDate = `${now.getDate()} ${now.toLocaleString("en-US", {
      month: "short",
    })}, ${now.getFullYear()}`;

    const newOrder: Order = {
      id: generatedId,
      date: formattedDate,
      items: [...cartItems],
      subtotal: totals.subtotal,
      shipping: totals.shipping,
      discount: totals.discount,
      couponCode: totals.appliedCoupon?.code,
      total: totals.total,
      status: "Processing",
      billingAddress: { ...formData.billing },
      shippingAddress: formData.shipToDifferentAddress
        ? { ...formData.shipping }
        : { ...formData.billing },
      paymentMethod,
      orderNotes: formData.orderNotes.trim() || undefined,
    };

    setTimeout(() => {
      dispatch(createOrder(newOrder));
      dispatch(clearCart());
      setConfirmedOrder(newOrder);
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 600);
  };

  return (
    <div className="w-full bg-white pb-20">
      {/* 1. Breadcrumbs */}
      <ShopBreadcrumbs items={[{ label: "Checkout" }]} />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {confirmedOrder ? (
          <OrderSuccessView order={confirmedOrder} />
        ) : cartItems.length === 0 ? (
          <div className="w-full py-20 bg-gray-50/50 rounded-2xl border border-gray-100 flex flex-col items-center justify-center text-center p-8 space-y-4">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
              <ShoppingBag className="w-10 h-10 stroke-[1.2]" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 font-sans">
              Cannot checkout with an empty cart
            </h2>
            <p className="text-sm text-gray-500 max-w-sm font-body">
              Add some fresh organic items from our shop before proceeding to checkout.
            </p>
            <Button variant="primary" size="md">
              <Link href="/shop" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Shop</span>
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-sans tracking-tight">
              Checkout
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Billing Information Form */}
              <div className="lg:col-span-7">
                <BillingForm
                  formData={formData}
                  errors={errors}
                  onChange={handleFieldChange}
                />
              </div>

              {/* Right Column: Order Summary & Payment */}
              <div className="lg:col-span-5 sticky top-28">
                <CheckoutOrderSummary
                  items={cartItems}
                  totals={totals}
                  paymentMethod={paymentMethod}
                  onChangePaymentMethod={setPaymentMethod}
                  onSubmitOrder={handlePlaceOrder}
                  isSubmitting={isSubmitting}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
