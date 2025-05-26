"use client";

import { TransactionTypeEnum } from "@/app/enum/transaction/transaction-type.enum";
import { TransactionType } from "@/interfaces/transacions.interface";
import { auth, db } from "@/libs/firebase";
import { useFinanceStore } from "@/store/FinanceState";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";

const TransactionForm = () => {
  const [addExpense, addIncome] = useFinanceStore((state) => [state.addExpense, state.addIncome]);
  const [category, setCategory] = useState("General");
  const [type, setType] = useState<TransactionTypeEnum>(TransactionTypeEnum.INCOME);
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    
    e.preventDefault();

    const amountNumber = parseFloat(amount);
    if (isNaN(amountNumber) || amountNumber <= 0) {
      alert("Por favor ingrese un monto válido.");
      return;
    }

    const currentUser = auth.currentUser;
    if (!currentUser) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Debes iniciar sesión para agregar una transacción.",
      });

      return
    }

    const transaction: TransactionType = {
      id: uuidv4(),
      uid: currentUser?.uid,
      type,
      amount: parseFloat(amount),
      category,
      date: new Date().toISOString(),
    };

    try {
      await addDoc(collection(db, "transactions"), transaction);
      if(type === TransactionTypeEnum.INCOME) {
        addIncome(transaction);
      } else {
        addExpense(transaction);
      }

      setAmount("");
      setCategory("General");
      setType(TransactionTypeEnum.INCOME);
    } catch (err) {
      console.error("Error al guardar transacción:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow h-60">
      <div className="flex flex-col gap-2">
        <select
          value={type}
          onChange={(e) => setType(e.target.value as TransactionTypeEnum)}
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
