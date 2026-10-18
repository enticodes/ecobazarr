"use client";

import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { hydrateCart } from "@/store/slices/cartSlice";
import { hydrateWishlist } from "@/store/slices/wishlistSlice";
import { hydrateOrders } from "@/store/slices/orderSlice";
import { hydrateProfile, type UserProfile } from "@/store/slices/profileSlice";
import type { CartItem, Product, Order } from "@/types";

const CART_STORAGE_KEY = "ecobazar_cart";
const WISHLIST_STORAGE_KEY = "ecobazar_wishlist";
const ORDERS_STORAGE_KEY = "ecobazar_orders";
const PROFILE_STORAGE_KEY = "ecobazar_profile";

export const StorageSynchronizer: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const orders = useAppSelector((state) => state.order.orders);
  const profile = useAppSelector((state) => state.profile);

  const isInitialized = useRef(false);

  // 1. Initial rehydration from localStorage on client mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const rawCart = localStorage.getItem(CART_STORAGE_KEY);
      if (rawCart) {
        const parsed = JSON.parse(rawCart);
        if (Array.isArray(parsed)) {
          const validItems = parsed.filter(
            (item): item is CartItem =>
              item &&
              item.product &&
              typeof item.product.id === "string" &&
              typeof item.quantity === "number" &&
              item.quantity > 0
          );
          dispatch(hydrateCart(validItems));
        }
      }
    } catch (err) {
      console.warn("Failed to rehydrate cart from storage:", err);
    }

    try {
      const rawWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (rawWishlist) {
        const parsed = JSON.parse(rawWishlist);
        if (Array.isArray(parsed)) {
          const validProducts = parsed.filter(
            (prod): prod is Product =>
              prod && typeof prod.id === "string" && typeof prod.name === "string"
          );
          dispatch(hydrateWishlist(validProducts));
        }
      }
    } catch (err) {
      console.warn("Failed to rehydrate wishlist from storage:", err);
    }

    try {
      const rawOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (rawOrders) {
        const parsed = JSON.parse(rawOrders);
        if (Array.isArray(parsed)) {
          const validOrders = parsed.filter(
            (ord): ord is Order =>
              ord && typeof ord.id === "string" && typeof ord.total === "number"
          );
          dispatch(hydrateOrders(validOrders));
        }
      }
    } catch (err) {
      console.warn("Failed to rehydrate orders from storage:", err);
    }

    try {
      const rawProfile = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (rawProfile) {
        const parsed = JSON.parse(rawProfile);
        if (parsed && typeof parsed.email === "string" && parsed.billingAddress) {
          dispatch(hydrateProfile(parsed as UserProfile));
        }
      }
    } catch (err) {
      console.warn("Failed to rehydrate profile from storage:", err);
    }

    isInitialized.current = true;
  }, [dispatch]);

  // 2. Persist cart changes
  useEffect(() => {
    if (!isInitialized.current || typeof window === "undefined") return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (err) {
      console.warn("Failed to save cart to storage:", err);
    }
  }, [cartItems]);

  // 3. Persist wishlist changes
  useEffect(() => {
    if (!isInitialized.current || typeof window === "undefined") return;
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistItems));
    } catch (err) {
      console.warn("Failed to save wishlist to storage:", err);
    }
  }, [wishlistItems]);

  // 4. Persist orders changes
  useEffect(() => {
    if (!isInitialized.current || typeof window === "undefined") return;
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (err) {
      console.warn("Failed to save orders to storage:", err);
    }
  }, [orders]);

  // 5. Persist profile changes
  useEffect(() => {
    if (!isInitialized.current || typeof window === "undefined") return;
    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
    } catch (err) {
      console.warn("Failed to save profile to storage:", err);
    }
  }, [profile]);

  return null;
};
