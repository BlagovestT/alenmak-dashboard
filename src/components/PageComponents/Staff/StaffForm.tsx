import { useState } from "react";
import { CircularProgress, Stack } from "@mui/material";
import Alert, { AlertStatuses } from "@/components/MUIComponents/Alert";
import Button from "@/components/MUIComponents/Button";
import TextField from "@/components/MUIComponents/TextField";
import { Form, Formik } from "formik";
import { object, string } from "yup";
import { callApi } from "@/services/callApi";
import {
  PostQueryCreateStaffMemberSnippet,
  PostQueryUpdateStaffMemberSnippet,
  Staff,
} from "@/services/Staff/apiStaffSnippets";
import {
  postQueryCreateStaffMember,
  postQueryUpdateStaffMember,
} from "@/services/Staff/apiStaffPostQueries";
import { ModalDataType, ModalType } from "@/app/staff/page";
import Select from "@/components/MUIComponents/Select";

const fieldValidation = object({
  firstName: string().required("Полето е задължително"),
  lastName: string().required("Полето е задължително"),
  gender: string().required("Полето е задължително"),
  occupation: string().required("Полето е задължително"),
  salary: string()
    .matches(
      /^[0-9]+$/,
      "Моля, въведете само числа без интервали, запетайки или точки"
    )
    .required("Полето е задължително"),
});

type StaffFormValues = {
  firstName: string;
  lastName: string;
  gender: string;
  occupation: string;
  salary: string;
};

interface StaffFormProps {
  modalData?: ModalDataType;
  modalType: ModalType;
  loading: boolean;
  setStaffData: React.Dispatch<React.SetStateAction<Staff[]>>;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const StaffForm: React.FC<StaffFormProps> = ({
  modalData,
  modalType,
  loading,
  setStaffData,
  setModalOpen,
  setLoading,
}) => {
  const [formStatus, setFormStatus] = useState<AlertStatuses>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const initialValues: StaffFormValues = {
    firstName: modalData?.first_name ? modalData.first_name : "",
    lastName: modalData?.last_name ? modalData.last_name : "",
    gender: modalData?.gender ? modalData.gender : "",
    occupation: modalData?.occupation ? modalData.occupation : "",
    salary: modalData?.salary ? modalData.salary : "",
  };

  const handleFormSubmit = async (values: StaffFormValues) => {
    try {
      setLoading(true);
      setFormStatus(null);
      setAlertMessage(null);

      const body = {
        first_name: values.firstName,
        last_name: values.lastName,
        salary: +values.salary,
        gender: values.gender,
        occupation: values.occupation,
      };

      if (modalType === "create") {
        const newStaffMember = await callApi<PostQueryCreateStaffMemberSnippet>(
          {
            query: postQueryCreateStaffMember({
              ...body,
              gender: values.gender as "male" | "female",
              occupation: values.occupation as
                | "Санитар"
                | "Медицинска Сестра"
                | "Управител"
                | "Готвач"
                | "Социален Работник"
                | "Рехабилитатор"
                | "Болногледач",
            }),
          }
        );

        if (newStaffMember.success) {
          setStaffData((prev) => [...prev, newStaffMember.data]);
          setFormStatus("success");
          setAlertMessage("Успешно създаден служител!");
          setLoading(false);
          setModalOpen(false);
        }
      } else {
        if (!modalData) return;

        const updateStaffMember =
          await callApi<PostQueryUpdateStaffMemberSnippet>({
            query: postQueryUpdateStaffMember(modalData?._id, {
              ...body,
              gender: values.gender as "male" | "female",
              occupation: values.occupation as
                | "Санитар"
                | "Медицинска Сестра"
                | "Управител"
                | "Готвач"
                | "Социален Работник"
                | "Рехабилитатор"
                | "Болногледач",
            }),
          });

        if (updateStaffMember.success) {
          setStaffData((prev) =>
            prev.map((staff) => {
              if (staff._id === modalData._id) {
                return updateStaffMember.data;
              }
              return staff;
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
    <Stack width="100%" justifyContent="center" alignItems="center">
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
                  selectValues={[
                    { label: "Мъж", value: "male" },
                    { label: "Жена", value: "female" },
                  ]}
                  value={values.gender}
                  helperText={touched["gender"] && errors["gender"]}
                  error={touched["gender"] && !!errors["gender"]}
                  onChange={handleChange}
                />

                <Select
                  name="occupation"
                  label="Длъжност"
                  selectValues={[
                    { label: "Санитар", value: "Санитар" },
                    { label: "Медицинска Сестра", value: "Медицинска Сестра" },
                    { label: "Управител", value: "Управител" },
                    { label: "Готвач", value: "Готвач" },
                    { label: "Социален Работник", value: "Социален Работник" },
                    { label: "Рехабилитатор", value: "Рехабилитатор" },
                    { label: "Болногледач", value: "Болногледач" },
                  ]}
                  value={values.occupation}
                  helperText={touched["occupation"] && errors["occupation"]}
                  error={touched["occupation"] && !!errors["occupation"]}
                  onChange={handleChange}
                />

                <TextField
                  name="salary"
                  label="Заплата"
                  error={touched["salary"] && !!errors["salary"]}
                  helperText={touched["salary"] && errors["salary"]}
                  onChange={handleChange}
                  value={values.salary}
                  type="number"
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

export default StaffForm;
