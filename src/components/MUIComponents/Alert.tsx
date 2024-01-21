import {
  Alert as MUIAlert,
  AlertColor,
  Typography,
  Collapse,
} from "@mui/material";
import React, { useEffect, useState } from "react";

export type AlertStatuses =
  | "success"
  | "info"
  | "warning"
  | "error"
  | "loading";

interface AlertProps {
  message: React.ReactNode;
  showAlert: boolean;
  severity: AlertStatuses;
}

const Alert: React.FC<AlertProps> = ({
  message,
  showAlert,
  severity = "error",
}) => {
  const [open, setOpen] = useState<boolean>(false);

  let mySeverity = severity;

  if (severity === "loading" || !severity) {
    mySeverity = "info";
  }

  useEffect(() => {
    setOpen(showAlert);
  }, [showAlert]);

  return (
    <Collapse in={open}>
      <MUIAlert severity={mySeverity as AlertColor} variant="filled">
        <Typography variant="body1">{message}</Typography>
      </MUIAlert>
    </Collapse>
  );
};

export default Alert;
