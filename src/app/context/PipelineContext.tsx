import { createContext, useContext } from "react";
import type { Customer } from "../components/CustomerModal";

export type PipelineDeal = {
  id: number;
  name: string;
  product: string;
  amount: number;
  stage: string;
  stageColor: string;
  prob: number;
  dueDate: string;
  avatar: string;
  avatarBg: string;
  customer: Customer;
};

export const PipelineContext = createContext<{
  deals: PipelineDeal[];
  addDeal: (deal: PipelineDeal) => void;
}>({ deals: [], addDeal: () => {} });

export function usePipeline() {
  return useContext(PipelineContext);
}
