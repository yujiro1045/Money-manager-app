"use client";

import { FirebaseCollectionEnum } from "@/app/enum/firebase/firebase-collections.enum";
import { TransactionTypeEnum } from "@/app/enum/transaction/transaction-type.enum";
import { TransactionType } from "@/interfaces/transacions-interfaces";
import { auth, db } from "@/libs/firebase";
import { useFinanceStore } from "@/store/FinanceState";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect } from "react";
import Swal from "sweetalert2";

const TransactionList = () => {
  const { incomes, expenses, loadTransactions, loading } = useFinanceStore();

  const allTransactions: TransactionType[] = [...incomes, ...expenses].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handleDeleteTransaction = async (tx: TransactionType) => {
    try {
      const result = await Swal.fire({
        cancelButtonColor: "#3085d6",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        icon: "warning",
        showCancelButton: true,
        text: "Esta acción no se puede deshacer",
        title: "¿Estas seguro?",
      });

      if (result.isConfirmed) {
        console.log("Eliminando transacción con ID:", tx.id);
        await deleteDoc(doc(db, FirebaseCollectionEnum.TRANSACTIONS, tx.id));
        if (tx.type === TransactionTypeEnum.INCOME) {
          useFinanceStore.getState().deleteIncome(tx.id);
        } else {
          useFinanceStore.getState().deleteExpense(tx.id);
        }
        Swal.fire("Eliminado", "La transacción ha sido eliminada", "success");
      }
    } catch (error) {
      console.error("Error al eliminar transacción:", error);
      Swal.fire({
        icon: "error",
        text: "No se pudo eliminar la transacción. Inténtalo de nuevo más tarde.",
        title: "Error",
      });
    }
  };

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (!user) {
        loadTransactions([]);
        return;
      }

      const q = query(
        collection(db, FirebaseCollectionEnum.TRANSACTIONS),
        where("uid", "==", user.uid)
      );

      const unsubscribeSnapshot = onSnapshot(
        q,
        (snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as TransactionType[];

          loadTransactions(data);
        },
        (error) => {
          console.error("Error obteniendo transacciones:", error);
        }
      );

      return () => unsubscribeSnapshot();
    });

    return () => unsubscribeAuth();
  }, [loadTransactions]);

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
