"use client";

import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import Link from "next/link";
import { useAuth } from "./hooks/useAuth";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/libs/auth";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) return <p className="p-6">Cargando...</p>;

  if (!user) {
    router.push("/login");
    return null;
  }
  return (
    <div className="mt-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard de finanzas</h1>
        <button
          onClick={() => {
            logoutUser();
            router.push("/login");
          }}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Cerrar sesión
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center gap-10 p-8 min-h-screen">
        <TransactionForm />
        <TransactionList />
      </div>

      <div className="text-center mt-8">
        <Link href="/sumary" className="text-blue-600 underline">
          Ver resumen financiero
        </Link>
      </div>
    </div>
  );
}
