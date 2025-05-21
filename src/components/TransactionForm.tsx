"use client";

import { db } from "@/libs/firebase";
import { useFinanceStore } from "@/store/FinanceState";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const TransactionForm = () => {
  const addTransaction = useFinanceStore((state) => state.addTransaction);
  const [category, setCategory] = useState("General");
  const [type, setType] = useState<"income" | "expense">("income");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const transaction = {
      id: uuidv4(),
      type,
      amount: parseFloat(amount),
      category,
      date: new Date().toISOString(),
    };

    try {
      await addDoc(collection(db, "transactions"), transaction); // se guarda en Firestore
      addTransaction(transaction); // se guarda en Zustand para actualizar la UI
      setAmount("");
    } catch (err) {
      console.error("Error al guardar transacción:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <div className="flex flex-col gap-2">
        <select
          value={type}
          onChange={(e) => setType(e.target.value as "income" | "expense")}
          className="border p-2 rounded text-gray-500"
        >
          <option value="income">Ingreso</option>
          <option value="expense">Gasto</option>
        </select>
        <input
          type="text"
          value={category}
          placeholder="Categoria"
          className="border p-2 rounded text-gray-500"
          onChange={(e) => setCategory(e.target.value)}
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
