"use client";

import { Provider } from "react-redux";
import { store } from "./index";
import { StorageSynchronizer } from "@/components/common/StorageSynchronizer";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <StorageSynchronizer />
      {children}
    </Provider>
  );
}
