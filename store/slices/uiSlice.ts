import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/types";

export interface UIState {
  isMobileMenuOpen: boolean;
  isCategoryDrawerOpen: boolean;
  isCartFlyoutOpen: boolean;
  isQuickViewOpen: boolean;
  quickViewProduct: Product | null;
  isNewsletterOpen: boolean;
}

const initialState: UIState = {
  isMobileMenuOpen: false,
  isCategoryDrawerOpen: false,
  isCartFlyoutOpen: false,
  isQuickViewOpen: false,
  quickViewProduct: null,
  isNewsletterOpen: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    setMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isMobileMenuOpen = action.payload;
    },
    toggleCategoryDrawer: (state) => {
      state.isCategoryDrawerOpen = !state.isCategoryDrawerOpen;
    },
    setCategoryDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.isCategoryDrawerOpen = action.payload;
    },
    toggleCartFlyout: (state) => {
      state.isCartFlyoutOpen = !state.isCartFlyoutOpen;
    },
    setCartFlyoutOpen: (state, action: PayloadAction<boolean>) => {
      state.isCartFlyoutOpen = action.payload;
    },
    openQuickView: (state, action: PayloadAction<Product>) => {
      state.quickViewProduct = action.payload;
      state.isQuickViewOpen = true;
    },
    closeQuickView: (state) => {
      state.quickViewProduct = null;
      state.isQuickViewOpen = false;
    },
    setNewsletterOpen: (state, action: PayloadAction<boolean>) => {
      state.isNewsletterOpen = action.payload;
    },
  },
});

export const {
  toggleMobileMenu,
  setMobileMenuOpen,
  toggleCategoryDrawer,
  setCategoryDrawerOpen,
  toggleCartFlyout,
  setCartFlyoutOpen,
  openQuickView,
  closeQuickView,
  setNewsletterOpen,
} = uiSlice.actions;

export default uiSlice.reducer;
