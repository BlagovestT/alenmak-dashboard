"use client";
import { useState } from "react";
import {
  Container,
  Stack,
  Typography,
  Paper,
  Grid,
  Divider,
  useTheme,
} from "@mui/material";
import PageHeader from "@/components/SmallComponents/PageHeader/PageHeader";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import Button from "@/components/MUIComponents/Button";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import FinanceWidget from "@/components/PageComponents/Finance/FinanceWidget";
import BarChart from "@/components/SmallComponents/BarChart/BarChart";
import Modal from "@/components/MUIComponents/Modal";
import FinanceModalContent from "@/components/PageComponents/Finance/FinanceModalContent";

export type ModalType = "income" | "expenses";
export interface FinanceDateType {
  month: string;
  earnings: number;
  expenses: number;
}

interface HistoryDataType {
  type: string;
  amount: number;
  date: string;
  reason: string;
}

const FINANCE_DATA: FinanceDateType[] = [
  { month: "Jan", earnings: 2000, expenses: 1500 },
  { month: "Feb", earnings: 1800, expenses: 1200 },
  { month: "Mar", earnings: 2200, expenses: 1600 },
  { month: "Apr", earnings: 2500, expenses: 1800 },
  { month: "May", earnings: 2300, expenses: 1400 },
  { month: "Jun", earnings: 2000, expenses: 1300 },
  { month: "Jul", earnings: 2100, expenses: 1500 },
  { month: "Aug", earnings: 2400, expenses: 1700 },
  { month: "Sep", earnings: 2600, expenses: 1900 },
  { month: "Oct", earnings: 2800, expenses: 2000 },
  { month: "Nov", earnings: 3000, expenses: 2200 },
  { month: "Dec", earnings: 3200, expenses: 2400 },
];

const TOTAL_EARNINGS: number = FINANCE_DATA.reduce(
  (total, entry) => total + entry.earnings,
  0
);

const HISTORY_DATA: HistoryDataType[] = [
  { type: "Приход", amount: 500, date: "01/25/2024", reason: "Salary" },
  { type: "Разход", amount: 200, date: "01/24/2024", reason: "Groceries" },
  { type: "Приход", amount: 300, date: "01/23/2024", reason: "Freelance" },
];

const Finance = () => {
  const theme = useTheme();
  const [openModal, setModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalType>("income");

  return (
    <>
      <PageHeader
        header="Финансов отчет"
        subheader="Всичко за вашите финанси на едно място"
        icon={<CreditCardIcon sx={{ fontSize: "2.5rem" }} />}
        action={
          <Stack gap={1}>
            <Button
              message="Добави Приход"
              onClick={() => {
                setModalType("income");
                setModalOpen(true);
              }}
            />
            <Button
              message="Добави Разход"
              onClick={() => {
                setModalType("expenses");
                setModalOpen(true);
              }}
              color="error"
            />
          </Stack>
        }
      />
      <Container>
        <Stack>
          <Paper sx={{ padding: "20px", marginBottom: "20px" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography component="h4" variant="h3">
                  Общи Приходи
                </Typography>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  gap={1}
                >
                  <Typography
                    sx={{ color: theme.palette.primary.light }}
                    component="h4"
                    variant="h2"
                  >
                    {TOTAL_EARNINGS}
                  </Typography>
                  <PaymentsOutlinedIcon
                    sx={{ fontSize: 36, color: theme.palette.primary.main }}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Divider />
              </Grid>

              <Grid item xs={12}>
                <Typography component="h4" variant="h3" mb={2}>
                  История на Приходи и Разходи
                </Typography>

                {HISTORY_DATA.map((entry, index) => (
                  <FinanceWidget
                    key={`${index}-${entry.reason}`}
                    entry={entry}
                  />
                ))}
              </Grid>
            </Grid>
          </Paper>

          <Paper sx={{ padding: "20px", marginBottom: "20px" }}>
            <Typography variant="h3" component="h4">
              Годишен Финансов Отчет
            </Typography>
            <BarChart data={FINANCE_DATA} />
          </Paper>
        </Stack>

        <Modal
          modalTitle={
            modalType === "income" ? "Добави Приход" : "Добави Разход"
          }
          open={openModal}
          setOpen={setModalOpen}
        >
          <FinanceModalContent modalType={modalType} />
        </Modal>
      </Container>
    </>
  );
};

export default Finance;
