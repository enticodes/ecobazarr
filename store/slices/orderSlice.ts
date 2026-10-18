import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Order } from "@/types";
import { PRODUCTS } from "@/data/products";

export const INITIAL_MOCK_ORDERS: Order[] = [
  {
    id: "ECO-73291",
    date: "10 Oct, 2026",
    subtotal: 48.97,
    shipping: 0,
    discount: 5.0,
    couponCode: "ECO10",
    total: 43.97,
    status: "Processing",
    paymentMethod: "card",
    items: [
      { product: PRODUCTS[0], quantity: 2 },
      { product: PRODUCTS[1], quantity: 1 },
    ],
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
    orderNotes: "Please leave package safely on front porch.",
  },
  {
    id: "ECO-65120",
    date: "28 Sep, 2026",
    subtotal: 84.5,
    shipping: 0,
    discount: 0,
    total: 84.5,
    status: "Delivered",
    paymentMethod: "cod",
    items: [
      { product: PRODUCTS[2], quantity: 3 },
      { product: PRODUCTS[3], quantity: 2 },
      { product: PRODUCTS[4], quantity: 1 },
    ],
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
  },
  {
    id: "ECO-58904",
    date: "12 Aug, 2026",
    subtotal: 32.0,
    shipping: 5.0,
    discount: 0,
    total: 37.0,
    status: "Delivered",
    paymentMethod: "paypal",
    items: [{ product: PRODUCTS[5], quantity: 2 }],
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
  },
];

export interface OrderState {
  orders: Order[];
  lastOrder: Order | null;
}

const initialState: OrderState = {
  orders: INITIAL_MOCK_ORDERS,
  lastOrder: INITIAL_MOCK_ORDERS[0],
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    createOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload);
      state.lastOrder = action.payload;
    },
    hydrateOrders: (state, action: PayloadAction<Order[]>) => {
      // Preserve all user-created orders at the top, and retain seeded mock orders without overwriting
      if (action.payload && action.payload.length > 0) {
        const storedIds = new Set(action.payload.map((o) => o.id));
        const missingInitial = INITIAL_MOCK_ORDERS.filter((o) => !storedIds.has(o.id));
        state.orders = [...action.payload, ...missingInitial];
        state.lastOrder = state.orders[0];
      }
    },
  },
});

export const { createOrder, hydrateOrders } = orderSlice.actions;

export default orderSlice.reducer;
