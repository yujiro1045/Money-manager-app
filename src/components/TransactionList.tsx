"use client";

import { db } from "@/libs/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";

interface Transaction {
  id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  date: string;
}

const TransactionList = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "transactions"), (snapshop) => {
      const data = snapshop.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Transaction[];
      setTransactions(data);
      setLoading(false);
    });

    return () => unsub();
  });

  if (loading)
    return <p className="text-gray-600">Cargando transacciones...</p>;

  return (
    <div className=" space-y-2 mb-20 mt-24">
      {transactions.map((tx) => (
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
              tx.type === "income" ? "text-green-600" : "text-red-600"
            }`}
          >
            {tx.type === "income" ? "+" : "-"} ${tx.amount}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
