import { useState } from "react";
import Alert, { AlertStatuses } from "@/components/MUIComponents/Alert";
import Button from "@/components/MUIComponents/Button";
import Select from "@/components/MUIComponents/Select";
import TextField from "@/components/MUIComponents/TextField";
import {
  postQueryCreateTransaction,
  postQueryUpdateTransaction,
} from "@/services/Transactions/apiTransactionsPostQueries";
import {
  Month,
  PostQueryCreateTransactionSnippet,
  PostQueryUpdateTransactionSnippet,
  Transaction,
} from "@/services/Transactions/apiTransactionsSnippets";
import { callApi } from "@/services/callApi";
import { CircularProgress, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import { number, object, string } from "yup";
import { PostQueryCreateTransactionInput } from "@/services/Transactions/apiTransactionsInputs";
import { ModalType } from "@/app/finance/page";

const fieldValidation = object({
  title: string().required("Полето е задължително"),
  amount: number().required("Полето е задължително"),
  type: string().required("Полето е задължително"),
  category: string().required("Полето е задължително"),
});

type FinanceFormValues = {
  title: string;
  amount: number;
  type: string;
  category: string;
};

interface FinanceFormProps {
  modalType: ModalType;
  modalData: Transaction | null;
  setTransactionsData: React.Dispatch<React.SetStateAction<Transaction[]>>;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FinanceForm: React.FC<FinanceFormProps> = ({
  modalType,
  modalData,
  setTransactionsData,
  setModalOpen,
}) => {
  const [formStatus, setFormStatus] = useState<AlertStatuses>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const initialValues: FinanceFormValues = {
    title: modalData ? modalData.title : "",
    amount: modalData ? modalData.amount : 0,
    type: modalData ? modalData.type : "",
    category: modalData ? modalData.category : "",
  };

  const handleFormSubmit = async (values: FinanceFormValues) => {
    try {
      setLoading(true);
      setFormStatus(null);
      setAlertMessage(null);

      const body: PostQueryCreateTransactionInput = {
        title: values.title,
        amount: values.amount,
        type: values.type as "income" | "expense",
        category: values.category as
          | "electricity"
          | "water"
          | "internet"
          | "other",
        month: new Date()
          .toLocaleString("en-US", { month: "long" })
          .toLowerCase() as Month,
        year: new Date().getFullYear().toString(),
      };

      if (modalType === "create") {
        const newTransaction = await callApi<PostQueryCreateTransactionSnippet>(
          {
            query: postQueryCreateTransaction(body),
          }
        );

        if (newTransaction.success) {
          setTransactionsData((prev) => [newTransaction.data, ...prev]);
          setFormStatus("success");
          setAlertMessage("Успешно добавихте транзакция!");
          setLoading(false);
          setModalOpen(false);
        }
      } else if (modalType === "edit" && modalData) {
        const updatedTransaction =
          await callApi<PostQueryUpdateTransactionSnippet>({
            query: postQueryUpdateTransaction(modalData._id, body),
          });

        if (updatedTransaction.success) {
          setTransactionsData((prev) =>
            prev.map((transaction) =>
              transaction._id === updatedTransaction.data._id
                ? updatedTransaction.data
                : transaction
            )
          );
          setFormStatus("success");
          setAlertMessage("Успешно редактирахте транзакция!");
          setLoading(false);
          setModalOpen(false);
        }
      }
    } catch (err) {
      console.log((err as Error).message);
      setFormStatus("error");
      setAlertMessage("Възникна грешка, моля опитайте отново!");
      setLoading(false);
    }
  };

  return (
    <Stack>
      {!loading ? (
        <Formik
          initialValues={initialValues}
          onSubmit={handleFormSubmit}
          validationSchema={fieldValidation}
        >
          {({ handleSubmit, handleChange, touched, errors, values }) => (
            <Form onSubmit={handleSubmit}>
              <Stack spacing={3} mt={3}>
                <TextField
                  name="title"
                  label="Заглавие"
                  error={touched["title"] && !!errors["title"]}
                  helperText={touched["title"] && errors["title"]}
                  onChange={handleChange}
                  value={values.title}
                  type="title"
                />

                <TextField
                  name="amount"
                  label="Сума"
                  error={touched["amount"] && !!errors["amount"]}
                  helperText={touched["amount"] && errors["amount"]}
                  onChange={handleChange}
                  value={values.amount.toString()}
                  type="number"
                />

                <Select
                  name="type"
                  label="Тип"
                  selectValues={[
                    { label: "Приход", value: "income" },
                    { label: "Разход", value: "expense" },
                  ]}
                  value={values.type}
                  helperText={touched["type"] && errors["type"]}
                  error={touched["type"] && !!errors["type"]}
                  onChange={handleChange}
                />

                <Select
                  name="category"
                  label="Категория"
                  selectValues={[
                    { label: "Ток", value: "electricity" },
                    { label: "Вода", value: "water" },
                    { label: "Интернет", value: "internet" },
                    { label: "Друго", value: "other" },
                  ]}
                  value={values.category}
                  helperText={touched["category"] && errors["category"]}
                  error={touched["category"] && !!errors["category"]}
                  onChange={handleChange}
                />

                <Button
                  message={modalType === "create" ? "Добави" : "Промени"}
                  type="submit"
                />

                <Alert
                  message={alertMessage}
                  showAlert={!!alertMessage}
                  severity={formStatus}
                />
              </Stack>
            </Form>
          )}
        </Formik>
      ) : (
        <Stack justifyContent="center" alignItems="center" my={5}>
          <CircularProgress size="3rem" />
        </Stack>
      )}
    </Stack>
  );
};

export default FinanceForm;
