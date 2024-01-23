import { useState } from "react";
import { ModalDataType, ModalType } from "@/app/patients/page";
import Alert, { AlertStatuses } from "@/components/MUIComponents/Alert";
import {
  Patient,
  PostQueryCreatePatientSnippet,
  PostQueryUpdatePatientSnippet,
} from "@/services/Patients/apiPatientsSnippets";
import { callApi } from "@/services/callApi";
import {
  postQueryCreatePatient,
  postQueryUpdatePatient,
} from "@/services/Patients/apiPatientsPostQueries";
import { CircularProgress, Stack, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import Button from "@/components/MUIComponents/Button";
import { object, string } from "yup";

const fieldValidation = object({
  firstName: string().required("Полето е задължително"),
  lastName: string().required("Полето е задължително"),
  age: string()
    .matches(
      /^[0-9]+$/,
      "Моля, въведете само числа без интервали, запетайки или точки"
    )
    .required("Полето е задължително"),
});

type PatientFormValues = {
  firstName: string;
  lastName: string;
  age: string;
  paid: string;
  status: string;
};

interface PatientFormProps {
  modalData?: ModalDataType;
  modalType: ModalType;
  loading: boolean;
  setPatientsData: React.Dispatch<React.SetStateAction<Patient[]>>;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const PatientForm: React.FC<PatientFormProps> = ({
  modalData,
  modalType,
  loading,
  setPatientsData,
  setModalOpen,
  setLoading,
}) => {
  const [formStatus, setFormStatus] = useState<AlertStatuses>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const initialValues: PatientFormValues = {
    firstName: modalData?.first_name || "",
    lastName: modalData?.last_name || "",
    age: modalData?.age.toString() || "",
    paid: modalData?.paid || "",
    status: modalData?.status || "",
  };

  const handleFormSubmit = async (values: PatientFormValues) => {
    try {
      setLoading(true);
      setFormStatus(null);
      setAlertMessage(null);

      const body = {
        first_name: values.firstName,
        last_name: values.lastName,
        age: +values.age,
        paid: values.paid,
        status: values.status,
      };

      if (modalType === "create") {
        const newPatientMember = await callApi<PostQueryCreatePatientSnippet>({
          query: postQueryCreatePatient(body),
        });

        if (newPatientMember.success) {
          setPatientsData((prev) => [...prev, newPatientMember.data]);
          setFormStatus("success");
          setAlertMessage("Успешно създаден служител!");
          setLoading(false);
          setModalOpen(false);
        }
      } else {
        if (!modalData) return;

        const updatePatientMember =
          await callApi<PostQueryUpdatePatientSnippet>({
            query: postQueryUpdatePatient(modalData?._id, {
              ...body,
              paid: body.paid as "paid" | "unpaid",
              status: body.status as
                | "active"
                | "inactive"
                | "released"
                | "deceased",
            }),
          });

        if (updatePatientMember.success) {
          setPatientsData((prev) =>
            prev.map((patient) => {
              if (patient._id === modalData._id) {
                return updatePatientMember.data;
              }
              return patient;
            })
          );
          setFormStatus("success");
          setAlertMessage("Успешно обновен служител!");
          setLoading(false);
          setModalOpen(false);
        }
      }
    } catch (err) {
      console.log((err as Error).message);
      setFormStatus("error");
      setAlertMessage("Невалидни данни, моля опитайте отново!");
      setLoading(false);
    }
  };

  return (
    <Stack justifyContent="center" alignItems="center">
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
                  name="firstName"
                  label="Име"
                  error={touched["firstName"] && !!errors["firstName"]}
                  helperText={touched["firstName"] && errors["firstName"]}
                  onChange={handleChange}
                  value={values.firstName}
                  type="text"
                />

                <TextField
                  name="lastName"
                  label="Фамилия"
                  error={touched["lastName"] && !!errors["lastName"]}
                  helperText={touched["lastName"] && errors["lastName"]}
                  onChange={handleChange}
                  value={values.lastName}
                  type="text"
                />

                <TextField
                  name="Години"
                  label="Заплата"
                  error={touched["age"] && !!errors["age"]}
                  helperText={touched["age"] && errors["age"]}
                  onChange={handleChange}
                  value={values.age}
                  type="text"
                />

                <Button
                  message={modalType === "create" ? "Добави" : "Запази"}
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

export default PatientForm;
