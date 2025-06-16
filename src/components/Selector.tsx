import { useFinanceStore } from "@/store/FinanceState";
import React from "react";

const Selector = () => {
  const { selectedMonth, selectedYear, setSelectedMonth, setSelectedYear } =
    useFinanceStore();
  return (
    <div className="flex gap-4 items-center">
      <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(Number(e.target.value))}
        className="border border-gray-300 rounded-md px-3 py-2 text-black"
      >
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i} value={i}>
            {new Date(0, i).toLocaleString("es-ES", { month: "long" })}
          </option>
        ))}
      </select>

      <select
        value={selectedYear}
        onChange={(e) => setSelectedYear(Number(e.target.value))}
        className="border border-gray-300 rounded-md px-3 py-2 text-black"
      >
        {[2023, 2024, 2025].map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Selector;
