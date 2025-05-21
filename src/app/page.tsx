'use client";';

import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl font-bold mb-4">Dashboard de finanzas</h1>
      <TransactionForm />
      <TransactionList />
    </div>
  );
}
