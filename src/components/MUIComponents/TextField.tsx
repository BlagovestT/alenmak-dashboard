import { InputAdornment, TextField as MUITextField } from "@mui/material";
import React from "react";

interface TextFieldProps {
  label: string;
  variant?: "standard" | "filled" | "outlined";
  helperText?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  multiline?: boolean;
  maxRows?: number;
  icon?: React.ReactElement<any>;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  variant = "outlined",
  helperText,
  placeholder,
  disabled = false,
  error = false,
  multiline = false,
  maxRows = 0,
  icon,
}) => {
  return (
    <MUITextField
      label={label}
      helperText={helperText}
      placeholder={placeholder}
      variant={variant}
      disabled={disabled}
      error={error}
      multiline={multiline}
      maxRows={maxRows}
      InputProps={
        icon
          ? {
              startAdornment: (
                <InputAdornment position="start">{icon}</InputAdornment>
              ),
            }
          : undefined
      }
    />
  );
};

export default TextField;
