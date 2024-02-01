"use client";
import { useEffect, useState } from "react";
import { Container, IconButton, Tooltip, Typography } from "@mui/material";
import Table from "@/components/MUIComponents/Table";
import { USER_ROLE, formatDate } from "@/helpers/helpers";
import { signOut } from "@/services/Auth/auth";
import { callApi } from "@/services/callApi";
import { GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getQueryStaffMembers } from "@/services/Staff/apiStaffGetQueries";
import {
  GetQueryStaffMembersSnippet,
  PostQueryDeleteStaffMemberSnippet,
  Staff,
} from "@/services/Staff/apiStaffSnippets";
import Modal from "@/components/MUIComponents/Modal";
import Dialog from "@/components/MUIComponents/Dialog";
import PageHeader from "@/components/SmallComponents/PageHeader/PageHeader";
import GroupIcon from "@mui/icons-material/Group";
import Button from "@/components/MUIComponents/Button";
import StaffForm from "@/components/PageComponents/Staff/StaffForm";
import { postQueryDeleteStaffMember } from "@/services/Staff/apiStaffPostQueries";
import FolderIcon from "@mui/icons-material/Folder";
import DocumentsContent from "@/components/PageComponents/Patients/DocumentsContent";

export type ModalType = "create" | "edit" | "documents";
export type ModalDataType = {
  _id: string;
  first_name: string;
  last_name: string;
  gender: "male" | "female";
  occupation:
    | "Санитар"
    | "Медицинска Сестра"
    | "Управител"
    | "Готвач"
    | "Социален Работник"
    | "Рехабилитатор"
    | "Болногледач";
  salary: string;
};

const StaffPage = () => {
  const [staffData, setStaffData] = useState<Staff[]>([]);
  const [modalData, setModalData] = useState<ModalDataType>();
  const [modalType, setModalType] = useState<ModalType>("create");
  const [openModal, setModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string>();

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
            {params.value === "male" ? "Мъж" : "Жена"}
          </Typography>
        );
      },
    },
    {
      field: "occupation",
      headerName: "Длъжност",
      width: 150,
      renderCell: (params) => {
        return (
          <Typography component="p" variant="body2">
            {params.value}
          </Typography>
        );
      },
    },
    {
      field: "salary",
      headerName: "Заплата",
      width: 100,
      renderCell: (params) => {
        return (
          <Typography component="p" variant="body2">
            {params.value} лв.
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
            <Tooltip title="Документи">
              <IconButton
                onClick={() => {
                  setModalData({
                    _id: params.row._id,
                    first_name: params.row.first_name,
                    last_name: params.row.last_name,
                    salary: params.row.salary,
                    gender: params.row.gender,
                    occupation: params.row.occupation,
                  });
                  setModalType("documents");
                  setModalOpen(true);
                }}
              >
                <FolderIcon sx={{ color: "#0096FF" }} />
              </IconButton>
            </Tooltip>

            {/* Edit */}
            <Tooltip title="Промени">
              <IconButton
                onClick={() => {
                  setModalData({
                    _id: params.row._id,
                    first_name: params.row.first_name,
                    last_name: params.row.last_name,
                    salary: params.row.salary,
                    gender: params.row.gender,
                    occupation: params.row.occupation,
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
                dialogTitle={`Изтриване на работник ${params.row.first_name} ${params.row.last_name}`}
                dialogDescription="Сигурни ли сте, че искате да изтриете този работник?"
                onConfirm={() => handleDeleteStaff(params.row._id)}
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
        if (USER_ROLE) setUserRole(USER_ROLE);

        const staffData = await callApi<GetQueryStaffMembersSnippet>({
          query: getQueryStaffMembers,
        });

        if (staffData.success) {
          setStaffData(staffData.data);
          setLoading(false);
        } else {
          signOut();
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleDeleteStaff = async (id: string) => {
    setLoading(true);
    try {
      const deletedStaffMember =
        await callApi<PostQueryDeleteStaffMemberSnippet>({
          query: postQueryDeleteStaffMember(id),
        });

      if (deletedStaffMember.success) {
        setStaffData((prev) => prev.filter((staff) => staff._id !== id));
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
        header="Персонал"
        subheader="Всичко за вашия персонал на едно място"
        icon={<GroupIcon sx={{ fontSize: "2.5rem" }} />}
        action={
          <Button
            message="+ Добави работник"
            onClick={() => {
              setModalData(undefined);
              setModalType("create");
              setModalOpen(true);
            }}
          />
        }
      />

      <Container>
        <Table
          rows={staffData}
          columns={
            userRole === "admin"
              ? columns
              : columns.slice(0, 4).concat(columns.slice(5))
          }
          loading={loading}
        />

        <Modal
          modalTitle={
            modalType === "create" ? "Добави Работник" : "Промени Работник"
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
            <StaffForm
              modalData={modalData}
              modalType={modalType}
              loading={loading}
              setStaffData={setStaffData}
              setModalOpen={setModalOpen}
              setLoading={setLoading}
            />
          )}
        </Modal>
      </Container>
    </>
  );
};

export default StaffPage;
