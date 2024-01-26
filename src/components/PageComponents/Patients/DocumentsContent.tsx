import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  IconButton,
  LinearProgress,
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
import { callApi } from "@/services/callApi";
import {
  getQueryDocumentByOwnerId,
  getQueryDownloadDocument,
  getQueryPreviewDocument,
} from "@/services/Documents/apiDocumentsGetQueries";
import {
  Document,
  GetQueryDocumentByOwnerIdSnippet,
  GetQueryPreviewDocumentSnippet,
  PostQueryCreateDocumentSnippet,
  PostQueryDeleteDocumentSnippet,
} from "@/services/Documents/apiDocumentsSnippets";
import {
  postQueryCreateDocument,
  postQueryDeleteDocument,
} from "@/services/Documents/apiDocumentsPostQueries";

interface DocumentsContentProps {
  firstName: string;
  lastName: string;
}

const DocumentsContent: React.FC<DocumentsContentProps> = ({
  firstName,
  lastName,
}) => {
  const theme = useTheme();
  const [documentsData, setDocumentsData] = useState<Document[]>();
  const [file, setFile] = useState<FileWithPath | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertStatus, setAlertStatus] = useState<AlertStatuses | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const documentsData = await callApi<GetQueryDocumentByOwnerIdSnippet>({
        query: getQueryDocumentByOwnerId(`${firstName} ${lastName}`),
      });
      if (documentsData.success) {
        setDocumentsData(documentsData.data);
      }
    })();
  }, [firstName, lastName]);

  useEffect(() => {
    (async () => {
      if (file) {
        try {
          setAlertStatus("loading");
          setAlertMessage("Файлът се добавя...");

          const formData = new FormData();
          formData.append("file", file);

          const createdDocument = await callApi<PostQueryCreateDocumentSnippet>(
            {
              query: postQueryCreateDocument(
                `${firstName} ${lastName}`,
                formData
              ),
            }
          );

          if (createdDocument.success) {
            setAlertStatus("success");
            setAlertMessage("Файлът е добавен успешно");
            setDocumentsData((prev) => [...(prev || []), createdDocument.data]);
            setFile(null);
            setTimeout(() => {
              setAlertStatus(null);
              setAlertMessage(null);
            }, 1000);
          }
        } catch (err) {
          setAlertStatus("error");
          setAlertMessage("Възникна грешка при добавянето на файла");
          console.log(err);
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const handleViewDocument = async (id: string) => {
    setLoading(true);

    try {
      const documentUrl = await callApi<GetQueryPreviewDocumentSnippet>({
        query: getQueryPreviewDocument(id),
      });

      if (documentUrl.success) {
        window.open(documentUrl.data, "_blank");
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDownloadDocument = async (id: string) => {
    setLoading(true);

    try {
      const document = await callApi({
        query: getQueryDownloadDocument(id),
      });

      console.log(document);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteDocument = async (id: string) => {
    setLoading(true);
    try {
      console.log(id);

      const deletedDocument = await callApi<PostQueryDeleteDocumentSnippet>({
        query: postQueryDeleteDocument(id),
      });

      if (deletedDocument.success) {
        setAlertStatus("success");
        setAlertMessage("Файлът е изтрит успешно");
        setDocumentsData((prev) =>
          prev?.filter((document) => document._id !== id)
        );
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box>
      <Stack justifyContent="center" alignItems="center" mt={2} mb={4} gap={2}>
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

      {loading && <LinearProgress sx={{ mt: 2 }} />}

      <List sx={{ height: "100%", maxHeight: "15rem", overflow: "auto" }}>
        {documentsData ? (
          documentsData.length > 0 ? (
            documentsData.map((document) => (
              <ListItem key={document._id}>
                <ListItemIcon>
                  <InsertDriveFileIcon />
                </ListItemIcon>
                <ListItemText>{document.file_name}</ListItemText>

                <Box>
                  <Tooltip title="Прегледай">
                    <IconButton
                      onClick={() => handleViewDocument(document._id)}
                    >
                      <VisibilityIcon sx={{ color: theme.palette.info.main }} />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Изтегли">
                    <IconButton
                      onClick={() => handleDownloadDocument(document._id)}
                    >
                      <DownloadIcon
                        sx={{ color: theme.palette.success.main }}
                      />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Изтрий">
                    <IconButton
                      onClick={() => handleDeleteDocument(document._id)}
                    >
                      <DeleteIcon
                        color="error"
                        sx={{ color: theme.palette.error.main }}
                      />
                    </IconButton>
                  </Tooltip>
                </Box>
              </ListItem>
            ))
          ) : (
            <Stack justifyContent="center" alignItems="center" py={2}>
              <Typography>Няма добавени документи</Typography>
            </Stack>
          )
        ) : (
          <Stack justifyContent="center" alignItems="center" py={2}>
            <CircularProgress />
          </Stack>
        )}
      </List>
    </Box>
  );
};

export default DocumentsContent;
