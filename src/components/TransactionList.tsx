"use client";

import { auth, db } from "@/libs/firebase";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface Transaction {
  id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  date: string;
  uid?: string;
}

const TransactionList = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const handleDeleteTransaction = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "¿Estas seguro?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        console.log("Eliminando transacción con ID:", id);
        await deleteDoc(doc(db, "transactions", id));
        Swal.fire("Eliminado", "La transacción ha sido eliminada", "success");
      }
    } catch (error) {
      console.error("Error al eliminar transacción:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo eliminar la transacción. Inténtalo de nuevo más tarde.",
      });
    }
  };

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (!user) {
        console.warn("No hay usuario autenticado");
        setTransactions([]);
        setLoading(false);
        return;
      }

      const q = query(
        collection(db, "transactions"),
        where("uid", "==", user.uid)
      );

      const unsubscribeSnapshot = onSnapshot(
        q,
        (snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Transaction[];
          setTransactions(data);
          setLoading(false);
        },
        (error) => {
          console.error("Error obteniendo transacciones:", error);
          setLoading(false);
        }
      );

      return () => unsubscribeSnapshot();
    });

    return () => unsubscribeAuth();
  }, []);

  if (loading) {
    return <p className="text-gray-600">Cargando transacciones...</p>;
  }

  if (!loading && transactions.length === 0) {
    <p className="text-grat-600 mt-24 text-center">
      No hay transacciones aún. Añade una transacción para comenzar.
    </p>;
  }

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
            {tx.type === "income" ? "+" : "-"} $
            {tx.amount.toLocaleString("de-DE")}
          </p>
          <button
            className="text-red-500 hover:text-red-700 border-amber-100 border rounded px-2 py-1 mx-2"
            onClick={() => handleDeleteTransaction(tx.id)}
          >
            Borrar transacción
          </button>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
