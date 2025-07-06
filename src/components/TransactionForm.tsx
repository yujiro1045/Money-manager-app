import {
  TransactionCategoryEnum,
  TransactionTypeEnum,
} from "@/app/enum/transaction/transaction-type.enum";
import { useTransactionForm } from "@/app/hooks/useTransactionForm";
import React from "react";
import Swal from "sweetalert2";

const TransactionForm = () => {
  const {
    amount,
    category,
    categories,
    handleAddCategory,
    handleSubmit,
    newCategory,
    setAmount,
    setCategory,
    setNewCategory,
    setType,
    type,
  } = useTransactionForm();

  const baseCategories = Object.values(TransactionCategoryEnum);
  const allCategories = [...baseCategories, ...categories];

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-br from-slate-50 to-blue-50 p-6 rounded-2xl shadow-lg border border-slate-200 w-full max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold text-slate-700 mb-6 text-center">
        Agregar Transacción
      </h2>

      <div className="flex flex-col gap-4">
        <select
          value={type}
          onChange={(e) => setType(e.target.value as TransactionTypeEnum)}
          className="bg-white text-slate-700 border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm"
        >
          {Object.values(TransactionTypeEnum).map((value) => (
            <option key={value} value={value}>
              {value === TransactionTypeEnum.INCOME ? "Ingreso" : "Gasto"}
            </option>
          ))}
        </select>

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value as TransactionCategoryEnum)
          }
          className="bg-white text-slate-700 border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm"
        >
          {allCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={newCategory}
            placeholder="Nueva categoría"
            onChange={(e) => setNewCategory(e.target.value)}
            className="flex-1 bg-white text-slate-700 border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm"
          />
          <button
            type="button"
            onClick={() => {
              if (!newCategory.trim()) {
                Swal.fire({
                  icon: "warning",
                  title: "Categoría vacía",
                  text: "Por favor escribe un nombre para la categoría.",
                });
                return;
              }
              handleAddCategory();
            }}
            className="bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 w-full sm:w-auto text-center"
          >
            Crear
          </button>
        </div>

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
