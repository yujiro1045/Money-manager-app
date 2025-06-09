"use client";

import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import Link from "next/link";
import { useAuth } from "./hooks/useAuth";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/libs/auth";
import { RoutesEnum } from "./enum/routes.enum";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) return <p className="p-6">Cargando...</p>;

  if (!user) {
    router.push(RoutesEnum.LOGIN);
    return null;
  }
  return (
    <div className="mt-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard de finanzas</h1>
        <button
          onClick={() => {
            logoutUser();
            router.push(RoutesEnum.LOGIN);
          }}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Cerrar sesión
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center gap-10 p-8 min-h-screen">
        <TransactionForm />
        <TransactionList />
        <div className="text-center">
          <Link href={RoutesEnum.SUMARY} className="text-blue-600 underline">
            Ver resumen financiero
          </Link>
        </div>
      </div>
    </div>
  );
}
