import { Dispatch, SetStateAction, ReactElement } from "react";
import {
  Box,
  Typography,
  Modal as MUIModal,
  IconButton,
  Stack,
  useTheme,
  Theme,
} from "@mui/material";
import Button from "./Button";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import CloseIcon from "@mui/icons-material/Close";

const style = (theme: Theme) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "100%",
  maxWidth: "600px",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
  backgroundColor: theme.palette.primary.main,
  border: "2px solid",
  borderColor: "divider",
  borderRadius: "10px",
  gap: "2rem",
  p: "1.5rem",
});

interface ModalProps {
  icon?: React.ReactElement<any | any>;
  button?: boolean;
  modalTitle: string;
  children: ReactElement<{ handleClose: () => void }>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const Modal: React.FC<ModalProps> = ({
  icon,
  button,
  modalTitle,
  children,
  open,
  setOpen,
}) => {
  const theme = useTheme();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {icon && <IconButton onClick={handleOpen}>{icon}</IconButton>}
      {button && (
        <Button
          icon={<AddTwoToneIcon fontSize="small" />}
          message={modalTitle}
          onClick={handleOpen}
        />
      )}

      <MUIModal open={open} onClose={handleClose}>
        <Box sx={style(theme)}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h3" component="h3">
              {modalTitle}
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
          {children}
        </Box>
      </MUIModal>
    </div>
  );
};

export default Modal;
