import { FileWithPath, useDropzone } from "react-dropzone";
import { Box } from "@mui/material";

interface ImageDropzoneProps {
  setFile: React.Dispatch<React.SetStateAction<FileWithPath | null>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
  children: React.ReactElement;
  handleOnDrop?: () => void;
}

const ImageDropzone: React.FC<ImageDropzoneProps> = ({
  setFile,
  setErrorMessage,
  children,
  handleOnDrop,
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "application/vnd.ms-excel": [".xls"],
      "application/msword": [".doc", ".docs"],
    },
    onDrop: async (acceptedFiles) => {
      setErrorMessage(null);

      const file = acceptedFiles[0] as FileWithPath;

      if (!file?.type) {
        setErrorMessage("Only one file can be accepted.");
        return;
      }

      setFile(file);

      if (handleOnDrop) {
        handleOnDrop();
      }
    },
  });

  return (
    <Box {...getRootProps()}>
      <input {...getInputProps()} />
      {children}
    </Box>
  );
};

export default ImageDropzone;
