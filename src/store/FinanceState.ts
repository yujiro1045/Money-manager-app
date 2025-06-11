import { TransactionTypeEnum } from "@/app/enum/transaction/transaction-type.enum";
import { TransactionType } from "@/interfaces/transacions-interfaces";
import { create } from "zustand";

type FinanceActions = {
  loadTransactions: (transaction: TransactionType[]) => void;
  addIncome: (transaction: TransactionType) => void;
  deleteIncome: (id: string) => void;
  addExpense: (transaction: TransactionType) => void;
  deleteExpense: (id: string) => void;
};
type FinanceState = {
  loading: boolean;
  incomes: TransactionType[];
  expenses: TransactionType[];
  incomeTotal: number;
  expenseTotal: number;
  balance: number;
};

export const useFinanceStore = create<FinanceState & FinanceActions>((set) => ({
  loading: true,
  expenses: [],
  incomes: [],
  balance: 0,
  incomeTotal: 0,
  expenseTotal: 0,

  loadTransactions: (transactions) => {
    const expenses = transactions.filter(
      (transaction) => transaction.type === TransactionTypeEnum.EXPENSE
    );
    const incomes = transactions.filter(
      (transaction) => transaction.type === TransactionTypeEnum.INCOME
    );

    const expenseTotal = expenses.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );
    const incomeTotal = incomes.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );

    const balance = incomeTotal - expenseTotal;

    set({
      loading: false,
      expenses,
      incomes,
      expenseTotal,
      incomeTotal,
      balance,
    });
  },

  addExpense: (expense: TransactionType) => {
    set((state) => {
      const exists = state.expenses.some(
        (transaction) => transaction.id === expense.id
      );
      if (exists) return state;

      const newExpenses = [...state.expenses, expense];
      const newExpenseTotal = newExpenses.reduce(
        (total, transaction) => total + transaction.amount,
        0
      );

      const newBalance = state.incomeTotal - newExpenseTotal;

      return {
        expenses: newExpenses,
        expenseTotal: newExpenseTotal,
        balance: newBalance,
      };
    });
  },

  deleteExpense: (expenseId) => {
    set((state) => {
      const newExpenses = state.expenses.filter(
        (transaction) => transaction.id !== expenseId
      );
      const newExpenseTotal = newExpenses.reduce(
        (total, transaction) => total + transaction.amount,
        0
      );
      const newBalance = state.incomeTotal - newExpenseTotal;

      return {
        expenses: newExpenses,
        expenseTotal: newExpenseTotal,
        balance: newBalance,
      };
    });
  },

  addIncome: (income: TransactionType) =>
    set((state) => {
      const exists = state.incomes.some(
        (transaction) => transaction.id === income.id
      );
      if (exists) return state;

      const newIncomes = [...state.incomes, income];
      const newIncomeTotal = newIncomes.reduce(
        (total, transaction) => total + transaction.amount,
        0
      );
      const newBalance = newIncomeTotal - state.expenseTotal;

      return {
        incomes: newIncomes,
        incomeTotal: newIncomeTotal,
        balance: newBalance,
      };
    }),

  deleteIncome: (incomeId) =>
    set((state) => {
      const newIncomes = state.incomes.filter(
        (transaction) => transaction.id !== incomeId
      );
      const newIncomeTotal = newIncomes.reduce(
        (total, transaction) => total + transaction.amount,
        0
      );
      const newBalance = newIncomeTotal - state.expenseTotal;

      return {
        incomes: newIncomes,
        incomeTotal: newIncomeTotal,
        balance: newBalance,
      };
    }),
}));
