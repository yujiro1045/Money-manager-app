import { useState } from "react";
import Swal from "sweetalert2";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "@/libs/firebase";
import { useFinanceStore } from "@/store/FinanceState";
import {
  TransactionCategoryEnum,
  TransactionTypeEnum,
} from "@/app/enum/transaction/transaction-type.enum";
import { TransactionType } from "@/interfaces/transacions-interfaces";

const DEFAULT_CATEGORY = TransactionCategoryEnum.CATEGORY;
const DEFAULT_TYPE = TransactionTypeEnum.INCOME;

export const useTransactionForm = () => {
  const { addExpense, addIncome } = useFinanceStore();
  const [category, setCategory] = useState(DEFAULT_CATEGORY);
  const [type, setType] = useState<TransactionTypeEnum>(DEFAULT_TYPE);
  const [amount, setAmount] = useState("");

  const resetForm = () => {
    setCategory(DEFAULT_CATEGORY);
    setType(DEFAULT_TYPE);
    setAmount("");
  };

  const validateForm = () => {
    const amountNumber = parseFloat(amount);
    if (isNaN(amountNumber) || amountNumber <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Monto inválido",
        text: "Por favor ingrese un monto válido mayor a 0.",
      });
      return null;
    }

    return amountNumber;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const amountNumber = validateForm();
    if (!amountNumber) return;

    const currentUser = auth.currentUser;
    if (!currentUser) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Debes iniciar sesión para agregar una transacción.",
      });
      return;
    }

    const transaction: Omit<TransactionType, "id"> = {
      amount: amountNumber,
      category,
      date: new Date().toISOString(),
      type,
      uid: currentUser.uid,
    };

    try {
      const docRef = await addDoc(collection(db, "transactions"), transaction);

      const newTransaction: TransactionType = {
        ...transaction,
        id: docRef.id,
      };

      if (type === TransactionTypeEnum.INCOME) {
        addIncome(newTransaction);
      } else {
        addExpense(newTransaction);
      }

      Swal.fire({
        icon: "success",
        title: "Transacción guardada",
        text: "Tu transacción ha sido guardada exitosamente.",
        timer: 2000,
        showConfirmButton: false,
      });

      resetForm();
    } catch (error) {
      console.error("Error al guardar transacción:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al guardar la transacción.",
      });
    }
  };

  return {
    category,
    setCategory,
    type,
    setType,
    amount,
    setAmount,
    handleSubmit,
  };
};
