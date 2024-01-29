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
  getQueryTotalIncomeAndExpensesForMonthAndYear,
  getQueryTotalIncomeAndExpensesForYear,
} from "@/services/Transactions/apiTransactionsGetQueries";
import {
  GetQueryAllTransactionsSnippet,
  GetQueryTotalIncomeAndExpensesForMonthAndYearSnippter,
  GetQueryTotalIncomeAndExpensesForYearSnippet,
  Month,
  PostQueryDeleteTransactionSnippet,
  TotalChartMonthYear,
  TotalMonthYear,
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

const Finance = () => {
  const [transactionsData, setTransactionsData] = useState<Transaction[]>([]);
  const [totalIncomeAndExpenses, setTotalIncomeAndExpenses] =
    useState<TotalMonthYear>();
  const [chartData, setChartData] = useState<TotalChartMonthYear[]>();
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

      const totalIncomeAndExpenses =
        await callApi<GetQueryTotalIncomeAndExpensesForMonthAndYearSnippter>({
          query: getQueryTotalIncomeAndExpensesForMonthAndYear(
            currentMonth as Month,
            currentYear.toString()
          ),
        });

      const totalIncomeAndExpensesForYearData =
        await callApi<GetQueryTotalIncomeAndExpensesForYearSnippet>({
          query: getQueryTotalIncomeAndExpensesForYear(currentYear.toString()),
        });

      if (transactionsData.success) {
        const sortedTransactionsData = transactionsData.data.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB.getTime() - dateA.getTime();
        });

        setTransactionsData(sortedTransactionsData);
        setLoading(false);
      }

      if (totalIncomeAndExpenses.success) {
        setTotalIncomeAndExpenses(totalIncomeAndExpenses.data);
      }

      if (totalIncomeAndExpensesForYearData) {
        setChartData(totalIncomeAndExpensesForYearData);
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
                {totalIncomeAndExpenses?.totalIncome ? (
                  <FinanceWidget
                    type="income"
                    title="Месечни Приходи"
                    amount={totalIncomeAndExpenses.totalIncome}
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

                {totalIncomeAndExpenses?.totalExpenses ? (
                  <FinanceWidget
                    type="expenses"
                    title="Месечни Разходи"
                    amount={totalIncomeAndExpenses.totalExpenses}
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

                {totalIncomeAndExpenses?.totalYearIncome ? (
                  <FinanceWidget
                    type="income"
                    title="Годишни Приходи"
                    amount={totalIncomeAndExpenses.totalYearIncome}
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

                {totalIncomeAndExpenses?.totalYearExpenses ? (
                  <FinanceWidget
                    type="expenses"
                    title="Годишни Разходи"
                    amount={totalIncomeAndExpenses.totalYearExpenses}
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

              {chartData ? (
                <BarChart data={chartData} />
              ) : (
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  width="100%"
                  height={400}
                />
              )}
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
            setTotalIncomeAndExpenses={setTotalIncomeAndExpenses}
            setTransactionsData={setTransactionsData}
            setModalOpen={setModalOpen}
          />
        </Modal>
      </Container>
    </>
  );
};

export default Finance;
