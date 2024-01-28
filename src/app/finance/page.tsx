"use client";
import { useEffect, useState } from "react";
import {
  Container,
  Stack,
  Typography,
  Paper,
  Skeleton,
  Tooltip,
  IconButton,
  Breadcrumbs,
} from "@mui/material";
import PageHeader from "@/components/SmallComponents/PageHeader/PageHeader";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import Button from "@/components/MUIComponents/Button";
import FinanceWidget from "@/components/PageComponents/Finance/FinanceWidget";
import BarChart from "@/components/SmallComponents/BarChart/BarChart";
import Modal from "@/components/MUIComponents/Modal";
import FinanceModalContent from "@/components/PageComponents/Finance/FinanceModalContent";
import { callApi } from "@/services/callApi";
import {
  getQueryAllTransactions,
  getQueryMonthlyExpenses,
  getQueryMonthlyIncome,
  getQueryYearlyExpenses,
  getQueryYearlyIncome,
} from "@/services/Transactions/apiTransactionsGetQueries";
import {
  GetQueryAllTransactionsSnippet,
  GetQueryMonthlyExpensesSnippet,
  GetQueryMonthlyIncomeSnippet,
  GetQueryYearlyExpensesSnippet,
  GetQueryYearlyIncomeSnippet,
  Month,
  PostQueryDeleteTransactionSnippet,
  Transaction,
} from "@/services/Transactions/apiTransactionsSnippets";
import Table from "@/components/MUIComponents/Table";
import { GridColDef } from "@mui/x-data-grid";
import { formatDate } from "@/helpers/helpers";
import Dialog from "@/components/MUIComponents/Dialog";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { postQueryDeleteTransaction } from "@/services/Transactions/apiTransactionsPostQueries";

export type ModalType = "create" | "edit";

export interface FinanceDateType {
  month: string;
  earnings: number;
  expenses: number;
}

const FINANCE_DATA: FinanceDateType[] = [
  { month: "Януари", earnings: 2000, expenses: 1500 },
  { month: "Февруари", earnings: 1800, expenses: 1200 },
  { month: "Март", earnings: 2200, expenses: 1600 },
  { month: "Април", earnings: 2500, expenses: 1800 },
  { month: "Май", earnings: 2300, expenses: 1400 },
  { month: "Юни", earnings: 2000, expenses: 1300 },
  { month: "Юли", earnings: 2100, expenses: 1500 },
  { month: "Август", earnings: 2400, expenses: 1700 },
  { month: "Септември", earnings: 2600, expenses: 1900 },
  { month: "Октомври", earnings: 2800, expenses: 2000 },
  { month: "Ноември", earnings: 3000, expenses: 2200 },
  { month: "Декември", earnings: 3200, expenses: 2400 },
];

const Finance = () => {
  const [transactionsData, setTransactionsData] = useState<Transaction[]>([]);
  const [monthlyIncome, setMonthlyIncome] = useState<number>();
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>();
  const [yearlyIncome, setYearlyIncome] = useState<number>();
  const [yearlyExpenses, setYearlyExpenses] = useState<number>();
  const [openModal, setModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalType>("create");
  const [modalData, setModalData] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [view, setView] = useState<"chart" | "table">("chart");

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Заглавие",
      width: 200,
    },
    {
      field: "amount",
      headerName: "Сума",
      width: 70,
    },
    {
      field: "type",
      headerName: "Тип",
      width: 100,
      renderCell: (params) => {
        return (
          <Typography
            component="p"
            variant="body2"
            color={params.value === "income" ? "green" : "error"}
          >
            {params.value === "income" && "Приход"}
            {params.value === "expense" && "Разход"}
          </Typography>
        );
      },
    },
    {
      field: "category",
      headerName: "Категория",
      width: 100,
      renderCell: (params) => {
        return (
          <Typography component="p" variant="body2">
            {params.value === "water" && "Вода"}
            {params.value === "electricity" && "Ток"}
            {params.value === "internet" && "Интернет"}
            {params.value === "other" && "Друго"}
          </Typography>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Дата",
      width: 180,
      valueGetter: (params) => {
        if (!params.value) {
          return params.value;
        }
        return formatDate(params.value);
      },
    },
    {
      field: "actions",
      headerName: "Действия",
      width: 300,
      renderCell: (params) => {
        return (
          <>
            {/* Edit */}
            <Tooltip title="Промени">
              <IconButton
                onClick={() => {
                  setModalData({
                    _id: params.row._id,
                    title: params.row.title,
                    amount: params.row.amount,
                    type: params.row.type,
                    category: params.row.category,
                    month: params.row.month,
                    year: params.row.year,
                    createdAt: params.row.createdAt,
                    updatedAt: params.row.updatedAt,
                  });
                  setModalType("edit");
                  setModalOpen(true);
                }}
              >
                <EditIcon sx={{ color: "#FFA319" }} />
              </IconButton>
            </Tooltip>

            {/* Delete */}
            <Tooltip title="Изтрий">
              <Dialog
                icon={<DeleteIcon sx={{ color: "#FF1943" }} />}
                buttonText="Изтрий"
                dialogTitle={`Изтриване на транзакция ${params.row.title}`}
                dialogDescription="Сигурни ли сте, че искате да изтриете тази транзакция?"
                onConfirm={() => handleDeleteTransaction(params.row._id)}
              />
            </Tooltip>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    (async () => {
      setLoading(true);

      const transactionsData = await callApi<GetQueryAllTransactionsSnippet>({
        query: getQueryAllTransactions,
      });

      const currentMonth = new Date()
        .toLocaleString("en-US", {
          month: "long",
        })
        .toLowerCase();
      const currentYear = new Date().getFullYear();

      const [monthlyIncome, monthlyExpenses, yearlyIncome, yearlyExpenses] =
        await Promise.all([
          callApi<GetQueryMonthlyIncomeSnippet>({
            query: getQueryMonthlyIncome(
              currentMonth.toString() as Month,
              currentYear.toString()
            ),
          }),
          callApi<GetQueryMonthlyExpensesSnippet>({
            query: getQueryMonthlyExpenses(
              currentMonth.toString() as Month,
              currentYear.toString()
            ),
          }),
          callApi<GetQueryYearlyIncomeSnippet>({
            query: getQueryYearlyIncome(currentYear.toString()),
          }),
          callApi<GetQueryYearlyExpensesSnippet>({
            query: getQueryYearlyExpenses(currentYear.toString()),
          }),
        ]);

      if (transactionsData.success) {
        const sortedTransactionsData = transactionsData.data.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB.getTime() - dateA.getTime();
        });

        setTransactionsData(sortedTransactionsData);
        setLoading(false);
      }

      if (monthlyIncome.success) {
        setMonthlyIncome(monthlyIncome.data);
      }

      if (monthlyExpenses.success) {
        setMonthlyExpenses(monthlyExpenses.data);
      }

      if (yearlyIncome.success) {
        setYearlyIncome(yearlyIncome.data);
      }

      if (yearlyExpenses.success) {
        setYearlyExpenses(yearlyExpenses.data);
      }
    })();
  }, []);

  const handleDeleteTransaction = async (id: string) => {
    setLoading(true);
    try {
      const deletedTransaction =
        await callApi<PostQueryDeleteTransactionSnippet>({
          query: postQueryDeleteTransaction(id),
        });

      if (deletedTransaction.success) {
        setTransactionsData((prev) =>
          prev.filter((transaction) => transaction._id !== id)
        );
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        header="Финансов отчет"
        subheader="Всичко за вашите финанси на едно място"
        icon={<CreditCardIcon sx={{ fontSize: "2.5rem" }} />}
        action={
          <Stack gap={1}>
            {view === "chart" && (
              <Button
                message="Финансов Архив"
                onClick={() => setView("table")}
              />
            )}
            {view === "table" && (
              <>
                <Button
                  message="Финансов Отчет"
                  onClick={() => setView("chart")}
                />
              </>
            )}
          </Stack>
        }
      />

      <Container>
        {view === "table" && (
          <>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Breadcrumbs aria-label="breadcrumb">
                <Typography color="text.primary">Финансов Отчет</Typography>
                <Typography color="text.primary">Архив</Typography>
              </Breadcrumbs>

              <Stack direction="row" gap={1}>
                <Button
                  message="Добави Транзакция"
                  onClick={() => {
                    setModalData(null);
                    setModalType("create");
                    setModalOpen(true);
                  }}
                />
              </Stack>
            </Stack>

            <Table
              rows={transactionsData}
              columns={columns}
              loading={loading}
            />
          </>
        )}

        {view === "chart" && (
          <>
            <Paper sx={{ padding: "20px", marginBottom: "20px" }}>
              <Typography component="h4" variant="h3" mb={2}>
                Отчет на Приходи и Разходи
              </Typography>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                flexWrap="wrap"
              >
                {monthlyIncome ? (
                  <FinanceWidget
                    type="income"
                    title="Месечни Приходи"
                    amount={monthlyIncome}
                    date={
                      new Date()
                        .toLocaleString("bg-BG", {
                          month: "long",
                        })
                        .charAt(0)
                        .toUpperCase() +
                      new Date()
                        .toLocaleString("bg-BG", {
                          month: "long",
                        })
                        .slice(1)
                    }
                  />
                ) : (
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    width={300}
                    height={200}
                  />
                )}

                {monthlyExpenses ? (
                  <FinanceWidget
                    type="expenses"
                    title="Месечни Разходи"
                    amount={monthlyExpenses}
                    date={
                      new Date()
                        .toLocaleString("bg-BG", {
                          month: "long",
                        })
                        .charAt(0)
                        .toUpperCase() +
                      new Date()
                        .toLocaleString("bg-BG", {
                          month: "long",
                        })
                        .slice(1)
                    }
                  />
                ) : (
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    width={300}
                    height={200}
                  />
                )}

                {yearlyIncome ? (
                  <FinanceWidget
                    type="income"
                    title="Годишни Приходи"
                    amount={yearlyIncome}
                    date={new Date().getFullYear().toString()}
                  />
                ) : (
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    width={300}
                    height={200}
                  />
                )}

                {yearlyExpenses ? (
                  <FinanceWidget
                    type="expenses"
                    title="Годишни Разходи"
                    amount={yearlyExpenses}
                    date={new Date().getFullYear().toString()}
                  />
                ) : (
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    width={300}
                    height={200}
                  />
                )}
              </Stack>
            </Paper>

            <Paper sx={{ padding: "20px", marginBottom: "20px" }}>
              <Typography variant="h3" component="h4" mb={2}>
                Годишен Финансов Отчет
              </Typography>
              <BarChart data={FINANCE_DATA} />
            </Paper>
          </>
        )}

        <Modal
          modalTitle={
            modalType === "create" ? "Добави Транзакция" : "Промени Транзакция"
          }
          open={openModal}
          setOpen={setModalOpen}
        >
          <FinanceModalContent
            modalType={modalType}
            modalData={modalData && modalData}
            setTransactionsData={setTransactionsData}
            setModalOpen={setModalOpen}
          />
        </Modal>
      </Container>
    </>
  );
};

export default Finance;
