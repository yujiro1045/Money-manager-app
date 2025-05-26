import { TransactionTypeEnum } from "@/app/enum/transaction/transaction-type.enum";
import { TransactionType } from "@/interfaces/transacions.interface";
import { create } from "zustand";


type FinanceState = {
  loading: boolean;
  incomes: TransactionType[];
  expenses: TransactionType[];
  incomeTotal: number;
  expenseTotal: number;
  balance: number;
};

type FinanceActions = {
  loadTransactions: (t: TransactionType[]) => void;
  addIncome: (t: TransactionType) => void;
  deleteIncome: (id: string) => void;
  addExpense: (t: TransactionType) => void;
  deleteExpense: (id: string) => void;
}

export const useFinanceStore = create<FinanceState & FinanceActions>((set) => ({
  /*Estado inicial cargando para que la UI sepa que está esperando datos*/
  loading: true,
  expenses: [],
  incomes: [],
  balance: 0,
  incomeTotal: 0,
  expenseTotal: 0,


  loadTransactions: (transactions) => {
    /*Dividimos las transacciones en ingresos y gastos, y calculamos los totales incluido el balance*/
    const expenses = transactions.filter((t) => t.type === TransactionTypeEnum.EXPENSE);
    const incomes = transactions.filter((t) => t.type === TransactionTypeEnum.INCOME);

    const expenseTotal = expenses.reduce((total, t) => total + t.amount, 0);
    const incomeTotal = incomes.reduce((total, t) => total + t.amount, 0);

    const balance = incomeTotal - expenseTotal;

    /*Seteamos el estado inicial con los datos calculados*/

    set({
      /*Marcamos que ya no estamos cargando los datos*/
      loading: false,
      expenses,
      incomes,
      expenseTotal,
      incomeTotal,
      balance
    });
  },

  addExpense: (expense) => {
    set((state) => {
      const newExpenses = [...state.expenses, expense];
      const newExpenseTotal = newExpenses.reduce((total, t) => total + t.amount, 0);

      const newBalance = state.incomeTotal - newExpenseTotal;

      /*Cada cambio de estado recalcula el balance y los totales*/
      return ({
      expenses: newExpenses,
      expenseTotal: newExpenseTotal,
      balance: newBalance
    })
    })
  },

  /*Aquí debes seguir con la lógica de recxalcular el balance y los totales al hacer cualquier movimiento transacciones, lo mismo en addIncome y deleteIcome*/
  deleteExpense: (expenseId) => {
    set((state) => ({
      expenses: state.expenses.filter((t) => t.id !== expenseId)
    }))
  },

  addIncome: (income) =>
    set((state) => ({
      incomes: [...state.incomes, income],
    })),
  deleteIncome: (incomeId) =>
    set((state) => ({
      incomes: state.incomes.filter((t) => t.id !== incomeId),
    }))
}));
