import { FirebaseCollectionEnum } from "@/app/enum/firebase/firebase-collections.enum";
import { TransactionTypeEnum } from "@/app/enum/transaction/transaction-type.enum";
import { useAuth } from "@/app/hooks/useAuth";
import { TransactionType } from "@/interfaces/transacions-interfaces";
import { db } from "@/libs/firebase";
import { useFinanceStore } from "@/store/FinanceState";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect } from "react";
import Swal from "sweetalert2";

export const useTransactions = () => {
  const { user, loading: authLoading } = useAuth();
  const {
    loadTransactions,
    deleteExpense,
    deleteIncome,
    loading,
    selectedMonth,
    selectedYear,
    getMonthlyTransactions,
  } = useFinanceStore();

  const allTransactions = getMonthlyTransactions(
    selectedMonth,
    selectedYear
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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
        title: "¿Estás seguro?",
      });

      if (result.isConfirmed) {
        await deleteDoc(doc(db, FirebaseCollectionEnum.TRANSACTIONS, tx.id));
        if (tx.type === TransactionTypeEnum.INCOME) {
          deleteIncome(tx.id);
        } else {
          deleteExpense(tx.id);
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
    if (authLoading) return;

    if (!user) {
      loadTransactions([]);
      return;
    }

    const q = query(
      collection(db, FirebaseCollectionEnum.TRANSACTIONS),
      where("uid", "==", user.uid)
    );

    const unsubscribe = onSnapshot(
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
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudieron cargar las transacciones.",
        });
      }
    );

    return () => unsubscribe();
  }, [user, authLoading, loadTransactions]);

  return {
    loading,
    allTransactions,
    handleDeleteTransaction,
  };
};
