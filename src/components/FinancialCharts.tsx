"use client";

import { useFinanceStore } from "@/store/FinanceState";
import React, { useState } from "react";
import dayjs from "@/libs/dayjs";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Selector from "./Selector";

const COLORS = ["#10B981", "#EF4444"];

export const FinancialCharts = () => {
  const [activeTab, setActiveTab] = useState<"barras" | "circular">();

  const { selectedMonth, selectedYear, getMonthlyTransactions } =
    useFinanceStore();

  const monthlyTransactions = getMonthlyTransactions(
    selectedMonth,
    selectedYear
  );

  const dataByDay = Array.from({ length: 31 }, (_, day) => {
    const currentDate = dayjs()
      .year(selectedYear)
      .month(selectedMonth)
      .date(day + 1);

    const dailyTransactions = monthlyTransactions.filter((transaction) =>
      dayjs(transaction.date).isSame(currentDate, "day")
    );

    const income = dailyTransactions
      .filter((transaction) => transaction.type === "income")
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    const expense = dailyTransactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    return {
      day: `${day + 1}`,
      Ingresos: income,
      Gastos: expense,
    };
  }).filter((d) => d.Ingresos > 0 || d.Gastos > 0);

  const incomeTotal = monthlyTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenseTotal = monthlyTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const pieData = [
    { name: "Ingresos", value: incomeTotal },
    { name: "Gastos", value: expenseTotal },
  ];

  return (
    <div className="bg-white border border-slate-200 shadow-md rounded-xl p-6 mt-6">
      <h3 className="text-lg font-semibold text-slate-700 mb-4">
        Análisis Financiero - {dayjs().month(selectedMonth).format("MMMM")}{" "}
        {selectedYear}
      </h3>

      <div className="mb-4">
        <Selector />
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab("barras")}
          className={`px-4 py-2 rounded-md ${
            activeTab === "barras"
              ? "bg-blue-500 text-white"
              : "bg-gray-400 text-white"
          }`}
        >
          Gráfico de Barras
        </button>
        <button
          onClick={() => setActiveTab("circular")}
          className={`px-4 py-2 rounded-md ${
            activeTab === "circular"
              ? "bg-blue-500 text-white"
              : "bg-gray-400 text-white"
          }`}
        >
          Gráfico Circular
        </button>
      </div>

      <div style={{ height: 300 }}>
        {dataByDay.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            No hay datos para este mes
          </div>
        ) : activeTab === "barras" ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dataByDay}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Ingresos" fill="#10B981" />
              <Bar dataKey="Gastos" fill="#EF4444" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};
