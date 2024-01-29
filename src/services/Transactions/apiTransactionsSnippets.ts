export type Transaction = {
  _id: string;
  title: string;
  amount: number;
  type: "income" | "expense";
  category: "electricity" | "water" | "internet" | "other";
  month:
    | "january"
    | "february"
    | "march"
    | "april"
    | "may"
    | "june"
    | "july"
    | "august"
    | "september"
    | "october"
    | "november"
    | "december";
  year: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TotalMonthYear = {
  totalIncome: number;
  totalExpenses: number;
  totalYearIncome: number;
  totalYearExpenses: number;
};

export type TotalChartMonthYear = {
  month: Month;
  totalIncome: number;
  totalExpenses: number;
};

export type Month =
  | "january"
  | "february"
  | "march"
  | "april"
  | "may"
  | "june"
  | "july"
  | "august"
  | "september"
  | "october"
  | "november"
  | "december";

export type GetQueryAllTransactionsSnippet = {
  success: boolean;
  data: Transaction[];
};

export type GetQueryMonthlyIncomeSnippet = {
  success: boolean;
  data: any;
};

export type GetQueryMonthlyExpensesSnippet = {
  success: boolean;
  data: any;
};

export type GetQueryYearlyIncomeSnippet = {
  success: boolean;
  data: any;
};

export type GetQueryYearlyExpensesSnippet = {
  success: boolean;
  data: any;
};

export type PostQueryDeleteTransactionSnippet = {
  success: boolean;
  message: string;
};

export type PostQueryCreateTransactionSnippet = {
  success: boolean;
  data: Transaction;
};

export type PostQueryUpdateTransactionSnippet = {
  success: boolean;
  data: Transaction;
};

export type GetQueryTotalIncomeAndExpensesForMonthAndYearSnippter = {
  success: boolean;
  data: TotalMonthYear;
};

export type GetQueryTotalIncomeAndExpensesForYearSnippet =
  TotalChartMonthYear[];
