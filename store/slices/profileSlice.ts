import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Address } from "@/types";

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  billingAddress: Address;
  shippingAddress: Address;
}

const initialProfile: UserProfile = {
  firstName: "Dianne",
  lastName: "Russell",
  email: "dianne.russell@gmail.com",
  phone: "(219) 555-0114",
  avatar:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  billingAddress: {
    firstName: "Dianne",
    lastName: "Russell",
    companyName: "Organic Living",
    streetAddress: "4140 Parker Rd. Allentown",
    country: "United States",
    state: "New Mexico",
    zipCode: "31134",
    email: "dianne.russell@gmail.com",
    phone: "(219) 555-0114",
  },
  shippingAddress: {
    firstName: "Dianne",
    lastName: "Russell",
    companyName: "Organic Living",
    streetAddress: "4140 Parker Rd. Allentown",
    country: "United States",
    state: "New Mexico",
    zipCode: "31134",
    email: "dianne.russell@gmail.com",
    phone: "(219) 555-0114",
  },
};

export const profileSlice = createSlice({
  name: "profile",
  initialState: initialProfile,
  reducers: {
    updateProfile: (
      state,
      action: PayloadAction<Partial<Omit<UserProfile, "billingAddress" | "shippingAddress">>>
    ) => {
      Object.assign(state, action.payload);
    },
    updateBillingAddress: (state, action: PayloadAction<Address>) => {
      state.billingAddress = action.payload;
    },
    updateShippingAddress: (state, action: PayloadAction<Address>) => {
      state.shippingAddress = action.payload;
    },
    hydrateProfile: (state, action: PayloadAction<UserProfile>) => {
      return action.payload;
    },
  },
});

export const {
  updateProfile,
  updateBillingAddress,
  updateShippingAddress,
  hydrateProfile,
} = profileSlice.actions;

export default profileSlice.reducer;
