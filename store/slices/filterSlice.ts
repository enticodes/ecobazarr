import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { FilterState } from "@/types";

const initialState: FilterState = {
  category: null,
  priceRange: [0, 100],
  rating: null,
  tags: [],
  inStockOnly: false,
  sortBy: "latest",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string | null>) => {
      state.category = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.priceRange = action.payload;
    },
    setRating: (state, action: PayloadAction<number | null>) => {
      state.rating = action.payload;
    },
    toggleTag: (state, action: PayloadAction<string>) => {
      const tag = action.payload;
      if (state.tags.includes(tag)) {
        state.tags = state.tags.filter((t) => t !== tag);
      } else {
        state.tags.push(tag);
      }
    },
    setInStockOnly: (state, action: PayloadAction<boolean>) => {
      state.inStockOnly = action.payload;
    },
    setSortBy: (
      state,
      action: PayloadAction<"latest" | "price-asc" | "price-desc" | "rating">
    ) => {
      state.sortBy = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const {
  setCategory,
  setPriceRange,
  setRating,
  toggleTag,
  setInStockOnly,
  setSortBy,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
