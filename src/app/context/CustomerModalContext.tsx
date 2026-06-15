import { createContext, useContext } from "react";
import type { Customer } from "../components/CustomerModal";

export const CustomerModalContext = createContext<(c: Customer) => void>(() => {});

export function useCustomerModal() {
  return useContext(CustomerModalContext);
}
