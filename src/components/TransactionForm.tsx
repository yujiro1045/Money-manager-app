import {
  TransactionCategoryEnum,
  TransactionTypeEnum,
} from "@/app/enum/transaction/transaction-type.enum";
import { useTransactionForm } from "@/app/hooks/useTransactionForm";
import React from "react";

const TransactionForm = () => {
  const {
    amount,
    category,
    handleSubmit,
    setAmount,
    setCategory,
    setType,
    type,
  } = useTransactionForm();

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-br from-slate-50 to-blue-50 p-6 rounded-2xl shadow-lg border border-slate-200 w-full max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold text-slate-700 mb-6 text-center">
        Agregar Transacción
      </h2>

      <div className="flex flex-col gap-4">
        <div className="flex gap-4 items-center justify-center">
          <label className="flex items-center gap-2 text-black">
            <input
              type="radio"
              name="transactionType"
              value={TransactionTypeEnum.INCOME}
              checked={type === TransactionTypeEnum.INCOME}
              onChange={() => setType(TransactionTypeEnum.INCOME)}
              className="accent-blue-600"
            />
            Ingreso
          </label>

          <label className="flex items-center gap-2 text-black">
            <input
              type="radio"
              name="transactionType"
              value={TransactionTypeEnum.EXPENSE}
              checked={type === TransactionTypeEnum.EXPENSE}
              onChange={() => setType(TransactionTypeEnum.EXPENSE)}
              className="accent-red-500"
            />
            Gasto
          </label>
        </div>

        <input
          type="text"
          value={category}
          placeholder="Categoría"
          className="bg-white text-slate-700 border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 placeholder:text-slate-400 shadow-sm"
          onChange={(e) =>
            setCategory(e.target.value as TransactionCategoryEnum)
          }
        />

        <input
          type="number"
          value={amount}
          placeholder="Monto"
          className="bg-white text-slate-700 border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 placeholder:text-slate-400 shadow-sm"
          onChange={(e) => setAmount(e.target.value)}
        />

        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-200 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Agregar transacción
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;
