"use client";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/libs/firebase";
import { FirebaseColeectionEnum } from "../enum/firebase/firebase-collections.enum";
import { TransactionType } from "@/interfaces/transacions-interfaces";
import { useAuth } from "../hooks/useAuth";
import { useFinanceStore } from "@/store/FinanceState";
import React, { createContext, useEffect } from "react";

const FirestoreContext = createContext<object | undefined>(undefined);

const FirestoreProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  const [loadTransactions] = useFinanceStore((state) => [
    state.loadTransactions,
  ]);

  useEffect(() => {
    const transactionsQuery = query(
      collection(db, FirebaseColeectionEnum.TRANSACTIONS),
      where("userId", "==", user?.uid)
    );

    const unsub = onSnapshot(transactionsQuery, (querySnapshot) => {
      const data: TransactionType[] = querySnapshot.docs.map(
        (doc) => doc.data() as TransactionType
      );

      loadTransactions(data);
    });

    return () => unsub();
  }, [loadTransactions, user?.uid]);

  return (
    <FirestoreContext.Provider value={{}}>{children}</FirestoreContext.Provider>
  );
};

export default FirestoreProvider;
