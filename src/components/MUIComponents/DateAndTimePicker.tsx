import {
  DateTimePicker,
  DateTimePickerProps,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import bg from "date-fns/locale/bg";

interface CustomDateTimePickerProps extends DateTimePickerProps<Date> {
  helperText?: any;
  name?: string;
  error?: boolean | undefined;
  type?: string;
}

const DateAndTimePicker: React.FC<CustomDateTimePickerProps> = ({
  helperText,
  name,
  error,
  type,
  ...otherProps
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={bg}>
      <DateTimePicker
        slotProps={{
          textField: {
            variant: "filled",
            size: "small",
            helperText: helperText,
            name: name,
            error: error,
            type: type,
            sx: {
              ".MuiInputBase-root": {
                pb: 1,
              },
            },
          },
        }}
        {...otherProps}
      />
    </LocalizationProvider>
  );
};

export default DateAndTimePicker;
