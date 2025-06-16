import { useFinanceStore } from "@/store/FinanceState";
import React from "react";

const MonthlySummary = () => {
  const { selectedMonth, selectedYear, getMonthlySummary } = useFinanceStore();
  const summary = getMonthlySummary(selectedMonth, selectedYear);
  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
      <SummaryCard
        label="Ingresos"
        value={summary.incomeTotal}
        color="emerald"
      />
      <SummaryCard label="Gastos" value={summary.expenseTotal} color="rose" />
      <SummaryCard label="Balance" value={summary.balance} color="blue" />
    </div>
  );
};

const SummaryCard = ({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: "emerald" | "rose" | "blue";
}) => {
  const valueColor =
    color === "blue"
      ? value >= 0
        ? "text-blue-600"
        : "text-rose-600"
      : `text-${color}-600`;

  return (
    <div className={`p-4 rounded-lg bg-${color}-50 border border-${color}-200`}>
      <p className="text-slate-700 font-bold mb-2">{label}</p>
      <p className={`text-2xl font-bold ${valueColor}`}>
        ${value.toLocaleString("de-DE")}
      </p>
    </div>
  );
};

export default MonthlySummary;
