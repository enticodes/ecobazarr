import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, Product } from "@/types";

export interface CartState {
  items: CartItem[];
  couponCode: string | null;
}

const initialState: CartState = {
  items: [],
  couponCode: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product: Product; quantity?: number }>
    ) => {
      const { product, quantity = 1 } = action.payload;
      const addQty = Math.max(1, quantity);
      const existing = state.items.find((item) => item.product.id === product.id);

      if (existing) {
        existing.quantity += addQty;
      } else {
        state.items.push({
          product,
          quantity: addQty,
        });
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload;
      const target = state.items.find((item) => item.product.id === productId);
      if (target) {
        target.quantity = Math.max(1, Math.floor(quantity));
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.product.id !== productId);
    },
    clearCart: (state) => {
      state.items = [];
      state.couponCode = null;
    },
    applyCoupon: (state, action: PayloadAction<string>) => {
      state.couponCode = action.payload.trim().toUpperCase();
    },
    removeCoupon: (state) => {
      state.couponCode = null;
    },
    hydrateCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
  },
});

export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  applyCoupon,
  removeCoupon,
  hydrateCart,
} = cartSlice.actions;

export default cartSlice.reducer;
