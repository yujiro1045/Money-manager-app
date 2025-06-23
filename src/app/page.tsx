"use client";

import Link from "next/link";
import { useAuth } from "./hooks/useAuth";
import { useRouter } from "next/navigation";
import { RoutesEnum } from "./enum/routes.enum";
import { useEffect } from "react";
import Header from "@/components/Header";
import Selector from "@/components/Selector";
import MonthlySummary from "@/components/MonthlySummary";
import TransactionSections from "@/components/TransactionSections";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push(RoutesEnum.LOGIN);
    }
  }, [loading, user, router]);

  if (loading) return <p className="p-6">Cargando...</p>;

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 pt-10 pb-20 space-y-10">
        <Header />
        <Selector />
        <MonthlySummary />
        <TransactionSections />

        <div className="text-center">
          <Link
            href={RoutesEnum.SUMMARY}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 font-medium"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            Ver resumen financiero
          </Link>
        </div>
      </div>
    </div>
  );
}
