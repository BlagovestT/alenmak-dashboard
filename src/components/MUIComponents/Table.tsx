import { Box, useTheme } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { DataGridLocale } from "@/helpers/DataGridLocale";
import LinearProgress from "@mui/material/LinearProgress";
import { Patient } from "@/services/Patients/apiPatientsSnippets";
import { Staff } from "@/services/Staff/apiStaffSnippets";
import { Transaction } from "@/services/Transactions/apiTransactionsSnippets";

interface TableProps {
  rows: Patient[] | Staff[] | Transaction[];
  columns: GridColDef[];
  loading: boolean;
}

const Table: React.FC<TableProps> = ({ rows, columns, loading }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        height: 600,
        bgcolor: theme.palette.common.white,
        borderRadius: "5px",
      }}
    >
      <DataGrid
        getRowId={(row) => row._id}
        rows={rows ? rows : []}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20]}
        loading={loading}
        disableRowSelectionOnClick
        slots={{
          loadingOverlay: LinearProgress,
          toolbar: GridToolbar,
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            printOptions: { disableToolbarButton: true },
            csvOptions: { disableToolbarButton: true },
          },
        }}
        localeText={DataGridLocale}
        sx={{
          p: 1,
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "divider",
          },
          "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
            outline: "none !important",
          },
          "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus": {
            outline: "none !important",
          },
        }}
        disableDensitySelector
      />
    </Box>
  );
};

export default Table;
