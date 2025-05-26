"use client";

import { TransactionType } from "@/interfaces/transacions.interface";
import { db } from "@/libs/firebase";
import { useFinanceStore } from "@/store/FinanceState";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { createContext, useEffect } from "react";
import { FirebaseCollectionEnum } from "../enum/firebase/firebase-collections.enum";
import { useAuth } from "./AuthContext";


const FirestoreContext = createContext<object | undefined>(undefined);

export const FirestoreProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth()
  
  const [loadTransactions] = useFinanceStore((state) => [
    state.loadTransactions
  ]);

  useEffect(() => {
    const transactionsQuery = query(
      collection(db, FirebaseCollectionEnum.TRANSACTIONS),
      where("userId", "==", user?.uid)
    );

    const unsub = onSnapshot(transactionsQuery, (querySnapshot) => {
      const data: TransactionType[] = querySnapshot.docs.map(
        (doc) => doc.data() as TransactionType
      );

      loadTransactions(data);
    });

    return () => unsub()
  }, [loadTransactions, user?.uid]);


  return (
    <FirestoreContext.Provider value={{}}>
      {children}
    </FirestoreContext.Provider>
  );
};

