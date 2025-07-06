import { auth, db } from "@/libs/firebase";
import {
  addDoc,
  collection,
  getDocs,
  query,
  Timestamp,
} from "firebase/firestore";
import { create } from "zustand";

interface CategoriesState {
  categories: string[];
  addCategory: (name: string) => void;
  saveCategories: (name: string) => void;
  loadCategories: () => Promise<void>;
}

export const useCategoriesStore = create<CategoriesState>((set, get) => ({
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

  loadCategories: async () => {
    const user = auth.currentUser;
    if (!user) return;

    const ref = collection(db, "users", user.uid, "categories");
    const snapshot = await getDocs(query(ref));

    const loaded: string[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.name) loaded.push(data.name);
    });

    set({ categories: [...new Set(loaded)] });
  },
}));
