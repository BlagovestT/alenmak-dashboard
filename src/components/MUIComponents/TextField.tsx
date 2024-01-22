import { InputAdornment, TextField as MUITextField } from "@mui/material";
import React from "react";

interface TextFieldProps {
  label: string;
  name?: string;
  value?: string;
  variant?: "standard" | "filled" | "outlined";
  helperText?: string | boolean | undefined;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  multiline?: boolean;
  maxRows?: number;
  icon?: React.ReactElement<any>;
  type?: string;
  onChange?: any;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  name,
  value,
  variant = "outlined",
  helperText,
  placeholder,
  disabled = false,
  error = false,
  multiline = false,
  maxRows = 0,
  icon,
  type,
  onChange,
}) => {
  return (
    <MUITextField
      label={label}
      name={name}
      value={value}
      helperText={helperText}
      placeholder={placeholder}
      variant={variant}
      disabled={disabled}
      error={error}
      multiline={multiline}
      maxRows={maxRows}
      type={type}
      onChange={onChange}
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
