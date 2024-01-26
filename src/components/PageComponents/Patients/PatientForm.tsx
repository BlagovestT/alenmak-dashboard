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
import { CircularProgress, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import Button from "@/components/MUIComponents/Button";
import { object, string } from "yup";
import Select from "@/components/MUIComponents/Select";
import TextField from "@/components/MUIComponents/TextField";

const GENDER_SELECT_VALUES = [
  { label: "Мъж", value: "male" },
  { label: "Жена", value: "female" },
];

const GROUP_SELECT_VALUES = [
  { label: "Група А", value: "група а" },
  { label: "Група Б", value: "група б" },
];

const STATUS_SELECT_VALUES = [
  {
    label: "Активен",
    value: "active",
  },
  {
    label: "Неактивен",
    value: "inactive",
  },
  {
    label: "Изписан",
    value: "released",
  },
  {
    label: "Починал",
    value: "deceased",
  },
];

const fieldValidation = object({
  firstName: string().required("Полето е задължително"),
  lastName: string().required("Полето е задължително"),
  age: string()
    .matches(
      /^[0-9]+$/,
      "Моля, въведете само числа без интервали, запетайки или точки"
    )
    .required("Полето е задължително"),
  gender: string().required("Полето е задължително"),
  group: string().required("Полето е задължително"),
});

type PatientFormValues = {
  firstName: string;
  lastName: string;
  age: string;
  gender: string;
  group: string;
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
    gender: modalData?.gender || "",
    group: modalData?.group || "",
    age: modalData?.age.toString() || "",
    paid: modalData?.paid || "",
    status: modalData?.status || "",
  };

  const handleFormSubmit = async (values: PatientFormValues) => {
    try {
      setLoading(true);
      setFormStatus(null);
      setAlertMessage(null);

      if (modalType === "create") {
        const newPatientMember = await callApi<PostQueryCreatePatientSnippet>({
          query: postQueryCreatePatient({
            first_name: values.firstName,
            last_name: values.lastName,
            age: +values.age,
            gender: values.gender as "male" | "female",
            group: values.group as "група а" | "група б",
          }),
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
              first_name: values.firstName,
              last_name: values.lastName,
              age: +values.age,
              paid: values.paid as "paid" | "unpaid",
              status: values.status as
                | "active"
                | "inactive"
                | "released"
                | "deceased",
              gender: values.gender as "male" | "female",
              group: values.group as "група а" | "група б",
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
            <Form
              style={{ width: "100%" }}
              onSubmit={handleSubmit}
              autoComplete="false"
            >
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

                <Select
                  name="gender"
                  label="Пол"
                  selectValues={GENDER_SELECT_VALUES}
                  value={values.gender}
                  helperText={touched["gender"] && errors["gender"]}
                  error={touched["gender"] && !!errors["gender"]}
                  onChange={handleChange}
                />

                <TextField
                  name="age"
                  label="Години"
                  error={touched["age"] && !!errors["age"]}
                  helperText={touched["age"] && errors["age"]}
                  onChange={handleChange}
                  value={values.age}
                  type="text"
                />

                <Select
                  name="group"
                  label="Група"
                  selectValues={GROUP_SELECT_VALUES}
                  helperText={touched["group"] && errors["group"]}
                  value={values.group}
                  error={touched["group"] && !!errors["group"]}
                  onChange={handleChange}
                />

                {modalType === "edit" && (
                  <Select
                    name="status"
                    label="Група"
                    selectValues={STATUS_SELECT_VALUES}
                    helperText={touched["status"] && errors["status"]}
                    value={values.status}
                    error={touched["status"] && !!errors["status"]}
                    onChange={handleChange}
                  />
                )}

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
