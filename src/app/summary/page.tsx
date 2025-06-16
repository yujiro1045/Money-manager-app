"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useFinanceStore } from "@/store/FinanceState";

const SummaryPage = () => {
  const balance = useFinanceStore((state) => state.balance);
  const expenseTotal = useFinanceStore((state) => state.expenseTotal);
  const incomeTotal = useFinanceStore((state) => state.incomeTotal);
  const loading = useFinanceStore((state) => state.loading);

  if (loading) return <p className="text-gray-600">Cargando resumen...</p>;
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-slate-800">
            Resumen Financiero
          </h1>
          <p className="text-slate-600">Análisis completo de tus finanzas</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 space-y-6">
          <div className="flex items-center justify-between p-6 rounded-xl bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-500 rounded-full shadow-md">
                <Image
                  src="/icons/income2.svg"
                  alt="Ingresos"
                  width={24}
                  height={24}
                  className="filter brightness-0 invert"
                />
              </div>
              <div>
                <p className="text-slate-600 text-sm font-medium">
                  Total Ingresos
                </p>
                <p className="text-emerald-600 text-2xl font-bold">
                  ${incomeTotal.toLocaleString("de-DE")}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500 text-white text-sm font-medium">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Ingresos
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-6 rounded-xl bg-gradient-to-r from-rose-50 to-rose-100 border border-rose-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-rose-500 rounded-full shadow-md">
                <Image
                  src="/icons/expense.svg"
                  alt="Gastos"
                  width={24}
                  height={24}
                  className="filter brightness-0 invert"
                />
              </div>
              <div>
                <p className="text-slate-600 text-sm font-medium">
                  Total Gastos
                </p>
                <p className="text-rose-600 text-2xl font-bold">
                  ${expenseTotal.toLocaleString("de-DE")}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-rose-500 text-white text-sm font-medium">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Gastos
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-6">
            <div
              className={`flex items-center justify-between p-6 rounded-xl border-2 ${
                balance >= 0
                  ? "bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200"
                  : "bg-gradient-to-r from-rose-50 to-rose-100 border-rose-200"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-full shadow-md ${
                    balance >= 0 ? "bg-blue-500" : "bg-rose-500"
                  }`}
                >
                  <Image
                    src="/icons/balance.svg"
                    alt="Balance"
                    width={28}
                    height={28}
                    className="filter brightness-0 invert"
                  />
                </div>
                <div>
                  <p className="text-slate-600 text-sm font-medium">
                    Balance Total
                  </p>
                  <p
                    className={`text-3xl font-bold ${
                      balance >= 0 ? "text-blue-600" : "text-rose-600"
                    }`}
                  >
                    ${balance.toLocaleString("de-DE")}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div
                  className={`inline-flex items-center px-4 py-2 rounded-full text-white text-sm font-medium ${
                    balance >= 0 ? "bg-blue-500" : "bg-rose-500"
                  }`}
                >
                  {balance >= 0 ? (
                    <>
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Positivo
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Negativo
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-700 mb-4">
              Análisis Rápido
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-600">Ratio Gastos/Ingresos:</span>
                <span className="font-medium text-slate-800">
                  {incomeTotal > 0
                    ? `${((expenseTotal / incomeTotal) * 100).toFixed(1)}%`
                    : "0%"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Estado financiero:</span>
                <span
                  className={`font-medium ${
                    balance >= 0 ? "text-emerald-600" : "text-rose-600"
                  }`}
                >
                  {balance >= 0 ? "Saludable" : "Requiere atención"}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-700 mb-4">
              Recomendación
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {balance >= 0
                ? "¡Excelente! Mantén este ritmo de ahorro y considera invertir tu excedente."
                : "Revisa tus gastos y busca áreas donde puedas reducir costos para mejorar tu balance."}
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 font-medium"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Volver al Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;
