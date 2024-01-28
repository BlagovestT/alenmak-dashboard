import { Query } from "../apiTypes";
import { Month } from "./apiTransactionsSnippets";

export const getQueryAllTransactions: Query = {
  endpoint: `/transactions/all`,
  method: "GET",
};

export const getQuerySingleTransaction = (transactionId: string): Query => ({
  endpoint: `/transactions/${transactionId}`,
  method: "GET",
});

export const getQueryMonthlyIncome = (month: Month, year: string): Query => ({
  endpoint: `/transactions/income/month/${month}/${year}`,
  method: "GET",
});

export const getQueryMonthlyExpenses = (month: Month, year: string): Query => ({
  endpoint: `/transactions/expenses/month/${month}/${year}`,
  method: "GET",
});

export const getQueryYearlyIncome = (year: string): Query => ({
  endpoint: `/transactions/income/year/${year}`,
  method: "GET",
});

export const getQueryYearlyExpenses = (year: string): Query => ({
  endpoint: `/transactions/expenses/year/${year}`,
  method: "GET",
});
