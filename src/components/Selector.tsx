import React from "react";
import dayjs from "@/libs/dayjs";
import { useFinanceStore } from "@/store/FinanceState";
import CustomSelect from "./ui/CustomSelect";

const Selector = () => {
  const { selectedMonth, selectedYear, setSelectedMonth, setSelectedYear } =
    useFinanceStore();

  return (
    <div className="flex gap-4 items-center">
      <CustomSelect
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(Number(e.target.value))}
        size="medium"
      >
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i} value={i}>
            {dayjs().month(i).locale("es").format("MMMM")}
          </option>
        ))}
      </CustomSelect>

      <CustomSelect
        value={selectedYear}
        onChange={(e) => setSelectedYear(Number(e.target.value))}
        size="medium"
      >
        {[2023, 2024, 2025].map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </CustomSelect>
    </div>
  );
};

export default Selector;
