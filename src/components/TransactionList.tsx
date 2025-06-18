"use client";

import { TransactionTypeEnum } from "@/app/enum/transaction/transaction-type.enum";
import { useTransactions } from "@/app/hooks/useTransactions";
import { useFinanceStore } from "@/store/FinanceState";
import dayjs from "dayjs";

import React from "react";

const TransactionList = () => {
  const { loading, handleDeleteTransaction } = useTransactions();

  const { selectedMonth, selectedYear, getMonthlyTransactions } =
    useFinanceStore();

  const transactions = getMonthlyTransactions(selectedMonth, selectedYear);

  if (loading) {
    return <p className="text-gray-600">Cargando transacciones...</p>;
  }

  if (transactions.length === 0) {
    return (
      <p className="text-grat-600 mt-24 text-center">
        No hay transacciones aún. Añade una transacción para comenzar.
      </p>
    );
  }

  return (
    <div className="space-y-4 mt-10 max-w-3xl mx-auto">
      {transactions.map((tx) => (
        <div
          key={tx.id}
          className="bg-white p-5 gap-2 rounded-xl shadow-md border border-slate-200 hover:shadow-lg transition-shadow duration-200 flex justify-between items-center"
        >
          <div>
            <p className="font-semibold text-slate-700">{tx.category}</p>
            <p className="text-slate-500 text-sm">
              {dayjs(tx.date).format("DD/MM/YYYY")}
            </p>
          </div>

          <p
            className={`text-lg font-bold ${
              tx.type === TransactionTypeEnum.INCOME
                ? "text-emerald-600"
                : "text-rose-600"
            }`}
          >
            {tx.type === TransactionTypeEnum.INCOME ? "+" : "-"} $
            {tx.amount.toLocaleString("de-DE")}
          </p>

          <button
            className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-all duration-200 border border-rose-300 hover:border-rose-400 rounded-lg px-3 py-2 text-sm font-medium"
            onClick={() => handleDeleteTransaction(tx)}
          >
            Borrar
          </button>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
