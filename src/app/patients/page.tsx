"use client";
import { useEffect, useState } from "react";
import {
  Container,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import Table from "@/components/MUIComponents/Table";
import { formatDate } from "@/helpers/helpers";
import { signOut } from "@/services/Auth/auth";
import { getQueryPatients } from "@/services/Patients/apiPatientsGetQueries";
import { callApi } from "@/services/callApi";
import { GridColDef } from "@mui/x-data-grid";
import FolderIcon from "@mui/icons-material/Folder";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  GetQueryPatientsSnippet,
  Patient,
  PostQueryDeletePatientSnippet,
  PostQueryPatientPaidSnippet,
  PostQueryPatientUnpaidSnippet,
} from "@/services/Patients/apiPatientsSnippets";
import Modal from "@/components/MUIComponents/Modal";
import Dialog from "@/components/MUIComponents/Dialog";
import PageHeader from "@/components/SmallComponents/PageHeader/PageHeader";
import Groups2Icon from "@mui/icons-material/Groups2";
import Button from "@/components/MUIComponents/Button";
import {
  postQueryDeletePatient,
  postQueryPatientPaid,
  postQueryPatientUnpaid,
} from "@/services/Patients/apiPatientsPostQueries";
import PatientsForm from "@/components/PageComponents/Patients/PatientForm";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import DangerousIcon from "@mui/icons-material/Dangerous";
import DocumentsContent from "@/components/PageComponents/Patients/DocumentsContent";

export type View = "activePatients" | "archivedPatients";
export type ModalType = "create" | "edit" | "documents";
export type ModalDataType = {
  _id: string;
  first_name: string;
  last_name: string;
  age: number;
  gender: "male" | "female";
  group: "група 1" | "група 2" | "група 3" | "група 4";
  paid: "paid" | "unpaid";
  status: "active" | "inactive" | "released" | "deceased";
};

const PatientsPage = () => {
  const [patientsData, setPatientsData] = useState<Patient[]>([]);
  const [archivedPatientsData, setArchivedPatientsData] = useState<Patient[]>(
    []
  );
  const [view, setView] = useState<View>("activePatients");
  const [modalData, setModalData] = useState<ModalDataType>();
  const [modalType, setModalType] = useState<ModalType>("create");
  const [openModal, setModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const columns: GridColDef[] = [
    {
      field: "first_name",
      headerName: "Име",
      width: 150,
    },
    {
      field: "last_name",
      headerName: "Фамилия",
      width: 150,
    },
    {
      field: "gender",
      headerName: "Пол",
      width: 60,
      renderCell: (params) => {
        return (
          <Typography component="p" variant="body2">
            {params.value === "male"
              ? "Мъж"
              : params.value === "female"
              ? "Жена"
              : ""}
          </Typography>
        );
      },
    },
    {
      field: "age",
      headerName: "Години",
      width: 70,
    },
    {
      field: "group",
      headerName: "Група",
      width: 100,
      renderCell: (params) => {
        return (
          <Typography component="p" variant="body2">
            {params.value.charAt(0).toUpperCase() + params.value.slice(1)}
          </Typography>
        );
      },
    },
    {
      field: "status",
      headerName: "Статус на пациент",
      width: 150,
      renderCell: (params) => {
        return (
          <Typography
            component="p"
            variant="body2"
            color={
              params.value === "active"
                ? "green"
                : params.value === "inactive"
                ? "error"
                : params.value === "released"
                ? "info"
                : params.value === "deceased"
                ? "black"
                : "success"
            }
          >
            {params.value === "active" && "Активен"}
            {params.value === "inactive" && "Неактивен"}
            {params.value === "released" && "Изписан"}
            {params.value === "deceased" && "Починал"}
          </Typography>
        );
      },
    },
    {
      field: "paid",
      headerName: "Статус на плащане",
      width: 150,
      renderCell: (params) => {
        return (
          <Typography
            component="p"
            variant="body2"
            color={params.value === "paid" ? "green" : "error"}
          >
            {params.value === "paid" ? "Платен" : "Неплатен"}
          </Typography>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Дата на вписване",
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
            {/* Documents */}
            <Tooltip
              title="Документи"
              onClick={() => {
                setModalData({
                  _id: params.row._id,
                  first_name: params.row.first_name,
                  last_name: params.row.last_name,
                  age: params.row.age,
                  paid: params.row.paid,
                  status: params.row.status,
                  gender: params.row.gender,
                  group: params.row.group,
                });
                setModalType("documents");
                setModalOpen(true);
              }}
            >
              <IconButton>
                <FolderIcon sx={{ color: "#0096FF" }} />
              </IconButton>
            </Tooltip>

            {/* Paid/Unpaid */}
            <Tooltip
              title={params.row.paid === "paid" ? "Неплатено" : "Платено"}
            >
              {params.row.paid === "paid" ? (
                <IconButton
                  onClick={() => handlePatientNotPaid(params.row._id)}
                >
                  <DangerousIcon sx={{ color: "red" }} />
                </IconButton>
              ) : (
                <IconButton onClick={() => handlePatientPaid(params.row._id)}>
                  <PointOfSaleIcon sx={{ color: "green" }} />
                </IconButton>
              )}
            </Tooltip>

            {/* Edit */}
            <Tooltip
              title="Промени"
              onClick={() => {
                setModalData({
                  _id: params.row._id,
                  first_name: params.row.first_name,
                  last_name: params.row.last_name,
                  age: params.row.age,
                  paid: params.row.paid,
                  status: params.row.status,
                  gender: params.row.gender,
                  group: params.row.group,
                });
                setModalOpen(true);
                setModalType("edit");
              }}
            >
              <IconButton>
                <EditIcon sx={{ color: "#FFA319" }} />
              </IconButton>
            </Tooltip>

            {/* Delete */}
            <Tooltip title="Изтрий">
              <Dialog
                icon={<DeleteIcon sx={{ color: "#FF1943" }} />}
                buttonText="Изтрий"
                dialogTitle={`Изтриване на пациент ${params.row.first_name} ${params.row.last_name}`}
                dialogDescription="Сигурни ли сте, че искате да изтриете този пациент?"
                onConfirm={() => handleDeletePatient(params.row._id)}
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
      try {
        const patientsData = await callApi<GetQueryPatientsSnippet>({
          query: getQueryPatients,
        });

        if (patientsData.success) {
          const activePatients = patientsData.data.filter(
            (patient) => patient.status === "active"
          );

          const archivedPatients = patientsData.data.filter(
            (patient) => patient.status !== "active"
          );

          setPatientsData(activePatients);
          setArchivedPatientsData(archivedPatients);
          setLoading(false);
        } else {
          signOut();
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handlePatientPaid = async (id: string) => {
    setLoading(true);
    try {
      const paidPatient = await callApi<PostQueryPatientPaidSnippet>({
        query: postQueryPatientPaid(id),
      });

      if (paidPatient.success) {
        setPatientsData((prev) =>
          prev.map((patient) =>
            patient._id === id ? { ...patient, paid: "paid" } : patient
          )
        );
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePatientNotPaid = async (id: string) => {
    setLoading(true);
    try {
      const notPaidPatient = await callApi<PostQueryPatientUnpaidSnippet>({
        query: postQueryPatientUnpaid(id),
      });

      if (notPaidPatient.success) {
        setPatientsData((prev) =>
          prev.map((patient) =>
            patient._id === id ? { ...patient, paid: "unpaid" } : patient
          )
        );
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePatient = async (id: string) => {
    setLoading(true);
    try {
      const deletedPatient = await callApi<PostQueryDeletePatientSnippet>({
        query: postQueryDeletePatient(id),
      });

      if (deletedPatient.success) {
        setPatientsData((prev) => prev.filter((patient) => patient._id !== id));
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
        header="Пациенти"
        subheader="Всичко за вашите пациенти на едно място"
        icon={<Groups2Icon sx={{ fontSize: "2.5rem" }} />}
        action={
          <Button
            message="+ Добави Пациент"
            onClick={() => {
              setModalData(undefined);
              setModalType("create");
              setModalOpen(true);
            }}
          />
        }
      />

      <Container>
        <Stack
          width="100%"
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          gap={1}
          mb={2}
        >
          {view === "activePatients" ? (
            <Button
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  setView("archivedPatients");
                  setLoading(false);
                }, 300);
              }}
              message="Архив"
            />
          ) : (
            <Button
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  setView("activePatients");
                  setLoading(false);
                }, 300);
              }}
              message="Пациенти"
            />
          )}
        </Stack>

        {view === "activePatients" ? (
          <Table rows={patientsData} columns={columns} loading={loading} />
        ) : (
          <Table
            rows={archivedPatientsData}
            columns={columns}
            loading={loading}
          />
        )}

        <Modal
          modalTitle={
            modalType === "create"
              ? "Добави Пациент"
              : modalType === "edit"
              ? "Промени Пациент"
              : "Документи"
          }
          open={openModal}
          setOpen={setModalOpen}
        >
          {modalType === "documents" && modalData ? (
            <DocumentsContent
              firstName={modalData.first_name}
              lastName={modalData.last_name}
            />
          ) : (
            <PatientsForm
              modalData={modalData}
              modalType={modalType}
              loading={loading}
              setPatientsData={setPatientsData}
              setModalOpen={setModalOpen}
              setLoading={setLoading}
            />
          )}
        </Modal>
      </Container>
    </>
  );
};

export default PatientsPage;
