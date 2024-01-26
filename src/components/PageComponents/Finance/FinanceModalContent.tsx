"use client";
import { useState } from "react";
import { ModalType } from "@/app/finance/page";
import Alert, { AlertStatuses } from "@/components/MUIComponents/Alert";
import Button from "@/components/MUIComponents/Button";
import TextField from "@/components/MUIComponents/TextField";
import { CircularProgress, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import { number, object } from "yup";

const fieldValidation = object({
  value: number()
    .typeError("Моля, въведете правилна сума")
    .required("Полето е задължително"),
});

type FinanceFormValues = {
  value: string;
};

interface FinanceModalContentProps {
  modalType: ModalType;
}

const FinanceModalContent: React.FC<FinanceModalContentProps> = ({
  modalType,
}) => {
  const [formStatus, setFormStatus] = useState<AlertStatuses>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const initialValues: FinanceFormValues = {
    value: "",
  };

  const handleFormSubmit = async (values: FinanceFormValues) => {
    setLoading(true);
    setFormStatus(null);
    setAlertMessage(null);
    console.log(values);
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
              <Stack gap={0} mt={3}>
                <TextField
                  name="value"
                  label={
                    modalType === "income"
                      ? "Въведете приход"
                      : "Въведете разход"
                  }
                  error={touched["value"] && !!errors["value"]}
                  helperText={touched["value"] && errors["value"]}
                  onChange={handleChange}
                  value={values.value}
                  type="value"
                />

                <Button message="Вход" type="submit" sx={{ mt: 4, mb: 1 }} />

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

export default FinanceModalContent;
