"use client";
import { useEffect, useState } from "react";
import { Container, IconButton, Tooltip, Typography } from "@mui/material";
import Table from "@/components/MUIComponents/Table";
import { formatDate } from "@/helpers/helpers";
import { signOut } from "@/services/Auth/auth";
import { callApi } from "@/services/callApi";
import { GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getQueryStaffMembers } from "@/services/Staff/apiStaffGetQueries";
import {
  GetQueryStaffMembersSnippet,
  Staff,
} from "@/services/Staff/apiStaffSnippets";
import Modal from "@/components/MUIComponents/Modal";
import Dialog from "@/components/MUIComponents/Dialog";

const StaffPage = () => {
  const [staffData, setStaffData] = useState<Staff[]>([]);
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
            {/* Edit */}
            <Tooltip
              title="Промени"
              onClick={() => {
                setModalOpen(true);
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
    console.log(id);
  };

  return (
    <Container>
      <Table rows={staffData} columns={columns} loading={loading} />

      <Modal modalTitle="Промени" open={openModal} setOpen={setModalOpen}>
        <p>asd</p>
      </Modal>
    </Container>
  );
};

export default StaffPage;
