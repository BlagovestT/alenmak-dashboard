import { Button as MUIButton, SxProps, Theme } from "@mui/material";

interface ButtonProps {
  icon?: React.ReactElement<any, any>;
  message: string;
  variant?: "text" | "contained" | "outlined";
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  type?: "button" | "submit" | "reset" | undefined;
  sx?: SxProps<Theme>;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  icon,
  message,
  variant = "contained",
  color = "primary",
  type,
  sx,
  onClick,
  disabled,
}) => {
  return (
    <MUIButton
      variant={variant}
      color={color}
      onClick={onClick}
      type={type as "button" | "reset" | "submit" | undefined}
      sx={sx}
      disabled={disabled}
    >
      {icon && <>{icon} </>}
      {message}
    </MUIButton>
  );
};

export default Button;
