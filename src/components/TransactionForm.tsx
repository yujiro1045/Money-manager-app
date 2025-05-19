import { useFinanceStore } from "@/store/FinanceState";
import React, { useState } from "react";

const TransactionForm = () => {
  const addTransaction = useFinanceStore((state) => state.addTransaction);
  const [category, setCategory] = useState("General");
  const [type, setType] = useState<"income" | "expense">("income");
  const [amount, setAmount] = useState("");

  return (
    <form className="bg-white p-4 rounded shadow">
      <div className="flex flex-col gap-2">
        <select className="border p-2 rounded">
          <option value="income">Ingreso</option>
          <option value="expense">Gasto</option>
        </select>
        <input type="text" value={category} />
      </div>
    </form>
  );
};

export default TransactionForm;
