"use client";
import { ReactNode, useEffect } from "react";
import { useCategoriesStore } from "../hooks/useCategoriesStore";
import { db } from "@/libs/firebase";
import { useAuth } from "./AuthContext";
import { collection, onSnapshot, query } from "firebase/firestore";

interface Props {
  children: ReactNode;
}

const AppInitializerContext = ({ children }: Props) => {
  const loadCategories = useCategoriesStore(
    (state) => state.loadCategories as (categories: string[]) => void
  );

  const { user } = useAuth();

  useEffect(
    function suscribeToCategories() {
      if (!user) return;

      const ref = collection(db, "users", user.uid, "categories");
      const unsuscribe = onSnapshot(query(ref), (snapshot) => {
        const loaded: string[] = [];

        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data.name) loaded.push(data.name);
        });

        loadCategories([...new Set(loaded)]);
      });

      return () => {
        unsuscribe();
      };
    },
    [loadCategories, user]
  );

  return children;
};

export default AppInitializerContext;
