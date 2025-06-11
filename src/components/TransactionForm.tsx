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
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow h-60">
      <div className="flex flex-col gap-2">
        <select
          value={type}
          onChange={(e) => setType(e.target.value as TransactionTypeEnum)}
          className="border p-2 rounded text-gray-500"
        >
          {Object.values(TransactionTypeEnum).map((value) => (
            <option key={value} value={value}>
              {value === TransactionTypeEnum.INCOME ? "Ingreso" : "Gasto"}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={category}
          placeholder="Categoria"
          className="border p-2 rounded text-gray-500"
          onChange={(e) =>
            setCategory(e.target.value as TransactionCategoryEnum)
          }
        />

        <input
          type="number"
          value={amount}
          placeholder="Monto"
          className="border p-2 rounded text-gray-500"
          onChange={(e) => setAmount(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded"
        >
          Agregar transacción
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;
