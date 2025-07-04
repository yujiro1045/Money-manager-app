import React from "react";
import dayjs from "dayjs";
import "dayjs/locale/es";

import { useFinanceStore } from "@/store/FinanceState";

dayjs.locale("es");

const Selector = () => {
  const { selectedMonth, selectedYear, setSelectedMonth, setSelectedYear } =
    useFinanceStore();
  return (
    <div className="flex gap-4 items-center">
      <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(Number(e.target.value))}
        className="border border-gray-300 rounded-md px-3 py-2  text-black appearance-none bg-[url('/path-to-arrow.svg')] bg-no-repeat bg-[right_0.75rem_center]"
      >
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i} value={i}>
            {dayjs().month(i).locale("es").format("MMMM")}
          </option>
        ))}
      </select>

      <select
        value={selectedYear}
        onChange={(e) => setSelectedYear(Number(e.target.value))}
        className="border border-gray-300 rounded-md px-3 py-2 text-black appearance-none bg-[url('/path-to-arrow.svg')] bg-no-repeat bg-[right_0.75rem_center]"
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
