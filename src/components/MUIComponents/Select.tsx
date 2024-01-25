import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select as MUISelect,
  FormHelperText,
} from "@mui/material";

export type SelectValue = {
  label: string;
  value: string;
};

interface SelectProps {
  name?: string;
  label: string;
  selectValues: SelectValue[];
  value?: string;
  variant?: "filled" | "outlined" | "standard";
  error?: boolean;
  onChange?: any;
  helperText?: string | boolean | undefined;
}

const Select: React.FC<SelectProps> = ({
  name,
  label,
  selectValues,
  value,
  variant = "filled",
  error,
  onChange,
  helperText,
}) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <MUISelect
          name={name}
          value={value}
          label={label}
          onChange={onChange}
          variant={variant}
          error={error}
        >
          {selectValues.map((selectValue, index) => (
            <MenuItem
              key={`${index}-${selectValue.value}`}
              value={selectValue.value}
            >
              {selectValue.label}
            </MenuItem>
          ))}
        </MUISelect>
        <FormHelperText sx={{ color: error ? "red" : "" }}>
          {helperText}
        </FormHelperText>
      </FormControl>
    </Box>
  );
};

export default Select;
