import { TransactionTypeEnum } from "@/app/enum/transaction/transaction-type.enum";

export interface TransactionType {
  id: string;
  uid: string;
  type: TransactionTypeEnum;
  amount: number;
  category: string;
  date: string;
  desription?: string;
}
