"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useFinanceStore } from "@/store/FinanceState";

const SumaryPage = () => {
  const [balance, expenseTotal, incomeTotal, loading] = useFinanceStore(
    (state) => [
      state.balance,
      state.expenseTotal,
      state.incomeTotal,
      state.loading,
    ]
  );

  if (loading) return <p className="text-gray-600">Cargando resumen...</p>;
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Resumen Financiero</h1>
      <div className="space-y-2 ">
        <div className="flex items-center gap-2">
          <Image
            src="/icons/income2.svg"
            alt="Ingresos"
            width={24}
            height={24}
          />
          <p className="text-green-600 font-medium">
            Total ingresos: ${incomeTotal.toLocaleString("de-DE")}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Image
            src="/icons/expense.svg"
            alt="Ingresos"
            width={24}
            height={24}
          />
          <p className="text-red-600 font-medium">
            Total gastos: ${expenseTotal.toLocaleString("de-DE")}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Image
            src="/icons/balance.svg"
            alt="Ingresos"
            width={24}
            height={24}
          />

          <p className="text-blue-600 font-bold text-xl">
            Balance: ${balance.toLocaleString("de-DE")}
          </p>
        </div>
      </div>

      <Link className="text-blue-600 underline text-center" href="/">
        Volver al inicio
      </Link>
    </div>
  );
};

export default SumaryPage;
