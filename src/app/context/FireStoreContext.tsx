"use client";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/libs/firebase";
import { FirebaseCollectionEnum } from "../enum/firebase/firebase-collections.enum";
import { TransactionType } from "@/interfaces/transacions-interfaces";
import { useAuth } from "../hooks/useAuth";
import { useFinanceStore } from "@/store/FinanceState";
import React, {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
} from "react";

const FirestoreContext = createContext<object | undefined>(undefined);

const FirestoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAuth();

  const rawLoadTransactions = useFinanceStore(
    (state) => state.loadTransactions
  );
  const loadTransactions = useCallback(rawLoadTransactions, [
    rawLoadTransactions,
  ]);

  useEffect(() => {
    if (!user?.uid) return;

    const subscribeToTransactionsData = () => {
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
      return () => unsub();
    };

    const unsubscribe = subscribeToTransactionsData();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [loadTransactions, user?.uid]);

  return (
    <FirestoreContext.Provider value={{}}>{children}</FirestoreContext.Provider>
  );
};

export default FirestoreProvider;
