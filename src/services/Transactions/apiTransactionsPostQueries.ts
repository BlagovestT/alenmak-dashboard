import { Query } from "../apiTypes";
import {
  PostQueryCreateTransactionInput,
  PostQueryUpdateTransactionInput,
} from "./apiTransactionsInputs";

export const postQueryCreateTransaction = (
  input: PostQueryCreateTransactionInput
): Query => ({
  endpoint: "/transactions/create",
  method: "POST",
  variables: input,
});

export const postQueryUpdateTransaction = (
  transactionId: string,
  input: PostQueryUpdateTransactionInput
): Query => ({
  endpoint: `/transactions/${transactionId}`,
  method: "PUT",
  variables: input,
});

export const postQueryDeleteTransaction = (transactionId: string): Query => ({
  endpoint: `/transactions/${transactionId}`,
  method: "DELETE",
});
