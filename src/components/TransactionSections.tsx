import React from "react";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";

const TransactionSections = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-700 mb-4">
            Nueva Transacción
          </h2>
          <div className="h-[400px] overflow-auto">
            <TransactionForm />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-700 mb-4">
            Transacciones Recientes
          </h2>
          <div className="h-[400px] overflow-auto">
            <TransactionList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionSections;
