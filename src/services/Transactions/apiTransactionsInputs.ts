import { Month } from "./apiTransactionsSnippets";

export type PostQueryCreateTransactionInput = {
  title: string;
  amount: number;
  type: "income" | "expense";
  category: "electricity" | "water" | "internet" | "other";
  month: Month;
  year: string;
};

export type PostQueryUpdateTransactionInput = {
  title: string;
  amount: number;
  type: "income" | "expense";
  category: "electricity" | "water" | "internet" | "other";
  month: Month;
  year: string;
};
