"use client";
import { useEffect, useState } from "react";
import { Container, IconButton, Tooltip, Typography } from "@mui/material";
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
} from "@/services/Patients/apiPatientsSnippets";
import Modal from "@/components/MUIComponents/Modal";
import Dialog from "@/components/MUIComponents/Dialog";

type ModalType = "documents" | "edit";

const PatientsPage = () => {
  const [patientsData, setPatientsData] = useState<Patient[]>([]);
  const [modalType, setModalType] = useState<ModalType>();
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
      field: "age",
      headerName: "Години",
      width: 100,
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
                setModalOpen(true);
                setModalType("documents");
              }}
            >
              <IconButton>
                <FolderIcon sx={{ color: "#0096FF" }} />
              </IconButton>
            </Tooltip>

            {/* Edit */}
            <Tooltip
              title="Промени"
              onClick={() => {
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
          setPatientsData(patientsData.data);
          setLoading(false);
        } else {
          signOut();
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleDeletePatient = async (id: string) => {
    console.log(id);
  };

  return (
    <Container>
      <Table rows={patientsData} columns={columns} loading={loading} />

      <Modal
        modalTitle={modalType === "documents" ? "Документи" : "Промени"}
        open={openModal}
        setOpen={setModalOpen}
      >
        <p>asd</p>
      </Modal>
    </Container>
  );
};

export default PatientsPage;
