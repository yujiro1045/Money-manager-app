import { create } from "zustand";

export type Transaction = {
  id: string;
  type: "income" | "expoense";
  category: string;
  amount: number;
  date: string;
  description?: string;
};
type FinanceState = {
  transactions: Transaction[];
  addTransaction: (t: Transaction) => void;
  deleteTransaction: (id: string) => void;
};

export const useFinanceStore = create<FinanceState>((set) => ({
  transactions: [],
  addTransaction: (t) =>
    set((state) => ({
      transactions: [...state.transactions, t],
    })),
  deleteTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    })),
}));
