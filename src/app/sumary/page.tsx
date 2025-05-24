"use client";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/libs/firebase";
import Link from "next/link";
import Image from "next/image";

type Transaction = {
  id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  date: string;
};

const SumaryPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const snapshot = await getDocs(collection(db, "transactions"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Transaction[];
        setTransactions(data);
        setLoading(false);
      } catch (err) {
        console.error("Error cargando transacciones:", err);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const totalIncome = transactions
    .filter((tx) => tx.type === "income")
    .reduce((acc, tx) => acc + tx.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, tx) => acc + tx.amount, 0);

  const balance = totalIncome - totalExpense;

  if (loading) return <p className="text-gray-600">Cargando resumen...</p>;
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Resumen Financiero</h1>
      <div className="space-y-2 ">
        <div className="flex items-center gap-2">
          <Image
            src="/icons/income2.svg"
            alt="Ingresos"
            width={24}
            height={24}
          />
          <p className="text-green-600 font-medium">
            Total ingresos: ${totalIncome}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Image
            src="/icons/expense.svg"
            alt="Ingresos"
            width={24}
            height={24}
          />
          <p className="text-red-600 font-medium">
            Total gastos: ${totalExpense}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Image
            src="/icons/balance.svg"
            alt="Ingresos"
            width={24}
            height={24}
          />

          <p className="text-blue-600 font-bold text-xl">Balance: ${balance}</p>
        </div>
      </div>

      <Link className="text-blue-600 underline text-center" href="/">
        Volver al inicio
      </Link>
    </div>
  );
};

export default SumaryPage;
