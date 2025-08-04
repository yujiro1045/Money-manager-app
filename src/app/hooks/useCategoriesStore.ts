import { auth, db } from "@/libs/firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  Timestamp,
} from "firebase/firestore";
import { create } from "zustand";

interface CategoriesState {
  categories: string[];
}

interface CategoriesActions {
  addCategory: (name: string) => void;
  saveCategories: (name: string) => Promise<void>;
  loadCategories: (categories: string[]) => void;
}

export const useCategoriesStore = create<CategoriesState & CategoriesActions>(
  (set, get) => ({
    categories: [],
    addCategory: (name) =>
      set((state) => ({
        categories: [...state.categories, name],
      })),

    saveCategories: async (name: string) => {
      const user = auth.currentUser;
      if (!user) return;

      const trimmed = name.trim();
      if (!trimmed) return;

      await addDoc(collection(db, "users", user.uid, "categories"), {
        name: trimmed,
        createdAt: Timestamp.now(),
      });

      get().addCategory(trimmed);
    },

    loadCategories: (categories: string[]) => {
      set({ categories });
    },
  })
);
