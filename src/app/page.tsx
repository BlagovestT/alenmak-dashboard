"use client";
import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import PageHeader from "@/components/SmallComponents/PageHeader/PageHeader";
import HomeIcon from "@mui/icons-material/Home";
import { callApi } from "@/services/callApi";
import { getQueryStaffMembers } from "@/services/Staff/apiStaffGetQueries";
import {
  GetQueryStaffMembersSnippet,
  Staff,
} from "@/services/Staff/apiStaffSnippets";
import {
  GetQueryPatientsSnippet,
  Patient,
} from "@/services/Patients/apiPatientsSnippets";
import { getQueryPatients } from "@/services/Patients/apiPatientsGetQueries";
import "dayjs/locale/bg";
import {
  GetQueryTotalIncomeAndExpensesForMonthAndYearSnippter,
  Month,
  TotalMonthYear,
} from "@/services/Transactions/apiTransactionsSnippets";
import { getQueryTotalIncomeAndExpensesForMonthAndYear } from "@/services/Transactions/apiTransactionsGetQueries";
import FinanceWidget from "@/components/PageComponents/Finance/FinanceWidget";
import HomeTasksList from "@/components/PageComponents/Home/HomeTasksList";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import { USER_ROLE } from "@/helpers/helpers";

const Home = () => {
  const theme = useTheme();
  const [staffData, setStaffData] = useState<Staff[]>();
  const [patientsData, setPatientsData] = useState<Patient[]>();
  const [totalIncomeAndExpenses, setTotalIncomeAndExpenses] =
    useState<TotalMonthYear>();
  const [userRole, setUserRole] = useState<string>();
  const FINANCE_WIDGETS_DATA = [
    {
      type: "income",
      title: "Месечни Приходи",
      amount: totalIncomeAndExpenses ? totalIncomeAndExpenses.totalIncome : 0,
      date: new Date().toLocaleString("bg-BG", {
        month: "long",
      }),
    },
    {
      type: "expenses",
      title: "Месечни Разходи",
      amount: totalIncomeAndExpenses ? totalIncomeAndExpenses.totalExpenses : 0,
      date: new Date().toLocaleString("bg-BG", {
        month: "long",
      }),
    },
    {
      type: "income",
      title: "Годишни Приходи",
      amount: totalIncomeAndExpenses
        ? totalIncomeAndExpenses.totalYearIncome
        : 0,
      date: new Date().getFullYear().toString(),
    },
    {
      type: "expenses",
      title: "Годишни Разходи",
      amount: totalIncomeAndExpenses
        ? totalIncomeAndExpenses.totalYearExpenses
        : 0,
      date: new Date().getFullYear().toString(),
    },
  ];

  useEffect(() => {
    (async () => {
      try {
        const staffData = await callApi<GetQueryStaffMembersSnippet>({
          query: getQueryStaffMembers,
        });

        const patientsData = await callApi<GetQueryPatientsSnippet>({
          query: getQueryPatients,
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

        if (staffData.success) {
          setStaffData(staffData.data);
        }

        if (patientsData.success) {
          setPatientsData(patientsData.data);
        }

        if (totalIncomeAndExpenses.success) {
          setTotalIncomeAndExpenses(totalIncomeAndExpenses.data);
        }

        if (USER_ROLE) {
          setUserRole(USER_ROLE);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <>
      <PageHeader
        header="Добре дошли!"
        subheader="Управлявайте ежедневните си задачи със стил!"
        icon={<HomeIcon sx={{ fontSize: "2.5rem" }} />}
      />
      <Container>
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Stack direction="row" justifyContent="space-between" gap={5}>
            <Stack flex={1} gap={2}>
              <Typography component="h4" variant="h3">
                Задачи
              </Typography>
              <HomeTasksList />
            </Stack>

            <Stack gap={2}>
              <Typography component="h4" variant="h3">
                Общ Анализ
              </Typography>
              {staffData ? (
                <FinanceWidget
                  type="income"
                  title="Общ Брой Служители"
                  amount={staffData.length}
                  icon={
                    <PeopleOutlineOutlinedIcon
                      sx={{
                        fontSize: "2rem",
                        color: theme.palette.common.white,
                      }}
                    />
                  }
                />
              ) : (
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  width={350}
                  height={200}
                />
              )}

              {patientsData ? (
                <FinanceWidget
                  type="income"
                  title="Общ Брой Пациенти"
                  amount={patientsData.length}
                  icon={
                    <Groups2OutlinedIcon
                      sx={{
                        fontSize: "2rem",
                        color: theme.palette.common.white,
                      }}
                    />
                  }
                />
              ) : (
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  width={350}
                  height={200}
                />
              )}
            </Stack>
          </Stack>

          {userRole && userRole === "admin" && (
            <>
              <Typography component="h4" variant="h3">
                Финансов Отчет
              </Typography>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                my={5}
                gap={1}
                sx={{
                  "@media (max-width: 1505px)": {
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "1rem",
                  },
                  "@media (max-width: 1005px)": {
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  },
                }}
              >
                {FINANCE_WIDGETS_DATA.map((widget) =>
                  totalIncomeAndExpenses ? (
                    <FinanceWidget
                      key={widget.title}
                      type={widget.type}
                      title={widget.title}
                      amount={widget.amount}
                      date={widget.date}
                    />
                  ) : (
                    <Skeleton
                      key={widget.title}
                      variant="rounded"
                      animation="wave"
                      width={350}
                      height={200}
                    />
                  )
                )}
              </Stack>
            </>
          )}
        </Paper>
      </Container>
    </>
  );
};

export default Home;
