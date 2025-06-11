"use client";

import { TransactionTypeEnum } from "@/app/enum/transaction/transaction-type.enum";
import { useTransactions } from "@/app/hooks/useTransactions";

import React from "react";

const TransactionList = () => {
  const { loading, allTransactions, handleDeleteTransaction } =
    useTransactions();

  if (loading) {
    return <p className="text-gray-600">Cargando transacciones...</p>;
  }

  if (allTransactions.length === 0) {
    return (
      <p className="text-grat-600 mt-24 text-center">
        No hay transacciones aún. Añade una transacción para comenzar.
      </p>
    );
  }

  return (
    <div className=" space-y-2 mb-20 mt-24">
      {allTransactions.map((tx) => (
        <div
          key={tx.id}
          className="p-4 border rounded shadow flex justify-between items-center"
        >
          <div>
            <p>{tx.category}</p>
            <p>{new Date(tx.date).toLocaleDateString()}</p>
          </div>
          <p
            className={`text-lg font-bold  ${
              tx.type === TransactionTypeEnum.INCOME
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {tx.type === TransactionTypeEnum.INCOME ? "+" : "-"} $
            {tx.amount.toLocaleString("de-DE")}
          </p>
          <button
            className="text-red-500 hover:text-red-700 border-amber-100 border rounded px-2 py-1 mx-2"
            onClick={() => handleDeleteTransaction(tx)}
          >
            Borrar transacción
          </button>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
