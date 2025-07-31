"use client";
import { ReactNode, useEffect, useState } from "react";
import { useCategoriesStore } from "../hooks/useCategoriesStore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/libs/firebase";

interface Props {
  children: ReactNode;
}

const AppInitializerContext = ({ children }: Props) => {
  const loadCategoriesFromFirebase = useCategoriesStore(
    (state) => state.loadCategories
  );
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && !hasInitialized) {
        loadCategoriesFromFirebase();
        setHasInitialized(true);
      }
    });

    return () => unsubscribe();
  }, [loadCategoriesFromFirebase, hasInitialized]);

  return <>{children}</>;
};

export default AppInitializerContext;
