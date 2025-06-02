"use client";

import { TransactionTypeEnum } from "@/app/enum/transaction/transaction-type.enum";
import { TransactionType } from "@/interfaces/transacions-interfaces";
import { auth, db } from "@/libs/firebase";
import { useFinanceStore } from "@/store/FinanceState";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import Swal from "sweetalert2";

const TransactionForm = () => {
  const { addExpense, addIncome } = useFinanceStore((state) => ({
    addExpense: state.addExpense,
    addIncome: state.addIncome,
  }));
  const [category, setCategory] = useState("General");
  const [type, setType] = useState<TransactionTypeEnum>(
    TransactionTypeEnum.INCOME
  );
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
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "transactions"), {
        amount: amountNumber,
        category,
        date: new Date().toISOString(),
        type,
        uid: currentUser.uid,
      });

      const transaction: TransactionType = {
        id: docRef.id,
        amount: amountNumber,
        category,
        date: new Date().toISOString(),
        type,
        uid: currentUser.uid,
      };

      if (type === TransactionTypeEnum.INCOME) {
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
