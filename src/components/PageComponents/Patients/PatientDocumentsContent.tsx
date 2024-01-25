import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { FileWithPath } from "react-dropzone";
import Button from "@/components/MUIComponents/Button";
import FileDropzone from "@/components/SmallComponents/Dropzone/FileDropzone";
import Alert, { AlertStatuses } from "@/components/MUIComponents/Alert";

const PatientDocumentsContent = () => {
  const theme = useTheme();
  const [file, setFile] = useState<FileWithPath | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertStatus, setAlertStatus] = useState<AlertStatuses | null>(null);

  useEffect(() => {
    (async () => {
      if (file) {
        setAlertStatus(null);
        setAlertMessage(null);
        console.log(file);
      }
    })();
  }, [file]);

  const handleViewDocument = async () => {};

  const handleDownloadDocument = async () => {};

  const handleDeleteDocument = async () => {};

  return (
    <Box>
      <Stack justifyContent="center" alignItems="center" mt={2} mb={4}>
        {!file && (
          <FileDropzone setFile={setFile} setErrorMessage={setAlertMessage}>
            <Button message="Добави Документ" />
          </FileDropzone>
        )}

        <Alert
          message={alertMessage}
          showAlert={!!alertMessage}
          severity={alertStatus}
        />
      </Stack>

      <Typography component="h4" variant="h4">
        Добавени Документи
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <InsertDriveFileIcon />
          </ListItemIcon>
          <ListItemText>File Title</ListItemText>

          <Box>
            <Tooltip title="Прегледай">
              <IconButton onClick={() => handleViewDocument()}>
                <VisibilityIcon sx={{ color: theme.palette.info.main }} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Изтегли">
              <IconButton onClick={() => handleDownloadDocument()}>
                <DownloadIcon sx={{ color: theme.palette.success.main }} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Изтрий">
              <IconButton onClick={() => handleDeleteDocument()}>
                <DeleteIcon
                  color="error"
                  sx={{ color: theme.palette.error.main }}
                />
              </IconButton>
            </Tooltip>
          </Box>
        </ListItem>
      </List>
    </Box>
  );
};

export default PatientDocumentsContent;
