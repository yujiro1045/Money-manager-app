import { TransactionTypeEnum } from "@/app/enum/transaction/transaction-type.enum";
import { TransactionType } from "@/interfaces/transacions-interfaces";
import dayjs from "dayjs";
import { create } from "zustand";

type FinanceActions = {
  loadTransactions: (transaction: TransactionType[]) => void;
  addIncome: (transaction: TransactionType) => void;
  deleteIncome: (id: string) => void;
  addExpense: (transaction: TransactionType) => void;
  deleteExpense: (id: string) => void;
  setSelectedMonth: (month: number) => void;
  setSelectedYear: (year: number) => void;
  getMonthlySummary: (
    month: number,
    year: number
  ) => {
    balance: number;
    expenses: TransactionType[];
    expenseTotal: number;
    incomes: TransactionType[];
    incomeTotal: number;
  };
  getMonthlyTransactions: (month: number, year: number) => TransactionType[];
};
type FinanceState = {
  balance: number;
  expenses: TransactionType[];
  expenseTotal: number;
  incomes: TransactionType[];
  incomeTotal: number;
  loading: boolean;
  selectedMonth: number;
  selectedYear: number;
};

export const useFinanceStore = create<FinanceState & FinanceActions>(
  (set, get) => ({
    balance: 0,
    expenses: [],
    expenseTotal: 0,
    incomes: [],
    incomeTotal: 0,
    loading: true,
    selectedMonth: dayjs().month(),
    selectedYear: dayjs().year(),

    loadTransactions: (transactions) => {
      const expenses = transactions.filter(
        (t) => t.type === TransactionTypeEnum.EXPENSE
      );
      const incomes = transactions.filter(
        (t) => t.type === TransactionTypeEnum.INCOME
      );

      const expenseTotal = expenses.reduce((sum, t) => sum + t.amount, 0);
      const incomeTotal = incomes.reduce((sum, t) => sum + t.amount, 0);
      const balance = incomeTotal - expenseTotal;

      set({
        balance,
        expenses,
        expenseTotal,
        incomes,
        incomeTotal,
        loading: false,
      });
    },

    addIncome: (income) =>
      set((state) => {
        const exists = state.incomes.some((t) => t.id === income.id);
        if (exists) return state;

        const newIncomes = [...state.incomes, income];
        const newIncomeTotal = newIncomes.reduce((sum, t) => sum + t.amount, 0);
        const newBalance = newIncomeTotal - state.expenseTotal;

        return {
          balance: newBalance,
          incomes: newIncomes,
          incomeTotal: newIncomeTotal,
        };
      }),

    deleteIncome: (id) =>
      set((state) => {
        const newIncomes = state.incomes.filter((t) => t.id !== id);
        const newIncomeTotal = newIncomes.reduce((sum, t) => sum + t.amount, 0);
        const newBalance = newIncomeTotal - state.expenseTotal;

        return {
          balance: newBalance,
          incomes: newIncomes,
          incomeTotal: newIncomeTotal,
        };
      }),

    addExpense: (expense) =>
      set((state) => {
        const exists = state.expenses.some((t) => t.id === expense.id);
        if (exists) return state;

        const newExpenses = [...state.expenses, expense];
        const newExpenseTotal = newExpenses.reduce(
          (sum, t) => sum + t.amount,
          0
        );
        const newBalance = state.incomeTotal - newExpenseTotal;

        return {
          balance: newBalance,
          expenses: newExpenses,
          expenseTotal: newExpenseTotal,
        };
      }),

    deleteExpense: (id) =>
      set((state) => {
        const newExpenses = state.expenses.filter((t) => t.id !== id);
        const newExpenseTotal = newExpenses.reduce(
          (sum, t) => sum + t.amount,
          0
        );
        const newBalance = state.incomeTotal - newExpenseTotal;

        return {
          balance: newBalance,
          expenses: newExpenses,
          expenseTotal: newExpenseTotal,
        };
      }),

    setSelectedMonth: (month) => {
      set({ selectedMonth: month });
    },

    setSelectedYear: (year) => {
      set({ selectedYear: year });
    },

    getMonthlySummary: (month, year) => {
      const { incomes, expenses } = get();

      const filterByDate = (transactions: TransactionType[]) =>
        transactions.filter((transaction) => {
          const date = dayjs(transaction.date);
          return date.month() === month && date.year() === year;
        });

      const filteredIncomes = filterByDate(incomes);
      const filteredExpenses = filterByDate(expenses);

      const incomeTotal = filteredIncomes.reduce((sum, t) => sum + t.amount, 0);
      const expenseTotal = filteredExpenses.reduce(
        (sum, t) => sum + t.amount,
        0
      );
      const balance = incomeTotal - expenseTotal;

      return {
        incomes: filteredIncomes,
        expenses: filteredExpenses,
        incomeTotal,
        expenseTotal,
        balance,
      };
    },

    getMonthlyTransactions: (month, year) => {
      const { incomes, expenses } = get();

      const filterByDate = (transactions: TransactionType[]) =>
        transactions.filter((transaction) => {
          const date = dayjs(transaction.date);
          return date.month() === month && date.year() === year;
        });

      const filteredIncomes = filterByDate(incomes);
      const filteredExpenses = filterByDate(expenses);

      return [...filteredIncomes, ...filteredExpenses];
    },
  })
);
